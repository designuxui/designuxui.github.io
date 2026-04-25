"use client";
import { useRef, useState } from "react";

const CLIENTS = [
  "SaaS Platform",
  "Fintech Co.",
  "eCommerce Brand",
  "B2B Agency",
  "Health Startup",
  "Scale-up",
  "Creative Studio",
  "PropTech",
  "EdTech",
  "MarTech",
  "Logistics Co.",
  "VC-backed SaaS",
];

const PHOTO_COLORS = [
  "#d4cfc6",
  "#c8c3ba",
  "#ddd9cf",
  "#cdc9bf",
  "#d8d4ca",
  "#c4bfb5",
  "#e0dbd0",
  "#ccc8be",
  "#d0ccc2",
  "#c6c2b8",
  "#dad6cc",
  "#cac6bc",
];

export default function Clients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [photoTop, setPhotoTop] = useState(0);

  const handleHover = (index: number) => {
    const item = itemRefs.current[index];
    const parent = containerRef.current;
    if (!item || !parent) return;
    setHoveredIndex(index);
    setPhotoTop(item.offsetTop);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        background: "#f5f0e8",
        borderTop: "1px solid rgba(10,10,10,0.08)",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
        padding: "4rem 0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "rgba(10,10,10,0.35)",
          marginBottom: "2rem",
        }}>
          The brands that bet on us
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", margin: "0 -2rem" }}>
          {CLIENTS.map((client, index) => (
            <div
              key={client}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
              style={{
                width: "50%",
                padding: "1.2rem 2rem",
                borderBottom: "1px solid rgba(10,10,10,0.08)",
                borderRight: index % 2 === 0 ? "1px solid rgba(10,10,10,0.08)" : "none",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-unbounded)",
                  fontSize: "1rem",
                  color: hoveredIndex === index ? "#0a0a0a" : "rgba(10,10,10,0.6)",
                  transition: "color 0.2s ease",
                  display: "block",
                  cursor: "pointer",
                }}
              >
                {client}
              </span>
            </div>
          ))}
        </div>

        {hoveredIndex !== null && (
          <div
            style={{
              position: "absolute",
              top: photoTop + 32,
              left: "calc(50% + 3rem)",
              width: "180px",
              height: "240px",
              borderRadius: "18px",
              background: PHOTO_COLORS[hoveredIndex % PHOTO_COLORS.length],
              boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </section>
  );
}
