"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { batchReveal } from "../ui/ScrollBatch";

gsap.registerPlugin(ScrollTrigger);

const TEMPLATES = [
  { name: "Atlas", tag: "SaaS", price: 89 },
  { name: "Meridian", tag: "Portfolio", price: 69 },
  { name: "North", tag: "Agency", price: 79 },
  { name: "Kite", tag: "eCommerce", price: 99 },
  { name: "Signal", tag: "B2B", price: 94 },
  { name: "Lumen", tag: "Landing", price: 59 },
] as const;

export default function Marketplace() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      batchReveal(root, {
        selector: ".market-card",
        start: "top 82%",
        distance: 72,
        duration: 0.85,
        stagger: 0.1,
        batchMax: 6,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const heading: React.CSSProperties = {
    fontFamily: "var(--font-unbounded)",
  };

  return (
    <section
      ref={rootRef}
      id="marketplace"
      style={{
        padding: "7rem 4rem",
        background: "#080706",
        color: "#ede9e0",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <p
        className="mb-4"
        style={{
          ...heading,
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#ff3c00",
        }}
      >
        Marketplace
      </p>
      <h2
        className="mb-14 max-w-xl"
        style={{
          ...heading,
          fontWeight: 900,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        Website templates — Stripe-ready checkout placeholders
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <article
            key={t.name}
            className="market-card group relative overflow-hidden rounded-sm border opacity-0"
            style={{ borderColor: "rgba(237, 233, 224, 0.09)", background: "rgba(237, 233, 224, 0.03)", perspective: "900px" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div
                className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                style={{
                  background: `linear-gradient(145deg, rgba(200,245,66,0.15) 0%, rgba(8,7,6,1) 42%, rgba(237,233,224,0.08) 100%)`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:pointer-events-auto group-hover:opacity-100"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 45%, transparent 100%)",
                }}
              >
                <span style={{ ...heading, fontSize: "1.75rem", fontWeight: 900, color: "#ff3c00" }}>€{t.price}</span>
                <button
                  type="button"
                  data-cursor-hover
                  className="mt-4 w-max cursor-pointer border-none font-bold uppercase tracking-[0.1em] transition-opacity hover:opacity-90"
                  style={{
                    ...heading,
                    fontSize: "0.68rem",
                    padding: "0.65rem 1.4rem",
                    borderRadius: "100px",
                    background: "#ff3c00",
                    color: "#080706",
                  }}
                  onClick={() => {}}
                >
                  Buy now
                </button>
                <span className="mt-2 text-xs" style={{ color: "rgba(237,233,224,0.55)" }}>
                  Stripe placeholder — connect Price ID
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <h3 style={{ ...heading, fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>{t.name}</h3>
                <p className="text-sm" style={{ color: "rgba(237,233,224,0.55)" }}>
                  {t.tag} template
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
