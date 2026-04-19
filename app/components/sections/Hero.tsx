"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const COUNTERS = [
  { label: "Conversion lift", value: "+40%" },
  { label: "Revenue growth", value: "3x" },
  { label: "Shipped", value: "50+" },
  { label: "Experience", value: "8yr" },
] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const gradRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const onHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const hero = heroRef.current;
    const grad = gradRef.current;
    if (!hero || !grad) return;
    const rect = hero.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    grad.style.background = `radial-gradient(ellipse 85% 75% at ${px}% ${py}%, rgba(200,245,66,0.18) 0%, rgba(200,245,66,0.04) 35%, transparent 62%)`;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 18 });
      if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 0, y: 28 });
      if (countersRef.current) gsap.set(countersRef.current.querySelectorAll(".hero-counter"), { opacity: 0, y: 36 });
      if (barRef.current) gsap.set(barRef.current, { opacity: 0, y: 20 });

      const split = new SplitType(headlineRef.current!, { types: "chars" });
      gsap.set(split.chars, { opacity: 0, y: 72, rotateX: -88 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
      tl.to(
        split.chars,
        { opacity: 1, y: 0, rotateX: 0, duration: 0.65, ease: "power3.out", stagger: { each: 0.022, from: "start" } },
        "-=0.25",
      );
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.35");
      tl.to(
        countersRef.current?.querySelectorAll(".hero-counter") ?? [],
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.09 },
        "-=0.4",
      );
      tl.to(barRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.35");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const ctx = gsap.context(() => {
      const glow = hero.querySelector(".hero-scroll-glow");
      if (glow) {
        gsap.to(glow, {
          y: 100,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, hero);
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
    <section
      ref={heroRef}
      onMouseMove={onHeroMouseMove}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-16"
      style={{ background: "var(--bg)", paddingTop: "120px", paddingLeft: "4rem", paddingRight: "4rem" }}
    >
      <div
        ref={gradRef}
        className="pointer-events-none absolute inset-0 transition-[background] duration-75 ease-out"
        style={{
          background: "radial-gradient(ellipse 85% 75% at 55% 42%, rgba(200,245,66,0.14) 0%, rgba(200,245,66,0.04) 38%, transparent 62%)",
        }}
      />
      <div
        className="hero-scroll-glow pointer-events-none absolute inset-0 will-change-transform"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 70% 55%, rgba(200,245,66,0.05) 0%, transparent 65%)",
        }}
      />
      <div ref={eyebrowRef} className="relative z-[1] mb-6" style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--acc)" }}>
        UX · Product · Growth
      </div>
      <h1
        ref={headlineRef}
        className="relative z-[1]"
        style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 900,
          fontSize: "clamp(3rem, 9vw, 10rem)",
          lineHeight: 0.88,
          letterSpacing: "-0.03em",
          color: "var(--fg)",
          perspective: "1200px",
        }}
      >
        WHERE<br />
        <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--fg)" }}>DESIGN</span>
        <br />
        MEETS<br />
        <span style={{ color: "var(--acc)" }}>GROWTH</span>
      </h1>
      <p
        ref={taglineRef}
        className="relative z-[1] mt-8 max-w-[720px]"
        style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, fontSize: "clamp(1.1rem, 2vw, 1.8rem)", color: "var(--fg)", letterSpacing: "-0.01em", lineHeight: 1.3 }}
      >
        One specialist bridging{" "}
        <strong style={{ color: "var(--acc)", fontWeight: 400 }}>UX, product strategy</strong> and sales.
      </p>

      <div ref={countersRef} className="relative z-[1] mt-12 grid w-full max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
        {COUNTERS.map((c) => (
          <div key={c.value} className="hero-counter">
            <span className="block" style={{ fontFamily: "var(--font-unbounded)", fontSize: "clamp(2.25rem, 5vw, 3.75rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--acc)", lineHeight: 1 }}>
              {c.value}
            </span>
            <span className="mt-2 block text-xs uppercase tracking-[0.16em]" style={{ color: "var(--dim)" }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      <div ref={barRef} className="relative z-[1] mt-12 grid max-w-5xl grid-cols-1 items-center gap-8 border-t border-[var(--line)] pt-8 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap gap-10">
          {[{ label: "Availability", value: "Open to work" }, { label: "Location", value: "Remote worldwide" }, { label: "Focus", value: "SaaS · eCommerce · B2B" }].map((item) => (
            <div key={item.label}>
              <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.14em]" style={{ color: "var(--dim)" }}>{item.label}</span>
              <span className="text-[0.95rem]" style={{ color: "var(--fg)" }}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-4">
          <a href="#contact" data-cursor style={btnMain}>Start a project</a>
          <a href="#services" data-cursor style={btnSec}>Services</a>
        </div>
      </div>
    </section>
  );
}
