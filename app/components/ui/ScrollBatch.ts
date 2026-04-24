"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Axis = "x" | "y";

export interface BatchRevealConfig {
  selector: string;
  trigger?: string | Element | null;
  start?: string;
  batchMax?: number;
  interval?: number;
  distance?: number;
  axis?: Axis;
  opacity?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  once?: boolean;
}

export function batchReveal(root: HTMLElement, config: BatchRevealConfig) {
  const {
    selector,
    trigger = root,
    start = "top 85%",
    batchMax = 6,
    interval = 0.15,
    distance = 40,
    axis = "y",
    opacity = 0,
    duration = 0.85,
    ease = "power3.out",
    stagger = 0.08,
    once = true,
  } = config;

  const targets = root.querySelectorAll(selector);
  if (!targets.length) return null;

  gsap.set(targets, { opacity, [axis]: distance });

  return ScrollTrigger.batch(targets, {
    interval,
    batchMax,
    start,
    once,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        [axis]: 0,
        duration,
        ease,
        stagger,
        overwrite: true,
      });
    },
    onEnterBack: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        [axis]: 0,
        duration,
        ease,
        stagger,
        overwrite: true,
      });
    },
    trigger,
  });
}
