// Decides whether a click on the page is an in-app navigation we should handle,
// or something the browser should be left alone to do.

// Returns a URL to navigate to, or null to let the browser handle the click.
export function resolveNavClick(event) {
  if (event.defaultPrevented) return null
  // Not a plain left click: middle-click, or a modifier meaning "new tab",
  // "new window", "download" or "add to selection".
  if (event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return null

  const el =
    event.target instanceof Element ? event.target.closest('a[href]') : null
  if (!el) return null

  // closest() is what catches the anchors wrapping non-text children — the
  // header logo <img> and the footer social <svg>s.
  if (el.target && el.target !== '_self') return null
  if (el.hasAttribute('download')) return null
  if (el.getAttribute('rel') === 'external') return null

  let url
  try {
    url = new URL(el.href, window.location.href)
  } catch {
    return null
  }

  // tel: and mailto: are non-special schemes, so their origin is the string
  // 'null' — this one check covers them and every off-site http(s) link.
  if (url.origin !== window.location.origin) return null

  // Same-page #anchor. Hand it back so the browser's native scroll and the
  // `scroll-behavior: smooth` in index.css keep working, and so the route
  // effect doesn't re-run and fight it.
  if (url.pathname === window.location.pathname && url.hash) return null

  return url
}
