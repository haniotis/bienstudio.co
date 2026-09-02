# Bien

A single-page splash site built with [Next.js](https://nextjs.org) and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/page.tsx` — the splash page (logo, statement, clients, services). Edit the
  `STATEMENT`, `CLIENTS`, and `SERVICES` constants at the top of the file.
- `app/globals.css` — Tailwind theme: color tokens, brand palette, fluid type
  scale, fonts, and misc design tokens.
- `components/logo.tsx` — placeholder wordmark; swap for the real Bien logo SVG.
- `components/ui/` — design primitives (`heading`, `button`, `icon`, `smart-link`).
- `components/` — layout primitives (`section`, `wrapper`, `grid-container`).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
