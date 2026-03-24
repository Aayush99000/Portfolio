import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'

const SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'publications', 'contact']

const SECTION_DATA = {
  hero:         { bubble: 'Hello, World! 👋',           eyes: 'wide',     mouth: 'smile',   label: 'waving' },
  about:        { bubble: 'Let me introduce myself...', eyes: 'thinking', mouth: 'neutral', label: 'thinking' },
  skills:       { bubble: 'I know a few things 💡',     eyes: 'focused',  mouth: 'smirk',   label: 'focused' },
  experience:   { bubble: 'My journey so far 📖',       eyes: 'reading',  mouth: 'neutral', label: 'reading' },
  projects:     { bubble: 'Check what I built! ⚙️',     eyes: 'stars',    mouth: 'excited', label: 'building' },
  publications: { bubble: "I'm published! 📄",          eyes: 'proud',    mouth: 'smile',   label: 'research' },
  contact:      { bubble: 'Hire me? 👀',                eyes: 'wink',     mouth: 'smile',   label: 'waving' },
}

// ── Eye expressions ─────────────────────────────────────────────────────────
function Eyes({ type }) {
  switch (type) {
    case 'wide': // hero — big excited eyes, blinking
      return (
        <>
          <ellipse cx="21" cy="28" rx="4.5" ry="5" fill="#0d0e1f"/>
          <ellipse cx="35" cy="28" rx="4.5" ry="5" fill="#0d0e1f"/>
          <ellipse cx="21" cy="28" rx="3" ry="3.5" fill="#00d4ff">
            <animate attributeName="ry" values="3.5;0.4;3.5" dur="3.5s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="35" cy="28" rx="3" ry="3.5" fill="#00d4ff">
            <animate attributeName="ry" values="3.5;0.4;3.5" dur="3.5s" begin="0.15s" repeatCount="indefinite"/>
          </ellipse>
          <circle cx="22" cy="27" r="0.9" fill="white" opacity="0.85"/>
          <circle cx="36" cy="27" r="0.9" fill="white" opacity="0.85"/>
        </>
      )
    case 'thinking': // about — pupils drifted up-left, raised brows
      return (
        <>
          <circle cx="21" cy="28" r="4" fill="#0d0e1f"/>
          <circle cx="35" cy="28" r="4" fill="#0d0e1f"/>
          <circle cx="19.5" cy="26.5" r="2.5" fill="#00d4ff"/>
          <circle cx="33.5" cy="26.5" r="2.5" fill="#00d4ff"/>
          <circle cx="20" cy="26" r="0.8" fill="white" opacity="0.8"/>
          <circle cx="34" cy="26" r="0.8" fill="white" opacity="0.8"/>
          {/* raised eyebrows */}
          <path d="M17 22.5 Q21 20.5 25 22.5" stroke="#00d4ff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M31 22.5 Q35 20.5 39 22.5" stroke="#00d4ff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        </>
      )
    case 'focused': // skills — narrow rectangular slits + furrowed brows
      return (
        <>
          <rect x="16" y="25.5" width="10" height="5" rx="2.5" fill="#0d0e1f"/>
          <rect x="30" y="25.5" width="10" height="5" rx="2.5" fill="#0d0e1f"/>
          <rect x="17.5" y="26.5" width="7" height="3" rx="1.5" fill="#7c3aed"/>
          <rect x="31.5" y="26.5" width="7" height="3" rx="1.5" fill="#7c3aed"/>
          {/* furrowed brows — angled inward */}
          <line x1="16" y1="23" x2="26" y2="24.5" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="40" y1="23" x2="30" y2="24.5" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round"/>
        </>
      )
    case 'reading': // experience — glasses overlay
      return (
        <>
          <circle cx="21" cy="28" r="4" fill="#0d0e1f"/>
          <circle cx="35" cy="28" r="4" fill="#0d0e1f"/>
          <circle cx="21" cy="28" r="2.4" fill="#00d4ff">
            <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="35" cy="28" r="2.4" fill="#00d4ff">
            <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" begin="0.3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="22" cy="27" r="0.8" fill="white" opacity="0.8"/>
          <circle cx="36" cy="27" r="0.8" fill="white" opacity="0.8"/>
          {/* glasses frames */}
          <rect x="15" y="23" width="12" height="10" rx="5" fill="none" stroke="rgba(0,212,255,0.55)" strokeWidth="0.9"/>
          <rect x="29" y="23" width="12" height="10" rx="5" fill="none" stroke="rgba(0,212,255,0.55)" strokeWidth="0.9"/>
          <line x1="27" y1="28" x2="29" y2="28" stroke="rgba(0,212,255,0.55)" strokeWidth="0.9"/>
          {/* temples */}
          <line x1="14" y1="26" x2="11" y2="25" stroke="rgba(0,212,255,0.4)" strokeWidth="0.8"/>
          <line x1="41" y1="26" x2="44" y2="25" stroke="rgba(0,212,255,0.4)" strokeWidth="0.8"/>
        </>
      )
    case 'stars': // projects — 4-point star pupils, excited
      return (
        <>
          <circle cx="21" cy="28" r="4.5" fill="#0d0e1f"/>
          <circle cx="35" cy="28" r="4.5" fill="#0d0e1f"/>
          {/* 4-point star left at (21,28) */}
          <path d="M21 23.5 L22.4 26.6 L25.5 28 L22.4 29.4 L21 32.5 L19.6 29.4 L16.5 28 L19.6 26.6 Z" fill="#f59e0b"/>
          {/* 4-point star right at (35,28) */}
          <path d="M35 23.5 L36.4 26.6 L39.5 28 L36.4 29.4 L35 32.5 L33.6 29.4 L30.5 28 L33.6 26.6 Z" fill="#f59e0b"/>
          {/* sparkle marks */}
          <line x1="21" y1="20" x2="21" y2="22" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="35" y1="20" x2="35" y2="22" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="14" y1="24" x2="15.5" y2="25" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
          <line x1="42" y1="24" x2="40.5" y2="25" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
        </>
      )
    case 'proud': // publications — pink/magenta glow eyes + sparkles
      return (
        <>
          <circle cx="21" cy="28" r="4" fill="#0d0e1f"/>
          <circle cx="35" cy="28" r="4" fill="#0d0e1f"/>
          <circle cx="21" cy="28" r="2.5" fill="#ec4899">
            <animate attributeName="r" values="2.5;3;2.5" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="35" cy="28" r="2.5" fill="#ec4899">
            <animate attributeName="r" values="2.5;3;2.5" dur="1.8s" begin="0.4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="22" cy="27" r="0.9" fill="white" opacity="0.9"/>
          <circle cx="36" cy="27" r="0.9" fill="white" opacity="0.9"/>
          {/* tiny sparkles */}
          <path d="M11 21 L11.8 22.5 L13.5 22.5 L12.2 23.5 L12.7 25 L11 24.2 L9.3 25 L9.8 23.5 L8.5 22.5 L10.2 22.5 Z" fill="#f59e0b" opacity="0.8"/>
          <path d="M43 21 L43.8 22.5 L45.5 22.5 L44.2 23.5 L44.7 25 L43 24.2 L41.3 25 L41.8 23.5 L40.5 22.5 L42.2 22.5 Z" fill="#f59e0b" opacity="0.8"/>
        </>
      )
    case 'wink': // contact — left normal, right eye closed curved line
    default:
      return (
        <>
          <circle cx="21" cy="28" r="4" fill="#0d0e1f"/>
          <circle cx="21" cy="28" r="2.5" fill="#00d4ff">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="22" cy="27" r="0.8" fill="white" opacity="0.8"/>
          {/* right eye — winking, closed arc */}
          <rect x="30" y="23" width="10" height="10" rx="5" fill="#0d0e1f"/>
          <path d="M31 28 Q35 23.5 39 28" stroke="#00d4ff" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </>
      )
  }
}

