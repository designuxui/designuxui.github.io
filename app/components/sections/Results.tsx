"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { batchReveal } from "../ui/ScrollBatch";
import AnimatedText from "../ui/AnimatedText";
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "25–40%", from: 25, to: 40, format: (n: number) => `${Math.round(n)}%`,   label: "Conversion improvement", sub: "UX & funnel fixes" },
  { value: "+20%",   from: 0,  to: 20, format: (n: number) => `+${Math.round(n)}%`,  label: "Faster deal cycles",     sub: "B2B sales optimization" },
  { value: "50+",    from: 0,  to: 50, format: (n: number) => `${Math.round(n)}+`,   label: "Projects delivered",     sub: "B2B & B2C" },
  { value: "5+",     from: 0,  to: 5,  format: (n: number) => `${Math.round(n)}+`,   label: "Years experience",       sub: "Sales, UX & product" },
  { value: "3×",     from: 0,  to: 3,  format: (n: number) => `${Math.round(n)}×`,   label: "Disciplines",            sub: "UX + Product + Growth" },
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      batchReveal(section, {
        selector: ".results-label",
        start: "top 78%",
        distance: 20,
        duration: 0.6,
        stagger: 0.02,
        batchMax: 1,
      });

      batchReveal(section, {
        selector: ".result-card",
        start: "top 70%",
        distance: 50,
        duration: 0.7,
        stagger: 0.08,
        batchMax: 5,
      });

      // Counters
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => {
          if (triggered.current) return;
          triggered.current = true;

          const els = section.querySelectorAll<HTMLElement>(".stat-number");
          els.forEach((el, i) => {
            const stat = STATS[i];
            const obj = { val: stat.from };
            gsap.to(obj, {
              val: stat.to,
              duration: 1.8,
              delay: i * 0.1,
              ease: "power2.out",
              onUpdate() {
                el.textContent = stat.format(obj.val);
              },
              onComplete() {
                el.textContent = stat.value;
              },
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative overflow-hidden"
      style={{
        background: "#0a0a0a",
        color: "#eef1e6",
        padding: "7rem 4rem",
        borderTop: "1px solid rgba(238,241,230,0.06)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 10% 50%, rgba(200,245,66,0.07) 0%, transparent 55%)" }}
      />

      <p
        className="results-label"
        style={{
          fontFamily: "var(--font-unbounded)", fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--acc)", marginBottom: "4rem",
        }}
      >
        Results
      </p>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
        gap: "1px", background: "rgba(238,241,230,0.06)",
      }}>
        {STATS.map((s) => (
          <div
            key={s.label}
            className="result-card"
            style={{
              background: "#0a0a0a", padding: "2.5rem 2rem",
              display: "flex", flexDirection: "column", gap: "0.5rem", transition: "background 0.25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,245,66,0.04)")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
          >
            <span
              className="stat-number"
              style={{
                fontFamily: "var(--font-unbounded)", fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1,
                letterSpacing: "-0.04em", color: "var(--acc)", display: "block",
              }}
            >
              {s.value}
            </span>
            <span style={{
              fontFamily: "var(--font-unbounded)", fontSize: "0.75rem", fontWeight: 700,
              color: "#eef1e6", letterSpacing: "-0.01em", marginTop: "0.5rem",
            }}>
              {s.label}
            </span>
            <span style={{ fontSize: "0.72rem", color: "rgba(238,241,230,0.45)", fontFamily: "var(--font-dm-sans)" }}>
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}