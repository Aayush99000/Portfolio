import { useEffect, useRef } from 'react'

// Layer sizes: input → hidden → hidden → hidden → output
const LAYERS = [4, 7, 9, 7, 4, 2]

export default function HeroNeuralNet() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const stateRef  = useRef({ neurons: [], edges: [], pulses: [], frame: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId

    // ── Build network ────────────────────────────────────────────
    const build = () => {
      const W = canvas.width
      const H = canvas.height
      const { neurons, edges, pulses } = stateRef.current
      neurons.length = 0
      edges.length   = 0
      pulses.length  = 0

      // Spread layers across right 62% of canvas
      const xL = W * 0.36
      const xR = W * 0.98
      const xStep = (xR - xL) / (LAYERS.length - 1)

      LAYERS.forEach((count, li) => {
        const x = xL + li * xStep
        const gap = Math.min((H * 0.72) / (count - 1 || 1), 72)
        const totalH = (count - 1) * gap
        const y0 = H / 2 - totalH / 2

        for (let ni = 0; ni < count; ni++) {
          neurons.push({
            x,
            y: y0 + ni * gap,
            layer: li,
            phase: Math.random() * Math.PI * 2,
            r: li === 0 || li === LAYERS.length - 1 ? 5.5 : 4.5,
            spawnTimer: Math.random() * 120,
          })
        }
      })

      // Edges between adjacent layers
      let offset = 0
      for (let li = 0; li < LAYERS.length - 1; li++) {
        const nextOffset = offset + LAYERS[li]
        for (let i = offset; i < offset + LAYERS[li]; i++) {
          for (let j = nextOffset; j < nextOffset + LAYERS[li + 1]; j++) {
            edges.push({ from: i, to: j, interval: 90 + Math.floor(Math.random() * 80), timer: Math.floor(Math.random() * 90) })
          }
        }
        offset += LAYERS[li]
      }
    }

    // ── Resize ───────────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width  = rect.width  * dpr
      canvas.height = rect.height * dpr
      canvas.style.width  = rect.width  + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
      build()
    }

    // ── Draw ─────────────────────────────────────────────────────
    const draw = () => {
      const W = canvas.width  / (window.devicePixelRatio || 1)
      const H = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, W, H)

      const { neurons, edges, pulses } = stateRef.current
      const mouse = mouseRef.current

      // Edges
      edges.forEach(edge => {
        const a = neurons[edge.from]
        const b = neurons[edge.to]
        if (!a || !b) return

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
        grad.addColorStop(0, 'rgba(0,212,255,0.07)')
        grad.addColorStop(1, 'rgba(124,58,237,0.07)')
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 0.6
        ctx.stroke()

        // Spawn pulses
        edge.timer++
        if (edge.timer >= edge.interval && pulses.length < 120) {
          edge.timer = 0
          pulses.push({ from: edge.from, to: edge.to, t: 0, speed: 0.007 + Math.random() * 0.007 })
        }
      })

      // Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.t += p.speed
        if (p.t > 1) { pulses.splice(i, 1); continue }

        const a = neurons[p.from]
        const b = neurons[p.to]
        if (!a || !b) { pulses.splice(i, 1); continue }

        const px = a.x + (b.x - a.x) * p.t
        const py = a.y + (b.y - a.y) * p.t

        // Trailing line
        const t0 = Math.max(0, p.t - 0.12)
        const tx = a.x + (b.x - a.x) * t0
        const ty = a.y + (b.y - a.y) * t0
        const trailGrad = ctx.createLinearGradient(tx, ty, px, py)
        trailGrad.addColorStop(0, 'rgba(0,212,255,0)')
        trailGrad.addColorStop(1, `rgba(0,212,255,${0.55 * (1 - Math.abs(p.t - 0.5) * 1.6)})`)
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(px, py)
        ctx.strokeStyle = trailGrad
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Pulse dot
        const r = Math.round(p.t * 124)
        const g = Math.round(212 - p.t * 154)
        const b2 = Math.round(255 - p.t * 18)
        ctx.beginPath()
        ctx.arc(px, py, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${r},${g},${b2})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgb(${r},${g},${b2})`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Neurons
      neurons.forEach(n => {
        n.phase += 0.018
        const pulse = 0.5 + 0.5 * Math.sin(n.phase)

        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const prox = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 110)

        const glow  = pulse * 0.45 + prox * 0.6
        const alpha = 0.35 + pulse * 0.3 + prox * 0.35

        // Outer aura
        const aura = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5)
        aura.addColorStop(0, `rgba(0,212,255,${glow * 0.22})`)
        aura.addColorStop(1, 'rgba(0,212,255,0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2)
        ctx.fillStyle = aura
        ctx.fill()

        // Body
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = prox > 0.1
          ? `rgba(${Math.round(prox * 80)},${Math.round(212 - prox * 60)},255,${alpha})`
          : `rgba(0,212,255,${alpha})`
        ctx.shadowBlur = 6 + glow * 10
        ctx.shadowColor = prox > 0.1 ? '#7c3aed' : '#00d4ff'
        ctx.fill()
        ctx.shadowBlur = 0

        // Ring
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + 1.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,212,255,${0.2 + glow * 0.35})`
        ctx.lineWidth = 0.7
        ctx.stroke()
      })

      animId = requestAnimationFrame(draw)
    }

    // ── Mouse tracking ───────────────────────────────────────────
    const hero = canvas.parentElement
    const onMove = e => {
      const rect = hero.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    const ro = new ResizeObserver(resize)
    ro.observe(hero)
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)

    resize()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.75,
        pointerEvents: 'none',
      }}
    />
  )
}
