import { useEffect, useRef } from 'react'

const LAYERS       = [4, 7, 9, 7, 4, 2]
const LAYER_LABELS = ['INPUT', 'H1', 'H2', 'H3', 'H4', 'OUTPUT']
const LAYER_COLORS = ['#00d4ff', '#7c3aed', '#7c3aed', '#7c3aed', '#7c3aed', '#ec4899']

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export default function HeroNeuralNet() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const stateRef  = useRef({
    neurons:      [],
    edges:        [],
    pulses:       [],
    ripples:      [],
    layerNeurons: [],
    cascade: {
      mode:       'waiting', // waiting | forward | backprop_wait | backprop
      timer:      110,
      layer:      0,
      layerTimer: 0,
    },
    stats: { epoch: 1, loss: 2.418 },
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId

    // ── Build ──────────────────────────────────────────────────────
    const build = () => {
      const s = stateRef.current
      const dpr = window.devicePixelRatio || 1
      const W = canvas.width / dpr
      const H = canvas.height / dpr

      s.neurons = []; s.edges = []; s.pulses = []
      s.ripples = []; s.layerNeurons = LAYERS.map(() => [])

      const xL    = W * 0.37
      const xR    = W * 0.98
      const xStep = (xR - xL) / (LAYERS.length - 1)

      LAYERS.forEach((count, li) => {
        const x   = xL + li * xStep
        const gap = Math.min((H * 0.72) / (count - 1 || 1), 72)
        const y0  = H / 2 - ((count - 1) * gap) / 2

        for (let ni = 0; ni < count; ni++) {
          const idx = s.neurons.length
          s.neurons.push({
            x, y: y0 + ni * gap,
            layer: li,
            phase: Math.random() * Math.PI * 2,
            r: li === 0 || li === LAYERS.length - 1 ? 5.5 : 4.5,
            flare: 0, backFlare: 0,
          })
          s.layerNeurons[li].push(idx)
        }
      })

      let off = 0
      for (let li = 0; li < LAYERS.length - 1; li++) {
        const next = off + LAYERS[li]
        for (let i = off; i < off + LAYERS[li]; i++) {
          for (let j = next; j < next + LAYERS[li + 1]; j++) {
            s.edges.push({
              from: i, to: j,
              weight:   0.15 + Math.random() * 0.85,
              interval: 220 + Math.floor(Math.random() * 160),
              timer:    Math.floor(Math.random() * 220),
            })
          }
        }
        off += LAYERS[li]
      }
    }

    // ── Resize ─────────────────────────────────────────────────────
    const resize = () => {
      const dpr  = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width  = rect.width  * dpr
      canvas.height = rect.height * dpr
      canvas.style.width  = rect.width  + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    // ── Helpers ────────────────────────────────────────────────────
    const addPulse = (from, to, isBackprop, isCascade = false) => {
      const s = stateRef.current
      if (s.pulses.length >= 160) return
      s.pulses.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.006, isBackprop, isCascade })
    }

    const activateNeuron = (idx, isBackprop) => {
      const s = stateRef.current
      const n = s.neurons[idx]
      if (!n) return
      if (isBackprop) n.backFlare = 1
      else            n.flare     = 1
      if (s.ripples.length < 30) {
        s.ripples.push({
          x: n.x, y: n.y,
          r: n.r * 1.4,
          speed: 1.3 + Math.random() * 0.9,
          alpha: 0.7,
          isBackprop,
        })
      }
    }

    // ── Cascade state machine ──────────────────────────────────────
    const updateCascade = () => {
      const s = stateRef.current
      const c = s.cascade

      if (c.mode === 'waiting') {
        if (--c.timer <= 0) { c.mode = 'forward'; c.layer = 0; c.layerTimer = 0 }
        return
      }

      if (c.mode === 'forward') {
        if (--c.layerTimer <= 0) {
          // Ripple-activate source layer
          s.layerNeurons[c.layer].forEach(idx => activateNeuron(idx, false))
          // Fire edges forward
          if (c.layer < LAYERS.length - 1) {
            s.edges
              .filter(e => s.neurons[e.from]?.layer === c.layer)
              .forEach(e => addPulse(e.from, e.to, false, true))
          }
          c.layerTimer = 60
          if (++c.layer >= LAYERS.length) { c.mode = 'backprop_wait'; c.timer = 60 }
        }
        return
      }

      if (c.mode === 'backprop_wait') {
        if (--c.timer <= 0) { c.mode = 'backprop'; c.layer = LAYERS.length - 1; c.layerTimer = 0 }
        return
      }

      if (c.mode === 'backprop') {
        if (--c.layerTimer <= 0) {
          // Ripple-activate current layer (pink)
          s.layerNeurons[c.layer].forEach(idx => activateNeuron(idx, true))
          // Fire edges backward
          if (c.layer > 0) {
            s.edges
              .filter(e => s.neurons[e.to]?.layer === c.layer)
              .forEach(e => addPulse(e.to, e.from, true, true))
          }
          c.layerTimer = 55
          if (--c.layer < 0) {
            s.stats.epoch++
            s.stats.loss = Math.max(0.028, s.stats.loss * (0.987 + Math.random() * 0.006) - Math.random() * 0.009)
            c.mode  = 'waiting'
            c.timer = 150 + Math.floor(Math.random() * 80)
          }
        }
      }
    }

    // ── Main draw loop ─────────────────────────────────────────────
    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const W   = canvas.width  / dpr
      const H   = canvas.height / dpr
      ctx.clearRect(0, 0, W, H)

      const s = stateRef.current
      const { neurons, edges, pulses, ripples } = s
      const mouse = mouseRef.current

      updateCascade()

      // Edges
      edges.forEach(edge => {
        const a = neurons[edge.from], b = neurons[edge.to]
        if (!a || !b) return
        const alpha = edge.weight * 0.09
        const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
        g.addColorStop(0, `rgba(0,212,255,${alpha})`)
        g.addColorStop(1, `rgba(124,58,237,${alpha * 0.85})`)
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = g
        ctx.lineWidth   = 0.35 + edge.weight * 0.55
        ctx.stroke()
        // Ambient pulses
        if (++edge.timer >= edge.interval && pulses.length < 70) {
          edge.timer = 0
          addPulse(edge.from, edge.to, false, false)
        }
      })

      // Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.t += p.speed
        if (p.t > 1) {
          // Cascade pulses softly flare destination; ambient pulses trigger full ripple
          const n = neurons[p.to]
          if (n) {
            if (p.isCascade) {
              if (p.isBackprop) n.backFlare = Math.min(1, n.backFlare + 0.25)
              else              n.flare     = Math.min(1, n.flare     + 0.25)
            } else {
              activateNeuron(p.to, p.isBackprop)
            }
          }
          pulses.splice(i, 1)
          continue
        }

        const a = neurons[p.from], b = neurons[p.to]
        if (!a || !b) { pulses.splice(i, 1); continue }

        const px = a.x + (b.x - a.x) * p.t
        const py = a.y + (b.y - a.y) * p.t
        const t0 = Math.max(0, p.t - 0.13)
        const tx = a.x + (b.x - a.x) * t0
        const ty = a.y + (b.y - a.y) * t0
        const tAlpha = 0.55 * (1 - Math.abs(p.t - 0.5) * 1.5)

        if (p.isBackprop) {
          const tg = ctx.createLinearGradient(tx, ty, px, py)
          tg.addColorStop(0, 'rgba(236,72,153,0)')
          tg.addColorStop(1, `rgba(236,72,153,${tAlpha})`)
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py)
          ctx.strokeStyle = tg; ctx.lineWidth = 1.3; ctx.stroke()

          ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2)
          ctx.fillStyle = '#ec4899'
          ctx.shadowBlur = 10; ctx.shadowColor = '#ec4899'; ctx.fill(); ctx.shadowBlur = 0
        } else {
          const r  = Math.round(p.t * 124)
          const gg = Math.round(212 - p.t * 154)
          const bb = Math.round(255 - p.t * 18)
          const tg = ctx.createLinearGradient(tx, ty, px, py)
          tg.addColorStop(0, 'rgba(0,212,255,0)')
          tg.addColorStop(1, `rgba(${r},${gg},${bb},${tAlpha})`)
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py)
          ctx.strokeStyle = tg; ctx.lineWidth = 1.3; ctx.stroke()

          ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2)
          const dc = `rgb(${r},${gg},${bb})`
          ctx.fillStyle = dc; ctx.shadowBlur = 10; ctx.shadowColor = dc; ctx.fill(); ctx.shadowBlur = 0
        }
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i]
        rip.r     += rip.speed
        rip.alpha -= 0.024
        if (rip.alpha <= 0) { ripples.splice(i, 1); continue }
        ctx.beginPath(); ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2)
        ctx.strokeStyle = rip.isBackprop
          ? `rgba(236,72,153,${rip.alpha})`
          : `rgba(0,212,255,${rip.alpha})`
        ctx.lineWidth = 1.3; ctx.stroke()
      }

      // Neurons
      neurons.forEach(n => {
        n.phase     += 0.018
        n.flare      = Math.max(0, n.flare     - 0.042)
        n.backFlare  = Math.max(0, n.backFlare  - 0.042)

        const pulse    = 0.5 + 0.5 * Math.sin(n.phase)
        const dx       = mouse.x - n.x, dy = mouse.y - n.y
        const prox     = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 110)
        const flareVal = Math.max(n.flare, n.backFlare)
        const isBack   = n.backFlare > n.flare
        const baseColor = LAYER_COLORS[n.layer]

        const glow  = pulse * 0.42 + prox * 0.5 + flareVal * 0.95
        const alpha = 0.35 + pulse * 0.25 + prox * 0.3 + flareVal * 0.4
        const r     = n.r + flareVal * 2.8 + prox * 0.6

        // Aura
        const auraRGB = isBack ? '236,72,153' : prox > 0.1 ? '124,58,237' : '0,212,255'
        const aura = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5.5)
        aura.addColorStop(0, `rgba(${auraRGB},${glow * 0.22})`)
        aura.addColorStop(1, `rgba(${auraRGB},0)`)
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 5.5, 0, Math.PI * 2)
        ctx.fillStyle = aura; ctx.fill()

        // Body
        const bodyRGB = isBack ? '236,72,153'
          : prox > 0.1  ? '124,58,237'
          : n.flare > 0.05 ? (
              baseColor === '#00d4ff' ? '0,212,255'
            : baseColor === '#ec4899' ? '236,72,153'
            : '124,58,237'
          ) : '0,212,255'
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle   = `rgba(${bodyRGB},${alpha})`
        ctx.shadowBlur  = 6 + glow * 12
        ctx.shadowColor = `rgba(${bodyRGB},0.9)`
        ctx.fill(); ctx.shadowBlur = 0

        // Ring
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 1.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,212,255,${0.18 + glow * 0.28})`
        ctx.lineWidth   = 0.7; ctx.stroke()
      })

      // Layer labels
      ctx.font      = '9px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      LAYERS.forEach((_, li) => {
        const ns = s.layerNeurons[li]
        if (!ns?.length) return
        const x       = neurons[ns[0]].x
        const bottomY = Math.max(...ns.map(i => neurons[i].y)) + 24
        ctx.fillStyle = 'rgba(0,212,255,0.3)'
        ctx.fillText(LAYER_LABELS[li], x, bottomY)
      })

      // Stats HUD
      const { epoch, loss } = s.stats
      const firstNeuron = neurons[s.layerNeurons[0]?.[0]]
      const hudX = firstNeuron ? firstNeuron.x - 14 : W * 0.35
      const hudY = 16

      roundRect(ctx, hudX, hudY, 172, 48, 6)
      ctx.fillStyle   = 'rgba(5,6,15,0.6)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,212,255,0.14)'
      ctx.lineWidth   = 1
      ctx.stroke()

      ctx.textAlign = 'left'
      ctx.font      = '9.5px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(100,116,139,0.65)'
      ctx.fillText('epoch:', hudX + 10, hudY + 18)
      ctx.fillStyle = 'rgba(0,212,255,0.88)'
      ctx.fillText(String(epoch).padStart(4, ' '), hudX + 60, hudY + 18)

      ctx.fillStyle = 'rgba(100,116,139,0.65)'
      ctx.fillText('loss: ', hudX + 10, hudY + 36)
      ctx.fillStyle = '#10b981'
      ctx.fillText(loss.toFixed(4) + ' ↓', hudX + 60, hudY + 36)

      animId = requestAnimationFrame(draw)
    }

    // Mouse
    const hero    = canvas.parentElement
    const onMove  = e => {
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
        top: 0, left: 0,
        zIndex: 0,
        opacity: 0.78,
        pointerEvents: 'none',
      }}
    />
  )
}
