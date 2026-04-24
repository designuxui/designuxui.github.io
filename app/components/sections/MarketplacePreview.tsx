"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { batchReveal } from "../ui/ScrollBatch";

gsap.registerPlugin(ScrollTrigger);

const TEMPLATES = [
  { id: "1", name: "Atlas", category: "SaaS", price: 1299, gradient: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #c8f542 100%)", desc: "Modern SaaS dashboard with analytics" },
  { id: "2", name: "Meridian", category: "Portfolio", price: 999, gradient: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #c8f542 100%)", desc: "Minimal portfolio for creatives" },
  { id: "3", name: "North", category: "Agency", price: 1499, gradient: "linear-gradient(135deg, #0a0f0a 0%, #152015 50%, #c8f542 100%)", desc: "Digital agency wow factor" },
  { id: "4", name: "Signal", category: "Startup", price: 1199, gradient: "linear-gradient(135deg, #0d0d15 0%, #15152a 50%, #c8f542 100%)", desc: "Tech startup launch page" },
  { id: "5", name: "Lumen", category: "eCommerce", price: 1399, gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #58a6ff 100%)", desc: "Clean eCommerce experience" },
  { id: "6", name: "Kite", category: "Landing", price: 1099, gradient: "linear-gradient(135deg, #0a0a12 0%, #12121f 50%, #f778ba 100%)", desc: "High-converting landing" },
] as const;

const heading: React.CSSProperties = { fontFamily: "var(--font-unbounded)" };

export default function MarketplacePreview() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const ctx = gsap.context(() => {
      batchReveal(root, {
        selector: ".template-card",
        start: "top 80%",
        distance: 40,
        duration: 0.8,
        stagger: 0.1,
        batchMax: 8,
      });

      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="templates"
      className="relative overflow-hidden"
      style={{
        padding: "6rem 0",
        background: "#080807",
        color: "#eef1e6",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(200,245,66,0.05) 0%, transparent 50%)" }} />
      
      <div className="mb-10 px-8 flex items-end justify-between">
        <div>
          <p className="mb-3" style={{ ...heading, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8f542" }}>
            Templates
          </p>
          <h2 style={{ ...heading, fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#eef1e6" }}>
            Built to launch
          </h2>
        </div>
        <div className="hidden md:flex gap-3">
          <Link href="/marketplace" data-cursor style={{ ...heading, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.7rem 1.5rem", borderRadius: "100px", border: "1px solid rgba(200,245,66,0.3)", color: "#c8f542", textDecoration: "none" }}>
            View all
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ paddingLeft: "2rem" }}>
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: "linear-gradient(90deg, #080807 0%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: "linear-gradient(270deg, #080807 0%, transparent 100%)" }} />
        
        <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
          {[...TEMPLATES, ...TEMPLATES].map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              className="template-card group relative flex-shrink-0 overflow-hidden"
              style={{
                width: "280px",
                height: "380px",
                background: "rgba(238,241,230,0.03)",
                border: "1px solid rgba(238,241,230,0.06)",
                borderRadius: "8px",
              }}
            >
              <a
                href={`/templates/${t.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="relative h-[65%] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      background: t.gradient,
                      backgroundSize: "140% 140%",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <span style={{ ...heading, fontSize: "2.5rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>{t.name.charAt(0)}</span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full" style={{ ...heading, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(0,0,0,0.5)", color: "#c8f542" }}>
                    {t.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                    <span style={{ ...heading, fontSize: "1.1rem", fontWeight: 900, color: "#c8f542" }}>€{t.price}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h3 style={{ ...heading, fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "#eef1e6" }}>{t.name}</h3>
                  <p className="text-xs" style={{ color: "rgba(238,241,230,0.5)", lineHeight: 1.4 }}>{t.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs" style={{ ...heading, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(238,241,230,0.4)" }}>
                    Click to preview <span>↗</span>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 px-8 md:hidden">
        <Link href="/marketplace" data-cursor style={{ display: "block", textAlign: "center", ...heading, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem", borderRadius: "100px", border: "1px solid rgba(200,245,66,0.3)", color: "#c8f542", textDecoration: "none" }}>
          View all templates
        </Link>
      </div>
    </section>
  );
}