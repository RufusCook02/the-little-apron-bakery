const posts = [
  {
    img: '/assets/cakes/vintage-bow.jpg',
    category: 'Decorating tips',
    title: 'How to get smooth buttercream every time',
    blurb: 'The little tricks that take your home cakes from lumpy to lovely.',
  },
  {
    img: '/assets/cakes/floral.jpg',
    category: 'Behind the scenes',
    title: 'A week in The Little Apron kitchen',
    blurb: 'From flour to florals — what really goes into a weekend of cakes.',
  },
  {
    img: '/assets/cakes/baby-gold.jpg',
    category: 'Planning',
    title: 'How to choose the right cake size',
    blurb: 'Serving 8 or 80? A simple guide to picking the perfect size.',
  },
]

export default function Blog() {
  return (
    <div className="la-page">
      <section
        style={{
          background: 'linear-gradient(180deg,#eef7f0,#f6fbf3)',
          padding: '78px 0 56px',
        }}
      >
        <div
          style={{
            maxWidth: 740,
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
            The journal
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
            Stories from the kitchen
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            Recipes, decorating tips and little behind-the-scenes moments. Our
            first posts are baking — check back soon!
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '60px 0 90px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px' }}>
          <div
            className="g3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 26,
            }}
          >
            {posts.map((post, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: '#f6fbf3',
                  border: '1px solid rgba(79,111,102,.12)',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={post.img}
                    alt=""
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      objectFit: 'cover',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      background: '#fff',
                      color: '#4f6f66',
                      fontFamily: "'Mulish'",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      padding: '6px 12px',
                      borderRadius: 999,
                    }}
                  >
                    Coming soon
                  </span>
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <div
                    style={{
                      fontFamily: "'Mulish'",
                      fontSize: 12,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: '#9ec2b3',
                      marginBottom: 8,
                    }}
                  >
                    {post.category}
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 600,
                      color: '#3f5750',
                      fontSize: 24,
                      lineHeight: 1.2,
                      marginBottom: 8,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Mulish'",
                      color: '#6a7872',
                      fontSize: 15,
                      lineHeight: 1.65,
                    }}
                  >
                    {post.blurb}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <p
              style={{
                fontFamily: "'Mulish'",
                color: '#6a7872',
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              Want the latest from the kitchen in the meantime?
            </p>
            <a href="#" className="btn-primary">
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
