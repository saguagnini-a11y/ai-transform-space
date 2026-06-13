# Lovable V3 Prompt — L&D Shakers AI Sandbox

Paste everything below this line into Lovable.

---

Build a third version of the L&D Shakers AI Sandbox storyboard — a React web application helping stakeholders understand how a 10-week cohort-based AI learning programme works. This is a communication artifact, not a functional platform. It uses interactive components to make the learning experience tangible and explorable.

Use the same tech stack: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui components, React Router, Lucide icons. Keep the same visual identity: sticky-note aesthetic, warm lab palette (yellows, greens, blues, pinks), display font for headings, card-based layout with subtle rotations on sticky elements.

---

## The Three Personas This Programme Serves

This version is designed with three distinct participant profiles in mind. Every screen should signal relevance to all three without alienating any.

**Persona 1 — The Constrained Corporate Professional**
Works in a risk-averse organisation, often Copilot-only. Hasn't done much with AI yet. Core question: "Is this safe for someone like me?" Needs: compliance framing, governance language, validation templates, permission to move slowly.

**Persona 2 — The Authentic Craft Professional**
Strong professional identity tied to voice and quality. Has tried AI but is protective of what makes their work theirs. Core question: "Will this still be mine?" Needs: voice-preserving prompting, "AI as critic not creator" workflows, craft-level peer conversation.

**Persona 3 — The Stranded Pioneer**
Has been using AI intensively for 12–18 months. Has built complex workflows personally (chatbots, automations, assessment pipelines). Is hitting an organisational ceiling — can't get their organisation to trust, adopt, or scale what they've already proved works. Core question: "I've proved this works. Why can't I get anyone to move?" Needs: a peer cohort at the same level, process redesign frames (not prompting tips), organisational change language, the echo chamber broken.

The programme is not a beginner programme. It is a programme for professionals at different points of the same journey. Nothing in the UI should signal "this is for people who haven't started yet."

---

## What Changed From V2 — The Design Logic

V3 carries forward all three improvements from V2 and adds four new ones driven by the third persona.

**From V2 — carried forward unchanged:**

**V2 Improvement 1 — Open with what participants protect.**
The hero opens with "What do you need to protect?" — credibility, judgment, voice. Not AI capability.

**V2 Improvement 2 — Sprint AND Studio mode.**
Participants choose their mode at the start of each active session. Sprint: fast, blank canvas. Studio: worked example first, process visible to peers mid-work.

**V2 Improvement 3 — Override Log as live notation.**
Three fields always open alongside work: AI suggested / I changed / Because. Introduced before the programme structure. Referenced throughout every screen.

**New in V3:**

**V3 Improvement 4 — "Where are you now?" entry point.**
The homepage acknowledges that participants arrive at different points in their AI practice. A three-path entry replaces the single linear CTA. Each path speaks directly to one persona's starting point — without labelling them as beginner, intermediate, or advanced.

**V3 Improvement 5 — Process mapping before experimenting.**
Every active session and Tiny Experiment now includes a brief process mapping step before AI tools are opened. Participants sketch the workflow they're about to redesign: where decisions happen, where bottlenecks form, where human judgment is irreplaceable. The map becomes the thing you test AI against.

**V3 Improvement 6 — Override Log is dual-purpose.**
The Override Log is redesigned to function simultaneously as personal reflection AND as a stakeholder communication document. The same three fields — AI suggested / I changed / Because — are framed as both learning evidence and governance-ready audit trail that participants can share with their organisation.

**V3 Improvement 7 — Pods address organisational scaling, not just personal learning.**
The Reflection Pod gains a fourth prompt: "What happened when you tried to bring this into your organisation?" This unlocks the real conversation for Persona 3 without excluding Personas 1 and 2 — it simply acknowledges that some participants are wrestling with personal capability and some with organisational adoption.

---

## Routing and Navigation

Same routes as V2:
- `/` — Home
- `/weekly-workflow` — Bi-Weekly Cycle
- `/experiments` — Tiny Experiments
- `/reflection-pods` — Reflection Pods
- `/deep-dive` — Deep Dive
- `/transformation-expo` — Transformation Expo
- `/about` — About

