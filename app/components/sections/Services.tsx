"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG = ["#080706", "#0d0c0a", "#111008", "#141210"] as const;

const SERVICES = [
  { title: "UX Audit", blurb: "Heuristic review, flows, and a prioritized backlog so fixes ship fast.", index: "01" },
  { title: "Product Strategy", blurb: "Positioning, roadmap alignment, and bets that connect UX to revenue.", index: "02" },
  { title: "Conversion Optimization", blurb: "Funnel diagnostics, experiments, and landing systems that lift conversion.", index: "03" },
  { title: "B2B Sales Systems", blurb: "CRM, sequences, and handoffs so marketing and sales stay in sync.", index: "04" },
] as const;

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");
      const inners = gsap.utils.toArray<HTMLElement>(".service-panel-inner");

      panels.forEach((panel, i) => {
        const inner = inners[i];
        if (!inner) return;

        const bar = inner.querySelector(".service-accent-bar");
        const num = inner.querySelector(".service-num");
        const title = inner.querySelector(".service-title");
        const desc = inner.querySelector(".service-desc");

        if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        if (num) gsap.set(num, { opacity: 0, y: 28 });
        if (title) gsap.set(title, { opacity: 0, x: -56, skewX: -4 });
        if (desc) gsap.set(desc, { opacity: 0, y: 32 });

        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
        if (bar) enterTl.to(bar, { scaleX: 1, duration: 0.95, ease: "power2.inOut" });
        if (num) enterTl.to(num, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.55");
        if (title) enterTl.to(title, { opacity: 1, x: 0, skewX: 0, duration: 0.75, ease: "power3.out" }, "-=0.45");
        if (desc) enterTl.to(desc, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.4");

        if (i > 0) {
          const prev = panels[i - 1];
          const prevInner = inners[i - 1];
          if (prevInner) {
            gsap.to(prevInner, {
              scale: 0.95,
              filter: "brightness(0.55)",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "top top",
                scrub: 0.55,
              },
            });
          }
          const glow = prev.querySelector(".service-bg-glow");
          if (glow) {
            gsap.to(glow, {
              opacity: 0,
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "top 50%",
                scrub: true,
              },
            });
          }
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="services" className="relative" style={{ color: "var(--fg)", fontFamily: "var(--font-dm-sans)" }}>
      {SERVICES.map((item, i) => (
        <article
          key={item.title}
          className="service-panel sticky top-0 flex min-h-[100dvh] flex-col justify-center overflow-hidden border-t"
          style={{
            zIndex: i + 1,
            background: BG[i],
            borderColor: "rgba(237, 233, 224, 0.06)",
            paddingLeft: "4rem",
            paddingRight: "4rem",
          }}
        >
          <div
            className="service-bg-glow pointer-events-none absolute inset-0 opacity-50"
            style={{
              background: "radial-gradient(ellipse 65% 50% at 22% 28%, rgba(200,245,66,0.14) 0%, transparent 55%)",
            }}
          />
          <div className="service-panel-inner relative mx-auto w-full max-w-4xl origin-center will-change-transform">
            <div className="service-accent-bar mb-8 h-px w-full" style={{ background: "var(--acc)" }} />
            <p
              className="service-num text-[0.72rem] font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-unbounded)", color: "var(--acc)" }}
            >
              {item.index} — Services
            </p>
            <h2
              className="service-title mt-4 text-[clamp(2.25rem,5vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-unbounded)", color: "var(--fg)" }}
            >
              {item.title}
            </h2>
            <p className="service-desc mt-8 max-w-xl text-lg leading-relaxed" style={{ color: "var(--dim)" }}>
              {item.blurb}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
