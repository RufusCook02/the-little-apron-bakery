import { gallery } from '../data/gallery.js'
import Img from '../components/Img.jsx'

export default function Gallery() {
  return (
    <div className="la-page">
      <section
        style={{
          background: 'linear-gradient(180deg,#eef7f0,#f6fbf3)',
          padding: '78px 0 56px',
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: '0 28px',
            textAlign: 'center',
          }}
        >
          <Img
            src="/assets/bow.png"
            sizes="58px"
            alt=""
            style={{ width: 58, height: 'auto', margin: '0 auto 14px' }}
          />
          <span
            style={{
              fontFamily: "'Mulish'",
              textTransform: 'uppercase',
              letterSpacing: '.22em',
              fontSize: 13,
              fontWeight: 700,
              color: '#6f9486',
            }}
          >
            A little inspiration
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              color: '#3f5750',
              fontSize: 'var(--fs-h1)',
              lineHeight: 1.05,
              margin: '12px 0 16px',
            }}
          >
            Gallery
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            A look through cakes we've loved making — birthdays, weddings, baby
            showers and everything in between. Spot something you like? Bring it
            along to your enquiry.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 0 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
          {/* A real heading for the grid, kept off-screen: on the page the
              photos speak for themselves, but the h1 would otherwise be the
              only landmark on a page that is almost entirely images. */}
          <h2 className="sr-only">Photos</h2>
          <div className="la-gallery-grid">
            {gallery.map((photo, i) => (
              <div key={photo.src} className="la-gallery-tile">
                <Img
                  src={photo.src}
                  alt={photo.alt}
                  // Two tiles is what's above the fold at 390px; the rest
                  // lazy-load. Img emits width/height, so nothing reflows.
                  priority={i < 2}
                  sizes="(max-width: 700px) 46vw, (max-width: 1100px) 31vw, 282px"
                  style={
                    photo.focus ? { objectPosition: photo.focus } : undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f3f9f3', padding: '78px 0 86px' }}>
        <div
          style={{
            maxWidth: 680,
            margin: '0 auto',
            padding: '0 28px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Mulish'",
              textTransform: 'uppercase',
              letterSpacing: '.22em',
              fontSize: 13,
              fontWeight: 700,
              color: '#6f9486',
            }}
          >
            Seen something you love?
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              color: '#3f5750',
              fontSize: 'var(--fs-h2)',
              lineHeight: 1.12,
              margin: '12px 0 14px',
            }}
          >
            Let's make yours
          </h2>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 17,
              lineHeight: 1.75,
              maxWidth: 560,
              margin: '0 auto 28px',
            }}
          >
            Tell us the date, the size and the look you're after — inspiration
            photos welcome — and we'll come back to you with a quote.
          </p>
          <a href="/order" className="btn-primary">
            Start your enquiry →
          </a>
        </div>
      </section>
    </div>
  )
}
