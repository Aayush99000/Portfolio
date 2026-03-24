import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const pubs = [
  {
    id: 'katoch2024cloud',
    badge: 'IEEE 2024',
    badgeColor: '#00629b',
    title: 'Enhancing Cloud Detection Performance: A Comparative Study of CNN Models and Architectures',
    authors: [
      { name: 'Katoch, A.',    self: true },
      { name: 'Shree, A.' },
      { name: 'Sharma, R.' },
      { name: 'Brijbasi, A.' },
      { name: 'Sharma, M.' },
      { name: 'Verma, S.S.' },
    ],
    venue: '2024 IEEE Students Conference on Engineering and Systems (SCES)',
    location: 'Prayagraj, India, 2024, pp. 1–6',
    doi: 'https://doi.org/10.1109/SCES61914.2024.10652552',
    doiShort: '10.1109/SCES61914.2024.10652552',
    topics: ['Computer Vision', 'Cloud Detection', 'CNN', 'Satellite Imagery', 'UNet'],
    abstract: 'We present a comparative study of deep learning architectures for cloud segmentation on LANDSAT satellite imagery. Benchmarking UNet and Attention-UNet with Transfer Learning strategies, achieving 98% accuracy and a 93% Dice score. Demonstrates that transfer-learned weights outperform scratch-trained CNNs by 6% in Dice score.',
    bibtex: `@inproceedings{katoch2024cloud,
  title     = {Enhancing Cloud Detection Performance: A Comparative
               Study of CNN Models and Architectures},
  author    = {Katoch, A. and Shree, A. and Sharma, R. and
               Brijbasi, A. and Sharma, M. and Verma, S.S.},
  booktitle = {2024 IEEE Students Conference on Engineering
               and Systems (SCES)},
  pages     = {1--6},
  year      = {2024},
  address   = {Prayagraj, India},
  doi       = {10.1109/SCES61914.2024.10652552}
}`,
    color: '#00629b',
    accentColor: '#00d4ff',
  },
  {
    id: 'sharma2024imagecap',
    badge: 'Springer 2024',
    badgeColor: '#b52025',
    title: 'Image Captioning of Satellite Images Using Transfer Learning and LSTM Blending',
    authors: [
      { name: 'Sharma, R.' },
      { name: 'Shree, A.' },
      { name: 'Katoch, A.',    self: true },
      { name: 'Verma, S.S.' },
    ],
    venue: 'AI Technologies for Information Systems and Management Science, ISMS 2023',
    location: 'Lecture Notes in Networks and Systems, vol. 1136. Springer, Cham, 2024',
    doi: 'https://doi.org/10.1007/978-3-031-70789-6_41',
    doiShort: '10.1007/978-3-031-70789-6_41',
    topics: ['Image Captioning', 'Transfer Learning', 'LSTM', 'Satellite Imagery', 'EfficientNet'],
    abstract: 'A satellite image captioning system using encoder-decoder architecture, benchmarking VGG-19, ResNet-50, DenseNet-201, and EfficientNet-B7 as CNN encoders fused with a 128-unit LSTM decoder. Preprocessed 600×600 satellite images from Sydney and RSICD datasets. Best-in-class: EfficientNet-B7 + LSTM, 94.05% accuracy, BLEU-1 of 0.8406.',
    bibtex: `@inproceedings{sharma2024imagecap,
  title     = {Image Captioning of Satellite Images Using
               Transfer Learning and LSTM Blending},
  author    = {Sharma, R. and Shree, A. and
               Katoch, A. and Verma, S.S.},
  booktitle = {AI Technologies for Information Systems and
               Management Science, ISMS 2023},
  series    = {Lecture Notes in Networks and Systems},
  volume    = {1136},
  publisher = {Springer, Cham},
  year      = {2024},
  doi       = {10.1007/978-3-031-70789-6_41}
}`,
    color: '#b52025',
    accentColor: '#ec4899',
  },
]

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function PaperCard({ p, i, inView }) {
  const [showBib,  setShowBib]  = useState(false)
  const [copied,   setCopied]   = useState(false)
  const [expanded, setExpanded] = useState(false)

  const copyBibtex = () => {
    navigator.clipboard.writeText(p.bibtex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.18 }}
      className="glass-card"
      style={{
        borderRadius: 14,
        border: `1px solid ${p.accentColor}18`,
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${p.accentColor}40`
        e.currentTarget.style.boxShadow   = `0 0 30px ${p.accentColor}08`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${p.accentColor}18`
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* top strip */}
      <div style={{
        padding: '20px 28px 0',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
      }}>
        {/* badge + title */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{
              padding: '3px 10px', borderRadius: 5,
              background: `${p.badgeColor}22`,
              border: `1px solid ${p.badgeColor}50`,
              color: p.badgeColor === '#00629b' ? '#4db8ff' : '#ff8080',
              fontFamily: 'JetBrains Mono', fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.05em',
            }}>
              [{p.badge}]
            </span>
            <a href={p.doi} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
                color: `${p.accentColor}70`, textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={e => e.target.style.color = p.accentColor}
              onMouseLeave={e => e.target.style.color = `${p.accentColor}70`}
            >
              doi:{p.doiShort}
            </a>
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', lineHeight: 1.45, marginBottom: 8 }}>
            {p.title}
          </h3>
          {/* authors — self bolded */}
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: 6 }}>
            {p.authors.map((a, ai) => (
              <span key={ai}>
                {a.self
                  ? <strong style={{ color: p.accentColor }}>{a.name}</strong>
                  : a.name}
                {ai < p.authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: 12 }}>
            {p.venue}. <span style={{ fontStyle: 'normal' }}>{p.location}.</span>
          </p>
        </div>
      </div>

      {/* abstract */}
      <div style={{ padding: '0 28px', marginBottom: 14 }}>
        <p style={{
          fontSize: '0.83rem', color: 'rgba(148,163,184,0.85)', lineHeight: 1.7,
          display: '-webkit-box', WebkitLineClamp: expanded ? 'unset' : 2,
          WebkitBoxOrient: 'vertical', overflow: expanded ? 'visible' : 'hidden',
          marginBottom: 4,
        }}>
          {p.abstract}
        </p>
        <button onClick={() => setExpanded(e => !e)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: `${p.accentColor}80`, fontFamily: 'JetBrains Mono',
          fontSize: '0.68rem', padding: 0, letterSpacing: '0.04em',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.target.style.color = p.accentColor}
          onMouseLeave={e => e.target.style.color = `${p.accentColor}80`}
        >
          {expanded ? '[ collapse ]' : '[ read more ]'}
        </button>
      </div>

      {/* topics */}
      <div style={{ padding: '0 28px', display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
        {p.topics.map(t => (
          <span key={t} style={{
            padding: '3px 10px', borderRadius: 20,
            fontSize: '0.7rem', fontFamily: 'JetBrains Mono',
            background: `${p.accentColor}10`,
            border: `1px solid ${p.accentColor}28`,
            color: `${p.accentColor}cc`,
          }}>{t}</span>
        ))}
      </div>

      {/* action bar */}
      <div style={{
        padding: '12px 28px', borderTop: `1px solid ${p.accentColor}10`,
        display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <a href={p.doi} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 6,
            border: `1px solid ${p.accentColor}35`,
            color: p.accentColor, textDecoration: 'none',
            fontSize: '0.75rem', fontFamily: 'JetBrains Mono',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = `${p.accentColor}10`}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          View Paper →
        </a>

        <button onClick={() => setShowBib(s => !s)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 6,
            border: `1px solid rgba(100,116,139,0.3)`,
            background: 'none', cursor: 'pointer', color: 'var(--muted)',
            fontSize: '0.75rem', fontFamily: 'JetBrains Mono',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.accentColor}50`; e.currentTarget.style.color = p.accentColor }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(100,116,139,0.3)'; e.currentTarget.style.color = 'var(--muted)' }}
        >
          Cite (BibTeX)
        </button>
      </div>

      {/* BibTeX drawer */}
      <AnimatePresence>
        {showBib && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              margin: '0 28px 20px',
              borderRadius: 8,
              background: 'rgba(0,0,0,0.35)',
              border: `1px solid ${p.accentColor}18`,
              position: 'relative',
            }}>
              <button onClick={copyBibtex}
                style={{
                  position: 'absolute', top: 10, right: 10,
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 5,
                  background: copied ? 'rgba(16,185,129,0.15)' : `${p.accentColor}12`,
                  border: `1px solid ${copied ? '#10b981' : p.accentColor}40`,
                  cursor: 'pointer', color: copied ? '#10b981' : p.accentColor,
                  fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
                  transition: 'all 0.2s',
                }}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <pre style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.72rem',
                color: 'rgba(148,163,184,0.85)', lineHeight: 1.65,
                padding: '16px 18px', margin: 0,
                overflowX: 'auto', whiteSpace: 'pre',
              }}>
                {p.bibtex}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Publications() {
  const ref    = useRef(null)
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
          {pubs.map((p, i) => <PaperCard key={p.id} p={p} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}
