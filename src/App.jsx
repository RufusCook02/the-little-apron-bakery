import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import OurStory from './pages/OurStory.jsx'
import SweetStuff from './pages/SweetStuff.jsx'
import SignatureCakes from './pages/SignatureCakes.jsx'
import Cupcakes from './pages/Cupcakes.jsx'
import Workshops from './pages/Workshops.jsx'
import Order from './pages/Order.jsx'
import Contact from './pages/Contact.jsx'
import Blog from './pages/Blog.jsx'
import Faqs from './pages/Faqs.jsx'
import Terms from './pages/Terms.jsx'
import CakeCare from './pages/CakeCare.jsx'

function readRoute() {
  const h = (typeof location !== 'undefined' ? location.hash : '') || ''
  const r = h.replace(/^#\/?/, '').trim()
  return r || 'home'
}

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

const PAGES = {
  home: Home,
  'our-story': OurStory,
  'sweet-stuff': SweetStuff,
  signature: SignatureCakes,
  cupcakes: Cupcakes,
  workshops: Workshops,
  order: Order,
  contact: Contact,
  blog: Blog,
  faqs: Faqs,
  terms: Terms,
  'cake-care': CakeCare,
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const [menuOpen, setMenuOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [sent, setSent] = useState({})
  const [submitting, setSubmitting] = useState({})
  const [submitError, setSubmitError] = useState({})

  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute())
      setMenuOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    // Real in-page anchors (an element whose id matches the hash) should get
    // the browser's native scroll-into-view. Anything else is a route change,
    // so jump to the top. Waiting a frame lets the new page's DOM commit
    // first — scrolling before that lands is what was making this silently
    // no-op on mobile Safari.
    const hash = (typeof location !== 'undefined' ? location.hash : '')
      .replace(/^#\/?/, '')
      .trim()
    if (hash && document.getElementById(hash)) return

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => window.scrollTo(0, 0))
    })
    return () => cancelAnimationFrame(raf)
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

  const Page = PAGES[route] || Home

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
