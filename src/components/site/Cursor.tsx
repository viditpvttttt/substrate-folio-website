import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { isCoarsePointer, prefersReducedMotion, usePointerSprings } from "@/lib/pointer";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Antigravity-style cursor: a weightless spectral orb that trails the pointer
 * on spring physics, tilts in 3D with its own inertia, and swells when it
 * floats over anything interactive.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);
  const { x, y, sx, sy } = usePointerSprings({ stiffness: 300, damping: 30, mass: 0.5 });

  // Slower trailing halo for a sense of mass / inertia.
  const hx = useSpring(x, { stiffness: 90, damping: 20, mass: 1.1 });
  const hy = useSpring(y, { stiffness: 90, damping: 20, mass: 1.1 });

  // Derived from the lag between the pointer and its trailing halo.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const stretch = useMotionValue(1);

  useEffect(() => {
    const update = () => {
      const lagX = x.get() - hx.get();
      const lagY = y.get() - hy.get();
      rotateY.set(clamp((lagX / 160) * 32, -32, 32));
      rotateX.set(clamp((-lagY / 160) * 32, -32, 32));
      stretch.set(Math.min(1.4, 1 + (Math.abs(lagX) + Math.abs(lagY)) / 400));
    };
    const unsubX = hx.on("change", update);
    const unsubY = hy.on("change", update);
    return () => {
      unsubX();
      unsubY();
    };
  }, [x, y, hx, hy, rotateX, rotateY, stretch]);

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const interactive = "a, button, input, textarea, select, [role='button'], [data-magnetic]";
    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setHot(Boolean(target?.closest?.(interactive)));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[999] hidden lg:block">
      {/* trailing spectral halo */}
      <motion.div
        className="absolute -ml-[36px] -mt-[36px] h-[72px] w-[72px] rounded-full opacity-70 blur-xl"
        style={{ x: hx, y: hy, background: "var(--gradient-spectrum)", scale: stretch }}
        animate={{ opacity: hot ? 0.9 : 0.6 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      />
      {/* springy 3D ring */}
      <motion.div
        className="absolute -ml-[19px] -mt-[19px] h-[38px] w-[38px] rounded-full border border-foreground/25"
        style={{
          x: sx,
          y: sy,
          rotateX,
          rotateY,
          transformPerspective: 400,
          transformStyle: "preserve-3d",
        }}
        animate={{ scale: down ? 0.78 : hot ? 1.8 : 1, opacity: hot ? 0.9 : 0.65 }}
        transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.5 }}
      >
        <div className="absolute inset-[3px] rounded-full bg-background/10" />
      </motion.div>
      {/* precise dot, no lag */}
      <motion.div
        className="absolute -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-foreground"
        style={{ x, y }}
        animate={{ scale: hot ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
      />
    </div>
  );
}
