import { motion } from "motion/react";
import { Tilt } from "./Tilt";

const rows = [
  { label: "Weather", value: "22° · Clear · Bengaluru" },
  { label: "Next up", value: "Design review — 11:30" },
  { label: "Reading", value: "3 sources synthesised" },
];

export function Folio() {
  return (
    <section id="folio" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              A Substrate company
            </p>
            <h2 className="text-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">
              Folio is the <span className="spectrum-text">quiet</span> operating surface for your day.
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted-foreground">
              One canvas that already knows the shape of your morning: your weather, your news, your
              files, your calendar — and an assistant that can act on all of it in one sentence.
            </p>
            <dl className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                ["01", "Ambient, not chatty"],
                ["02", "Memory that sticks"],
                ["03", "Sources, always"],
              ].map(([num, text]) => (
                <div key={num}>
                  <dt className="font-mono text-[11px] text-muted-foreground">{num}</dt>
                  <dd className="mt-1 text-sm">{text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Tilt strength={9} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="grain overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-float)]"
            >
              <div className="flex items-center gap-1.5 border-b border-border px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                <span className="ml-3 font-mono text-[11px] text-muted-foreground">folio — today</span>
              </div>

              <div className="relative p-6">
                <div className="pointer-events-none absolute inset-x-8 top-0 h-40 opacity-50 blur-3xl">
                  <div className="animate-drift h-full w-1/2 rounded-full bg-spectrum-2/60" />
                </div>

                <p className="text-display relative text-[clamp(1.4rem,3vw,2rem)]">
                  Good morning. Here's your day.
                </p>

                <div className="relative mt-6 grid gap-3">
                  {rows.map((row, index) => (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
                      className="flex items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3.5 backdrop-blur"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {row.label}
                      </span>
                      <span className="text-sm">{row.value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="relative mt-6 flex items-center gap-3 rounded-full border border-border bg-background/80 px-5 py-3.5 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-spectrum-4" />
                  <span className="text-sm text-muted-foreground">
                    Ask Folio to prep tomorrow's standup…
                  </span>
                </div>
              </div>
            </motion.div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
