export default function DiyKits() {
  const includes = [
    'A freshly baked cake, ready to decorate',
    'Buttercream piping bags',
    'Decorating colours of your choice',
    'Simple, easy-to-follow decorating instructions',
  ]

  return (
    <div className="la-page">
      <section style={{ background: 'linear-gradient(180deg,#eef7f0,#f6fbf3)', padding: '78px 0 56px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <img src="/assets/icons/piping.png" alt="" style={{ width: 80, height: 80, objectFit: 'contain', margin: '0 auto 18px' }} />
          <span style={{ fontFamily: "'Mulish'", textTransform: 'uppercase', letterSpacing: '.22em', fontSize: 13, fontWeight: 700, color: '#6f9486' }}>All the fun, none of the fuss</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 'clamp(40px,5.5vw,64px)', lineHeight: 1.05, margin: '12px 0 16px' }}>DIY Cake Kits</h1>
          <p style={{ fontFamily: "'Mulish'", color: '#5e6d67', fontSize: 18, lineHeight: 1.78 }}>Decorate your own cake at home. The perfect hands-on activity for little bakers and busy families — all the fun of decorating, without the stress of baking.</p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div className="g2" style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50, alignItems: 'center' }}>
          <div style={{ borderRadius: '24px 24px 120px 24px', overflow: 'hidden', border: '7px solid #f3f9f3', boxShadow: '0 24px 46px -28px rgba(79,111,102,.45)' }}>
            <img src="/assets/cakes/canvas.jpg" alt="DIY cake kit" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 'clamp(26px,3.4vw,38px)', marginBottom: 20 }}>Each kit includes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {includes.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <img src="/assets/bow.png" alt="" style={{ width: 30, height: 'auto', marginTop: 2 }} />
                  <p style={{ fontFamily: "'Mulish'", color: '#5e6d67', fontSize: 16.5, lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
            <a href="#order" className="btn-primary" style={{ marginTop: 30, display: 'inline-flex' }}>Shop DIY kits</a>
          </div>
        </div>
      </section>
    </div>
  )
}
