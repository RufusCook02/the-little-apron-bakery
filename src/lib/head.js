// One metadata source, two emitters: `headHtml` bakes the head into the
// prerendered HTML at build time, `applyHead` updates it during client-side
// navigation. Keeping both in this file is what stops the static head and the
// runtime head from drifting apart.

import { SITE } from '../data/routes.js'
import { schemaJson, hasSchema } from './schema.js'

const SCHEMA_ID = 'ld-schema'

export function metaFor(route) {
  const url = `${SITE.origin}${route.path}`
  const image = `${SITE.origin}${route.image || SITE.defaultImage}`

  return {
    title: route.title,
    canonical: route.noindex ? null : url,
    // [attribute, key, content] — `name` vs `property` matters: Open Graph is
    // spec'd on `property`, Twitter and description on `name`.
    tags: [
      ['name', 'description', route.description],
      ['property', 'og:type', 'website'],
      ['property', 'og:site_name', SITE.name],
      ['property', 'og:locale', 'en_NZ'],
      ['property', 'og:title', route.title],
      ['property', 'og:description', route.description],
      ['property', 'og:url', url],
      ['property', 'og:image', image],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', route.title],
      ['name', 'twitter:description', route.description],
      ['name', 'twitter:image', image],
      ...(route.noindex ? [['name', 'robots', 'noindex, follow']] : []),
    ],
  }
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
const escapeHtml = (value) =>
  String(value).replace(/[&<>"]/g, (char) => ESCAPES[char])

// Build time. Returns the block that replaces the <!--head-start--> region of
// index.html. Touches no browser globals, so scripts/prerender.mjs can import
// this module directly under Node.
export function headHtml(route) {
  const { title, canonical, tags } = metaFor(route)

  const lines = [`<title>${escapeHtml(title)}</title>`]
  for (const [attr, key, content] of tags) {
    lines.push(
      `<meta ${attr}="${key}" content="${escapeHtml(content)}" data-head />`,
    )
  }
  if (canonical) {
    lines.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`)
  }
  if (hasSchema(route)) {
    lines.push(
      `<script type="application/ld+json" id="${SCHEMA_ID}">${schemaJson(route)}</script>`,
    )
  }

  return lines.join('\n    ')
}

// Client side. Idempotent upsert that only ever touches the tags we own, so the
// favicon, viewport, theme-color and font <link>s are never disturbed.
export function applyHead(route) {
  const { title, canonical, tags } = metaFor(route)

  document.title = title

  for (const [attr, key, content] of tags) {
    const selector = `meta[${attr}="${key}"]`
    let el = document.head.querySelector(selector)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      el.setAttribute('data-head', '')
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  // The 404 has no canonical, so an existing one has to be removed rather than
  // left pointing at the previous page.
  let link = document.head.querySelector('link[rel="canonical"]')
  if (canonical) {
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)
  } else if (link) {
    link.remove()
  }

  // `robots: noindex` is only emitted for the 404 — drop it again on the way
  // back out to a real page.
  if (!route.noindex) {
    document.head.querySelector('meta[name="robots"]')?.remove()
  }

  // Keep the JSON-LD in step with the page, so a client-side navigation never
  // leaves the previous page's structured data behind.
  let ld = document.getElementById(SCHEMA_ID)
  if (hasSchema(route)) {
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.id = SCHEMA_ID
      document.head.appendChild(ld)
    }
    ld.textContent = schemaJson(route)
  } else if (ld) {
    ld.remove()
  }
}
