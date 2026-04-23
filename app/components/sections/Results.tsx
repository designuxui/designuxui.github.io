"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "25–40%", numeric: 40, prefix: "", suffix: "%",  label: "Conversion improvement", sub: "UX & funnel fixes" },
  { value: "+20%",   numeric: 20, prefix: "+", suffix: "%", label: "Faster deal cycles",     sub: "B2B sales optimization" },
  { value: "50+",    numeric: 50, prefix: "", suffix: "+",  label: "Projects delivered",     sub: "B2B & B2C" },
  { value: "5+",     numeric: 5,  prefix: "", suffix: "+",  label: "Years experience",       sub: "Sales, UX & product" },
  { value: "3×",     numeric: 3,  prefix: "", suffix: "×",  label: "Disciplines",            sub: "UX + Product + Growth" },
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade in
      gsap.from(".results-label", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      // Cards slide in
      gsap.from(".result-card", {
        opacity: 0, y: 50, stagger: 0.08, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      // Counter animation for each stat
      const counters = sectionRef.current?.querySelectorAll(".stat-number");
      counters?.forEach((el, i) => {
        const stat = STATS[i];
        const obj = { val: 0 };

        gsap.to(obj, {
          val: stat.numeric,
          duration: 1.8,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
          onUpdate() {
            const rounded = Math.round(obj.val);
            // Special case for 25-40%
            if (stat.prefix === "" && stat.suffix === "%" && stat.numeric === 40) {
              const low = Math.round((rounded / 40) * 25);
              el.textContent = `${low}–${rounded}%`;
            } else {
              el.textContent = `${stat.prefix}${rounded}${stat.suffix}`;
            }
          },
          onComplete() {
            el.textContent = stat.value;
          },
        });
      });
    }, sectionRef);

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
        style={{
          background: "radial-gradient(ellipse 70% 50% at 10% 50%, rgba(200,245,66,0.07) 0%, transparent 55%)",
        }}
      />
      <p
        className="results-label"
        style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--acc)",
          marginBottom: "4rem",
        }}
      >
        Results
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1px",
          background: "rgba(238,241,230,0.06)",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="result-card"
            style={{
              background: "#0a0a0a",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              transition: "background 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(200,245,66,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0a0a0a")}
          >
            <span
              className="stat-number"
              style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--acc)",
                display: "block",
                minWidth: "4ch",
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#eef1e6",
                letterSpacing: "-0.01em",
                marginTop: "0.5rem",
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "rgba(238,241,230,0.45)",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}