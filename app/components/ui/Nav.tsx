"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#cases", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/marketplace", label: "Marketplace" },
];

function SlideLink({ href, label }: { href: string; label: string }) {
  return (
    <li style={{ overflow: "hidden", height: "1.1em", position: "relative" }}>
      <Link href={href}
        style={{ textDecoration: "none", display: "block", position: "relative" }}
        onMouseEnter={e => {
          const a = (e.currentTarget as HTMLElement).querySelector(".la") as HTMLElement;
          const b = (e.currentTarget as HTMLElement).querySelector(".lb") as HTMLElement;
          gsap.to(a, { y: "-100%", duration: 0.35, ease: "power3.inOut" });
          gsap.to(b, { y: "-100%", duration: 0.35, ease: "power3.inOut" });
        }}
        onMouseLeave={e => {
          const a = (e.currentTarget as HTMLElement).querySelector(".la") as HTMLElement;
          const b = (e.currentTarget as HTMLElement).querySelector(".lb") as HTMLElement;
          gsap.to(a, { y: "0%", duration: 0.35, ease: "power3.inOut" });
          gsap.to(b, { y: "0%", duration: 0.35, ease: "power3.inOut" });
        }}>
        <span className="la" style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--dim)", display: "block", willChange: "transform" }}>
          {label}
        </span>
        <span className="lb" style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--acc)", display: "block", position: "absolute", top: "100%", left: 0, willChange: "transform" }}>
          {label}
        </span>
      </Link>
    </li>
  );
}

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "PL">("EN");

  useEffect(() => {
    gsap.set(navRef.current, { opacity: 0, y: -20 });
    gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" });
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        {/* Logo — slide up on hover */}
        <div style={{ overflow: "hidden", height: "1.3em", position: "relative" }}>
          <Link href="/"
            style={{ textDecoration: "none", display: "block" }}
            onMouseEnter={e => {
              const a = (e.currentTarget as HTMLElement).querySelector(".logo-a") as HTMLElement;
              const b = (e.currentTarget as HTMLElement).querySelector(".logo-b") as HTMLElement;
              gsap.to(a, { y: "-100%", duration: 0.4, ease: "power3.inOut" });
              gsap.to(b, { y: "-100%", duration: 0.4, ease: "power3.inOut" });
            }}
            onMouseLeave={e => {
              const a = (e.currentTarget as HTMLElement).querySelector(".logo-a") as HTMLElement;
              const b = (e.currentTarget as HTMLElement).querySelector(".logo-b") as HTMLElement;
              gsap.to(a, { y: "0%", duration: 0.4, ease: "power3.inOut" });
              gsap.to(b, { y: "0%", duration: 0.4, ease: "power3.inOut" });
            }}>
            <span className="logo-a" style={{ fontFamily: "var(--font-unbounded)", fontSize: "1rem", fontWeight: 900, letterSpacing: "0.18em", color: "var(--fg)", display: "block", willChange: "transform" }}>
              BRIDGE<span style={{ color: "var(--acc)" }}>.</span>
            </span>
            <span className="logo-b" style={{ fontFamily: "var(--font-unbounded)", fontSize: "1rem", fontWeight: 900, letterSpacing: "0.18em", color: "var(--acc)", display: "block", position: "absolute", top: "100%", left: 0, willChange: "transform" }}>
              BRIDGE<span style={{ color: "var(--fg)" }}>.</span>
            </span>
          </Link>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-9 list-none">
          {LINKS.map(l => <SlideLink key={l.href} href={l.href} label={l.label} />)}
        </ul>

        {/* Right: Open to work + lang */}
        <div className="hidden md:flex items-center gap-4">
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--acc)", fontFamily: "var(--font-unbounded)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--acc)", display: "inline-block", animation: "pulse 2.2s ease infinite" }} />
            Open to work
          </div>
          <div style={{ display: "flex", border: "1px solid rgba(238,241,230,0.12)", borderRadius: 4, overflow: "hidden" }}>
            {(["EN", "PL"] as const).map(l => (
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
          {[0, 1, 2].map(i => (
            <span key={i} style={{ width: "100%", height: 2, background: "var(--fg)", display: "block", transition: "transform 0.25s, opacity 0.25s",
              transform: menuOpen && i === 0 ? "translateY(9px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-9px) rotate(-45deg)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8" style={{ background: "var(--bg)" }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-unbounded)", fontSize: "1.4rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg)", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.9);opacity:0.35} }
      `}</style>
    </>
  );
}
