export default function Order({ orderOpen, setOrderOpen, sent, handleSubmit }) {
  const orderSent = !!sent?.order

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
          <img
            src="/assets/bow.png"
            alt=""
            style={{ width: 60, height: 'auto', margin: '0 auto 14px' }}
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
            Custom cake enquiry
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 600,
              color: '#3f5750',
              fontSize: 'clamp(38px,5.5vw,62px)',
              lineHeight: 1.05,
              margin: '12px 0 16px',
            }}
          >
            Let's make something special
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            Tell us a little about your dream cake and we'll be in touch to
            bring it to life. Start with the essentials — add as much detail as
            you like.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '50px 0 60px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 28px' }}>
          {orderSent ? (
            <div
              style={{
                background: '#eef7f0',
                border: '1px solid rgba(79,111,102,.14)',
                borderRadius: 24,
                padding: 48,
                textAlign: 'center',
              }}
            >
              <img
                src="/assets/bow.png"
                alt=""
                style={{ width: 64, height: 'auto', margin: '0 auto 16px' }}
              />
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 32,
                  marginBottom: 10,
                }}
              >
                Enquiry received — yay!
              </h3>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#5e6d67',
                  fontSize: 16.5,
                  lineHeight: 1.7,
                  maxWidth: 440,
                  margin: '0 auto',
                }}
              >
                Thank you so much. We'll be in touch soon to chat through your
                design, finalise the details and organise pick-up. xx
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit('order')}
              style={{
                background: '#f6fbf3',
                border: '1px solid rgba(79,111,102,.12)',
                borderRadius: 24,
                padding: '38px 38px 40px',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 24,
                  marginBottom: 22,
                }}
              >
                The essentials
              </h3>
              <div
                className="g2"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px 18px',
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
                    First name
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
                    Last name
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
                    Collection date
                  </label>
                  <input
                    required
                    type="date"
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
                    Cake size
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      border: '1px solid rgba(79,111,102,.25)',
                      borderRadius: 12,
                      background: '#fff',
                    }}
                  >
                    <option value="">Select…</option>
                    <option>4 inch (8 servings)</option>
                    <option>6 inch (28 servings)</option>
                    <option>8 inch (56 servings)</option>
                    <option>10 inch (84 servings)</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1/-1' }}>
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
                    Cake flavour
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      border: '1px solid rgba(79,111,102,.25)',
                      borderRadius: 12,
                      background: '#fff',
                    }}
                  >
                    <option value="">Select…</option>
                    <option>Vanilla</option>
                    <option>Chocolate</option>
                    <option>Lemon</option>
                    <option>Red velvet</option>
                    <option>Confetti</option>
                    <option>Carrot</option>
                    <option>Banana</option>
                    <option>Raspberry white choc</option>
                  </select>
                </div>
              </div>

              {orderOpen && (
                <>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 600,
                      color: '#3f5750',
                      fontSize: 24,
                      margin: '30px 0 18px',
                    }}
                  >
                    A few more details
                  </h3>
                  <div
                    className="g2"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px 18px',
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
                        Occasion
                      </label>
                      <input
                        type="text"
                        placeholder="Birthday, wedding…"
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
                        Estimated guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        style={{
                          width: '100%',
                          padding: '13px 16px',
                          border: '1px solid rgba(79,111,102,.25)',
                          borderRadius: 12,
                          background: '#fff',
                        }}
                      />
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
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
                        Venue / event location
                      </label>
                      <input
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
                    <div style={{ gridColumn: '1/-1' }}>
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
                        Any dietary requirements?
                      </label>
                      <input
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
                    <div style={{ gridColumn: '1/-1' }}>
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
                        Tell us about your cake design
                      </label>
                      <textarea
                        rows="4"
                        placeholder="Flowers, colours, theme, inspo…"
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
                    <div style={{ gridColumn: '1/-1' }}>
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
                        Upload inspiration pictures
                      </label>
                      <input
                        type="file"
                        multiple
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          border: '1px dashed rgba(79,111,102,.4)',
                          borderRadius: 12,
                          background: '#fff',
                          fontSize: 14,
                          color: '#6a7872',
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="button"
                className="btn-toggle"
                style={{ marginTop: 20 }}
                onClick={() => setOrderOpen((o) => !o)}
              >
                {orderOpen ? '– Show fewer details' : '+ Add more details'}
              </button>
              <button
                type="submit"
                className="btn-submit"
                style={{ marginTop: 14, fontSize: 14, padding: 17 }}
              >
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* GET TO KNOW YOUR BAKER */}
      <section style={{ background: '#dcefe2', padding: '64px 0' }}>
        <div
          className="g2"
          style={{
            maxWidth: 1040,
            margin: '0 auto',
            padding: '0 28px',
            display: 'grid',
            gridTemplateColumns: '.85fr 1.15fr',
            gap: 46,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              borderRadius: '200px 200px 24px 24px',
              overflow: 'hidden',
              border: '7px solid #fff',
              boxShadow: '0 24px 46px -28px rgba(79,111,102,.45)',
            }}
          >
            <img
              src="/assets/story/little-apron.jpg"
              alt="Cushla"
              style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
            />
          </div>
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
              While you wait
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 600,
                color: '#3f5750',
                fontSize: 'clamp(28px,3.6vw,42px)',
                lineHeight: 1.1,
                margin: '12px 0 16px',
              }}
            >
              Get to know your baker
            </h2>
            <p
              style={{
                fontFamily: "'Mulish'",
                color: '#52635c',
                fontSize: 17,
                lineHeight: 1.75,
                marginBottom: 24,
              }}
            >
              From a little girl in a pink apron to The Little Apron — read the
              story behind the cakes, and follow along on socials to see the
              latest from the kitchen.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a
                href="#our-story"
                className="btn-primary"
                style={{ fontSize: 13, padding: '15px 30px' }}
              >
                Our Story
              </a>
              <a
                href="#"
                className="btn-outline"
                style={{ fontSize: 13, padding: '15px 30px' }}
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
