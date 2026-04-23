"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WHERE", "DESIGN", "MEETS", "GROWTH"];
const STYLES: React.CSSProperties[] = [
  { color: "#eef1e6" },
  { color: "transparent", WebkitTextStroke: "1.5px #eef1e6" },
  { color: "rgba(238,241,230,0.45)" },
  { color: "#c8f542" },
];

type FillStyle =
  | { kind: "solid"; color: string }
  | { kind: "outline"; color: string; width: number }
  | { kind: "glow"; color: string };

type ShapeDef = {
  type: "circle" | "rect" | "triangle" | "diamond" | "pill";
  size: number;
  fill: FillStyle;
  x: string;
  y: string;
  density: number;
  restitution: number;
};

// 9 фигур — яркие + контурные, без блёклых
const SHAPES: ShapeDef[] = [
  // Solid тяжёлые
  { type: "circle",   size: 52, fill: { kind: "solid",   color: "#c8f542" },             x: "8%",  y: "-10%", density: 0.006, restitution: 0.22 },
  { type: "rect",     size: 40, fill: { kind: "solid",   color: "#ff6b2b" },             x: "28%", y: "-12%", density: 0.005, restitution: 0.28 },
  { type: "circle",   size: 36, fill: { kind: "solid",   color: "#ffd426" },             x: "60%", y: "-8%",  density: 0.005, restitution: 0.3  },
  // Outline лёгкие — далеко улетают
  { type: "circle",   size: 58, fill: { kind: "outline", color: "#ffffff", width: 1.5 }, x: "80%", y: "-14%", density: 0.001, restitution: 0.78 },
  { type: "triangle", size: 44, fill: { kind: "outline", color: "#c8f542", width: 1.5 }, x: "44%", y: "-6%",  density: 0.001, restitution: 0.82 },
  { type: "diamond",  size: 46, fill: { kind: "outline", color: "#ffffff", width: 1.2 }, x: "18%", y: "-7%",  density: 0.001, restitution: 0.75 },
  // Glow средние
  { type: "circle",   size: 30, fill: { kind: "glow",    color: "#8b5cf6" },             x: "70%", y: "-5%",  density: 0.002, restitution: 0.6  },
  { type: "pill",     size: 34, fill: { kind: "glow",    color: "#c8f542" },             x: "38%", y: "-16%", density: 0.002, restitution: 0.55 },
  { type: "diamond",  size: 42, fill: { kind: "glow",    color: "#ff6b2b" },             x: "90%", y: "-9%",  density: 0.002, restitution: 0.58 },
];

// Запасные фигуры для ротации (появляются после исчезновения)
const EXTRA_SHAPES: ShapeDef[] = [
  { type: "pill",     size: 48, fill: { kind: "outline", color: "#ffd426", width: 1.5 }, x: "95%", y: "-5%",  density: 0.001, restitution: 0.8  },
  { type: "triangle", size: 50, fill: { kind: "solid",   color: "#8b5cf6" },             x: "92%", y: "-5%",  density: 0.004, restitution: 0.35 },
  { type: "circle",   size: 38, fill: { kind: "glow",    color: "#ffd426" },             x: "88%", y: "-5%",  density: 0.002, restitution: 0.6  },
];

function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: ShapeDef,
  x: number,
  y: number,
  angle: number,
  alpha = 1
) {
  const s = shape.size;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  const path = new Path2D();
  switch (shape.type) {
    case "circle":
      path.arc(0, 0, s / 2, 0, Math.PI * 2);
      break;
    case "triangle": {
      const h = s * 0.866;
      path.moveTo(0, -h * 0.667);
      path.lineTo(s / 2, h * 0.333);
      path.lineTo(-s / 2, h * 0.333);
      path.closePath();
      break;
    }
    case "diamond":
      path.moveTo(0, -s / 2);
      path.lineTo(s * 0.42, 0);
      path.lineTo(0, s / 2);
      path.lineTo(-s * 0.42, 0);
      path.closePath();
      break;
    case "pill": {
      const w = s * 1.9, r = s / 2;
      path.roundRect(-w / 2, -r, w, s, r);
      break;
    }
    default:
      path.roundRect(-s / 2, -s / 2, s, s, s * 0.12);
  }

  const f = shape.fill;
  if (f.kind === "solid") {
    ctx.globalAlpha *= 0.88;
    ctx.fillStyle = f.color;
    ctx.fill(path);
  } else if (f.kind === "outline") {
    ctx.globalAlpha *= 0.75;
    ctx.strokeStyle = f.color;
    ctx.lineWidth = f.width;
    ctx.stroke(path);
  } else {
    // glow
    ctx.globalAlpha *= 0.18;
    ctx.fillStyle = f.color;
    ctx.shadowColor = f.color;
    ctx.shadowBlur = 22;
    ctx.fill(path);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = alpha * 0.9;
    ctx.fillStyle = f.color;
    ctx.fill(path);
  }
  ctx.restore();
}

