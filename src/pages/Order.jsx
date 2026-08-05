import { useEffect, useRef, useState } from 'react'

const MAX_FILES = 5
const MAX_TOTAL_BYTES = 4 * 1024 * 1024 // ~4MB combined, leaving headroom under Vercel's 4.5MB request limit

export default function Order({
  orderOpen,
  setOrderOpen,
  sent,
  submitting,
  submitError,
  handleSubmit,
}) {
  const orderSent = !!sent?.order
  const isSubmitting = !!submitting?.order
  const errorMessage = submitError?.order
  const tsRef = useRef(null)
  const [fileError, setFileError] = useState('')

  useEffect(() => {
    if (tsRef.current) tsRef.current.value = String(Date.now())
  }, [])

  const onSubmit = (e) => {
    const input = e.target.elements?.inspirationImages
    const files = input?.files ? Array.from(input.files) : []

    if (files.length > MAX_FILES) {
      e.preventDefault()
      setFileError(
        `Please attach up to ${MAX_FILES} images (you selected ${files.length}).`,
      )
      return
    }

    const totalBytes = files.reduce((sum, f) => sum + f.size, 0)
    if (totalBytes > MAX_TOTAL_BYTES) {
      e.preventDefault()
      setFileError(
        'Your images add up to more than 4MB combined — please remove one or choose smaller files.',
      )
      return
    }

    setFileError('')
    handleSubmit('order')(e)
  }

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
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 32,
                  marginBottom: 10,
                }}
              >
                Enquiry received — yay!
              </h2>
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
              onSubmit={onSubmit}
              style={{
                position: 'relative',
                background: '#f6fbf3',
                border: '1px solid rgba(79,111,102,.12)',
                borderRadius: 24,
                padding: '38px 38px 40px',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 24,
                  marginBottom: 22,
                }}
              >
                The essentials
              </h2>
              <input type="hidden" name="ts" ref={tsRef} defaultValue="" />
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: 1,
                  height: 1,
                  overflow: 'hidden',
                }}
              />
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
                    htmlFor="order-firstName"
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
                    name="firstName"
                    id="order-firstName"
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
                    htmlFor="order-lastName"
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
                    name="lastName"
                    id="order-lastName"
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
                    htmlFor="order-email"
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
                    name="email"
                    id="order-email"
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
                    htmlFor="order-phone"
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
                    name="phone"
                    id="order-phone"
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
                    htmlFor="order-collectionDate"
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
                    name="collectionDate"
                    id="order-collectionDate"
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
                    htmlFor="order-cakeSize"
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
                    name="cakeSize"
                    id="order-cakeSize"
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
                    htmlFor="order-cakeFlavour"
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
                    name="cakeFlavour"
                    id="order-cakeFlavour"
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
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 600,
                      color: '#3f5750',
                      fontSize: 24,
                      margin: '30px 0 18px',
                    }}
                  >
                    A few more details
                  </h2>
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
                        htmlFor="order-occasion"
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
                        name="occasion"
                        id="order-occasion"
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
                        htmlFor="order-guests"
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
                        name="guests"
                        id="order-guests"
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
                        htmlFor="order-venue"
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
                        name="venue"
                        id="order-venue"
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
                        htmlFor="order-dietary"
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
                        name="dietary"
                        id="order-dietary"
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
                        htmlFor="order-design"
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
                        name="design"
                        id="order-design"
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
                        htmlFor="order-inspirationImages"
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
                        name="inspirationImages"
                        id="order-inspirationImages"
                        multiple
                        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif"
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
                      {fileError && (
                        <p
                          style={{
                            fontFamily: "'Mulish'",
                            fontSize: 12.5,
                            color: '#b23b3b',
                            marginTop: 6,
                          }}
                        >
                          {fileError}
                        </p>
                      )}
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
              {errorMessage && (
                <p
                  role="alert"
                  style={{
                    fontFamily: "'Mulish'",
                    fontSize: 13.5,
                    color: '#b23b3b',
                    marginTop: 14,
                  }}
                >
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
                style={{
                  marginTop: 14,
                  fontSize: 14,
                  padding: 17,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? 'Sending…' : 'Send enquiry'}
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
