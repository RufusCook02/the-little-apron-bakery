import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import OurStory from './pages/OurStory.jsx'
import SweetStuff from './pages/SweetStuff.jsx'
import SignatureCakes from './pages/SignatureCakes.jsx'
import Cupcakes from './pages/Cupcakes.jsx'
import DiyKits from './pages/DiyKits.jsx'
import Workshops from './pages/Workshops.jsx'
import Order from './pages/Order.jsx'
import Contact from './pages/Contact.jsx'
import Blog from './pages/Blog.jsx'

function readRoute() {
  const h = (typeof location !== 'undefined' ? location.hash : '') || ''
  const r = h.replace(/^#\/?/, '').trim()
  return r || 'home'
}

const PAGES = {
  home: Home,
  'our-story': OurStory,
  'sweet-stuff': SweetStuff,
  signature: SignatureCakes,
  cupcakes: Cupcakes,
  diy: DiyKits,
  workshops: Workshops,
  order: Order,
  contact: Contact,
  blog: Blog,
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const [menuOpen, setMenuOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [sent, setSent] = useState({})

  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute())
      setMenuOpen(false)
      try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) } catch { window.scrollTo(0, 0) }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const handleSubmit = (name) => (e) => {
    e.preventDefault()
    setSent(s => ({ ...s, [name]: true }))
    try { window.scrollTo({ top: 0, behavior: 'smooth' }) } catch {}
  }

  const Page = PAGES[route] || Home

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div style={{ background: '#4f6f66', color: '#dff1e7', fontFamily: "'Mulish'", fontSize: 12.5, letterSpacing: '.16em', textTransform: 'uppercase', textAlign: 'center', padding: '9px 16px', fontWeight: 500 }}>
        Handmade in Hamilton, New Zealand &nbsp;·&nbsp; Custom cakes, cupcakes &amp; baking workshops
      </div>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Page
          orderOpen={orderOpen}
          setOrderOpen={setOrderOpen}
          sent={sent}
          handleSubmit={handleSubmit}
        />
      </main>
      <Footer />
    </div>
  )
}
