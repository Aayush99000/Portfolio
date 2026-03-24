import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const CLUSTERS = {
  cv:    { label: 'Computer Vision', cx: 155, cy: 105, rx: 135, ry: 108, color: '#00d4ff' },
  ml:    { label: 'Core ML / DL',    cx: 460, cy: 220, rx: 125, ry: 118, color: '#7c3aed' },
  nlp:   { label: 'NLP & GenAI',     cx: 760, cy: 125, rx: 135, ry: 108, color: '#ec4899' },
  lang:  { label: 'Languages',       cx: 155, cy: 388, rx: 135, ry:  68, color: '#f59e0b' },
  tools: { label: 'Tools & Infra',   cx: 765, cy: 385, rx: 140, ry:  68, color: '#10b981' },
}

const SKILLS = [
  // Computer Vision
  { name: 'OpenCV',             x: 118, y: 82,  c: 'cv',    r: 6 },
  { name: 'CUDA',               x: 72,  y: 45,  c: 'cv',    r: 5 },
  { name: 'Object Detection',   x: 205, y: 60,  c: 'cv',    r: 6 },
  { name: 'Image Segmentation', x: 168, y: 135, c: 'cv',    r: 6 },
  { name: 'GANs',               x: 82,  y: 158, c: 'cv',    r: 5 },
  { name: 'CNNs',               x: 230, y: 118, c: 'cv',    r: 6 },
  // Core ML / DL
  { name: 'PyTorch',            x: 425, y: 148, c: 'ml',    r: 8 },
  { name: 'TensorFlow',         x: 500, y: 108, c: 'ml',    r: 7 },
  { name: 'Keras',              x: 468, y: 205, c: 'ml',    r: 6 },
  { name: 'Scikit-learn',       x: 385, y: 228, c: 'ml',    r: 6 },
  { name: 'Transfer Learning',  x: 525, y: 235, c: 'ml',    r: 6 },
  { name: 'Neural Networks',    x: 415, y: 285, c: 'ml',    r: 6 },
  { name: 'Deep Learning',      x: 478, y: 315, c: 'ml',    r: 7 },
  // NLP & GenAI
  { name: 'LLMs',               x: 745, y: 58,  c: 'nlp',   r: 7 },
  { name: 'Transformers',       x: 828, y: 95,  c: 'nlp',   r: 6 },
  { name: 'LangChain',          x: 685, y: 122, c: 'nlp',   r: 6 },
  { name: 'RAG',                x: 760, y: 155, c: 'nlp',   r: 6 },
  { name: 'NLP',                x: 705, y: 55,  c: 'nlp',   r: 7 },
  { name: 'LSTM',               x: 845, y: 168, c: 'nlp',   r: 5 },
  { name: 'Hugging Face',       x: 722, y: 198, c: 'nlp',   r: 6 },
  // Languages
  { name: 'Python',             x: 102, y: 340, c: 'lang',  r: 8 },
  { name: 'R',                  x: 58,  y: 392, c: 'lang',  r: 5 },
  { name: 'SQL',                x: 192, y: 382, c: 'lang',  r: 5 },
  { name: 'C++',                x: 142, y: 422, c: 'lang',  r: 5 },
  { name: 'Java',               x: 232, y: 352, c: 'lang',  r: 5 },
  { name: 'JavaScript',         x: 82,  y: 358, c: 'lang',  r: 5 },
  // Tools & Infra
  { name: 'Docker',             x: 728, y: 328, c: 'tools', r: 6 },
  { name: 'AWS',                x: 808, y: 372, c: 'tools', r: 6 },
  { name: 'FastAPI',            x: 682, y: 402, c: 'tools', r: 5 },
  { name: 'Git',                x: 862, y: 318, c: 'tools', r: 5 },
  { name: 'Streamlit',          x: 762, y: 422, c: 'tools', r: 5 },
  { name: 'Azure',              x: 855, y: 432, c: 'tools', r: 5 },
  { name: 'ChromaDB',           x: 652, y: 355, c: 'tools', r: 5 },
]

const VW = 950, VH = 465

