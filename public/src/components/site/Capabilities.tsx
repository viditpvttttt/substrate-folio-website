import { motion } from "motion/react";
import { Tilt } from "./Tilt";
import { sfx } from "@/lib/sound";
import { BrainCircuit, CloudSun, Code2, Compass, Briefcase, Newspaper } from "lucide-react";

const items = [
  {
    icon: CloudSun,
    title: "Weather, properly",
    body: "Live conditions for anywhere, rendered as a card you actually want to look at — not a paragraph of numbers.",
  },
  {
    icon: Newspaper,
    title: "News you choose",
    body: "Pick your own topics — from \"world\" to \"formula 1\" — and Folio keeps a quiet, self-refreshing feed.",
    featured: true,
  },
  {
    icon: BrainCircuit,
    title: "Memory that sticks",
    body: "Tell it once. Folio remembers your city, your tone, your stack, and quietly uses it forever.",
  },
  {
    icon: Code2,
    title: "Workbench",
    body: "A real editor, your files, and an AI pair-programmer that reads and writes them while you talk to it.",
  },
  {
    icon: Briefcase,
    title: "Work mode",
    body: "Meeting prep, standups, one-pagers, slide outlines and email drafts, tuned for people with calendars.",
  },
  {
    icon: Compass,
    title: "Deep research",
    body: "It browses, reads and synthesises — with sources — instead of guessing from last year's training data.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-display max-w-2xl text-[clamp(2.2rem,5vw,3.6rem)]">
          Six things, done unusually well.
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Tilt key={item.title} strength={8} glare={false}>
            <motion.article
              onMouseEnter={sfx.hover}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="card-lift group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6"
            >
              {item.featured ? (
                <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-spectrum-3/40 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
              ) : (
                <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-spectrum-1/0 blur-3xl transition-all duration-700 group-hover:bg-spectrum-1/25" />
              )}
              <item.icon className="relative h-5 w-5 text-foreground" strokeWidth={1.5} />
              <h3 className="text-display relative mt-5 text-[1.35rem]">{item.title}</h3>
              <p className="relative mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.article>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
