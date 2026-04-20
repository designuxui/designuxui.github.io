"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TITLE_LINES = ["WHERE", "DESIGN", "MEETS", "GROWTH"];
const PROCESS_WORDS = ["Research", "Strategy", "UX Design", "Development", "Testing", "Launch"];

function wrapWords(element: HTMLElement) {
  const text = element.innerText;
  if (!text) return;
  if (element.querySelector(".word")) return;
  
  const words = text.split(/(\s+)/);
  
  const fragment = document.createDocumentFragment();
  
  words.forEach(word => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    fragment.appendChild(span);
  });
  
  element.innerHTML = "";
  element.appendChild(fragment);
}

function getWordIndexUnderMouse(e: MouseEvent, itemElement: HTMLElement) {
  const words = itemElement.querySelectorAll(".word");
  if (!words.length) return 0;
  
  const mouseX = e.clientX;
  let closestIndex = 0;
  let minDistance = Infinity;
  
  words.forEach((word, idx) => {
    const rect = word.getBoundingClientRect();
    const wordCenterX = (rect.left + rect.right) / 2;
    const distance = Math.abs(mouseX - wordCenterX);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = idx;
    }
  });
  return closestIndex;
}

function animateFromCenter(itemElement: HTMLElement, hoveredWordIndex: number) {
  const words = itemElement.querySelectorAll(".word");
  if (!words.length) return;
  
  words.forEach((word) => {
    gsap.killTweensOf(word);
    gsap.set(word, { clearProps: "transform,color" });
  });
  
  const total = words.length;
  const center = Math.min(total - 1, Math.max(0, hoveredWordIndex));
  
  const order = [center];
  let left = center - 1;
  let right = center + 1;
  while (left >= 0 || right < total) {
    if (right < total) order.push(right++);
    if (left >= 0) order.push(left--);
  }
  
  order.forEach((idx, orderPos) => {
    const word = words[idx] as HTMLElement;
    if (!word) return;
    
    const delayVal = orderPos * 0.04;
    
    gsap.fromTo(word, 
      { y: 0, scale: 1, color: "#eef1e6" },
      {
        y: -10,
        scale: 1.12,
        color: "#c8f542",
        duration: 0.2,
        delay: delayVal,
        ease: "back.out(0.7)",
        onComplete: () => {
          gsap.to(word, {
            y: 0,
            scale: 1,
            color: "#eef1e6",
            duration: 0.35,
            ease: "elastic.out(1, 0.4)"
          });
        }
      }
    );
  });
}

