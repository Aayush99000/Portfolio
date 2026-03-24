import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    company: 'Northeastern University',
    role: 'Teaching Assistant – CS 5800 (Algorithms)',
    period: 'Jan 2026 – May 2026',
    location: 'Silicon Valley, CA',
    color: '#00d4ff',
    bullets: [
      'Provide instructional support for graduate students in core algorithms course.',
      'Conduct weekly office hours on dynamic programming, greedy algorithms, graph theory, and complexity analysis.',
    ],
  },
  {
    company: 'SSPL – DRDO',
    role: 'Research & Technical Intern',
    period: 'Jan 2024 – Apr 2024',
    location: 'New Delhi, India',
    color: '#7c3aed',
    bullets: [
      'Engineered Military Vehicle Detection app using Python & YOLO; achieved 80.41% mAP@0.5 with YOLOv8-m.',
      'Enhanced model inference time by 22% through deployment optimization techniques.',
      'Achieved 96.5% classification accuracy for vehicle types, surpassing benchmarks by 6%.',
    ],
  },
  {
    company: 'SAC – ISRO',
    role: 'Research Intern',
    period: 'May 2023 – Oct 2023',
    location: 'Ahmedabad, India',
    color: '#ec4899',
    bullets: [
      'Built deep learning segmentation models for LANDSAT satellite data — 98% accuracy, 93% Dice score across 1,000+ images.',
      'Engineered satellite image captioning using encoder-decoder architectures (VGG-19, ResNet-50, DenseNet-201, EfficientNet-B7 + LSTM).',
      'Achieved best-in-class with EfficientNet-B7 + LSTM: 94.05% accuracy, BLEU-1 of 0.8406 on RSICD.',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number">03.</span> Experience <div className="line" />
        </motion.h2>

        <div style={{ position: 'relative' }}>
          {/* timeline line */}
          <div style={{
            position: 'absolute', left: 16, top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(to bottom, #00d4ff, #7c3aed, #ec4899)',
            borderRadius: 2,
            opacity: 0.3,
          }}/>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, paddingLeft: 52 }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.18 }}
                style={{ position: 'relative' }}
              >
                {/* dot */}
                <div style={{
                  position: 'absolute',
                  left: -44,
                  top: 6,
                  width: 14, height: 14,
                  borderRadius: '50%',
                  background: exp.color,
                  boxShadow: `0 0 12px ${exp.color}`,
                  border: '2px solid var(--bg)',
                }}/>

                <div style={{
                  padding: '28px 32px',
                  borderRadius: 14,
                  background: 'var(--card)',
                  border: `1px solid ${exp.color}20`,
                  backdropFilter: 'blur(10px)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${exp.color}50`
                    e.currentTarget.style.boxShadow = `0 0 30px ${exp.color}10`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${exp.color}20`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e2e8f0' }}>
                      {exp.role} <span style={{ color: exp.color }}>@ {exp.company}</span>
                    </h3>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.78rem', color: 'var(--muted)',
                    }}>
                      {exp.period}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 16 }}>{exp.location}</div>
                  <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                        <span style={{ color: exp.color, flexShrink: 0, marginTop: 2 }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
