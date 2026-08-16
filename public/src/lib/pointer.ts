import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

/** True when the visitor asked for reduced motion (SSR-safe). */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True for coarse pointers (touch) where cursor effects should be skipped. */
export function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

type PointerSprings = {
  /** Raw viewport pixel position. */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** Spring-smoothed viewport pixel position. */
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  /** Spring-smoothed normalized position (0..1). */
  nx: MotionValue<number>;
  ny: MotionValue<number>;
};

/**
 * Window-level pointer position with spring physics — the shared source of
 * truth for the antigravity-style cursor and every parallax surface.
 */
export function usePointerSprings(config = { stiffness: 180, damping: 26, mass: 0.6 }): PointerSprings {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);

  const sx = useSpring(x, config);
  const sy = useSpring(y, config);
  const snx = useSpring(nx, { stiffness: 70, damping: 24, mass: 0.7 });
  const sny = useSpring(ny, { stiffness: 70, damping: 24, mass: 0.7 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      nx.set(event.clientX / window.innerWidth);
      ny.set(event.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y, nx, ny]);

  return { x, y, sx, sy, nx: snx, ny: sny };
}
