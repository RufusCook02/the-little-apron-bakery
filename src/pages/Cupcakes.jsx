export default function Cupcakes() {
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
          <img
            src="/assets/icons/cupcake.png"
            alt=""
            style={{
              width: 80,
              height: 80,
              objectFit: 'contain',
              margin: '0 auto 18px',
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
            Sweet by the box
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              color: '#3f5750',
              fontSize: 'clamp(40px,5.5vw,64px)',
              lineHeight: 1.05,
              margin: '12px 0 16px',
            }}
          >
            Cupcakes
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            Perfect for parties, gifts or a sweet treat. Choose from a variety
            of flavours and designs — a stand-alone purchase, or on theme with
            any cake.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px' }}>
          <div
            className="g3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 22,
              marginBottom: 30,
            }}
          >
            <div
              style={{
                background: '#dcefe2',
                borderRadius: 22,
                padding: '42px 28px',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 30,
                  marginBottom: 6,
                }}
              >
                Box of 6
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#6f9486',
                  fontWeight: 700,
                  letterSpacing: '.04em',
                }}
              >
                Pricing TBC
              </p>
            </div>
            <div
              style={{
                background: '#4f6f66',
                borderRadius: 22,
                padding: '42px 28px',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#fff',
                  fontSize: 30,
                  marginBottom: 6,
                }}
              >
                Box of 12
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#b9e5ca',
                  fontWeight: 700,
                  letterSpacing: '.04em',
                }}
              >
                Pricing TBC
              </p>
            </div>
            <div
              style={{
                background: '#dcefe2',
                borderRadius: 22,
                padding: '42px 28px',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 30,
                  marginBottom: 6,
                }}
              >
                Box of 24
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#6f9486',
                  fontWeight: 700,
                  letterSpacing: '.04em',
                }}
              >
                Pricing TBC
              </p>
            </div>
          </div>

          <div
            style={{
              background: '#f6fbf3',
              border: '1px solid rgba(79,111,102,.12)',
              borderRadius: 22,
              padding: '36px 40px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 600,
                color: '#3f5750',
                fontSize: 24,
              }}
            >
              Fillings{' '}
              <span
                style={{
                  fontFamily: "'Mulish'",
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#7fa99a',
                }}
              >
                — plus $10
              </span>
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
                gap: '10px 24px',
                marginTop: 16,
                fontFamily: "'Mulish'",
                color: '#5e6d67',
                fontSize: 16,
              }}
            >
              <span>♡ Milk chocolate ganache</span>
              <span>♡ White chocolate ganache</span>
              <span>♡ Lemon curd</span>
              <span>♡ Cream cheese</span>
              <span>♡ Berry compote</span>
            </div>
          </div>

          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: 'italic',
              textAlign: 'center',
              color: '#6f9486',
              fontSize: 22,
              marginTop: 26,
            }}
          >
            Cupcakes are perfect as a stand-alone purchase or on theme with any
            cake.
          </p>
          <div style={{ textAlign: 'center', marginTop: 26 }}>
            <a href="#order" className="btn-primary">
              Order cupcakes
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