// ── Mouth expressions ───────────────────────────────────────────────────────
function Mouth({ type }) {
  switch (type) {
    case 'smile':
      return <path d="M19 37 Q28 42.5 37 37" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    case 'smirk':
      return <path d="M20 37.5 Q25 40.5 33 38" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    case 'excited':
      return (
        <>
          <path d="M18 36.5 Q28 43.5 38 36.5" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <ellipse cx="28" cy="40" rx="5.5" ry="2.5" fill="#7c3aed" opacity="0.45"/>
        </>
      )
    case 'neutral':
    default:
      return <line x1="20" y1="37" x2="36" y2="37" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
  }
}

// ── Speech bubble ────────────────────────────────────────────────────────────
function SpeechBubble({ text }) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, scale: 0.55, x: 12 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.55, x: 12 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      style={{
        position: 'absolute',
        right: 66,
        top: 6,
        width: 148,
        padding: '9px 13px',
        borderRadius: 10,
        background: 'rgba(10,11,26,0.96)',
        border: '1px solid rgba(0,212,255,0.35)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 4px 24px rgba(0,212,255,0.1)',
        transformOrigin: 'right center',
      }}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10.5px',
        color: '#e2e8f0',
        lineHeight: 1.55,
        display: 'block',
      }}>
        {text}
      </span>
      {/* bubble tail — border triangle */}
      <div style={{
        position: 'absolute', right: -7, top: 13,
        width: 0, height: 0,
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderLeft: '7px solid rgba(0,212,255,0.35)',
      }}/>
      {/* inner fill triangle */}
      <div style={{
        position: 'absolute', right: -5, top: 14,
        width: 0, height: 0,
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: '6px solid rgba(10,11,26,0.96)',
      }}/>
    </motion.div>
  )
}

