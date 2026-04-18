"use client";

export default function Ticker() {
  const items = [
    "UX Strategy",
    "Product Strategy",
    "Conversion Optimization",
    "B2B Sales Systems",
    "CRM Setup",
    "Funnel Design",
    "UX Audit",
    "SaaS Growth",
  ];

  return (
    <div
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "0.8rem 0",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "tick 24s linear infinite",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3rem",
              padding: "0 3rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 300,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--dim)",
              }}
            >
              {item}
            </span>
            <span style={{ fontSize: "0.4rem", color: "var(--acc)" }}>◆</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes tick {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}