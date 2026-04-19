"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Years", value: "8+" },
  { label: "Projects", value: "50+" },
  { label: "Focus", value: "UX · GTM" },
  { label: "Mode", value: "Remote" },
] as const;

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const bio = bioRef.current;
    if (!root || !bio) return;

    const ctx = gsap.context(() => {
      const split = new SplitType(bio, { types: "lines" });
      gsap.set(split.lines, { opacity: 0, y: 28 });

      gsap.to(split.lines, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bio,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      const statCells = root.querySelectorAll(".about-stat");
      gsap.set(statCells, { opacity: 0, y: 24 });
      gsap.to(statCells, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.querySelector(".about-stats-grid"),
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      const h2 = root.querySelector(".about-heading");
      if (h2) {
        gsap.set(h2, { opacity: 0, y: 36 });
        gsap.to(h2, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
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
        background: "var(--bg)",
        color: "var(--fg)",
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
          color: "var(--acc)",
        }}
      >
        About
      </p>
      <div className="mx-auto grid max-w-[72rem] grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div>
          <h2
            className="about-heading mb-6"
            style={{
              ...heading,
              fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            One bridge between design and growth
          </h2>
          <div ref={bioRef} className="about-bio-text max-w-xl text-[1.05rem] leading-[1.75]" style={{ color: "var(--dim)" }}>
            <p className="mb-5">
              I work with founders and product teams to tighten UX, sharpen strategy, and build revenue systems—so you
              ship fewer handoffs and more momentum.
            </p>
            <p>
              This copy will be replaced with your real story, stack, and how you like to collaborate.
            </p>
          </div>
        </div>
        <div
          className="about-stats-grid grid grid-cols-2 gap-4 border p-6"
          style={{
            borderColor: "var(--line)",
            borderRadius: "4px",
            background: "var(--card)",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="about-stat" style={{ padding: "1rem 0.5rem" }}>
              <span
                style={{
                  display: "block",
                  ...heading,
                  fontWeight: 900,
                  fontSize: "1.75rem",
                  color: "var(--acc)",
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
                  color: "var(--dim)",
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
