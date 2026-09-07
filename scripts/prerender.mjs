// Renders every route in src/data/routes.js to a static HTML file in dist/,
// plus dist/sitemap.xml.
//
// Runs as the third step of `npm run build`, after:
//   vite build              -> dist/index.html (the template) + dist/assets
//   vite build --ssr        -> dist-ssr/entry-server.js
//
// The point is that a crawler which doesn't execute JavaScript still gets the
// full page content, title and canonical.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')

// All of this comes from the compiled SSR bundle rather than from src/, so the
// script never has to parse JSX itself.
const { render, headHtml, PAGES, ROUTES, NOT_FOUND, SITE, faqs } = await import(
  new URL('../dist-ssr/entry-server.js', import.meta.url)
)

// A page added to one map but not the other would be silently unreachable and
// unprerendered. Fail the build instead.
const routeKeys = [...ROUTES.map((r) => r.key), NOT_FOUND.key].sort()
const pageKeys = Object.keys(PAGES).sort()
if (String(routeKeys) !== String(pageKeys)) {
  throw new Error(
    'src/data/routes.js and src/pages/registry.js disagree:\n' +
      `  routes: ${routeKeys.join(', ')}\n` +
      `  pages:  ${pageKeys.join(', ')}`,
  )
}

// Read the template before the loop — the first iteration overwrites
// dist/index.html with the rendered home page.
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const HEAD_REGION = /<!--head-start-->[\s\S]*?<!--head-end-->/
const APP_MARKER = '<!--app-->'

for (const marker of [HEAD_REGION, APP_MARKER]) {
  if (
    !(typeof marker === 'string'
      ? template.includes(marker)
      : marker.test(template))
  ) {
    throw new Error(`index.html is missing the ${marker} placeholder`)
  }
}

function emit(route, outPath) {
  const html = template
    // Function replacements, not strings: the rendered markup is full of cake
    // prices, and in a replacement *string* `$'` means "everything after the
    // match" — which would splice the rest of the template into the page.
    .replace(HEAD_REGION, () => headHtml(route))
    .replace(APP_MARKER, () => render(route.path))

  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
}

// Flat files, e.g. dist/our-story.html — paired with "cleanUrls": true in
// vercel.json, which serves it at /our-story and 308s /our-story.html back to
// the clean path, so each page has exactly one reachable URL. This layout also
// resolves under the sirv server behind `npm run preview` (it tries a .html
// extension for extensionless paths), which a directory layout does not — so
// the built output can actually be verified locally.
for (const route of ROUTES) {
  emit(
    route,
    route.path === '/'
      ? join(dist, 'index.html')
      : join(dist, `${route.path.slice(1)}.html`),
  )
}

// Vercel serves dist/404.html with a 404 status for unmatched paths.
emit(NOT_FOUND, join(dist, '404.html'))

// FAQ answers still awaiting confirmation from Cushla render on the page but
// must never be asserted as structured data. This checks the emitted JSON-LD
// rather than trusting the filter in schema.js, so removing that filter fails
// the build instead of quietly publishing unverified terms to search engines.
const faqsHtml = readFileSync(join(dist, 'faqs.html'), 'utf8')
const ldJson =
  /<script type="application\/ld\+json" id="ld-schema">([\s\S]*?)<\/script>/.exec(
    faqsHtml,
  )?.[1] ?? ''
for (const faq of faqs) {
  if (!faq.unconfirmed) continue
  const answer = faq.schemaAnswer ?? faq.a
  if (typeof answer !== 'string') continue
  if (ldJson.includes(answer.slice(0, 40))) {
    throw new Error(
      `Unconfirmed FAQ answer leaked into the /faqs JSON-LD: "${faq.q}"`,
    )
  }
}

// No lastmod/changefreq/priority: Google ignores the last two, and a build-date
// lastmod on every deploy is a false freshness signal.
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ROUTES.map((r) => `  <url><loc>${SITE.origin}${r.path}</loc></url>`).join(
    '\n',
  ) +
  '\n</urlset>\n'
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

console.log(
  `prerendered ${ROUTES.length} routes + 404, and wrote sitemap.xml (${ROUTES.length} urls)`,
)
