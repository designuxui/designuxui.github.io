"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ct-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(".ct-sub",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-sub", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: "#f5f0e8",
        borderTop: "1px solid rgba(10,10,10,0.08)",
      }}
    >
      {/* Big closing statement — exact Ashley structure */}
      <div style={{
        padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,5rem) clamp(3rem,6vw,6rem)",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
      }}>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#c8f542",
          marginBottom: "3rem",
        }}>
          the third thing you should know about us
        </p>

        {/* Main statement — like Ashley's "We take pride in challenging norms..." */}
        <h2 className="ct-heading" style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 900,
          fontSize: "clamp(2.2rem,5.5vw,5rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          color: "#0a0a0a",
          maxWidth: "22ch",
          marginBottom: "2rem",
        }}>
          We take pride in fixing what{" "}
          <span style={{ fontStyle: "italic", color: "rgba(10,10,10,0.4)" }}>matters</span>
          {" "}and building work that{" "}
          <span style={{ fontStyle: "italic" }}>performs</span>
          {" "}because it refuses to behave.
        </h2>

        {/* CTA link — like Ashley's "We're ready when you are" */}
        <div className="ct-sub">
          <a href="mailto:hello@bridgeuxlab.com" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            fontFamily: "var(--font-unbounded)",
            fontWeight: 700,
            fontSize: "clamp(0.75rem,1.5vw,1.1rem)",
            letterSpacing: "-0.01em",
            color: "#0a0a0a",
            textDecoration: "none",
            borderBottom: "1px solid #0a0a0a",
            paddingBottom: "3px",
            marginBottom: "1rem",
            width: "fit-content",
          }}>
            We&apos;re ready when you are ↗
          </a>
          <p style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.7rem",
            color: "rgba(10,10,10,0.4)",
            lineHeight: 1.6,
            maxWidth: "32rem",
          }}>
            We want to make important work, have a vision, and see it through.
          </p>
        </div>
      </div>

      {/* Contact form area */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
      }}>
        {/* Left — form */}
        <div style={{
          padding: "clamp(3rem,5vw,5rem) clamp(1.5rem,5vw,5rem)",
          borderRight: "1px solid rgba(10,10,10,0.08)",
        }}>
          <p style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(10,10,10,0.35)",
            marginBottom: "2rem",
          }}>
            let&apos;s create together
          </p>
          <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {["Name", "Email", "Company"].map((field) => (
              <div key={field}>
                <label style={{
                  display: "block",
                  fontFamily: "var(--font-unbounded)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,10,0.4)",
                  marginBottom: "0.4rem",
                }}>
                  {field}
                </label>
                <input
                  type={field === "Email" ? "email" : "text"}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0",
                    fontFamily: "var(--font-unbounded)",
                    fontSize: "0.85rem",
                    color: "#0a0a0a",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(10,10,10,0.15)",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderBottomColor = "#0a0a0a"}
                  onBlur={e => e.target.style.borderBottomColor = "rgba(10,10,10,0.15)"}
                />
              </div>
            ))}
            <div>
              <label style={{
                display: "block",
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.4)",
                marginBottom: "0.4rem",
              }}>
                Tell us about your project
              </label>
              <textarea rows={4} style={{
                width: "100%",
                padding: "0.75rem 0",
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.85rem",
                color: "#0a0a0a",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(10,10,10,0.15)",
                outline: "none",
                resize: "none",
                transition: "border-color 0.2s",
              }}
                onFocus={e => e.target.style.borderBottomColor = "#0a0a0a"}
                onBlur={e => e.target.style.borderBottomColor = "rgba(10,10,10,0.15)"}
              />
            </div>
            <button type="submit" style={{
              alignSelf: "flex-start",
              fontFamily: "var(--font-unbounded)",
              fontWeight: 700,
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.9rem 2rem",
              background: "#0a0a0a",
              color: "#f5f0e8",
              border: "none",
              borderRadius: 100,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "background 0.25s, color 0.25s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#c8f542";
                e.currentTarget.style.color = "#0a0a0a";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#0a0a0a";
                e.currentTarget.style.color = "#f5f0e8";
              }}
            >
              Send ↗
            </button>
          </form>
        </div>

        {/* Right — contact info */}
        <div style={{
          padding: "clamp(3rem,5vw,5rem) clamp(1.5rem,5vw,5rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <p style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.3)",
                marginBottom: "0.6rem",
              }}>
                Business Enquiries
              </p>
              <a href="mailto:hello@bridgeuxlab.com" style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 700,
                fontSize: "clamp(0.8rem,1.5vw,1rem)",
                color: "#0a0a0a",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                borderBottom: "1px solid rgba(10,10,10,0.15)",
                paddingBottom: "2px",
              }}>
                hello@bridgeuxlab.com
              </a>
            </div>
            <div>
              <p style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.3)",
                marginBottom: "0.6rem",
              }}>
                Work with us
              </p>
              <p style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.85rem",
                color: "#0a0a0a",
                letterSpacing: "-0.01em",
              }}>
                <span style={{ color: "#c8f542", marginRight: "0.5rem" }}>●</span>
                Open to work — Remote worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer — exact Ashley structure */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        padding: "2rem clamp(1.5rem,5vw,5rem)",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
      }}>
        {[
          { label: null, links: [{ text: "Work", href: "#cases" }, { text: "Services", href: "#services" }, { text: "About", href: "#about" }] },
          { label: null, links: [{ text: "Marketplace", href: "/marketplace" }] },
          { label: null, links: [{ text: "LinkedIn", href: "#" }] },
        ].map((col, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {col.links.map(link => (
              <a key={link.text} href={link.href} style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                color: "rgba(10,10,10,0.5)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#0a0a0a"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(10,10,10,0.5)"}
              >
                {link.text}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        padding: "1.5rem clamp(1.5rem,5vw,5rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.55rem",
          letterSpacing: "0.1em",
          color: "rgba(10,10,10,0.3)",
        }}>
          © Bridge. 2025 · All rights reserved.
        </p>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "0.55rem",
          letterSpacing: "0.1em",
          color: "rgba(10,10,10,0.3)",
        }}>
          UX · Product · Growth
        </p>
      </div>
    </section>
  );
}