"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const LINKS = [
  { href: "/#cases", label: "Work," },
  { href: "/#services", label: "Services," },
  { href: "/#about", label: "About," },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

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
      gsap.fromTo(menu, { opacity: 0, y: -28 }, { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" });
    } else {
      gsap.to(l1, { y: 0, rotate: 0, duration: 0.35, ease: "power3.inOut" });
      gsap.to(l2, { opacity: 1, scaleX: 1, duration: 0.25, ease: "power3.inOut" });
      gsap.to(l3, { y: 0, rotate: 0, duration: 0.35, ease: "power3.inOut" });
    }
  }, [menuOpen]);

  const textColor = "#0a0a0a";

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 flex items-center justify-between"
        style={{
          top: 0,
          padding: "1.2rem 2rem",
          background: "transparent",
          backdropFilter: "none",
          borderBottom: "none",
          color: textColor,
          position: "fixed",
          width: "100%",
          zIndex: 50,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 900,
            fontSize: "1rem",
            color: textColor,
            textDecoration: "none",
          }}
        >
          BRIDGE.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.7rem",
                letterSpacing: "0",
                textTransform: "none",
                color: textColor,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              className="hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="#contact"
            style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0",
              textTransform: "none",
              color: textColor,
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            className="hover:underline"
          >
            Create with us
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col justify-between bg-transparent border-none p-1"
          style={{ width: 28, height: 20, cursor: "pointer" }}
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
              transition: "background 0.2s ease",
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
              transition: "background 0.2s ease",
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
              transition: "background 0.2s ease",
            }}
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col items-start gap-8 bg-white p-8"
          style={{ color: textColor }}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 900,
              fontSize: "1rem",
              color: textColor,
              textDecoration: "none",
            }}
          >
            BRIDGE.
          </Link>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-unbounded)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: textColor,
                  textDecoration: "none",
                }}
              >
                {link.label.replace(/,$/, "")}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "1rem",
                fontWeight: 700,
                color: textColor,
                textDecoration: "none",
              }}
            >
              Create with us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
