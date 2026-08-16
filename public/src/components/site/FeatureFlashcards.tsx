import { useState } from "react";
import { motion } from "motion/react";
import {
  CloudSun,
  Newspaper,
  BrainCircuit,
  Code2,
  Briefcase,
  Compass,
  RotateCcw,
} from "lucide-react";
import { sfx } from "@/lib/sound";

type Card = {
  icon: typeof CloudSun;
  title: string;
  front: string;
  back: string;
  stat: string;
};

const cards: Card[] = [
  {
    icon: CloudSun,
    title: "Weather, properly",
    front: "Live conditions for anywhere on earth — read like a friend would describe them.",
    back: "Hour-by-hour forecasts, what to wear, when the rain lands. No wall of numbers, just the sentence you actually needed.",
    stat: "Any city, instantly",
  },
  {
    icon: Newspaper,
    title: "News you choose",
    front: "A quiet, self-refreshing feed built from the topics you pick.",
    back: 'From "world" to "formula 1" — no algorithm deciding what matters, no infinite scroll, no engagement bait.',
    stat: "Topics you define",
  },
  {
    icon: BrainCircuit,
    title: "Memory that sticks",
    front: "Tell it once. It remembers — quietly, and only for you.",
    back: "Your city, your tone, your stack. Editable and deletable line by line — never a shadow profile you can't see.",
    stat: "Persistent context",
  },
  {
    icon: Code2,
    title: "Workbench",
    front: "A real editor and your files, with an AI pair-programmer built in.",
    back: "It reads and writes in place while you talk it through — not a chat window you copy code out of.",
    stat: "Reads & writes in place",
  },
  {
    icon: Briefcase,
    title: "Work mode",
    front: "Meeting prep, standups and drafts, tuned to your calendar.",
    back: "One-pagers, slide outlines and email drafts that sound like you — it arrives at the meeting already briefed.",
    stat: "Briefed before you are",
  },
  {
    icon: Compass,
    title: "Deep research",
    front: "It browses, reads and synthesises multiple sources for you.",
    back: "Every claim keeps its citation — instead of guessing from stale training data, it opens the page and checks.",
    stat: "Citations, always",
  },
];

function Flashcard({ card, index }: { card: Card; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1400px]"
    >
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`${card.title} — tap to flip`}
        onMouseEnter={sfx.hover}
        onClick={() => {
          setFlipped((f) => !f);
          sfx.click();
        }}
        className="group relative block h-64 w-full text-left focus:outline-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            className="card-lift absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-spectrum-2/0 blur-3xl transition-all duration-700 group-hover:bg-spectrum-2/30" />
            <div className="relative flex items-center justify-between">
              <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="relative">
              <h3 className="text-display text-[1.3rem]">{card.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                {card.front}
              </p>
            </div>
            <div className="relative flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground/60">
              <RotateCcw className="h-3 w-3" />
              Tap to flip
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-border p-6 text-primary-foreground"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "var(--gradient-spectrum)",
            }}
          >
            <div className="absolute inset-0 bg-foreground/10" />
            <div className="relative flex items-center justify-between">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
              <span className="rounded-full bg-background/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur">
                {card.stat}
              </span>
            </div>
            <p className="relative text-[14.5px] leading-relaxed">{card.back}</p>
            <div className="relative font-mono text-[10.5px] uppercase tracking-[0.16em] opacity-80">
              Folio — {card.title}
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export function FeatureFlashcards() {
  return (
    <section className="relative border-t border-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Get to know Folio
        </p>
        <h2 className="text-display mt-5 max-w-2xl text-[clamp(2.2rem,5vw,3.6rem)]">
          Six flashcards. <span className="spectrum-text">Flip every one.</span>
        </h2>
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
          The same six capabilities from a different angle — tap a card to see what each one
          actually does under the hood.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Flashcard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
