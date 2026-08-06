const sections = [
  {
    heading: 'When you get home',
    body: "Keep your cake in its box until you're ready to serve — this protects the design and keeps it fresh. Store it somewhere cool and out of direct sunlight; avoid the car boot on a hot day if you can.",
  },
  {
    heading: 'Storage',
    body: "Buttercream cakes are best kept in the fridge if you're not serving within a few hours, especially in warm weather. Take it out 30–60 minutes before serving so the buttercream can soften slightly — it tastes best at cool room temperature, not fridge-cold.",
  },
  {
    // Placeholder: confirm actual shelf life with Cushla before publishing
    heading: 'Freshness',
    body: 'Cakes are freshly baked and best enjoyed within 2–3 days of collection. Keep leftovers covered or boxed in the fridge, and bring back to room temperature before eating.',
  },
  {
    heading: 'Handling',
    body: 'Cakes are delicate, especially with fresh flowers, piping, or toppers — carry it flat, avoid tilting, and secure it on a flat surface in the car (footwell is safer than the boot). Fresh flowers on cakes are for decoration only, not for eating — please remove them before cutting.',
  },
  {
    heading: 'Cutting',
    body: "Use a warm, clean, sharp knife for the cleanest slices — wipe and re-warm it between cuts. Let the cake sit at room temperature for a few minutes before cutting if it's been in the fridge.",
  },
  {
    heading: 'Allergens',
    body: 'Please check with us beforehand if you have any allergies. Our cakes are made in a kitchen that also uses nuts, gluten, and dairy.',
  },
]

export default function CakeCare() {
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
            Keep it fresh
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
            Cake Care
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            A little guidance to keep your cake looking and tasting its best
            from collection to cutting.
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