Same navbar structure. Same bottom-of-page Previous / Next navigation CTAs. Same subtle top banner (muted text, no styling).

---

## Screen 1 — Homepage `/`

### Hero Section

Keep the V2 opening question as the hero heading:
```
What do you need
to protect?
```

Keep the two supporting lines below (credibility, judgment, voice).

Keep the short paragraph: "These are not things AI can give you. The L&D Shakers AI Sandbox is built on one belief: your expertise is what AI cannot replace. Everything in this programme makes that expertise more visible — not less."

### Three-Path Entry (New — Replaces V2's Two CTAs)

Replace V2's two CTA buttons with a three-card entry panel. Heading above the cards (small, muted): "Where are you in this journey?"

Three cards side by side, each with a short description and a primary CTA:

**Card 1 — "I'm curious but cautious"**
Description: "You've seen AI in action. You're interested — but you work in a constrained environment and you need to move carefully. This programme gives you structure, validation, and the language to bring your organisation along at a pace that feels safe."
CTA: "Start here →" (links to `/weekly-workflow`)
Style: yellow sticky-note left accent border

**Card 2 — "I'm protective of my craft"**
Description: "You've tried AI. Some of it was useful. But you're not prepared to let it flatten the voice or standard that makes your work worth having. This programme teaches you to use AI in ways that amplify your expertise — not substitute for it."
CTA: "Start here →" (links to `/weekly-workflow`)
Style: blue sticky-note left accent border

**Card 3 — "I've been doing this alone for a year"**
Description: "You've built things. Complex things. But you're working in isolation and your organisation isn't moving as fast as you are. This programme gives you a cohort at your level — and a framework for breaking the organisational wall."
CTA: "Start here →" (links to `/weekly-workflow`)
Style: green sticky-note left accent border

All three cards link to the same place. The purpose is recognition, not routing. Each participant should read one card and feel immediately seen.

Below the three cards, a single small line of text (centred, muted italic):
"All three paths lead through the same programme. The difference is what you're bringing to it."

### Override Log Introduction

Keep the V2 Override Log specimen section exactly as specified — the realistic document panel with three fields and example content. Keep the caption: "This is not a form you fill in afterwards. It is a notation you keep open while you work."

Add one sentence to the caption (new):
"For some participants, it becomes a governance document they share with stakeholders. For others, it becomes a craft journal. For others, it becomes the evidence that finally gets their organisation to move."

### 10-Week Journey Map

Keep the sticky-note grid from V2. No changes.

### Core Question Sticky Note

Keep V2's rotated sticky: "What do you need to protect — and what can AI help you do better?"

### Sandbox Principles

Keep V2's four principles. Add a fifth:
5. "Not everyone starts from the same place — and that's the point"

### The Promise Section

Keep V2's "What You Leave With" grid of five outcome cards. Add a sixth card:
- 🏗️ "A framework for bringing your organisation along — not just your own practice"

### Final CTA

Keep V2's "Start with the Weekly Workflow →" primary button.

---

## Screen 2 — Weekly Workflow `/weekly-workflow`

### Hero

Keep V2 hero exactly. Badge, heading, subhead, italic note about Sprint/Studio.

### Sprint / Studio Toggle

Keep V2's interactive toggle exactly as specified. No changes to Sprint or Studio descriptions.

### Process Mapping Step (New — Prepended to the Gantt)

Before the Gantt timeline, add a new highlighted panel. This appears above Step 01.

Style: wide card with a warm muted background (lab-surface), left accent border in a secondary colour (not primary — this is preparatory, not a main step).

Label (small, uppercase): "Before you open any AI tool"
Heading: "Map the Workflow First"
Body: "Every sprint and every tiny experiment starts with one question: what does this process look like right now? Where do decisions get made? Where do bottlenecks form? Where is your expertise irreplaceable — and where is it just habit? Sketch it. The map becomes the thing you test AI against. Without it, experiments stay at the task level. With it, they become process redesign."

Show a simple visual: a three-box horizontal flow diagram labelled "Current process → Decision points → Where AI could intervene" — minimal, illustrative, not interactive.

Below the visual, a small line: "This step takes 10 minutes. It changes the quality of everything that follows."

