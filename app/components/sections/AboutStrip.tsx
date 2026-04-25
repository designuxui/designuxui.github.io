"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BLOCKS = [
  {
    num: "01",
    label: "The first thing you should know",
    heading: "I GREW THIS PRACTICE THROUGH WORK, NOT THROUGH MARKETING",
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    body: [
      "Every client came from a referral.",
      "Because results speak.",
      "No deck. No pitch. Just outcomes that compounded.",
      "What's worth showing now… is the POV the real work built.",
    ],
    sub: "UX, product strategy and sales — built together, not handed off.",
    cta: { label: "See the work", href: "#cases" },
  },
  {
    num: "02",
    label: "The second thing you should know",
    heading: "MOST OF MY WORK COMES FROM ONE WORD: TRUSTED",
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    body: [
      "Project to project.",
      "Referral after referral.",
      "I meet teams where they are — and move fast.",
      "Collaborative, transparent, ambitious.",
    ],
    sub: "One person. No agency overhead. No handoff delays.",
    cta: { label: "About me", href: "#about" },
    clients: ["SaaS Co.", "Fintech", "eCommerce", "B2B", "Agency", "Startup", "Scale-up", "Studio"],
  },
  {
    num: "03",
    label: "The third thing you should know",
    heading: "I REFUSE TO STAY IN A SINGLE LANE",
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    body: [
      "I speak UX.",
      "I speak revenue.",
      "C-suite and design. Spreadsheets and prototypes.",
      "My language is intentional, built to move you forward.",
    ],
    sub: "Vision is nothing without execution. I build both.",
    cta: { label: "Start a project", href: "#contact" },
  },
];

export default function AboutStrip() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-heading-text", {
        opacity: 0, y: 40,
      }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const switchBlock = (idx: number) => {
    if (idx === active) return;
    gsap.to(contentRef.current, {
      opacity: 0, y: 12, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
      },
    });
  };

  const block = BLOCKS[active];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: "#f5f0e8",
        borderTop: "1px solid rgba(10,10,10,0.08)",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tab strip — like Ashley's "the first/second/third thing" */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
      }}>
        {BLOCKS.map((b, i) => (
          <button
            key={b.num}
            onClick={() => switchBlock(i)}
            style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: active === i ? "#0a0a0a" : "rgba(10,10,10,0.35)",
              background: "transparent",
              border: "none",
              borderRight: i < 2 ? "1px solid rgba(10,10,10,0.08)" : "none",
              borderBottom: active === i ? "2px solid #0a0a0a" : "2px solid transparent",
              padding: "1.25rem 2rem",
              cursor: "pointer",
              textAlign: "left",
              transition: "color 0.25s, border-bottom-color 0.25s",
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "calc(100dvh - 60px)",
        }}
      >
        {/* Left — number + heading + body */}
        <div style={{
          padding: "clamp(3rem,6vw,6rem) clamp(1.5rem,4vw,4rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid rgba(10,10,10,0.08)",
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(10,10,10,0.35)",
              marginBottom: "2rem",
            }}>
              {block.num}
            </p>
            <h2 className="about-heading-text" style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 900,
              fontSize: "clamp(1.6rem,3.5vw,2.8rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0a0a0a",
              marginBottom: "2.5rem",
              maxWidth: "32rem",
            }}>
              {block.heading}
            </h2>

            {/* Body lines — like Ashley's staggered statements */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2.5rem" }}>
              {block.body.map((line, i) => (
                <p key={i} style={{
                  fontFamily: "var(--font-unbounded)",
                  fontSize: "clamp(0.85rem,1.5vw,1.15rem)",
                  fontWeight: i < 2 ? 700 : 400,
                  fontStyle: i >= 2 ? "italic" : "normal",
                  color: i < 2 ? "#0a0a0a" : "rgba(10,10,10,0.55)",
                  lineHeight: 1.45,
                  letterSpacing: i < 2 ? "-0.02em" : "-0.01em",
                }}>
                  {line}
                </p>
              ))}
            </div>

            {/* Client names ticker (block 02) */}
            {block.clients && (
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}>
                {block.clients.map((c) => (
                  <span key={c} style={{
                    fontFamily: "var(--font-unbounded)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.8rem",
                    border: "1px solid rgba(10,10,10,0.15)",
                    borderRadius: "2px",
                    color: "rgba(10,10,10,0.5)",
                  }}>{c}</span>
                ))}
              </div>
            )}
          </div>

          <div>
            <p style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.7rem",
              color: "rgba(10,10,10,0.4)",
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
              lineHeight: 1.6,
            }}>
              {block.sub}
            </p>
            <a href={block.cta.href} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-unbounded)",
              fontWeight: 700,
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#0a0a0a",
              textDecoration: "none",
              borderBottom: "1px solid #0a0a0a",
              paddingBottom: "2px",
            }}>
              {block.cta.label} <span>↗</span>
            </a>
          </div>
        </div>

        {/* Right — photo grid 2×2 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "6px",
          padding: "6px",
        }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{
              background: i === 0 ? "#ddd9cf" : i === 1 ? "#ccc8be" : i === 2 ? "#c8c4ba" : "#d8d4ca",
              borderRadius: "4px",
              position: "relative",
              overflow: "hidden",
              gridRow: i === 0 ? "span 2" : "span 1",
            }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                opacity: 0.15,
              }}>
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                  <rect x="2" y="2" width="36" height="36" rx="2" stroke="#0a0a0a" strokeWidth="1.5"/>
                  <circle cx="13" cy="13" r="4" stroke="#0a0a0a" strokeWidth="1.5"/>
                  <path d="M2 28L12 18L20 26L26 20L38 32" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}