function PhysicsCanvas({
  containerRef,
  btnRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  btnRef: React.RefObject<HTMLAnchorElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
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
      const engine = Engine.create({ gravity: { x: 0, y: isMobile ? 0.8 : 1.2 } });
      const runner = Runner.create();

      // Walls
      const floor  = Bodies.rectangle(W / 2, H + 10, W * 2, 20, { isStatic: true, friction: 0.8, restitution: 0.2 });
      const wallL  = Bodies.rectangle(-10, H / 2, 20, H * 2, { isStatic: true });
      const wallR  = Bodies.rectangle(W + 10, H / 2, 20, H * 2, { isStatic: true });
      World.add(engine.world, [floor, wallL, wallR]);

      // Button static body (кнопка "Start a project")
      let btnBody: Matter.Body | null = null;
      const updateBtnBody = () => {
        if (!btnRef.current) return;
        const r = btnRef.current.getBoundingClientRect();
        const cr = canvas.getBoundingClientRect();
        const bx = r.left - cr.left + r.width / 2;
        const by = r.top - cr.top + r.height / 2;
        if (btnBody) World.remove(engine.world, btnBody);
        btnBody = Bodies.rectangle(bx, by, r.width, r.height, {
          isStatic: true, friction: 0.1, restitution: 0.7,
          chamfer: { radius: r.height / 2 },
        });
        World.add(engine.world, btnBody);
      };
      setTimeout(updateBtnBody, 500);

      // Cursor repulsion body
      const cursorBody = Bodies.circle(0, 0, 72, {
        isStatic: true, isSensor: true, collisionFilter: { mask: 0 },
      });
      World.add(engine.world, cursorBody);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bodies: { body: any; shape: ShapeDef; alpha: number }[] = [];

      const addBody = (shape: ShapeDef, startX?: number, startY?: number) => {
        const px = startX ?? (parseFloat(shape.x) / 100) * W;
        const py = startY ?? (parseFloat(shape.y) / 100) * H;
        const s = shape.size;
        const opts = { restitution: shape.restitution, friction: 0.08, density: shape.density };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let body: any;

        if (shape.type === "circle") {
          body = Bodies.circle(px, py, s / 2, opts);
        } else if (shape.type === "triangle") {
          const h = s * 0.866;
          body = Bodies.fromVertices(px, py, [
            { x: 0, y: -h * 0.667 }, { x: s / 2, y: h * 0.333 }, { x: -s / 2, y: h * 0.333 },
          ], opts);
        } else if (shape.type === "diamond") {
          body = Bodies.fromVertices(px, py, [
            { x: 0, y: -s / 2 }, { x: s * 0.42, y: 0 }, { x: 0, y: s / 2 }, { x: -s * 0.42, y: 0 },
          ], opts);
        } else if (shape.type === "pill") {
          body = Bodies.rectangle(px, py, s * 1.9, s, { ...opts, chamfer: { radius: s / 2 } });
        } else {
          body = Bodies.rectangle(px, py, s, s, { ...opts, chamfer: { radius: s * 0.12 } });
        }

        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);
        World.add(engine.world, body);
        bodies.push({ body, shape, alpha: 1 });
        return body;
      };

      SHAPES.forEach((shape) => addBody(shape));

      // ── Idle: через 15 сек одна фигура растворяется, новая падает ──
      let idleTimer: ReturnType<typeof setTimeout> | null = null;
      let extraIdx = 0;

      const scheduleIdle = () => {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (bodies.length === 0) return;
          // Выбираем случайную видимую фигуру
          const idx = Math.floor(Math.random() * bodies.length);
          const target = bodies[idx];
          // Плавное растворение через gsap на alpha
          gsap.to(target, {
            alpha: 0,
            duration: 1.2,
            ease: "power2.in",
            onComplete: () => {
              World.remove(engine.world, target.body);
              bodies.splice(bodies.findIndex((b) => b === target), 1);
              // Новая фигура падает через 1 сек
              setTimeout(() => {
                const newShape = EXTRA_SHAPES[extraIdx % EXTRA_SHAPES.length];
                extraIdx++;
                const nx = W * 0.85 + (Math.random() - 0.5) * 80;
                addBody(newShape, nx, -60);
              }, 800);
            },
          });
          scheduleIdle();
        }, 15000);
      };

      // ── Mouse repulsion ──
      const onMouseMove = (e: MouseEvent) => {
        scheduleIdle(); // сброс таймера при движении
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        Body.setPosition(cursorBody, { x: mx, y: my });
        bodies.forEach(({ body, shape }) => {
          const dx = body.position.x - mx;
          const dy = body.position.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && dist > 1) {
            const densityFactor = Math.min(0.002 / shape.density, 4);
            const f = (1 - dist / 110) * 0.006 * densityFactor;
            Body.applyForce(body, body.position, { x: (dx / dist) * f, y: (dy / dist) * f });
          }
        });
      };

      // ── Гироскоп для мобила ──
      const onOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma == null || e.beta == null) return;
        const gx = Math.max(-1, Math.min(1, e.gamma / 45));
        const gy = Math.max(0.2, Math.min(2, (e.beta + 45) / 90));
        engine.gravity.x = gx;
        engine.gravity.y = gy;
      };

      if (!isMobile) {
        window.addEventListener("mousemove", onMouseMove);
        // Drag on desktop
        const mouse = Mouse.create(canvas);
        World.add(engine.world, MouseConstraint.create(engine, {
          mouse, constraint: { stiffness: 0.16, render: { visible: false } },
        }));
      } else {
        window.addEventListener("deviceorientation", onOrientation);
      }

      scheduleIdle();

      // ── Render loop ──
      Runner.run(runner, engine);
      const loop = () => {
        ctx.clearRect(0, 0, W, H);
        bodies.forEach(({ body, shape, alpha }) =>
          drawShape(ctx, shape, body.position.x, body.position.y, body.angle, alpha)
        );
        animFrame = requestAnimationFrame(loop);
      };
      loop();

      cleanupFn = () => {
        if (idleTimer) clearTimeout(idleTimer);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("deviceorientation", onOrientation);
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
  }, [containerRef, btnRef]);

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
  const btnRef = useRef<HTMLAnchorElement>(null);

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
          if (dist < 130) {
            const f = (1 - dist / 130) * 35;
            xQ[i]((-dx / dist) * f);
            yQ[i]((-dy / dist) * f);
          } else {
            xQ[i](0); yQ[i](0);
          }
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, sectionRef);
    return () => ctx.revert();
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
      <PhysicsCanvas containerRef={sectionRef} btnRef={btnRef} />

      {/* Subtle radial glow only */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 50% 38% at 65% 48%, rgba(200,245,66,0.04) 0%, transparent 60%)",
      }} />

      {/* LEFT: headline */}
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

        <div className="hero-sub mt-8" style={{ maxWidth: 680 }}>
          <p style={{
            fontFamily: "var(--font-unbounded)", fontWeight: 500,
            fontSize: "clamp(0.78rem, 1.1vw, 1rem)",
            color: "rgba(238,241,230,0.55)", letterSpacing: "-0.01em",
            lineHeight: 1.55, marginBottom: "0.4rem",
            userSelect: "none", cursor: "default",
          }}>
            I fix how products sell — from first click to closed deal
          </p>
          <p style={{
            fontFamily: "var(--font-unbounded)", fontWeight: 500,
            fontSize: "clamp(0.78rem, 1.1vw, 1rem)",
            color: "rgba(238,241,230,0.55)", letterSpacing: "-0.01em",
            lineHeight: 1.55, userSelect: "none", cursor: "default",
          }}>
            Bridging UX, product strategy and revenue systems
          </p>
        </div>
      </div>

      {/* RIGHT: CTA — btnRef на кнопку для физики */}
      <div className="relative z-10 flex flex-col gap-4 items-end self-end pb-4">
        <a
          ref={btnRef}
          href="#contact"
          className="hero-btn"
          style={{
            fontFamily: "var(--font-unbounded)", fontWeight: 700,
            fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "1rem 2.2rem", background: "#c8f542", color: "#080807",
            borderRadius: 100, textDecoration: "none", whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          Start a project
        </a>
        <a href="#services" className="hero-btn" style={{
          fontFamily: "var(--font-unbounded)", fontWeight: 400,
          fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase",
          padding: "1rem 2.2rem", background: "transparent", color: "#eef1e6",
          border: "1px solid rgba(238,241,230,0.15)", borderRadius: 100,
          textDecoration: "none", whiteSpace: "nowrap",
        }}>Services</a>
      </div>

      {/* Scroll hint */}
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