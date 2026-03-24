import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    title: "Text-to-Sign Motion Generation",
    image: "/images/Sign-to-text.png",
    desc: "Pipeline mapping natural language to realistic sign language motion sequences (T × 668 skeletal features) using a 55-joint BVH skeleton at 30 FPS across ~12k training samples.",
    metrics: ["~12k samples", "30 FPS", "668 features/frame"],
    tags: ["NLP", "Motion Synthesis", "SMPL-X", "Diffusion", "PyTorch"],
    github: "https://github.com/Aayush99000",
    color: "#00d4ff",
    featured: true,
  },
  {
    title: "RAG Fitness Assistant",
    desc: "AI-powered fitness chatbot using Retrieval Augmented Generation backed by 500+ exercises. Stack: LangChain, ChromaDB, Groq-hosted Llama 3 8B, sentence-transformers, Streamlit.",
    metrics: ["500+ exercises", "Llama 3 8B", "RAG pipeline"],
    tags: ["RAG", "LangChain", "LLM", "ChromaDB", "Streamlit"],
    github: "https://github.com/Aayush99000",
    image: "/images/RAG-fitness.png",
    color: "#7c3aed",
    featured: true,
  },
  {
    title: "Low-Resource Medical Imaging",
    desc: "Empirical study comparing three transfer learning strategies under extreme data scarcity (~300 samples). Achieved 92.02% accuracy & 0.9875 AUC with ImageNet-pretrained DenseNet121.",
    metrics: ["92.02% accuracy", "0.9875 AUC", "+14% vs baseline"],
    tags: [
      "Transfer Learning",
      "Medical AI",
      "DenseNet",
      "MedSigLIP",
      "k-Fold CV",
    ],
    github: "https://github.com/Aayush99000",
    image: "/images/medical-imaging.png",
    color: "#ec4899",
    featured: true,
  },
  {
    title: "Cloud Detection on Satellite Data",
    desc: "UNet and Attention-UNet architectures for cloud segmentation on LANDSAT imagery. Achieved 98% accuracy and 93% Dice score via Transfer Learning at ISRO.",
    metrics: ["98% accuracy", "93% Dice score", "1k+ images"],
    tags: ["UNet", "Segmentation", "LANDSAT", "TensorFlow", "GIS"],
    github: null,
    image: "/images/cloud-detection.png",
    color: "#10b981",
  },
  {
    title: "Image Captioning on Satellite Data",
    desc: "Encoder-decoder models (ResNet-50, VGG-19, DenseNet-201, EfficientNet-B7 + LSTM) for satellite image captioning. EfficientNet-B7 + LSTM achieved BLEU-4 of 0.6916.",
    metrics: ["94.05% accuracy", "BLEU-4: 0.6916", "RSICD dataset"],
    tags: [
      "Image Captioning",
      "LSTM",
      "EfficientNet",
      "RSICD",
      "Encoder-Decoder",
    ],
    github: null,
    image: "/images/image-captioning.png",
    color: "#f59e0b",
  },
];

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number">04.</span> Projects <div className="line" />
        </motion.h2>

        {/* Featured projects */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            marginBottom: 60,
          }}
        >
          {featured.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass-card"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${p.color}25`,
                transition: "border-color 0.3s, box-shadow 0.3s",
                direction: i % 2 === 1 ? "rtl" : "ltr",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${p.color}55`;
                e.currentTarget.style.boxShadow = `0 12px 48px ${p.color}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${p.color}25`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  direction: "ltr",
                  background: `linear-gradient(135deg, ${p.color}15, ${p.color}05)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 260,
                  borderRight: i % 2 === 0 ? `1px solid ${p.color}15` : "none",
                  borderLeft: i % 2 === 1 ? `1px solid ${p.color}15` : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `repeating-linear-gradient(${p.color}08 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, ${p.color}08 0 1px, transparent 1px 40px)`,
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        textAlign: "center",
                        padding: 24,
                      }}
                    >
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 16,
                          background: `${p.color}15`,
                          border: `1px solid ${p.color}40`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 12px",
                          fontSize: "1.8rem",
                        }}
                      >
                        {i === 0 ? "🤟" : i === 1 ? "🏋️" : "🩺"}
                      </div>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono",
                          fontSize: "0.7rem",
                          color: `${p.color}80`,
                          letterSpacing: "0.1em",
                        }}
                      >
                        IMAGE COMING SOON
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div style={{ direction: "ltr", padding: "36px 36px" }}>
                <div
                  style={{
                    fontFamily: "JetBrains Mono",
                    fontSize: "0.72rem",
                    color: p.color,
                    letterSpacing: "0.1em",
                    marginBottom: 10,
                    textTransform: "uppercase",
                  }}
                >
                  Featured Project
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: 14,
                    color: "#e2e8f0",
                  }}
                >
                  {p.title}
                </h3>
                {/* Metrics callouts */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 16,
                  }}
                >
                  {p.metrics.map((m) => (
                    <span
                      key={m}
                      style={{
                        padding: "3px 11px",
                        borderRadius: 6,
                        fontSize: "0.72rem",
                        fontFamily: "JetBrains Mono",
                        fontWeight: 600,
                        background: `${p.color}18`,
                        border: `1px solid ${p.color}50`,
                        color: p.color,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.75,
                    fontSize: "0.9rem",
                    marginBottom: 24,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "JetBrains Mono",
                        fontSize: "0.72rem",
                        color: "var(--muted)",
                        padding: "2px 0",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = p.color)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      <GitHubIcon /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects grid */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: "center",
            color: "var(--muted)",
            fontSize: "0.9rem",
            marginBottom: 32,
            fontFamily: "JetBrains Mono",
          }}
        >
          other noteworthy projects
        </motion.h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {rest.map((p, i) => (
            <motion.div
              key={p.title}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.65 + i * 0.12 }}
              style={{
                padding: "28px 28px",
                borderRadius: 14,
                border: `1px solid ${p.color}20`,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition:
                  "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${p.color}50`;
                e.currentTarget.style.boxShadow = `0 8px 32px ${p.color}10`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${p.color}20`;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "";
              }}
            >
              {/* image placeholder */}
              <div
                style={{
                  height: 120,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${p.color}12, ${p.color}04)`,
                  border: `1px solid ${p.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `repeating-linear-gradient(${p.color}06 0 1px, transparent 1px 30px), repeating-linear-gradient(90deg, ${p.color}06 0 1px, transparent 1px 30px)`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "JetBrains Mono",
                        fontSize: "0.65rem",
                        color: `${p.color}60`,
                        letterSpacing: "0.1em",
                        position: "relative",
                      }}
                    >
                      IMAGE COMING SOON
                    </span>
                  </>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    color: "#e2e8f0",
                    flex: 1,
                  }}
                >
                  {p.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    color: "var(--muted)",
                    marginLeft: 12,
                  }}
                >
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", transition: "color 0.2s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = p.color)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      <GitHubIcon />
                    </a>
                  )}
                </div>
              </div>
              {/* Metrics callouts */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {p.metrics.map((m) => (
                  <span
                    key={m}
                    style={{
                      padding: "2px 9px",
                      borderRadius: 5,
                      fontSize: "0.68rem",
                      fontFamily: "JetBrains Mono",
                      fontWeight: 600,
                      background: `${p.color}15`,
                      border: `1px solid ${p.color}45`,
                      color: p.color,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  lineHeight: 1.65,
                }}
              >
                {p.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: "auto",
                  paddingTop: 8,
                }}
              >
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "JetBrains Mono",
                      fontSize: "0.7rem",
                      color: `${p.color}90`,
                      background: `${p.color}10`,
                      padding: "3px 10px",
                      borderRadius: 20,
                      border: `1px solid ${p.color}25`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
