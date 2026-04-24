"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { batchReveal } from "../ui/ScrollBatch";
gsap.registerPlugin(ScrollTrigger);

const items = ["UX Strategy","Product Strategy","Conversion Optimization","B2B Sales Systems","CRM Setup","Funnel Design","UX Audit","SaaS Growth"];

export default function Ticker() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!wrap || !row1 || !row2) return;

    const ctx = gsap.context(() => {
      batchReveal(wrap, {
        selector: ".ticker-row",
        start: "top 95%",
        distance: 30,
        duration: 1,
        ease: "power3.out",
        batchMax: 1,
      });
    }, wrap);

    // Row 1 goes right, Row 2 goes left — Effect 046 style
    const tween1 = gsap.to(row1, { xPercent: -50, ease: "none", duration: 22, repeat: -1 });
    const tween2 = gsap.to(row2, { xPercent: 50, ease: "none", duration: 28, repeat: -1 });

    // Speed up on scroll down, slow down on scroll up
    let lastY = 0;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      const speed = 1 + Math.abs(dy) * 0.04;
      gsap.to(tween1, { timeScale: dy > 0 ? speed : -speed * 0.5, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      gsap.to(tween2, { timeScale: dy > 0 ? speed : -speed * 0.5, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      setTimeout(() => {
        gsap.to([tween1, tween2], { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: "auto" });
      }, 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      tween1.kill(); tween2.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const renderItems = (accent = false) =>
    [...items, ...items].map((item, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: "2.5rem", padding: "0 2.5rem" }}>
        <span style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: accent ? "rgba(200,245,66,0.5)" : "var(--dim)", whiteSpace: "nowrap" }}>
          {item}
        </span>
        <span style={{ fontSize: "0.35rem", color: "var(--acc)", opacity: accent ? 1 : 0.5 }}>◆</span>
      </div>
    ));

  return (
    <div ref={wrapRef} style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--bg)", overflow: "hidden", padding: "0.6rem 0" }}>
      {/* Row 1 — goes right */}
      <div ref={row1Ref} className="ticker-row flex w-max" style={{ marginBottom: "0.4rem" }}>
        {renderItems(false)}
      </div>
      {/* Row 2 — goes left, slightly different style */}
      <div ref={row2Ref} className="ticker-row flex w-max" style={{ transform: "translateX(-50%)" }}>
        {renderItems(true)}
      </div>
    </div>
  );
}
