import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'

const DOMAINS = {
  cv:    { label: 'Computer Vision', color: '#00d4ff' },
  ml:    { label: 'Core ML / DL',    color: '#7c3aed' },
  nlp:   { label: 'NLP & GenAI',     color: '#ec4899' },
  lang:  { label: 'Languages',       color: '#f59e0b' },
  tools: { label: 'Tools & Infra',   color: '#10b981' },
}

const NODES = [
  // Computer Vision
  { id: 'OpenCV',            x: 108, y: 112, r: 7,  d: 'cv'    },
  { id: 'CNNs',              x: 178, y: 72,  r: 8,  d: 'cv'    },
  { id: 'Object Detection',  x: 245, y: 125, r: 7,  d: 'cv'    },
  { id: 'Segmentation',      x: 148, y: 185, r: 7,  d: 'cv'    },
  { id: 'GANs',              x: 75,  y: 170, r: 6,  d: 'cv'    },
  { id: 'CUDA',              x: 225, y: 192, r: 6,  d: 'cv'    },
  // Core ML / DL
  { id: 'PyTorch',           x: 418, y: 162, r: 10, d: 'ml'    },
  { id: 'TensorFlow',        x: 495, y: 135, r: 9,  d: 'ml'    },
  { id: 'Keras',             x: 472, y: 215, r: 7,  d: 'ml'    },
  { id: 'Scikit-learn',      x: 385, y: 252, r: 7,  d: 'ml'    },
  { id: 'Deep Learning',     x: 452, y: 298, r: 8,  d: 'ml'    },
  { id: 'Transfer Learning', x: 535, y: 268, r: 7,  d: 'ml'    },
  { id: 'Neural Networks',   x: 390, y: 325, r: 7,  d: 'ml'    },
  // NLP & GenAI
  { id: 'LLMs',              x: 710, y: 85,  r: 9,  d: 'nlp'   },
  { id: 'Transformers',      x: 798, y: 128, r: 7,  d: 'nlp'   },
  { id: 'LangChain',         x: 658, y: 148, r: 7,  d: 'nlp'   },
  { id: 'RAG',               x: 738, y: 182, r: 7,  d: 'nlp'   },
  { id: 'Hugging Face',      x: 688, y: 222, r: 7,  d: 'nlp'   },
  { id: 'LSTM',              x: 835, y: 192, r: 6,  d: 'nlp'   },
  // Languages
  { id: 'Python',            x: 95,  y: 365, r: 10, d: 'lang'  },
  { id: 'R',                 x: 52,  y: 425, r: 5,  d: 'lang'  },
  { id: 'SQL',               x: 162, y: 428, r: 5,  d: 'lang'  },
  { id: 'C++',               x: 132, y: 460, r: 5,  d: 'lang'  },
  { id: 'JavaScript',        x: 222, y: 378, r: 5,  d: 'lang'  },
  // Tools & Infra
  { id: 'Docker',            x: 685, y: 360, r: 7,  d: 'tools' },
  { id: 'AWS',               x: 772, y: 345, r: 7,  d: 'tools' },
  { id: 'FastAPI',           x: 655, y: 418, r: 6,  d: 'tools' },
  { id: 'Git',               x: 852, y: 378, r: 5,  d: 'tools' },
  { id: 'Streamlit',         x: 738, y: 442, r: 5,  d: 'tools' },
  { id: 'Azure',             x: 815, y: 438, r: 5,  d: 'tools' },
]

const EDGES = [
  // CV internal
  ['OpenCV', 'CNNs'], ['CNNs', 'Object Detection'], ['CNNs', 'Segmentation'],
  ['GANs', 'OpenCV'], ['CUDA', 'CNNs'], ['CUDA', 'Object Detection'],
  // ML internal
  ['PyTorch', 'TensorFlow'], ['TensorFlow', 'Keras'], ['PyTorch', 'Keras'],
  ['PyTorch', 'Deep Learning'], ['TensorFlow', 'Transfer Learning'],
  ['Deep Learning', 'Neural Networks'], ['Scikit-learn', 'Neural Networks'],
  ['Transfer Learning', 'Deep Learning'],
  // NLP internal
  ['LLMs', 'Transformers'], ['LLMs', 'LangChain'], ['LLMs', 'RAG'],
  ['Transformers', 'Hugging Face'], ['LangChain', 'RAG'], ['LSTM', 'Transformers'],
  ['Hugging Face', 'RAG'],
  // Languages internal
  ['Python', 'R'], ['Python', 'SQL'], ['Python', 'C++'], ['Python', 'JavaScript'],
  // Tools internal
  ['Docker', 'AWS'], ['Docker', 'FastAPI'], ['AWS', 'Azure'],
  ['FastAPI', 'Streamlit'], ['Git', 'Docker'],
  // Cross-cluster bridges
  ['PyTorch', 'OpenCV'],
  ['CUDA', 'PyTorch'],
  ['Deep Learning', 'CNNs'],
  ['Transfer Learning', 'Object Detection'],
  ['LSTM', 'Deep Learning'],
  ['LLMs', 'PyTorch'],
  ['Hugging Face', 'Transformers'],
  ['Python', 'PyTorch'],
  ['Python', 'TensorFlow'],
  ['Python', 'Scikit-learn'],
  ['Python', 'Docker'],
  ['Python', 'FastAPI'],
  ['C++', 'CUDA'],
  ['JavaScript', 'FastAPI'],
  ['Docker', 'AWS'],
]

const VW = 920, VH = 495

