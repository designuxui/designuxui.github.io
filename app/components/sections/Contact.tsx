"use client";

import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const section: React.CSSProperties = {
  padding: "7rem 4rem",
  background: "var(--bg)",
  color: "var(--fg)",
  fontFamily: "var(--font-dm-sans)",
};

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--acc)",
  marginBottom: "3rem",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-unbounded)",
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--dim)",
  marginBottom: "0.5rem",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  fontFamily: "var(--font-dm-sans)",
  fontSize: "1rem",
  color: "var(--fg)",
  background: "var(--card)",
  border: "1px solid var(--line)",
  borderRadius: "4px",
  outline: "none",
};

export default function Contact() {
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".contact-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section ref={sectionRef} id="contact" style={section}>
      <p className="contact-reveal opacity-0" style={eyebrow}>
        Contact
      </p>
      <div style={{ maxWidth: "36rem" }}>
        <h2
          className="contact-reveal opacity-0"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Start a project
        </h2>
        <p
          className="contact-reveal opacity-0"
          style={{ fontSize: "1.05rem", lineHeight: 1.65, color: "var(--dim)", marginBottom: "2.5rem" }}
        >
          Placeholder form—wire this to your API or form provider when ready.
        </p>
        <form className="contact-reveal opacity-0" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="contact-name" style={labelStyle}>
              Name
            </label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required style={fieldStyle} />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="contact-email" style={labelStyle}>
              Email
            </label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required style={fieldStyle} />
          </div>
          <div style={{ marginBottom: "1.75rem" }}>
            <label htmlFor="contact-message" style={labelStyle}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              style={{ ...fieldStyle, resize: "vertical", minHeight: "8rem" }}
            />
          </div>
          <button
            type="submit"
            data-cursor-hover
            style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "1rem 2rem",
              background: "var(--acc)",
              color: "var(--bg)",
              border: "none",
              borderRadius: "100px",
              cursor: "pointer",
            }}
          >
            Send message
          </button>
          {sent ? (
            <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--acc)" }}>Thanks—placeholder submit.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
