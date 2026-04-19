"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    name: "Atlas",
    tag: "SaaS",
    price: 89,
    gradient: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #c8f542 100%)",
  },
  {
    name: "Meridian",
    tag: "Portfolio",
    price: 69,
    gradient: "linear-gradient(135deg, #1a0a28 0%, #3d1a5c 50%, #c8f542 100%)",
  },
  {
    name: "North",
    tag: "Agency",
    price: 119,
    gradient: "linear-gradient(135deg, #0a1a14 0%, #1a3d2a 50%, #c8f542 100%)",
  },
] as const;

const heading: React.CSSProperties = { fontFamily: "var(--font-unbounded)" };

export default function MarketplacePreview() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set(root.querySelectorAll(".mp-card"), { y: 48, opacity: 0 });
      gsap.to(root.querySelectorAll(".mp-card"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="marketplace-preview"
      style={{
        padding: "7rem 4rem",
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p
            className="mb-4"
            style={{
              ...heading,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--acc)",
            }}
          >
            Marketplace
          </p>
          <h2
            className="max-w-xl"
            style={{
              ...heading,
              fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Templates built to launch
          </h2>
        </div>
        <Link
          href="/marketplace"
          data-cursor
          style={{
            ...heading,
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.75rem 1.6rem",
            borderRadius: "100px",
            border: "1px solid var(--acc)",
            color: "var(--acc)",
            textDecoration: "none",
            transition: "background 0.25s, color 0.25s",
          }}
        >
          View marketplace
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {CARDS.map((t) => (
          <article
            key={t.name}
            className="mp-card group relative overflow-hidden rounded-sm border transition-transform duration-500 ease-out hover:-translate-y-[8px]"
            style={{ borderColor: "var(--line)", background: "var(--card)" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div
                className="mp-grad h-full w-full bg-[length:140%_140%] transition-[background-position,transform] duration-700 ease-out group-hover:bg-[position:80%_40%] group-hover:scale-105"
                style={{ backgroundImage: t.gradient }}
              />
              <div
                className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                }}
              >
                <span style={{ ...heading, fontSize: "1.75rem", fontWeight: 900, color: "var(--acc)" }}>€{t.price}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 style={{ ...heading, fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>{t.name}</h3>
              <p className="text-sm" style={{ color: "var(--dim)" }}>
                {t.tag}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
