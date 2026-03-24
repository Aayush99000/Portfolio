import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import NeuralBackground from './components/NeuralBackground'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Contact from './components/Contact'
import ScrollBot from './components/ScrollBot'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(to right, #00d4ff, #7c3aed, #ec4899)',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 9999,
        boxShadow: '0 0 8px rgba(0, 212, 255, 0.6)',
      }}
    />
  )
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <NeuralBackground />
      <div className="scanline" />
      <Cursor />
      <ScrollBot />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <Contact />
      </main>
    </>
  )
}
