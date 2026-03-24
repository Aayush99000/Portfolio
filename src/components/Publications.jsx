import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pubs = [
  {
    title: 'Image Captioning of Satellite Images Using Transfer Learning and LSTM Blending',
    authors: 'Sharma, R., Shree, A., Katoch, A., Verma, S.S.',
    venue: 'AI Technologies for Information Systems and Management Science, ISMS 2023',
    publisher: 'Lecture Notes in Networks and Systems, vol. 1136. Springer, Cham, 2024.',
    doi: 'https://doi.org/10.1007/978-3-031-70789-6_41',
    color: '#00d4ff',
    icon: '📡',
  },
  {
    title: 'Enhancing Cloud Detection Performance: A Comparative Study of CNN Models and Architectures',
    authors: 'Katoch, A., Shree, A., Sharma, R., Brijbasi, A., Sharma, M., Verma, S.S.',
    venue: '2024 IEEE Students Conference on Engineering and Systems (SCES)',
    publisher: 'Prayagraj, India, 2024, pp. 1–6.',
    doi: 'https://doi.org/10.1109/SCES61914.2024.10652552',
    color: '#7c3aed',
    icon: '☁️',
  },
]

export default function Publications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="publications" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number">05.</span> Publications <div className="line" />
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {pubs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.18 }}
              className="glass-card"
              style={{
                padding: '32px 36px',
                borderRadius: 14,
                border: `1px solid ${p.color}20`,
                display: 'flex',
                gap: 28,
                alignItems: 'flex-start',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${p.color}50`
                e.currentTarget.style.boxShadow = `0 0 30px ${p.color}10`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${p.color}20`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: 56, height: 56, flexShrink: 0,
                borderRadius: 12,
                background: `${p.color}15`,
                border: `1px solid ${p.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem',
              }}>
                {p.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 8, lineHeight: 1.45 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: 6, fontStyle: 'italic' }}>
                  {p.authors}
                </p>
                <p style={{ fontSize: '0.82rem', color: p.color, marginBottom: 4 }}>
                  {p.venue}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 16 }}>
                  {p.publisher}
                </p>
                <a
                  href={p.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px',
                    borderRadius: 6,
                    border: `1px solid ${p.color}40`,
                    color: p.color,
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontFamily: 'JetBrains Mono',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = `${p.color}12`}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  View Paper →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