export default function SkillsScatter() {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(null)   // skill name
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 })

  return (
    <div ref={ref} style={{ position: 'relative', marginBottom: 16 }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'rgba(124,58,237,0.8)', letterSpacing: '0.1em' }}>
          SKILL EMBEDDING SPACE  <span style={{ color: 'rgba(100,116,139,0.6)', fontWeight: 400 }}>— t-SNE projection</span>
        </span>
        {/* cluster legend */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {Object.values(CLUSTERS).map(cl => (
            <div key={cl.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cl.color }}/>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'var(--muted)' }}>{cl.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG scatter */}
      <div style={{
        borderRadius: 12,
        border: '1px solid rgba(124,58,237,0.18)',
        overflow: 'hidden',
        background: 'rgba(5,6,15,0.6)',
        position: 'relative',
      }}>
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          {/* faint axis lines */}
          <line x1={VW/2} y1={0} x2={VW/2} y2={VH} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <line x1={0} y1={VH/2} x2={VW} y2={VH/2} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

          {/* cluster blobs */}
          {Object.entries(CLUSTERS).map(([key, cl]) => (
            <ellipse key={key}
              cx={cl.cx} cy={cl.cy} rx={cl.rx} ry={cl.ry}
              fill={`${cl.color}08`}
              stroke={`${cl.color}20`}
              strokeWidth="1"
              strokeDasharray="6 4"
            />
          ))}

          {/* cluster labels */}
          {Object.entries(CLUSTERS).map(([key, cl]) => (
            <text key={key}
              x={cl.cx} y={cl.cy - cl.ry - 8}
              textAnchor="middle" fontSize="11"
              fontFamily="JetBrains Mono" fontWeight="600"
              fill={`${cl.color}70`}
              letterSpacing="0.08em"
            >
              {cl.label.toUpperCase()}
            </text>
          ))}

          {/* skill dots */}
          {SKILLS.map((sk, i) => {
            const cl    = CLUSTERS[sk.c]
            const isHov = hovered === sk.name
            return (
              <motion.g key={sk.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.025 }}
                style={{ cursor: 'default' }}
                onMouseEnter={e => {
                  setHovered(sk.name)
                  const rect = e.currentTarget.closest('svg').getBoundingClientRect()
                  const svgX = (sk.x / VW) * rect.width
                  const svgY = (sk.y / VH) * rect.height
                  setTooltip({ x: svgX, y: svgY })
                }}
                onMouseLeave={() => setHovered(null)}
              >
                {/* outer glow ring on hover */}
                {isHov && (
                  <circle cx={sk.x} cy={sk.y} r={sk.r + 8}
                    fill="none" stroke={`${cl.color}50`} strokeWidth="1.5"/>
                )}
                {/* dot */}
                <circle cx={sk.x} cy={sk.y} r={isHov ? sk.r + 2 : sk.r}
                  fill={isHov ? cl.color : `${cl.color}80`}
                  style={{ filter: isHov ? `drop-shadow(0 0 6px ${cl.color})` : 'none', transition: 'r 0.15s' }}
                />
                {/* always-visible label for larger dots */}
                {sk.r >= 7 && (
                  <text x={sk.x} y={sk.y - sk.r - 5}
                    textAnchor="middle" fontSize="9"
                    fontFamily="JetBrains Mono" fill={`${cl.color}90`}>
                    {sk.name}
                  </text>
                )}
              </motion.g>
            )
          })}
        </svg>

        {/* floating tooltip */}
        {hovered && (
          <div style={{
            position: 'absolute',
            left: tooltip.x + 14,
            top: tooltip.y - 28,
            background: 'rgba(10,11,26,0.95)',
            border: `1px solid ${CLUSTERS[SKILLS.find(s => s.name === hovered)?.c]?.color}50`,
            borderRadius: 6,
            padding: '5px 10px',
            pointerEvents: 'none',
            zIndex: 10,
            backdropFilter: 'blur(12px)',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: '#e2e8f0' }}>
              {hovered}
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
              color: CLUSTERS[SKILLS.find(s => s.name === hovered)?.c]?.color,
              marginLeft: 8,
            }}>
              {CLUSTERS[SKILLS.find(s => s.name === hovered)?.c]?.label}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
