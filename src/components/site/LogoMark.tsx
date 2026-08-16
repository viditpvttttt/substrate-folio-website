import { motion, useMotionTemplate, useSpring, useTransform } from "motion/react";
import markUrl from "@/assets/substrate-mark.png";
import { usePointerSprings } from "@/lib/pointer";

type LogoMarkProps = {
  /** Rendered pixel size of the mark. */
  size?: number;
  className?: string;
};

/**
 * The Substrate mark as a genuine 3D object: stacked depth layers, a
 * spring-driven orbit that follows the pointer, a spectral floor glow and a
 * slow antigravity float.
 */
export function LogoMark({ size = 360, className }: LogoMarkProps) {
  const { nx, ny } = usePointerSprings();

  const rotateY = useTransform(nx, [0, 1], [-26, 26]);
  const rotateX = useTransform(ny, [0, 1], [18, -18]);
  const rotateZ = useSpring(useTransform(nx, [0, 1], [-6, 6]), {
    stiffness: 50,
    damping: 20,
  });

  const glowX = useTransform(nx, [0, 1], ["35%", "65%"]);
  const glowY = useTransform(ny, [0, 1], ["30%", "70%"]);
  const glow = useMotionTemplate`radial-gradient(60% 60% at ${glowX} ${glowY}, oklch(1 0 0 / 70%), transparent 70%)`;

  // Depth stack — dimmer, offset copies behind the face read as extrusion.
  const layers = [
    { z: -46, opacity: 0.16, blur: 10, scale: 0.985 },
    { z: -30, opacity: 0.24, blur: 6, scale: 0.99 },
    { z: -16, opacity: 0.34, blur: 3, scale: 0.995 },
  ];

  return (
    <motion.div
      className={className}
      style={{ perspective: 1000, width: size, height: size }}
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, rotateZ, transformStyle: "preserve-3d" }}
      >
        {/* spectral bloom cast behind the object */}
        <div
          aria-hidden
          className="animate-breathe absolute inset-[6%] rounded-full opacity-60 blur-3xl"
          style={{ background: "var(--gradient-spectrum)", transform: "translateZ(-90px)" }}
        />

        {layers.map((layer) => (
          <img
            key={layer.z}
            aria-hidden
            src={markUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
            style={{
              transform: `translateZ(${layer.z}px) scale(${layer.scale})`,
              opacity: layer.opacity,
              filter: `blur(${layer.blur}px) saturate(1.15)`,
            }}
          />
        ))}

        {/* face */}
        <img
          src={markUrl}
          alt="Substrate's spectral arch mark, rendered as a glossy three-dimensional object"
          className="relative h-full w-full object-contain"
          style={{
            transform: "translateZ(28px)",
            filter: "drop-shadow(0 44px 60px oklch(0.66 0.19 295 / 32%))",
          }}
        />

        {/* pointer-tracked specular sheen clipped to the mark */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background: glow,
            transform: "translateZ(40px)",
            maskImage: `url(${markUrl})`,
            WebkitMaskImage: `url(${markUrl})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />

        {/* contact shadow on the paper */}
        <div
          aria-hidden
          className="absolute bottom-[6%] left-1/2 h-8 w-[58%] -translate-x-1/2 rounded-[50%] bg-foreground/12 blur-2xl"
          style={{ transform: "translateX(-50%) translateZ(-100px)" }}
        />
      </motion.div>
    </motion.div>
  );
}