function resetWords(itemElement: HTMLElement) {
  const words = itemElement.querySelectorAll(".word");
  const isGreenText = itemElement.classList.contains("hero-line") && itemElement.innerText === "DESIGN";
  const targetColor = isGreenText ? "#c8f542" : "#eef1e6";
  words.forEach((word) => {
    gsap.killTweensOf(word);
    gsap.to(word, {
      y: 0,
      scale: 1,
      color: targetColor,
      duration: 0.3,
      ease: "power2.out"
    });
  });
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rings = section.querySelectorAll(".hero-ring");
      rings.forEach((ring, i) => {
        const depth = 4 + i * 3;
        gsap.to(ring, {
          x: (x - 0.5) * depth * (i % 2 === 0 ? 1 : -1),
          y: (y - 0.5) * depth * 0.3,
          duration: 0.7,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = Array.from(titleRef.current?.querySelectorAll(".hero-line") ?? []);
      if (lines.length) gsap.set(lines, { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 15 });
      gsap.set(taglineRef.current, { opacity: 0, y: 15 });
      gsap.set(".hero-btn", { opacity: 0, y: 15, scale: 0.95 });
      gsap.set(".hero-process", { opacity: 0, y: 20, scale: 0.9 });

      const rings = Array.from(sectionRef.current?.querySelectorAll(".hero-ring") ?? []);
      if (rings.length) gsap.set(rings, { scale: 0.9, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.15 });
      
      tl.to(rings, { 
        scale: 1, 
        opacity: 1, 
        duration: 2, 
        stagger: 0.35, 
        ease: "power3.inOut" 
      });

      tl.to(lines, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=1.5");

      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
      tl.to(".hero-process", { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.3");
      tl.to(".hero-btn", { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    
    const lines = Array.from(titleRef.current?.querySelectorAll(".hero-line") ?? []);
    lines.forEach((line) => wrapWords(line as HTMLElement));

    setTimeout(() => {
      // Title lines hover
      lines.forEach((line) => {
        const el = line as HTMLElement;
        el.style.cursor = "default";
        
        let hoverTimeout: ReturnType<typeof setTimeout>;
        
        const onMouseMove = (e: MouseEvent) => {
          if (hoverTimeout) clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            const wordIndex = getWordIndexUnderMouse(e, el);
            animateFromCenter(el, wordIndex);
          }, 5);
        };
        
        const onMouseLeave = () => {
          if (hoverTimeout) clearTimeout(hoverTimeout);
          resetWords(el);
        };
        
        el.addEventListener("mousemove", onMouseMove);
        el.addEventListener("mouseleave", onMouseLeave);
      });

      // Subtitle & tagline hover (word by word)
      const subtitleEl = subtitleRef.current;
      const taglineEl = taglineRef.current;
      
      if (subtitleEl) {
        wrapWords(subtitleEl);
        let subTimeout: ReturnType<typeof setTimeout>;
        const subOnMove = (e: MouseEvent) => {
          if (subTimeout) clearTimeout(subTimeout);
          subTimeout = setTimeout(() => {
            animateFromCenter(subtitleEl as HTMLElement, getWordIndexUnderMouse(e, subtitleEl as HTMLElement));
          }, 5);
        };
        const subOnLeave = () => { if (subTimeout) clearTimeout(subTimeout); resetWords(subtitleEl as HTMLElement); };
        subtitleEl.addEventListener("mousemove", subOnMove);
        subtitleEl.addEventListener("mouseleave", subOnLeave);
      }
      
      if (taglineEl) {
        wrapWords(taglineEl);
        let tagTimeout: ReturnType<typeof setTimeout>;
        const tagOnMove = (e: MouseEvent) => {
          if (tagTimeout) clearTimeout(tagTimeout);
          tagTimeout = setTimeout(() => {
            animateFromCenter(taglineEl as HTMLElement, getWordIndexUnderMouse(e, taglineEl as HTMLElement));
          }, 5);
        };
        const tagOnLeave = () => { if (tagTimeout) clearTimeout(tagTimeout); resetWords(taglineEl as HTMLElement); };
        taglineEl.addEventListener("mousemove", tagOnMove);
        taglineEl.addEventListener("mouseleave", tagOnLeave);
      }
    }, 200);

    return () => {};
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-hidden px-8 md:px-16"
      style={{ background: "linear-gradient(135deg, #080808 0%, #0a0a0a 60%, #060606 100%)" }}
    >
      <div className="hero-ring pointer-events-none absolute" style={{ width: "900px", height: "900px", border: "1px solid rgba(200,245,66,0.03)", borderRadius: "50%", top: "45%", left: "55%", transform: "translate(-50%,-50%)", filter: "blur(1px)" }} />
      <div className="hero-ring pointer-events-none absolute" style={{ width: "550px", height: "550px", border: "1px solid rgba(200,245,66,0.018)", borderRadius: "50%", top: "45%", left: "55%", transform: "translate(-50%,-50%)" }} />
      <div className="hero-ring pointer-events-none absolute" style={{ width: "300px", height: "300px", border: "1px solid rgba(200,245,66,0.01)", borderRadius: "50%", top: "45%", left: "55%", transform: "translate(-50%,-50%)" }} />
      
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 25% at 82% 8%, rgba(200,245,66,0.02) 0%, transparent 30%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 35% 20% at 12% 88%, rgba(200,245,66,0.012) 0%, transparent 20%)" }} />

      <div ref={titleRef} className="relative z-10">
        <h1
          className="flex flex-col items-start"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 900,
            fontSize: "clamp(4rem, 11vw, 11rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
          }}
        >
          {TITLE_LINES.map((line, lineIdx) => (
            <span 
              key={lineIdx} 
              className="hero-line block cursor-default"
              style={{ 
                color: lineIdx === 1 ? "#c8f542" : "#eef1e6",
              }}
            >
              {line}
            </span>
          ))}
        </h1>
      </div>

      <p
        ref={subtitleRef}
        className="hero-line hero-subtitle relative z-10 mt-10"
        style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 600,
          fontSize: "clamp(1.1rem, 2vw, 1.8rem)",
          color: "#eef1e6",
          letterSpacing: "-0.015em",
          lineHeight: 1.5,
        }}
      >
        I fix how products sell — from first click to closed deal
      </p>

      <p
        ref={taglineRef}
        className="hero-tagline relative z-10 mt-2"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)",
          color: "rgba(238,241,230,0.4)",
          letterSpacing: "-0.01em",
          lineHeight: 1.6,
        }}
      >
        Bridging the gap between UX, product and revenue.
      </p>

      <div className="relative z-10 mt-10 flex flex-wrap gap-x-6 gap-y-3 max-w-xl" style={{ perspective: "1000px" }}>
        {PROCESS_WORDS.map((word, i) => (
          <span
            key={word}
            className="hero-process"
            style={{
              fontFamily: "var(--font-unbounded)",
              fontSize: "clamp(0.7rem, 1.2vw, 0.95rem)",
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: i === 2 ? "#c8f542" : "rgba(238,241,230,0.5)",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="relative z-10 mt-8 flex gap-3">
        <a
          href="#contact"
          className="hero-btn"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 700,
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.85rem 1.8rem",
            background: "#c8f542",
            color: "#080807",
            borderRadius: "100px",
            textDecoration: "none",
          }}
        >
          Contact
        </a>
        <a
          href="#about"
          className="hero-btn"
          style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 400,
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.85rem 1.8rem",
            background: "transparent",
            color: "#eef1e6",
            border: "1px solid rgba(238,241,230,0.1)",
            borderRadius: "100px",
            textDecoration: "none",
          }}
        >
          About
        </a>
      </div>

      <div className="absolute bottom-8 left-8 md:left-16 flex flex-col items-center gap-3" style={{ fontFamily: "var(--font-unbounded)", fontSize: "0.48rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(238,241,230,0.1)" }}>
        <span>Scroll</span>
        <div className="w-[1px] h-8" style={{ background: "linear-gradient(to bottom, rgba(200,245,66,0.2), transparent)" }} />
      </div>
    </section>
  );
}