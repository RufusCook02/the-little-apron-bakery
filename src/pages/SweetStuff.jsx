import { inspired } from '../data/gallery.js'
import ImageSlider from '../components/ImageSlider.jsx'
import Img from '../components/Img.jsx'

export default function SweetStuff() {
  return (
    <div className="la-page">
      <section
        style={{
          background: 'linear-gradient(180deg,#eef7f0,#f6fbf3)',
          padding: '78px 0 60px',
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
            Order something sweet
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              color: '#3f5750',
              fontSize: 'var(--fs-h1)',
              lineHeight: 1.05,
              margin: '14px 0 16px',
            }}
          >
            Custom cakes, cupcakes &amp; more
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            Explore our range of cakes and cupcakes. Whether you're planning
            something extra special or keeping it sweet and simple, The Little
            Apron is here to make every celebration that little bit sweeter.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '70px 0' }}>
        <div
          className="g3"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '0 28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 26,
          }}
        >
          <a
            href="/signature"
            className="card-hover-lg"
            style={{
              display: 'block',
              borderRadius: 22,
              overflow: 'hidden',
              background: '#f3f9f3',
              border: '1px solid rgba(79,111,102,.12)',
            }}
          >
            <Img
              src="/assets/cakes/vintage-bow.jpg"
              sizes="(max-width: 900px) 92vw, 360px"
              alt="Signature cakes"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
            />
            <div style={{ padding: '28px 28px 32px' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'var(--fs-h3)',
                  marginBottom: 8,
                }}
              >
                Signature Cakes
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#6a7872',
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                Our most-loved cake styles with set pricing, designed to make
                celebrations effortless.
              </p>
              <span className="text-link-green">Browse cakes →</span>
            </div>
          </a>
          <a
            href="/cupcakes"
            className="card-hover-lg"
            style={{
              display: 'block',
              borderRadius: 22,
              overflow: 'hidden',
              background: '#f3f9f3',
              border: '1px solid rgba(79,111,102,.12)',
            }}
          >
            <Img
              src="/assets/cakes/pink.jpg"
              sizes="(max-width: 900px) 92vw, 360px"
              alt="Cupcakes"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
            />
            <div style={{ padding: '28px 28px 32px' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'var(--fs-h3)',
                  marginBottom: 8,
                }}
              >
                Cupcakes
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#6a7872',
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                Perfect for birthdays, school celebrations, gifting and little
                sweet cravings — or that something extra when the cake just
                isn't enough.
              </p>
              <span className="text-link-green">Order cupcakes →</span>
            </div>
          </a>
          <a
            href="/order"
            className="card-hover-lg"
            style={{
              display: 'block',
              borderRadius: 22,
              overflow: 'hidden',
              background: '#f3f9f3',
              border: '1px solid rgba(79,111,102,.12)',
            }}
          >
            <Img
              src="/assets/cakes/wedding.jpg"
              sizes="(max-width: 900px) 92vw, 360px"
              alt="Custom cakes"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
            />
            <div style={{ padding: '28px 28px 32px' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'var(--fs-h3)',
                  marginBottom: 8,
                }}
              >
                Custom Cakes
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#6a7872',
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                Have something special in mind or a unique birthday party theme?
                We would love to help bring your vision to life.
              </p>
              <span className="text-link-green">Chat custom designs →</span>
            </div>
          </a>
        </div>
      </section>

      {/* GET INSPIRED */}
      <section style={{ background: '#f6fbf3', padding: '70px 0 78px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
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
            Straight from the kitchen
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              color: '#3f5750',
              fontSize: 'var(--fs-h2)',
              lineHeight: 1.1,
              margin: '12px 0 14px',
            }}
          >
            Get inspired
          </h2>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 17,
              lineHeight: 1.75,
              maxWidth: 560,
              marginBottom: 28,
            }}
          >
            A few of the cakes we've loved making. Have a scroll — then bring
            your favourite along to your enquiry.
          </p>
          <ImageSlider photos={inspired} label="Get inspired photos" />
          <div style={{ marginTop: 30 }}>
            <a href="/gallery" className="btn-outline">
              Browse our gallery
            </a>
          </div>
        </div>
      </section>

      {/* LEARN TO DO IT YOURSELF */}
      <section style={{ background: '#fff', padding: '84px 0 92px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 28px' }}>
          <div
            className="pad-lg"
            style={{
              position: 'relative',
              background: '#eef7f0',
              border: '1px solid rgba(79,111,102,.12)',
              borderRadius: 30,
              padding: '58px 48px',
              textAlign: 'center',
              overflow: 'visible',
            }}
          >
            <Img
              src="/assets/bow.png"
              sizes="96px"
              alt=""
              style={{
                position: 'absolute',
                top: -26,
                left: 0,
                width: 'clamp(64px, 18vw, 96px)',
                height: 'auto',
                transform: 'translateX(-30%) rotate(-18deg)',
                filter: 'drop-shadow(0 8px 14px rgba(79,111,102,.25))',
              }}
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
              Want to have a go?
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
              Learn to do it yourself
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
              Find your passion and try our hands-on classes to learn the art of
              baking and decorating.
            </p>
            {/* Workshops are still "register your interest", not bookable —
                this copy deliberately doesn't imply dates. */}
            <a href="/workshops" className="btn-primary">
              See our workshops →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