### Gantt Timeline

Keep all five V2 steps. Make these modifications:

**Step 02 — Sprint or Studio:** Add to the expanded detail panel:
"Both modes begin with the process map you sketched before opening any tool. The map is what keeps experiments at the process level, not the task level."

**Step 04 — Reflection Pod:** Update the expanded detail to include the new fourth prompt. The three prompt cards from V2 become four:
1. "What did you ship?" — Show the artefact: prompt, output, Override Log
2. "Walk through your Override Log" — Not just what you changed. Why. What would have happened if you hadn't?
3. "What can you do now that you couldn't before?"
4. "What happened when you tried to bring this into your organisation?" — (New) What did you attempt to scale or share? What pushed back? What would need to be true for it to move?

Style the fourth card differently — slightly larger, with a note: "This question is for whenever you're ready. Not every cycle. But don't skip it forever."

**Step 05 — Override Log:** Update the expanded detail:
"Three fields, always open. After four cycles, your Override Log is two things at once: a record of your own professional judgment — and a governance-ready document showing your organisation exactly where human expertise made AI-assisted work trustworthy."

---

## Screen 3 — Tiny Experiments `/experiments`

### Header

Keep V2 header. Add a subtitle line below:
"From task-level experiments to process redesign — all levels, all contexts."

### Live Override Log Panel

Keep V2's live Override Log panel exactly. Add one line to the caption:
"If you're ready to share this with a stakeholder instead of just saving it for yourself — it's ready. The format is the same. The audience is your choice."

### Experiment Builder

Keep V2's 3-step builder structure. Make these modifications:

**Step 1 — The Problem:**
Add a new field after the problem description, labelled:
"Is this a task-level experiment or a process-level redesign?" with two toggle options:
- "Task — I'm testing AI on one piece of my work"
- "Process — I'm redesigning how a workflow gets done"

If "Process" is selected, show a prompt below: "Before you continue: sketch the current workflow in 3–5 steps. What does it look like without AI? Where are the decision points? (You don't need to enter this here — just do it on paper first.)"

This toggle doesn't gate anything. It's a frame-setter — prompting the participant to think about which level they're working at before they begin.

**Step 2 — What Happened:** No changes from V2.

**Step 3 — Your Override Log:**
Below the four Override Log fields, add a toggle: "Make this stakeholder-ready"
When toggled on, show a small additional field: "One sentence for a stakeholder: 'AI helped with [X], and my judgment ensured [Y].' " — with a placeholder: e.g. "AI generated the survey themes, and my contextual knowledge of the restructuring ensured the priorities were right."
This field is optional. When filled, it appears as a highlighted summary at the top of the experiment card.

Keep V2's "Only you can see this until you choose to share it in your Reflection Pod." note.

### Experiment Cards

Keep V2's updated card order (Override Log first). Update the three sample experiments to span multiple levels of sophistication:

