import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const DOMAINS = [
  {
    label: 'Computer Vision',
    score: 92,
    color: '#00d4ff',
    skills: ['OpenCV', 'CNNs', 'UNet', 'Object Detection', 'GANs', 'CUDA'],
  },
  {
    label: 'NLP & GenAI',
    score: 80,
    color: '#ec4899',
    skills: ['LLMs', 'RAG', 'LangChain', 'Transformers', 'Hugging Face'],
  },
  {
    label: 'Tools & Infra',
    score: 75,
    color: '#10b981',
    skills: ['Docker', 'AWS', 'Azure', 'FastAPI', 'Streamlit', 'Git'],
  },
  {
    label: 'Languages',
    score: 85,
    color: '#f59e0b',
    skills: ['Python', 'SQL', 'C++', 'R', 'JavaScript', 'Java'],
  },
  {
    label: 'Core ML / DL',
    score: 88,
    color: '#7c3aed',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras', 'Transfer Learning'],
  },
]

const N   = DOMAINS.length
const CX  = 200
const CY  = 195
const R   = 148
const LEVELS = [20, 40, 60, 80, 100]

function ang(i) {
  return -Math.PI / 2 + (2 * Math.PI / N) * i
}

function pt(i, pct) {
  const a = ang(i)
  return {
    x: CX + (pct / 100) * R * Math.cos(a),
    y: CY + (pct / 100) * R * Math.sin(a),
  }
}

function polyStr(scores) {
  return scores.map((s, i) => {
    const p = pt(i, s)
    return `${p.x},${p.y}`
  }).join(' ')
}

function labelAnchor(i) {
  const a = ang(i)
  const x = Math.cos(a)
  if (x > 0.2)  return 'start'
  if (x < -0.2) return 'end'
  return 'middle'
}

function labelPos(i) {
  const a   = ang(i)
  const off = R + 28
  return { x: CX + off * Math.cos(a), y: CY + off * Math.sin(a) }
}

