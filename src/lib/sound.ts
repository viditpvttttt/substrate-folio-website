/**
 * Tiny WebAudio sound design kit. No assets, no network — just soft sine
 * blips so the interface feels physical. Muted state persists per browser.
 */

let ctx: AudioContext | null = null;
let muted = false;

const STORAGE_KEY = "substrate:muted";

export function initSound() {
  if (typeof window === "undefined") return;
  muted = window.localStorage.getItem(STORAGE_KEY) === "1";
}

export function isMuted() {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  }
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, duration: number, gain: number, type: OscillatorType = "sine", delay = 0) {
  if (muted) return;
  const ac = audio();
  if (!ac) return;
  const start = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(amp).connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export const sfx = {
  hover: () => tone(880, 0.07, 0.018, "sine"),
  click: () => {
    tone(520, 0.09, 0.05);
    tone(1040, 0.07, 0.02, "sine", 0.02);
  },
  step: () => tone(660, 0.1, 0.04, "triangle"),
  success: () => {
    tone(523.25, 0.16, 0.05);
    tone(659.25, 0.18, 0.045, "sine", 0.09);
    tone(783.99, 0.4, 0.04, "sine", 0.18);
  },
  toggle: () => tone(400, 0.08, 0.035, "square"),
};
