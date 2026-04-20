"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ["All", "SaaS", "Portfolio", "eCommerce", "Agency", "Landing"] as const;
type Filter = (typeof FILTERS)[number];

const TEMPLATES = [
  { id: "1", name: "Atlas", category: "SaaS" as const, price: 89, gradient: "linear-gradient(135deg, #1a2a1a 0%, #2d3f2d 40%, rgba(200,245,66,0.2) 100%)" },
  { id: "2", name: "Meridian", category: "Portfolio" as const, price: 69, gradient: "linear-gradient(135deg, #1f1a2a 0%, #352d45 45%, rgba(200,245,66,0.18) 100%)" },
  { id: "3", name: "North", category: "Agency" as const, price: 119, gradient: "linear-gradient(135deg, #0f1418 0%, #1e2832 50%, rgba(200,245,66,0.15) 100%)" },
  { id: "4", name: "Kite", category: "eCommerce" as const, price: 99, gradient: "linear-gradient(135deg, #221818 0%, #3d2525 42%, rgba(200,245,66,0.22) 100%)" },
  { id: "5", name: "Signal", category: "SaaS" as const, price: 149, gradient: "linear-gradient(135deg, #0d1210 0%, #1a2820 48%, rgba(200,245,66,0.25) 100%)" },
  { id: "6", name: "Lumen", category: "Landing" as const, price: 59, gradient: "linear-gradient(135deg, #18161a 0%, #2a2630 50%, rgba(200,245,66,0.12) 100%)" },
] as const;

const headingFont: React.CSSProperties = { fontFamily: "var(--font-unbounded)" };

export default function MarketplaceContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const cursorRef = useRef({ x: 0.5, y: 0.5 });

  const filtered = useMemo(() => {
    if (filter === "All") return [...TEMPLATES];
    return TEMPLATES.filter((t) => t.category === filter);
  }, [filter]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const folder = folderRef.current;
    if (!container || !folder) return;

    const ctx = gsap.context(() => {
      const cards = folder.querySelectorAll(".folder-card");
      
      const totalHeight = folder.scrollHeight - container.offsetHeight;
      
      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${totalHeight}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          const cardCount = cards.length;
          
          cards.forEach((card, i) => {
            const baseRotation = 0;
            const cardPosition = (i / cardCount + scrollProgress * 2) % 1;
            const rotation = cardPosition * 360 + baseRotation;
            const scale = 0.7 + Math.sin(cardPosition * Math.PI) * 0.3;
            const z = cardPosition * 500;
            const opacity = cardPosition > 0.15 && cardPosition < 0.85 ? 1 : Math.min(cardPosition * 6, (1 - cardPosition) * 6);
            
            gsap.set(card, {
              rotation: rotation,
              scale: scale,
              z: z,
              opacity: opacity,
              autoAlpha: opacity,
            });
          });
        },
      });

      return () => st.kill();
    }, rootRef);

    return () => ctx.revert();
  }, [filter]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      cursorRef.current = { x, y };

      if (folderRef.current) {
        gsap.to(folderRef.current, {
          rotationY: (x - 0.5) * 20,
          rotationX: -(y - 0.5) * 20,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [filter]);

  return (
    <div ref={rootRef} style={{ background: "#080706", color: "#ede9e0", fontFamily: "var(--font-dm-sans)" }}>
      <section
        style={{
          paddingTop: "8rem",
          paddingBottom: "4rem",
          paddingLeft: "4rem",
          paddingRight: "4rem",
          borderBottom: "1px solid rgba(237, 233, 224, 0.09)",
        }}
      >
        <p
          style={{
            ...headingFont,
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c8f542",
            marginBottom: "1.25rem",
          }}
        >
          Marketplace
        </p>
        <h1
          style={{
            ...headingFont,
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            maxWidth: "18ch",
            marginBottom: "1.5rem",
          }}
        >
          Website Templates
        </h1>
        <p
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            lineHeight: 1.6,
            color: "rgba(237, 233, 224, 0.72)",
            maxWidth: "36rem",
            marginBottom: "2rem",
          }}
        >
          Ready-made sites you can launch fast—structured sections, sensible typography, and space to plug in your product story. Pick a template, connect Stripe, and ship.
        </p>
        <Link href="/" style={{ ...headingFont, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8f542", textDecoration: "none", borderBottom: "1px solid rgba(200,245,66,0.35)" }}>
          ← Back to home
        </Link>
      </section>

      <div className="flex flex-wrap gap-3 px-16 py-8" style={{ padding: "2rem 4rem 1rem" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            data-cursor-hover
            onClick={() => setFilter(f)}
            style={{
              ...headingFont,
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "0.55rem 1.1rem",
              borderRadius: "100px",
              border: filter === f ? "1px solid #c8f542" : "1px solid rgba(237,233,224,0.12)",
              background: filter === f ? "rgba(200,245,66,0.12)" : "transparent",
              color: filter === f ? "#c8f542" : "rgba(237,233,224,0.75)",
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative flex items-center justify-center"
        style={{ height: "70vh", perspective: "2000px", overflow: "hidden" }}
      >
        <div
          ref={folderRef}
          className="relative"
          style={{
            width: "320px",
            height: "450px",
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
          }}
        >
          {filtered.map((t, i) => (
            <article
              key={t.id}
              className="folder-card absolute inset-0 flex flex-col overflow-hidden rounded-sm border"
              style={{
                borderColor: "rgba(237,233,224,0.12)",
                background: "rgba(237,233,224,0.04)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                width: "100%",
                height: "100%",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="h-full w-full" style={{ background: t.gradient }} />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h2 style={{ ...headingFont, fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>{t.name}</h2>
                  <p className="text-sm" style={{ color: "rgba(237,233,224,0.55)" }}>{t.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ ...headingFont, fontSize: "1.5rem", fontWeight: 900, color: "#c8f542" }}>€{t.price}</span>
                  <button
                    type="button"
                    data-cursor-hover
                    style={{
                      ...headingFont,
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.6rem 1.2rem",
                      borderRadius: "100px",
                      background: "#c8f542",
                      color: "#080706",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="pb-20 text-center" style={{ paddingBottom: "5rem", color: "rgba(237,233,224,0.5)", fontSize: "0.9rem" }}>
        Scroll to browse · Move mouse to rotate
      </div>
    </div>
  );
}