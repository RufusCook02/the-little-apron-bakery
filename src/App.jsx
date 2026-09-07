import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { ROUTE_BY_PATH, NOT_FOUND, normalisePath } from './data/routes.js'
import { PAGES } from './pages/registry.js'
import { applyHead } from './lib/head.js'
import { resolveNavClick } from './lib/navigation.js'

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      resolve(result.slice(result.indexOf(',') + 1))
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

// `initialPath` is passed in by both entry points — src/main.jsx on the client
// and src/entry-server.jsx during the prerender — so the first render is
// identical on both sides by construction, with no `typeof window` branch.
export default function App({ initialPath = '/' }) {
  const [path, setPath] = useState(() => normalisePath(initialPath))
  const [menuOpen, setMenuOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [sent, setSent] = useState({})
  const [submitting, setSubmitting] = useState({})
  const [submitError, setSubmitError] = useState({})

  // Every link on the site is a real anchor to a real path, so navigation is
  // intercepted here rather than routed through per-link onClick handlers —
  // which means each link still works with JS disabled, serving the
  // prerendered file for that path directly.
  useEffect(() => {
    const onClick = (e) => {
      const url = resolveNavClick(e)
      if (!url) return
      e.preventDefault()

      const next = url.pathname + url.search + url.hash
      const current =
        window.location.pathname + window.location.search + window.location.hash
      if (next !== current) window.history.pushState({}, '', next)

      setPath(normalisePath(url.pathname))
      setMenuOpen(false)
    }
    const onPop = () => {
      setPath(normalisePath(window.location.pathname))
      setMenuOpen(false)
    }

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  useEffect(() => {
    // Real in-page anchors (an element whose id matches the hash) should scroll
    // into view. Anything else is a route change, so jump to the top. Waiting a
    // frame lets the new page's DOM commit first — scrolling before that lands
    // is what was making this silently no-op on mobile Safari.
    const hash = window.location.hash.slice(1)
    const target = hash ? document.getElementById(hash) : null

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (target) target.scrollIntoView()
        else window.scrollTo(0, 0)
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [path])

  const route = ROUTE_BY_PATH[path] || NOT_FOUND

  useEffect(() => {
    applyHead(route)
  }, [route])

  const handleSubmit = (name) => async (e) => {
    e.preventDefault()
    const entries = [...new FormData(e.target).entries()]
    const allFields = Object.fromEntries(
      entries.filter(([, value]) => !(value instanceof File)),
    )
    // Honeypot ("website") and mount-timestamp ("ts") are spam signals only -
    // strip them out of the real fields so they never appear in the email
    // sent to the business owner, and send them alongside as `meta` instead.
    const { website: honeypot, ts, ...fields } = allFields
    const elapsedMs = ts ? Date.now() - Number(ts) : null
    const files = entries
      .map(([, value]) => value)
      .filter((value) => value instanceof File && value.size > 0)

    setSubmitting((s) => ({ ...s, [name]: true }))
    setSubmitError((s) => ({ ...s, [name]: null }))

    try {
      const attachments = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          content: await fileToBase64(file),
        })),
      )
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: name,
          fields,
          meta: { honeypot: honeypot || '', elapsedMs },
          ...(attachments.length ? { attachments } : {}),
        }),
      })
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }
      setSent((s) => ({ ...s, [name]: true }))
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch {}
    } catch (err) {
      console.error('Failed to send enquiry', err)
      setSubmitError((s) => ({
        ...s,
        [name]:
          'Something went wrong sending your message. Please try again, or reach us directly by phone or email.',
      }))
    } finally {
      setSubmitting((s) => ({ ...s, [name]: false }))
    }
  }

  const Page = PAGES[route.key]

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div
        style={{
          background: '#4f6f66',
          color: '#dff1e7',
          fontFamily: "'Mulish'",
          fontSize: 12.5,
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          textAlign: 'center',
          padding: '9px 16px',
          fontWeight: 500,
        }}
      >
        Handmade in Hamilton, New Zealand &nbsp;·&nbsp; Custom cakes, cupcakes
        &amp; workshops
      </div>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Page
          orderOpen={orderOpen}
          setOrderOpen={setOrderOpen}
          sent={sent}
          submitting={submitting}
          submitError={submitError}
          handleSubmit={handleSubmit}
        />
      </main>
      <Footer />
    </div>
  )
}
