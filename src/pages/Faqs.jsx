const linkStyle = {
  color: '#4f6f66',
  fontWeight: 600,
  textDecoration: 'underline',
}

const faqs = [
  {
    q: 'How do I order a custom cake?',
    a: (
      <>
        Fill out our{' '}
        <a href="#order" style={linkStyle}>
          enquiry form
        </a>{' '}
        with your date, size, flavour, and any design ideas or inspiration
        pictures. We'll come back to you to confirm pricing and availability,
        then a deposit secures your booking.
      </>
    ),
  },
  {
    // Placeholder: confirm actual lead times with Cushla before publishing
    q: 'How far in advance should I order?',
    a: "We suggest at least 2 weeks notice for most celebration cakes, and more for weddings or large events. If your date is coming up fast, enquire anyway — we'll let you know if we can help.",
  },
  {
    q: 'What sizes and servings do you offer?',
    a: '4 inch (around 8 servings), 6 inch (around 28 servings), 8 inch (around 56 servings), and 10 inch (around 84 servings).',
  },
  {
    q: 'What flavours are available?',
    a: "Vanilla, chocolate, lemon, red velvet, confetti, carrot, banana, and raspberry white chocolate. Can't decide? We're happy to help you pick, or talk through a custom flavour combo.",
  },
  {
    q: 'Can you cater for allergies or dietary requirements?',
    a: "Let us know in your enquiry and we'll talk through what's possible. We can't guarantee an allergen-free cake, as our kitchen isn't nut- or gluten-free, but we'll do our best to accommodate where we can.",
  },
  {
    q: 'Do you deliver, or is it pickup only?',
    a: 'Cakes are collected from us in Hamilton on your chosen date.',
  },
  {
    // Placeholder: confirm actual deposit % and payment methods with Cushla before publishing
    q: 'How do I pay, and is a deposit required?',
    a: 'A deposit of 50% confirms your booking, with the balance due before collection. We accept bank transfer or eftpos on collection.',
  },
  {
    q: 'Can I change my order after booking?',
    a: "Yes, where possible — get in touch as soon as you know what you'd like to change. Changes close to your collection date may be limited depending on the request.",
  },
  {
    q: 'What if I need to cancel?',
    a: (
      <>
        Contact us as early as you can. See our{' '}
        <a href="#terms" style={linkStyle}>
          Terms &amp; Conditions
        </a>{' '}
        for our cancellation policy.
      </>
    ),
  },
  {
    q: 'Do you run cake decorating workshops?',
    a: (
      <>
        Workshops are launching soon for both kids and adults —{' '}
        <a href="#workshops" style={linkStyle}>
          register your interest
        </a>{' '}
        to be first to know when dates open.
      </>
    ),
  },
  {
    q: 'What is included in a DIY Cake Kit?',
    a: 'A freshly baked cake ready to decorate, buttercream piping bags, your choice of decorating colours, and simple instructions — everything you need to decorate at home.',
  },
]

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
            Got questions?
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
              <summary
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 19,
                  cursor: 'pointer',
                }}
              >
                {item.q}
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
