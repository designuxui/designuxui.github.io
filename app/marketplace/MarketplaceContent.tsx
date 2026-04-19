"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
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
  const heroRef = useRef<HTMLElement>(null);
  const heroEyebrowRef = useRef<HTMLParagraphElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const filterChangeRef = useRef(false);

  const filtered = useMemo(() => {
    if (filter === "All") return [...TEMPLATES];
    return TEMPLATES.filter((t) => t.category === filter);
  }, [filter]);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const eyebrow = heroEyebrowRef.current;
    const title = heroTitleRef.current;
    const sub = heroSubRef.current;
    if (!hero || !eyebrow || !title || !sub) return;

    gsap.set([eyebrow, title, sub], { opacity: 0, y: 28 });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.55 }, 0.1);
    tl.to(title, { opacity: 1, y: 0, duration: 0.75 }, 0.2);
    tl.to(sub, { opacity: 1, y: 0, duration: 0.65 }, 0.35);

    return () => {
      tl.kill();
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const tabs = tabsRef.current;
    const grid = gridRef.current;
    if (!root || !tabs || !grid) return;

    const ctx = gsap.context(() => {
      const tabButtons = tabs.querySelectorAll("button");
      gsap.set(tabButtons, { opacity: 0, y: 16 });
      gsap.to(tabButtons, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tabs,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      const cards = grid.querySelectorAll(".marketplace-card");
      gsap.set(cards, { y: 56, opacity: 0, rotateX: -6 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.75,
        stagger: { each: 0.09, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top bottom",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!filterChangeRef.current) {
      filterChangeRef.current = true;
      return;
    }
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".marketplace-card");
    gsap.set(cards, { opacity: 0, y: 36 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.07,
      ease: "power3.out",
    });
  }, [filter]);

  return (
    <div ref={rootRef} style={{ background: "#080706", color: "#ede9e0", fontFamily: "var(--font-dm-sans)" }}>
      <section
        ref={heroRef}
        style={{
          paddingTop: "8rem",
          paddingBottom: "4rem",
          paddingLeft: "4rem",
          paddingRight: "4rem",
          borderBottom: "1px solid rgba(237, 233, 224, 0.09)",
        }}
      >
        <p
          ref={heroEyebrowRef}
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
          ref={heroTitleRef}
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
          ref={heroSubRef}
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            lineHeight: 1.6,
            color: "rgba(237, 233, 224, 0.72)",
            maxWidth: "36rem",
            marginBottom: "2rem",
          }}
        >
          Ready-made sites you can launch fast—structured sections, sensible typography, and space to plug in your
          product story. Pick a template, connect Stripe, and ship.
        </p>
        <Link
          href="/"
          style={{
            ...headingFont,
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#c8f542",
            textDecoration: "none",
            borderBottom: "1px solid rgba(200, 245, 66, 0.35)",
          }}
        >
          ← Back to home
        </Link>
      </section>

      <div ref={tabsRef} className="flex flex-wrap gap-3" style={{ padding: "2rem 4rem 1rem" }}>
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
              border: filter === f ? "1px solid #c8f542" : "1px solid rgba(237, 233, 224, 0.12)",
              background: filter === f ? "rgba(200, 245, 66, 0.12)" : "transparent",
              color: filter === f ? "#c8f542" : "rgba(237, 233, 224, 0.75)",
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        style={{ padding: "2rem 4rem 7rem", perspective: "1200px" }}
      >
        {filtered.map((t) => (
          <article
            key={t.id}
            className="marketplace-card group relative overflow-hidden rounded-sm border"
            style={{
              borderColor: "rgba(237, 233, 224, 0.09)",
              background: "rgba(237, 233, 224, 0.03)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div
                className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                style={{ background: t.gradient }}
              />
              <div
                className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:pointer-events-auto group-hover:opacity-100"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                }}
              >
                <span style={{ ...headingFont, fontSize: "1.85rem", fontWeight: 900, color: "#c8f542" }}>€{t.price}</span>
                <button
                  type="button"
                  data-cursor-hover
                  className="mt-4 w-max cursor-pointer border-none"
                  style={{
                    ...headingFont,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.65rem 1.5rem",
                    borderRadius: "100px",
                    background: "#c8f542",
                    color: "#080706",
                  }}
                >
                  Buy now
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1 p-5">
              <h2 style={{ ...headingFont, fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>{t.name}</h2>
              <p className="text-sm" style={{ color: "rgba(237, 233, 224, 0.55)" }}>
                {t.category} · €{t.price}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
