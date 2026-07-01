import { sig } from '../data/cakes.js'

export default function SignatureCakes() {
  return (
    <div className="la-page">
      <section style={{ background: 'linear-gradient(180deg,#eef7f0,#f6fbf3)', padding: '78px 0 56px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Mulish'", textTransform: 'uppercase', letterSpacing: '.22em', fontSize: 13, fontWeight: 700, color: '#6f9486' }}>Set pricing · made effortless</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 'clamp(40px,5.5vw,64px)', lineHeight: 1.05, margin: '14px 0 16px' }}>Signature cakes</h1>
          <p style={{ fontFamily: "'Mulish'", color: '#5e6d67', fontSize: 18, lineHeight: 1.78 }}>Our most-loved cake styles, ready to order with set pricing. Choose your style, size, flavour and colours — we'll take care of the rest. All cakes are filled and decorated in buttercream.</p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div className="g3" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {sig.map((cake, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', borderRadius: 22, overflow: 'hidden', background: '#f6fbf3', border: '1px solid rgba(79,111,102,.12)' }}>
              <div style={{ position: 'relative' }}>
                <img src={cake.img} alt={cake.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,.94)', color: '#4f6f66', fontFamily: "'Mulish'", fontWeight: 700, fontSize: 13, letterSpacing: '.04em', padding: '7px 14px', borderRadius: 999 }}>From {cake.from}</span>
              </div>
              <div style={{ padding: '24px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 26, marginBottom: 8 }}>{cake.name}</h3>
                <p style={{ fontFamily: "'Mulish'", color: '#6a7872', fontSize: 15, lineHeight: 1.65, marginBottom: 16 }}>{cake.blurb}</p>
                <div style={{ borderTop: '1px dashed rgba(79,111,102,.25)', paddingTop: 14, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {cake.prices.map((p, j) => (
                    <div key={j} style={{ fontFamily: "'Mulish'", fontSize: 14, color: '#5e6d67', display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <a href="#order" className="btn-sm-green">Order this style</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INCLUDES */}
      <section style={{ background: '#dcefe2', padding: '64px 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 'clamp(26px,3.4vw,38px)', marginBottom: 26 }}>Every signature cake includes</h2>
          <div className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, textAlign: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 18, padding: '26px 18px' }}>
              <p style={{ fontFamily: "'Mulish'", color: '#52635c', fontSize: 15, lineHeight: 1.6 }}>Filled &amp; decorated<br />in buttercream</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 18, padding: '26px 18px' }}>
              <p style={{ fontFamily: "'Mulish'", color: '#52635c', fontSize: 15, lineHeight: 1.6 }}>Custom colour theme<br />(2–3 colours)</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 18, padding: '26px 18px' }}>
              <p style={{ fontFamily: "'Mulish'", color: '#52635c', fontSize: 15, lineHeight: 1.6 }}>Smooth finish<br />+ simple piping</p>
            </div>
          </div>
          <p style={{ fontFamily: "'Mulish'", color: '#5e6d67', fontSize: 15, marginTop: 20 }}>Extras quoted upon enquiry ♡ &nbsp;Florals, toppers, fillings, fondant and more available.</p>
        </div>
      </section>

      {/* BUDGET */}
      <section id="budget" style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 44px' }}>
            <span style={{ fontFamily: "'Mulish'", textTransform: 'uppercase', letterSpacing: '.22em', fontSize: 13, fontWeight: 700, color: '#6f9486' }}>On a budget?</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 'clamp(28px,3.8vw,44px)', lineHeight: 1.1, margin: '12px 0 14px' }}>Sweet options for every budget</h2>
            <p style={{ fontFamily: "'Mulish'", color: '#5e6d67', fontSize: 17, lineHeight: 1.75 }}>Cakes can get expensive — so we've created options to suit different budgets without compromising on style or taste.</p>
          </div>
          <div className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
            <a href="#cupcakes" className="card-hover-sm" style={{ display: 'block', background: '#f6fbf3', border: '1px solid rgba(79,111,102,.12)', borderRadius: 20, padding: '34px 28px', textAlign: 'center' }}>
              <img src="/assets/icons/cupcake.png" alt="" style={{ width: 72, height: 72, objectFit: 'contain', margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 23, marginBottom: 8 }}>Cupcakes</h3>
              <p style={{ fontFamily: "'Mulish'", color: '#6a7872', fontSize: 14.5, lineHeight: 1.6 }}>Boxes of 6, 12 or 24 — a sweet option on its own or alongside a cake.</p>
            </a>
            <a href="#diy" className="card-hover-sm" style={{ display: 'block', background: '#f6fbf3', border: '1px solid rgba(79,111,102,.12)', borderRadius: 20, padding: '34px 28px', textAlign: 'center' }}>
              <img src="/assets/icons/piping.png" alt="" style={{ width: 72, height: 72, objectFit: 'contain', margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 23, marginBottom: 8 }}>DIY Cake Kit</h3>
              <p style={{ fontFamily: "'Mulish'", color: '#6a7872', fontSize: 14.5, lineHeight: 1.6 }}>Decorate at home — the cake is baked, you bring the fun.</p>
            </a>
            <a href="#order" className="card-hover-sm" style={{ display: 'block', background: '#f6fbf3', border: '1px solid rgba(79,111,102,.12)', borderRadius: 20, padding: '34px 28px', textAlign: 'center' }}>
              <img src="/assets/icons/slice.png" alt="" style={{ width: 72, height: 72, objectFit: 'contain', margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 23, marginBottom: 8 }}>Canvas Cake</h3>
              <p style={{ fontFamily: "'Mulish'", color: '#6a7872', fontSize: 14.5, lineHeight: 1.6 }}>A simple buttercream cake from $40 — minimal fuss, maximum charm.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
