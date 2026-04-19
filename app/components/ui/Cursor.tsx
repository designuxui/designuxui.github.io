"use client";

import { useLayoutEffect, useRef, useState } from "react";

const SELECTOR = "a[href], button, [data-cursor-hover], input, textarea, select";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, mx: 0, my: 0 });
  const hoverRef = useRef(false);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    const mm = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mm.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");
    return () => {
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest?.(SELECTOR);
      hoverRef.current = Boolean(interactive?.closest("a, button, [data-cursor-hover]"));

      if (interactive) {
        const el = interactive as HTMLElement;
        const r = el.getBoundingClientRect();
        pos.current.mx = r.left + r.width / 2;
        pos.current.my = r.top + r.height / 2;
      } else {
        pos.current.mx = e.clientX;
        pos.current.my = e.clientY;
      }
    };

    const tick = () => {
      const pull = hoverRef.current ? 0.14 : 0;
      const targetX = pos.current.tx + (pos.current.mx - pos.current.tx) * pull;
      const targetY = pos.current.ty + (pos.current.my - pos.current.ty) * pull;

      pos.current.x += (targetX - pos.current.x) * 0.18;
      pos.current.y += (targetY - pos.current.y) * 0.18;

      const scale = hoverRef.current ? 2.35 : 1;
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.transform = `translate3d(${pos.current.tx}px, ${pos.current.ty}px, 0) translate(-50%, -50%) scale(${hoverRef.current ? 1.4 : 1})`;

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(200, 245, 66, 0.45)",
          willChange: "transform",
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--acc)",
          willChange: "transform",
        }}
        aria-hidden
      />
    </>
  );
}
