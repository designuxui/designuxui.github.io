"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitType(headlineRef.current!, { types: "chars,words" });
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      tl.fromTo(split.chars, { opacity: 0, y: 60, rotateX: -90 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: "power3.out", stagger: 0.025 }, "-=0.3");
      tl.fromTo(taglineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
      tl.fromTo(barRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const btnMain: React.CSSProperties = {
    fontFamily: "var(--font-unbounded)", fontWeight: 700, fontSize: "0.75rem",
    letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2rem",
    background: "var(--acc)", color: "var(--bg)", borderRadius: "100px",
    textDecoration: "none", display: "inline-flex", alignItems: "center",
    whiteSpace: "nowrap", transition: "background 0.2s",
  };

  const btnSec: React.CSSProperties = {
    fontFamily: "var(--font-unbounded)", fontWeight: 400, fontSize: "0.72rem",
    letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2rem",
    background: "transparent", color: "var(--fg)", border: "1px solid var(--line)",
    borderRadius: "3px", textDecoration: "none", whiteSpace: "nowrap",
    transition: "border-color 0.2s",
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-16 pb-16 overflow-hidden" style={{ background: "var(--bg)", paddingTop: "120px" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(200,245,66,0.06) 0%, transparent 70%)" }} />
      <div ref={eyebrowRef} className="mb-6 opacity-0" style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--acc)" }}>
        UX · Product · Growth
      </div>
      <h1 ref={headlineRef} style={{ fontFamily: "var(--font-unbounded)", fontWeight: 900, fontSize: "clamp(4rem, 11vw, 12rem)", lineHeight: 0.88, letterSpacing: "-0.03em", color: "var(--fg)" }}>
        WHERE<br />
        <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--fg)" }}>DESIGN</span><br />
        MEETS<br />
        <span style={{ color: "var(--acc)" }}>GROWTH</span>
      </h1>
      <p ref={taglineRef} className="mt-8 opacity-0" style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, fontSize: "clamp(1.1rem, 2vw, 1.8rem)", color: "var(--fg)", letterSpacing: "-0.01em", lineHeight: 1.3, maxWidth: "720px" }}>
        One specialist bridging{" "}
        <strong style={{ color: "var(--acc)", fontWeight: 400 }}>UX, product strategy</strong>{" "}
        and sales.
      </p>
      <div ref={barRef} className="mt-10 opacity-0 grid gap-8 items-center pt-8" style={{ borderTop: "1px solid var(--line)", gridTemplateColumns: "1fr auto" }}>
        <div className="flex gap-12 flex-wrap">
          {[{ label: "Availability", value: "Open to work" }, { label: "Location", value: "Remote worldwide" }, { label: "Focus", value: "SaaS · eCommerce · B2B" }].map((item) => (
            <div key={item.label}>
              <span className="block mb-1" style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--dim)" }}>{item.label}</span>
              <span style={{ fontSize: "0.95rem", color: "var(--fg)" }}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center flex-shrink-0">
          <a href="#contact" style={btnMain}>Start a project</a>
          <a href="#services" style={btnSec}>Services</a>
        </div>
      </div>
    </section>
  );
}
