import { motion } from "motion/react";
import { Lock } from "lucide-react";

const toggles: Array<{ label: string; state: string }> = [
  { label: "Block ads", state: "On" },
  { label: "Share content data", state: "Off" },
  { label: "Block trackers", state: "On" },
  { label: "Personalize new chats", state: "Off" },
  { label: "Memory", state: "On" },
  { label: "Local-only files", state: "On" },
  { label: "Sync encryption", state: "On" },
];

function Pill({ label, state }: { label: string; state: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full bg-secondary px-5 py-2.5">
      <span
        className={`h-2 w-2 rounded-full ${state === "On" ? "bg-spectrum-3" : "bg-muted-foreground/40"}`}
      />
      <span className="font-mono text-[12.5px] tracking-tight">{label}</span>
      <span className="font-mono text-[12.5px] text-muted-foreground">{state}</span>
    </div>
  );
}

export function Privacy() {
  return (
    <section id="privacy" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="dotted-frame relative rounded-3xl px-6 py-16 sm:px-10">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-xl bg-background px-3 py-1">
            <Lock className="h-6 w-6" strokeWidth={1.5} />
          </div>

          <h2 className="text-display text-center text-[clamp(2.2rem,5.5vw,4rem)]">Privacy first</h2>

          <div className="relative my-8 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="animate-marquee flex w-max gap-3">
              {[...toggles, ...toggles].map((item, index) => (
                <Pill key={`${item.label}-${index}`} label={item.label} state={item.state} />
              ))}
            </div>
          </div>

          <h2 className="text-display text-center text-[clamp(2.2rem,5.5vw,4rem)]">
            with you in control
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-10 max-w-xl space-y-4 text-center text-[16.5px] leading-relaxed text-muted-foreground"
          >
            <p>
              You decide what Folio remembers and which tools reach your workflow. Your data is never
              sold or used to build ad profiles — and with Sync, it's end-to-end encrypted.
            </p>
            <p>
              Folio for Work adds the guardrails teams need, like SSO and admin controls, so your
              company stays secure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
