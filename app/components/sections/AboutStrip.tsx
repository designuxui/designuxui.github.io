"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TAB_LABELS = [
  "the first thing you should know",
  "the second thing you should know",
  "the third thing you should know",
];

const BLOCKS = [
  {
    num: "01",
    heading: "WE GREW THIS PRACTICE THROUGH WORK, NOT THROUGH MARKETING",
    statements: [
      { text: "Every client came from a referral.", bold: true },
      { text: "Because results speak.", bold: true },
      { text: "No deck. No pitch. Just outcomes that compounded.", bold: false },
      { text: "What's worth sharing now…is the POV the real work built.", bold: false },
    ],
    body: "UX strategy, product thinking and revenue systems, to us, are hands-on. It means understanding what moves a business forward: data, systems, user behaviour — and the numbers behind all of it.",
    cta: { label: "see our work", href: "#cases" },
    photos: [1, 2, 3, 4],
  },
  {
    num: "02",
    heading: "MOST OF OUR WORK COMES FROM ONE WORD: TRUSTED",
    statements: [
      { text: "Project to project.", bold: true },
      { text: "Referral after referral.", bold: true },
      { text: "We meet teams where they are — and move fast.", bold: false },
      { text: "Collaborative, transparent, ambitious.", bold: false },
    ],
    body: "That's how a consultant who stayed off the grid found success: through trust, consistency, and shared goals. One person. No agency overhead. No handoff delays.",
    cta: { label: "about us", href: "#contact" },
    clients: ["SaaS Platform", "Fintech Co.", "eCommerce Brand", "B2B Agency", "Health Startup", "Scale-up", "Creative Studio", "PropTech", "EdTech", "MarTech"],
  },
  {
    num: "03",
    heading: "WE REFUSE TO STAY IN A SINGLE LANE",
    statements: [
      { text: "We speak UX.", bold: true },
      { text: "We speak revenue.", bold: true },
      { text: "C-suite and design. Spreadsheets and prototypes.", bold: false },
      { text: "Our language is intentional, built to move clients forward.", bold: false },
    ],
    body: "Vision is nothing without execution. We build both. We create UX systems, product strategies, and the revenue frameworks that make them perform.",
    cta: { label: "our services", href: "#services" },
  },
];

const PHOTO_COLORS = [
  "#d4cfc6",
  "#c8c3ba",
  "#ddd9cf",
  "#cdc9bf",
  "#d8d4ca",
  "#c4bfb5",
  "#e0dbd0",
  "#ccc8be",
  "#d0ccc2",
  "#c6c2b8",
  "#dad6cc",
  "#cac6bc",
];

const WORDS = ["UX", "Strategy", "Revenue", "Systems"];

export default function AboutStrip() {
  const [active, setActive] = useState(0);
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [hoverTop, setHoverTop] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const namesRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % WORDS.length);
    }, 1500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const wordEl = sectionRef.current?.querySelector<HTMLDivElement>(".word-swap");
    if (!wordEl) return;
    gsap.fromTo(wordEl, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" });
  }, [wordIndex]);

  const block = BLOCKS[active];

  const handleNameHover = (client: string, index: number) => {
    const parent = namesRef.current;
    const item = parent?.querySelectorAll<HTMLDivElement>(".client-name")[index];
    if (!item || !parent) return;
    setHoveredClient(client);
    setHoverTop(item.offsetTop);
  };

  const handleNameLeave = () => {
    setHoveredClient(null);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: "#f5f0e8",
        borderTop: "1px solid rgba(10,10,10,0.08)",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", padding: "2rem 2rem 0" }}>
        {TAB_LABELS.map((label, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.6rem",
              color: active === idx ? "#0a0a0a" : "rgba(10,10,10,0.3)",
              textTransform: "lowercase",
              letterSpacing: "0",
              borderBottom: active === idx ? "1px solid #0a0a0a" : "none",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 540px", minWidth: "320px", padding: "clamp(3rem, 6vw, 6rem) 2rem" }}>

          <h2 style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.05,
            color: "#0a0a0a",
            margin: 0,
            marginBottom: "2rem",
            maxWidth: "34rem",
          }}>
            {block.heading}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2rem" }}>
            {block.statements.map((statement, idx) => (
              <p key={idx} style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                fontWeight: statement.bold ? 700 : 400,
                color: statement.bold ? "#0a0a0a" : "rgba(10,10,10,0.45)",
                margin: 0,
                lineHeight: 1.4,
              }}>
                {statement.text}
              </p>
            ))}
          </div>

          <p style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.72rem",
            lineHeight: 1.75,
            color: "rgba(10,10,10,0.45)",
            maxWidth: "34rem",
            marginBottom: "2rem",
          }}>
            {block.body}
          </p>

          <a
            href={block.cta.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-unbounded)",
              fontWeight: 700,
              fontSize: "0.75rem",
              color: "#0a0a0a",
              textDecoration: "underline",
            }}
          >
            {block.cta.label} ↗
          </a>
        </div>

        <div style={{ flex: "1 1 380px", minWidth: "320px", padding: "clamp(3rem, 6vw, 6rem) 2rem" }}>
          {active === 0 && block.photos && (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {block.photos.map((photo) => (
                <div key={photo} style={{
                  width: "100%",
                  height: "180px",
                  borderRadius: "14px",
                  background: PHOTO_COLORS[photo - 1] ?? "#d4cfc6",
                }} />
              ))}
            </div>
          )}

          {active === 1 && (
            <div style={{ position: "relative" }}>
              <div ref={namesRef}>
                {block.clients?.map((client, index) => (
                  <div
                    key={client}
                    className="client-name"
                    onMouseEnter={() => handleNameHover(client, index)}
                    onMouseLeave={handleNameLeave}
                    style={{
                      fontFamily: "var(--font-unbounded)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: hoveredClient === client ? "#0a0a0a" : "rgba(10,10,10,0.65)",
                      marginBottom: "1.1rem",
                      cursor: "pointer",
                    }}
                  >
                    {client}
                  </div>
                ))}
              </div>

              {hoveredClient && (
                <div style={{
                  position: "absolute",
                  top: hoverTop,
                  left: "calc(100% + 1rem)",
                  width: "180px",
                  height: "240px",
                  borderRadius: "18px",
                  background: "rgba(10,10,10,0.05)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
                }} />
              )}
            </div>
          )}

          {active === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.85rem",
                color: "rgba(10,10,10,0.35)",
                textTransform: "lowercase",
              }}>
                We speak
              </span>
              <div style={{ position: "relative", minHeight: "140px" }}>
                <div
                  className="word-swap"
                  style={{
                    fontFamily: "var(--font-unbounded)",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    fontWeight: 900,
                    color: "#c8f542",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    opacity: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  {WORDS[wordIndex]}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
