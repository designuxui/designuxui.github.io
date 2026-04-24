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

function SlideLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <li style={{ overflow: "hidden", height: "1.1em", position: "relative" }}>
      <Link href={href} onClick={onClick}
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
  const menuRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
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

  // Burger animation — GSAP
  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    const menu = menuRef.current;
    if (!l1 || !l2 || !l3 || !menu) return;

    if (menuOpen) {
      // Lines → X
      gsap.to(l1, { y: 9, rotate: 45, duration: 0.35, ease: "power3.inOut" });
      gsap.to(l2, { opacity: 0, scaleX: 0, duration: 0.2, ease: "power3.inOut" });
      gsap.to(l3, { y: -9, rotate: -45, duration: 0.35, ease: "power3.inOut" });
      // Menu slide in
      gsap.fromTo(menu,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      // Links stagger
      const links = menu.querySelectorAll(".mobile-link");
      gsap.fromTo(links,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, delay: 0.15, ease: "power3.out" }
      );
    } else {
      // X → Lines
      gsap.to(l1, { y: 0, rotate: 0, duration: 0.35, ease: "power3.inOut" });
      gsap.to(l2, { opacity: 1, scaleX: 1, duration: 0.25, ease: "power3.inOut" });
      gsap.to(l3, { y: 0, rotate: 0, duration: 0.35, ease: "power3.inOut" });
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-5"
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          background: scrolled ? "rgba(8,7,6,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(238,241,230,0.06)" : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s",
          opacity: 0,
        }}>

        {/* Logo */}
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

        {/* Right desktop */}
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

        {/* Burger — GSAP animated */}
        <button
          className="md:hidden flex flex-col justify-between bg-transparent border-none cursor-pointer p-1"
          style={{ width: 28, height: 20 }}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span ref={line1Ref} style={{ width: "100%", height: 2, background: "var(--fg)", display: "block", transformOrigin: "center", willChange: "transform" }} />
          <span ref={line2Ref} style={{ width: "100%", height: 2, background: "var(--fg)", display: "block", transformOrigin: "center", willChange: "transform" }} />
          <span ref={line3Ref} style={{ width: "100%", height: 2, background: "var(--fg)", display: "block", transformOrigin: "center", willChange: "transform" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-10"
          style={{ background: "rgba(8,7,6,0.97)", backdropFilter: "blur(20px)" }}
        >
          {/* Logo in menu */}
          <div style={{ position: "absolute", top: "1.4rem", left: "1.5rem" }}>
            <span style={{ fontFamily: "var(--font-unbounded)", fontSize: "1rem", fontWeight: 900, letterSpacing: "0.18em", color: "var(--fg)" }}>
              BRIDGE<span style={{ color: "var(--acc)" }}>.</span>
            </span>
          </div>

          {LINKS.map(l => (
            <div key={l.href} className="mobile-link" style={{ overflow: "hidden", opacity: 0 }}>
              <Link
                href={l.href}
                onClick={closeMenu}
                style={{ fontFamily: "var(--font-unbounded)", fontSize: "clamp(1.4rem, 8vw, 2rem)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg)", textDecoration: "none", display: "block" }}
                onMouseEnter={e => gsap.to(e.currentTarget, { color: "var(--acc)", duration: 0.2 })}
                onMouseLeave={e => gsap.to(e.currentTarget, { color: "var(--fg)", duration: 0.2 })}
              >
                {l.label}
              </Link>
            </div>
          ))}

          {/* Lang switcher in menu */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            {(["EN", "PL"] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.7rem", letterSpacing: "0.12em", padding: "0.5rem 1.2rem", background: lang === l ? "var(--acc)" : "transparent", color: lang === l ? "var(--bg)" : "var(--dim)", border: `1px solid ${lang === l ? "var(--acc)" : "rgba(238,241,230,0.2)"}`, borderRadius: 4, cursor: "pointer" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.9);opacity:0.35} }
      `}</style>
    </>
  );
}