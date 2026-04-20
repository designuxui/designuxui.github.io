"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Animate each word line
      const lines = Array.from(sectionRef.current?.querySelectorAll(".hero-line") ?? []);
      gsap.set(lines, { opacity: 0, y: 80, skewY: 4 });
      tl.to(lines, {
        opacity: 1, y: 0, skewY: 0,
        duration: 0.9, ease: "power4.out",
        stagger: 0.12,
      });

      // Subtitle
      gsap.set(".hero-subtitle", { opacity: 0, y: 20 });
      tl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");

      // Tagline
      gsap.set(".hero-tagline", { opacity: 0, y: 15 });
      tl.to(".hero-tagline", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");

      // Process words
      gsap.set(".hero-process", { opacity: 0, y: 10 });
      tl.to(".hero-process", {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.06,
      }, "-=0.3");

      // Buttons
      gsap.set(".hero-btn", { opacity: 0, y: 15, scale: 0.95 });
      tl.to(".hero-btn", {
        opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.1,
      }, "-=0.2");

      // Rings parallax on mouse
      const handleMouse = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPct = (clientX / window.innerWidth - 0.5) * 2;
        const yPct = (clientY / window.innerHeight - 0.5) * 2;
        const rings = Array.from(sectionRef.current?.querySelectorAll(".hero-ring") ?? []);
        rings.forEach((ring, i) => {
          const factor = (i + 1) * 12;
          gsap.to(ring, {
            x: xPct * factor,
            y: yPct * factor,
            duration: 1.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };
      window.addEventListener("mousemove", handleMouse);
      return () => window.removeEventListener("mousemove", handleMouse);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-hidden px-8 md:px-16"
      style={{ background: "linear-gradient(135deg, #080808 0%, #0a0a0a 60%, #060606 100%)" }}>

      {/* Decorative rings — move on mouse */}
      <div className="hero-ring pointer-events-none absolute"
        style={{ width: 900, height: 900, border: "1px solid rgba(200,245,66,0.04)", borderRadius: "50%", top: "45%", left: "60%", transform: "translate(-50%,-50%)" }} />
      <div className="hero-ring pointer-events-none absolute"
        style={{ width: 600, height: 600, border: "1px solid rgba(200,245,66,0.025)", borderRadius: "50%", top: "45%", left: "60%", transform: "translate(-50%,-50%)" }} />
      <div className="hero-ring pointer-events-none absolute"
        style={{ width: 320, height: 320, border: "1px solid rgba(200,245,66,0.015)", borderRadius: "50%", top: "45%", left: "60%", transform: "translate(-50%,-50%)" }} />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 40% at 65% 45%, rgba(200,245,66,0.05) 0%, transparent 60%)" }} />

      {/* Headline */}
      <div className="relative z-10">
        <h1 className="flex flex-col items-start"
          style={{ fontFamily: "var(--font-unbounded)", fontWeight: 900, fontSize: "clamp(4rem, 11vw, 11rem)", lineHeight: 0.9, letterSpacing: "-0.05em" }}>
          <span className="hero-line block cursor-default" style={{ color: "#eef1e6" }}>WHERE</span>
          <span className="hero-line block cursor-default" style={{ color: "#c8f542" }}>DESIGN</span>
          <span className="hero-line block cursor-default" style={{ color: "#eef1e6" }}>MEETS</span>
          <span className="hero-line block cursor-default" style={{ color: "#eef1e6" }}>GROWTH</span>
        </h1>
      </div>

      {/* Subtitle */}
      <p className="hero-subtitle relative z-10 mt-10"
        style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, fontSize: "clamp(1rem, 1.8vw, 1.5rem)", color: "#eef1e6", letterSpacing: "-0.015em", lineHeight: 1.4 }}>
        I fix how products sell — from first click to closed deal
      </p>

      <p className="hero-tagline relative z-10 mt-2"
        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.85rem, 1vw, 1rem)", color: "rgba(238,241,230,0.45)", lineHeight: 1.6 }}>
        Bridging UX, product strategy and revenue systems.
      </p>

      {/* Process words */}
      <div className="relative z-10 mt-10 flex flex-wrap gap-x-6 gap-y-3">
        {["Research", "Strategy", "UX Design", "Development", "Testing", "Launch"].map((w, i) => (
          <span key={w} className="hero-process"
            style={{ fontFamily: "var(--font-unbounded)", fontSize: "clamp(0.65rem, 1vw, 0.85rem)", fontWeight: 700, letterSpacing: "0.04em", color: i === 2 ? "#c8f542" : "rgba(238,241,230,0.35)" }}>
            {w}
          </span>
        ))}
      </div>

      {/* CTAs */}
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

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-8 md:left-16 flex flex-col items-center gap-3"
        style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.45rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(238,241,230,0.15)" }}>
        <span>Scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(200,245,66,0.3), transparent)" }} />
      </div>
    </section>
  );
}
