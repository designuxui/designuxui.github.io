"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CASES = [
  {
    num: "01",
    metric: "+40%",
    title: "SaaS Onboarding Redesign",
    client: "B2B Analytics Platform",
    year: "2024",
    description: "Streamlined the entire activation flow — from signup to first value moment. Removed 6 friction points, rewrote onboarding copy, redesigned the empty states.",
    tags: ["UX Audit", "Figma", "A/B Testing", "Product"],
    bg: "#1a1a1a",
    accent: "#c8f542",
  },
  {
    num: "02",
    metric: "3×",
    title: "E-commerce Funnel Overhaul",
    client: "Fashion & Lifestyle Brand",
    year: "2024",
    description: "Category navigation, product page redesign and checkout experiments over two quarters. Three times higher conversion on mobile.",
    tags: ["Conversion", "Mobile UX", "Checkout", "Analytics"],
    bg: "#f2efe8",
    accent: "#0a0a0a",
  },
  {
    num: "03",
    metric: "2×",
    title: "B2B Pipeline Rebuild",
    client: "SaaS Sales Team",
    year: "2023",
    description: "CRM hygiene, outbound sequences, and marketing-to-sales alignment. Deal cycle cut by 20%, pipeline velocity doubled.",
    tags: ["CRM", "Sales Strategy", "B2B", "HubSpot"],
    bg: "#0a0a0a",
    accent: "#c8f542",
  },
];

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".case-item").forEach((el) => {
        gsap.fromTo(el, {
          opacity: 0, y: 50,
        }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cases" style={{ background: "#080808" }}>
      {/* Header */}
      <div style={{
        padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,4vw,4rem) 0",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(238,241,230,0.06)",
        paddingBottom: "2rem",
        marginBottom: "0",
      }}>
        <div>
          <p style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c8f542",
            marginBottom: "0.75rem",
          }}>Selected work</p>
          <h2 style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 900,
            fontSize: "clamp(2rem,5vw,4rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#eef1e6",
            margin: 0,
          }}>
            Case studies
          </h2>
        </div>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.6rem",
          color: "rgba(238,241,230,0.25)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          paddingBottom: "0.5rem",
        }}>
          3 projects
        </p>
      </div>

      {/* Cases — full width rows like Ashley's work grid */}
      {CASES.map((c) => (
        <article
          key={c.num}
          className="case-item"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "70vh",
            borderBottom: "1px solid rgba(238,241,230,0.06)",
          }}
        >
          {/* Left — photo placeholder */}
          <div style={{
            background: c.bg,
            position: "relative",
            overflow: "hidden",
            minHeight: "50vw",
          }}>
            {/* Gradient overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${c.accent}18 0%, transparent 70%)`,
            }} />
            {/* Placeholder image icon */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}>
              <svg width="48" height="48" viewBox="0 0 40 40" fill="none" opacity={0.2}>
                <rect x="2" y="2" width="36" height="36" rx="2" stroke={c.accent} strokeWidth="1.5"/>
                <circle cx="13" cy="13" r="4" stroke={c.accent} strokeWidth="1.5"/>
                <path d="M2 28L12 18L20 26L26 20L38 32" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.5rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: c.accent,
                opacity: 0.4,
              }}>
                Add photo
              </span>
            </div>
            {/* Case number */}
            <div style={{
              position: "absolute",
              top: "1.5rem",
              left: "1.5rem",
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              color: c.accent,
              opacity: 0.5,
            }}>
              {c.num}
            </div>
          </div>

          {/* Right — content */}
          <div style={{
            padding: "clamp(2.5rem,5vw,5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#080808",
            borderLeft: "1px solid rgba(238,241,230,0.06)",
          }}>
            <div>
              {/* Metric */}
              <p style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 900,
                fontSize: "clamp(3.5rem,8vw,6rem)",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: c.accent,
                margin: "0 0 1.5rem",
              }}>
                {c.metric}
              </p>

              {/* Title */}
              <h3 style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 900,
                fontSize: "clamp(1.4rem,2.5vw,2rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#eef1e6",
                marginBottom: "0.5rem",
              }}>
                {c.title}
              </h3>

              {/* Client + year */}
              <p style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(238,241,230,0.35)",
                marginBottom: "2rem",
              }}>
                {c.client} · {c.year}
              </p>

              {/* Description */}
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "1rem",
                color: "rgba(238,241,230,0.6)",
                lineHeight: 1.75,
                maxWidth: "32rem",
                marginBottom: "2rem",
              }}>
                {c.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {c.tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: "var(--font-unbounded)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.8rem",
                    border: "1px solid rgba(238,241,230,0.12)",
                    borderRadius: "2px",
                    color: "rgba(238,241,230,0.45)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: "2.5rem" }}>
              <span style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(238,241,230,0.25)",
              }}>
                Full case study coming soon ↗
              </span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}