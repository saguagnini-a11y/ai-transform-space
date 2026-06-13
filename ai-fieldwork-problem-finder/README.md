# AI Fieldwork Problem Finder

A browser-based game for the AI Fieldwork Cohort: six solo zones that take an
L&D professional from naming their practice to a sharp, AI-fitness-checked
problem statement — then a shared, real-time **Challenges Wall** (Zone 7)
where every player's banner hangs.

Built with React + Vite + TypeScript + Tailwind. Supabase powers the wall.

## Run locally

```bash
bun install
bun run dev      # http://localhost:8090
```

## ⚠️ One-time Supabase setup (required before the live session)

The `banners` and `reactions` tables exist in the project, but **anonymous
inserts are blocked by row-level security** — planting a flag currently
returns a 401 — and the `wisdom` table (borrowed wisdom cards in Zone 3)
doesn't exist yet. Open the Supabase dashboard → SQL editor and run
[`supabase-schema.sql`](supabase-schema.sql). It:

1. creates the `wisdom` table (anonymised Zone 3 answers, populated
   automatically as players complete the dig),
2. adds anon **select + insert** policies on all three tables (no
   update/delete — the wall is read-only after submission), and
3. adds `banners` and `reactions` to the `supabase_realtime` publication so
   banners and reaction counts appear live.

The live presence counter on the world map ("X fieldworkers currently in
the field") uses Supabase realtime presence and needs no setup. It hides
itself when fewer than two players are online.

The wall also polls every 8 seconds as a fallback, so even if realtime
delivery hiccups mid-session, banners converge within seconds.

## Deploy (Vercel or Netlify)

Build command `bun run build` (or `npm run build`), output directory `dist`.
Set two environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

(values in `.env` — the anon key is publishable by design; players are
anonymous and the key can only read and insert.)

## How it maps to the PRD

| Zone | Screen | File |
|------|--------|------|
| Hub | World map (locked / in progress / complete) | `src/components/WorldMap.tsx` |
| 1–2 | The Practice / The Terrain (open text) | `src/zones/OpenTextZone.tsx` |
| 3 | The Dig (5 Whys, stop after 3) | `src/zones/Zone3Dig.tsx` |
| 4 | The Map (editable problem frame) | `src/zones/Zone4Map.tsx` |
| 5 | The AI Fit Check (9 doors, golden/silver/red) | `src/zones/Zone5FitCheck.tsx` |
| 6 | The Quest (statement + name + one word + tag) | `src/zones/Zone6Quest.tsx` |
| — | Flag plant animation → Field Report | `src/components/FlagPlant.tsx`, `FieldReport.tsx` |
| 7 | The Challenges Wall (realtime, reactions, filters) | `src/wall/` |

Root-cause taxonomy (9 cards, routing labels, next steps):
`src/game/rootCauses.ts`. Banner PNG download uses html2canvas
(`src/lib/downloadBanner.ts`) — chosen over PDF for pixel-font fidelity.

Reaction dedupe (one per player per banner per type) is per-browser via
localStorage — there are no accounts, by design.
