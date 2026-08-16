import { motion } from "motion/react";
import markUrl from "@/assets/substrate-mark.png";
import { openWaitlist } from "./WaitlistDialog";
import { sfx } from "@/lib/sound";
import { Aurora } from "./Aurora";

const columns = [
  {
    title: "Folio",
    links: [
      { label: "Overview", href: "#folio" },
      { label: "Workbench", href: "#folio-detail" },
      { label: "Work mode", href: "#folio-detail" },
      { label: "Release notes", href: "#top" },
      { label: "Download", href: "#waitlist" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help", href: "#top" },
      { label: "Status", href: "#top" },
      { label: "Privacy", href: "#privacy" },
      { label: "Terms of use", href: "#privacy" },
      { label: "Security", href: "#privacy" },
    ],
  },
  {
    title: "Substrate",
    links: [
      { label: "About us", href: "#company" },
      { label: "Research", href: "#capabilities" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "X", href: "https://x.com/Substratedevs" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/substratedevs/" },
      { label: "Instagram", href: "https://www.instagram.com/substrate.devs/" },
    ],
  },
];

const isExternal = (href: string) => href.startsWith("http");

export function Closing() {
  return (
    <section id="company" className="relative border-t border-border">
      <div id="waitlist" className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-display text-[clamp(2.4rem,6vw,4.4rem)]"
        >
          Ready for a better day?
        </motion.h2>

        <div className="mt-9 flex justify-center">
          <button
            onMouseEnter={sfx.hover}
            onClick={openWaitlist}
            className="relative overflow-hidden rounded-2xl bg-primary px-8 py-4 text-[15px] font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-1"
          >
            Join the Waitlist
          </button>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Private beta, opening in waves. No spam — just the launch note and your invite.
        </p>
      </div>

      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 border-t border-border/60 pt-12 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em]">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onMouseEnter={sfx.hover}
                      target={isExternal(link.href) ? "_blank" : undefined}
                      rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                      className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex items-start justify-start lg:justify-end">
            <div className="text-right">
              <img
                src={markUrl}
                alt="Substrate logo"
                className="ml-auto h-12 w-12 object-contain"
              />
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                SUBSTRATE
                <br />
                the layer underneath
              </p>
              <p className="mt-4 font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground/70">
                © {new Date().getFullYear()} Substrate. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <div className="relative h-[46vh] min-h-[280px] w-full overflow-hidden">
        <Aurora />
      </div>
    </section>
  );
}
