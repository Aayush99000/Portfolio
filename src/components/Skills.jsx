import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SkillConstellation from './SkillConstellation'

const categories = [
  {
    title: 'Machine Learning & AI',
    color: '#00d4ff',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'LangChain', 'Hugging Face', 'OpenCV', 'CUDA', 'RAG', 'LLMs', 'Transformers', 'GANs'],
  },
  {
    title: 'Languages',
    color: '#7c3aed',
    skills: ['Python', 'R', 'Java', 'SQL', 'C++', 'JavaScript', 'Bash', 'C#'],
  },
  {
    title: 'Domains',
    color: '#ec4899',
    skills: ['Computer Vision', 'NLP', 'Deep Learning', 'Image Segmentation', 'Object Detection', 'Generative AI', 'LSTM', 'Transfer Learning'],
  },
  {
    title: 'Tools & Infra',
    color: '#10b981',
    skills: ['Docker', 'AWS', 'Azure', 'Git', 'FastAPI', 'Flask', 'Jupyter', 'Streamlit', 'ChromaDB', 'Postman'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  // { ci: categoryIndex, si: skillIndex } or null
  const [hovered, setHovered] = useState(null)

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number">02.</span> Skills <div className="line" />
        </motion.h2>

        <SkillConstellation />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginTop: 32 }}>
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className="glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.12 }}
              style={{
                padding: '28px 24px',
                borderRadius: 14,
                border: `1px solid ${cat.color}22`,
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${cat.color}55`
                e.currentTarget.style.boxShadow = `0 0 30px ${cat.color}14`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${cat.color}22`
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <h3 style={{
                fontSize: '0.85rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: cat.color,
                marginBottom: 20,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {cat.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.skills.map((skill, si) => {
                  const dist = hovered && hovered.ci === ci ? Math.abs(hovered.si - si) : null
                  const isActive = dist === 0
                  const isNear   = dist === 1
                  const isMid    = dist === 2

                  return (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.35, delay: ci * 0.1 + si * 0.04 }}
                      onMouseEnter={() => setHovered({ ci, si })}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        padding: '5px 13px',
                        borderRadius: 20,
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        cursor: 'default',
                        transition: 'all 0.22s ease',
                        background: isActive
                          ? `${cat.color}35`
                          : isNear
                          ? `${cat.color}22`
                          : isMid
                          ? `${cat.color}16`
                          : `${cat.color}12`,
                        border: isActive
                          ? `1px solid ${cat.color}80`
                          : `1px solid ${cat.color}30`,
                        color: cat.color,
                        transform: isActive
                          ? 'scale(1.12) translateY(-3px)'
                          : isNear
                          ? 'scale(1.05) translateY(-2px)'
                          : isMid
                          ? 'scale(1.02) translateY(-1px)'
                          : 'scale(1)',
                        boxShadow: isActive
                          ? `0 0 14px ${cat.color}50`
                          : isNear
                          ? `0 0 6px ${cat.color}25`
                          : 'none',
                        zIndex: isActive ? 2 : 1,
                        position: 'relative',
                      }}
                    >
                      {skill}
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
