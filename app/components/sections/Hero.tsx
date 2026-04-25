"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// 8 placeholder image slots — Ashley has 8 photos that follow cursor
const IMAGES = [
  { id: 1, label: "Project 01" },
  { id: 2, label: "Project 02" },
  { id: 3, label: "Project 03" },
  { id: 4, label: "Project 04" },
  { id: 5, label: "Project 05" },
  { id: 6, label: "Project 06" },
  { id: 7, label: "Project 07" },
  { id: 8, label: "Project 08" },
];

// Placeholder colors for images before real photos
const BG_COLORS = [
  "#d4cfc6", "#c8c3ba", "#ddd9cf",
  "#cdc9bf", "#d8d4ca", "#c4bfb5",
  "#e0dbd0", "#ccc8be",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const cursorPos = useRef({ x: 0, y: 0 });
  const currentIdx = useRef(0);
  const lastTrigger = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations — staggered like Ashley
      gsap.set(".hero-name", { opacity: 0, y: 60 });
      gsap.set(".hero-studio", { opacity: 0, y: 40 });
      gsap.set(".hero-tagline", { opacity: 0, y: 30 });
      gsap.set(".hero-cta-row", { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(".hero-name", { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" })
        .to(".hero-studio", { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" }, "-=0.7")
        .to(".hero-tagline", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .to(".hero-cta-row", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }, sectionRef);

    // Cursor-follow images — Ashley's signature effect
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      cursorPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      const now = Date.now();
      if (now - lastTrigger.current < 320) return; // throttle — new image every 320ms
      lastTrigger.current = now;

      const imgs = imagesRef.current;
      if (!imgs.length) return;

      const idx = currentIdx.current % imgs.length;
      const el = imgs[idx];
      currentIdx.current++;

      // Position image near cursor with slight random offset
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 60;
      const rotate = (Math.random() - 0.5) * 18;

      gsap.set(el, {
        x: cursorPos.current.x + offsetX - 90,
        y: cursorPos.current.y + offsetY - 120,
        rotation: rotate,
        scale: 0.6,
        opacity: 0,
        zIndex: 10 + (currentIdx.current % 20),
      });

      gsap.to(el, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      });

      // Fade out after delay
      gsap.to(el, {
        opacity: 0,
        scale: 0.85,
        y: `+=${30}`,
        duration: 0.6,
        ease: "power2.in",
        delay: 0.9,
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        background: "#f5f0e8",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(100px,12vw,140px) clamp(1.5rem,5vw,5rem) clamp(3rem,5vw,5rem)",
        position: "relative",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      {/* Cursor-follow images — invisible until mousemove */}
      {IMAGES.map((img, i) => (
        <div
          key={img.id}
          ref={(el) => { if (el) imagesRef.current[i] = el; }}
          style={{
            position: "absolute",
            width: "clamp(140px,14vw,220px)",
            aspectRatio: "3/4",
            borderRadius: "3px",
            overflow: "hidden",
            opacity: 0,
            pointerEvents: "none",
            top: 0,
            left: 0,
            background: BG_COLORS[i],
            zIndex: 5,
          }}
        >
          {/* Placeholder — swap with <img src="..." /> when ready */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0.75rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)",
          }}>
            <span style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.48rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}>
              {img.label}
            </span>
          </div>
          {/* Photo placeholder icon */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-60%)",
            opacity: 0.18,
          }}>
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <rect x="2" y="2" width="36" height="36" rx="2" stroke="#0a0a0a" strokeWidth="1.5"/>
              <circle cx="13" cy="13" r="4" stroke="#0a0a0a" strokeWidth="1.5"/>
              <path d="M2 28L12 18L20 26L26 20L38 32" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      ))}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Studio name — like Ashley's "Ashley Brooke" */}
        <div className="hero-name" style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 900,
          fontSize: "clamp(3.5rem,9vw,9rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          color: "#0a0a0a",
          marginBottom: "0.2em",
        }}>
          Bridge
          <span style={{ color: "#c8f542" }}>.</span>
        </div>

        {/* Subtitle — like "creative Studio" in Ashley's italic serif */}
        <div className="hero-studio" style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "clamp(1.8rem,4.5vw,5rem)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "rgba(10,10,10,0.45)",
          marginBottom: "clamp(2rem,4vw,4rem)",
        }}>
          UX &amp; Growth Studio
        </div>

        {/* Tagline — like Ashley's one-liner */}
        <p className="hero-tagline" style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 400,
          fontSize: "clamp(0.75rem,1.4vw,1.05rem)",
          lineHeight: 1.65,
          letterSpacing: "-0.01em",
          color: "rgba(10,10,10,0.55)",
          maxWidth: "42rem",
          caretColor: "transparent",
          userSelect: "none",
        }}>
          Led by a strategist who refuses to stay in a single lane — UX, product and revenue systems, built together.
        </p>
      </div>

      {/* Bottom row — CTA + scroll like Ashley */}
      <div className="hero-cta-row" style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a href="#contact" style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 700,
            fontSize: "clamp(0.55rem,0.9vw,0.65rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "0.9rem 2rem",
            background: "#0a0a0a",
            color: "#f5f0e8",
            borderRadius: 100,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
            transition: "background 0.25s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#c8f542") && (e.currentTarget.style.color = "#0a0a0a") as never}
            onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a") && (e.currentTarget.style.color = "#f5f0e8") as never}
          >
            Create with us ↗
          </a>
          <a href="#about" style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 400,
            fontSize: "clamp(0.52rem,0.85vw,0.62rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "0.9rem 2rem",
            background: "transparent",
            color: "#0a0a0a",
            border: "1px solid rgba(10,10,10,0.2)",
            borderRadius: 100,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            Our work
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.38rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(10,10,10,0.25)",
        }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(10,10,10,0.3), transparent)" }} />
        </div>
      </div>
    </section>
  );
}