"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.set(".hero-line", { opacity: 0, y: 80 });
      gsap.set(".hero-sub", { opacity: 0, y: 24 });
      gsap.set(".hero-cta", { opacity: 0, y: 16 });
      gsap.set(".hero-photo", { opacity: 0, scale: 0.96 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(".hero-line", {
        opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.08,
      })
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)", stagger: 0.1 }, "-=0.4")
        .to(".hero-photo", {
          opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.07,
        }, "-=0.7");

      // Letter proximity repulsion
      const letters = Array.from(sectionRef.current?.querySelectorAll(".hl") ?? []);
      const xQ = letters.map((el) => gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" }));
      const yQ = letters.map((el) => gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" }));

      const onMove = (e: MouseEvent) => {
        letters.forEach((el, i) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const f = (1 - dist / 130) * 30;
            xQ[i]((-dx / dist) * f);
            yQ[i]((-dy / dist) * f);
          } else {
            xQ[i](0);
            yQ[i](0);
          }
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Photo grid — 6 placeholder slots like Ashley's work grid
  const photos = [
    { id: 1, aspect: "tall", label: "SaaS Onboarding Redesign" },
    { id: 2, aspect: "wide", label: "E-commerce Funnel" },
    { id: 3, aspect: "square", label: "B2B Sales System" },
    { id: 4, aspect: "wide", label: "UX Audit — Fintech" },
    { id: 5, aspect: "tall", label: "Product Strategy" },
    { id: 6, aspect: "square", label: "CRM Pipeline" },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        background: "#f5f0e8",
        minHeight: "100dvh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* LEFT — Text */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(80px,10vw,130px) clamp(1.5rem,4vw,4rem) clamp(2rem,4vw,4rem)",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Top label */}
        <div className="hero-line" style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.6rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(10,10,10,0.4)",
        }}>
          UX · Product · Growth — Remote worldwide
        </div>

        {/* Main headline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem 0" }}>
          <h1 style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 900,
            fontSize: "clamp(2.8rem,6.5vw,7rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#0a0a0a",
            margin: 0,
          }}>
            {/* WHERE */}
            <div className="hero-line" style={{ overflow: "hidden", display: "block" }}>
              <span style={{ display: "inline-flex" }}>
                {"WHERE".split("").map((ch, i) => (
                  <span key={i} className="hl" style={{ display: "inline-block", willChange: "transform", cursor: "default", color: "#0a0a0a" }}>{ch}</span>
                ))}
              </span>
            </div>
            {/* DESIGN */}
            <div className="hero-line" style={{ overflow: "hidden", display: "block" }}>
              <span style={{ display: "inline-flex" }}>
                {"DESIGN".split("").map((ch, i) => (
                  <span key={i} className="hl" style={{ display: "inline-block", willChange: "transform", cursor: "default", color: "transparent", WebkitTextStroke: "1.5px #0a0a0a" }}>{ch}</span>
                ))}
              </span>
            </div>
            {/* MEETS */}
            <div className="hero-line" style={{ overflow: "hidden", display: "block" }}>
              <span style={{ display: "inline-flex" }}>
                {"MEETS".split("").map((ch, i) => (
                  <span key={i} className="hl" style={{ display: "inline-block", willChange: "transform", cursor: "default", color: "rgba(10,10,10,0.35)" }}>{ch}</span>
                ))}
              </span>
            </div>
            {/* GROWTH */}
            <div className="hero-line" style={{ overflow: "hidden", display: "block" }}>
              <span style={{ display: "inline-flex" }}>
                {"GROWTH".split("").map((ch, i) => (
                  <span key={i} className="hl" style={{ display: "inline-block", willChange: "transform", cursor: "default", color: "#c8f542" }}>{ch}</span>
                ))}
              </span>
            </div>
          </h1>

          <div className="hero-sub" style={{ marginTop: "2rem", maxWidth: "38rem" }}>
            <p style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 400,
              fontSize: "clamp(0.75rem,1.2vw,1rem)",
              color: "rgba(10,10,10,0.55)",
              lineHeight: 1.65,
              letterSpacing: "-0.01em",
              caretColor: "transparent",
              userSelect: "none",
            }}>
              Led by a strategist who refuses to stay in a single lane — UX, product and revenue systems, built together.
            </p>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <a href="#contact" className="hero-cta" style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 700,
            fontSize: "clamp(0.55rem,0.9vw,0.65rem)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "clamp(0.7rem,1.5vw,1rem) clamp(1.5rem,2.5vw,2.2rem)",
            background: "#0a0a0a",
            color: "#f5f0e8",
            borderRadius: 100,
            textDecoration: "none",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}>
            Start a project <span style={{ fontSize: "0.9em" }}>↗</span>
          </a>
          <a href="#cases" className="hero-cta" style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 400,
            fontSize: "clamp(0.52rem,0.85vw,0.62rem)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "clamp(0.7rem,1.5vw,1rem) clamp(1.5rem,2.5vw,2.2rem)",
            background: "transparent",
            color: "#0a0a0a",
            border: "1px solid rgba(10,10,10,0.2)",
            borderRadius: 100,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            See the work
          </a>
        </div>
      </div>

      {/* RIGHT — Photo grid like Ashley */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gap: "6px",
        padding: "6px 6px 6px 0",
        height: "100dvh",
      }}>
        {photos.map((p, i) => (
          <div
            key={p.id}
            className="hero-photo"
            style={{
              background: i % 3 === 0 ? "#e0dbd0" : i % 3 === 1 ? "#d4d0c8" : "#ccc8be",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
              gridRow: i === 0 ? "span 2" : i === 4 ? "span 2" : "span 1",
            }}
          >
            {/* Placeholder content */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "1rem",
              background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 50%)",
            }}>
              <span style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}>
                {p.label}
              </span>
            </div>
            {/* Placeholder icon */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              width: "40px",
              height: "40px",
              opacity: 0.2,
            }}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="36" height="36" rx="2" stroke="#0a0a0a" strokeWidth="1.5"/>
                <circle cx="13" cy="13" r="4" stroke="#0a0a0a" strokeWidth="1.5"/>
                <path d="M2 28L12 18L20 26L26 20L38 32" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "clamp(1.5rem,4vw,4rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        fontFamily: "var(--font-unbounded)",
        fontSize: "0.38rem",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "rgba(10,10,10,0.25)",
        zIndex: 3,
      }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(10,10,10,0.3), transparent)" }} />
      </div>
    </section>
  );
}