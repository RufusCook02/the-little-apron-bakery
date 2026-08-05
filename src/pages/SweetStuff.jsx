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
              fontSize: 'clamp(38px,5.5vw,64px)',
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
            Explore our range of cakes and cupcakes, or do-it-yourself. Whether
            you're planning something extra special or keeping it sweet and
            simple, The Little Apron is here to make every celebration that
            little bit sweeter.
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
            href="#signature"
            className="card-hover-lg"
            style={{
              display: 'block',
              borderRadius: 22,
              overflow: 'hidden',
              background: '#f3f9f3',
              border: '1px solid rgba(79,111,102,.12)',
            }}
          >
            <img
              src="/assets/cakes/floral.jpg"
              alt="Signature cakes"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
            />
            <div style={{ padding: '28px 28px 32px' }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 28,
                  marginBottom: 8,
                }}
              >
                Signature Cakes
              </h3>
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
            href="#cupcakes"
            className="card-hover-lg"
            style={{
              display: 'block',
              borderRadius: 22,
              overflow: 'hidden',
              background: '#f3f9f3',
              border: '1px solid rgba(79,111,102,.12)',
            }}
          >
            <img
              src="/assets/cakes/pink.jpg"
              alt="Cupcakes"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
            />
            <div style={{ padding: '28px 28px 32px' }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 28,
                  marginBottom: 8,
                }}
              >
                Cupcakes
              </h3>
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
            href="#diy"
            className="card-hover-lg"
            style={{
              display: 'block',
              borderRadius: 22,
              overflow: 'hidden',
              background: '#f3f9f3',
              border: '1px solid rgba(79,111,102,.12)',
            }}
          >
            <img
              src="/assets/cakes/canvas.jpg"
              alt="DIY kits"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
            />
            <div style={{ padding: '28px 28px 32px' }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 28,
                  marginBottom: 8,
                }}
              >
                DIY Kits
              </h3>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#6a7872',
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                The perfect hands-on activity for little bakers and busy
                families. All the fun of decorating, without the stress of
                baking.
              </p>
              <span className="text-link-green">Shop DIY kits →</span>
            </div>
          </a>
        </div>
      </section>

      <section style={{ padding: '0 0 90px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 28,
              overflow: 'hidden',
              minHeight: 340,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="/assets/cakes/wedding.jpg"
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg,rgba(63,87,80,.92) 0%,rgba(63,87,80,.7) 55%,rgba(63,87,80,.3) 100%)',
              }}
            />
            <div
              className="pad-lg"
              style={{
                position: 'relative',
                padding: 56,
                maxWidth: 560,
                color: '#fff',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  fontSize: 'clamp(28px,3.6vw,42px)',
                  lineHeight: 1.1,
                  marginBottom: 14,
                }}
              >
                Have another cake design in mind?
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#e3efe9',
                  fontSize: 17,
                  lineHeight: 1.75,
                  marginBottom: 26,
                }}
              >
                Let's make something special together. We'd love to help bring
                your cake to life.
              </p>
              <a href="#order" className="btn-white">
                Custom cake enquiry
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
