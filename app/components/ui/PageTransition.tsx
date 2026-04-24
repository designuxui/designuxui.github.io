"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps page content to provide smooth fade-in transitions.
 * Automatically animates when route changes.
 */
export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current || !overlayRef.current) return;

    const isMarketplace = pathname.startsWith("/marketplace");
    const tl = gsap.timeline();

    gsap.set(ref.current, { opacity: 0, y: isMarketplace ? 24 : 16 });
    gsap.set(overlayRef.current, {
      xPercent: isMarketplace ? 100 : 0,
      opacity: 1,
      scaleY: 1,
    });

    if (isMarketplace) {
      tl.to(overlayRef.current, {
        xPercent: 0,
        duration: 0.45,
        ease: "power4.out",
      })
        .to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        }, "-=0.2")
        .to(overlayRef.current, {
          xPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        }, "-=0.35");
    } else {
      tl.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
        }, "-=0.5");
    }
  }, [pathname]);

  return (
    <div ref={ref} className={className} style={{ position: "relative" }}>
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1000,
          pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(200,245,66,0.14), rgba(255,255,255,0.04) 55%, rgba(10,10,10,0.1))",
          transformOrigin: "left center",
        }}
      />
      {children}
    </div>
  );
}
