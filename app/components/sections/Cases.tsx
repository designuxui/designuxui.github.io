"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { batchReveal } from "../ui/ScrollBatch";
import ProximityCard from "../ui/ProximityCard";
import AnimatedText from "../ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const CASES = [
  { name: "SaaS onboarding", metric: "+40%", detail: "Streamlined signup and activation for a B2B analytics product." },
  { name: "E‑commerce funnel", metric: "3x", detail: "Category navigation and checkout experiments over two quarters." },
  { name: "B2B pipeline", metric: "2x", detail: "CRM hygiene, sequences, and marketing-to-sales alignment." },
] as const;

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const cards = gsap.utils.toArray<HTMLElement>(".case-card");

    const ctx = gsap.context(() => {
      batchReveal(section, {
        selector: ".case-card",
        start: "top 85%",
        distance: 40,
        duration: 0.8,
        stagger: 0.08,
        batchMax: 5,
      });

      const scrollAmount = () => Math.max(track.scrollWidth - window.innerWidth + 128, 1);

      const tween = gsap.to(track, {
        x: () => -scrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${scrollAmount()}`,
        pin: pin,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tween,
        onUpdate: () => {
          const vw = window.innerWidth * 0.5;
          cards.forEach((card) => {
            const r = card.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const n = (cx - vw) / Math.max(vw, 1);
            gsap.set(card, { transformPerspective: 1000, rotationY: gsap.utils.clamp(-10, 10, -n * 10) });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 10% 80%, rgba(255,60,0,0.12) 0%, transparent 50%)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0" style={{ width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,60,0,0.08) 0%, transparent 60%)", filter: "blur(50px)" }} />
      <div ref={pinRef} className="flex h-[100dvh] flex-col justify-center overflow-hidden" style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
        <header className="mb-10 shrink-0">
          <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-unbounded)", color: "var(--acc)" }}>
            Selected work
          </p>
          <AnimatedText
            text="Case studies"
            split="words"
            delay={0.1}
            style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 900,
              lineHeight: "tight",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "var(--fg)",
            }}
          />
        </header>
        <div className="min-h-0 flex-1 overflow-hidden" style={{ perspective: "1200px" }}>
          <div ref={trackRef} className="flex h-full items-stretch gap-10 pr-16 will-change-transform">
            {CASES.map((c) => (
              <ProximityCard
                key={c.name}
                glowColor="rgba(200,245,66,0.2)"
                className="case-card flex shrink-0 flex-col justify-between border"
                style={{
                  width: "min(78vw, 440px)",
                  borderColor: "var(--line)",
                  background: "var(--card)",
                  borderRadius: "4px",
                  padding: "2.5rem",
                  transformStyle: "preserve-3d",
                }}
              >
                <div>
                  <p className="mb-4 text-[clamp(3rem,8vw,5rem)] font-black leading-none tracking-[-0.05em]" style={{ fontFamily: "var(--font-unbounded)", color: "var(--acc)" }}>
                    {c.metric}
                  </p>
                  <h3 className="mb-4 text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-unbounded)", color: "var(--fg)" }}>
                    {c.name}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--dim)" }}>
                    {c.detail}
                  </p>
                </div>
                <span className="mt-10 text-[0.62rem] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--font-unbounded)", color: "var(--acc)" }}>
                  Scroll →
                </span>
              </ProximityCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