export default function SkillConstellation() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [prog,    setProg]    = useState(0)
  const [hovered, setHovered] = useState(null)

  // Animate edges in on entry
  useEffect(() => {
    if (!inView) return
    let start = null
    const duration = 1200
    const tick = (now) => {
      if (!start) start = now
      const t = Math.min((now - start) / duration, 1)
      setProg(1 - Math.pow(1 - t, 3))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView])

  // Build adjacency set for hovered node
  const connected = useMemo(() => {
    if (!hovered) return new Set()
    const s = new Set()
    EDGES.forEach(([a, b]) => {
      if (a === hovered) s.add(b)
      if (b === hovered) s.add(a)
    })
    return s
  }, [hovered])

  const nodeMap = useMemo(() => Object.fromEntries(NODES.map(n => [n.id, n])), [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 14, alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'rgba(124,58,237,0.8)', letterSpacing: '0.1em' }}>
          SKILL CONSTELLATION
        </span>
        <span style={{ color: 'rgba(100,116,139,0.5)', fontSize: '0.6rem', fontFamily: 'JetBrains Mono' }}>—</span>
        {Object.values(DOMAINS).map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: d.color, boxShadow: `0 0 5px ${d.color}` }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'var(--muted)' }}>{d.label}</span>
          </div>
        ))}
      </div>

      {/* SVG canvas */}
      <div style={{
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(5,6,15,0.65)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Faint grid */}
          {[...Array(9)].map((_, i) => (
            <line key={`gx${i}`} x1={(i + 1) * VW / 10} y1={0} x2={(i + 1) * VW / 10} y2={VH}
              stroke="rgba(255,255,255,0.018)" strokeWidth="1" />
          ))}
          {[...Array(5)].map((_, i) => (
            <line key={`gy${i}`} x1={0} y1={(i + 1) * VH / 6} x2={VW} y2={(i + 1) * VH / 6}
              stroke="rgba(255,255,255,0.018)" strokeWidth="1" />
          ))}

          {/* Edges */}
          {EDGES.map(([a, b], idx) => {
            const na = nodeMap[a], nb = nodeMap[b]
            if (!na || !nb) return null
            const isActive = hovered && (hovered === a || hovered === b)
            const dimmed   = hovered && !isActive
            const col = isActive
              ? DOMAINS[na.d].color
              : 'rgba(148,163,184,0.18)'
            return (
              <line key={idx}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={col}
                strokeWidth={isActive ? 1.5 : 0.8}
                opacity={dimmed ? 0.04 : prog * (isActive ? 1 : 0.9)}
                style={{ transition: 'opacity 0.2s, stroke 0.2s, stroke-width 0.2s' }}
              />
            )
          })}

          {/* Nodes */}
          {NODES.map((n, i) => {
            const domain  = DOMAINS[n.d]
            const isHov   = hovered === n.id
            const isNeigh = connected.has(n.id)
            const dimmed  = hovered && !isHov && !isNeigh
            const showLabel = n.r >= 8 || isHov || isNeigh

            return (
              <motion.g key={n.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.022 }}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'default' }}
              >
                {/* Glow ring on hover */}
                {isHov && (
                  <circle cx={n.x} cy={n.y} r={n.r + 10}
                    fill="none"
                    stroke={domain.color}
                    strokeWidth="1"
                    strokeOpacity="0.35"
                  />
                )}

                {/* Outer ring for neighbours */}
                {isNeigh && (
                  <circle cx={n.x} cy={n.y} r={n.r + 5}
                    fill="none"
                    stroke={domain.color}
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                  />
                )}

                {/* Node body */}
                <circle
                  cx={n.x} cy={n.y}
                  r={isHov ? n.r + 2 : n.r}
                  fill={isHov ? domain.color : isNeigh ? `${domain.color}cc` : `${domain.color}70`}
                  opacity={dimmed ? 0.12 : 1}
                  style={{
                    filter: isHov ? `drop-shadow(0 0 8px ${domain.color})` : isNeigh ? `drop-shadow(0 0 4px ${domain.color}80)` : 'none',
                    transition: 'opacity 0.2s, r 0.15s',
                  }}
                />

                {/* Label */}
                {showLabel && (
                  <text
                    x={n.x}
                    y={n.y - n.r - (isHov ? 8 : 5)}
                    textAnchor="middle"
                    fontSize={isHov ? 10.5 : 9}
                    fontFamily="JetBrains Mono"
                    fontWeight={isHov ? '600' : '400'}
                    fill={isHov ? domain.color : dimmed ? 'rgba(100,116,139,0.2)' : `${domain.color}cc`}
                    style={{ transition: 'fill 0.2s, font-size 0.15s', pointerEvents: 'none' }}
                  >
                    {n.id}
                  </text>
                )}
              </motion.g>
            )
          })}
        </svg>

        {/* Hover tooltip */}
        {hovered && (() => {
          const n = nodeMap[hovered]
          const d = DOMAINS[n.d]
          return (
            <div style={{
              position: 'absolute', bottom: 16, right: 16,
              background: 'rgba(5,6,15,0.92)',
              border: `1px solid ${d.color}40`,
              borderRadius: 8,
              padding: '8px 14px',
              backdropFilter: 'blur(12px)',
              pointerEvents: 'none',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: d.color, fontWeight: 600 }}>
                {hovered}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'var(--muted)', marginTop: 2 }}>
                {d.label} · {connected.size} connections
              </div>
            </div>
          )
        })()}
      </div>

      <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(100,116,139,0.45)', marginTop: 8, textAlign: 'center', letterSpacing: '0.06em' }}>
        hover a node to explore connections
      </p>
    </div>
  )
}
