"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BLOCKS = [
  {
    num: "01",
    tabLabel: "the first thing you should know about us",
    heading: "WE GREW THIS PRACTICE THROUGH WORK, NOT THROUGH MARKETING",
    statements: [
      { text: "Every client came from a referral.", bold: true, italic: false },
      { text: "Because results speak.", bold: true, italic: false },
      { text: "No deck. No pitch. Just outcomes that compounded.", bold: false, italic: true },
      { text: "What's worth sharing now…is the POV the real work built.", bold: false, italic: true },
    ],
    body: "UX strategy, product thinking and revenue systems, to us, are hands-on. It means understanding what moves a business forward: data, systems, user behaviour — and the numbers behind all of it.",
    cta: { label: "see our work", href: "#cases" },
    photos: [1, 2, 3, 4],
  },
  {
    num: "02",
    tabLabel: "the second thing you should know about us",
    heading: "MOST OF OUR WORK COMES FROM ONE WORD: TRUSTED",
    statements: [
      { text: "Project to project.", bold: true, italic: false },
      { text: "Referral after referral.", bold: true, italic: false },
      { text: "We meet teams where they are — and move fast.", bold: false, italic: true },
      { text: "Collaborative, transparent, ambitious.", bold: false, italic: true },
    ],
    body: "That's how a consultant who stayed off the grid found success: through trust, consistency, and shared goals. One person. No agency overhead. No handoff delays.",
    cta: { label: "about us", href: "#contact" },
    photos: [5, 6, 7, 8],
    clients: ["SaaS Platform", "Fintech Co.", "eCommerce", "B2B Agency", "Health Startup", "Scale-up", "Creative Studio", "PropTech", "EdTech", "MarTech"],
  },
  {
    num: "03",
    tabLabel: "the third thing you should know about us",
    heading: "WE REFUSE TO STAY IN A SINGLE LANE",
    statements: [
      { text: "We speak UX.", bold: true, italic: false },
      { text: "We speak revenue.", bold: true, italic: false },
      { text: "C-suite and design. Spreadsheets and prototypes.", bold: false, italic: true },
      { text: "Our language is intentional, built to move clients forward.", bold: false, italic: true },
    ],
    body: "Vision is nothing without execution. We build both. We create UX systems, product strategies, and the revenue frameworks that make them perform.",
    cta: { label: "our services", href: "#services" },
    photos: [9, 10, 11, 12],
  },
];

const PHOTO_COLORS = [
  "#d4cfc6", "#c8c3ba", "#ddd9cf", "#cdc9bf",
  "#d8d4ca", "#c4bfb5", "#e0dbd0", "#ccc8be",
  "#d0ccc2", "#c6c2b8", "#dad6cc", "#cac6bc",
];

