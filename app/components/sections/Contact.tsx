"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-line", {
        opacity: 0, y: 40,
      }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
      gsap.fromTo(".contact-form-el", {
        opacity: 0, y: 20,
      }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06,
        scrollTrigger: {
          trigger: ".contact-form-el",
          start: "top 80%",
        },
      });
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
        padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,4vw,4rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle accent glow */}
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "40vw",
        height: "40vw",
        background: "radial-gradient(circle, rgba(200,245,66,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Big closing statement — like Ashley's "We take pride in..." */}
        <div style={{ marginBottom: "5rem" }}>
          <p className="contact-line" style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c8f542",
            marginBottom: "2rem",
          }}>
            Contact
          </p>
          <h2 className="contact-line" style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 900,
            fontSize: "clamp(2.2rem,6vw,5.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#0a0a0a",
            marginBottom: "1rem",
            maxWidth: "20ch",
          }}>
            We take pride in work that <span style={{ fontStyle: "italic", color: "rgba(10,10,10,0.45)" }}>performs</span> because it refuses to behave.
          </h2>
          <p className="contact-line" style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "clamp(0.75rem,1.5vw,1rem)",
            color: "rgba(10,10,10,0.5)",
            lineHeight: 1.65,
            maxWidth: "36rem",
          }}>
            We&apos;re ready when you are.
          </p>
        </div>

        {/* Two column layout — form left, info right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
        }}>
          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div className="contact-form-el">
              <label style={{
                display: "block",
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.45)",
                marginBottom: "0.5rem",
              }}>Name</label>
              <input
                type="text"
                name="name"
                required
                style={{
                  width: "100%",
                  padding: "0.9rem 1rem",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "1rem",
                  color: "#0a0a0a",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(10,10,10,0.2)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderBottomColor = "#0a0a0a"}
                onBlur={(e) => e.target.style.borderBottomColor = "rgba(10,10,10,0.2)"}
              />
            </div>
            <div className="contact-form-el">
              <label style={{
                display: "block",
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.45)",
                marginBottom: "0.5rem",
              }}>Email</label>
              <input
                type="email"
                name="email"
                required
                style={{
                  width: "100%",
                  padding: "0.9rem 1rem",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "1rem",
                  color: "#0a0a0a",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(10,10,10,0.2)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderBottomColor = "#0a0a0a"}
                onBlur={(e) => e.target.style.borderBottomColor = "rgba(10,10,10,0.2)"}
              />
            </div>
            <div className="contact-form-el">
              <label style={{
                display: "block",
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.45)",
                marginBottom: "0.5rem",
              }}>Message</label>
              <textarea
                name="message"
                required
                rows={5}
                style={{
                  width: "100%",
                  padding: "0.9rem 1rem",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "1rem",
                  color: "#0a0a0a",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(10,10,10,0.2)",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "8rem",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderBottomColor = "#0a0a0a"}
                onBlur={(e) => e.target.style.borderBottomColor = "rgba(10,10,10,0.2)"}
              />
            </div>
            <div className="contact-form-el" style={{ paddingTop: "0.5rem" }}>
              <button type="submit" style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 700,
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "1rem 2.5rem",
                background: "#0a0a0a",
                color: "#f5f0e8",
                border: "none",
                borderRadius: 100,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "transform 0.2s, background 0.2s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#c8f542";
                  (e.currentTarget as HTMLButtonElement).style.color = "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#0a0a0a";
                  (e.currentTarget as HTMLButtonElement).style.color = "#f5f0e8";
                }}
              >
                Send message <span>↗</span>
              </button>
            </div>
          </form>

          {/* Right — contact info + links like Ashley's footer info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem", paddingTop: "1rem" }}>
            <div>
              <p style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.35)",
                marginBottom: "0.75rem",
              }}>Business enquiries</p>
              <a href="mailto:hello@bridgeuxlab.com" style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "clamp(0.85rem,1.5vw,1.1rem)",
                fontWeight: 700,
                color: "#0a0a0a",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                borderBottom: "1px solid rgba(10,10,10,0.2)",
                paddingBottom: "2px",
              }}>
                hello@bridgeuxlab.com
              </a>
            </div>

            <div>
              <p style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.35)",
                marginBottom: "0.75rem",
              }}>Availability</p>
              <p style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.85rem",
                color: "#0a0a0a",
                lineHeight: 1.6,
              }}>
                <span style={{ color: "#c8f542", marginRight: "0.5rem" }}>●</span>
                Open to work — Remote worldwide
              </p>
            </div>

            <div>
              <p style={{
                fontFamily: "var(--font-unbounded)",
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.35)",
                marginBottom: "1rem",
              }}>Navigate</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Services", "Work", "About", "Marketplace"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    style={{
                      fontFamily: "var(--font-unbounded)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(10,10,10,0.45)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(10,10,10,0.45)")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div style={{
          marginTop: "6rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(10,10,10,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            color: "rgba(10,10,10,0.3)",
          }}>
            © Bridge. 2025 · All rights reserved.
          </p>
          <p style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            color: "rgba(10,10,10,0.3)",
          }}>
            UX · Product · Growth
          </p>
        </div>
      </div>
    </section>
  );
}