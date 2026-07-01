export default function Header({ menuOpen, setMenuOpen }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 60, background: 'rgba(255,253,249,.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(79,111,102,.14)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/assets/logo-landscape.png" alt="The Little Apron" style={{ height: 46, width: 'auto', objectFit: 'contain' }} />
        </a>

        <button
          className="la-burger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        <nav
          className={`la-nav${menuOpen ? ' la-open' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Mulish'", fontWeight: 600, fontSize: 13.5, letterSpacing: '.13em', textTransform: 'uppercase', color: '#67756f', whiteSpace: 'nowrap' }}
        >
          <a href="#our-story" className="nav-link">Our Story</a>
          <span className="la-div" />
          <a href="#sweet-stuff" className="nav-link">Sweet Stuff</a>
          <span className="la-div" />
          <a href="#workshops" className="nav-link">Workshops</a>
          <span className="la-div" />
          <a href="#blog" className="nav-link">Blog</a>
          <span className="la-div" />
          <a href="#contact" className="nav-link">Contact</a>
          <a href="#order" className="order-nav-btn">
            Order Now
            <img src="/assets/bow.png" alt="" style={{ position: 'absolute', top: -19, right: -12, width: 42, height: 'auto' }} />
          </a>
        </nav>
      </div>
    </header>
  )
}
