"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#c8f542";

const STATS = [
  { end: 40, prefix: "+", suffix: "%", label: "conversion rate" },
  { end: 3, prefix: "", suffix: "x", label: "revenue growth" },
  { end: 50, prefix: "", suffix: "+", label: "projects" },
  { end: 8, prefix: "", suffix: "", label: "years experience" },
] as const;

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      STATS.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const state = { value: 0 };
        tl.to(
          state,
          {
            value: stat.end,
            duration: 1.35,
            ease: "power2.out",
            onUpdate: () => {
              const n = Math.round(state.value);
              el.textContent = `${stat.prefix}${n}${stat.suffix}`;
            },
          },
          i * 0.12,
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const font: React.CSSProperties = {
    fontFamily: "var(--font-unbounded)",
  };

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative py-20 lg:py-28"
      style={{
        background: "#080706",
        borderTop: "1px solid rgba(237, 233, 224, 0.09)",
        paddingLeft: "4rem",
        paddingRight: "4rem",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-12 lg:mb-16"
          style={{
            ...font,
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          Results
        </p>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col gap-3">
              <span
                ref={(node) => {
                  numberRefs.current[i] = node;
                }}
                style={{
                  ...font,
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: ACCENT,
                  fontVariantNumeric: "tabular-nums",
                }}
                aria-label={`${stat.prefix}${stat.end}${stat.suffix} ${stat.label}`}
              >
                {stat.prefix}0{stat.suffix}
              </span>
              <span
                style={{
                  ...font,
                  fontWeight: 300,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.01em",
                  color: "rgba(237, 233, 224, 0.75)",
                  maxWidth: "14rem",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
