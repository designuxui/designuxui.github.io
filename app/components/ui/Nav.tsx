"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: -20 });
    gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" });
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/#services", label: "Services" },
    { href: "/#cases", label: "Work" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-5"
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled ? "rgba(8,7,6,0.88)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        <Link href="/" style={{ fontFamily: "var(--font-unbounded)", fontSize: "1rem", fontWeight: 900, letterSpacing: "0.18em", color: "var(--fg)", textDecoration: "none" }}>
          BRIDGE<span style={{ color: "var(--acc)" }}>.</span>
        </Link>

        <ul className="hidden md:flex gap-9 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--dim)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/marketplace"
              style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--dim)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
            >
              Marketplace
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--acc)", fontFamily: "var(--font-unbounded)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--acc)", display: "inline-block", animation: "pulse 2.2s ease infinite" }} />
            Available
          </div>
          <Link href="/#contact" style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "0.6rem 1.4rem", background: "var(--acc)", color: "var(--bg)", borderRadius: "100px", textDecoration: "none" }}>
            Open to work
          </Link>
        </div>

        <button className="md:hidden flex flex-col justify-between w-7 h-5 bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: "100%", height: 2, background: "var(--fg)", display: "block", transition: "transform 0.25s, opacity 0.25s",
              transform: menuOpen && i === 0 ? "translateY(9px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-9px) rotate(-45deg)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8" style={{ background: "var(--bg)" }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-unbounded)", fontSize: "1.4rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--fg)", textDecoration: "none" }}>
              {link.label}
            </Link>
          ))}
          <Link href="/marketplace" onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "var(--font-unbounded)", fontSize: "1.4rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--fg)", textDecoration: "none" }}>
            Marketplace
          </Link>
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.9); opacity: 0.35; }
        }
      `}</style>
    </>
  );
}
