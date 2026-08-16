import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

/**
 * Soft full-bleed spectral blob anchored at the top center of the page,
 * mirroring the Folio reference. Reacts gently to pointer and scroll.
 */
export function TopBlob() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.6 });

  const x = useTransform(sx, [0, 1], ["-5%", "5%"]);
  const y = useTransform(sy, [0, 1], ["-4%", "4%"]);

  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 800], [0.42, 0.05]);
  const lift = useTransform(scrollY, [0, 900], ["0%", "-18%"]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX / window.innerWidth);
      my.set(event.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[70vh] overflow-hidden">
      <motion.div style={{ opacity: fade, y: lift }} className="absolute inset-0">
        <motion.div
          style={{ x, y }}
          className="animate-breathe absolute left-1/2 top-[-16vh] h-[62vh] w-[130vw] -translate-x-1/2 blur-[110px]"
        >
          <div className="animate-drift absolute left-[12%] top-[22%] h-[62%] w-[46%] rounded-full bg-spectrum-3" />
          <div
            className="animate-drift absolute left-[30%] top-[38%] h-[58%] w-[42%] rounded-full bg-spectrum-2"
            style={{ animationDelay: "-7s" }}
          />
          <div
            className="animate-drift absolute left-[44%] top-[14%] h-[64%] w-[40%] rounded-full bg-spectrum-4"
            style={{ animationDelay: "-3s" }}
          />
          <div
            className="animate-drift absolute left-[56%] top-[34%] h-[60%] w-[44%] rounded-full bg-spectrum-1"
            style={{ animationDelay: "-11s" }}
          />
          <div
            className="animate-drift absolute left-[66%] top-[18%] h-[58%] w-[38%] rounded-full bg-spectrum-5"
            style={{ animationDelay: "-15s" }}
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent to-background" />
      <div className="absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
