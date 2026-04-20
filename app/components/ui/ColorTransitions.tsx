"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Section color map: [background, text, accent-dim]
const SECTIONS: Record<string, { bg: string; fg: string; navBg: string }> = {
  hero:                { bg: "#0a0a0a", fg: "#ede9e0", navBg: "rgba(10,10,10,0.0)" },
  ticker:              { bg: "#0a0a0a", fg: "#ede9e0", navBg: "rgba(10,10,10,0.88)" },
  results:             { bg: "#f5f2eb", fg: "#0a0a0a", navBg: "rgba(245,242,235,0.92)" },
  services:            { bg: "#0a0a0a", fg: "#ede9e0", navBg: "rgba(10,10,10,0.88)" },
  cases:               { bg: "#0a0a0a", fg: "#ede9e0", navBg: "rgba(10,10,10,0.88)" },
  "marketplace-preview":{ bg: "#f5f2eb", fg: "#0a0a0a", navBg: "rgba(245,242,235,0.92)" },
  about:               { bg: "#0a0a0a", fg: "#ede9e0", navBg: "rgba(10,10,10,0.88)" },
  contact:             { bg: "#f5f2eb", fg: "#0a0a0a", navBg: "rgba(245,242,235,0.92)" },
};

export default function ColorTransitions() {
  useEffect(() => {
    const nav = document.querySelector("nav") as HTMLElement | null;

    const triggers: ScrollTrigger[] = [];

    Object.entries(SECTIONS).forEach(([id, colors]) => {
      const el = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
      if (!el) return;

      const t = ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => transition(colors, nav),
        onEnterBack: () => transition(colors, nav),
      });
      triggers.push(t);
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return null;
}

function transition(
  colors: { bg: string; fg: string; navBg: string },
  nav: HTMLElement | null
) {
  gsap.to(document.body, {
    backgroundColor: colors.bg,
    color: colors.fg,
    duration: 0.7,
    ease: "power2.inOut",
    overwrite: "auto",
  });

  if (nav) {
    const isScrolled = window.scrollY > 60;
    if (isScrolled) {
      gsap.to(nav, {
        backgroundColor: colors.navBg,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  }
}