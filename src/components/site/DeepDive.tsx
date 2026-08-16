import { motion } from "motion/react";
import { Tilt } from "./Tilt";

const chapters = [
  {
    index: "01",
    title: "Weather, properly",
    body: "Live conditions for anywhere on earth, shown as a card you'd actually want to look at — not a wall of numbers. Folio reads the sky the way you'd describe it to a friend: what to wear, when the rain lands, whether the evening is worth walking.",
    detail: ["Hour-by-hour, at a glance", "Any city, instantly", "Written, not tabulated"],
  },
  {
    index: "02",
    title: "News you choose",
    body: "Pick your own topics — from \"world\" to \"formula 1\" — and Folio keeps a quiet, self-refreshing feed instead of a generic front page. No engagement bait, no infinite scroll, no algorithm deciding what matters to you today.",
    detail: ["Topics you define", "Self-refreshing feed", "No front-page noise"],
  },
  {
    index: "03",
    title: "Memory that sticks",
    body: "Tell it something once — your city, your tone, your stack — and it remembers, quietly using that context forever. You stop re-explaining yourself at the top of every conversation.",
    detail: ["Persistent context", "Editable and deletable", "Yours, not a profile"],
  },
  {
    index: "04",
    title: "Workbench",
    body: "A real editor plus your files, with an AI pair-programmer that reads and writes them while you talk it through. Not a chat window you copy out of — a workspace that edits in place.",
    detail: ["Real editor, real files", "Reads and writes in place", "Talk it through"],
  },
  {
    index: "05",
    title: "Work mode",
    body: "Meeting prep, standups, one-pagers, slide outlines and email drafts — tuned for people who live by their calendar. It arrives at the meeting already briefed.",
    detail: ["Briefs before meetings", "Standups and one-pagers", "Drafts that sound like you"],
  },
  {
    index: "06",
    title: "Deep research",
    body: "It browses, reads and synthesises multiple sources for you, with citations, instead of guessing from outdated training data. Every claim traces back to something you can open.",
    detail: ["Live browsing", "Multi-source synthesis", "Citations, always"],
  },
];

export function DeepDive() {
  return (
    <section id="folio-detail" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Inside Folio
          </p>
          <h2 className="text-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">
            A personal AI assistant and <span className="spectrum-text">agent dashboard</span>.
          </h2>
          <p className="mt-6 text-[16.5px] leading-relaxed text-muted-foreground">
            One place that handles your day-to-day information, your personal context, and your
            actual work — weather and news, memory, coding, meetings and research — instead of you
            juggling five separate tools.
          </p>
        </div>

        <div className="mt-16 space-y-5">
          {chapters.map((chapter, index) => (
            <Tilt key={chapter.index} strength={5} glare={false}>
              <motion.article
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: (index % 2) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="card-lift group relative overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-10"
              >
                <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-spectrum-2/0 blur-3xl transition-all duration-700 group-hover:bg-spectrum-2/30" />

                <div className="relative grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-start">
                  <span className="text-display text-[2.4rem] text-muted-foreground/40">
                    {chapter.index}
                  </span>

                  <div className="max-w-2xl">
                    <h3 className="text-display text-[clamp(1.5rem,3vw,2.2rem)]">{chapter.title}</h3>
                    <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
                      {chapter.body}
                    </p>
                  </div>

                  <ul className="grid gap-2 lg:w-56">
                    {chapter.detail.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-background/70 px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </Tilt>
          ))}
        </div>

        {/* How it all fits together */}
        <div className="mt-24 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Tilt key={pillar.title} strength={7} lift={18} glare={false}>
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="card-lift h-full rounded-2xl border border-border bg-card p-7"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  {pillar.kicker}
                </p>
                <h3 className="text-display mt-4 text-[1.5rem]">{pillar.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>

        <div className="mt-20 grid gap-10 rounded-3xl border border-border bg-card/60 p-8 backdrop-blur sm:p-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h3 className="text-display text-[clamp(1.7rem,3.4vw,2.4rem)]">
              One surface instead of five tabs.
            </h3>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground">
              Folio starts as a dashboard — the weather you'll actually walk through, the four
              topics you care about, what your calendar is about to ask of you. Ask it something and
              the same surface becomes an assistant with your memory already loaded. Hand it a
              repository or a research question and it becomes an agent that works while you watch,
              step by step, with every file edit and every source it opened laid out in the open.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              Nothing is hidden behind a chat transcript. Agents show their plan before they run,
              memory is a list you can read and delete line by line, and every synthesised answer
              keeps the links it came from.
            </p>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-border bg-background/70 p-5">
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="text-display mt-3 text-[1.15rem] leading-tight">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

const pillars = [
  {
    kicker: "Day to day",
    title: "Ambient information",
    body: "Weather and a feed of your own topics, refreshing quietly in the background so the first screen of your morning is already useful before you type anything.",
  },
  {
    kicker: "Context",
    title: "Memory as a system",
    body: "Your city, your stack, your tone and your people live in one editable store that every mode reads from — so the assistant, the workbench and the researcher all know the same you.",
  },
  {
    kicker: "Work",
    title: "Agents that finish",
    body: "Coding in a real editor, meeting prep off your calendar, and multi-source research with citations — long-running jobs you can leave and come back to.",
  },
];

const facts = [
  { label: "Shape", value: "Dashboard, assistant and agent runner in one app" },
  { label: "Modes", value: "Home, Work, Workbench, Research" },
  { label: "Sources", value: "Live browsing with citations on every claim" },
  { label: "Memory", value: "Readable, editable, deletable — never a shadow profile" },
  { label: "Platform", value: "macOS first, Windows next" },
  { label: "Status", value: "Private beta — waitlist open" },
];
