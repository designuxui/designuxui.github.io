"use client";

import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const section: React.CSSProperties = {
  padding: "7rem 4rem",
  background: "#f5f2eb",
  color: "#0a0a0a",
  fontFamily: "var(--font-dm-sans)",
};

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#c8f542",
  marginBottom: "3rem",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-unbounded)",
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(10, 10, 10, 0.55)",
  marginBottom: "0.5rem",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  fontFamily: "var(--font-dm-sans)",
  fontSize: "1rem",
  color: "#0a0a0a",
  background: "rgba(10, 10, 10, 0.02)",
  border: "1px solid rgba(10, 10, 10, 0.08)",
  borderRadius: "4px",
  outline: "none",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const magneticWrapRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const nodes = el.querySelectorAll(".contact-reveal");
      gsap.set(nodes, { y: 40, opacity: 0 });
      gsap.to(nodes, {
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
      });
    }, el);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const wrap = magneticWrapRef.current;
    const btn = submitRef.current;
    if (!wrap || !btn) return;

    const reset = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
    };

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        reset();
        return;
      }
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * 0.22;
      const dy = (e.clientY - cy) * 0.22;
      gsap.to(btn, {
        x: clamp(dx, -14, 14),
        y: clamp(dy, -12, 12),
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", reset);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", reset);
    };
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden" style={section}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(200,245,66,0.1) 0%, transparent 50%)" }} />
      <p className="contact-reveal" style={eyebrow}>
        Contact
      </p>
      <div style={{ maxWidth: "36rem" }}>
        <h2
          className="contact-reveal"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1rem",
            color: "#0a0a0a",
          }}
        >
          Start a project
        </h2>
        <p className="contact-reveal" style={{ fontSize: "1.05rem", lineHeight: 1.65, color: "rgba(10, 10, 10, 0.55)", marginBottom: "2.5rem" }}>
          Placeholder form—wire this to your API or form provider when ready.
        </p>
        <form className="contact-reveal" onSubmit={handleSubmit}>
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
            <textarea id="contact-message" name="message" required rows={5} style={{ ...fieldStyle, resize: "vertical", minHeight: "8rem" }} />
          </div>
          <div ref={magneticWrapRef} className="inline-block py-2" style={{ paddingLeft: "0.25rem", paddingRight: "0.25rem" }}>
            <button
              ref={submitRef}
              type="submit"
              data-cursor
              style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                background: "#c8f542",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                willChange: "transform",
              }}
            >
              Send message
            </button>
          </div>
          {sent ? (
            <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#c8f542" }}>Thanks—placeholder submit.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
