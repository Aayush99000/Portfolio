import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Attention weights per word (0–1). Higher = more "attended to" by the model.
const BIO_TOKENS = [
  { word: "I'm",              w: 0.05 },
  { word: "a",                w: 0.03 },
  { word: "Machine",          w: 0.82 },
  { word: "Learning",         w: 0.88 },
  { word: "/",                w: 0.25 },
  { word: "AI",               w: 0.91 },
  { word: "Engineer",         w: 0.78 },
  { word: "currently",        w: 0.12 },
  { word: "pursuing",         w: 0.10 },
  { word: "my",               w: 0.04 },
  { word: "Master's",         w: 0.62 },
  { word: "in",               w: 0.05 },
  { word: "Data",             w: 0.72 },
  { word: "Science",          w: 0.74 },
  { word: "at",               w: 0.04 },
  { word: "Northeastern",     w: 0.58 },
  { word: "University,",      w: 0.42 },
  { word: "Silicon",          w: 0.45 },
  { word: "Valley.",          w: 0.40 },
  { word: "My",               w: 0.06 },
  { word: "work",             w: 0.20 },
  { word: "sits",             w: 0.08 },
  { word: "at",               w: 0.04 },
  { word: "the",              w: 0.03 },
  { word: "intersection",     w: 0.65 },
  { word: "of",               w: 0.04 },
  { word: "deep",             w: 0.85 },
  { word: "learning",         w: 0.87 },
  { word: "research",         w: 0.75 },
  { word: "and",              w: 0.05 },
  { word: "real-world",       w: 0.68 },
  { word: "deployment.",      w: 0.55 },
]

function lerp(a, b, t) { return a + (b - a) * t }
function tokenColor(w) {
  // cyan (#00d4ff) for high attention, muted for low
  const r = Math.round(lerp(100, 0,   w))
  const g = Math.round(lerp(116, 212, w))
  const b = Math.round(lerp(139, 255, w))
  return `rgb(${r},${g},${b})`
}
function tokenBg(w) {
  if (w < 0.3) return 'transparent'
  const alpha = ((w - 0.3) / 0.7 * 0.28).toFixed(2)
  return `rgba(0,212,255,${alpha})`
}

const stats = [
  { value: '2+', label: 'Research Internships' },
  { value: '5+', label: 'AI Projects' },
  { value: '2',  label: 'Publications' },
  { value: '98%', label: 'Peak Model Accuracy' },
]

function CountUp({ target, inView }) {
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    if (!inView) return
    const match = target.match(/^([\d.]+)(.*)$/)
    if (!match) { setDisplayed(target); return }
    const num = parseFloat(match[1])
    const suffix = match[2]
    const duration = 1800
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(num * eased) + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return displayed
}

function BioPanel({ inView }) {
  const [attn, setAttn] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 }}
    >
      {/* Attention heatmap toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <button
          onClick={() => setAttn(a => !a)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 6,
            border: `1px solid ${attn ? 'rgba(0,212,255,0.6)' : 'rgba(100,116,139,0.3)'}`,
            background: attn ? 'rgba(0,212,255,0.08)' : 'none',
            color: attn ? '#00d4ff' : 'var(--muted)',
            fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
            cursor: 'pointer', letterSpacing: '0.05em',
            transition: 'all 0.2s',
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          {attn ? 'attention: ON' : 'attention: OFF'}
        </button>
        <AnimatePresence>
          {attn && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(0,212,255,0.5)' }}
            >
              — transformer self-attention weights
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* First bio paragraph — tokenized */}
      <p style={{ lineHeight: 1.9, marginBottom: 18, fontSize: '0.98rem' }}>
        {BIO_TOKENS.map((tok, i) => (
          <span key={i} style={{ position: 'relative', display: 'inline-block', marginRight: 4 }}>
            <span style={{
              color: attn ? tokenColor(tok.w) : (tok.w > 0.7 ? '#e2e8f0' : tok.w > 0.5 ? '#00d4ff' : 'var(--muted)'),
              background: attn ? tokenBg(tok.w) : 'transparent',
              borderRadius: 3,
              padding: attn ? '1px 2px' : 0,
              fontWeight: tok.w > 0.8 ? 600 : 400,
              transition: 'all 0.35s ease',
            }}>
              {tok.word}
            </span>
            {attn && tok.w >= 0.5 && (
              <span style={{
                position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)',
                fontFamily: 'JetBrains Mono', fontSize: '0.48rem',
                color: `rgba(0,212,255,${(tok.w * 0.7).toFixed(2)})`,
                whiteSpace: 'nowrap',
                transition: 'opacity 0.3s',
              }}>
                {tok.w.toFixed(2)}
              </span>
            )}
          </span>
        ))}
      </p>

      <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 18, fontSize: '0.98rem' }}>
        I've done research at <span style={{ color: '#e2e8f0' }}>ISRO</span> (Space Application Centre)
        and <span style={{ color: '#e2e8f0' }}>DRDO</span> (Solid State Physical Laboratory), where I
        built computer vision systems for satellite imagery and military vehicle detection.
      </p>
      <p style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '0.98rem' }}>
        I'm passionate about <span style={{ color: '#7c3aed' }}>Computer Vision</span>,{' '}
        <span style={{ color: '#7c3aed' }}>NLP</span>, and{' '}
        <span style={{ color: '#7c3aed' }}>Generative AI</span>. Currently exploring diffusion models
        and multimodal LLMs.
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
        {['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'OpenCV', 'AWS'].map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number">01.</span> About Me <div className="line" />
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          <BioPanel inView={inView} />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                style={{
                  padding: '28px 20px',
                  borderRadius: 12,
                  border: '1px solid rgba(0,212,255,0.12)',
                  textAlign: 'center',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.45)'
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.12)'
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#00d4ff', letterSpacing: '-0.02em' }}>
                  <CountUp target={s.value} inView={inView} />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 6, lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
