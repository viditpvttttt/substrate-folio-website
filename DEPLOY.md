# Deploying Substrate to Vercel

## 1. Push to a Git repo
```bash
git init
git add .
git commit -m "Substrate: new logo, flashcards, real socials, Vercel-ready"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## 2. Import into Vercel
- vercel.com → **Add New → Project** → import the repo.
- Framework preset: leave as **Other** (this repo's `vercel.json` already sets the build command).
- Build command: `NITRO_PRESET=vercel npm run build` (already set in `vercel.json`, no need to touch).
- Output directory: `.vercel/output` (already set).
- Install command: `npm install` (already set).

No environment variables are required — the waitlist form is fully client-side (no API keys, no backend calls), so there's nothing secret to configure.

## 3. Security / "protected" checklist
- `vercel.json` now ships response headers: `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy`.
- Server functions already run through TanStack Start's CSRF middleware (`src/start.ts`).
- Static assets under `/assets` are cached immutably; HTML is not, so content updates go live immediately.
- Vercel gives you HTTPS automatically once you attach a domain — no extra setup needed.
- If you want the site fully private pre-launch, turn on **Vercel Authentication** (Project → Settings → Deployment Protection) or add a **Password Protection** rule — this needs a Pro plan, and is separate from anything in this repo.

## 4. Custom domain
Project → Settings → Domains → add your domain, then point its DNS (A/CNAME per Vercel's instructions) at Vercel.

## 5. What changed in this pass
- Real logo (`src/assets/substrate-mark.png`) replacing broken CDN-hosted references in `LogoMark.tsx`, `Nav.tsx`, `Closing.tsx` — this alone was blocking a working deploy.
- `vite.config.ts` rewritten as a plain, self-owned Vite config (Tailwind, tsconfig-paths, TanStack Start, Nitro, React) — the project no longer depends on any third-party scaffolding package.
- New favicon/app icons + Open Graph image (`public/og-image.png`) for link previews.
- Footer social links now point to the real LinkedIn, X, and Instagram pages, open in a new tab.
- New `FeatureFlashcards.tsx` — six tap-to-flip 3D cards explaining Folio's capabilities in more depth.
- A slow rotating conic-gradient ring behind the hero mark, and a glowing focus state on the waitlist email field.
- `vercel.json` now sets security headers and asset caching.