export default function AboutStrip() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tab label scrolling animation — like Ashley's marquee tab text
      const tabItems = tabsRef.current?.querySelectorAll(".tab-btn");
      tabItems?.forEach((btn) => {
        const inner = btn.querySelector(".tab-inner");
        if (!inner) return;
        const w = (inner as HTMLElement).scrollWidth / 2;
        gsap.to(inner, {
          x: -w,
          duration: 14,
          ease: "none",
          repeat: -1,
          paused: false,
        });
      });

      // Scroll-triggered entrance
      gsap.fromTo(".about-num",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const switchBlock = (idx: number) => {
    if (idx === active) return;
    if (!contentRef.current) return;
    gsap.to(contentRef.current, {
      opacity: 0, y: 10, duration: 0.18, ease: "power2.in",
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
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
      }}
    >
      {/* Tabs strip — scrolling text like Ashley */}
      <div
        ref={tabsRef}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderBottom: "1px solid rgba(10,10,10,0.08)",
          overflow: "hidden",
        }}
      >
        {BLOCKS.map((b, i) => (
          <button
            key={b.num}
            className="tab-btn"
            onClick={() => switchBlock(i)}
            style={{
              position: "relative",
              overflow: "hidden",
              background: "transparent",
              border: "none",
              borderRight: i < 2 ? "1px solid rgba(10,10,10,0.08)" : "none",
              borderBottom: active === i ? "2px solid #0a0a0a" : "2px solid transparent",
              padding: "1rem 0",
              cursor: "pointer",
              height: "3rem",
              transition: "border-bottom-color 0.25s",
            }}
          >
            {/* Scrolling label — like Ashley's tab marquee */}
            <span
              className="tab-inner"
              style={{
                display: "inline-flex",
                gap: "4rem",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                textTransform: "lowercase",
                color: active === i ? "#0a0a0a" : "rgba(10,10,10,0.35)",
                transition: "color 0.25s",
              }}
            >
              {/* Duplicate for seamless loop */}
              {[b.tabLabel, b.tabLabel, b.tabLabel, b.tabLabel].map((l, j) => (
                <span key={j}>{l}</span>
              ))}
            </span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div
        ref={contentRef}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100dvh",
        }}
      >
        {/* Left — number + heading + statements + body + CTA */}
        <div style={{
          padding: "clamp(3rem,6vw,6rem) clamp(2rem,5vw,5rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid rgba(10,10,10,0.08)",
        }}>
          <div>
            {/* Number */}
            <p className="about-num" style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "rgba(10,10,10,0.3)",
              marginBottom: "2.5rem",
            }}>
              {block.num}
            </p>

            {/* Main heading */}
            <h2 style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 900,
              fontSize: "clamp(1.5rem,3.2vw,2.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0a0a0a",
              marginBottom: "2.5rem",
              maxWidth: "30rem",
            }}>
              {block.heading}
            </h2>

            {/* Statement lines — like Ashley's bold/italic alternation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2rem" }}>
              {block.statements.map((s, i) => (
                <p key={i} style={{
                  fontFamily: "var(--font-unbounded)",
                  fontSize: "clamp(0.9rem,1.6vw,1.2rem)",
                  fontWeight: s.bold ? 700 : 400,
                  fontStyle: s.italic ? "italic" : "normal",
                  color: s.bold ? "#0a0a0a" : "rgba(10,10,10,0.5)",
                  lineHeight: 1.4,
                  letterSpacing: s.bold ? "-0.02em" : "-0.01em",
                }}>
                  {s.text}
                </p>
              ))}
            </div>

            {/* Body paragraph */}
            <p style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.72rem",
              color: "rgba(10,10,10,0.45)",
              lineHeight: 1.7,
              maxWidth: "32rem",
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}>
              {block.body}
            </p>

            {/* Client name tags — block 02 only */}
            {block.clients && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
                {block.clients.map((c) => (
                  <span key={c} style={{
                    fontFamily: "var(--font-unbounded)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.7rem",
                    border: "1px solid rgba(10,10,10,0.15)",
                    borderRadius: "2px",
                    color: "rgba(10,10,10,0.45)",
                  }}>{c}</span>
                ))}
              </div>
            )}
          </div>

          {/* CTA link — like Ashley's underline link */}
          <a href={block.cta.href} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-unbounded)",
            fontWeight: 700,
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            textTransform: "lowercase",
            color: "#0a0a0a",
            textDecoration: "none",
            borderBottom: "1px solid #0a0a0a",
            paddingBottom: "2px",
            width: "fit-content",
          }}>
            {block.cta.label} ↗
          </a>
        </div>

        {/* Right — 2×2 photo grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "6px",
          padding: "6px",
        }}>
          {block.photos.map((pid, i) => (
            <div key={pid} style={{
              background: PHOTO_COLORS[pid - 1] ?? "#d4cfc6",
              borderRadius: "3px",
              position: "relative",
              overflow: "hidden",
              // First photo tall — like Ashley
              gridRow: i === 0 ? "span 2" : "span 1",
            }}>
              {/* Replace with <img> when real photos are ready */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                opacity: 0.12,
              }}>
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                  <rect x="2" y="2" width="36" height="36" rx="2" stroke="#0a0a0a" strokeWidth="1.5"/>
                  <circle cx="13" cy="13" r="4" stroke="#0a0a0a" strokeWidth="1.5"/>
                  <path d="M2 28L12 18L20 26L26 20L38 32" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              {/* Photo number label */}
              <span style={{
                position: "absolute",
                bottom: "0.6rem",
                left: "0.75rem",
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.45rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.3)",
              }}>
                Add photo {pid}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}