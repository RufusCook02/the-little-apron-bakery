function Arrow({ seed, flip }) {
  const id = `sk${seed}`
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '-40px 0' }}
    >
      <svg width="150" height="128" viewBox="0 0 150 128" fill="none">
        <filter id={id} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022"
            numOctaves="2"
            seed={seed}
            result="n"
          />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
        </filter>
        <g
          filter={`url(#${id})`}
          stroke="#8fbfa8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {flip ? (
            <>
              <path d="M120,18 C 30,8 12,70 70,114" />
              <path d="M70,114 l5,-27 M70,114 l-27,-9" />
            </>
          ) : (
            <>
              <path d="M30,18 C 120,8 138,70 80,114" />
              <path d="M80,114 l-5,-27 M80,114 l27,-9" />
            </>
          )}
        </g>
      </svg>
    </div>
  )
}

export default function OurStory() {
  return (
    <div className="la-page">
      <section
        style={{
          background: 'linear-gradient(180deg,#eef7f0,#f6fbf3)',
          padding: '78px 0 64px',
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: '0 auto',
            padding: '0 28px',
            textAlign: 'center',
          }}
        >
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
            Our story
          </span>
          <p
            style={{
              fontFamily: "'Caveat',cursive",
              fontSize: 52,
              fontWeight: 600,
              color: '#7fa99a',
              lineHeight: 1,
              margin: '18px 0 22px',
            }}
          >
            Hi, I'm Cushla
          </p>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            Chief baker, decorator, administrator, content creator and more for
            The Little Apron. There was once a time when I was just a little
            girl learning to bake.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 0 30px' }}>
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: '0 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 90,
          }}
        >
          {/* Where it started */}
          <div
            className="gstory"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 54,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                borderRadius: '24px 24px 24px 120px',
                overflow: 'hidden',
                border: '7px solid #f3f9f3',
                boxShadow: '0 24px 46px -28px rgba(79,111,102,.45)',
              }}
            >
              <img
                src="/assets/story/step-ladder.jpg"
                alt="Little Cushla on the step ladder"
                style={{
                  width: '100%',
                  aspectRatio: '5/6',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div>
              <span
                style={{
                  fontFamily: "'Mulish'",
                  textTransform: 'uppercase',
                  letterSpacing: '.2em',
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#9ec2b3',
                }}
              >
                Chapter one
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'clamp(28px,3.6vw,42px)',
                  lineHeight: 1.1,
                  margin: '10px 0 16px',
                }}
              >
                Where it started
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#5e6d67',
                  fontSize: 17,
                  lineHeight: 1.78,
                }}
              >
                Every passion starts small. Mine started in the kitchen wearing
                a tiny pink apron, baking alongside my mum and dreaming about
                cakes, cafés and creating something special. Those early days
                sparked a love for baking that would follow me for years to
                come.
              </p>
            </div>
          </div>

          <Arrow seed={1} />

          {/* Learning the craft */}
          <div
            className="gstory"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 54,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                order: 2,
                borderRadius: '24px 24px 120px 24px',
                overflow: 'hidden',
                border: '7px solid #f3f9f3',
                boxShadow: '0 24px 46px -28px rgba(79,111,102,.45)',
              }}
            >
              <img
                src="/assets/story/fondant-cake.jpg"
                alt="An early fondant cake"
                style={{
                  width: '100%',
                  aspectRatio: '5/6',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div style={{ order: 1 }}>
              <span
                style={{
                  fontFamily: "'Mulish'",
                  textTransform: 'uppercase',
                  letterSpacing: '.2em',
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#9ec2b3',
                }}
              >
                Chapter two
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'clamp(28px,3.6vw,42px)',
                  lineHeight: 1.1,
                  margin: '10px 0 16px',
                }}
              >
                Learning the craft
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#5e6d67',
                  fontSize: 17,
                  lineHeight: 1.78,
                }}
              >
                As my passion grew, so did my curiosity to learn more — but
                being from a small rural town there were no lessons in my area.
                So we reached out, and many kind people took the time to teach
                me properly: fondant making, cake decorating, and the endless
                possibilities of design and creativity.
              </p>
            </div>
          </div>

          <Arrow seed={7} flip />

          {/* Sugar Shed */}
          <div
            className="gshed pad-lg"
            style={{
              background: '#eef7f0',
              borderRadius: 30,
              padding: 48,
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: 46,
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Mulish'",
                  textTransform: 'uppercase',
                  letterSpacing: '.2em',
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#9ec2b3',
                }}
              >
                Chapter three · age 15
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'clamp(28px,3.6vw,42px)',
                  lineHeight: 1.1,
                  margin: '10px 0 16px',
                }}
              >
                The Sugar Shed
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#5e6d67',
                  fontSize: 17,
                  lineHeight: 1.78,
                }}
              >
                At 15 I landed my dream first job at a dessert restaurant called
                The Sugar Shed in Pukekohe — the best first job a baking gal
                could ask for. That's where I learnt the art of buttercream
                cakes, refined my decorating skills, and truly discovered the
                joy of creating desserts that satisfied the ultimate sweet
                tooth.
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <img
                src="/assets/story/sugar-shed.jpg"
                alt="Cake outside The Sugar Shed"
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  borderRadius: 16,
                  gridRow: 'span 2',
                }}
              />
              <img
                src="/assets/story/sugar-shed-crew.jpg"
                alt="With the crew"
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  borderRadius: 16,
                }}
              />
              <img
                src="/assets/story/learning.jpg"
                alt="Decorating"
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  borderRadius: 16,
                }}
              />
            </div>
          </div>

          <Arrow seed={11} />

          {/* First mixer */}
          <div
            className="gstory"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 54,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                border: '7px solid #f3f9f3',
                boxShadow: '0 24px 46px -28px rgba(79,111,102,.45)',
              }}
            >
              <img
                src="/assets/story/first-mixer.jpg"
                alt="My very first stand mixer"
                style={{
                  width: '100%',
                  aspectRatio: '5/6',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div>
              <span
                style={{
                  fontFamily: "'Mulish'",
                  textTransform: 'uppercase',
                  letterSpacing: '.2em',
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#9ec2b3',
                }}
              >
                Chapter four
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'clamp(28px,3.6vw,42px)',
                  lineHeight: 1.1,
                  margin: '10px 0 16px',
                }}
              >
                My first stand mixer
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#5e6d67',
                  fontSize: 17,
                  lineHeight: 1.78,
                }}
              >
                I saved up my first few paychecks and bought my very first stand
                mixer — that little mint green machine that started it all. For
                years, baking remained something I did for family and friends:
                birthday cakes, celebration cakes, cupcakes for special moments,
                each one made with love.
              </p>
            </div>
          </div>

          <Arrow seed={5} flip />

          {/* CushsCreations */}
          <div
            className="gstory"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 54,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                order: 2,
                borderRadius: 24,
                overflow: 'hidden',
                border: '7px solid #f3f9f3',
                boxShadow: '0 24px 46px -28px rgba(79,111,102,.45)',
              }}
            >
              <img
                src="/assets/story/cushs-creations.jpg"
                alt="Baking as CushsCreations"
                style={{
                  width: '100%',
                  aspectRatio: '5/6',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div style={{ order: 1 }}>
              <span
                style={{
                  fontFamily: "'Mulish'",
                  textTransform: 'uppercase',
                  letterSpacing: '.2em',
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#9ec2b3',
                }}
              >
                Chapter five
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'clamp(28px,3.6vw,42px)',
                  lineHeight: 1.1,
                  margin: '10px 0 16px',
                }}
              >
                CushsCreations
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#5e6d67',
                  fontSize: 17,
                  lineHeight: 1.78,
                }}
              >
                For the last five years, this all lived under CushsCreations.
                Sharing my creations online let me explore my creativity and
                bring people's cake ideas to life. Seeing how much joy a cake
                could bring someone quickly became the most rewarding part.
              </p>
            </div>
          </div>

          <Arrow seed={9} />

          {/* The Little Apron */}
          <div
            className="gshed pad-lg"
            style={{
              background: '#4f6f66',
              borderRadius: 30,
              padding: 54,
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: 48,
              alignItems: 'center',
              color: '#eaf6ee',
            }}
          >
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 24px 46px -24px rgba(0,0,0,.4)',
              }}
            >
              <img
                src="/assets/story/little-apron.jpg"
                alt="Cushla in The Little Apron"
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div>
              <span
                style={{
                  fontFamily: "'Mulish'",
                  textTransform: 'uppercase',
                  letterSpacing: '.2em',
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#b9e5ca',
                }}
              >
                Today
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#fff',
                  fontSize: 'clamp(30px,4vw,46px)',
                  lineHeight: 1.08,
                  margin: '10px 0 16px',
                }}
              >
                The Little Apron
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#d7e8e0',
                  fontSize: 17,
                  lineHeight: 1.78,
                  marginBottom: 18,
                }}
              >
                The Little Apron is where everything came together — a new
                chapter, and most importantly, a new apron. From being that kid
                in the kitchen, to learning, to working, to where I am now, the
                brand signifies the journey I've been on, those involved, and
                the love I have for it.
              </p>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#d7e8e0',
                  fontSize: 16,
                  lineHeight: 1.8,
                  marginBottom: 8,
                }}
              >
                A place where I can:
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 7,
                  fontFamily: "'Mulish'",
                  fontSize: 15.5,
                  color: '#eaf6ee',
                }}
              >
                <span>♡ Create beautiful custom cakes</span>
                <span>♡ Bring customers' visions to life</span>
                <span>♡ Teach kids and adults the joy of baking</span>
                <span>♡ Share creativity through workshops</span>
              </div>
              <p
                style={{
                  fontFamily: "'Caveat',cursive",
                  fontSize: 38,
                  fontWeight: 600,
                  color: '#b9e5ca',
                  marginTop: 22,
                }}
              >
                Because the sweetest memories are made in the kitchen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: '#fff',
          padding: '30px 0 90px',
          textAlign: 'center',
        }}
      >
        <a href="#order" className="btn-primary">
          Let's make your cake
        </a>
      </section>
    </div>
  )
}
