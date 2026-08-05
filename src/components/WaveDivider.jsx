// Gentle wave — 4 cycles across 1200px, amplitude ±9 from center (y=24)
const WAVE_PATH =
  'M0,24 C50,15 100,15 150,24 C200,33 250,33 300,24 C350,15 400,15 450,24 C500,33 550,33 600,24 C650,15 700,15 750,24 C800,33 850,33 900,24 C950,15 1000,15 1050,24 C1100,33 1150,33 1200,24'

export default function WaveDivider({
  background,
  fill,
  stroke,
  strokeWidth = 2.5,
}) {
  return (
    <div style={{ lineHeight: 0, background }}>
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 42 }}
      >
        <path d={`${WAVE_PATH} L1200,48 L0,48 Z`} fill={fill} />
        <path
          d={WAVE_PATH}
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
