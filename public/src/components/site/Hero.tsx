import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LogoMark } from "./LogoMark";
import { Magnetic } from "./Magnetic";
import { openWaitlist } from "./WaitlistDialog";
import { sfx } from "@/lib/sound";
import { usePointerSprings } from "@/lib/pointer";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Pointer parallax: the mark drifts against the page like it has no weight.
  const { nx, ny } = usePointerSprings();
  const markDriftX = useTransform(nx, [0, 1], [-22, 22]);
  const markDriftZ = useTransform(ny, [0, 1], [1.5, -1.5]);

  return (
    <section ref={ref} id="top" className="relative z-10 overflow-hidden pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 blur-[110px]">
        <div className="animate-drift absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-spectrum-1/40" />
        <div
          className="animate-drift absolute right-[10%] top-[24%] h-80 w-80 rounded-full bg-spectrum-4/35"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="animate-drift absolute left-[38%] top-[0%] h-64 w-64 rounded-full bg-spectrum-3/35"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div style={{ y: copyY, opacity: fade }} className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
          >
            Substrate — the layer underneath
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-display mt-6 text-[clamp(2.5rem,6.6vw,4.7rem)]"
          >
            <span className="block">We build the ground</span>
            <span className="block">software grows on.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground"
          >
            A research and product studio for the ambient computer. Our first company is Folio — an
            AI dashboard and assistant that thinks in your context, not in tabs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic pull={8}>
              <button
                onClick={openWaitlist}
                onMouseEnter={sfx.hover}
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                Meet Folio
              </button>
            </Magnetic>
            <Magnetic pull={8}>
              <a
                href="#capabilities"
                onMouseEnter={sfx.hover}
                className="inline-block rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-accent"
              >
                What we're building
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: markY, scale: markScale, x: markDriftX, rotate: markDriftZ }}
          className="relative mt-16 flex justify-center"
        >
          <div
            aria-hidden
            className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-3xl"
            style={{
              background:
                "conic-gradient(from 0deg, var(--spectrum-1), var(--spectrum-4), var(--spectrum-3), var(--spectrum-2), var(--spectrum-5), var(--spectrum-1))",
            }}
          />
          <LogoMark size={380} className="max-w-full" />
        </motion.div>
      </div>
    </section>
  );
}
