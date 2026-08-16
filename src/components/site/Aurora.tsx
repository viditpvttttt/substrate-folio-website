import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Scroll-reactive spectral aurora. Blooms from the bottom of the page as the
 * visitor reaches the end of the scroll.
 */
export function Aurora() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.1, 0.7, 1]);
  const rise = useTransform(scrollYProgress, [0, 1], ["22%", "0%"]);
  const spread = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const blur = useTransform(scrollYProgress, [0, 1], [90, 46]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-[-25%] bottom-[-30%] h-[95%]"
        style={{ opacity, y: rise, scale: spread, filter }}
      >
        <div className="animate-hue absolute inset-0">
          <div className="animate-drift absolute left-[2%] bottom-[-10%] h-[70%] w-[55%] rounded-full bg-spectrum-1" />
          <div
            className="animate-drift absolute left-[26%] bottom-[-22%] h-[85%] w-[45%] rounded-full bg-spectrum-5"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="animate-drift absolute left-[46%] bottom-[-14%] h-[72%] w-[42%] rounded-full bg-spectrum-4"
            style={{ animationDelay: "-11s" }}
          />
          <div
            className="animate-drift absolute right-[-4%] bottom-[-20%] h-[80%] w-[42%] rounded-full bg-spectrum-3"
            style={{ animationDelay: "-3s" }}
          />
          <div
            className="animate-drift absolute left-[14%] bottom-[-26%] h-[60%] w-[36%] rounded-full bg-spectrum-2"
            style={{ animationDelay: "-14s" }}
          />
        </div>
      </motion.div>
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-transparent" />
      
    </div>
  );
}
