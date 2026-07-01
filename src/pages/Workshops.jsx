export default function Workshops({ sent, handleSubmit }) {
  const workshopSent = !!sent?.workshop

  return (
    <div className="la-page">
      <section style={{ position: 'relative', background: '#4f6f66', color: '#eaf6ee', padding: '84px 0 72px', overflow: 'hidden' }}>
        <img src="/assets/bow.png" alt="" style={{ position: 'absolute', top: 30, right: '8%', width: 120, opacity: .45 }} />
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 28px', textAlign: 'center', position: 'relative' }}>
          <span style={{ fontFamily: "'Mulish'", textTransform: 'uppercase', letterSpacing: '.22em', fontSize: 13, fontWeight: 700, color: '#b9e5ca' }}>Workshops &amp; events</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#fff', fontSize: 'clamp(40px,5.5vw,64px)', lineHeight: 1.05, margin: '14px 0 20px' }}>
            Learn the art of<br />cake decorating
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.4vw,26px)', color: '#d7e8e0', lineHeight: 1.5, maxWidth: 680, margin: '0 auto' }}>
            "I didn't have these opportunities available when I was starting out, and I want to ensure others can learn like I eventually did."
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '74px 0' }}>
        <div className="g2" style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 54, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 'clamp(28px,3.6vw,42px)', lineHeight: 1.1, marginBottom: 16 }}>Fun, creative &amp; beginner friendly</h2>
            <p style={{ fontFamily: "'Mulish'", color: '#5e6d67', fontSize: 17, lineHeight: 1.78 }}>Perfect for kids, beginners, or anyone who loves getting creative with cake. Whether you're decorating your first cake or just looking for a creative experience, our workshops are a place to learn, laugh and create something delicious.</p>
          </div>
          <div style={{ background: '#f6fbf3', border: '1px solid rgba(79,111,102,.12)', borderRadius: 22, padding: '34px 36px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 24, marginBottom: 18 }}>What to expect</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                'Step-by-step decorating guidance',
                'All tools and materials provided',
                'Your own cake to decorate and take home',
                'A relaxed, fun environment',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                  <img src="/assets/bow.png" alt="" style={{ width: 28, height: 'auto', marginTop: 2 }} />
                  <p style={{ fontFamily: "'Mulish'", color: '#5e6d67', fontSize: 16, lineHeight: 1.55 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#dcefe2', padding: '74px 0' }}>
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <span style={{ display: 'inline-block', background: '#4f6f66', color: '#fff', fontFamily: "'Mulish'", fontWeight: 700, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', padding: '7px 16px', borderRadius: 999, marginBottom: 16 }}>Coming soon</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 'clamp(26px,3.4vw,38px)', lineHeight: 1.12, marginBottom: 12 }}>Register your interest</h2>
            <p style={{ fontFamily: "'Mulish'", color: '#52635c', fontSize: 16, lineHeight: 1.7 }}>Our first workshops launch soon. Pop your details below and be the first to know when dates are released.</p>
          </div>

          {workshopSent ? (
            <div style={{ background: '#fff', borderRadius: 20, padding: 40, textAlign: 'center' }}>
              <img src="/assets/bow.png" alt="" style={{ width: 54, height: 'auto', margin: '0 auto 14px' }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: '#3f5750', fontSize: 28, marginBottom: 8 }}>You're on the list!</h3>
              <p style={{ fontFamily: "'Mulish'", color: '#5e6d67', fontSize: 16 }}>Thank you — we'll be in touch the moment workshop dates are released. xx</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit('workshop')} style={{ background: '#fff', borderRadius: 20, padding: '34px 34px 38px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontFamily: "'Mulish'", fontWeight: 600, fontSize: 13, color: '#4f6f66', letterSpacing: '.04em', marginBottom: 7, display: 'block' }}>Name</label>
                <input required type="text" placeholder="Your name" style={{ width: '100%', padding: '13px 16px', border: '1px solid rgba(79,111,102,.25)', borderRadius: 12, background: '#fff' }} />
              </div>
              <div>
                <label style={{ fontFamily: "'Mulish'", fontWeight: 600, fontSize: 13, color: '#4f6f66', letterSpacing: '.04em', marginBottom: 7, display: 'block' }}>Email</label>
                <input required type="email" placeholder="you@email.com" style={{ width: '100%', padding: '13px 16px', border: '1px solid rgba(79,111,102,.25)', borderRadius: 12, background: '#fff' }} />
              </div>
              <div>
                <label style={{ fontFamily: "'Mulish'", fontWeight: 600, fontSize: 13, color: '#4f6f66', letterSpacing: '.04em', marginBottom: 7, display: 'block' }}>Workshop interest</label>
                <select required style={{ width: '100%', padding: '13px 16px', border: '1px solid rgba(79,111,102,.25)', borderRadius: 12, background: '#fff' }}>
                  <option value="">Select one…</option>
                  <option>Kids</option>
                  <option>Adults</option>
                  <option>Both</option>
                </select>
              </div>
              <button type="submit" className="btn-submit" style={{ marginTop: 6 }}>Register interest</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
