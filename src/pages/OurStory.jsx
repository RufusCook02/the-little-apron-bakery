import Img from '../components/Img.jsx'

function Arrow({ seed, flip }) {
  const id = `sk${seed}`
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '-40px 0' }}
    >
      {/* Fixed 150px wide would push past the viewport edge inside the 20px
          page padding at 390px; the clamp keeps it inside. */}
      <svg
        width="150"
        height="128"
        viewBox="0 0 150 128"
        fill="none"
        style={{ width: 'clamp(96px, 30vw, 150px)', height: 'auto' }}
      >
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

// Shared by the three Sugar Shed photos. The white border is what reads as a
// print edge and keeps the overlaps legible where two photos meet.
const collagePhoto = {
  position: 'absolute',
  objectFit: 'cover',
  borderRadius: 14,
  border: '6px solid #fff',
  boxShadow: '0 18px 34px -18px rgba(79,111,102,.55)',
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
          <h1
            style={{
              fontFamily: "'Caveat',cursive",
              fontSize: 'var(--fs-h1)',
              fontWeight: 600,
              color: '#7fa99a',
              lineHeight: 1,
              margin: '18px 0 22px',
            }}
          >
            Hi, I'm Cushla
          </h1>
          <p
            style={{
              fontFamily: "'Mulish'",
              color: '#5e6d67',
              fontSize: 18,
              lineHeight: 1.78,
            }}
          >
            I wear multiple aprons at The Little Apron – chief baker, decorator,
            administrator, content creator and more. There was once a time when
            I was just a little girl learning to bake.
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
              <Img
                src="/assets/story/step-ladder.jpg"
                sizes="(max-width: 900px) 92vw, 500px"
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
                  fontSize: 'var(--fs-h2)',
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
                a tiny red apron, baking alongside my mum and dreaming about
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
              <Img
                src="/assets/story/fondant-cake.jpg"
                sizes="(max-width: 900px) 92vw, 500px"
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
                  fontSize: 'var(--fs-h2)',
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
                As my passion grew, so did my curiosity to learn more, but being
                from a small rural town there were no lessons in my area. So we
                reached out to the community. I was lucky enough to be taught by
                others with the same passion. That's when I got the knack for
                fondant design, baking and cake decorating.
              </p>
            </div>
          </div>

          <Arrow seed={7} flip />

          {/* Sugar Shed */}
          <div
            className="gstory"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 54,
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
                Chapter three
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  color: '#3f5750',
                  fontSize: 'var(--fs-h2)',
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
                At 15, I landed my dream first job at a dessert restaurant
                called The Sugar Shed in Pukekohe. With the mentorship of Fiona,
                this was the best first job a gal could ask for. That's where I
                learnt the art of buttercream cakes and truly discovered the joy
                of creating desserts and custom cakes that satisfied the
                ultimate sweet tooth.
              </p>
            </div>
            {/* Overlapping collage. `picture { display: contents }` in index.css
                means each <img> is itself the positioned element, so the photos
                position directly against this container with no wrappers. All
                offsets are percentages so the whole thing scales from 390px up
                without a media query. */}
            <div style={{ position: 'relative', aspectRatio: '1/1' }}>
              <Img
                src="/assets/story/sugar-shed.jpg"
                sizes="(max-width: 900px) 50vw, 270px"
                alt="Cake outside The Sugar Shed"
                style={{
                  ...collagePhoto,
                  left: '1%',
                  top: '2%',
                  width: '54%',
                  aspectRatio: '3/4',
                  transform: 'rotate(-3deg)',
                  zIndex: 1,
                }}
              />
              <Img
                src="/assets/story/sugar-shed-crew.jpg"
                sizes="(max-width: 900px) 50vw, 250px"
                alt="With the crew"
                style={{
                  ...collagePhoto,
                  right: '1%',
                  top: 0,
                  width: '50%',
                  aspectRatio: '4/3',
                  transform: 'rotate(3deg)',
                  zIndex: 2,
                }}
              />
              <Img
                src="/assets/story/learning.jpg"
                sizes="(max-width: 900px) 50vw, 260px"
                alt="Decorating"
                style={{
                  ...collagePhoto,
                  left: '24%',
                  bottom: 0,
                  width: '52%',
                  aspectRatio: '4/3',
                  transform: 'rotate(-2deg)',
                  zIndex: 3,
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
              <Img
                src="/assets/story/first-mixer.jpg"
                sizes="(max-width: 900px) 92vw, 500px"
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
                  fontSize: 'var(--fs-h2)',
                  lineHeight: 1.1,
                  margin: '10px 0 16px',
                }}
              >
                First big purchase
              </h2>
              <p
                style={{
                  fontFamily: "'Mulish'",
                  color: '#5e6d67',
                  fontSize: 17,
                  lineHeight: 1.78,
                }}
              >
                I saved up my first few pay cheques and bought my very first
                stand mixer. The little mint green machine that started it all
                and still goes strong. For years, baking remained something I
                did for family and friends: birthday cakes, celebration cakes,
                cupcakes – you name it.
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
              <Img
                src="/assets/story/cushs-creations.jpg"
                sizes="(max-width: 900px) 92vw, 500px"
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
                  fontSize: 'var(--fs-h2)',
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
              <Img
                src="/assets/story/little-apron.jpg"
                sizes="(max-width: 900px) 92vw, 500px"
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
                  fontSize: 'var(--fs-h2)',
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
                The Little Apron is where everything came together – a new
                chapter, and most importantly, a new apron. From being that
                little kid in the kitchen to where I am today, the brand
                represents the journey, the people who've been part of it, and
                the love I've always had for it all.
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
                The Little Apron is a place where I can:
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
                <span>♡ Bring your visions to life</span>
                <span>♡ Teach kids and adults the art of baking</span>
                <span>♡ Share my passion through workshops and events</span>
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
        <a href="/order" className="btn-primary">
          Let's make your cake
        </a>
      </section>
    </div>
  )
}
