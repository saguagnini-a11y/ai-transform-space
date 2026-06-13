# Session Notes — AI Sandbox Design Sprint
**Date:** 10 March 2026
**Project:** L&D Shakers AI Sandbox (`ai-transform-space`)

---

## What We Did

A full design sprint moving from project exploration → persona definition → two SCAMPER audits → top improvements → V2 storyboard → Lovable build prompt.

---

## 1. Project Overview

The project is a **React/TypeScript/Vite storyboard** — a communication artifact describing a 10-week cohort-based AI learning programme for L&D professionals. Built with shadcn/ui and Tailwind, scaffolded via Lovable.

**8 pages:**
- `/` — Overview, 10-week journey, principles
- `/weekly-workflow` — Bi-weekly cycle (interactive Gantt)
- `/experiments` — Tiny Experiments gallery + builder wizard
- `/reflection-pods` — Peer pod discussions
- `/deep-dive` — Week 9 structured peer sessions
- `/transformation-expo` — Week 10 World Café showcase
- `/about` — Programme philosophy
- `/feedback` — Storyboard review (connected to Supabase)

**Core programme structure:** bi-weekly cycles of Show & Tell (20 min) → Sprint (45 min) → Tiny Experiment (60 min async) → Reflection Pod (10 min) → Override Log (10 min). Runs across 4 workflow focus areas: Define → Discover → Design & Develop → Deploy & Iterate.

**Key concept:** the Override Log — documenting what AI suggested, what the participant changed, and why. The programme's central differentiator.

---

## 2. Personas Defined

Saved to `personas.md`.

### Persona 1 — The Constrained Corporate Change Agent
- Enterprise context, compliance-heavy, often Copilot-only
- **Emotional JTBD:** Feel in control and safe navigating AI in a regulated environment
- **Social JTBD:** Be seen as credible, responsible, strategic — not an AI cowboy
- Anxieties: compliance violations, bias in assessments, loss of professional credibility
- Needs: compliance-safe workflows, validation templates, Copilot-only tracks, slides to justify AI use internally

### Persona 2 — The Authentic Craft Professional
- Strong professional identity, values nuance, language, authenticity
- **Emotional JTBD:** Stay authentic and human while becoming more efficient
- **Social JTBD:** Be seen as thoughtful, human-centered — not a prompt jockey
- Anxieties: loss of voice, cognitive dependency, generic shallow outputs
- Needs: voice-preserving prompting, "AI as critic not creator" workflows, reflection steps, normalised controlled use

---

## 3. SCAMPER Audit 1 — Storyboard Design Audit

*Lens: both personas reviewing the storyboard as an artifact.*

**S — Substitute**
- Replace "Tiny Experiment" language with "Workplace Test" (less risky for P1, less clinical for P2)
- Replace Experiment Builder's taxonomy-first entry with problem-first
- Replace SandboxCarousel with a two-path persona-split teaser
- Replace static Reflection Pod mock data with a pod facilitation guide

**C — Combine**
- Merge Override Log + Reflection Pod prompts into one unified Experiment Card artefact
- Connect Deep Dive topics explicitly to the bi-weekly cycle sessions
- Embed the Feedback page questions inside the Transformation Expo as a debrief

