const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer
      style={{
        background: '#3f5750',
        color: '#cfe0d8',
        padding: '70px 0 30px',
      }}
    >
      <div
        className="gfooter"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3,auto)',
          justifyContent: 'center',
          columnGap: 72,
          rowGap: 36,
        }}
      >
        <div>
          <img
            src="/assets/logo-landscape-light.png"
            alt="The Little Apron"
            style={{
              height: 46,
              width: 'auto',
              objectFit: 'contain',
              marginBottom: 16,
            }}
          />
          <p
            style={{
              fontFamily: "'Caveat',cursive",
              fontSize: 34,
              fontWeight: 600,
              color: '#b9e5ca',
              lineHeight: 1.05,
              marginBottom: 18,
            }}
          >
            Baked by Hand,
            <br />
            With Love,
            <br />
            For You
          </p>
        </div>

        <div>
          <div
            style={{
              fontFamily: "'Mulish'",
              textTransform: 'uppercase',
              letterSpacing: '.16em',
              fontSize: 12,
              fontWeight: 700,
              color: '#8fb0a4',
              marginBottom: 16,
            }}
          >
            Get in touch
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              fontFamily: "'Mulish'",
              fontSize: 14.5,
              color: '#cfe0d8',
            }}
          >
            <a href="tel:0273470648" className="footer-link">
              027 347 0648
            </a>
            <a href="mailto:hello@thelittleapron.co.nz" className="footer-link">
              hello@thelittleapron.co.nz
            </a>
            <span style={{ color: '#9fb6ac' }}>Waikato, New Zealand</span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 18,
              alignItems: 'center',
            }}
          >
            <a href="#" aria-label="Instagram" className="social-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.6-.07-4.74-.07zM12 6.87a5.13 5.13 0 1 0 0 10.26 5.13 5.13 0 0 0 0-10.26zm0 8.46a3.33 3.33 0 1 1 0-6.66 3.33 3.33 0 0 1 0 6.66zm6.54-8.66a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="social-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="social-icon">
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.43a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .76-5.06v-3.3a5.86 5.86 0 0 0-5.7 5.9A5.86 5.86 0 0 0 10.5 21.4a5.86 5.86 0 0 0 5.86-5.86V9.4a7.5 7.5 0 0 0 4.36 1.4V7.6a4.28 4.28 0 0 1-4.12-1.78z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: "'Mulish'",
              textTransform: 'uppercase',
              letterSpacing: '.16em',
              fontSize: 12,
              fontWeight: 700,
              color: '#8fb0a4',
              marginBottom: 16,
            }}
          >
            More
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 11,
              fontFamily: "'Mulish'",
              fontSize: 14.5,
            }}
          >
            <a href="#" className="footer-link">
              FAQs
            </a>
            <a href="#" className="footer-link">
              Ts &amp; Cs
            </a>
            <a href="#" className="footer-link">
              Cake Care
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '44px auto 0',
          padding: '22px 28px 0',
          borderTop: '1px solid rgba(255,255,255,.12)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 14,
          fontFamily: "'Mulish'",
          fontSize: 13,
          color: '#8fb0a4',
        }}
      >
        <span>© {year} The Little Apron · Hamilton, NZ</span>
      </div>
    </footer>
  )
}
