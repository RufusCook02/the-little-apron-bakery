#!/usr/bin/env node
/**
 * Image maintenance pass for public/assets/.
 *
 * Run manually with: npm run optimize-images
 * This is NOT wired into the build or CI — encoding AVIF is slow, so the
 * derivatives are generated once and committed rather than rebuilt on every
 * deploy. Re-run it whenever you add or replace a photo.
 *
 * Three things happen, in order:
 *
 * 1. The original .jpg/.png is optimised IN PLACE — same path, same filename.
 *    JSX references these exact strings (public/ assets aren't part of Vite's
 *    module graph), so nothing else has to change. Files under
 *    SKIP_BELOW_BYTES are left alone, and the file is only overwritten if the
 *    re-encode is actually smaller, so this is safe to re-run.
 *
 * 2. AVIF and WebP derivatives are written alongside it at a small ladder of
 *    widths — floral.jpg gets floral-400.avif, floral-400.webp, floral-800.avif
 *    and so on. src/components/Img.jsx turns these into a <picture> with
 *    srcset, so a phone downloads a 400px-wide AVIF instead of an 1800px JPEG.
 *
 * 3. src/data/image-manifest.json is rewritten with each image's intrinsic
 *    dimensions and available widths. Img.jsx needs the dimensions to set
 *    width/height attributes (which reserve layout space and prevent shift),
 *    and can't read them off disk at runtime.
 *
 * The manifest is the contract between this script and Img.jsx. An image
 * missing from it still renders — Img falls back to a plain <img> — so a
 * forgotten run degrades rather than breaks.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, '..', 'public')
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets')
const MANIFEST_PATH = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'image-manifest.json',
)

const MAX_DIMENSION = 1800 // px, longest side
const JPEG_QUALITY = 80
const PNG_COMPRESSION_LEVEL = 9
const SKIP_BELOW_BYTES = 150 * 1024 // 150KB

// Chosen against how the site actually lays out: cake cards land near 400 CSS
// px (800 on a 2x screen), story photos and the hero near 600 (1200 at 2x).
// 200 is there for the header/footer logos and the small icons, which render
// well under 200 CSS px and would otherwise have 400 as their smallest option.
const WIDTH_LADDER = [200, 400, 800, 1200]
// Nothing on the site renders wider than roughly 700 CSS px, so 1600 already
// covers a 2x screen. Emitting the full 1800px source as a derivative too just
// adds weight nobody downloads.
const MAX_DERIVATIVE_WIDTH = 1600
const AVIF_QUALITY = 55 // AVIF holds up far lower than JPEG does
const WEBP_QUALITY = 78

// logo.png exists only as the source for the favicons generated below — it is
// never rendered as a responsive <img>, so it needs no srcset derivatives.
// The generated favicons below are themselves .png files, so they'd otherwise
// be picked up as sources on the next run.
const DERIVATIVE_SKIP = new Set([
  '/assets/logo.png',
  '/assets/favicon-32.png',
  '/assets/apple-touch-icon.png',
])

// Favicons, generated from logo.png rather than pointing the browser at a
// 700KB source image (which is what index.html used to do, on every page).
const FAVICON_SOURCE = '/assets/logo.png'
const FAVICONS = [
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
]

const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png'])
const DERIVATIVE_EXTENSIONS = new Set(['.avif', '.webp'])

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, out)
    else out.push(full)
  }
  return out
}

const formatBytes = (bytes) => (bytes / 1024 / 1024).toFixed(3) + 'MB'

// Public URL for a file on disk: .../public/assets/cakes/floral.jpg -> /assets/cakes/floral.jpg
const publicPath = (filePath) =>
  '/' + path.relative(PUBLIC_DIR, filePath).split(path.sep).join('/')

async function optimizeInPlace(filePath, ext) {
  const originalSize = (await fs.stat(filePath)).size
  if (originalSize < SKIP_BELOW_BYTES) {
    return { skipped: true, reason: 'under size threshold', originalSize }
  }

  const inputBuffer = await fs.readFile(filePath)
  const metadata = await sharp(inputBuffer, { failOn: 'none' }).metadata()
  const width = metadata.width ?? 0
  const height = metadata.height ?? 0

  // rotate() bakes in EXIF orientation, then strips the EXIF block.
  let pipeline = sharp(inputBuffer, { failOn: 'none' }).rotate()
  if (Math.max(width, height) > MAX_DIMENSION) {
    pipeline = pipeline.resize({
      width: width >= height ? MAX_DIMENSION : undefined,
      height: height > width ? MAX_DIMENSION : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  const outputBuffer =
    ext === '.png'
      ? await pipeline
          .png({ compressionLevel: PNG_COMPRESSION_LEVEL, palette: true })
          .toBuffer()
      : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()

  if (outputBuffer.length >= originalSize) {
    return { skipped: true, reason: 're-encode not smaller', originalSize }
  }

  await fs.writeFile(filePath, outputBuffer)
  return { skipped: false, originalSize, newSize: outputBuffer.length }
}

// Ladder entries narrower than the source, plus a top tier — the source width,
// or MAX_DERIVATIVE_WIDTH when the source is larger than anything the layout
// can use.
function widthsFor(intrinsicWidth) {
  const cap = Math.min(intrinsicWidth, MAX_DERIVATIVE_WIDTH)
  const widths = WIDTH_LADDER.filter((w) => w < cap)
  widths.push(cap)
  return [...new Set(widths)].sort((a, b) => a - b)
}

async function writeFavicons() {
  const source = path.join(PUBLIC_DIR, FAVICON_SOURCE.replace(/^\//, ''))
  const input = await fs.readFile(source)
  const written = []
  for (const { name, size } of FAVICONS) {
    // `contain` on a transparent canvas keeps the non-square logo undistorted.
    const buffer = await sharp(input)
      .resize({
        width: size,
        height: size,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: PNG_COMPRESSION_LEVEL })
      .toBuffer()
    await fs.writeFile(path.join(ASSETS_DIR, name), buffer)
    written.push(`${name} (${Math.round(buffer.length / 1024)}KB)`)
  }
  return written
}

async function writeDerivatives(filePath) {
  if (DERIVATIVE_SKIP.has(publicPath(filePath))) return null

  const inputBuffer = await fs.readFile(filePath)
  const metadata = await sharp(inputBuffer, { failOn: 'none' }).metadata()
  const intrinsicWidth = metadata.width ?? 0
  const intrinsicHeight = metadata.height ?? 0
  if (!intrinsicWidth || !intrinsicHeight) return null

  const base = filePath.replace(/\.(jpe?g|png)$/i, '')
  const widths = widthsFor(intrinsicWidth)
  let bytes = 0

  for (const width of widths) {
    const resized = sharp(inputBuffer, { failOn: 'none' }).resize({
      width,
      withoutEnlargement: true,
    })
    const avif = await resized
      .clone()
      .avif({ quality: AVIF_QUALITY })
      .toBuffer()
    const webp = await resized
      .clone()
      .webp({ quality: WEBP_QUALITY })
      .toBuffer()
    await fs.writeFile(`${base}-${width}.avif`, avif)
    await fs.writeFile(`${base}-${width}.webp`, webp)
    bytes += avif.length + webp.length
  }

  return {
    entry: [
      publicPath(filePath),
      { w: intrinsicWidth, h: intrinsicHeight, widths },
    ],
    bytes,
  }
}

// Derivatives from a previous run whose source is gone, or whose width is no
// longer in the ladder, would otherwise linger forever.
async function pruneOrphans(files, manifest) {
  const expected = new Set()
  for (const [src, { widths }] of Object.entries(manifest)) {
    const base = src.replace(/\.(jpe?g|png)$/i, '')
    for (const w of widths) {
      expected.add(`${base}-${w}.avif`)
      expected.add(`${base}-${w}.webp`)
    }
  }

  let removed = 0
  for (const file of files) {
    if (!DERIVATIVE_EXTENSIONS.has(path.extname(file).toLowerCase())) continue
    if (!expected.has(publicPath(file))) {
      await fs.unlink(file)
      removed += 1
    }
  }
  return removed
}

async function main() {
  const files = await walk(ASSETS_DIR)
  const sources = files.filter((f) =>
    SOURCE_EXTENSIONS.has(path.extname(f).toLowerCase()),
  )

  console.log(`Found ${sources.length} source image(s) under ${ASSETS_DIR}\n`)

  let totalOriginal = 0
  let totalNew = 0
  let changed = 0
  let derivativeBytes = 0
  const manifest = {}

  for (const filePath of sources) {
    const rel = path.relative(ASSETS_DIR, filePath)
    const ext = path.extname(filePath).toLowerCase()

    const result = await optimizeInPlace(filePath, ext)
    totalOriginal += result.originalSize
    totalNew += result.skipped ? result.originalSize : result.newSize
    if (result.skipped) {
      console.log(
        `  skip  ${rel}  (${formatBytes(result.originalSize)}) - ${result.reason}`,
      )
    } else {
      changed += 1
      const pct = (100 * (1 - result.newSize / result.originalSize)).toFixed(1)
      console.log(
        `  done  ${rel}  ${formatBytes(result.originalSize)} -> ${formatBytes(result.newSize)} (-${pct}%)`,
      )
    }

    const derived = await writeDerivatives(filePath)
    if (derived) {
      const [key, value] = derived.entry
      manifest[key] = value
      derivativeBytes += derived.bytes
      console.log(`        + avif/webp at ${value.widths.join(', ')}px`)
    }
  }

  const favicons = await writeFavicons()
  console.log(`\n  favicons  ${favicons.join(', ')}`)

  const removed = await pruneOrphans(await walk(ASSETS_DIR), manifest)

  // Sorted so the committed manifest has a stable diff between runs.
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  )
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + '\n')

  console.log('\n--- Summary ---')
  console.log(`Originals changed:   ${changed} / ${sources.length}`)
  console.log(`Originals before:    ${formatBytes(totalOriginal)}`)
  console.log(`Originals after:     ${formatBytes(totalNew)}`)
  console.log(`Derivatives written: ${formatBytes(derivativeBytes)}`)
  if (removed) console.log(`Orphans removed:     ${removed}`)
  console.log(
    `Manifest:            ${Object.keys(sorted).length} entries -> ${path.relative(path.join(__dirname, '..'), MANIFEST_PATH)}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