**A — Adapt**
- Working-out-loud practices (for P2's Override Log as real-time margin annotation)
- Progressive disclosure from SaaS onboarding (reveal 10-week arc incrementally for P1)
- Constraint cards from design sprints (constraint profile at start of Experiment Builder)
- Studio critique "show your work" norms (add failure/scrapped work to Expo tables)

**M — Modify**
- Soften homepage hero tone — too bold/hype-y for P1
- Collapse Experiment Builder from 5 to 3 steps
- Add scaffolding to the Deep Dive Build phase (30 min with no guidance)
- Rename "Boldest Experiment" award — alienates P2

**P — Put to Other Uses**
- Override Log → governance document / stakeholder audit trail (P1)
- Feedback page questions → pre-programme diagnostic for incoming participants
- 10-week journey map → facilitator planning canvas
- Transformation Expo format → standalone reusable team workshop

**E — Eliminate**
- "Share with Cohort" button from Experiment Builder
- Static pod member names (privacy concern for P1, inauthenticity signal for P2)
- Homepage top banner (redundant, signals prototype too early)
- SandboxCarousel prev/next on desktop (only 5 items, adds friction)

**R — Reverse**
- Lead with Override Log, not workflow overview
- Move Deep Dive earlier (Week 1) to establish behavioural contract
- Show Transformation Expo stories at programme start as orientation, not just at Week 10

---

## 4. Commitment Analysis — Would They Sign Up?

**P1 verdict: Tentative sign-up. Early dropout.**
- Would register — structure signals credibility
- Would not survive Week 2 sprint — 45 min blank-canvas AI session with no governance framing
- Critical unanswered question: "Which tools do I need? Is Copilot sufficient? Who sees my work?"
- The Override Log is P1's killer feature — but it's buried inside a collapsed Gantt bar
- One sentence that would save them: *"Everything you create here is yours. We build in validation steps so your judgment, not AI's, is always the final word."*

**P2 verdict: Interested but unconvinced. Disengages quietly by Week 4.**
- Homepage outcomes list (speed, scale) reads as productivity programme, not craft programme
- Sprint format produces exactly the "generic, shallow outputs" listed as P2's core anxiety
- Transformation Expo awards celebrate AI maximalism — precisely the optics P2 avoids
- Critical unanswered question: *"Will this make my work better, or just faster?"*

**Shared vulnerability:** The programme is written for people who have already decided AI is worth pursuing. Both personas are ambivalent — the positioning skips their prior question entirely: *"Is this safe for someone like me?"*

---

## 5. SCAMPER Audit 2 — First-Person Experience Audit

*Each persona speaks in first person about the learning experience itself.*

### P1 — First Person

- **S:** Replace sprint with worked-example-first session; needs Copilot-only track explicitly offered
- **C:** Merge Override Log with peer pod — wants peers to interrogate override *reasoning*, not just outputs; wants sprint + governance framing combined
- **A:** Scenario-based compliance training format (decision + risk spectrum); RACI logic applied to AI outputs
- **M:** 15-minute windows, not 60-minute async blocks; tone of "improvement" not "transformation"; Override Log reframed as QA not reflection
- **P:** Override Log as stakeholder audit trail; pod as rehearsal room for internal business case; Expo stories as team meeting evidence
- **E:** Homepage outcomes list; awards section; would perform reflection in pod rather than actually reflect without trust
- **R:** Would start at the Expo (risk assessment), then Override Log format, then sprint structure — only commit after confirming the programme respects constraints

### P2 — First Person

- **S:** Replace sprint with studio session; replace "what became possible" framing with "what became different"
- **C:** Override Log should be live mid-draft notation, not retrospective; Deep Dive topics should thread through sprint challenges cumulatively
- **A:** Critique format from design school (questions before opinions, process visible); reading others' Override Logs before writing own (like workshop submissions)
- **M:** Outcomes should reference quality not scale; replace Like reactions with hard questions; difficulty should be set to "when NOT to use AI," not prompting mechanics
- **P:** Override Log as permanent writing practice log; pod prompts as reusable client debrief structure; Expo café tables as a forum for own scepticism
- **E:** All awards; sample experiment titles (sound like vendor case studies); hero quote (*"Thanks to AI, I am now doing something I had never done before"* — implies AI is what unlocked possibility)
- **R:** Would start with Override Logs only — specifically the Learner Reaction Simulation override reasoning ("are we building an echo chamber?") — and only commit if that question was the opening provocation

---

## 6. Top 3 Improvements Selected

Chosen because they: serve both personas, appear across multiple files, address deepest emotional JTBDs, are immediately prototypable.

### Improvement 1 — Override Log as live practice, not retrospective form
- Currently: a post-activity debrief form, appears in 3 places after the work is done
- Changed to: a running notation kept open alongside the AI tool during work
- Three fields always open: AI suggested / I changed / Because
- For P1: functions as a governance-ready audit trail
- For P2: functions as a real-time craft journal
- Impact: the timing and framing change entirely — same structure, completely different reasons to use it

### Improvement 2 — Studio mode alongside the sprint
- Currently: single 45-min sprint, blank canvas, output-focused
- Changed to: participant chooses Sprint or Studio at the start of each session
- Sprint: fast, blank canvas, output-focused (unchanged)
- Studio: opens with a worked example + Override Log from previous cohort, process visible to peers, conversation mid-work
- For P1: worked example provides a safe path to trace before their own attempt
- For P2: process visibility enables craft-level peer conversation mid-work
- Mode can change cycle to cycle — the pattern of choices is itself programme data

### Improvement 3 — Open with what participants protect, not what AI unlocks
- Currently: hero leads with "From Order Takers to Strategists" + outcomes about speed and scale
- Changed to: opens with "What do you need to protect?" — credibility, judgment, voice
- Override Log introduced before the programme structure is described
- For P1: safety and governance signal before anything else
- For P2: craft and voice protection signal before anything else
- All downstream copy follows: outcomes reframed around quality/judgment, awards reframed around professional judgment not boldness

---

## 7. Files Produced

| File | Purpose |
|---|---|
| `personas.md` | Two detailed personas with JTBD, SUE forces, and sandbox needs |
| `storyboard-v2.md` | Full revised storyboard reflecting the 3 improvements |
| `lovable-v2-prompt.md` | Detailed Lovable design brief for building the V2 prototype |
| `session-notes.md` | This file |

---

## 8. Key Decisions and Design Logic

**Why the Override Log is the programme's hero concept:**
It is the one element that simultaneously addresses P1's need for governance/control and P2's need for craft/voice protection. It is also the most differentiated thing about this programme — and it was buried. Making it central is the highest-leverage single change.

**Why two modes rather than replacing the sprint:**
The sprint works for a segment of participants. Replacing it entirely would lose them. Offering Studio mode alongside Sprint respects different professional relationships with AI without making either feel like the "wrong" choice. The programme learns from which participants choose which mode.

**Why the opening proposition change matters more than any feature addition:**
Both personas are ambivalent, not enthusiastic. A programme that skips their prior question ("is this safe for someone like me?") and goes straight to "here's how the 10 weeks work" will lose them before they've decided to stay. The opening proposition change is the most upstream fix — it affects conversion before engagement.

**What the Lovable prompt preserves:**
All interactive components from V1 (Gantt bars, accordion Deep Dive topics, experiment card expand/collapse, pod discussions, Supabase feedback). The redesign is content, framing, and two new interactions (Sprint/Studio toggle, live Override Log panel) — not a rebuild.

---

## 9. Open Questions / Next Steps

- Does the Sprint/Studio toggle need to be a cohort-level setting (facilitator assigns) or always participant choice?
- Should the Override Log "specimen" on the homepage be interactive (editable fields) as a preview of the practice?
- Copilot-only track: how deep does this need to go? Separate experiment templates, or just a flag on existing ones?
- Pre-programme diagnostic: the Feedback page questions could double as a persona self-assessment for incoming participants — worth prototyping?
- The Transformation Expo format as a standalone workshop module: if packaged separately, who is the buyer?
