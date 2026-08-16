import { useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { prefersReducedMotion } from "@/lib/pointer";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Max travel toward the pointer, in px. */
  pull?: number;
};

/** Element that drifts toward the pointer on spring physics, then floats back. */
export function Magnetic({ children, className, pull = 10 }: MagneticProps) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const [reduced] = useState(prefersReducedMotion);

  const spring = { stiffness: 200, damping: 16, mass: 0.4 };
  const x = useSpring(useTransform(mx, [0, 1], [-pull, pull]), spring);
  const y = useSpring(useTransform(my, [0, 1], [-pull, pull]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), spring);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), spring);

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      data-magnetic
      className={`inline-block ${className ?? ""}`}
      style={{ x, y, rotateX, rotateY, transformPerspective: 600, transformStyle: "preserve-3d" }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width);
        my.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {children}
    </motion.span>
  );
}
