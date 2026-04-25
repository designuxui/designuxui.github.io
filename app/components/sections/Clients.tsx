"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CLIENTS = [
  "SaaS Platform", "Fintech Co.", "eCommerce Brand", "B2B Agency",
  "Health Startup", "Scale-up", "Creative Studio", "PropTech",
  "EdTech", "MarTech", "Logistics Co.", "VC-backed SaaS",
];

export default function Clients() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;
    if (!r1 || !r2) return;

    const w1 = r1.scrollWidth / 2;
    const w2 = r2.scrollWidth / 2;

    gsap.to(r1, { x: -w1, duration: 22, ease: "none", repeat: -1 });
    gsap.to(r2, { x: w2 / 2 - w2, duration: 28, ease: "none", repeat: -1 });

    return () => {
      gsap.killTweensOf(r1);
      gsap.killTweensOf(r2);
    };
  }, []);

  return (
    <section style={{
      background: "#f5f0e8",
      borderTop: "1px solid rgba(10,10,10,0.08)",
      borderBottom: "1px solid rgba(10,10,10,0.08)",
      padding: "4rem 0",
      overflow: "hidden",
    }}>
      <p style={{
        fontFamily: "var(--font-unbounded)",
        fontSize: "0.6rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(10,10,10,0.35)",
        textAlign: "center",
        marginBottom: "2.5rem",
      }}>
        Brands that bet on us
      </p>

      {/* Row 1 — left scroll */}
      <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
        <div ref={row1Ref} style={{ display: "flex", width: "max-content" }}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              padding: "0 2rem",
            }}>
              {/* Placeholder logo block */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 1.5rem",
                border: "1px solid rgba(10,10,10,0.12)",
                borderRadius: "2px",
                background: "rgba(10,10,10,0.03)",
                whiteSpace: "nowrap",
              }}>
                {/* Placeholder logo square */}
                <div style={{
                  width: "20px",
                  height: "20px",
                  background: "rgba(10,10,10,0.12)",
                  borderRadius: "2px",
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "var(--font-unbounded)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,10,0.45)",
                }}>
                  {c}
                </span>
              </div>
              <span style={{ fontSize: "0.4rem", color: "#c8f542", opacity: 0.6 }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div style={{ overflow: "hidden" }}>
        <div ref={row2Ref} style={{ display: "flex", width: "max-content" }}>
          {[...CLIENTS.slice(6), ...CLIENTS, ...CLIENTS.slice(0, 6)].map((c, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              padding: "0 2rem",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 1.5rem",
                border: "1px solid rgba(10,10,10,0.08)",
                borderRadius: "2px",
                whiteSpace: "nowrap",
              }}>
                <div style={{
                  width: "20px",
                  height: "20px",
                  background: "rgba(10,10,10,0.08)",
                  borderRadius: "50%",
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "var(--font-unbounded)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,10,0.3)",
                }}>
                  {c}
                </span>
              </div>
              <span style={{ fontSize: "0.4rem", color: "rgba(10,10,10,0.2)" }}>◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}