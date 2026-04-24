"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WHERE", "DESIGN", "MEETS", "GROWTH"];
const STYLES: React.CSSProperties[] = [
  { color: "#0a0a0a" },
  { color: "transparent", WebkitTextStroke: "1.5px #0a0a0a" },
  { color: "rgba(10,10,10,0.35)" },
  { color: "#c8f542", WebkitTextStroke: "1.5px #5a7a00" },
];

type FillStyle =
  | { kind: "solid"; color: string }
  | { kind: "outline"; color: string; width: number }
  | { kind: "glow"; color: string };

type ShapeDef = {
  type: "circle" | "rect" | "triangle" | "diamond" | "halfcircle";
  size: number;
  fill: FillStyle;
  x: string;
  y: string;
  density: number;
  restitution: number;
};

const SHAPES: ShapeDef[] = [
  { type: "circle",     size: 56, fill: { kind: "solid",   color: "#c8f542" },             x: "15%", y: "5%", density: 0.006, restitution: 0.25 },
  { type: "triangle",   size: 50, fill: { kind: "outline", color: "#ffffff", width: 1.5 }, x: "38%", y: "3%",  density: 0.001, restitution: 0.82 },
  { type: "rect",       size: 44, fill: { kind: "solid",   color: "#ff6b2b" },             x: "62%", y: "6%", density: 0.005, restitution: 0.28 },
  { type: "diamond",    size: 52, fill: { kind: "glow",    color: "#8b5cf6" },             x: "80%", y: "4%",  density: 0.002, restitution: 0.6  },
  { type: "halfcircle", size: 48, fill: { kind: "outline", color: "#ffd426", width: 1.5 }, x: "50%", y: "2%", density: 0.001, restitution: 0.75 },
];

const EXTRA: ShapeDef[] = [
  { type: "circle",     size: 42, fill: { kind: "glow",    color: "#ffd426" },             x: "90%", y: "6%", density: 0.002, restitution: 0.6 },
  { type: "rect",       size: 46, fill: { kind: "outline", color: "#c8f542", width: 1.5 }, x: "88%", y: "7%", density: 0.001, restitution: 0.78 },
  { type: "triangle",   size: 44, fill: { kind: "solid",   color: "#8b5cf6" },             x: "85%", y: "5%", density: 0.004, restitution: 0.35 },
];

function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: ShapeDef,
  x: number, y: number, angle: number, alpha = 1
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
    case "halfcircle":
      path.arc(0, 0, s / 2, Math.PI, 0);
      path.lineTo(s / 2, 0);
      path.lineTo(-s / 2, 0);
      path.closePath();
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
    default:
      path.roundRect(-s / 2, -s / 2, s, s, s * 0.1);
  }

  const f = shape.fill;
  if (f.kind === "solid") {
    ctx.globalAlpha *= 0.9;
    ctx.fillStyle = f.color;
    ctx.fill(path);
  } else if (f.kind === "outline") {
    ctx.globalAlpha *= 0.8;
    ctx.strokeStyle = f.color;
    ctx.lineWidth = f.width;
    ctx.stroke(path);
  } else {
    // glow: два слоя
    ctx.globalAlpha *= 0.55;
    ctx.fillStyle = f.color;
    ctx.shadowColor = f.color;
    ctx.shadowBlur = 24;
    ctx.fill(path);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = alpha * 0.98;
    ctx.fillStyle = f.color;
    ctx.fill(path);
  }
  ctx.restore();
}

