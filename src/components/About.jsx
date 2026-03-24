import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '2+', label: 'Research Internships' },
  { value: '5+', label: 'AI Projects' },
  { value: '2', label: 'Publications' },
  { value: '98%', label: 'Peak Model Accuracy' },
]

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
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 18, fontSize: '0.98rem' }}>
              I'm a <span style={{ color: '#e2e8f0' }}>Machine Learning / AI Engineer</span> currently
              pursuing my <span style={{ color: '#00d4ff' }}>Master's in Data Science</span> at Northeastern
              University, Silicon Valley. My work sits at the intersection of deep learning research and
              real-world deployment.
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

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                style={{
                  padding: '28px 20px',
                  borderRadius: 12,
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#00d4ff', letterSpacing: '-0.02em' }}>
                  {s.value}
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
