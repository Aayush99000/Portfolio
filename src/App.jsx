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

export default function App() {
  return (
    <>
      <NeuralBackground />
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
