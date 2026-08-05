export default function Contact({ sent, handleSubmit }) {
  const contactSent = !!sent?.contact

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
            maxWidth: 720,
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
            Say hello
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
            Get in touch
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            Have a question or want to discuss a cake idea? We'd love to hear
            from you.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '50px 0 80px' }}>
        <div
          className="g2"
          style={{
            maxWidth: 1040,
            margin: '0 auto',
            padding: '0 28px',
            display: 'grid',
            gridTemplateColumns: '1.15fr .85fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          <div>
            {contactSent ? (
              <div
                style={{
                  background: '#eef7f0',
                  border: '1px solid rgba(79,111,102,.14)',
                  borderRadius: 20,
                  padding: 42,
                  textAlign: 'center',
                }}
              >
                <img
                  src="/assets/bow.png"
                  alt=""
                  style={{ width: 54, height: 'auto', margin: '0 auto 14px' }}
                />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontWeight: 600,
                    color: '#3f5750',
                    fontSize: 28,
                    marginBottom: 8,
                  }}
                >
                  Message sent!
                </h3>
                <p
                  style={{
                    fontFamily: "'Mulish'",
                    color: '#5e6d67',
                    fontSize: 16,
                  }}
                >
                  Thanks for reaching out — we'll reply as soon as we can. xx
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit('contact')}
                style={{
                  background: '#f6fbf3',
                  border: '1px solid rgba(79,111,102,.12)',
                  borderRadius: 22,
                  padding: '34px 34px 38px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      fontFamily: "'Mulish'",
                      fontWeight: 600,
                      fontSize: 13,
                      color: '#4f6f66',
                      marginBottom: 7,
                      display: 'block',
                    }}
                  >
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      border: '1px solid rgba(79,111,102,.25)',
                      borderRadius: 12,
                      background: '#fff',
                    }}
                  />
                </div>
                <div
                  className="g2"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontFamily: "'Mulish'",
                        fontWeight: 600,
                        fontSize: 13,
                        color: '#4f6f66',
                        marginBottom: 7,
                        display: 'block',
                      }}
                    >
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      style={{
                        width: '100%',
                        padding: '13px 16px',
                        border: '1px solid rgba(79,111,102,.25)',
                        borderRadius: 12,
                        background: '#fff',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontFamily: "'Mulish'",
                        fontWeight: 600,
                        fontSize: 13,
                        color: '#4f6f66',
                        marginBottom: 7,
                        display: 'block',
                      }}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      style={{
                        width: '100%',
                        padding: '13px 16px',
                        border: '1px solid rgba(79,111,102,.25)',
                        borderRadius: 12,
                        background: '#fff',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "'Mulish'",
                      fontWeight: 600,
                      fontSize: 13,
                      color: '#4f6f66',
                      marginBottom: 7,
                      display: 'block',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Tell us what you're after…"
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      border: '1px solid rgba(79,111,102,.25)',
                      borderRadius: 12,
                      background: '#fff',
                      resize: 'vertical',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-submit"
                  style={{ marginTop: 6 }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>

          <div
            style={{
              background: '#4f6f66',
              borderRadius: 22,
              padding: '38px 34px',
              color: '#eaf6ee',
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 600,
                color: '#fff',
                fontSize: 26,
                marginBottom: 22,
              }}
            >
              Reach us directly
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                fontFamily: "'Mulish'",
                fontSize: 15.5,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: '#a9cabe',
                    marginBottom: 4,
                  }}
                >
                  Phone
                </div>
                <a href="tel:0273470648" style={{ color: '#fff' }}>
                  027 347 0648
                </a>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: '#a9cabe',
                    marginBottom: 4,
                  }}
                >
                  Email
                </div>
                <a
                  href="mailto:hello@thelittleapron.co.nz"
                  style={{ color: '#fff' }}
                >
                  hello@thelittleapron.co.nz
                </a>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: '#a9cabe',
                    marginBottom: 4,
                  }}
                >
                  Based in
                </div>
                <span>Waikato, New Zealand</span>
              </div>
            </div>
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,.16)',
                marginTop: 26,
                paddingTop: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "'Mulish'",
                  fontSize: 12,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#a9cabe',
                  marginBottom: 14,
                }}
              >
                Follow along
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 11,
                  fontFamily: "'Mulish'",
                  fontSize: 15,
                }}
              >
                <a href="#" className="footer-link">
                  Instagram
                </a>
                <a href="#" className="footer-link">
                  Facebook
                </a>
                <a href="#" className="footer-link">
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
