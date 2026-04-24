"use client";
import { useEffect, useRef } from "react";

interface ProximityCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onHover?: (isHovered: boolean) => void;
  glowColor?: string; // e.g., "rgba(200,245,66,0.15)"
}

/**
 * Card component with mouse proximity effects.
 * - Responds to cursor nearness with scale, glow, and shadow
 * - Smooth animations on hover
 */
export default function ProximityCard({
  children,
  className = "",
  style = {},
  onHover,
  glowColor = "rgba(200,245,66,0.15)",
}: ProximityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      if (animFrame) cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const dx = mouseX - cardCenterX;
        const dy = mouseY - cardCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 200; // Proximity radius
        if (dist < maxDist) {
          const proximity = 1 - dist / maxDist;
          const scale = 1 + proximity * 0.04; // 4% max scale
          const glowOpacity = proximity * 0.4;

          card.style.transform = `scale(${scale}) translateZ(0)`;
          card.style.boxShadow = `0 0 ${30 + proximity * 20}px ${glowColor}`;

          if (onHover && proximity > 0.5) {
            onHover(true);
          }
        } else {
          card.style.transform = "scale(1) translateZ(0)";
          card.style.boxShadow = "0 0 0px transparent";
          if (onHover) {
            onHover(false);
          }
        }
      });
    };

    const onMouseLeave = () => {
      card.style.transform = "scale(1) translateZ(0)";
      card.style.boxShadow = "0 0 0px transparent";
      if (animFrame) cancelAnimationFrame(animFrame);
    };

    window.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [onHover, glowColor]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, box-shadow",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
