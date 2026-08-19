import { sigPreview } from '../data/cakes.js'
import WaveDivider from '../components/WaveDivider.jsx'

export default function Home() {
  return (
    <div className="la-page">
      {/* HERO */}
      <section
        style={{
          background: 'linear-gradient(180deg,#eef7f0 0%,#f6fbf3 100%)',
          padding: '80px 0 90px',
        }}
      >
        <div
          className="g2"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 28px',
            display: 'grid',
            gridTemplateColumns: '1.05fr .95fr',
            gap: 60,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 26,
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
                Handmade with love
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 600,
                color: '#3f5750',
                fontSize: 'clamp(44px,6vw,76px)',
                lineHeight: 1.02,
                letterSpacing: '.005em',
              }}
            >
              <span style={{ display: 'block' }}>Sweet stuff</span>
              <span style={{ display: 'block' }}>for life's</span>
              <span style={{ display: 'block' }}>
                sweetest <em style={{ color: '#7fa99a' }}>moments</em>
              </span>
            </h1>
            <p
              style={{
                fontFamily: "'Mulish'",
                color: '#5e6d67',
                fontSize: 18,
                lineHeight: 1.7,
                maxWidth: 440,
                margin: '26px 0 30px',
              }}
            >
              Handcrafted cakes and cupcakes, made with love to brighten smiles
              and satisfy a sweet tooth.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a href="#signature" className="btn-primary">
                View signature cakes
              </a>
              <a href="#order" className="btn-outline">
                Enquire about a custom cake
              </a>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-14px -14px auto auto',
                width: 'auto',
                zIndex: 2,
                animation: 'laBob 5s ease-in-out infinite',
              }}
            >
              <img
                src="/assets/bow.png"
                alt=""
                style={{ width: 82, height: 'auto' }}
              />
            </div>
            <div
              style={{
                borderRadius: '24px 24px 220px 220px',
                overflow: 'hidden',
                boxShadow: '0 30px 60px -28px rgba(79,111,102,.4)',
                border: '8px solid #fff',
              }}
            >
              <img
                src="/assets/brand-mixer.png"
                alt="The Little Apron mixer and cake"
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 18,
                left: -18,
                background: '#fff',
                borderRadius: 16,
                padding: '14px 20px',
                boxShadow: '0 16px 30px -16px rgba(79,111,102,.5)',
                fontFamily: "'Caveat',cursive",
                color: '#7fa99a',
                fontSize: 20,
                fontWeight: 600,
                transform: 'rotate(-3deg)',
              }}
            >
              made fresh, just for you
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div
        style={{
          background: '#4f6f66',
          color: '#cfe9d8',
          overflow: 'hidden',
          padding: '14px 0',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            gap: 42,
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: 'italic',
            fontSize: 22,
            letterSpacing: '.06em',
            animation: 'laMarquee 22s linear infinite',
          }}
        >
          <span>
            Freshly baked&nbsp;·&nbsp;Handmade with love&nbsp;·&nbsp;Custom
            cakes&nbsp;·&nbsp;Cupcakes&nbsp;·&nbsp;DIY
            kits&nbsp;·&nbsp;Workshops&nbsp;·&nbsp;Hamilton NZ&nbsp;·
          </span>
          <span>
            Freshly baked&nbsp;·&nbsp;Handmade with love&nbsp;·&nbsp;Custom
            cakes&nbsp;·&nbsp;Cupcakes&nbsp;·&nbsp;DIY
            kits&nbsp;·&nbsp;Workshops&nbsp;·&nbsp;Hamilton NZ&nbsp;·&nbsp;
          </span>
        </div>
      </div>

      {/* SIGNATURE PREVIEW */}
      <section style={{ background: '#fff', padding: '90px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 18,
              marginBottom: 42,
            }}
          >
            <div>
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
                Our most-loved
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'clamp(30px,4vw,46px)',
                  lineHeight: 1.1,
                  marginTop: 12,
                }}
              >
                Signature cakes
              </h2>
            </div>
            <a href="#signature" className="text-link-green">
              View all styles →
            </a>
          </div>
          <div
            className="g4"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 22,
            }}
          >
            {sigPreview.map((cake, i) => (
              <a
                key={i}
                href="#signature"
                className="card-hover"
                style={{
                  display: 'block',
                  borderRadius: 18,
                  overflow: 'hidden',
                  background: '#f3f9f3',
                  border: '1px solid rgba(79,111,102,.1)',
                }}
              >
                <img
                  src={cake.img}
                  alt={cake.name}
                  style={{
                    width: '100%',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ padding: '18px 20px' }}>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 600,
                      color: '#3f5750',
                      fontSize: 23,
                    }}
                  >
                    {cake.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Mulish'",
                      color: '#7fa99a',
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: '.04em',
                      marginTop: 4,
                    }}
                  >
                    From {cake.from}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 32,
            }}
          >
            Don't see your style?{' '}
            <a href="#order" className="text-link-green">
              We do custom too →
            </a>
          </p>
        </div>
      </section>

      {/* Wave: white → white (squiggle break) */}
      <WaveDivider background="#ffffff" fill="#ffffff" stroke="#7fa99a" />

      {/* EVENT BLOCK */}
      <section style={{ background: '#fff', padding: '20px 0 84px' }}>
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: '0 28px',
            textAlign: 'center',
          }}
        >
          <img
            src="/assets/bow.png"
            alt=""
            style={{ width: 58, height: 'auto', margin: '0 auto 14px' }}
          />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              color: '#3f5750',
              fontSize: 'clamp(32px,4.5vw,50px)',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Have an event coming up?
          </h2>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.75,
              marginBottom: 30,
            }}
          >
            Based in Hamilton, we're your local for custom cakes. Whatever the
            occasion, we've got your cake creations covered — short notice or
            well in advance.
          </p>
          <a href="#contact" className="btn-primary">
            Check availability
          </a>
        </div>
      </section>

      {/* Wave: white → sage */}
      <WaveDivider background="#ffffff" fill="#f3f9f3" stroke="#7fa99a" />

      {/* WHAT WE OFFER */}
      <section style={{ background: '#f3f9f3', padding: '90px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
          <div
            style={{
              textAlign: 'center',
              maxWidth: 680,
              margin: '0 auto 56px',
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
              What we offer
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 600,
                color: '#3f5750',
                fontSize: 'clamp(30px,4vw,46px)',
                lineHeight: 1.12,
                margin: '14px 0 18px',
              }}
            >
              More than just cake
            </h2>
            <p
              style={{
                fontFamily: "'Mulish'",
                color: '#5e6d67',
                fontSize: 17,
                lineHeight: 1.75,
              }}
            >
              At The Little Apron, baking is creativity, taste, joy and bringing
              people together. What makes it even more special is the smile on
              the birthday child's face upon pick-up.
            </p>
          </div>
          <div
            className="g3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 26,
            }}
          >
            <a
              href="#signature"
              className="card-hover"
              style={{
                display: 'block',
                background: '#fff',
                border: '1px solid rgba(79,111,102,.12)',
                borderRadius: 20,
                padding: '40px 30px',
                textAlign: 'center',
              }}
            >
              <img
                src="/assets/icons/cake.png"
                alt=""
                style={{
                  width: 96,
                  height: 96,
                  objectFit: 'contain',
                  margin: '0 auto 22px',
                }}
              />
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 27,
                  marginBottom: 10,
                }}
              >
                Custom Cakes
              </h3>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#6a7872',
                  fontSize: 15.5,
                  lineHeight: 1.7,
                }}
              >
                Beautifully designed cakes tailored to your celebration.
              </p>
            </a>
            <a
              href="#cupcakes"
              className="card-hover"
              style={{
                display: 'block',
                background: '#fff',
                border: '1px solid rgba(79,111,102,.12)',
                borderRadius: 20,
                padding: '40px 30px',
                textAlign: 'center',
              }}
            >
              <img
                src="/assets/icons/cupcake.png"
                alt=""
                style={{
                  width: 96,
                  height: 96,
                  objectFit: 'contain',
                  margin: '0 auto 22px',
                }}
              />
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 27,
                  marginBottom: 10,
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
                }}
              >
                Perfect for parties, gifts, or simply treating yourself.
              </p>
            </a>
            <a
              href="#diy"
              className="card-hover"
              style={{
                display: 'block',
                background: '#fff',
                border: '1px solid rgba(79,111,102,.12)',
                borderRadius: 20,
                padding: '40px 30px',
                textAlign: 'center',
              }}
            >
              <img
                src="/assets/icons/whisk.png"
                alt=""
                style={{
                  width: 96,
                  height: 96,
                  objectFit: 'contain',
                  margin: '0 auto 22px',
                }}
              />
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 27,
                  marginBottom: 10,
                }}
              >
                DIY Cake Kits
              </h3>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#6a7872',
                  fontSize: 15.5,
                  lineHeight: 1.7,
                }}
              >
                When you don't have the time, but want to add your special
                touch.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Wave: sage → dark green */}
      <WaveDivider background="#f3f9f3" fill="#4f6f66" stroke="#b9e5ca" />

      {/* QUOTE BANNER */}
      <section style={{ background: '#4f6f66', padding: '34px 0' }}>
        <div
          style={{
            maxWidth: 680,
            margin: '0 auto',
            padding: '0 32px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Caveat',cursive",
              color: '#b9e5ca',
              fontSize: 46,
              lineHeight: 0.4,
              height: 18,
            }}
          >
            "
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: 'italic',
              color: '#eaf6ee',
              fontSize: 'clamp(17px,2vw,21px)',
              lineHeight: 1.5,
            }}
          >
            Every cake is designed to make a celebration feel a little more
            special. Birthdays, weddings, gender reveals, baby showers — you
            name it, we have cake for it.
          </p>
        </div>
      </section>

      {/* Wave: dark green → white */}
      <WaveDivider background="#4f6f66" fill="#ffffff" stroke="#cfe9d8" />

      {/* BUDGET BLOCK */}
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
            <img
              src="/assets/bow.png"
              alt=""
              style={{
                position: 'absolute',
                top: -26,
                left: -22,
                width: 96,
                height: 'auto',
                transform: 'rotate(-18deg)',
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
              On a budget?
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 600,
                color: '#3f5750',
                fontSize: 'clamp(28px,3.8vw,42px)',
                lineHeight: 1.12,
                margin: '12px 0 14px',
              }}
            >
              Sweet options for every budget
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
              Cakes can get expensive — so we've created options to suit
              different budgets without compromising on style or taste, from
              cupcakes to DIY kits to a simple canvas cake.
            </p>
            <a href="#sweet-stuff" className="btn-primary">
              See budget-friendly options →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
