"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WHERE", "DESIGN", "MEETS", "GROWTH"];
// WHERE=cream, DESIGN=outline/ghost, MEETS=cream, GROWTH=accent green
const STYLES: React.CSSProperties[] = [
  { color: "#eef1e6" },
  { color: "transparent", WebkitTextStroke: "1.5px #eef1e6" },
  { color: "rgba(238,241,230,0.55)" },
  { color: "#c8f542" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = Array.from(sectionRef.current?.querySelectorAll(".hero-line") ?? []);
      gsap.set(lines, { opacity: 0, y: 100, skewY: 5 });
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(lines, { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out", stagger: 0.1 });
      gsap.set(".hero-sub", { opacity: 0, y: 20 });
      tl.to(".hero-sub", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
      gsap.set(".hero-btn", { opacity: 0, x: 20 });
      tl.to(".hero-btn", { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.5)", stagger: 0.12 }, "-=0.3");

      // Letter proximity effect — repel on hover
      const letters = Array.from(sectionRef.current?.querySelectorAll(".hl") ?? []);
      const xQ = letters.map(el => gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" }));
      const yQ = letters.map(el => gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" }));

      const onMove = (e: MouseEvent) => {
        letters.forEach((el, i) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 130;
          if (dist < radius) {
            const f = (1 - dist / radius) * 35;
            xQ[i](-dx / dist * f);
            yQ[i](-dy / dist * f);
          } else {
            xQ[i](0); yQ[i](0);
          }
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, sectionRef);

    // Tubes cursor animation
    let app: { dispose?: () => void } | null = null;
    const t = setTimeout(() => {
      import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js" as string)
        .then((mod: { default: (canvas: HTMLCanvasElement, opts: object) => { dispose?: () => void } }) => {
          if (canvasRef.current) {
            app = mod.default(canvasRef.current, {
              tubes: {
                colors: ["#c8f542", "#a3d900", "#e0ff60"],
                lights: { intensity: 180, colors: ["#c8f542", "#7a9a05", "#d4ff50", "#4a7a00"] }
              }
            });
          }
        }).catch(() => {});
    }, 300);

    return () => {
      ctx.revert();
      clearTimeout(t);
      if (app?.dispose) app.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: "#080808", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", padding: "120px 4rem 4rem", gap: "2rem" }}>

      {/* Tubes cursor canvas */}
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" style={{ opacity: 0.7 }} />

      {/* Decorative rings */}
      {[900, 580, 310].map((s, i) => (
        <div key={s} className="hero-ring pointer-events-none absolute"
          style={{ width: s, height: s, border: `1px solid rgba(200,245,66,${0.04 - i * 0.01})`, borderRadius: "50%", top: "48%", left: "62%", transform: "translate(-50%,-50%)" }} />
      ))}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 38% at 65% 48%, rgba(200,245,66,0.055) 0%, transparent 60%)" }} />

      {/* LEFT: Headline + subtitle */}
      <div className="relative z-10">
        <h1 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 900, fontSize: "clamp(4rem, 10vw, 10rem)", lineHeight: 0.9, letterSpacing: "-0.05em" }}>
          {WORDS.map((word, wi) => (
            <div key={word} className="hero-line" style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "inline-flex" }}>
                {word.split("").map((ch, ci) => (
                  <span key={ci} className="hl"
                    style={{ display: "inline-block", willChange: "transform", cursor: "default", ...STYLES[wi] }}>
                    {ch}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </h1>

        <div className="hero-sub mt-8" style={{ maxWidth: 560 }}>
          <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, fontSize: "clamp(0.85rem, 1.5vw, 1.2rem)", color: "#eef1e6", letterSpacing: "-0.01em", lineHeight: 1.45, marginBottom: "0.6rem" }}>
            I fix how products sell —<br />from first click to closed deal.
          </p>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.82rem, 0.95vw, 0.95rem)", color: "rgba(238,241,230,0.4)", lineHeight: 1.65 }}>
            Bridging UX, product strategy and revenue systems.
          </p>
        </div>
      </div>

      {/* RIGHT: CTA buttons */}
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
