# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (port 8080)
npm run build      # Production build
npm run lint       # ESLint
npm run test       # Run tests once (vitest)
npm run test:watch # Run tests in watch mode
```

## Architecture

**Stack**: React 18 + TypeScript + Vite + shadcn/ui + Tailwind CSS + Supabase + TanStack Query + React Router v6

**Routing** — all routes are declared in `src/App.tsx`. Each route maps 1:1 to a file in `src/pages/`.

**Layout** — every page is wrapped with `<Layout>` (`src/components/Layout.tsx`), which composes `PrototypeBanner` + `Navbar` + a `<main>` + footer. The navbar (`src/components/Navbar.tsx`) links to the five main sandbox sections.

**UI components** — `src/components/ui/` contains shadcn/ui generated primitives. Do not hand-edit these; add new ones via the shadcn CLI or by copying the pattern.

**Supabase** — `src/integrations/supabase/client.ts` and `types.ts` are auto-generated. The only table is `storyboard_feedback`, written to by `FeedbackPage.tsx`. Env vars required: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env`).

**Path alias** — `@/` resolves to `src/`.

## Styling conventions

Custom Tailwind tokens defined in `tailwind.config.ts` and `src/index.css`:
- `sticky-{yellow|green|blue|pink|orange}` — pastel sticky-note background colors
- `lab-surface` / `lab-border` — warm off-white section backgrounds
- `charcoal` — dark text variant

Custom CSS utility classes (in `src/index.css`):
- `.sticky-card` — rotated sticky-note card; pass `--rotation` as a CSS custom property to angle it
- `.lab-section` — standard section padding (`py-16 px-6`)
- `.experiment-step` — dashed left-border timeline step
- `.prompt-box` — monospaced bordered prompt display box

Typography: `font-display` (Space Grotesk) is used for headings and nav; `font-body` (DM Sans) is used for body copy.
