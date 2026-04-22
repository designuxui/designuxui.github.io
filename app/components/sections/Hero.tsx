"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WHERE", "DESIGN", "MEETS", "GROWTH"];
const STYLES: React.CSSProperties[] = [
  { color: "#eef1e6" },
  { color: "transparent", WebkitTextStroke: "1.5px #eef1e6" },
  { color: "rgba(238,241,230,0.55)" },
  { color: "#c8f542" },
];

type Shape = {
  type: "circle" | "rect" | "triangle" | "pill";
  size: number;
  color: string;
  filled: boolean;
  x: string;
  y: string;
};

type MatterBody = {
  position: { x: number; y: number };
  angle: number;
};

const SHAPES: Shape[] = [
  { type: "circle",   size: 52, color: "#c8f542", filled: true,  x: "12%", y: "-8%" },
  { type: "rect",     size: 44, color: "#c8f542", filled: false, x: "22%", y: "-5%" },
  { type: "triangle", size: 48, color: "#eef1e6", filled: false, x: "38%", y: "-10%" },
  { type: "circle",   size: 32, color: "#eef1e6", filled: true,  x: "52%", y: "-6%" },
  { type: "pill",     size: 58, color: "#c8f542", filled: false, x: "63%", y: "-9%" },
  { type: "rect",     size: 40, color: "#eef1e6", filled: true,  x: "74%", y: "-4%" },
  { type: "circle",   size: 64, color: "#2a2a2a", filled: true,  x: "85%", y: "-11%" },
  { type: "triangle", size: 42, color: "#c8f542", filled: true,  x: "92%", y: "-7%" },
  { type: "pill",     size: 50, color: "#eef1e6", filled: false, x: "18%", y: "-15%" },
  { type: "circle",   size: 26, color: "#c8f542", filled: true,  x: "48%", y: "-3%" },
  { type: "rect",     size: 54, color: "#eef1e6", filled: false, x: "70%", y: "-16%" },
  { type: "triangle", size: 36, color: "#c8f542", filled: false, x: "33%", y: "-2%" },
];

