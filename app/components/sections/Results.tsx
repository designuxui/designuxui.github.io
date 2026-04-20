"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { prefix: "+", value: 40, suffix: "%", label: "Conversion lift" },
  { prefix: "",  value: 3,  suffix: "x", label: "Revenue growth" },
  { prefix: "",  value: 50, suffix: "+", label: "Projects shipped" },
  { prefix: "",  value: 8,  suffix: "yr", label: "Experience" },
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const numsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".results-heading", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      gsap.from(".result-card", {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          numsRef.current.forEach((el, i) => {
            if (!el) return;
            const stat = STATS[i];
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 1.6,
              ease: "power2.out",
              delay: i * 0.12,
              onUpdate() {
                el.textContent = stat.prefix + Math.round(obj.val) + stat.suffix;
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="results" className="relative overflow-hidden"
      style={{ background: "#f5f2eb", color: "#0a0a0a", padding: "7rem 4rem", borderTop: "1px solid rgba(10,10,10,0.08)" }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 20% 60%, rgba(200,245,66,0.08) 0%, transparent 50%)" }} />
      <p className="results-heading" style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#4a7a00", marginBottom: "4rem" }}>
        Results
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(10,10,10,0.1)", border: "1px solid rgba(10,10,10,0.1)" }}>
        {STATS.map((stat, i) => (
          <div key={stat.label} className="result-card"
            style={{ background: "#f5f2eb", padding: "3rem 2.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <span ref={el => { numsRef.current[i] = el; }}
              style={{ fontFamily: "var(--font-unbounded)", fontWeight: 900, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#0a0a0a" }}>
              {stat.prefix}0{stat.suffix}
            </span>
            <span style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(10,10,10,0.5)" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