// ── Tiny laptop ──────────────────────────────────────────────────────────────
function Laptop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{ marginTop: -4 }}
    >
      <svg width="54" height="36" viewBox="0 0 54 36" fill="none">
        {/* screen lid */}
        <rect x="3" y="0" width="48" height="27" rx="3" fill="#08091a" stroke="#00d4ff" strokeWidth="1"/>
        <rect x="6" y="3" width="42" height="21" rx="1.5" fill="#05060f"/>
        {/* code lines on screen */}
        <rect x="9"  y="7"  width="20" height="1.5" rx="0.75" fill="rgba(0,212,255,0.55)"/>
        <rect x="9"  y="11" width="28" height="1.5" rx="0.75" fill="rgba(124,58,237,0.45)"/>
        <rect x="9"  y="15" width="16" height="1.5" rx="0.75" fill="rgba(0,212,255,0.38)"/>
        <rect x="9"  y="19" width="22" height="1.5" rx="0.75" fill="rgba(236,72,153,0.4)"/>
        {/* blinking cursor */}
        <rect x="26" y="15" width="1.5" height="1.5" fill="#00d4ff">
          <animate attributeName="opacity" values="1;0;1" dur="0.65s" repeatCount="indefinite"/>
        </rect>
        {/* keyboard base */}
        <rect x="0" y="27" width="54" height="9" rx="2.5" fill="#08091a" stroke="#7c3aed" strokeWidth="1"/>
        {/* key hints */}
        {[5,11,17,23,35,41].map(x => (
          <rect key={x} x={x} y="29.5" width="4" height="3" rx="0.8" fill="rgba(124,58,237,0.3)"/>
        ))}
        {/* spacebar */}
        <rect x="20" y="29.5" width="14" height="3" rx="0.8" fill="rgba(124,58,237,0.2)"/>
        {/* hinge line */}
        <line x1="2" y1="27" x2="52" y2="27" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5"/>
      </svg>
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ScrollBot() {
  const [scrollPct, setScrollPct]       = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [showBubble, setShowBubble]     = useState(true)
  const [armAngle, setArmAngle]         = useState(0)
  const rafRef    = useRef(null)
  const bubbleRef = useRef(null)

  const springY = useSpring(0, { stiffness: 55, damping: 18 })

  // scroll tracking
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docH = document.body.scrollHeight - window.innerHeight
        setScrollPct(docH > 0 ? scrollTop / docH : 0)

        for (const id of [...SECTIONS].reverse()) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
            setActiveSection(prev => {
              if (prev !== id) {
                // show bubble on section change
                setShowBubble(true)
                clearTimeout(bubbleRef.current)
                bubbleRef.current = setTimeout(() => setShowBubble(false), 3200)
              }
              return id
            })
            break
          }
        }
      })
    }
    // show initial bubble
    bubbleRef.current = setTimeout(() => setShowBubble(false), 3200)

    const armLoop = setInterval(() => setArmAngle(a => a + 0.05), 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(armLoop)
      clearTimeout(bubbleRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    springY.set(scrollPct * (window.innerHeight - 280))
  }, [scrollPct, springY])

  const data    = SECTION_DATA[activeSection] || SECTION_DATA.hero
  const waving  = activeSection === 'hero' || activeSection === 'contact'
  const typing  = activeSection === 'projects'

  // arm rotations
  const leftArmRot = waving
    ? -Math.sin(armAngle * 3) * 18
    : typing
    ? -18 + Math.sin(armAngle * 8) * 7
    : -Math.sin(armAngle) * 10

  const rightArmRot = waving
    ? Math.sin(armAngle * 3) * 35
    : typing
    ? 18 + Math.cos(armAngle * 8) * 7
    : Math.sin(armAngle) * 10

  return (
    <motion.div
      style={{
        position: 'fixed',
        right: 22,
        top: 80,
        y: springY,
        zIndex: 100,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && <SpeechBubble text={data.bubble} />}
      </AnimatePresence>

      {/* Bot SVG */}
      <svg width="56" height="120" viewBox="0 0 56 120" fill="none">
        {/* antenna */}
        <line x1="28" y1="4" x2="28" y2="14" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="28" cy="3" r="3" fill="#00d4ff">
          <animate attributeName="r" values="3;4.5;3" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>

        {/* head */}
        <rect x="10" y="14" width="36" height="28" rx="8" fill="#0d0e1f" stroke="#00d4ff" strokeWidth="1.5"/>
        {/* visor */}
        <rect x="14" y="18" width="28" height="18" rx="5" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.35)" strokeWidth="1"/>

        {/* dynamic eyes */}
        <Eyes type={data.eyes} />

        {/* dynamic mouth */}
        <Mouth type={data.mouth} />

        {/* neck */}
        <rect x="24" y="42" width="8" height="6" rx="2" fill="#0d0e1f" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>

        {/* body */}
        <rect x="8" y="48" width="40" height="38" rx="8" fill="#0d0e1f" stroke="#7c3aed" strokeWidth="1.5"/>
        {/* chest panel */}
        <rect x="14" y="54" width="28" height="18" rx="4" fill="rgba(124,58,237,0.07)" stroke="rgba(124,58,237,0.3)" strokeWidth="1"/>
        {/* chest lights */}
        <circle cx="21" cy="63" r="2.5" fill="#7c3aed">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="28" cy="63" r="2.5" fill="#00d4ff">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="35" cy="63" r="2.5" fill="#ec4899">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" begin="1.2s" repeatCount="indefinite"/>
        </circle>
        {/* body detail */}
        <line x1="14" y1="76" x2="42" y2="76" stroke="rgba(0,212,255,0.2)" strokeWidth="1"/>
        <line x1="14" y1="80" x2="36" y2="80" stroke="rgba(0,212,255,0.1)" strokeWidth="1"/>

        {/* left arm */}
        <g transform={`rotate(${leftArmRot}, 8, 58)`}>
          <rect x="0" y="52" width="8" height="22" rx="4" fill="#0d0e1f" stroke="rgba(0,212,255,0.4)" strokeWidth="1.2"/>
          <circle cx="4" cy="76" r="3.5" fill="#0d0e1f" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
        </g>

        {/* right arm */}
        <g transform={`rotate(${rightArmRot}, 48, 58)`}>
          <rect x="48" y="52" width="8" height="22" rx="4" fill="#0d0e1f" stroke="rgba(0,212,255,0.4)" strokeWidth="1.2"/>
          <circle cx="52" cy="76" r="3.5" fill="#0d0e1f" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
        </g>

        {/* legs */}
        <rect x="14" y="86" width="11" height="24" rx="5" fill="#0d0e1f" stroke="rgba(124,58,237,0.5)" strokeWidth="1.2"/>
        <rect x="31" y="86" width="11" height="24" rx="5" fill="#0d0e1f" stroke="rgba(124,58,237,0.5)" strokeWidth="1.2"/>
        {/* feet */}
        <rect x="11" y="106" width="16" height="10" rx="4" fill="#0d0e1f" stroke="rgba(124,58,237,0.6)" strokeWidth="1.2"/>
        <rect x="29" y="106" width="16" height="10" rx="4" fill="#0d0e1f" stroke="rgba(124,58,237,0.6)" strokeWidth="1.2"/>

        {/* glow aura */}
        <ellipse cx="28" cy="62" rx="32" ry="42" fill="rgba(124,58,237,0.025)"/>
      </svg>

      {/* Laptop — appears during Projects section */}
      <AnimatePresence>
        {typing && <Laptop />}
      </AnimatePresence>

      {/* section micro-label */}
      <div style={{
        textAlign: 'center',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '8.5px',
        color: 'rgba(0,212,255,0.5)',
        marginTop: typing ? 2 : 4,
        letterSpacing: '0.05em',
      }}>
        {data.label}
      </div>
    </motion.div>
  )
}
