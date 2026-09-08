import Img from '../components/Img.jsx'
import { faqs } from '../data/faqs.jsx'

export default function Faqs() {
  return (
    <div className="la-page">
      <section
        style={{
          background: 'linear-gradient(180deg,#eef7f0,#f6fbf3)',
          padding: '78px 0 50px',
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
            Got questions?
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
            Frequently Asked Questions
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            Everything you need to know about ordering with us. Can't find your
            answer? Get in touch.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '54px 0 90px' }}>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '0 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {faqs.map((item, i) => (
            <details
              key={i}
              style={{
                background: '#f6fbf3',
                border: '1px solid rgba(79,111,102,.12)',
                borderRadius: 16,
                padding: '18px 22px',
              }}
            >
              {/* The question is a heading, not just bold text — without this
                  the page has ten questions and no headings to navigate by.
                  The h2 goes inside <summary> so the disclosure widget keeps
                  working; the padding gives it a 44px tap target, which the
                  parent's padding was providing only ~31px of. */}
              <summary
                style={{
                  cursor: 'pointer',
                  margin: '-18px -22px 0',
                  padding: '18px 22px',
                }}
              >
                <h2
                  style={{
                    display: 'inline',
                    fontFamily: "'Cormorant Garamond',serif",
                    fontWeight: 600,
                    color: '#3f5750',
                    fontSize: 19,
                  }}
                >
                  {item.q}
                </h2>
              </summary>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#5e6d67',
                  fontSize: 15.5,
                  lineHeight: 1.72,
                  marginTop: 12,
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
