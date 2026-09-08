// Fails if an image referenced from src/ is missing from the manifest that
// `npm run optimize-images` generates.
//
// Without this the failure is silent and slow to notice: Img.jsx falls back to
// a plain <img>, so the page still looks right in review while quietly serving
// the full-size original to everyone. Run by CI.

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

const manifest = JSON.parse(
  readFileSync(join(root, 'src/data/image-manifest.json'), 'utf8'),
)

// Every /assets/... .jpg/.png mentioned anywhere in src/.
const referenced = new Set()
for (const file of walk(join(root, 'src'))) {
  if (!/\.(jsx?|css)$/.test(file)) continue
  const text = readFileSync(file, 'utf8')
  for (const m of text.matchAll(/\/assets\/[\w\-./]+\.(?:jpe?g|png)/gi)) {
    referenced.add(m[0])
  }
}

const problems = []

for (const src of [...referenced].sort()) {
  if (!existsSync(join(root, 'public', src.slice(1)))) {
    problems.push(`referenced but missing from public/: ${src}`)
  } else if (!manifest[src]) {
    problems.push(`missing from image-manifest.json: ${src}`)
  }
}

// A manifest entry whose derivative files were never written would 404 in a
// <picture> source, which does not fall back.
for (const [src, meta] of Object.entries(manifest)) {
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  for (const w of meta.widths) {
    for (const ext of ['avif', 'webp']) {
      const file = join(root, 'public', `${base}-${w}.${ext}`.slice(1))
      if (!existsSync(file)) {
        problems.push(`derivative missing: ${base}-${w}.${ext}`)
      }
    }
  }
}

if (problems.length) {
  console.error(
    'Image manifest is out of date. Run `npm run optimize-images`.\n',
  )
  for (const p of problems) console.error(`  ${p}`)
  process.exit(1)
}

console.log(
  `image manifest OK — ${referenced.size} referenced images, ${Object.keys(manifest).length} manifest entries`,
)
