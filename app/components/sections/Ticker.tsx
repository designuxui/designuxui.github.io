"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Ticker() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const items = [
    "UX Strategy",
    "Product Strategy",
    "Conversion Optimization",
    "B2B Sales Systems",
    "CRM Setup",
    "Funnel Design",
    "UX Audit",
    "SaaS Growth",
  ];

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const row = rowRef.current;
    if (!wrap || !row) return;

    gsap.set(wrap, { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      gsap.to(wrap, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrap,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(row, {
        xPercent: -50,
        ease: "none",
        duration: 26,
        repeat: -1,
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="px-16"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        paddingTop: "0.8rem",
        paddingBottom: "0.8rem",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div
        ref={rowRef}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3rem",
              padding: "0 3rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 300,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--dim)",
              }}
            >
              {item}
            </span>
            <span style={{ fontSize: "0.4rem", color: "var(--acc)" }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
