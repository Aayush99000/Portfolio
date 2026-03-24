import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Publications', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,6,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,212,255,0.1)' : 'none',
        transition: 'all 0.3s',
      }}
    >
      <a
        href="#hero"
        onClick={e => handleNav(e, 'hero')}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1rem',
          fontWeight: 600,
          color: '#00d4ff',
          textDecoration: 'none',
          letterSpacing: '0.05em',
        }}
      >
        &lt;AK /&gt;
      </a>

      {/* Desktop */}
      <ul style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center' }}
          className="nav-desktop">
        {links.map((l, i) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              onClick={e => handleNav(e, l)}
              style={{
                color: 'var(--muted)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 500,
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={e => e.target.style.color = '#00d4ff'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >
              <span style={{ fontFamily: 'JetBrains Mono', color: '#7c3aed', fontSize: '0.75rem' }}>0{i+1}.</span>
              {l}
            </a>
          </li>
        ))}
        <li>
          <a
            href="/Aayush_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 18px',
              border: '1px solid #00d4ff',
              borderRadius: 6,
              color: '#00d4ff',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(0,212,255,0.1)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent' }}
          >
            Resume
          </a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="nav-hamburger"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: 5,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
        }}
      >
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: 24, height: 2,
            background: '#00d4ff', borderRadius: 2,
            transition: 'transform 0.2s',
          }}/>
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 0, right: 0,
              width: '70vw', height: '100vh',
              background: 'rgba(13,14,31,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 32, zIndex: 600,
              borderLeft: '1px solid rgba(0,212,255,0.15)',
            }}
          >
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                onClick={e => handleNav(e, l)}
                style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '1.2rem' }}>
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
