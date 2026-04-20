"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WHERE", "DESIGN", "MEETS", "GROWTH"];
const COLORS = ["#eef1e6", "#c8f542", "#eef1e6", "#eef1e6"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = Array.from(sectionRef.current?.querySelectorAll(".hero-line") ?? []);
      gsap.set(lines, { opacity: 0, y: 100, skewY: 5 });
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(lines, { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out", stagger: 0.1 });
      gsap.set(".hero-sub", { opacity: 0, y: 20 });
      tl.to(".hero-sub", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
      gsap.set(".hero-btn", { opacity: 0, x: 20 });
      tl.to(".hero-btn", { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.5)", stagger: 0.12 }, "-=0.3");

      // Letter proximity effect
      const letters = Array.from(sectionRef.current?.querySelectorAll(".hero-letter") ?? []);
      const xQ = letters.map(el => gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" }));
      const yQ = letters.map(el => gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" }));

      const onMove = (e: MouseEvent) => {
        letters.forEach((el, i) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 120;
          if (dist < radius) {
            const f = (1 - dist / radius) * 32;
            xQ[i](-dx / dist * f);
            yQ[i](-dy / dist * f);
          } else {
            xQ[i](0); yQ[i](0);
          }
        });
        const rings = Array.from(sectionRef.current?.querySelectorAll(".hero-ring") ?? []);
        const xp = (e.clientX / window.innerWidth - 0.5) * 2;
        const yp = (e.clientY / window.innerHeight - 0.5) * 2;
        rings.forEach((ring, i) => {
          gsap.to(ring, { x: xp * (i + 1) * 16, y: yp * (i + 1) * 16, duration: 1.4, ease: "power2.out", overwrite: "auto" });
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero"
      className="relative min-h-[100dvh] overflow-hidden grid"
      style={{ gridTemplateColumns: "1fr auto", alignItems: "center", padding: "120px 4rem 4rem", background: "#080808" }}>

      {/* Rings */}
      {[900, 580, 300].map((s, i) => (
        <div key={s} className="hero-ring pointer-events-none absolute"
          style={{ width: s, height: s, border: `1px solid rgba(200,245,66,${0.04 - i * 0.01})`, borderRadius: "50%", top: "45%", left: "62%", transform: "translate(-50%,-50%)" }} />
      ))}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 40% at 65% 45%, rgba(200,245,66,0.06) 0%, transparent 60%)" }} />

      {/* Left: headline + subtitle */}
      <div className="relative z-10">
        <h1 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 900, fontSize: "clamp(4rem, 10vw, 10rem)", lineHeight: 0.9, letterSpacing: "-0.05em" }}>
          {WORDS.map((word, wi) => (
            <div key={word} className="hero-line" style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "inline-flex" }}>
                {word.split("").map((ch, ci) => (
                  <span key={ci} className="hero-letter"
                    style={{ display: "inline-block", color: COLORS[wi], willChange: "transform", cursor: "default" }}>
                    {ch}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </h1>

        <div className="hero-sub mt-8" style={{ maxWidth: 600 }}>
          <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, fontSize: "clamp(0.9rem, 1.6vw, 1.3rem)", color: "#eef1e6", letterSpacing: "-0.01em", lineHeight: 1.45, marginBottom: "0.5rem" }}>
            I fix how products sell — from first click to closed deal.
          </p>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.85rem, 1vw, 1rem)", color: "rgba(238,241,230,0.45)", lineHeight: 1.65 }}>
            Bridging UX, product strategy and revenue systems.
          </p>
        </div>
      </div>

      {/* Right: CTAs */}
      <div className="relative z-10 flex flex-col gap-4 items-end self-end pb-4">
        <a href="#contact" className="hero-btn"
          style={{ fontFamily: "var(--font-unbounded)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem 2.2rem", background: "#c8f542", color: "#080807", borderRadius: 100, textDecoration: "none", whiteSpace: "nowrap" }}>
          Start a project
        </a>
        <a href="#services" className="hero-btn"
          style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem 2.2rem", background: "transparent", color: "#eef1e6", border: "1px solid rgba(238,241,230,0.15)", borderRadius: 100, textDecoration: "none", whiteSpace: "nowrap" }}>
          Services
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-16 flex flex-col items-center gap-2"
        style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.42rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(238,241,230,0.15)" }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(200,245,66,0.3), transparent)" }} />
      </div>
    </section>
  );
}