export default function SkillsRadar() {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const [prog,  setProg]    = useState(0)   // 0 → 1 animation progress
  const [active, setActive] = useState(null) // hovered domain index

  // Animate radar fill in on entry
  useEffect(() => {
    if (!inView) return
    let start = null
    const duration = 900
    const tick = (now) => {
      if (!start) start = now
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProg(eased)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView])

  const animatedScores = DOMAINS.map(d => d.score * prog)

  return (
    <div ref={ref} style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>

      {/* ── Radar SVG ── */}
      <div style={{
        flex: '0 0 auto',
        background: 'rgba(5,6,15,0.5)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '12px 8px',
      }}>
        <svg viewBox="0 0 400 390" style={{ width: 380, height: 370, display: 'block' }}>
          <defs>
            <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.08" />
            </radialGradient>
          </defs>

          {/* Grid rings */}
          {LEVELS.map(lvl => (
            <polygon
              key={lvl}
              points={polyStr(Array(N).fill(lvl))}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
          ))}

          {/* Grid level labels */}
          {LEVELS.map(lvl => {
            const p = pt(0, lvl)
            return (
              <text key={lvl} x={p.x + 5} y={p.y - 3}
                fontSize="8" fontFamily="JetBrains Mono"
                fill="rgba(100,116,139,0.6)" textAnchor="start">
                {lvl}
              </text>
            )
          })}

          {/* Axis spokes */}
          {DOMAINS.map((_, i) => {
            const outer = pt(i, 100)
            return (
              <line key={i}
                x1={CX} y1={CY} x2={outer.x} y2={outer.y}
                stroke="rgba(255,255,255,0.08)" strokeWidth="1"
              />
            )
          })}

          {/* Active domain axis highlight */}
          {active !== null && (() => {
            const outer = pt(active, 100)
            return (
              <line
                x1={CX} y1={CY} x2={outer.x} y2={outer.y}
                stroke={DOMAINS[active].color}
                strokeWidth="1.5" strokeOpacity="0.5"
              />
            )
          })()}

          {/* Data polygon fill */}
          <polygon
            points={polyStr(animatedScores)}
            fill="url(#radarFill)"
            stroke="none"
          />

          {/* Data polygon stroke */}
          <polygon
            points={polyStr(animatedScores)}
            fill="none"
            stroke="rgba(0,212,255,0.55)"
            strokeWidth="1.5"
          />

          {/* Score dots */}
          {DOMAINS.map((d, i) => {
            const p     = pt(i, animatedScores[i])
            const isAct = active === i
            return (
              <g key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{ cursor: 'default' }}
              >
                {isAct && (
                  <circle cx={p.x} cy={p.y} r={10}
                    fill="none" stroke={d.color} strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                )}
                <circle cx={p.x} cy={p.y} r={isAct ? 5 : 3.5}
                  fill={isAct ? d.color : 'rgba(0,212,255,0.8)'}
                  style={{ filter: isAct ? `drop-shadow(0 0 6px ${d.color})` : 'none', transition: 'r 0.15s' }}
                />
              </g>
            )
          })}

          {/* Domain axis labels */}
          {DOMAINS.map((d, i) => {
            const pos     = labelPos(i)
            const anchor  = labelAnchor(i)
            const isAct   = active === i
            const lines   = d.label.split(' ')
            return (
              <text key={i}
                x={pos.x} y={pos.y - (lines.length - 1) * 6}
                textAnchor={anchor}
                fontFamily="JetBrains Mono" fontWeight="600"
                fontSize="10.5"
                fill={isAct ? d.color : `${d.color}90`}
                style={{ transition: 'fill 0.2s', cursor: 'default' }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {lines.map((line, li) => (
                  <tspan key={li} x={pos.x} dy={li === 0 ? 0 : 13}>{line}</tspan>
                ))}
                <tspan
                  x={pos.x} dy={13}
                  fontSize="9" fontWeight="400"
                  fill={isAct ? d.color : 'rgba(100,116,139,0.7)'}
                >
                  {Math.round(d.score * prog)}%
                </tspan>
              </text>
            )
          })}
        </svg>
      </div>

      {/* ── Domain breakdown sidebar ── */}
      <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{
          fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
          color: 'rgba(124,58,237,0.8)', letterSpacing: '0.1em', marginBottom: 4,
        }}>
          DOMAIN PROFICIENCY
        </div>

        {DOMAINS.map((d, i) => {
          const isAct = active === i
          return (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                border: `1px solid ${isAct ? d.color + '50' : 'rgba(255,255,255,0.05)'}`,
                background: isAct ? `${d.color}08` : 'rgba(255,255,255,0.02)',
                cursor: 'default',
                transition: 'all 0.2s',
              }}
            >
              {/* Label + score */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.72rem',
                  color: isAct ? d.color : '#e2e8f0',
                  fontWeight: 600, letterSpacing: '0.03em',
                  transition: 'color 0.2s',
                }}>
                  {d.label}
                </span>
                <span style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.68rem',
                  color: isAct ? d.color : 'var(--muted)',
                  transition: 'color 0.2s',
                }}>
                  {Math.round(d.score * prog)}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                height: 3, borderRadius: 3,
                background: 'rgba(255,255,255,0.06)',
                marginBottom: 10,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${d.score * prog}%`,
                  borderRadius: 3,
                  background: `linear-gradient(to right, ${d.color}80, ${d.color})`,
                  boxShadow: isAct ? `0 0 8px ${d.color}` : 'none',
                  transition: 'box-shadow 0.2s',
                }} />
              </div>

              {/* Top skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {d.skills.map(sk => (
                  <span key={sk} style={{
                    padding: '2px 8px', borderRadius: 12,
                    fontSize: '0.62rem', fontFamily: 'JetBrains Mono',
                    background: `${d.color}12`,
                    border: `1px solid ${d.color}25`,
                    color: `${d.color}bb`,
                  }}>
                    {sk}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
