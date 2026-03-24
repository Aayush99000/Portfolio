import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const links = [
    {
      label: 'Email',
      value: 'katoch.aa@northeastern.edu',
      href: 'mailto:katoch.aa@northeastern.edu',
      color: '#00d4ff',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: 'github.com/Aayush99000',
      href: 'https://github.com/Aayush99000',
      color: '#7c3aed',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/aayush-katoch-a47413175',
      href: 'https://linkedin.com/in/aayush-katoch-a47413175',
      color: '#ec4899',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" ref={ref}>
      <div className="container" style={{ maxWidth: 700, textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: 'JetBrains Mono', color: '#00d4ff', fontSize: '0.9rem', marginBottom: 16 }}
        >
          06. What's Next?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 20 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 48, fontSize: '0.98rem' }}
        >
          I'm currently open to full-time ML/AI Engineer roles and research collaborations.
          Whether you have a question, a project idea, or just want to say hi — my inbox is always open!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', marginBottom: 48 }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 32px',
                borderRadius: 10,
                background: 'var(--card)',
                border: `1px solid ${l.color}25`,
                color: '#e2e8f0',
                textDecoration: 'none',
                width: '100%', maxWidth: 400,
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${l.color}60`
                e.currentTarget.style.boxShadow = `0 0 24px ${l.color}12`
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${l.color}25`
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = ''
              }}
            >
              <span style={{ color: l.color }}>{l.icon}</span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: 'var(--muted)' }}>{l.label}</span>
              <span style={{ fontSize: '0.9rem', marginLeft: 'auto' }}>{l.value}</span>
            </a>
          ))}
        </motion.div>

        <motion.a
          href="mailto:katoch.aa@northeastern.edu"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'inline-block',
            padding: '16px 48px',
            borderRadius: 8,
            border: '1px solid #00d4ff',
            color: '#00d4ff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'all 0.25s',
            letterSpacing: '0.04em',
          }}
          whileHover={{ backgroundColor: 'rgba(0,212,255,0.08)', boxShadow: '0 0 30px rgba(0,212,255,0.2)' }}
        >
          Say Hello
        </motion.a>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 100,
        paddingTop: 24,
        borderTop: '1px solid rgba(0,212,255,0.08)',
        textAlign: 'center',
        color: 'var(--muted)',
        fontFamily: 'JetBrains Mono',
        fontSize: '0.75rem',
      }}>
        Designed & Built by Aayush Katoch
      </div>
    </section>
  )
}
