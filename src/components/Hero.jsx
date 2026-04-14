import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FloatingLogos from "./FloatingLogos";
import HeroNeuralNet from "./HeroNeuralNet";

const ROLES = [
  "ML Models",
  "AI Research",
  "Deep Learning Engineer",
  "Computer Vision Engineer",
  "NLP Engineer",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let i = typing ? displayed.length : displayed.length - 1;
    if (typing) {
      if (i < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, i + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (i >= 0) {
        const t = setTimeout(() => setDisplayed(role.slice(0, i)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIdx((r) => (r + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <HeroNeuralNet />
      <FloatingLogos />
      <div className="container">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#00d4ff",
              fontSize: "0.95rem",
              marginBottom: 16,
              letterSpacing: "0.05em",
            }}
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            variants={item}
            style={{
              fontSize: "clamp(2.4rem, 8vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            Aayush Katoch.
          </motion.h1>

          <motion.div
            variants={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
                flexShrink: 0,
                animation: "pulse-green 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                color: "#10b981",
                letterSpacing: "0.06em",
              }}
            >
              Open to opportunities
            </span>
          </motion.div>

          <motion.h2
            variants={item}
            style={{
              fontSize: "clamp(1.4rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "var(--muted)",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            I build&nbsp;
            <span style={{ color: "#00d4ff", minWidth: "18ch" }}>
              {displayed}
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1em",
                  background: "#00d4ff",
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                  animation: "blink 0.9s step-end infinite",
                }}
              />
            </span>
          </motion.h2>

          <motion.p
            variants={item}
            style={{
              maxWidth: 540,
              color: "var(--muted)",
              lineHeight: 1.75,
              marginBottom: 40,
              fontSize: "1rem",
            }}
          >
            MS Data Science @ Northeastern University. I specialise in computer
            vision, NLP, and building production-ready AI systems — from
            satellite imagery segmentation to LLM-powered applications.
          </motion.p>

          <motion.div
            variants={item}
            style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "14px 32px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 0 30px rgba(0,212,255,0.25)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 40px rgba(0,212,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "";
                e.target.style.boxShadow = "0 0 30px rgba(0,212,255,0.25)";
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "14px 32px",
                borderRadius: 8,
                border: "1px solid rgba(0,212,255,0.4)",
                color: "#00d4ff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(0,212,255,0.08)";
                e.target.style.borderColor = "#00d4ff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.borderColor = "rgba(0,212,255,0.4)";
              }}
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            variants={item}
            style={{
              display: "flex",
              gap: 20,
              marginTop: 48,
              alignItems: "center",
            }}
          >
            {[
              {
                href: "https://github.com/Aayush99000",
                label: "GitHub",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                ),
              },
              {
                href: "https://linkedin.com/in/aayush-katoch-a47413175",
                label: "LinkedIn",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                href: "mailto:katoch.aa@northeastern.edu",
                label: "Email",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  color: "var(--muted)",
                  transition: "color 0.2s, transform 0.2s",
                  display: "flex",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#00d4ff";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.transform = "";
                }}
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: "0.65rem",
            color: "var(--muted)",
            letterSpacing: "0.15em",
          }}
        >
          SCROLL
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect
            x="1"
            y="1"
            width="14"
            height="22"
            rx="7"
            stroke="rgba(0,212,255,0.4)"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="8" r="2.5" fill="#00d4ff">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;0,8;0,0"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
      `}</style>
    </section>
  );
}