/**
 * Возвращает Matter.js body для фигуры.
 * ВАЖНО: triangle и diamond → Bodies.rectangle (как физический примитив),
 * визуальная форма рисуется через drawShape() на canvas.
 * Bodies.fromVertices убран полностью — он ненадёжен без decomp.js.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createPhysicsBody(Matter: any, shape: ShapeDef, px: number, py: number) {
  const { Bodies } = Matter;
  const rawSize = Number(shape.size);
  const s = Math.max(12, Number.isFinite(rawSize) ? rawSize : 24);
  const opts = {
    restitution: shape.restitution,
    friction: 0.08,
    density: shape.density,
    // Скрываем встроенный рендер Matter (мы рисуем сами)
    render: { visible: false },
  };

  switch (shape.type) {
    case "circle":
    case "halfcircle":
      // Круг как физическая форма — идеально
      return Bodies.circle(px, py, Math.max(1, s / 2), opts);
    case "triangle":
      // Физика: равносторонний треугольник → описывающий круг с радиусом ~0.48*s
      return Bodies.circle(px, py, Math.max(1, s * 0.48), opts);
    case "diamond":
      // Физика: прямоугольник со скруглением (ромб вписан в квадрат s×s)
      return Bodies.rectangle(px, py, Math.max(1, s * 0.7), Math.max(1, s * 0.7), {
        ...opts,
        chamfer: { radius: Math.min(8, s * 0.15) },
      });
    default:
      // rect
      return Bodies.rectangle(px, py, s, s, {
        ...opts,
        chamfer: { radius: Math.max(1, s * 0.1) },
      });
  }
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
    if (W <= 0 || H <= 0) return;

    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    let animFrame: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let cleanupFn: (() => void) | null = null;

    import("matter-js").then((Matter) => {
      const { Engine, Runner, Bodies, Body, World, Mouse, MouseConstraint } = Matter;
      const engine = Engine.create({ gravity: { x: 0, y: isMobile ? 0.6 : 1.2 } });
      const runner = Runner.create();

      // Стены
      World.add(engine.world, [
        Bodies.rectangle(W / 2, H + 10, W * 2, 20, { isStatic: true, friction: 0.8, restitution: 0.2 }),
        Bodies.rectangle(-10, H / 2, 20, H * 2, { isStatic: true }),
        Bodies.rectangle(W + 10, H / 2, 20, H * 2, { isStatic: true }),
        Bodies.rectangle(W / 2, -10, W * 2, 20, { isStatic: true }),
      ]);

      // Кнопка как физическое тело
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let btnBody: any = null;
      setTimeout(() => {
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
      }, 600);

      // Курсор как невидимый сенсор
      const cursorBody = Bodies.circle(0, 0, 72, {
        isStatic: true, isSensor: true, collisionFilter: { mask: 0 },
      });
      World.add(engine.world, cursorBody);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bodies: { body: any; shape: ShapeDef; alpha: number }[] = [];
      let idleTimer: ReturnType<typeof setTimeout> | null = null;

      // Функция для выбора уникальной фигуры (не повторяющейся на экране)
      const getUniqueFigure = (): ShapeDef => {
        const availablePool = [...SHAPES, ...EXTRA];
        const currentTypes = new Set(bodies.map((b) => b.shape.type));
        const currentColors = new Set(
          bodies
            .map((b) => {
              const f = b.shape.fill;
              return f.kind === "solid" ? f.color : null;
            })
            .filter((c) => c !== null)
        );

        // Ищем фигуру, которой нет в bodies по type
        for (const candidate of availablePool) {
          if (!currentTypes.has(candidate.type)) {
            return candidate;
          }
        }

        // Если все types заняты, ищем по другому цвету
        for (const candidate of availablePool) {
          if (candidate.fill.kind === "solid" && !currentColors.has(candidate.fill.color)) {
            return candidate;
          }
        }

        // Если все типы и цвета заняты, вернуть случайную
        return availablePool[Math.floor(Math.random() * availablePool.length)];
      };

      const addBody = (shape: ShapeDef, startX?: number, startY?: number) => {
        const xPct = Number.parseFloat(shape.x?.toString() ?? "");
        const yPct = Number.parseFloat(shape.y?.toString() ?? "");
        const parsedX = Number.isFinite(xPct) ? (xPct / 100) * W : W / 2;
        const parsedY = Number.isFinite(yPct) ? Math.max(0, (yPct / 100) * H) : H * 0.3;
        const s = Math.max(12, Number.isFinite(shape.size) ? shape.size : 24);

        const px = typeof startX === "number" ? startX : Math.min(Math.max(parsedX, s), W - s);
        const pyRaw = typeof startY === "number" ? startY : parsedY;
        const py = Math.min(Math.max(pyRaw, 0), H - s);

        const body = createPhysicsBody(Matter, shape, px, py);
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);
        World.add(engine.world, body);
        const entry = { body, shape, alpha: 1 };
        bodies.push(entry);
        return entry;
      };

      SHAPES.forEach((s) => addBody(s));

      // Idle — фигура растворяется, новая падает
      const scheduleIdle = () => {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (bodies.length === 0) return;
          const idx = Math.floor(Math.random() * bodies.length);
          const target = bodies[idx];
          gsap.to(target, {
            alpha: 0, duration: 1.2, ease: "power2.in",
            onComplete: () => {
              World.remove(engine.world, target.body);
              const i = bodies.findIndex((b) => b === target);
              if (i !== -1) bodies.splice(i, 1);
              setTimeout(() => {
                const ns = getUniqueFigure();
                addBody(ns,
                  W * 0.88 + (Math.random() - 0.5) * 50,
                  -(Math.max(12, ns.size) + 8),
                );
              }, 800);
            },
          });
          scheduleIdle();
        }, 15000);
      };

      // Курсор — отталкивание фигур
      const onMouseMove = (e: MouseEvent) => {
        scheduleIdle();
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        Body.setPosition(cursorBody, { x: mx, y: my });
        bodies.forEach(({ body, shape }) => {
          const dx = body.position.x - mx;
          const dy = body.position.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && dist > 1) {
            const df = Math.min(0.002 / shape.density, 4);
            const f = (1 - dist / 110) * 0.006 * df;
            Body.applyForce(body, body.position, { x: (dx / dist) * f, y: (dy / dist) * f });
          }
        });
      };

      // Гироскоп — beta минус 90° для нейтральной вертикальной позиции
      const onOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma == null || e.beta == null) return;
        const gx = Math.max(-1.5, Math.min(1.5, e.gamma / 40));
        const gy = Math.max(-0.5, Math.min(2, (e.beta - 90) / 40));
        engine.gravity.x = gx;
        engine.gravity.y = gy;
      };

      if (!isMobile) {
        window.addEventListener("mousemove", onMouseMove);
        const mouse = Mouse.create(canvas);
        World.add(engine.world, MouseConstraint.create(engine, {
          mouse, constraint: { stiffness: 0.16, render: { visible: false } },
        }));
      } else {
        // iOS требует явного разрешения
        const requestGyro = () => {
          const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
          if (typeof DOE.requestPermission === "function") {
            DOE.requestPermission().then((res) => {
              if (res === "granted") window.addEventListener("deviceorientation", onOrientation);
            });
          } else {
            window.addEventListener("deviceorientation", onOrientation);
          }
        };
        canvas.addEventListener("click", requestGyro, { once: true });

        // Touch drag — замена курсора на мобиле
        canvas.addEventListener("touchmove", (e) => {
          const t = e.touches[0];
          const rect = canvas.getBoundingClientRect();
          const mx = t.clientX - rect.left;
          const my = t.clientY - rect.top;
          Body.setPosition(cursorBody, { x: mx, y: my });
          bodies.forEach(({ body, shape }) => {
            const dx = body.position.x - mx;
            const dy = body.position.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90 && dist > 1) {
              const df = Math.min(0.002 / shape.density, 4);
              const f = (1 - dist / 90) * 0.008 * df;
              Body.applyForce(body, body.position, { x: (dx / dist) * f, y: (dy / dist) * f });
            }
          });
        }, { passive: true });
      }

      scheduleIdle();

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
  const bgLayer1Ref = useRef<HTMLDivElement>(null);


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

        const fx = (e.clientX / window.innerWidth - 0.5) * 32;
        const fy = (e.clientY / window.innerHeight - 0.5) * 28;
        const layer = bgLayer1Ref.current;

        if (layer) {
          gsap.to(layer, {
            x: fx,
            y: fy,
            duration: 1.1,
            ease: "power3.out",
          });
        }
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
        background: "#f0f9d4",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        padding: "clamp(80px,12vw,140px) clamp(1.2rem,5vw,4rem) clamp(2rem,5vw,4rem)",
        gap: "1rem",
      }}
    >
      <PhysicsCanvas containerRef={sectionRef} btnRef={btnRef} />

      <div ref={bgLayer1Ref} className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 60% 50% at 60% 40%, rgba(180,230,60,0.35) 0%, transparent 60%)",
        transform: "translate3d(0,0,0)",
      }} />

      <div className="relative z-10">
        <h1 style={{
          fontFamily: "var(--font-unbounded)", fontWeight: 900,
          fontSize: "clamp(2.8rem,10vw,10rem)", lineHeight: 0.9, letterSpacing: "-0.05em",
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

        <div className="hero-sub mt-6" style={{ maxWidth: 680 }}>
          <p style={{
            fontFamily: "var(--font-unbounded)", fontWeight: 500,
            fontSize: "clamp(0.65rem,1.1vw,1rem)", color: "rgba(10,10,10,0.55)",
            letterSpacing: "-0.01em", lineHeight: 1.55, marginBottom: "0.4rem",
            userSelect: "none", cursor: "default", caretColor: "transparent",
            outline: "none", border: "none",
          }}>
            I bridge UX gaps that cost you revenue
          </p>
          <p style={{
            fontFamily: "var(--font-unbounded)", fontWeight: 500,
            fontSize: "clamp(0.65rem,1.1vw,1rem)", color: "rgba(10,10,10,0.55)",
            letterSpacing: "-0.01em", lineHeight: 1.55,
            userSelect: "none", cursor: "default", caretColor: "transparent",
            outline: "none", border: "none",
          }}>
            Strategy · Product · Sales — one person, zero agency overhead
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-3 items-end self-end pb-4">
        <a ref={btnRef} href="#contact" className="hero-btn" style={{
          fontFamily: "var(--font-unbounded)", fontWeight: 700,
          fontSize: "clamp(0.55rem,1.2vw,0.65rem)", letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "clamp(0.7rem,1.5vw,1rem) clamp(1.2rem,2.5vw,2.2rem)",
          background: "#0a0a0a", color: "#f0f9d4", borderRadius: 100,
          textDecoration: "none", whiteSpace: "nowrap",
        }}>Start a project</a>
        <a href="#services" className="hero-btn" style={{
          fontFamily: "var(--font-unbounded)", fontWeight: 400,
          fontSize: "clamp(0.52rem,1.1vw,0.62rem)", letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "clamp(0.7rem,1.5vw,1rem) clamp(1.2rem,2.5vw,2.2rem)",
          background: "transparent", color: "#0a0a0a",
          border: "1px solid rgba(10,10,10,0.2)", borderRadius: 100,
          textDecoration: "none", whiteSpace: "nowrap",
        }}>Services</a>
      </div>

      <div className="absolute bottom-8 left-16 hidden md:flex flex-col items-center gap-2" style={{
        fontFamily: "var(--font-unbounded)", fontSize: "0.42rem",
        letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(10,10,10,0.2)",
      }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(10,10,10,0.3), transparent)" }} />
      </div>
    </section>
  );
}