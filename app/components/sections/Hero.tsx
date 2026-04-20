"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WHERE", "DESIGN", "MEETS", "GROWTH"];
const WORD_COLORS = ["#eef1e6", "#c8f542", "#eef1e6", "#eef1e6"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation
      const lines = Array.from(sectionRef.current?.querySelectorAll(".hero-line") ?? []);
      gsap.set(lines, { opacity: 0, y: 100, skewY: 6 });
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(lines, { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out", stagger: 0.1 });
      gsap.set(".hero-subtitle", { opacity: 0, y: 24 });
      tl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
      gsap.set(".hero-tagline", { opacity: 0, y: 16 });
      tl.to(".hero-tagline", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
      gsap.set(".hero-process", { opacity: 0, y: 10 });
      tl.to(".hero-process", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.07 }, "-=0.3");
      gsap.set(".hero-btn", { opacity: 0, y: 16, scale: 0.95 });
      tl.to(".hero-btn", { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.1 }, "-=0.2");

      // Effect 041: each letter responds to mouse proximity
      const letters = Array.from(sectionRef.current?.querySelectorAll(".hero-letter") ?? []);
      const xTos = letters.map(el => gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" }));
      const yTos = letters.map(el => gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" }));

      const handleMouse = (e: MouseEvent) => {
        letters.forEach((el, i) => {
          const rect = (el as HTMLElement).getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 140;
          if (dist < radius) {
            const force = (1 - dist / radius) * 28;
            xTos[i](-dx / dist * force);
            yTos[i](-dy / dist * force);
          } else {
            xTos[i](0);
            yTos[i](0);
          }
        });

        // Rings parallax
        const rings = Array.from(sectionRef.current?.querySelectorAll(".hero-ring") ?? []);
        const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
        rings.forEach((ring, i) => {
          const f = (i + 1) * 14;
          gsap.to(ring, { x: xPct * f, y: yPct * f, duration: 1.4, ease: "power2.out", overwrite: "auto" });
        });
      };

      window.addEventListener("mousemove", handleMouse);
      return () => window.removeEventListener("mousemove", handleMouse);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero"
      className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-hidden"
      style={{ padding: "0 4rem", background: "linear-gradient(135deg, #080808 0%, #0a0a0a 60%, #060606 100%)" }}>

      <div className="hero-ring pointer-events-none absolute"
        style={{ width: 900, height: 900, border: "1px solid rgba(200,245,66,0.04)", borderRadius: "50%", top: "45%", left: "62%", transform: "translate(-50%,-50%)" }} />
      <div className="hero-ring pointer-events-none absolute"
        style={{ width: 580, height: 580, border: "1px solid rgba(200,245,66,0.025)", borderRadius: "50%", top: "45%", left: "62%", transform: "translate(-50%,-50%)" }} />
      <div className="hero-ring pointer-events-none absolute"
        style={{ width: 300, height: 300, border: "1px solid rgba(200,245,66,0.015)", borderRadius: "50%", top: "45%", left: "62%", transform: "translate(-50%,-50%)" }} />
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 40% at 65% 45%, rgba(200,245,66,0.06) 0%, transparent 60%)" }} />

      {/* Headline with per-letter mouse proximity */}
      <div className="relative z-10">
        <h1 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 900, fontSize: "clamp(4rem, 11vw, 11rem)", lineHeight: 0.9, letterSpacing: "-0.05em" }}>
          {WORDS.map((word, wi) => (
            <div key={word} className="hero-line block overflow-hidden" style={{ display: "block" }}>
              <span style={{ display: "inline-flex" }}>
                {word.split("").map((char, ci) => (
                  <span key={ci} className="hero-letter"
                    style={{ display: "inline-block", color: WORD_COLORS[wi], cursor: "default", willChange: "transform" }}>
                    {char}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </h1>
      </div>

      <p className="hero-subtitle relative z-10 mt-10"
        style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, fontSize: "clamp(0.9rem, 1.8vw, 1.4rem)", color: "#eef1e6", letterSpacing: "-0.015em", lineHeight: 1.4, maxWidth: "700px" }}>
        I fix how products sell — from first click to closed deal
      </p>
      <p className="hero-tagline relative z-10 mt-2"
        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.8rem, 1vw, 0.95rem)", color: "rgba(238,241,230,0.4)", lineHeight: 1.6 }}>
        Bridging UX, product strategy and revenue systems.
      </p>

      <div className="relative z-10 mt-10 flex flex-wrap gap-x-6 gap-y-3">
        {["Research", "Strategy", "UX Design", "Development", "Testing", "Launch"].map((w, i) => (
          <span key={w} className="hero-process"
            style={{ fontFamily: "var(--font-unbounded)", fontSize: "clamp(0.6rem, 0.9vw, 0.8rem)", fontWeight: 700, letterSpacing: "0.04em", color: i === 2 ? "#c8f542" : "rgba(238,241,230,0.3)" }}>
            {w}
          </span>
        ))}
      </div>

      <div className="relative z-10 mt-8 flex gap-3">
        <a href="#contact" className="hero-btn"
          style={{ fontFamily: "var(--font-unbounded)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.9rem 2rem", background: "#c8f542", color: "#080807", borderRadius: 100, textDecoration: "none" }}>
          Start a project
        </a>
        <a href="#services" className="hero-btn"
          style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.9rem 2rem", background: "transparent", color: "#eef1e6", border: "1px solid rgba(238,241,230,0.12)", borderRadius: 100, textDecoration: "none" }}>
          Services
        </a>
      </div>

      <div className="absolute bottom-8 left-16 flex flex-col items-center gap-3"
        style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.45rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(238,241,230,0.15)" }}>
        <span>Scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(200,245,66,0.3), transparent)" }} />
      </div>
    </section>
  );
}
