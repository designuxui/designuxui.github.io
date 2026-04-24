"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { batchReveal } from "../ui/ScrollBatch";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "Research",
  "Strategy", 
  "UX Design",
  "Development",
  "Testing",
  "Launch",
];

export default function WordsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current?.querySelectorAll(".word-item");
      if (!words?.length) return;

      batchReveal(sectionRef.current, {
        selector: ".word-item",
        start: "top 80%",
        distance: 80,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        batchMax: 8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-32"
      style={{ background: "var(--bg)" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.04, background: "repeating-linear-gradient(90deg, var(--acc) 0, var(--acc) 1px, transparent 1px, transparent 60px)" }} />
      <div className="pointer-events-none absolute left-1/4 top-1/4" style={{ width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,245,66,0.15) 0%, transparent 70%)", filter: "blur(30px)" }} />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4" style={{ width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,245,66,0.1) 0%, transparent 70%)", filter: "blur(25px)" }} />
      <div
        ref={wordsRef}
        className="flex flex-wrap justify-center gap-x-8 gap-y-4"
        style={{ perspective: "1000px" }}
      >
        {WORDS.map((word, i) => (
          <span
            key={word}
            className="word-item inline-block"
            style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "var(--fg)",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}