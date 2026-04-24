"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextProps {
  text: string;
  type?: "heading" | "subheading" | "body";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  split?: "lines" | "words" | "chars"; // default: "lines"
}

/**
 * Animated text reveal component using GSAP.
 * Supports line-by-line, word-by-word, or character-by-character animations.
 */
export default function AnimatedText({
  text,
  type = "heading",
  delay = 0,
  className = "",
  style = {},
  split = "lines",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const elements =
      split === "chars"
        ? container.querySelectorAll(".char")
        : container.querySelectorAll(".word");

    if (elements.length === 0) return;

    const timeline = gsap.timeline({ delay });

    if (split === "lines") {
      // Each line fades and slides up
      gsap.set(container.querySelectorAll(".line"), { opacity: 0, y: 20 });
      timeline.to(
        container.querySelectorAll(".line"),
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        },
        0
      );
    } else if (split === "words") {
      // Each word fades and scales
      gsap.set(elements, { opacity: 0, scale: 0.95, y: 10 });
      timeline.to(
        elements,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.2)",
          stagger: 0.05,
        },
        0
      );
    } else if (split === "chars") {
      // Each character fades and slides in
      gsap.set(elements, { opacity: 0, y: 15, rotateY: -90 });
      timeline.to(
        elements,
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.02,
        },
        0
      );
    }
  }, [split, delay]);

  const renderText = () => {
    if (split === "lines") {
      return text.split("\n").map((line, i) => (
        <div key={i} className="line" style={{ overflow: "hidden", display: "block" }}>
          {line || "\u00A0"}
        </div>
      ));
    } else if (split === "words") {
      return text.split(" ").map((word, i) => (
        <span key={i} className="word" style={{ display: "inline-block", marginRight: "0.3em" }}>
          {word}
        </span>
      ));
    } else if (split === "chars") {
      return text.split("").map((char, i) => (
        <span key={i} className="char" style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }
  };

  const defaultStyles: React.CSSProperties = {
    display: "block",
    willChange: "transform, opacity",
    lineHeight: "inherit",
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...defaultStyles,
        ...style,
      }}
    >
      {renderText()}
    </div>
  );
}
