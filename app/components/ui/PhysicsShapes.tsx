"use client";
import { useEffect, useRef } from "react";
import type * as MatterTypes from "matter-js";

type Shape = {
  type: "circle" | "rect" | "triangle" | "pill";
  size: number;
  color: string;
  filled: boolean;
  x: string;
  y: string;
};

const SHAPES: Shape[] = [
  { type: "circle",   size: 52,  color: "#c8f542", filled: true,  x: "12%", y: "-8%" },
  { type: "rect",     size: 44,  color: "#c8f542", filled: false, x: "22%", y: "-5%" },
  { type: "triangle", size: 48,  color: "#eef1e6", filled: false, x: "38%", y: "-10%" },
  { type: "circle",   size: 32,  color: "#eef1e6", filled: true,  x: "52%", y: "-6%" },
  { type: "pill",     size: 58,  color: "#c8f542", filled: false, x: "63%", y: "-9%" },
  { type: "rect",     size: 40,  color: "#eef1e6", filled: true,  x: "74%", y: "-4%" },
  { type: "circle",   size: 64,  color: "#2a2a2a", filled: true,  x: "85%", y: "-11%" },
  { type: "triangle", size: 42,  color: "#c8f542", filled: true,  x: "92%", y: "-7%" },
  { type: "pill",     size: 50,  color: "#eef1e6", filled: false, x: "18%", y: "-15%" },
  { type: "circle",   size: 26,  color: "#c8f542", filled: true,  x: "48%", y: "-3%" },
  { type: "rect",     size: 54,  color: "#eef1e6", filled: false, x: "70%", y: "-16%" },
  { type: "triangle", size: 36,  color: "#c8f542", filled: false, x: "33%", y: "-2%" },
];

export default function PhysicsShapes({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d")!;
    let animFrame: number;

    import("matter-js").then((M) => {
      const { Engine, Runner, Bodies, Body, World, Mouse, MouseConstraint } = M;

      const engine = Engine.create({ gravity: { x: 0, y: 1.4 } });
      const runner = Runner.create();

      // Walls: floor + left + right
      const floor = Bodies.rectangle(W / 2, H + 10, W * 2, 20, {
        isStatic: true, friction: 0.9, restitution: 0.25,
      });
      const wallL = Bodies.rectangle(-10, H / 2, 20, H * 2, {
        isStatic: true, friction: 0.8,
      });
      const wallR = Bodies.rectangle(W + 10, H / 2, 20, H * 2, {
        isStatic: true, friction: 0.8,
      });
      World.add(engine.world, [floor, wallL, wallR]);

      // Invisible cursor repulsion body
      const cursorBody = Bodies.circle(0, 0, 70, {
        isStatic: true,
        isSensor: true,
        collisionFilter: { mask: 0 },
      });
      World.add(engine.world, cursorBody);

      // Build physics bodies
      const bodies: { body: MatterTypes.Body; shape: Shape }[] = [];

      SHAPES.forEach((shape) => {
        const px = (parseFloat(shape.x) / 100) * W;
        const py = (parseFloat(shape.y) / 100) * H;
        const s = shape.size;
        const opts = { restitution: 0.55, friction: 0.1, density: 0.002 };
        let body: MatterTypes.Body;

        if (shape.type === "circle") {
          body = Bodies.circle(px, py, s / 2, opts);
        } else if (shape.type === "triangle") {
          const h = s * 0.866;
          const verts = [
            { x: 0,       y: -h * 0.667 },
            { x:  s / 2,  y:  h * 0.333 },
            { x: -s / 2,  y:  h * 0.333 },
          ];
          const created = Bodies.fromVertices(px, py, [verts as MatterTypes.Vector[]], {
            ...opts, restitution: 0.45,
          });
          body = Array.isArray(created) ? created[0] : created;
        } else if (shape.type === "pill") {
          body = Bodies.rectangle(px, py, s * 1.8, s, {
            ...opts, chamfer: { radius: s / 2 },
          });
        } else {
          body = Bodies.rectangle(px, py, s, s, {
            ...opts, chamfer: { radius: 5 },
          });
        }

        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
        World.add(engine.world, body);
        bodies.push({ body, shape });
      });

      // Mouse drag
      const mouse = Mouse.create(canvas);
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.18, render: { visible: false } },
      });
      World.add(engine.world, mc);

      // Cursor repulsion on mousemove
      const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        Body.setPosition(cursorBody, { x: mx, y: my });

        bodies.forEach(({ body }) => {
          const dx = body.position.x - mx;
          const dy = body.position.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 100;
          if (dist < radius && dist > 1) {
            const force = (1 - dist / radius) * 0.007;
            Body.applyForce(body, body.position, {
              x: (dx / dist) * force,
              y: (dy / dist) * force,
            });
          }
        });
      };
      window.addEventListener("mousemove", onMouseMove);

      // Draw each shape on canvas
      const draw = (shape: Shape, body: MatterTypes.Body) => {
        const { x, y } = body.position;
        const a = body.angle;
        const s = shape.size;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(a);
        ctx.globalAlpha = 0.85;

        if (shape.filled) {
          ctx.fillStyle = shape.color;
          ctx.strokeStyle = "transparent";
          ctx.lineWidth = 0;
        } else {
          ctx.fillStyle = "transparent";
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = 1.5;
        }

        ctx.beginPath();

        if (shape.type === "circle") {
          ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
        } else if (shape.type === "triangle") {
          const h = s * 0.866;
          ctx.moveTo(0, -h * 0.667);
          ctx.lineTo( s / 2,  h * 0.333);
          ctx.lineTo(-s / 2,  h * 0.333);
          ctx.closePath();
        } else if (shape.type === "pill") {
          const w = s * 1.8;
          const r = s / 2;
          ctx.roundRect(-w / 2, -r, w, s, r);
        } else {
          ctx.roundRect(-s / 2, -s / 2, s, s, 5);
        }

        if (shape.filled) ctx.fill();
        else ctx.stroke();

        ctx.restore();
      };

      // Render loop
      Runner.run(runner, engine);

      const loop = () => {
        ctx.clearRect(0, 0, W, H);
        bodies.forEach(({ body, shape }) => draw(shape, body));
        animFrame = requestAnimationFrame(loop);
      };
      loop();

      // Cleanup
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animFrame);
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
      };
    });

    return () => cancelAnimationFrame(animFrame);
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[5]"
      style={{ pointerEvents: "auto" }}
    />
  );
}