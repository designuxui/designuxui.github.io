"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const IMAGES = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

const BG_COLORS = [
  "#d4cfc6",
  "#c8c3ba",
  "#ddd9cf",
  "#cdc9bf",
  "#d8d4ca",
  "#c4bfb5",
  "#e0dbd0",
  "#ccc8be",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const currentIdx = useRef(0);
  const lastTrigger = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-name", { opacity: 0, y: 40 });
      gsap.set(".hero-subtitle", { opacity: 0, y: 30 });
      gsap.set(".hero-copy", { opacity: 0, y: 20 });
      gsap.set(".hero-link", { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(".hero-name", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.7")
        .to(".hero-copy", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .to(".hero-link", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
    }, section);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = Date.now();
      if (now - lastTrigger.current < 280) return;
      lastTrigger.current = now;

      const index = currentIdx.current % imagesRef.current.length;
      const el = imagesRef.current[index];
      currentIdx.current += 1;
      if (!el) return;

      const offsetX = (Math.random() - 0.5) * 60;
      const offsetY = (Math.random() - 0.5) * 40;
      const rotate = (Math.random() - 0.5) * 16;

      gsap.set(el, {
        x: x + offsetX - 90,
        y: y + offsetY - 120,
        rotation: rotate,
        scale: 0.7,
        opacity: 0,
        zIndex: 20,
      });

      gsap.to(el, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(el, { opacity: 0, scale: 0.85, y: `+=24`, duration: 0.6, ease: "power2.in", delay: 0.9 });
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
        padding: "clamp(4rem, 10vw, 6rem) 2rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {IMAGES.map((img, idx) => (
        <div
          key={img.id}
          ref={(el) => {
            if (el) imagesRef.current[idx] = el;
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "180px",
            aspectRatio: "2 / 3",
            borderRadius: "16px",
            overflow: "hidden",
            opacity: 0,
            pointerEvents: "none",
            background: BG_COLORS[idx % BG_COLORS.length],
            boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
          }}
        />
      ))}

      <div style={{ maxWidth: "min(900px, 100%)" }}>
        <p
          style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(10,10,10,0.5)",
            marginBottom: "1.4rem",
          }}
        >
          UX · Product · Growth Studio
        </p>

        <h1
          className="hero-name"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "clamp(4rem, 10vw, 10rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            margin: 0,
            color: "#0a0a0a",
          }}
        >
          Bridge<span style={{ color: "#c8f542" }}>.</span>
        </h1>

        <p
          className="hero-subtitle"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "clamp(2rem, 5vw, 5.5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(10,10,10,0.4)",
            margin: "0.35rem 0 1.5rem",
            lineHeight: 1,
          }}
        >
          UX & Growth Studio
        </p>

        <p
          className="hero-copy"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            color: "rgba(10,10,10,0.65)",
            maxWidth: "42rem",
            marginBottom: "2rem",
          }}
        >
          Led by a strategist who refuses to stay in a single lane — UX, product and revenue systems built together.
        </p>

        <a
          href="#about"
          className="hero-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#0a0a0a",
            textDecoration: "underline",
          }}
        >
          About us ↗
        </a>
      </div>
    </section>
  );
}
