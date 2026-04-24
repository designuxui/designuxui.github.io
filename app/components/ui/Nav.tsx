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

function SlideLink({ href, label, color, onClick }: { href: string; label: string; color: string; onClick?: () => void }) {
  return (
    <li style={{ overflow: "hidden", height: "1.1em", position: "relative" }}>
      <Link
        href={href}
        onClick={onClick}
        style={{ textDecoration: "none", display: "block", position: "relative" }}
        onMouseEnter={(e) => {
          const a = (e.currentTarget as HTMLElement).querySelector(".la") as HTMLElement;
          const b = (e.currentTarget as HTMLElement).querySelector(".lb") as HTMLElement;
          gsap.to(a, { y: "100%", duration: 0.22, ease: "power3.inOut", color });
          gsap.to(b, { y: "100%", duration: 0.22, ease: "power3.inOut", color });
        }}
        onMouseLeave={(e) => {
          const a = (e.currentTarget as HTMLElement).querySelector(".la") as HTMLElement;
          const b = (e.currentTarget as HTMLElement).querySelector(".lb") as HTMLElement;
          gsap.to(a, { y: "0%", duration: 0.22, ease: "power3.inOut", color });
          gsap.to(b, { y: "0%", duration: 0.22, ease: "power3.inOut", color });
        }}
      >
        <span
          className="la"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color,
            display: "block",
            willChange: "transform",
            transition: "color 0.3s ease",
          }}
        >
          {label}
        </span>
        <span
          className="lb"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color,
            display: "block",
            position: "absolute",
            top: "-100%",
            left: 0,
            willChange: "transform",
            transition: "color 0.3s ease",
          }}
        >
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
  const [isLight, setIsLight] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "PL">("EN");

  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      gsap.set(nav, { opacity: 1, y: -20 });
      gsap.to(nav, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavScrolled(scrollY > 60);

      const heroLight = scrollY < window.innerHeight * 0.9;
      const contactTop = document.getElementById("contact")?.getBoundingClientRect().top;
      const contactLight = typeof contactTop === "number" && contactTop < 100;
      setIsLight(heroLight || contactLight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Burger animation — GSAP
  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    const menu = menuRef.current;
    if (!l1 || !l2 || !l3 || !menu) return;

    if (menuOpen) {
      gsap.to(l1, { y: 9, rotate: 45, duration: 0.35, ease: "power3.inOut" });
      gsap.to(l2, { opacity: 0, scaleX: 0, duration: 0.2, ease: "power3.inOut" });
      gsap.to(l3, { y: -9, rotate: -45, duration: 0.35, ease: "power3.inOut" });
      gsap.fromTo(menu, { opacity: 0, y: -32 }, { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" });
      const links = menu.querySelectorAll(".mobile-link");
      gsap.fromTo(
        links,
        { opacity: 0, y: -18 },
        { opacity: 1, y: 0, duration: 0.32, stagger: 0.06, delay: 0.08, ease: "power3.out" }
      );
    } else {
      gsap.to(l1, { y: 0, rotate: 0, duration: 0.35, ease: "power3.inOut" });
      gsap.to(l2, { opacity: 1, scaleX: 1, duration: 0.25, ease: "power3.inOut" });
      gsap.to(l3, { y: 0, rotate: 0, duration: 0.35, ease: "power3.inOut" });
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const textColor = isLight ? "#1a1a1a" : "var(--fg)";
  const logoAccent = "#c8f542";
  const background = navScrolled
    ? isLight
      ? "rgba(245,240,232,0.92)"
      : "rgba(8,8,8,0.88)"
    : "transparent";
  const backdropFilter = navScrolled ? "blur(14px)" : "none";
  const borderBottom = navScrolled
    ? isLight
      ? "1px solid rgba(26,26,26,0.08)"
      : "1px solid rgba(238,241,230,0.07)"
    : "none";

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12"
        style={{
          top: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background,
          backdropFilter,
          borderBottom,
          transition: "color 0.3s ease, background 0.3s ease, border-bottom 0.3s ease",
          opacity: 1,
        }}
      >

        {/* Logo */}
        <div style={{ overflow: "hidden", height: "1.3em", position: "relative", marginLeft: "10mm" }}>
          <Link
            href="/"
            style={{ textDecoration: "none", display: "block" }}
            onMouseEnter={(e) => {
              const a = (e.currentTarget as HTMLElement).querySelector(".logo-a") as HTMLElement;
              const b = (e.currentTarget as HTMLElement).querySelector(".logo-b") as HTMLElement;
              gsap.to(a, { y: "-100%", duration: 0.4, ease: "power3.inOut" });
              gsap.to(b, { y: "-100%", duration: 0.4, ease: "power3.inOut" });
            }}
            onMouseLeave={(e) => {
              const a = (e.currentTarget as HTMLElement).querySelector(".logo-a") as HTMLElement;
              const b = (e.currentTarget as HTMLElement).querySelector(".logo-b") as HTMLElement;
              gsap.to(a, { y: "0%", duration: 0.4, ease: "power3.inOut" });
              gsap.to(b, { y: "0%", duration: 0.4, ease: "power3.inOut" });
            }}
          >
            <span
              className="logo-a"
              style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "1rem",
                fontWeight: 900,
                letterSpacing: "0.18em",
                color: textColor,
                display: "block",
                willChange: "transform",
                transition: "color 0.3s ease",
              }}
            >
              BRIDGE<span style={{ color: logoAccent }}>.</span>
            </span>
            <span
              className="logo-b"
              style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "1rem",
                fontWeight: 900,
                letterSpacing: "0.18em",
                color: textColor,
                display: "block",
                position: "absolute",
                top: "100%",
                left: 0,
                willChange: "transform",
                transition: "color 0.3s ease",
              }}
            >
              BRIDGE<span style={{ color: logoAccent }}>.</span>
            </span>
          </Link>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-9 list-none">
          {LINKS.map((l) => (
            <SlideLink key={l.href} href={l.href} label={l.label} color={textColor} />
          ))}
        </ul>

        {/* Right desktop */}
        <div className="hidden md:flex items-center gap-4">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--acc)", display: "inline-block" }} />
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: textColor,
                fontFamily: "var(--font-unbounded)",
                transition: "color 0.3s ease",
              }}
            >
              Open to work
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {(["EN", "PL"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontFamily: "var(--font-unbounded)",
                  fontSize: "0.58rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  background: "transparent",
                  color: textColor,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#c8f542",
              color: "#080808",
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "0.4rem 1rem",
              borderRadius: 100,
              textDecoration: "none",
            }}
          >
            Start a project
          </Link>
        </div>

        {/* Burger — GSAP animated */}
        <button
          className="md:hidden flex flex-col justify-between bg-transparent border-none cursor-pointer p-1"
          style={{ width: 28, height: 20 }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            ref={line1Ref}
            style={{
              width: "100%",
              height: 2,
              background: textColor,
              display: "block",
              transformOrigin: "center",
              willChange: "transform",
              transition: "background 0.3s ease",
            }}
          />
          <span
            ref={line2Ref}
            style={{
              width: "100%",
              height: 2,
              background: textColor,
              display: "block",
              transformOrigin: "center",
              willChange: "transform",
              transition: "background 0.3s ease",
            }}
          />
          <span
            ref={line3Ref}
            style={{
              width: "100%",
              height: 2,
              background: textColor,
              display: "block",
              transformOrigin: "center",
              willChange: "transform",
              transition: "background 0.3s ease",
            }}
          />
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
                onMouseEnter={e => gsap.to(e.currentTarget, { color: "var(--fg)", duration: 0.2 })}
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
                style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.7rem", letterSpacing: "0.12em", padding: "0.5rem 1.2rem", background: "transparent", color: "var(--bg)", border: "none", borderRadius: 4, cursor: "pointer" }}>
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