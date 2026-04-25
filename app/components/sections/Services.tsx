"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "UX Audit & Conversion",
    tagline: "I audit flows and redesign them to increase conversion — not just visuals.",
    description: "Landing pages, checkout, onboarding — wherever your business is losing revenue. I identify friction points, redesign the flow, and measure the result.",
    tags: ["Strategy", "Research", "Figma"],
    keywords: ["UX Audit", "Funnel Analysis", "Landing Pages"],
  },
  {
    num: "02",
    title: "Product & Funnel Strategy",
    tagline: "I help teams prioritise features that drive revenue, not vanity metrics.",
    description: "Roadmap decisions backed by funnel data. Growth frameworks that connect product actions to revenue outcomes.",
    tags: ["Roadmap", "Metrics", "Growth"],
    keywords: ["Product Strategy", "OKRs", "Prioritisation"],
  },
  {
    num: "03",
    title: "B2B Sales & CRM Systems",
    tagline: "From pipeline setup to closing strategy.",
    description: "CRM setup, pipeline structure, deal flow — I rebuild how your sales process actually works. Whether outbound or inbound.",
    tags: ["Pipeline", "CRM", "Outbound"],
    keywords: ["Salesforce", "HubSpot", "Deal Flow"],
  },
  {
    num: "04",
    title: "Growth & Partnership",
    tagline: "Creativity connected to operations so ideas ship.",
    description: "I connect your creative direction with revenue systems — so launches convert, partnerships compound, and nothing dies in a deck.",
    tags: ["PR", "Process", "Launch"],
    keywords: ["GTM", "Partnerships", "Launch Strategy"],
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sv-row", {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
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
        padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,4rem)",
        borderTop: "1px solid rgba(238,241,230,0.06)",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: "4rem",
        borderBottom: "1px solid rgba(238,241,230,0.08)",
        paddingBottom: "2rem",
      }}>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#c8f542",
        }}>
          Services
        </p>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          color: "rgba(238,241,230,0.3)",
          textTransform: "uppercase",
        }}>
          What we do
        </p>
      </div>

      {/* Service rows — hover expand like Ashley */}
      <div>
        {SERVICES.map((sv, i) => (
          <div
            key={sv.num}
            className="sv-row"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderBottom: "1px solid rgba(238,241,230,0.07)",
              cursor: "default",
              transition: "background 0.3s",
              background: hovered === i ? "rgba(238,241,230,0.03)" : "transparent",
              borderRadius: "4px",
            }}
          >
            {/* Row header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr auto",
              alignItems: "center",
              gap: "2rem",
              padding: "1.75rem 1rem",
            }}>
              <span style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: hovered === i ? "#c8f542" : "rgba(238,241,230,0.25)",
                transition: "color 0.3s",
              }}>
                {sv.num}
              </span>

              <div>
                <h3 style={{
                  fontFamily: "var(--font-unbounded)",
                  fontWeight: 900,
                  fontSize: "clamp(1.4rem,3vw,2.4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: hovered === i ? "#eef1e6" : "rgba(238,241,230,0.75)",
                  transition: "color 0.3s",
                  margin: 0,
                }}>
                  {sv.title}
                </h3>
                {/* Tagline — shows on hover */}
                <div style={{
                  overflow: "hidden",
                  maxHeight: hovered === i ? "60px" : "0px",
                  opacity: hovered === i ? 1 : 0,
                  transition: "max-height 0.35s ease, opacity 0.3s ease",
                  marginTop: hovered === i ? "0.5rem" : 0,
                }}>
                  <p style={{
                    fontFamily: "var(--font-unbounded)",
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    color: "#c8f542",
                    lineHeight: 1.5,
                  }}>
                    {sv.tagline}
                  </p>
                </div>
              </div>

              {/* Keywords — show on hover */}
              <div style={{
                display: "flex",
                gap: "0.5rem",
                opacity: hovered === i ? 1 : 0,
                transform: hovered === i ? "translateX(0)" : "translateX(10px)",
                transition: "opacity 0.3s, transform 0.3s",
              }}>
                {sv.keywords.map((k) => (
                  <span key={k} style={{
                    fontFamily: "var(--font-unbounded)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.8rem",
                    border: "1px solid rgba(200,245,66,0.25)",
                    borderRadius: "2px",
                    color: "rgba(200,245,66,0.7)",
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
              maxHeight: hovered === i ? "200px" : "0px",
              opacity: hovered === i ? 1 : 0,
              transition: "max-height 0.4s ease, opacity 0.3s ease",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                gap: "2rem",
                padding: "0 1rem 1.75rem",
              }}>
                <div />
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "1rem",
                  color: "rgba(238,241,230,0.55)",
                  lineHeight: 1.75,
                  maxWidth: "40rem",
                }}>
                  {sv.description}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-end" }}>
                  {sv.tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: "var(--font-unbounded)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(238,241,230,0.3)",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ marginTop: "4rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "clamp(0.9rem,2vw,1.4rem)",
          fontWeight: 700,
          color: "rgba(238,241,230,0.5)",
          letterSpacing: "-0.02em",
          maxWidth: "32rem",
          lineHeight: 1.4,
        }}>
          Vision is nothing without execution.<br />
          <span style={{ color: "#eef1e6" }}>We build both.</span>
        </p>
        <a href="#contact" style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 700,
          fontSize: "0.62rem",
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
          whiteSpace: "nowrap",
        }}>
          Start a project <span>↗</span>
        </a>
      </div>
    </section>
  );
}