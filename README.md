# Substrate — Folio's AI Experience

The marketing site for Substrate, a research and product studio for ambient
computing, and the parent company of Folio — a personal AI assistant and
agent dashboard.

Built with TanStack Start (React 19), Vite, Tailwind CSS 4, shadcn/ui, and
Motion, deployed on Vercel via Nitro.

## Development

You'll need Node.js 20+ and npm.

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

## Build

```sh
NITRO_PRESET=vercel npm run build
```

Outputs a deployable bundle to `.vercel/output`. See `DEPLOY.md` for the full
Vercel deployment walkthrough.
