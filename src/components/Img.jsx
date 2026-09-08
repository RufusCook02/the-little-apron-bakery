import manifest from '../data/image-manifest.json'

// Drop-in replacement for <img> that serves AVIF/WebP at the size actually
// rendered, using the derivatives and dimensions produced by
// `npm run optimize-images`.
//
// Props beyond a normal <img>:
//   sizes    - CSS `sizes` describing the rendered width at each breakpoint.
//              Getting this roughly right is the whole point: it's what lets
//              the browser pick a 400px file instead of a 1600px one. Default
//              '100vw' is the safe-but-wasteful fallback.
//   priority - for the LCP image only. Loads eagerly at high priority instead
//              of lazily. Marking everything priority is the same as marking
//              nothing.
//
// An image missing from the manifest still renders as a plain <img>, so a
// forgotten `npm run optimize-images` degrades quality of service rather than
// breaking the page.
export default function Img({
  src,
  alt = '',
  sizes = '100vw',
  priority = false,
  ...rest
}) {
  const common = {
    src,
    alt,
    decoding: 'async',
    loading: priority ? 'eager' : 'lazy',
    // Lowercase deliberately: React 18 passes unknown lowercase attributes
    // through to the DOM, but would drop the camelCase `fetchPriority`.
    ...(priority ? { fetchpriority: 'high' } : {}),
    ...rest,
  }

  const meta = manifest[src]
  if (!meta) return <img {...common} />

  const base = src.replace(/\.(jpe?g|png)$/i, '')
  const srcSet = (ext) =>
    meta.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')

  // width/height are the intrinsic dimensions — they give the browser an
  // aspect ratio to reserve space with. Any inline style still wins for the
  // rendered size.
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img {...common} width={meta.w} height={meta.h} />
    </picture>
  )
}
