import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import markUrl from "@/assets/substrate-mark.png";
import { openWaitlist } from "./WaitlistDialog";
import { isMuted, setMuted, sfx } from "@/lib/sound";

const links = [
  { label: "Folio", href: "#folio" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Inside Folio", href: "#folio-detail" },
  { label: "Privacy", href: "#privacy" },
  { label: "Company", href: "#company" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(14px)"]);
  const bg = useTransform(scrollY, [0, 120], ["oklch(1 0 0 / 0%)", "oklch(1 0 0 / 62%)"]);
  const border = useTransform(scrollY, [0, 120], ["oklch(1 0 0 / 0%)", "oklch(0.89 0.008 80 / 90%)"]);
  const [muted, setMutedState] = useState(false);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      style={{ backdropFilter: blur, backgroundColor: bg, borderBottom: "1px solid", borderColor: border }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2.5" onMouseEnter={sfx.hover}>
          <img
            src={markUrl}
            alt="Substrate logo"
            className="h-7 w-7 object-contain transition-transform duration-500 group-hover:rotate-6"
          />
          <span className="text-[15px] font-medium tracking-tight">Substrate</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onMouseEnter={sfx.hover}
                className="story-link text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            aria-label={muted ? "Enable sound effects" : "Mute sound effects"}
            onClick={() => {
              const next = !isMuted();
              setMuted(next);
              setMutedState(next);
              if (!next) sfx.toggle();
            }}
            className="rounded-full border border-border bg-card/60 p-2 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>

          <button
            onMouseEnter={sfx.hover}
            onClick={openWaitlist}
            className="rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Join the waitlist
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
