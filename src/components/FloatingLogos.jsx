const logos = [
  // Row 1 — top band
  { name: 'PyTorch',      color: '#ee4c2c', x: '7%',  y: '12%', anim: 'float-a', delay: '0s',   dur: '9s'  },
  { name: 'Scikit',       color: '#f7931e', x: '34%', y: '6%',  anim: 'float-b', delay: '2.2s', dur: '13s' },
  { name: 'TensorFlow',   color: '#ff6f00', x: '60%', y: '10%', anim: 'float-c', delay: '1.2s', dur: '11s' },
  { name: 'HuggingFace',  color: '#e0a800', x: '85%', y: '16%', anim: 'float-d', delay: '3.0s', dur: '12s' },
  // Row 2 — middle band
  { name: 'LangChain',    color: '#00a86b', x: '3%',  y: '42%', anim: 'float-b', delay: '3.5s', dur: '14s' },
  { name: 'Keras',        color: '#d00000', x: '22%', y: '50%', anim: 'float-d', delay: '1.5s', dur: '10s' },
  { name: 'OpenCV',       color: '#5c3ee8', x: '46%', y: '46%', anim: 'float-a', delay: '2.8s', dur: '10s' },
  { name: 'FastAPI',      color: '#009688', x: '70%', y: '52%', anim: 'float-c', delay: '0.7s', dur: '12s' },
  { name: 'AWS',          color: '#ff9900', x: '88%', y: '44%', anim: 'float-b', delay: '4.2s', dur: '11s' },
  // Row 3 — bottom band
  { name: 'Python',       color: '#3776ab', x: '8%',  y: '78%', anim: 'float-c', delay: '0.5s', dur: '13s' },
  { name: 'Matplotlib',   color: '#11557c', x: '28%', y: '86%', anim: 'float-a', delay: '1.9s', dur: '15s' },
  { name: 'Docker',       color: '#2496ed', x: '52%', y: '82%', anim: 'float-d', delay: '0.9s', dur: '10s' },
  { name: 'CUDA',         color: '#76b900', x: '72%', y: '88%', anim: 'float-b', delay: '2.1s', dur: '11s' },
  { name: 'NumPy',        color: '#4dabcf', x: '88%', y: '76%', anim: 'float-a', delay: '3.8s', dur: '14s' },
]

export default function FloatingLogos() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {logos.map(l => (
        <div
          key={l.name}
          style={{
            position: 'absolute',
            left: l.x,
            top: l.y,
            animation: `${l.anim} ${l.dur} ease-in-out ${l.delay} infinite`,
            opacity: 0.55,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 12px',
            borderRadius: 20,
            background: `${l.color}14`,
            border: `1px solid ${l.color}40`,
            backdropFilter: 'blur(8px)',
            whiteSpace: 'nowrap',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: l.color,
              boxShadow: `0 0 6px ${l.color}`,
              flexShrink: 0,
            }}/>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem',
              color: l.color,
              letterSpacing: '0.04em',
              fontWeight: 500,
            }}>
              {l.name}
            </span>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25%       { transform: translate(8px, -14px) rotate(1deg); }
          50%       { transform: translate(-6px, -20px) rotate(-1deg); }
          75%       { transform: translate(12px, -8px) rotate(0.5deg); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33%       { transform: translate(-10px, -18px) rotate(-1.5deg); }
          66%       { transform: translate(6px, -10px) rotate(1deg); }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0); }
          20%       { transform: translate(14px, -10px); }
          60%       { transform: translate(-8px, -22px); }
          80%       { transform: translate(4px, -14px); }
        }
        @keyframes float-d {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          40%       { transform: translate(-12px, -16px) rotate(1.5deg); }
          70%       { transform: translate(8px, -8px) rotate(-1deg); }
        }
      `}</style>
    </div>
  )
}
