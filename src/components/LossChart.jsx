import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

const TRAIN = [2.45,2.12,1.88,1.65,1.44,1.26,1.11,0.98,0.87,0.78,0.71,0.64,0.58,0.53,0.48,0.44,0.41,0.38,0.35,0.33,0.31,0.29,0.27,0.26,0.24,0.23,0.22,0.21,0.20,0.19,0.18,0.17,0.17,0.16,0.16,0.15,0.15,0.14,0.14,0.14,0.13,0.13,0.13,0.12,0.12,0.12,0.12,0.11,0.11,0.11]
const VAL   = [2.38,2.08,1.85,1.64,1.44,1.27,1.12,1.00,0.90,0.82,0.75,0.69,0.64,0.59,0.55,0.52,0.49,0.46,0.44,0.42,0.40,0.39,0.37,0.36,0.35,0.34,0.33,0.33,0.32,0.32,0.31,0.31,0.30,0.30,0.30,0.29,0.29,0.29,0.28,0.28,0.28,0.27,0.27,0.27,0.26,0.26,0.26,0.25,0.25,0.25]

const W = 360, H = 175
const PAD = { l: 42, r: 14, t: 18, b: 38 }
const PW  = W - PAD.l - PAD.r
const PH  = H - PAD.t - PAD.b
const YMAX = 2.5, N = TRAIN.length

function pt(i, v) {
  return [PAD.l + (i / (N - 1)) * PW, PAD.t + PH - (Math.min(v, YMAX) / YMAX) * PH]
}
function buildD(data) {
  return data.map((v, i) => { const [x, y] = pt(i, v); return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}` }).join(' ')
}
const trainD = buildD(TRAIN)
const valD   = buildD(VAL)
const Y_TICKS = [0, 0.5, 1.0, 1.5, 2.0, 2.5]
const X_TICKS = [0, 10, 20, 30, 40, 49]

export default function LossChart() {
  const trainRef = useRef(null)
  const valRef   = useRef(null)
  const wrapRef  = useRef(null)
  const inView   = useInView(wrapRef, { once: true })

  useEffect(() => {
    if (!inView) return
    ;[trainRef, valRef].forEach((r, ri) => {
      if (!r.current) return
      const len = r.current.getTotalLength()
      r.current.style.strokeDasharray  = len
      r.current.style.strokeDashoffset = len
      r.current.style.transition = `stroke-dashoffset ${ri === 0 ? 2.4 : 2.0}s cubic-bezier(.4,0,.2,1) ${ri * 0.2}s`
      requestAnimationFrame(() => { r.current.style.strokeDashoffset = '0' })
    })
  }, [inView])

  const [tx, ty] = pt(N - 1, TRAIN[N - 1])
  const [vx, vy] = pt(N - 1, VAL[N - 1])

  return (
    <div ref={wrapRef}>
      {/* legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'rgba(0,212,255,0.7)', letterSpacing: '0.1em' }}>
          TRAINING CURVES
        </span>
        <div style={{ display: 'flex', gap: 14 }}>
          {[{ lbl: 'train_loss', col: '#00d4ff' }, { lbl: 'val_loss', col: '#ec4899' }].map(l => (
            <div key={l.lbl} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 18, height: 2, background: l.col, borderRadius: 1 }}/>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'var(--muted)' }}>{l.lbl}</span>
            </div>
          ))}
        </div>
      </div>

      <svg width={W} height={H} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="lcTrainFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lcValFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* grid */}
        {Y_TICKS.map(v => { const y = PAD.t + PH - (v / YMAX) * PH; return (
          <g key={v}>
            <line x1={PAD.l} y1={y} x2={PAD.l + PW} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <text x={PAD.l - 6} y={y + 4} textAnchor="end" fontSize="9" fontFamily="JetBrains Mono" fill="rgba(100,116,139,0.8)">{v}</text>
          </g>
        )})}
        {X_TICKS.map(i => { const x = PAD.l + (i / (N - 1)) * PW; return (
          <g key={i}>
            <line x1={x} y1={PAD.t} x2={x} y2={PAD.t + PH} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            <text x={x} y={PAD.t + PH + 14} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="rgba(100,116,139,0.8)">{i + 1}</text>
          </g>
        )})}

        {/* axis labels */}
        <text x={PAD.l + PW / 2} y={H - 2} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="rgba(100,116,139,0.9)">epoch</text>
        <text x={10} y={PAD.t + PH / 2} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="rgba(100,116,139,0.9)"
          transform={`rotate(-90,10,${PAD.t + PH / 2})`}>loss</text>

        {/* axes */}
        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + PH} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <line x1={PAD.l} y1={PAD.t + PH} x2={PAD.l + PW} y2={PAD.t + PH} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>

        {/* area fills */}
        {inView && <>
          <path d={`${valD} L${(PAD.l+PW).toFixed(1)},${(PAD.t+PH).toFixed(1)} L${PAD.l},${(PAD.t+PH).toFixed(1)} Z`} fill="url(#lcValFill)"/>
          <path d={`${trainD} L${(PAD.l+PW).toFixed(1)},${(PAD.t+PH).toFixed(1)} L${PAD.l},${(PAD.t+PH).toFixed(1)} Z`} fill="url(#lcTrainFill)"/>
        </>}

        {/* curves */}
        <path ref={valRef}   d={valD}   fill="none" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path ref={trainRef} d={trainD} fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* end dots + labels */}
        {inView && <>
          <circle cx={tx} cy={ty} r="3.5" fill="#00d4ff" style={{ filter: 'drop-shadow(0 0 5px #00d4ff)' }}/>
          <circle cx={vx} cy={vy} r="3.5" fill="#ec4899" style={{ filter: 'drop-shadow(0 0 5px #ec4899)' }}/>
          <text x={tx + 5} y={ty - 4} fontSize="8" fontFamily="JetBrains Mono" fill="#00d4ff">0.11</text>
          <text x={vx + 5} y={vy - 4} fontSize="8" fontFamily="JetBrains Mono" fill="#ec4899">0.25</text>
        </>}
      </svg>
    </div>
  )
}
