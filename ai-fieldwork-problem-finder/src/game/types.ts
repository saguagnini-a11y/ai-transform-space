export type Verdict = "strong" | "candidate" | "redirect";

export type ContextTag = "Corporate" | "Education" | "Freelance" | "Other";

export interface RootCause {
  id: string;
  name: string;
  description: string;
  looksLike: string;
  example: string;
  verdict: Verdict;
  routingLabel: string;
  whatItMeans: string;
  nextStep: string;
}

export type DigFocus = "recurring" | "costly";

export interface GameAnswers {
  practice: string; // Zone 1
  terrain: string; // Zone 2
  digFocus: DigFocus | null; // Zone 3 — which enemy the player chose to dig into
  whys: string[]; // Zone 3 (3–5 entries)
  frameProblem: string; // Zone 4 (editable, seeded from Zone 2)
  frameBecause: string; // Zone 4 (editable, seeded from final why)
  rootCauseId: string | null; // Zone 5
  questStatement: string; // Zone 6
  displayName: string; // Zone 6
  oneWord: string; // Zone 6
  contextTag: ContextTag | null; // Zone 6
}

export const emptyAnswers: GameAnswers = {
  practice: "",
  terrain: "",
  digFocus: null,
  whys: [],
  frameProblem: "",
  frameBecause: "",
  rootCauseId: null,
  questStatement: "",
  displayName: "",
  oneWord: "",
  contextTag: null,
};

export interface ZoneMeta {
  zone: number;
  marioWorld: string;
  name: string;
  terrain: "grass" | "desert" | "underground" | "sky" | "castle" | "flag";
  task: string;
}

export const ZONES: ZoneMeta[] = [
  { zone: 1, marioWorld: "World 1 — Grasslands", name: "The Practice", terrain: "grass", task: "Name your L&D context" },
  { zone: 2, marioWorld: "World 2 — Desert", name: "The Terrain", terrain: "desert", task: "Describe what's not working" },
  { zone: 3, marioWorld: "World 3 — Underground", name: "The Dig", terrain: "underground", task: "Ask why 3–5 times" },
  { zone: 4, marioWorld: "World 4 — Sky World", name: "The Map", terrain: "sky", task: "Frame the problem precisely" },
  { zone: 5, marioWorld: "World 5 — Castle", name: "The AI Fit Check", terrain: "castle", task: "Diagnose the root cause" },
  { zone: 6, marioWorld: "World 6 — Flag Pole", name: "The Quest", terrain: "flag", task: "Name your problem statement" },
];

export const VERDICT_META: Record<
  Verdict,
  { label: string; emoji: string; color: string }
> = {
  strong: { label: "Strong Candidate", emoji: "🟢", color: "#4CAF50" },
  candidate: { label: "Candidate", emoji: "🟡", color: "#F5A623" },
  redirect: { label: "Redirect", emoji: "🔴", color: "#E74C3C" },
};
