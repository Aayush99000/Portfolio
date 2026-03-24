import { useEffect, useRef } from 'react'

const GRID  = 14
const RANGE = 2.5
const STEP  = (RANGE * 2) / GRID
const RY    = 0.52   // azimuth rotation
const RX    = 0.68   // elevation rotation
const SCALE = 46

function surface(x, y) { return 0.48 * (x * x + y * y) }

function project(x, y, z) {
  const x1 =  x * Math.cos(RY) + z * Math.sin(RY)
  const z1 = -x * Math.sin(RY) + z * Math.cos(RY)
  const y2 =  y * Math.cos(RX) - z1 * Math.sin(RX)
  const z2 =  y * Math.sin(RX) + z1 * Math.cos(RX)
  return { x: x1, y: y2, depth: z2 }
}

function computePath() {
  const pts = []; let px = 2.1, py = 1.55; const lr = 0.13
  for (let i = 0; i < 46; i++) {
    pts.push([px, py])
    px -= lr * 2 * px * 0.48
    py -= lr * 2 * py * 0.48
  }
  return pts
}
const BALL_PATH = computePath()

export default function GradientDescent({ width = 360, height = 215 }) {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const progRef   = useRef(0)
  const pauseRef  = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const CX     = width  / 2 - 8
    const CY     = height / 2 + 18

    // Build mesh vertices
    const verts = []
    for (let i = 0; i <= GRID; i++) {
      const row = []
      for (let j = 0; j <= GRID; j++) {
        const x = -RANGE + i * STEP, y = -RANGE + j * STEP
        const p = project(x, y, surface(x, y))
        row.push({ px: CX + p.x * SCALE, py: CY + p.y * SCALE })
      }
      verts.push(row)
    }

    // Ball projected positions
    const ballPts = BALL_PATH.map(([bx, by]) => {
      const p = project(bx, by, surface(bx, by))
      return { px: CX + p.x * SCALE, py: CY + p.y * SCALE }
    })

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // x-direction mesh lines
      for (let i = 0; i <= GRID; i++) {
        ctx.beginPath()
        for (let j = 0; j <= GRID; j++) {
          const v = verts[i][j]
          j === 0 ? ctx.moveTo(v.px, v.py) : ctx.lineTo(v.px, v.py)
        }
        ctx.strokeStyle = `rgba(0,212,255,${(0.10 + (i / GRID) * 0.12).toFixed(2)})`
        ctx.lineWidth = 0.75; ctx.stroke()
      }
      // y-direction mesh lines
      for (let j = 0; j <= GRID; j++) {
        ctx.beginPath()
        for (let i = 0; i <= GRID; i++) {
          const v = verts[i][j]
          i === 0 ? ctx.moveTo(v.px, v.py) : ctx.lineTo(v.px, v.py)
        }
        ctx.strokeStyle = `rgba(124,58,237,${(0.08 + (j / GRID) * 0.10).toFixed(2)})`
        ctx.lineWidth = 0.75; ctx.stroke()
      }

      // Trail
      const prog = progRef.current
      const bIdx = Math.min(Math.floor(prog * ballPts.length), ballPts.length - 1)
      if (bIdx > 0) {
        ctx.beginPath()
        ctx.moveTo(ballPts[0].px, ballPts[0].py)
        for (let i = 1; i <= bIdx; i++) ctx.lineTo(ballPts[i].px, ballPts[i].py)
        ctx.strokeStyle = 'rgba(0,212,255,0.55)'
        ctx.lineWidth = 1.6
        ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([])
      }

      // Glow ball
      const ball = ballPts[bIdx]
      const grd  = ctx.createRadialGradient(ball.px, ball.py, 0, ball.px, ball.py, 10)
      grd.addColorStop(0, 'rgba(0,212,255,0.9)')
      grd.addColorStop(0.45, 'rgba(0,212,255,0.45)')
      grd.addColorStop(1, 'rgba(0,212,255,0)')
      ctx.beginPath(); ctx.arc(ball.px, ball.py, 10, 0, Math.PI * 2)
      ctx.fillStyle = grd; ctx.fill()
      ctx.beginPath(); ctx.arc(ball.px, ball.py, 3.5, 0, Math.PI * 2)
      ctx.shadowColor = '#00d4ff'; ctx.shadowBlur = 10
      ctx.fillStyle = '#ffffff'; ctx.fill()
      ctx.shadowBlur = 0

      // Minimum marker
      const minPt = ballPts[ballPts.length - 1]
      ctx.beginPath(); ctx.arc(minPt.px, minPt.py, 3, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,212,255,0.4)'; ctx.lineWidth = 1
      ctx.setLineDash([2, 2]); ctx.stroke(); ctx.setLineDash([])

      // Labels
      ctx.font = '9.5px JetBrains Mono, monospace'
      ctx.fillStyle = 'rgba(0,212,255,0.6)'; ctx.fillText('LOSS LANDSCAPE', 6, 15)
      ctx.fillStyle = 'rgba(124,58,237,0.65)'; ctx.fillText('∇ gradient descent', 6, 28)

      // Epoch label
      const epochNum = Math.round(prog * BALL_PATH.length)
      ctx.fillStyle = 'rgba(100,116,139,0.7)'
      ctx.fillText(`step: ${epochNum}`, width - 72, 15)

      // Animate
      if (prog < 1) {
        progRef.current = Math.min(prog + 0.006, 1)
        pauseRef.current = 0
      } else {
        if (++pauseRef.current > 130) { progRef.current = 0; pauseRef.current = 0 }
      }
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [width, height])

  return (
    <div>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'rgba(0,212,255,0.7)', letterSpacing: '0.1em', marginBottom: 8 }}>
        GRADIENT DESCENT
      </div>
      <canvas ref={canvasRef} width={width} height={height} style={{ display: 'block' }}/>
    </div>
  )
}
