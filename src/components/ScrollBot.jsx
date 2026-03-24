import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

const SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'publications', 'contact']

const POSES = {
  hero: { label: 'waving', eyeL: '😮', eyeR: '😮' },
  about: { label: 'thinking', eyeL: '🤔', eyeR: '🤔' },
  skills: { label: 'working', eyeL: '💡', eyeR: '💡' },
  experience: { label: 'reading', eyeL: '📖', eyeR: '📖' },
  projects: { label: 'building', eyeL: '⚙️', eyeR: '⚙️' },
  publications: { label: 'researching', eyeL: '🔬', eyeR: '🔬' },
  contact: { label: 'waving', eyeL: '👋', eyeR: '👋' },
}

export default function ScrollBot() {
  const [scrollPct, setScrollPct] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [armAngle, setArmAngle] = useState(0)
  const rafRef = useRef(null)

  const springY = useSpring(0, { stiffness: 60, damping: 18 })

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docH = document.body.scrollHeight - window.innerHeight
        const pct = docH > 0 ? scrollTop / docH : 0
        setScrollPct(pct)

        // track which section is visible
        for (const id of [...SECTIONS].reverse()) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
            setActiveSection(id)
            break
          }
        }
      })
    }

    const animArm = () => {
      setArmAngle(a => a + 0.04)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    const armInterval = setInterval(animArm, 16)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(armInterval)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const targetY = scrollPct * (window.innerHeight - 260)
    springY.set(targetY)
  }, [scrollPct, springY])

  const waving = activeSection === 'hero' || activeSection === 'contact'
  const armSwing = waving
    ? Math.sin(armAngle * 3) * 35
    : Math.sin(armAngle) * 10

  return (
    <motion.div
      style={{
        position: 'fixed',
        right: 24,
        top: 80,
        y: springY,
        zIndex: 100,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <svg width="56" height="120" viewBox="0 0 56 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* antenna */}
        <line x1="28" y1="4" x2="28" y2="14" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="28" cy="3" r="3" fill="#00d4ff">
          <animate attributeName="r" values="3;4.5;3" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>

        {/* head */}
        <rect x="10" y="14" width="36" height="28" rx="8" fill="#0d0e1f" stroke="#00d4ff" strokeWidth="1.5"/>
        {/* visor */}
        <rect x="14" y="18" width="28" height="18" rx="5" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.4)" strokeWidth="1"/>

        {/* eyes */}
        <circle cx="21" cy="28" r="4" fill="#0d0e1f"/>
        <circle cx="35" cy="28" r="4" fill="#0d0e1f"/>
        <circle cx="21" cy="28" r="2.5" fill="#00d4ff">
          <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="35" cy="28" r="2.5" fill="#00d4ff">
          <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" begin="0.3s" repeatCount="indefinite"/>
        </circle>
        {/* eye shine */}
        <circle cx="22" cy="27" r="0.8" fill="white" opacity="0.8"/>
        <circle cx="36" cy="27" r="0.8" fill="white" opacity="0.8"/>

        {/* mouth */}
        {activeSection === 'hero' || activeSection === 'contact' ? (
          <path d="M19 37 Q28 42 37 37" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        ) : activeSection === 'skills' || activeSection === 'projects' ? (
          <path d="M20 38 Q28 35 36 38" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        ) : (
          <line x1="20" y1="37" x2="36" y2="37" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
        )}

        {/* neck */}
        <rect x="24" y="42" width="8" height="6" rx="2" fill="#0d0e1f" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>

        {/* body */}
        <rect x="8" y="48" width="40" height="38" rx="8" fill="#0d0e1f" stroke="#7c3aed" strokeWidth="1.5"/>
        {/* chest panel */}
        <rect x="14" y="54" width="28" height="18" rx="4" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.3)" strokeWidth="1"/>
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
        {/* body detail lines */}
        <line x1="14" y1="76" x2="42" y2="76" stroke="rgba(0,212,255,0.2)" strokeWidth="1"/>
        <line x1="14" y1="80" x2="36" y2="80" stroke="rgba(0,212,255,0.1)" strokeWidth="1"/>

        {/* left arm */}
        <g transform={`rotate(${-armSwing * 0.5}, 8, 58)`}>
          <rect x="0" y="52" width="8" height="22" rx="4" fill="#0d0e1f" stroke="rgba(0,212,255,0.4)" strokeWidth="1.2"/>
          <circle cx="4" cy="76" r="3.5" fill="#0d0e1f" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
        </g>

        {/* right arm — waves when in hero/contact */}
        <g transform={`rotate(${armSwing}, 48, 58)`}>
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
        <ellipse cx="28" cy="62" rx="32" ry="42" fill="rgba(124,58,237,0.03)"/>
      </svg>

      {/* section label */}
      <div style={{
        textAlign: 'center',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '9px',
        color: 'rgba(0,212,255,0.6)',
        marginTop: 2,
        letterSpacing: '0.05em',
      }}>
        {POSES[activeSection]?.label || ''}
      </div>
    </motion.div>
  )
}
