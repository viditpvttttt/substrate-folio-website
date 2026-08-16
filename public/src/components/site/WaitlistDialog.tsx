import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { sfx } from "@/lib/sound";
import { cn } from "@/lib/utils";

const USES = [
  "Daily briefing (weather + news)",
  "Workbench / coding",
  "Work mode (meetings, docs)",
  "Deep research",
];

const PLATFORMS = ["macOS", "Windows", "iOS", "Web"];

export const openWaitlist = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("open-waitlist"));
};

export function WaitlistDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [use, setUse] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [notify, setNotify] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStep(0);
      sfx.click();
    };
    window.addEventListener("open-waitlist", handler);
    return () => window.removeEventListener("open-waitlist", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const next = () => {
    if (step === 0) {
      const trimmed = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 254) {
        setError("Enter a valid email address (Gmail works great).");
        return;
      }
      setError(null);
    }
    if (step === 1 && !use) {
      setError("Pick what you'd reach for first.");
      return;
    }
    setError(null);
    sfx.step();
    setStep((s) => s + 1);
  };

  const submit = async () => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setStep(3);
    sfx.success();
    toast.success("You're on the Folio waitlist", {
      description: notify
        ? `We'll email ${email} the moment Folio is live.`
        : "You can opt into launch emails any time.",
    });
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/35 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Join the Folio waitlist"
            initial={{ opacity: 0, y: 28, rotateX: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1200 }}
            className="grain relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-float)] sm:p-9"
          >
            <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-spectrum-4/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 -bottom-24 h-56 w-56 rounded-full bg-spectrum-1/25 blur-3xl" />

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="relative font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {step < 3 ? `Step ${step + 1} of 3` : "You're in"}
            </p>

            {step === 0 ? (
              <div className="relative mt-4">
                <h3 className="text-display text-[1.9rem]">What's your email?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Gmail, work address — whatever you actually read.
                </p>
                <div className="group relative mt-6 rounded-2xl">
                  <div
                    aria-hidden
                    className="animate-hue pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 blur-md transition-opacity duration-500 group-focus-within:opacity-70"
                    style={{ background: "var(--gradient-spectrum)" }}
                  />
                  <input
                    type="email"
                    autoFocus
                    value={email}
                    maxLength={254}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && next()}
                    placeholder="you@gmail.com"
                    className="relative w-full rounded-2xl border border-border bg-background/90 px-5 py-3.5 text-[15px] outline-none transition-shadow focus:shadow-[0_0_0_4px_oklch(0.74_0.21_350/12%)]"
                  />
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="relative mt-4">
                <h3 className="text-display text-[1.9rem]">What would you reach for first?</h3>
                <div className="mt-6 grid gap-2.5">
                  {USES.map((item) => (
                    <button
                      key={item}
                      onMouseEnter={sfx.hover}
                      onClick={() => {
                        setUse(item);
                        sfx.toggle();
                      }}
                      className={cn(
                        "rounded-2xl border px-5 py-3 text-left text-sm transition-all duration-300",
                        use === item
                          ? "border-foreground/40 bg-secondary"
                          : "border-border hover:-translate-y-0.5 hover:bg-accent",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="relative mt-4">
                <h3 className="text-display text-[1.9rem]">Where should Folio live?</h3>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {PLATFORMS.map((item) => (
                    <button
                      key={item}
                      onMouseEnter={sfx.hover}
                      onClick={() => {
                        setPlatform(item);
                        sfx.toggle();
                      }}
                      className={cn(
                        "rounded-full border px-5 py-2.5 font-mono text-[12.5px] transition-all duration-300",
                        platform === item
                          ? "border-foreground/40 bg-secondary"
                          : "border-border hover:-translate-y-0.5 hover:bg-accent",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setNotify((v) => !v);
                    sfx.toggle();
                  }}
                  className="mt-7 flex w-full items-start gap-3 rounded-2xl border border-border bg-background/70 px-5 py-4 text-left transition-colors hover:bg-accent"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                      notify ? "border-transparent bg-primary" : "border-border",
                    )}
                  >
                    {notify ? <Check className="h-3.5 w-3.5 text-primary-foreground" /> : null}
                  </span>
                  <span className="text-sm">
                    Notify me when Folio is live
                    <span className="mt-1 block text-[13px] text-muted-foreground">
                      One email at launch, plus early-access invites. No newsletters.
                    </span>
                  </span>
                </button>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="relative mt-4">
                <h3 className="text-display text-[1.9rem]">See you at launch.</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {email} is on the list{platform ? ` for ${platform}` : ""}
                  {use ? `, starting with ${use.toLowerCase()}` : ""}.{" "}
                  {notify
                    ? "We'll notify you the moment Folio goes live."
                    : "You won't get launch emails — come back and check on us."}
                </p>
              </div>
            ) : null}

            {error ? <p className="relative mt-4 text-[13px] text-destructive">{error}</p> : null}

            <div className="relative mt-8 flex items-center justify-between gap-3">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      step >= i ? "w-7 bg-foreground/70" : "w-3 bg-border",
                    )}
                  />
                ))}
              </div>

              {step === 3 ? (
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Done
                </button>
              ) : (
                <button
                  onMouseEnter={sfx.hover}
                  onClick={step === 2 ? submit : next}
                  disabled={sending}
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {step === 2 ? "Join the waitlist" : "Continue"}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
