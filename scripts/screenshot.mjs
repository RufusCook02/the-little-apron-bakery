// Capture the site at the three review viewports, for attaching to a PR.
//
// Drives the Chrome/Edge already installed on the machine via puppeteer-core —
// no bundled browser download. Set CHROME_PATH to override detection.
//
//   npm run screenshot                          # home, all viewports, full page
//   npm run screenshot -- --route signature     # a route key from src/data/routes.js
//   npm run screenshot -- --selector "svg.wave-divider"   # clip around an element
//   npm run screenshot -- --url https://thelittleapron.co.nz
//
// Writes .screenshots/<route>-<viewport>.png (gitignored).

// The page.evaluate() callbacks below are serialised and run inside the browser,
// not in Node, so their globals have to be declared for eslint.
/* global window, document */

import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer-core'
import { ROUTE_BY_KEY, NOT_FOUND } from '../src/data/routes.js'

// The 404 isn't in ROUTES (it must stay out of the sitemap), but it's still a
// page you may need to show in a PR.
const SHOOTABLE = { ...ROUTE_BY_KEY, [NOT_FOUND.key]: NOT_FOUND }

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, scale: 2, mobile: true },
  { name: 'ipad', width: 820, height: 1180, scale: 2, mobile: true },
  { name: 'desktop', width: 1440, height: 900, scale: 1, mobile: false },
]

const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]

function parseArgs(argv) {
  const args = {
    route: 'home',
    url: 'http://localhost:5173',
    outDir: '.screenshots',
  }
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, '')
    const value = argv[i + 1]
    if (key && value !== undefined) args[key] = value
  }
  return args
}

function findChrome() {
  if (process.env.CHROME_PATH) {
    if (!existsSync(process.env.CHROME_PATH)) {
      throw new Error(
        `CHROME_PATH is set but does not exist: ${process.env.CHROME_PATH}`,
      )
    }
    return process.env.CHROME_PATH
  }
  const found = CHROME_CANDIDATES.find((p) => existsSync(p))
  if (!found) {
    throw new Error(
      'No Chrome or Edge found. Install one, or set CHROME_PATH to its executable.',
    )
  }
  return found
}

// Scroll the page once so anything that animates in on scroll has settled, and
// so every loading="lazy" image below the fold is actually requested — a
// full-page screenshot does not trigger them on its own, and they'd come out
// blank.
async function settle(page) {
  await page.evaluate(async () => {
    // index.css sets `scroll-behavior: smooth`, which makes each scrollTo
    // animate. The steps below would never land, and the loop would finish
    // near the top of the page having triggered almost nothing.
    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'

    const step = window.innerHeight / 2
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
    root.style.scrollBehavior = previous

    // Give the images the scroll just triggered a chance to arrive. Resolve on
    // error too, and cap the wait, so one broken file can't hang the run.
    const pending = [...document.images].filter((img) => !img.complete)
    await Promise.race([
      Promise.all(
        pending.map(
          (img) =>
            new Promise((res) => {
              img.addEventListener('load', res, { once: true })
              img.addEventListener('error', res, { once: true })
            }),
        ),
      ),
      new Promise((r) => setTimeout(r, 10000)),
    ])
  })
  await new Promise((r) => setTimeout(r, 400))
}

// With --selector, frame the element in context rather than shooting the whole
// page: half a viewport of padding above and below shows what it sits between.
async function clipFor(page, selector, viewportHeight) {
  const box = await page.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { top: r.top + window.scrollY, height: r.height }
  }, selector)

  if (!box)
    throw new Error(`--selector matched nothing on the page: ${selector}`)

  const pad = Math.round(viewportHeight * 0.55)
  return {
    x: 0,
    y: Math.max(0, Math.round(box.top - pad)),
    height: Math.round(pad * 2 + box.height),
  }
}

const args = parseArgs(process.argv.slice(2))

// Route keys are the same ones they have always been; they now resolve to real
// paths rather than hash fragments. An unknown key used to silently shoot the
// home page, because the router fell through to it.
const route = SHOOTABLE[args.route]
if (!route) {
  throw new Error(
    `Unknown route "${args.route}". Known routes: ${Object.keys(SHOOTABLE).join(', ')}`,
  )
}
const target = `${args.url.replace(/\/$/, '')}${route.path}`

// Clear only this route's previous shots. Wiping the whole directory would mean
// a run that fails part-way destroys the images from other routes too.
mkdirSync(args.outDir, { recursive: true })
for (const f of readdirSync(args.outDir)) {
  if (f.startsWith(`${args.route}-`) && f.endsWith('.png')) {
    rmSync(join(args.outDir, f), { force: true })
  }
}

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})

try {
  for (const v of VIEWPORTS) {
    const page = await browser.newPage()
    await page.setViewport({
      width: v.width,
      height: v.height,
      deviceScaleFactor: v.scale,
      isMobile: v.mobile,
      hasTouch: v.mobile,
    })
    await page.goto(target, { waitUntil: 'networkidle0' })
    await settle(page)

    const path = join(args.outDir, `${args.route}-${v.name}.png`)
    await page.screenshot({
      path,
      fullPage: !args.selector,
      captureBeyondViewport: true,
      ...(args.selector
        ? {
            clip: {
              ...(await clipFor(page, args.selector, v.height)),
              width: v.width,
            },
          }
        : {}),
    })
    console.log(`${v.name.padEnd(8)} ${v.width}px  ${path}`)
    await page.close()
  }
} finally {
  await browser.close()
}
