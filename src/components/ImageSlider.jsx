import { useRef, useSyncExternalStore } from 'react'
import Img from './Img.jsx'

// Never changes, so it never resubscribes. Defined out here to keep the
// reference stable across renders.
const neverChanges = () => () => {}
const onClient = () => true
const onServer = () => false

// A horizontally scrolling row of photos, built on CSS scroll-snap rather than
// a JS carousel. The platform already does momentum, touch and keyboard
// scrolling better than a hand-rolled transform would, and there is no index
// state to keep, no slide maths and nothing to recalculate on resize.
//
// Props:
//   photos - [{ src, alt, focus? }], see src/data/gallery.js
//   label  - names the scroll region for assistive tech and the arrow buttons
//   sizes  - CSS `sizes` matching the rendered slide width
//
// No autoplay, deliberately: WCAG 2.2.2 would then require a pause control,
// and a timer is a second motion code path for no benefit on a section whose
// job is to hand people off to /gallery.
export default function ImageSlider({
  photos,
  label,
  sizes = '(max-width: 560px) 76vw, 300px',
}) {
  const trackRef = useRef(null)

  // The arrows render only once JS is running. With JS off they would be dead
  // controls, and the track is scrollable and swipeable without them.
  //
  // useSyncExternalStore rather than a useState/useEffect pair: it is the one
  // hook that is *told* which environment it is in, so it returns false during
  // the prerender and through hydration — matching the static HTML exactly —
  // then true. A setState in an effect would do the same thing but trips the
  // react-hooks/set-state-in-effect rule, and `typeof window` read during
  // render would be a genuine hydration mismatch.
  const enhanced = useSyncExternalStore(neverChanges, onClient, onServer)

  const page = (direction) => {
    const track = trackRef.current
    const slides = track?.firstElementChild?.children
    if (!track || !slides?.length) return

    // Measured from the DOM so the slide width and the CSS gap don't have to
    // be duplicated here — one of them would eventually drift.
    const step =
      slides.length > 1
        ? slides[1].getBoundingClientRect().left -
          slides[0].getBoundingClientRect().left
        : track.clientWidth

    // No `behavior` key: it defaults to 'auto', which resolves to the track's
    // CSS scroll-behavior — and the global prefers-reduced-motion block in
    // index.css already forces that to auto. One source of truth for the
    // motion preference, with no matchMedia read.
    track.scrollBy({ left: direction * step })
  }

  return (
    <div className="la-slider">
      {/* The scroll container is the focusable element, so a keyboard user
          gets Left/Right/Home/End for free. role=group plus a name keeps it
          from being an unlabelled tab stop; the <ul> inside keeps its list
          semantics, so it still announces as "list, N items". */}
      <div
        ref={trackRef}
        className="la-slider-track"
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        <ul className="la-slider-row">
          {photos.map((photo) => (
            <li key={photo.src} className="la-slider-slide">
              <Img
                src={photo.src}
                alt={photo.alt}
                sizes={sizes}
                style={
                  photo.focus ? { objectPosition: photo.focus } : undefined
                }
              />
            </li>
          ))}
        </ul>
      </div>
      {enhanced && (
        <div className="la-slider-controls">
          <button
            type="button"
            className="la-slider-btn"
            onClick={() => page(-1)}
            aria-label={`Scroll ${label} back`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="la-slider-btn"
            onClick={() => page(1)}
            aria-label={`Scroll ${label} forward`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