**Sample 1 — Task Level** (keep "No-Code Diagnostic Skills Assessment" — this speaks to P1 who hasn't built much yet)

**Sample 2 — Process Level** (replace "Learner Reaction Simulation" with a new example):
Title: "Redesigning the Needs Analysis Workflow"
Workflow step: Define
Problem: "Our needs analysis process takes 3 weeks and still misses things. I wanted to redesign the entire workflow — not just use AI for one step in it."
AI used: "ChatGPT + Copilot (hybrid)"
Prompt: "Here is our current 5-step needs analysis process. For each step, tell me: what could AI do here, what should stay human, and what would a redesigned version of this step look like if AI handled the routine and humans handled the judgment calls?"
Output: "A step-by-step redesign proposal with clear human/AI decision splits for each stage. The AI correctly identified steps 1 and 3 as automatable and flagged step 4 as requiring organisational context."
Workflow change: "We piloted the redesigned workflow with one team. The total time dropped from 3 weeks to 4 days. Human effort shifted from data collection to interpretation and stakeholder communication."
What became possible: "We can now run needs analyses continuously rather than annually — and the L&D team's time is spent on the decisions only we can make."
Override Log:
  AI suggested: "Fully automated data collection and synthesis in step 2"
  I changed: "Kept a human review gate at mid-point of step 2"
  Because: "One of our key stakeholders won't trust outputs they haven't been consulted on. That's not an AI problem — it's an organisational trust problem. The gate is a change management decision, not a quality decision."
  Stakeholder summary: "AI handles the data; my team handles the relationships that make the data usable."

**Sample 3 — Systemic Level** (update "Auto-Generated Practice Scenarios" to something more advanced):
Title: "Building an Automated Assessment and Reporting Pipeline"
Workflow step: Deploy
Problem: "Assessment results were sitting in spreadsheets no one looked at. I wanted to build a system where insights reached the right stakeholders automatically."
AI used: "ChatGPT + Make.com + Copilot"
Prompt: "Design an automated workflow: learner completes assessment → responses feed into ChatGPT for analysis → personalised report generated → sent to manager and learner within 24 hours."
Output: "A working pipeline. Assessment responses trigger analysis, generate a PDF report with personalised development suggestions, and deliver it automatically."
Workflow change: "What previously required a learning consultant to manually review, interpret, and write up — now happens in 24 hours with zero manual steps in the middle."
What became possible: "Managers receive timely, personalised insights they can act on. The L&D team shifted from reporting to consulting."
Override Log:
  AI suggested: "Fully automated report delivery with no human review"
  I changed: "Added a weekly human spot-check on 10% of reports before pipeline goes fully autonomous"
  Because: "My organisation's legal team won't approve fully automated HR-adjacent outputs without a human in the loop. This isn't my preference — it's the governance reality. The spot-check is the price of organisational trust."
  Stakeholder summary: "Automated where we can. Human-in-the-loop where we must. Transparent about both."

Add a filter bar above the experiment cards with three toggle chips: "All" · "Task-level" · "Process-level" · "Systemic". Chips filter which cards are visible. Default is "All."

Add a small label on each card (top right, inside the header): "Task" / "Process" / "Systemic" — in a muted pill with no colour coding. The purpose is orientation, not hierarchy.

### Navigation CTA

"You've explored the experiment workspace → Next: Reflection Pods"

---

## Screen 4 — Reflection Pods `/reflection-pods`

### Header

Keep V2 header and subtitle. Update subtitle:
"Groups of three. Share your Override Log. Let peers ask the questions your organisation hasn't asked yet."

### Pod Format Explainer

Keep V2's three-column format card. Add the fourth prompt as a fourth column:

4. "What happened when you tried to scale it?" — What did you attempt to share, adopt, or bring to your team? What pushed back? What would need to change for it to move?

Below the four columns, keep V2's note: "Pod peers don't evaluate quality. They ask questions." Update the closing line:
"One hard question about your Override Log is worth ten reactions. One honest answer about your organisational wall is worth ten experiments."

### Pod Cards

Keep V2's structure and privacy note. Update the example discussions to include the fourth prompt:

In Pod Alpha's discussion (Maria S.), add a line below her Override Log:
"What happened when I tried to scale it: 'I shared the redesigned needs analysis with my manager. She was interested but asked who approved the AI use. That question stopped the conversation. I didn't have an answer — yet.'"
Add a comment: "That question is actually your next experiment. What would it take to get that approval? — James"

In Pod Beta's discussion (Tom L.), add:
"What happened when I tried to scale it: 'I showed the leadership journey prototype to the client. They loved it. Then asked if it was 'AI-generated' and went quiet. I realised I didn't have language for how to explain what I actually did.'"

These additions show that the fourth prompt is for real, unresolved challenges — not polished outcomes.

### Navigation CTA

"You've seen how reflection works in pods → Next: Deep Dive with Peers"

---

## Screen 5 — Deep Dive `/deep-dive`

### Hero

Keep V2 hero. Update the italic subhead:
"Go deeper on one workflow area with peers at your level. The question is always the same: where does your judgment make the difference — and how do you get your organisation to trust that judgment?"

### How a Deep Dive Works

Keep V2's Frame / Build / Debrief structure. Update the Frame card:
"Frame (15 min): Identify your specific challenge within the focus area. Sketch the current process before describing what you want AI to change. Define what 'better' looks like in your context — not in the abstract. Name the organisational constraint you're working within."

Update the Debrief card:
"Debrief (15 min): Share what worked, what you overrode, and what you'd take back to your team. The closing question: 'What would you need to show your organisation for them to trust this enough to adopt it?'"

### Four Deep Dive Topics

Keep V2's four topics and guiding questions. Add one organisational-scaling question to each:

**Define:** Add — "What would your organisation need to see before they'd trust an AI-assisted needs analysis?"

**Discover:** Add — "If you validated this research, how would you explain the validation process to a compliance team?"

**Design & Develop:** Add — "What would a manager need to see to approve an AI-assisted learning journey before pilot?"

**Deploy & Iterate:** Add — "What does 'good enough to scale' look like in your specific organisational context?"

### What You Leave With

Keep V2's four cards. Add a fifth:
- 🏗️ "Language to explain your AI-assisted decisions to someone who needs to approve them"

---

## Screen 6 — Transformation Expo `/transformation-expo`

### Hero

Keep V2 hero. Update the body copy:
"A rotating conversation experience where L&D professionals share how they redesigned workflows with AI — and how they got their organisations to move. The most memorable tables are the ones where the host says: here is what AI got wrong, here is how I caught it, and here is what it took to get this adopted."

### Organisational Context Tags (New — On Every Café Table Card)

Add a small context tag to each café table card header, below the table number. This tag shows the organisational environment the transformation happened in:

Table 01 (Maria S.): Tag — "Corporate · Copilot-only · Compliance-heavy"
Table 02 (James K.): Tag — "Consultancy · Full tool access · Agile client"
Table 03 (Priya R.): Tag — "Internal L&D team · Mixed tool access · Risk-averse leadership"

Style: small pill, muted background, tiny text. Purpose: Persona 3 immediately scans for contexts that match theirs. Persona 1 looks for "Copilot-only." Persona 2 looks for the consultancy context. The tags make the expo immediately searchable by relevance.

Add a filter bar above the café table grid: "All contexts" · "Corporate / regulated" · "Consultancy" · "Internal L&D". Filter chips control which tables are visible.

### Café Table Cards

Keep all V2 content (before/after, key prompt, override insight, conversation prompt). Add one new section to each card below the override insight:

**"How they got it adopted"** — a one-paragraph account of the organisational challenge and what moved it:

Table 01 (Maria S.): "The first attempt was blocked — my manager asked who had approved the AI use and I didn't have an answer. I went back with a one-page summary of what AI produced and what I changed, showing exactly where my judgment was the critical variable. That document — not the output itself — is what got the green light."

Table 02 (James K.): "The client was cautious about AI-generated content in learner-facing materials. I reframed the deliverable: the AI generated the structure, I designed the experience. The distinction — and showing the Override Log — changed the conversation from 'is this AI?' to 'is this good?'"

Table 03 (Priya R.): "Leadership wanted proof before scaling. I offered a 30-day pilot with a validation checkpoint — sample-based review of AI outputs at the midpoint. The checkpoint built the trust the data alone couldn't."

Style the "How they got it adopted" section with a distinct background — slightly darker warm surface — and a label in a different colour (not primary — use a secondary accent). This section is specifically for Persona 3, but every participant benefits from seeing that adoption is part of the transformation story.

### Conversation Prompts

Update the conversation prompt on each table to include an adoption angle:

Table 01: "Where in your workflow do insights arrive too late — and what would it take to get your organisation to trust a faster, AI-assisted version?"
Table 02: "What would you test if prototyping a learning journey took hours instead of weeks — and how would you explain it to a client who hasn't decided how they feel about AI yet?"
Table 03: "What signals would help you intervene before a learner drops off — and what would your stakeholders need to see before they'd act on those signals?"

### Emerging Patterns

Keep V2's ranked bar chart. Add two new patterns:

- "Getting organisations to adopt AI-assisted workflows requires the Override Log as much as the output — showing what changed and why builds trust faster than showing results alone." (frequency: 7)
- "The gap between personal AI capability and organisational readiness is the real challenge for experienced practitioners — not prompting." (frequency: 6)

Re-sort all patterns by frequency descending.

### Programme Awards

Keep all four V2 awards (Override Award, Rigour Award, Craft Award, Transferability Award). Add a fifth:

**The Adoption Award** — Users icon
Winner: Maria S. (update her award — she gets this one instead of Override Award; give Override to someone else)
Winner of Adoption Award: Maria S.
Description: "Translated a personal AI breakthrough into an organisational workflow change — including the governance document that made it possible. The first in the cohort to get formal approval for an AI-assisted L&D process."

Give the Override Award to a new winner: Priya R. — "Developed a validation protocol for AI-generated learning paths that her compliance team adopted as a standard. The override reasoning became the governance framework."

Update section heading: "Recognising Professional Judgment and Organisational Impact"
Update subhead: "These awards recognise where human expertise made AI-assisted work better — and where that work made it beyond the individual and into the organisation."

### Facilitation Guide Card

Keep V2's download card. Update the body copy slightly:
"Run this World Café format with your own team. Includes table setup, timing guide, Override Log templates, and debrief facilitation notes. Includes organisational context tags and 'how they got it adopted' facilitation prompts. All materials tested in Copilot-only environments."

---

## Screen 7 — About `/about`

### Four Differentiators

Keep V2's four cards. Update card 4:
"Judgment first — and organisational readiness second. The Override Log isn't just a reflection tool. It's the document that helps your organisation trust what you've built."

### Two Kinds of Professionals — Update to Three

Replace V2's "Two Kinds of Professionals" section with:

Heading: "Three Points in the Same Journey"
Body:

"**If you're working carefully inside constraints** — this programme gives you structure, validation, and language that makes moving forward feel safe rather than reckless.

**If you're protecting the craft and voice that defines your work** — this programme teaches you to use AI in ways that amplify your expertise rather than replace it.

**If you've been building alone for a year and your organisation still isn't moving** — this programme gives you a cohort at your level and a framework for breaking the organisational wall. The echo chamber ends here."

---

## Visual Style Notes

**Keep from V2:**
- Sticky-card aesthetic with CSS rotation
- Warm palette: yellows, greens, blues, pinks
- Display font for headings, body font for prose
- Override Log document panel styling (clean, document-like, left accent border)
- Prompt-box styling (monospace-ish, warm background)
- Lab surface background for alternating sections

**New in V3:**
- Three-path entry cards: each has a distinct left border colour (yellow / blue / green) matching the persona palette
- Organisational context tags: small pills, muted, scannable — not colourful
- "How they got it adopted" section on expo cards: slightly darker warm surface to visually distinguish from the transformation story
- Experiment level labels (Task / Process / Systemic): muted pill, no hierarchy implied
- Process mapping visual on Weekly Workflow: minimal three-box diagram, not interactive

**Tone of all copy:**
- Does not assume everyone is starting from the same place
- Never signals "beginner programme"
- Acknowledges that organisational change is as hard as personal change
- Uses "your organisation" as a recurring phrase alongside "your work" and "your judgment"
- Never uses: transform, revolutionise, unlock, future-proof, cutting-edge
- Does use: adopt, trust, scale, bring along, organisational readiness, judgment, evidence

---

## What to Preserve From V2 Exactly

- "What do you need to protect?" hero heading and framing
- Sprint / Studio toggle component and both mode descriptions
- Override Log live panel at top of Experiments page
- Gantt bar click-to-expand interaction on Weekly Workflow
- Accordion interaction on Deep Dive topic cards
- Experiment card expand/collapse
- Previous / Next navigation CTAs at bottom of every screen
- Navbar with logo and nav links
- Supabase feedback submission
- Privacy note on Experiment Builder save button

---

## What to Remove From V3

Everything from V1 not carried through V2, plus:
- Any framing that implies participants are at the beginning of their AI journey
- The phrase "experiment with AI" as the primary promise — replace with "redesign how the work gets done"
- Single-outcome experiment examples — at least one example should show process-level or systemic redesign
- Awards celebrating individual boldness — all awards now reference either judgment or adoption

---

*V3 is built for a cohort that spans three distinct participant profiles: the cautious professional working inside constraints, the craft professional protecting their voice, and the experienced practitioner who has been building alone and needs a peer cohort and an organisational framework. The programme is the same for all three. The entry, the framing, and the signals of relevance are different.*
