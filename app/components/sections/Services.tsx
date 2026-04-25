"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "UX & Conversion",
    sub: "We find your friction points. Then redesign the flow to convert.",
    keywords: ["Strategy", "Narrative", "Direction"],
    description: "Landing pages, checkout, onboarding — wherever your business is losing revenue. We identify friction, redesign the flow, and measure the result.",
  },
  {
    num: "02",
    title: "Product & Funnel",
    sub: "We tell stories with data that connect and perform commercially.",
    keywords: ["Concept", "Roadmap", "Storytelling"],
    description: "Roadmap decisions backed by funnel data. Growth frameworks that connect product actions to revenue outcomes. Prioritisation that actually ships.",
  },
  {
    num: "03",
    title: "B2B Sales Systems",
    sub: "We turn spaces — pipelines, CRMs — into experiences you can feel.",
    keywords: ["Pipeline", "CRM", "Outbound"],
    description: "CRM setup, deal flow structure, outbound sequences. We rebuild how your sales process actually works — whether inbound or outbound.",
  },
  {
    num: "04",
    title: "Growth & Partnership",
    sub: "We connect creativity with operations so ideas ship and don't die in a deck.",
    keywords: ["PR", "Process", "Launch"],
    description: "GTM strategy, partnership frameworks, launch systems. We make sure your creative ambition is backed by the operational structure to execute.",
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sv-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        background: "#0a0a0a",
        color: "#eef1e6",
        padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)",
        borderTop: "1px solid rgba(238,241,230,0.05)",
      }}
    >
      {/* Header — like Ashley's "We Do / Campaigns. Branding. Film." */}
      <div style={{ marginBottom: "3rem", borderBottom: "1px solid rgba(238,241,230,0.07)", paddingBottom: "2.5rem" }}>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#c8f542",
          marginBottom: "1rem",
        }}>
          We do
        </p>
        <h2 style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 900,
          fontSize: "clamp(2rem,5vw,4.5rem)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "#eef1e6",
          margin: 0,
        }}>
          UX. Product. Sales.<br />
          <span style={{ color: "rgba(238,241,230,0.3)" }}>And everything it takes to make them grow.</span>
        </h2>
      </div>

      {/* Service rows */}
      <div>
        {SERVICES.map((sv, i) => (
          <div
            key={sv.num}
            className="sv-item"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderBottom: "1px solid rgba(238,241,230,0.07)",
              transition: "background 0.3s",
              background: hovered === i ? "rgba(238,241,230,0.02)" : "transparent",
            }}
          >
            {/* Row main */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "5rem 1fr auto",
              alignItems: "center",
              gap: "2rem",
              padding: "1.6rem 1rem",
            }}>
              <span style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: hovered === i ? "#c8f542" : "rgba(238,241,230,0.2)",
                transition: "color 0.3s",
              }}>
                {sv.num}
              </span>

              <div>
                <h3 style={{
                  fontFamily: "var(--font-unbounded)",
                  fontWeight: 900,
                  fontSize: "clamp(1.5rem,3.2vw,2.8rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: hovered === i ? "#eef1e6" : "rgba(238,241,230,0.7)",
                  transition: "color 0.3s",
                  margin: 0,
                }}>
                  {sv.title}
                </h3>
                {/* Sub-tagline on hover */}
                <div style={{
                  overflow: "hidden",
                  maxHeight: hovered === i ? "3rem" : "0",
                  opacity: hovered === i ? 1 : 0,
                  transition: "max-height 0.35s ease, opacity 0.3s",
                  marginTop: hovered === i ? "0.4rem" : 0,
                }}>
                  <p style={{
                    fontFamily: "var(--font-unbounded)",
                    fontSize: "0.72rem",
                    fontStyle: "italic",
                    color: "#c8f542",
                    lineHeight: 1.5,
                  }}>
                    {sv.sub}
                  </p>
                </div>
              </div>

              {/* Keywords — like Ashley's "Strategy / Narrative / Direction" */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                alignItems: "flex-end",
                opacity: hovered === i ? 1 : 0,
                transform: hovered === i ? "translateX(0)" : "translateX(12px)",
                transition: "opacity 0.3s, transform 0.3s",
              }}>
                {sv.keywords.map((k) => (
                  <span key={k} style={{
                    fontFamily: "var(--font-unbounded)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(200,245,66,0.6)",
                    whiteSpace: "nowrap",
                  }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Expanded description */}
            <div style={{
              overflow: "hidden",
              maxHeight: hovered === i ? "120px" : "0",
              opacity: hovered === i ? 1 : 0,
              transition: "max-height 0.4s ease, opacity 0.3s",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "5rem 1fr",
                gap: "2rem",
                padding: "0 1rem 1.6rem",
              }}>
                <div />
                <p style={{
                  fontFamily: "var(--font-unbounded)",
                  fontSize: "0.78rem",
                  color: "rgba(238,241,230,0.45)",
                  lineHeight: 1.75,
                  maxWidth: "38rem",
                  letterSpacing: "-0.01em",
                }}>
                  {sv.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA link — like Ashley's "Our Services" */}
      <div style={{ marginTop: "3rem", display: "flex", justifyContent: "flex-end" }}>
        <a href="#contact" style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 700,
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "0.9rem 2rem",
          background: "#c8f542",
          color: "#0a0a0a",
          borderRadius: 100,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          Start a project ↗
        </a>
      </div>
    </section>
  );
}