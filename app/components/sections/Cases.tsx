"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CASES = [
  {
    name: "SaaS onboarding",
    metric: "+40% conversion",
    detail: "Streamlined signup and activation for a B2B analytics product.",
  },
  {
    name: "E‑commerce funnel",
    metric: "3x revenue",
    detail: "Category navigation and checkout experiments over two quarters.",
  },
  {
    name: "B2B pipeline",
    metric: "2x qualified demos",
    detail: "CRM hygiene, sequences, and marketing-to-sales alignment.",
  },
] as const;

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const ctx = gsap.context(() => {
      const scrollAmount = () => Math.max(track.scrollWidth - window.innerWidth + 128, 1);

      gsap.to(track, {
        x: () => -scrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollAmount()}`,
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cases"
      style={{
        background: "#080706",
        color: "#ede9e0",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <div
        ref={pinRef}
        className="flex h-[100dvh] flex-col justify-center overflow-hidden"
        style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
      >
        <header className="mb-10 shrink-0">
          <p
            className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: "var(--font-unbounded)", color: "#c8f542" }}
          >
            Selected work
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-tight tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-unbounded)", color: "#ede9e0" }}
          >
            Case studies
          </h2>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden">
          <div ref={trackRef} className="flex h-full items-stretch gap-8 pr-16 will-change-transform">
            {CASES.map((c) => (
              <article
                key={c.name}
                className="case-card flex shrink-0 flex-col justify-between border p-8"
                style={{
                  width: "min(78vw, 420px)",
                  borderColor: "rgba(237, 233, 224, 0.09)",
                  background: "rgba(237, 233, 224, 0.03)",
                  borderRadius: "4px",
                }}
              >
                <div>
                  <p
                    className="mb-3 text-3xl font-black tracking-tight"
                    style={{ fontFamily: "var(--font-unbounded)", color: "#c8f542" }}
                  >
                    {c.metric}
                  </p>
                  <h3
                    className="mb-3 text-lg font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-unbounded)", color: "#ede9e0" }}
                  >
                    {c.name}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed" style={{ color: "rgba(237, 233, 224, 0.72)" }}>
                    {c.detail}
                  </p>
                </div>
                <span
                  className="mt-8 text-[0.62rem] uppercase tracking-[0.14em]"
                  style={{ fontFamily: "var(--font-unbounded)", color: "#c8f542" }}
                >
                  Scroll →
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
