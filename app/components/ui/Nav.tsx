"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN"|"PL">("EN");

  useEffect(() => {
    gsap.set(navRef.current, { opacity: 0, y: -20 });
    gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" });
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#services", label: "Services" },
    { href: "/#cases", label: "Work" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
    { href: "/marketplace", label: "Marketplace" },
  ];

  return (
    <>
      <nav ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-5"
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled ? "rgba(8,7,6,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(238,241,230,0.06)" : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s",
          opacity: 0,
        }}>

        {/* Logo with slide-up hover */}
        <Link href="/" className="nav-logo" style={{ textDecoration: "none", position: "relative", display: "inline-block", overflow: "hidden", height: "1.3em" }}>
          <span className="nav-logo-a" style={{ fontFamily: "var(--font-unbounded)", fontSize: "1rem", fontWeight: 900, letterSpacing: "0.18em", color: "var(--fg)", display: "block", transition: "transform 0.4s cubic-bezier(0.76,0,0.24,1)" }}>
            BRIDGE<span style={{ color: "var(--acc)" }}>.</span>
          </span>
          <span className="nav-logo-b" style={{ fontFamily: "var(--font-unbounded)", fontSize: "1rem", fontWeight: 900, letterSpacing: "0.18em", color: "var(--acc)", display: "block", position: "absolute", top: "100%", left: 0, transition: "transform 0.4s cubic-bezier(0.76,0,0.24,1)" }}>
            BRIDGE<span style={{ color: "var(--fg)" }}>.</span>
          </span>
        </Link>

        {/* Desktop nav links with slide-up hover */}
        <ul className="hidden md:flex gap-9 list-none">
          {links.map((link) => (
            <li key={link.href} style={{ overflow: "hidden", height: "1.2em" }}>
              <Link href={link.href} className="nav-item" style={{ textDecoration: "none", display: "block" }}>
                <span className="nav-item-a" style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--dim)", display: "block", transition: "transform 0.35s cubic-bezier(0.76,0,0.24,1), color 0.2s" }}>
                  {link.label}
                </span>
                <span className="nav-item-b" style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--acc)", display: "block", position: "absolute", transform: "translateY(0)", transition: "transform 0.35s cubic-bezier(0.76,0,0.24,1)" }}>
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Available + Lang switcher */}
        <div className="hidden md:flex items-center gap-4">
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--acc)", fontFamily: "var(--font-unbounded)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--acc)", display: "inline-block", animation: "pulse 2.2s ease infinite" }} />
            Open to work
          </div>
          {/* Language switcher */}
          <div style={{ display: "flex", border: "1px solid rgba(238,241,230,0.12)", borderRadius: 4, overflow: "hidden" }}>
            {(["EN","PL"] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.58rem", fontWeight: 400, letterSpacing: "0.1em", padding: "0.4rem 0.8rem", background: lang === l ? "var(--acc)" : "transparent", color: lang === l ? "var(--bg)" : "var(--dim)", border: "none", cursor: "pointer", transition: "all 0.18s" }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Burger */}
        <button className="md:hidden flex flex-col justify-between w-7 h-5 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {[0,1,2].map(i => (
            <span key={i} style={{ width: "100%", height: 2, background: "var(--fg)", display: "block", transition: "transform 0.25s, opacity 0.25s",
              transform: menuOpen && i === 0 ? "translateY(9px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-9px) rotate(-45deg)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8" style={{ background: "var(--bg)" }}>
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-unbounded)", fontSize: "1.4rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg)", textDecoration: "none" }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.9);opacity:0.35} }
        .nav-logo:hover .nav-logo-a { transform: translateY(-100%); }
        .nav-logo:hover .nav-logo-b { transform: translateY(-100%); }
        .nav-item:hover .nav-item-a { transform: translateY(-100%); color: var(--acc); }
        .nav-item { position: relative; }
        .nav-item-b { top: 100%; left: 0; position: absolute; }
        .nav-item:hover .nav-item-b { transform: translateY(-100%); }
      `}</style>
    </>
  );
}
