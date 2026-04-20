"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "UX Audit & Conversion Optimization",
    hook: "I audit flows and redesign them to increase conversion — not just visuals.",
    desc: "Landing pages, checkout, onboarding — wherever your business is losing revenue. I identify friction points, redesign the flow, and measure the result. Every recommendation is backed by heuristic analysis and funnel data.",
    tags: ["UX Audit", "Figma", "Landing Pages", "Funnel Analysis"],
    dark: true,
  },
  {
    num: "02",
    title: "Product & Funnel Strategy",
    hook: "I help teams prioritise features that drive revenue, not vanity metrics.",
    desc: "Roadmap decisions backed by funnel data. Growth frameworks that connect product actions to revenue outcomes. I work with founders and PMs to cut scope noise and focus on what actually converts users to paying customers.",
    tags: ["Roadmap", "Metrics", "Growth Frameworks"],
    dark: false,
  },
  {
    num: "03",
    title: "B2B Sales & CRM Systems",
    hook: "From pipeline setup to closing strategy.",
    desc: "CRM setup, pipeline structure, deal flow — I rebuild how your sales process actually works. Whether you're running outbound or inbound, I align your CRM with how your buyers actually buy, not how the software defaults.",
    tags: ["Salesforce", "Pipeline", "Deal Flow", "CRM"],
    dark: true,
  },
];

export default function Services() {
  useEffect(() => {
    SERVICES.forEach((s, i) => {
      const panel = document.querySelector(`.service-panel-${i}`);
      if (!panel) return;
      gsap.from(`.service-panel-${i} .sv-content`, {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: panel, start: "top 60%", once: true },
      });
    });
  }, []);

  return (
    <section id="services" className="relative">
      {SERVICES.map((s, i) => (
        <article key={s.num}
          className={`service-panel-${i} sticky top-0 flex min-h-[100dvh] flex-col justify-center overflow-hidden`}
          style={{
            zIndex: i + 1,
            background: s.dark ? "#080807" : "#f2efe8",
            color: s.dark ? "#eef1e6" : "#0a0a0a",
            borderTop: `1px solid ${s.dark ? "rgba(238,241,230,0.06)" : "rgba(10,10,10,0.1)"}`,
            padding: "0 4rem",
          }}>
          <div className="pointer-events-none absolute inset-0"
            style={{ background: s.dark
              ? "radial-gradient(ellipse 60% 45% at 20% 30%, rgba(200,245,66,0.07) 0%, transparent 55%)"
              : "radial-gradient(ellipse 60% 45% at 80% 70%, rgba(74,122,0,0.06) 0%, transparent 55%)" }} />

          <div className="sv-content relative mx-auto w-full max-w-4xl">
            <div style={{ height: 1, background: s.dark ? "#c8f542" : "#3d6a00", marginBottom: "2rem", width: "100%" }} />
            <p style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: s.dark ? "#c8f542" : "#3d6a00", marginBottom: "1rem" }}>
              {s.num} — Services
            </p>
            <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 900, fontSize: "clamp(2rem, 4.5vw, 3.8rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: s.dark ? "#eef1e6" : "#0a0a0a", marginBottom: "1.5rem" }}>
              {s.title}
            </h2>
            <p style={{ fontSize: "1.15rem", fontWeight: 600, color: s.dark ? "#c8f542" : "#3d6a00", fontStyle: "italic", marginBottom: "1.2rem", lineHeight: 1.45 }}>
              {s.hook}
            </p>
            <p style={{ fontSize: "1rem", color: s.dark ? "rgba(238,241,230,0.7)" : "rgba(10,10,10,0.65)", lineHeight: 1.8, maxWidth: "42rem", marginBottom: "2rem" }}>
              {s.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {s.tags.map(tag => (
                <span key={tag} style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.3rem 0.9rem", border: `1px solid ${s.dark ? "rgba(238,241,230,0.15)" : "rgba(10,10,10,0.15)"}`, borderRadius: 2, color: s.dark ? "rgba(238,241,230,0.6)" : "rgba(10,10,10,0.55)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
