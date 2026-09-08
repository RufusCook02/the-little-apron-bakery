import { useEffect, useRef } from 'react'
import Img from './Img.jsx'

export default function Header({ menuOpen, setMenuOpen }) {
  const navRef = useRef(null)
  const burgerRef = useRef(null)

  // Drawer behaviour: Escape closes, focus moves into the panel and returns to
  // the burger on close, and the page behind doesn't scroll. App.jsx already
  // closes the menu on navigation.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    // Captured now rather than read in the cleanup, which runs after the
    // render that closes the menu.
    const nav = navRef.current
    const burger = burgerRef.current

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    // Focus the first link so keyboard and screen-reader users land inside the
    // panel they just opened rather than continuing past it.
    nav?.querySelector('a')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      // The panel is about to be display:none'd. If focus is still inside it,
      // it would be lost to <body>, so hand it back to the button that opened
      // it. Covers Escape, tapping the backdrop, and closing via a link.
      if (nav?.contains(document.activeElement)) burger?.focus()
    }
  }, [menuOpen, setMenuOpen])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        background: 'rgba(255,253,249,.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(79,111,102,.14)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '12px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* priority: in the initial viewport on every page, so lazy-loading
              it would only delay the one image every visitor definitely sees. */}
          <Img
            src="/assets/logo-landscape.png"
            sizes="165px"
            priority
            alt="The Little Apron"
            style={{ height: 46, width: 'auto', objectFit: 'contain' }}
          />
        </a>

        <button
          ref={burgerRef}
          className="la-burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          {menuOpen ? (
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        <nav
          ref={navRef}
          id="main-nav"
          aria-label="Main"
          className={`la-nav${menuOpen ? ' la-open' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: "'Mulish'",
            fontWeight: 600,
            fontSize: 13.5,
            letterSpacing: '.13em',
            textTransform: 'uppercase',
            color: '#67756f',
            whiteSpace: 'nowrap',
          }}
        >
          <a href="/our-story" className="nav-link">
            Our Story
          </a>
          <span className="la-div" />
          <a href="/sweet-stuff" className="nav-link">
            Sweet Stuff
          </a>
          <span className="la-div" />
          <a href="/workshops" className="nav-link">
            Workshops
          </a>
          <span className="la-div" />
          <a href="/blog" className="nav-link">
            Blog
          </a>
          <span className="la-div" />
          <a href="/contact" className="nav-link">
            Contact
          </a>
          <a href="/order" className="order-nav-btn">
            Order Now
          </a>
        </nav>
      </div>

      {/* Tapping outside the open drawer closes it. Hidden from assistive tech
          because Escape and the close button already cover that path. */}
      {menuOpen && (
        <div
          className="la-nav-backdrop"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  )
}
