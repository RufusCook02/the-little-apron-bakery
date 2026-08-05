#!/usr/bin/env node
/**
 * One-off image optimization pass for public/assets/.
 *
 * Run manually with: node scripts/optimize-images.mjs
 * This is NOT wired into the build or CI pipeline — it's a maintenance
 * command to re-run whenever new photos are added to public/assets/.
 *
 * What it does, for every .jpg/.jpeg/.png under public/assets/ (recursive):
 *   - Skips files already under SKIP_BELOW_BYTES (little to gain, no point
 *     risking quality loss on small files like icons).
 *   - Downscales to MAX_DIMENSION on the longest side if the image is larger
 *     (phone photos are often 3000-4000px+ wide, way beyond what a website
 *     needs).
 *   - Re-encodes JPEGs with mozjpeg at JPEG_QUALITY, and PNGs with sharp's
 *     compression level + palette mode (skipped automatically by sharp when
 *     palette mode would visibly degrade a photo-like PNG).
 *   - Overwrites the file IN PLACE at its existing path — same filename,
 *     same extension, same location, no renames. JSX references these exact
 *     paths as plain strings (public/ assets aren't part of the module
 *     graph), so nothing else needs to change.
 *
 * Only replaces the file on disk if the re-encoded version is actually
 * smaller than the original, so this is safe to re-run repeatedly.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets')

const MAX_DIMENSION = 1800 // px, longest side
const JPEG_QUALITY = 80
const PNG_COMPRESSION_LEVEL = 9
const SKIP_BELOW_BYTES = 150 * 1024 // 150KB

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png'])

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(full, out)
    } else {
      out.push(full)
    }
  }
  return out
}

function formatBytes(bytes) {
  return (bytes / 1024 / 1024).toFixed(3) + 'MB'
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!IMAGE_EXTENSIONS.has(ext)) return null

  const originalStat = await fs.stat(filePath)
  const originalSize = originalStat.size

  if (originalSize < SKIP_BELOW_BYTES) {
    return {
      filePath,
      skipped: true,
      reason: 'under size threshold',
      originalSize,
      newSize: originalSize,
    }
  }

  const inputBuffer = await fs.readFile(filePath)
  const image = sharp(inputBuffer, { failOn: 'none' })
  const metadata = await image.metadata()

  const width = metadata.width ?? 0
  const height = metadata.height ?? 0
  const longestSide = Math.max(width, height)

  let pipeline = sharp(inputBuffer, { failOn: 'none' }).rotate() // rotate() auto-orients using EXIF, then strips it

  if (longestSide > MAX_DIMENSION) {
    pipeline = pipeline.resize({
      width: width >= height ? MAX_DIMENSION : undefined,
      height: height > width ? MAX_DIMENSION : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  let outputBuffer
  if (ext === '.jpg' || ext === '.jpeg') {
    outputBuffer = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer()
  } else {
    // .png
    outputBuffer = await pipeline
      .png({ compressionLevel: PNG_COMPRESSION_LEVEL, palette: true })
      .toBuffer()
  }

  const newSize = outputBuffer.length

  if (newSize >= originalSize) {
    return {
      filePath,
      skipped: true,
      reason: 're-encode not smaller',
      originalSize,
      newSize: originalSize,
    }
  }

  await fs.writeFile(filePath, outputBuffer)

  return {
    filePath,
    skipped: false,
    originalSize,
    newSize,
    width,
    height,
    resized: longestSide > MAX_DIMENSION,
  }
}

async function main() {
  const files = await walk(ASSETS_DIR)
  const imageFiles = files.filter((f) =>
    IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()),
  )

  console.log(`Found ${imageFiles.length} image file(s) under ${ASSETS_DIR}\n`)

  let totalOriginal = 0
  let totalNew = 0
  let changedCount = 0

  for (const filePath of imageFiles) {
    const result = await optimizeFile(filePath)
    if (!result) continue

    const rel = path.relative(ASSETS_DIR, filePath)
    totalOriginal += result.originalSize
    totalNew += result.newSize

    if (result.skipped) {
      console.log(
        `  skip  ${rel}  (${formatBytes(result.originalSize)}) - ${result.reason}`,
      )
    } else {
      changedCount += 1
      const pct = (100 * (1 - result.newSize / result.originalSize)).toFixed(1)
      const resizeNote = result.resized ? ' [resized]' : ''
      console.log(
        `  done  ${rel}  ${formatBytes(result.originalSize)} -> ${formatBytes(result.newSize)} (-${pct}%)${resizeNote}`,
      )
    }
  }

  console.log('\n--- Summary ---')
  console.log(`Files changed: ${changedCount} / ${imageFiles.length}`)
  console.log(`Total before:  ${formatBytes(totalOriginal)}`)
  console.log(`Total after:   ${formatBytes(totalNew)}`)
  console.log(
    `Reduction:     ${formatBytes(totalOriginal - totalNew)} (${(
      100 *
      (1 - totalNew / totalOriginal)
    ).toFixed(1)}%)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
