const sections = [
  {
    heading: 'Ordering',
    body: "All cakes are made to order via our enquiry form or by contacting us directly. Submitting an enquiry doesn't guarantee a booking — we'll confirm availability and pricing by email or phone, and your order is only secured once a deposit has been paid.",
  },
  {
    // Placeholder: confirm actual deposit % and payment methods with Cushla before publishing
    heading: 'Deposits & payment',
    body: 'A non-refundable deposit of 50% is required to confirm your booking, with the remaining balance due 7 days before collection. We accept bank transfer or eftpos on collection. Prices are correct at the time of quoting and may vary based on design complexity, size, and add-ons.',
  },
  {
    // Placeholder: confirm actual lead times with Cushla before publishing
    heading: 'Lead times',
    body: "We recommend booking at least 2 weeks in advance for celebration cakes, and 2 months or more for wedding or large event cakes. Last-minute enquiries are welcome but can't always be accommodated.",
  },
  {
    // Placeholder: confirm change/cancellation windows with Cushla before publishing
    heading: 'Changes & cancellations',
    body: "Changes to size, flavour, or design can be made up to 7 days before your collection date, subject to availability. Cancellations made within 7 days of collection may not be eligible for a refund of the deposit. If you need to reschedule, get in touch as early as possible and we'll do our best to accommodate a new date.",
  },
  {
    heading: 'Collection',
    body: "Cakes are made to order for pickup in Hamilton, Waikato on the date agreed at booking. Please collect at the confirmed time — cakes left uncollected beyond the end of that day may not be held. Once your cake leaves our care, we're not responsible for damage caused by transport, handling, or storage.",
  },
  {
    heading: 'Allergens',
    body: "Our kitchen bakes with wheat, eggs, dairy, and nuts, and cannot guarantee an allergen-free environment. We're happy to accommodate some dietary requirements where possible — please tell us in your enquiry — but cannot guarantee zero cross-contamination. Customers with severe allergies should let us know before booking so we can talk through what's realistic.",
  },
  {
    heading: 'Design & inspiration images',
    body: "Images you send as inspiration are used solely to plan your cake. We do our best to match colours, themes, and designs, but as every cake is handmade, exact replication (especially of complex fondant work or piping) can't be guaranteed.",
  },
  {
    heading: 'Photography & marketing use',
    body: "Photos of your cake may be shared on our website and social channels for promotional purposes. If you'd prefer your cake isn't featured, just let us know when booking.",
  },
]

export default function Terms() {
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
            The fine print
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
            Terms &amp; Conditions
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            A few things to know before booking your cake with us.
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
            gap: 34,
          }}
        >
          {sections.map((s, i) => (
            <div key={i}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 24,
                  marginBottom: 10,
                }}
              >
                {s.heading}
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#5e6d67',
                  fontSize: 16,
                  lineHeight: 1.78,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