function PhysicsCanvas({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    let animFrame: number;
    let cleanupFn: (() => void) | null = null;

    import("matter-js").then((Matter) => {
      const { Engine, Runner, Bodies, Body, World, Mouse, MouseConstraint } = Matter;
      const engine = Engine.create({ gravity: { x: 0, y: 1.4 } });
      const runner = Runner.create();

      World.add(engine.world, [
        Bodies.rectangle(W / 2, H + 10, W * 2, 20, { isStatic: true, friction: 0.9, restitution: 0.25 }),
        Bodies.rectangle(-10, H / 2, 20, H * 2, { isStatic: true }),
        Bodies.rectangle(W + 10, H / 2, 20, H * 2, { isStatic: true }),
      ]);

      const cursorBody = Bodies.circle(0, 0, 70, {
        isStatic: true,
        isSensor: true,
        collisionFilter: { mask: 0 },
      });
      World.add(engine.world, cursorBody);

      const bodies: { body: MatterBody; shape: Shape }[] = [];

      SHAPES.forEach((shape) => {
        const px = (parseFloat(shape.x) / 100) * W;
        const py = (parseFloat(shape.y) / 100) * H;
        const s = shape.size;
        const opts = { restitution: 0.55, friction: 0.1, density: 0.002 };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let body: any;

        if (shape.type === "circle") {
          body = Bodies.circle(px, py, s / 2, opts);
        } else if (shape.type === "triangle") {
          const h = s * 0.866;
          body = Bodies.fromVertices(px, py, [
            { x: 0, y: -h * 0.667 },
            { x: s / 2, y: h * 0.333 },
            { x: -s / 2, y: h * 0.333 },
          ], { ...opts, restitution: 0.45 });
        } else if (shape.type === "pill") {
          body = Bodies.rectangle(px, py, s * 1.8, s, { ...opts, chamfer: { radius: s / 2 } });
        } else {
          body = Bodies.rectangle(px, py, s, s, { ...opts, chamfer: { radius: 5 } });
        }

        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
        World.add(engine.world, body);
        bodies.push({ body, shape });
      });

      const mouse = Mouse.create(canvas);
      World.add(engine.world, MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.18, render: { visible: false } },
      }));

      const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        Body.setPosition(cursorBody, { x: mx, y: my });
        bodies.forEach(({ body }) => {
          const dx = body.position.x - mx;
          const dy = body.position.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 1) {
            const f = (1 - dist / 100) * 0.007;
            Body.applyForce(body as Parameters<typeof Body.applyForce>[0], body.position, {
              x: (dx / dist) * f,
              y: (dy / dist) * f,
            });
          }
        });
      };
      window.addEventListener("mousemove", onMouseMove);

      const draw = (shape: Shape, body: MatterBody) => {
        const { x, y } = body.position;
        const s = shape.size;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = shape.filled ? shape.color : "transparent";
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.filled ? 0 : 1.5;
        ctx.beginPath();
        if (shape.type === "circle") {
          ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
        } else if (shape.type === "triangle") {
          const h = s * 0.866;
          ctx.moveTo(0, -h * 0.667);
          ctx.lineTo(s / 2, h * 0.333);
          ctx.lineTo(-s / 2, h * 0.333);
          ctx.closePath();
        } else if (shape.type === "pill") {
          ctx.roundRect(-s * 0.9, -s / 2, s * 1.8, s, s / 2);
        } else {
          ctx.roundRect(-s / 2, -s / 2, s, s, 5);
        }
        shape.filled ? ctx.fill() : ctx.stroke();
        ctx.restore();
      };

      Runner.run(runner, engine);
      const loop = () => {
        ctx.clearRect(0, 0, W, H);
        bodies.forEach(({ body, shape }) => draw(shape, body));
        animFrame = requestAnimationFrame(loop);
      };
      loop();

      cleanupFn = () => {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animFrame);
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
      };
    });

    return () => {
      cancelAnimationFrame(animFrame);
      cleanupFn?.();
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[6]"
      style={{ pointerEvents: "auto" }}
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = Array.from(sectionRef.current?.querySelectorAll(".hero-line") ?? []);
      gsap.set(lines, { opacity: 0, y: 100, skewY: 5 });
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(lines, { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out", stagger: 0.1 });
      gsap.set(".hero-sub", { opacity: 0, y: 20 });
      tl.to(".hero-sub", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
      gsap.set(".hero-btn", { opacity: 0, x: 20 });
      tl.to(".hero-btn", { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.5)", stagger: 0.12 }, "-=0.3");

      const letters = Array.from(sectionRef.current?.querySelectorAll(".hl") ?? []);
      const xQ = letters.map((el) => gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" }));
      const yQ = letters.map((el) => gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" }));

      const onMove = (e: MouseEvent) => {
        letters.forEach((el, i) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 130;
          if (dist < radius) {
            const f = (1 - dist / radius) * 35;
            xQ[i]((-dx / dist) * f);
            yQ[i]((-dy / dist) * f);
          } else {
            xQ[i](0);
            yQ[i](0);
          }
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, sectionRef);

    let app: { dispose?: () => void } | null = null;
    const t = setTimeout(() => {
      const load = () => {
        const tubes1 = (window as Record<string, unknown>)["tubes1"] as
          | ((canvas: HTMLCanvasElement, opts: object) => { dispose?: () => void })
          | undefined;
        if (canvasRef.current && tubes1) {
          app = tubes1(canvasRef.current, {
            tubes: {
              colors: ["#c8f542", "#a3d900", "#e0ff60"],
              lights: { intensity: 180, colors: ["#c8f542", "#7a9a05", "#d4ff50", "#4a7a00"] },
            },
          });
        }
      };
      const existing = document.getElementById("tubes-script");
      if (existing) {
        load();
      } else {
        const script = document.createElement("script");
        script.id = "tubes-script";
        script.src = "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        script.onload = load;
        document.head.appendChild(script);
      }
    }, 300);

    return () => {
      ctx.revert();
      clearTimeout(t);
      if (app?.dispose) app.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{
        background: "#080808",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        padding: "120px 4rem 4rem",
        gap: "2rem",
      }}
    >
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" style={{ opacity: 0.7 }} />
      <PhysicsCanvas containerRef={sectionRef} />

      {[900, 580, 310].map((s, i) => (
        <div key={s} className="hero-ring pointer-events-none absolute" style={{
          width: s, height: s,
          border: `1px solid rgba(200,245,66,${0.04 - i * 0.01})`,
          borderRadius: "50%", top: "48%", left: "62%",
          transform: "translate(-50%,-50%)",
        }} />
      ))}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 50% 38% at 65% 48%, rgba(200,245,66,0.055) 0%, transparent 60%)",
      }} />

      <div className="relative z-10">
        <h1 style={{
          fontFamily: "var(--font-unbounded)", fontWeight: 900,
          fontSize: "clamp(4rem, 10vw, 10rem)", lineHeight: 0.9, letterSpacing: "-0.05em",
        }}>
          {WORDS.map((word, wi) => (
            <div key={word} className="hero-line" style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "inline-flex" }}>
                {word.split("").map((ch, ci) => (
                  <span key={ci} className="hl" style={{
                    display: "inline-block", willChange: "transform", cursor: "default", ...STYLES[wi],
                  }}>{ch}</span>
                ))}
              </span>
            </div>
          ))}
        </h1>
        <div className="hero-sub mt-8" style={{ maxWidth: 560 }}>
          <p style={{
            fontFamily: "var(--font-unbounded)", fontWeight: 600,
            fontSize: "clamp(0.85rem, 1.5vw, 1.2rem)", color: "#eef1e6",
            letterSpacing: "-0.01em", lineHeight: 1.45, marginBottom: "0.6rem",
          }}>
            I fix how products sell —<br />from first click to closed deal.
          </p>
          <p style={{
            fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.82rem, 0.95vw, 0.95rem)",
            color: "rgba(238,241,230,0.4)", lineHeight: 1.65,
          }}>
            Bridging UX, product strategy and revenue systems.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-4 items-end self-end pb-4">
        <a href="#contact" className="hero-btn" style={{
          fontFamily: "var(--font-unbounded)", fontWeight: 700, fontSize: "0.65rem",
          letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem 2.2rem",
          background: "#c8f542", color: "#080807", borderRadius: 100,
          textDecoration: "none", whiteSpace: "nowrap",
        }}>Start a project</a>
        <a href="#services" className="hero-btn" style={{
          fontFamily: "var(--font-unbounded)", fontWeight: 400, fontSize: "0.62rem",
          letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem 2.2rem",
          background: "transparent", color: "#eef1e6",
          border: "1px solid rgba(238,241,230,0.15)", borderRadius: 100,
          textDecoration: "none", whiteSpace: "nowrap",
        }}>Services</a>
      </div>

      <div className="absolute bottom-8 left-16 flex flex-col items-center gap-2" style={{
        fontFamily: "var(--font-unbounded)", fontSize: "0.42rem",
        letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(238,241,230,0.15)",
      }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(200,245,66,0.3), transparent)" }} />
      </div>
    </section>
  );
}