"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const overCursor = useRef(false);

  useLayoutEffect(() => {
    const mm = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mm.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("magnetic-cursor");
    return () => {
      document.documentElement.classList.remove("magnetic-cursor");
    };
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set(ring, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      xPercent: -50,
      yPercent: -50,
    });

    const onMove = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      overCursor.current = Boolean(t?.closest?.("[data-cursor]"));

      const size = overCursor.current ? 48 : 8;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(ring, {
        opacity: overCursor.current ? 0 : 1,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(200, 245, 66, 0.4)",
          willChange: "transform, opacity",
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--acc)",
          willChange: "transform, width, height",
        }}
        aria-hidden
      />
    </>
  );
}
