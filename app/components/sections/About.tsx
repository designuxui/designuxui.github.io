"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Years", value: "8+" },
  { label: "Projects", value: "50+" },
  { label: "Focus", value: "UX · GTM" },
  { label: "Mode", value: "Remote" },
] as const;

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-col-left > *",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".about-col-right",
        { y: 56, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const heading: React.CSSProperties = { fontFamily: "var(--font-unbounded)" };

  return (
    <section
      ref={rootRef}
      id="about"
      style={{
        padding: "7rem 4rem",
        background: "#080706",
        color: "#ede9e0",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <p
        className="mb-12"
        style={{
          ...heading,
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#c8f542",
        }}
      >
        About
      </p>
      <div className="grid max-w-[72rem] grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-20" style={{ margin: "0 auto" }}>
        <div className="about-col-left">
          <h2
            className="opacity-0"
            style={{
              ...heading,
              fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            One bridge between design and growth
          </h2>
          <p className="opacity-0" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(237, 233, 224, 0.7)", marginBottom: "1rem" }}>
            Placeholder bio: I work with founders and product teams to tighten UX, sharpen strategy, and build revenue
            systems—so you ship fewer handoffs and more momentum.
          </p>
          <p className="opacity-0" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(237, 233, 224, 0.7)" }}>
            This copy will be replaced with your real story, stack, and how you like to collaborate.
          </p>
        </div>
        <div
          className="about-col-right grid grid-cols-2 gap-4 border p-6 opacity-0"
          style={{
            borderColor: "rgba(237, 233, 224, 0.09)",
            borderRadius: "4px",
            background: "rgba(237, 233, 224, 0.03)",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ padding: "1rem 0.5rem" }}>
              <span
                style={{
                  display: "block",
                  ...heading,
                  fontWeight: 900,
                  fontSize: "1.75rem",
                  color: "#c8f542",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.35rem",
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(237, 233, 224, 0.7)",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
