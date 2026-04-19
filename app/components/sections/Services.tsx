"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "UX Audit",
    blurb: "Heuristic review, flows, and a prioritized backlog so fixes ship fast.",
    index: "01",
  },
  {
    title: "Product Strategy",
    blurb: "Positioning, roadmap alignment, and bets that connect UX to revenue.",
    index: "02",
  },
  {
    title: "Conversion Optimization",
    blurb: "Funnel diagnostics, experiments, and landing systems that lift conversion.",
    index: "03",
  },
  {
    title: "B2B Sales Systems",
    blurb: "CRM, sequences, and handoffs so marketing and sales stay in sync.",
    index: "04",
  },
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

        gsap.fromTo(
          inner.querySelectorAll(".service-reveal"),
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );

        const bar = inner.querySelector(".service-accent-bar");
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: panel,
                start: "top 72%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (i > 0) {
          const prev = panels[i - 1];
          const prevInner = inners[i - 1];
          if (prevInner) {
            gsap.to(prevInner, {
              scale: 0.94,
              opacity: 0.45,
              filter: "brightness(0.65)",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "top top",
                scrub: 0.65,
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
                end: "top 55%",
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
    <section
      ref={rootRef}
      id="services"
      className="relative"
      style={{ background: "#080706", color: "#ede9e0", fontFamily: "var(--font-dm-sans)" }}
    >
      {SERVICES.map((item, i) => (
        <article
          key={item.title}
          className="service-panel sticky top-0 flex min-h-[100dvh] flex-col justify-center overflow-hidden border-t"
          style={{
            zIndex: i + 1,
            background: "#080706",
            borderColor: "rgba(237, 233, 224, 0.06)",
            paddingLeft: "4rem",
            paddingRight: "4rem",
          }}
        >
          <div
            className="service-bg-glow pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(200,245,66,0.12) 0%, transparent 55%)",
            }}
          />
          <div className="service-panel-inner relative mx-auto w-full max-w-4xl origin-top will-change-transform">
            <div
              className="service-accent-bar mb-10 h-px origin-left"
              style={{ background: "#c8f542", transform: "scaleX(0)" }}
            />
            <p
              className="service-reveal text-[0.72rem] font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-unbounded)", color: "#c8f542" }}
            >
              {item.index} — Services
            </p>
            <h2
              className="service-reveal mt-4 text-[clamp(2.25rem,5vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-unbounded)", color: "#ede9e0" }}
            >
              {item.title}
            </h2>
            <p
              className="service-reveal mt-8 max-w-xl text-lg leading-relaxed"
              style={{ color: "rgba(237, 233, 224, 0.72)" }}
            >
              {item.blurb}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
