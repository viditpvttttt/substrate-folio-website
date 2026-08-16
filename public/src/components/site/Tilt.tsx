import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { prefersReducedMotion } from "@/lib/pointer";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  strength?: number;
  /** How far the content floats toward the viewer on hover, in px. */
  lift?: number;
  glare?: boolean;
};

/**
 * Antigravity-style 3D surface: the whole card rotates, floats and casts a
 * moving shadow under a spring-damped pointer, so it feels weightless rather
 * than snapped to the mouse.
 */
export function Tilt({ children, className, strength = 12, lift = 26, glare = true }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hoverValue = useMotionValue(0);
  const [reduced] = useState(prefersReducedMotion);

  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const hover = useSpring(hoverValue, { stiffness: 120, damping: 18, mass: 0.5 });

  const rotateY = useTransform(sx, [0, 1], [-strength, strength]);
  const rotateX = useTransform(sy, [0, 1], [strength, -strength]);
  const z = useTransform(hover, [0, 1], [0, lift]);
  const scale = useTransform(hover, [0, 1], [1, 1.014]);

  const shadowX = useTransform(sx, [0, 1], [26, -26]);
  const shadowY = useTransform(sy, [0, 1], [26, -26]);
  const shadowBlur = useTransform(hover, [0, 1], [30, 60]);
  const shadowAlpha = useTransform(hover, [0, 1], [0.1, 0.22]);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px -24px oklch(0.17 0.008 65 / ${shadowAlpha})`;

  const glareX = useTransform(sx, [0, 1], ["8%", "92%"]);
  const glareY = useTransform(sy, [0, 1], ["8%", "92%"]);
  const glareOpacity = useTransform(hover, [0, 1], [0, 0.7]);
  const glareBg = useMotionTemplate`radial-gradient(460px circle at ${glareX} ${glareY}, oklch(1 0 0 / 60%), transparent 62%)`;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1100 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width);
        py.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerEnter={() => hoverValue.set(1)}
      onPointerLeave={() => {
        hoverValue.set(0);
        px.set(0.5);
        py.set(0.5);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, z, scale, boxShadow, transformStyle: "preserve-3d" }}
        className="relative h-full w-full rounded-[inherit]"
      >
        {children}
        {glare ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
            style={{ background: glareBg, opacity: glareOpacity }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
