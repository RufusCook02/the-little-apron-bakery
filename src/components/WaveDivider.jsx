// Gentle wave — 9 half-cycles (4.5 cycles) across 1200px, so a peak lands on the
// horizontal centre (x=600) and the curve is mirror-symmetric about it.
// Each half-cycle is a cubic with both control points at the extremum, which puts
// the rendered peak ~6.75 units from the centre line (y=24), not the full ±9.
const HALVES = 9
const HALF_WIDTH = 1200 / HALVES
const MID = 24
const AMP = 9

const WAVE_PATH = Array.from({ length: HALVES }, (_, i) => {
  const start = i * HALF_WIDTH
  // Even half-cycles bulge up (peak), odd ones bulge down (trough).
  const y = i % 2 === 0 ? MID - AMP : MID + AMP
  const c1 = (start + HALF_WIDTH / 3).toFixed(1)
  const c2 = (start + (HALF_WIDTH * 2) / 3).toFixed(1)
  const end = (start + HALF_WIDTH).toFixed(1)
  return `C${c1},${y} ${c2},${y} ${end},${MID}`
}).join(' ')

export default function WaveDivider({
  background,
  fill,
  stroke,
  strokeWidth = 2.5,
}) {
  const path = `M0,${MID} ${WAVE_PATH}`
  return (
    <div style={{ lineHeight: 0, background }}>
      <svg
        className="wave-divider"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
      >
        <path d={`${path} L1200,48 L0,48 Z`} fill={fill} />
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
