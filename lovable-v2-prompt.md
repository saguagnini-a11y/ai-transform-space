# Lovable V2 Prompt — L&D Shakers AI Sandbox

Paste everything below this line into Lovable.

---

Build a second version of the L&D Shakers AI Sandbox storyboard — a React web application that helps stakeholders understand how a 10-week cohort-based AI learning programme works. This is a communication and exploration artifact, not a functional learning platform. It uses interactive components to make the learning experience tangible.

Use the same tech stack as the existing project: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui components, React Router, and Lucide icons. Keep the same visual identity: sticky-note aesthetic, warm lab palette (yellows, greens, blues, pinks), display font for headings, clean body font, card-based layout with subtle rotations on sticky elements.

---

## What Changed From V1 — The Design Logic

Three improvements shape this entire prototype. Every screen should reflect at least one of them.

**Improvement 1 — Open with what participants protect, not what AI unlocks.**
V1 opened with "From Order Takers to Strategists" and outcomes about speed and scale. V2 opens with a question: "What do you need to protect?" The new positioning leads with professional identity, judgment, and credibility — not AI capability. This reframe runs through every screen: hero copy, outcomes, awards, and the programme promise.

**Improvement 2 — Sprint AND Studio mode in every active session.**
V1 had a single Sprint step (45 min). V2 introduces a mode toggle: participants choose Sprint (fast, blank canvas, output-focused) or Studio (worked example first, process visible to peers, conversation mid-work). Both modes use the same challenge and produce the same Override Log. The toggle is a key interactive element on the Weekly Workflow screen.

**Improvement 3 — Override Log as live notation, not retrospective form.**
V1 had the Override Log as a final step and a post-experiment form. V2 redesigns it as a live notation panel — three fields always open alongside work: "AI suggested / I changed / Because." It appears earlier in the experience, is explained before the programme structure, and is referenced on every screen as a running practice rather than a discrete activity.

---

## Routing and Navigation

Use React Router with these routes:

- `/` — Home (new opening proposition)
- `/weekly-workflow` — The Bi-Weekly Cycle with Sprint/Studio toggle
- `/experiments` — Tiny Experiments with live Override Log panel
- `/reflection-pods` — Peer Pods
- `/deep-dive` — Week 9 Deep Dive
- `/transformation-expo` — Week 10 Expo with revised awards
- `/about` — About the Sandbox

Navigation bar: sticky top, same design as v1 (logo left, nav links right). Nav items in order: Weekly Workflow · Tiny Experiments · Reflection Pods · Deep Dive · Transformation Expo. On the homepage, highlight "Weekly Workflow" with a subtle pulse and "Start here →" label.

Add a subtle top banner on the homepage only: "This is an interactive storyboard — explore each section using the tabs above." Smaller and less prominent than v1. Use muted text, no border, no background — just a line.

---

## Screen 1 — Homepage `/`

### Hero Section

Replace the v1 hero entirely. The new hero opens with a provocative question, not a programme label.

Large display heading (3 lines, centred):
```
What do you need
to protect?
```

Below the heading, two short lines of body text (muted, italic):
```
Your credibility in a stakeholder room. Your professional judgment.
The voice in your writing that clients recognise as yours.
```

Then a short paragraph (normal weight, max-width 560px, centred):
```
These are not things AI can give you. The L&D Shakers AI Sandbox
is built on one belief: your expertise is what AI cannot replace.
Everything in this programme makes that expertise more visible — not less.
```

Then two CTAs side by side:
- Primary button: "See how it works →" links to `/weekly-workflow`
- Ghost/outline button: "What changed in v2" — clicking this opens an inline accordion or popover listing the three improvements (brief, 2 sentences each)

Do NOT include the "Cohort-based experimentation lab" badge from v1. Do NOT include the outcomes bullet list from v1.

### Two-Column Entry Cards

Below the hero: two cards side by side (same layout as v1 "What is this?" / "Who is it for?").

**Card 1 — "What is this?"**
Badge: "The programme" (yellow sticky-note style)
Heading: "A Studio, Not a Course"
Body: "In a studio, you build things. You test them in front of peers. You make decisions that peers can ask you to explain. You leave with artefacts you created — not slides you consumed. Every element of this sandbox is built around one question: where does your judgment make the difference?"

**Card 2 — "Who is it for?"**
Badge: "Who belongs here" (blue sticky-note style)
Heading: "L&D Professionals Who Are Watching Carefully"
Body: "Not AI enthusiasts. Not people who've already decided. This programme is designed for professionals who see the potential in AI — and have legitimate reasons to move thoughtfully. If you work inside constraints, or if your professional identity is tied to the quality and voice of your work, this programme was built with you in mind."
Tags below: Learning Designers · Instructional Designers · Facilitators · Capability Builders (same pill style as v1)

### Override Log Introduction (New Section — Before the 10-Week Grid)

This section does not exist in v1. Insert it before the 10-week journey map.

Section label (small, uppercase, primary colour): "THE CORE PRACTICE"
Heading: "Your Judgment Is the Product"

Body paragraph (max 480px, centred):
"Every AI tool produces outputs. Some are excellent. Some are subtly wrong in ways only an experienced professional would catch. The skill this programme develops is not prompting. It is judgment — and judgment is documented using the Override Log."

Below the paragraph: an interactive Override Log specimen. Show it as a realistic-looking open document panel (white card, subtle border, slightly off-white background, monospace feel). It contains three labelled fields with example content already typed in:

```
🤖  AI suggested:
    "Time management" ranked as the #1 learning need

✏️  I changed:
    Moved "stakeholder communication" to #1

💡  Because:
    An upcoming org restructuring makes communication skills urgent.
    AI had no way to know this. I did.
```

Below the specimen: small caption text (muted, italic):
"This is not a form you fill in afterwards. It is a notation you keep open while you work — like a margin note on your own thinking. Over 10 weeks, it becomes evidence of your expertise."

Style the specimen card with a left accent border in the primary colour. Make it feel like a real working document, not a UI component.

### 10-Week Journey Map

Keep the sticky-note grid from v1 (10 weeks, colour-coded). Modify the week labels:

- Weeks 1, 3, 5, 7: "Show & Tell + Sprint/Studio" (yellow, phase label as before)
- Weeks 2, 4, 6, 8: "Tiny Experiment + Reflection Pod" (green)
- Week 9: "Deep Dive with Peers" (blue)
- Week 10: "Transformation Expo" (pink)

Add a small legend below the grid:
- Yellow = Live session
- Green = Between sessions (async)
- Blue = Peer deep dive
- Pink = Cohort showcase

### Core Question Sticky Note

Keep the rotated sticky note with: "What do you need to protect — and what can AI help you do better?"
(Changed from v1's "What can we do now that we couldn't do before?")

### Sandbox Principles

Keep the four-principle grid. Update the principles to:
1. "Your judgment is the curriculum"
2. "Process is more valuable than output"
3. "Constraints are context, not obstacles"
4. "Slow is allowed — studio mode exists for a reason"

### The Promise Section

Replace v1's "The Promise" section with this:

Trophy icon, then:
Heading: "What You Leave With"
Body: "At the end of 10 weeks, participants should be able to say: 'I know exactly where my expertise makes the difference — and I have the evidence to show it.'"

Below, a 2-column grid of 5 outcome cards (smaller than v1's list). Each card has an icon and a short label:
- 📋 "A body of Override Logs documenting your judgment across four workflow areas"
- 🤝 "Two peers who have interrogated your thinking over 10 weeks"
- 🔒 "Language to explain AI-assisted decisions to stakeholders"
- 🎯 "A prompting practice shaped around your actual work"
- 💡 "Clarity on what AI improves — and what it can't touch"

Final CTA: Primary button "Start with the Weekly Workflow →"

---

## Screen 2 — Weekly Workflow `/weekly-workflow`

### Hero

Badge: "Weekly Workflow"
Heading: "Your Bi-Weekly Rhythm for AI Experimentation"
Subhead: "Every two weeks, one cycle. Five elements. One real workflow redesigned."
Italic note: "Choose the pace that fits your context. Sprint and Studio mode available in every active session."

### Sprint / Studio Toggle Explainer (New — Key Interaction)

This is the centrepiece of this screen. Before the Gantt timeline, show an interactive toggle panel.

Display a segmented toggle with two options: "⚡ Sprint Mode" and "🛠️ Studio Mode"

When Sprint is selected, show:
- Label: "Sprint Mode — 45 minutes"
- Description: "Blank canvas. Timer running. One workflow challenge, AI tools open. Goal: a functional output produced under time pressure, with your Override Log capturing every decision as you go."
- Best for: "Professionals who learn through doing and want to move fast through familiar territory."
- Output: "A micro-case output + live Override Log"

When Studio is selected, show:
- Label: "Studio Mode — 45 minutes"
- Description: "Opens with a worked example from a previous cohort — their challenge, their prompt, their Override Log. You work on your own challenge with your process visible to peers. Conversation happens while you make, not only after."
- Best for: "Professionals who need to trace a safe path first, or who are working in territory where they want peer eyes on their process mid-work."
- Output: "A micro-case output + live Override Log + peer process notes"

Below both panels, a shared note:
"Both modes use the same challenge. Both produce an Override Log. Both count equally. You can switch mode each cycle — many participants sprint through familiar workflow areas and slow to studio pace when the work touches something they're protective of."

Style: the toggle is a proper interactive component (not just visual). The content panel below animates on switch. Each mode panel has a coloured left border — yellow for Sprint, green for Studio.

### Gantt Timeline

Keep the interactive Gantt bar format from v1. Update the steps:

**Step 01 — Show & Tell** (20 min, yellow bar)
Expanded detail: "A guest practitioner shares one real transformation story — specific challenge, specific override, specific outcome. Guests are chosen for honesty, not enthusiasm. The guest's Override Log is shared as part of the story."
Extra: show the 5 focus areas as chips (Define · Discover · Design & Develop · Deploy & Iterate · Iterate)

**Step 02 — Sprint or Studio** (45 min, green bar)
Expanded detail: "The core active learning session. You choose your mode at the start of each session. Sprint: fast, blank canvas, output-focused. Studio: worked example first, process visible, conversation mid-work. Override Log open throughout — not saved for the end."
Extra: show the toggle mini-preview (Sprint / Studio) as clickable chips that expand a one-sentence description each.

**Step 03 — Tiny Experiment** (60 min async, blue bar)
Expanded detail: "Before leaving the session, you commit to one small experiment in your actual workplace. The Override Log starts the moment you begin — kept open alongside your AI tool, not filled in afterwards. Minimum viable experiment, not a perfect solution."

**Step 04 — Reflection Pod** (10 min, pink bar)
Expanded detail: "Meet with your two pod peers — sync or async. Share your artefact: the prompt, the output, and your Override Log. Pod peers don't evaluate quality. They ask questions: Why did you change that? What would have happened if you hadn't?"
Extra: show the three pod prompts as cards:
1. "What did you ship?"
2. "Walk through your Override Log"
3. "What can you do now that you couldn't before?"

**Step 05 — Override Log** (running, accent bar — label it "Throughout")
Expanded detail: "Not a step that happens at the end — a notation that runs through all four previous elements. Three fields, always open: AI suggested / I changed / Because. After four cycles, you can see where you override most often and why. That pattern is the real learning."

Remove the "10 min" duration label from the Override Log step. Replace with "Runs throughout each cycle."

### Navigation CTA

Same pattern as v1: "You've explored the Weekly Workflow → Next: Tiny Experiments"

---

## Screen 3 — Tiny Experiments `/experiments`

### Header

Title: "Tiny Experiments"
Subtitle: "Your live workspace for documenting AI judgment in real work."

Replace the v1 "New Experiment" hero button with a subtler approach. The builder is still accessible, but the page leads with the live Override Log concept first.

### Live Override Log Panel (New — Top of Page)

Before the experiment cards, show a prominent panel explaining the live notation practice.

Panel style: wide card, left accent border (primary colour), slightly warm background.

Heading (small, bold): "The Override Log runs while you work"
Body: "Don't wait until the experiment is finished to fill this in. Keep it open alongside your AI tool. Three fields. Write as you go."

Below, show the three fields as a realistic-looking inline notation area (not a form — more like a notepad):
```
🤖  AI suggested  ___________________________________

✏️  I changed     ___________________________________

💡  Because       ___________________________________
```

Caption below: "This notation — honest, in the moment — is worth more than a polished reflection written an hour later."

### Experiment Builder

Keep the multi-step wizard but simplify to 3 steps (not 5):

**Step 1 — The Problem**
- Experiment title (free text)
- "What problem are you solving in your own words?" (textarea — do not call it a workflow step yet)
- "What tool are you using?" (free text — do not force selection from a list)
- Constraint note (new): a small toggle or checkbox: "I'm working within tool restrictions (e.g. Copilot only)" — if checked, show a note: "All experiments in this sandbox have been tested with Copilot. Your constraint is your context, not an obstacle."

**Step 2 — What Happened**
- Prompt used (prompt-box styled textarea)
- Output produced (textarea)
- What changed in your workflow (textarea)
- The "what became possible" yellow sticky field (keep from v1)

**Step 3 — Your Override Log**
Frame this step differently from v1. Heading: "Your Override Log — captured while it's fresh"
Subtext: "If you kept this open while you worked, paste your notes here. If you're filling it in now, try to recall the moment — what did you feel when you saw AI's suggestion?"
- AI suggested (input)
- I changed (input)
- Because (input — slightly larger, more important visually)
- Human insight (input — labelled "What only you could know")

Remove "Share with Cohort" button entirely. Save button only. Add small reassurance text below the save button: "Only you can see this until you choose to share it in your Reflection Pod."

### Experiment Cards

Keep the expandable card format. Modify the expanded view:

Lead with the Override Log, not the prompt. Show in this order:
1. The Override Log (three fields, styled with left accent border)
2. The prompt (prompt-box style)
3. The output
4. Workflow change
5. "What became possible" (yellow sticky)

Update the sample experiments to include one where the Override Log reasoning involves organisational context AI couldn't know (this already exists in the "No-Code Diagnostic" example — keep it). Add a visual badge on experiments that have a completed Override Log: "Override logged ✓" in primary colour.

Remove the "🔄 Override logged" badge from the collapsed card header — it implies this is optional or notable when it should be standard.

### Navigation CTA

"You've explored the experiment workspace → Next: Reflection Pods"

---

## Screen 4 — Reflection Pods `/reflection-pods`

### Header

Title: "Reflection Pods"
Subtitle: "Groups of three. Share your Override Log. Let peers ask the hard questions."

Remove "Groups of 3. Share artifacts, practice override logging, surface human expertise." Replace with the subtitle above.

### Pod Format Explainer (New — Before the Pod Cards)

Before showing the example pods, add a brief format card:

Three columns:
1. "What did you ship?" — Show the artefact: your prompt, your output, your Override Log
2. "Walk through your override" — Not just what you changed. Why. What would have happened if you hadn't?
3. "What can you do now?" — This question is asked every cycle, not just at the end

Note below: "Pod peers don't evaluate quality. They ask questions. One hard question is worth more than ten reactions."

Remove the 👍 Like button from pod discussions. Replace with a single "Ask a question" button per discussion (which could open a text field for async comment). Remove the HelpCircle "questions" counter — it implies questioning is special. In this programme, questioning is the default.

### Pod Cards

Keep the pod structure but update the discussion display order to match the new experiment card order: Override Log first, then artefact, then content.

Replace "Pod Alpha" / "Pod Beta" labels with "Example Pod — Define Focus" / "Example Pod — Design Focus" to make it clear these are illustrative, not real participant data.

Add a small note at the top of the pods section: "These are example pod discussions showing what good override sharing looks like. Real pod content is private to each group."

### Navigation CTA

"You've seen how reflection works in pods → Next: Deep Dive with Peers"

---

## Screen 5 — Deep Dive `/deep-dive`

### Hero

Badge: "Week 9 — Deep Dive with Peers" (keep)
Heading: "Workflow Deep Dives"
Subhead: "Go deeper on one workflow area. The question is always the same: where does your judgment make the difference?"

### How a Deep Dive Works

Keep the three-card Frame / Build / Debrief structure. Update the Build card:

Build card body (replace v1 copy):
"Opens with a worked example from a previous cohort — their challenge, their prompt, their Override Log, including where they were uncertain. Studio mode applies: your process is visible to peers mid-work. Conversation happens as you build, not only after."

### Four Deep Dive Topics

Keep the accordion structure. Update each topic's subtitle and guiding questions to reflect the new framing:

**Define — Needs Analysis**
Subtitle: "Where does context matter more than data?"
Guiding questions:
- "Where in your needs analysis does insight arrive too late to influence decisions?"
- "What did AI miss that your organisational knowledge caught?"
- "What would you override in AI's prioritisation — and how would you explain that to a stakeholder?"

**Discover — Research & Benchmarking**
Subtitle: "What does AI miss that your expertise catches?"
Guiding questions:
- "Where does AI produce comprehensive-looking outputs that lack domain specificity?"
- "What validation steps do you need before you'd share AI research with a client?"
- "What sources does your professional instinct check that AI can't?"

**Design & Develop — Learning Experience Design**
Subtitle: "How do you keep your voice in AI-designed work?"
Guiding questions:
- "What in your design process relies on tone, nuance, or learner empathy that AI flattens?"
- "Where does AI give you structure that helps — and where does it give you sameness that harms?"
- "What would a voice-preserving prompt look like for your context?"

**Deploy & Iterate — Implementation & Improvement**
Subtitle: "What feedback loops matter most — and what do you validate before it leaves your hands?"
Guiding questions:
- "What would you need to show a sceptical stakeholder to demonstrate that AI-assisted outputs are trustworthy?"
- "What's the smallest validation step that would give you confidence?"
- "How do you explain an override decision to someone who wasn't in the room?"

### What You Leave With

Replace v1's four generic cards with these:
- 🧪 "A tested prompt and Override Log pair you can reuse"
- 🛡️ "Language to explain your AI-assisted decisions to stakeholders"
- 💡 "A clearer sense of where your expertise is irreplaceable in this workflow area"
- 🤝 "Peer feedback on your reasoning — not just your output"

### Navigation CTA

"You've explored the Deep Dive format → Next: Transformation Expo"

---

## Screen 6 — Transformation Expo `/transformation-expo`

### Hero

Badge: "Week 10 — Final Showcase"
Keep the World Café format description. Update the body copy:

"A rotating conversation experience where L&D professionals share how they redesigned workflows with AI — and where their judgment made the difference. The most memorable tables are the ones where the host says: here is what AI got wrong, here is how I caught it, and here is what would have happened if I hadn't."

Keep the cohort stats badges (80 experiments, 20 participants, Top 20 showcased). Keep the 4-step rotation icons (Join / Discuss / Rotate / Synthesize).

### Café Tables

Keep the three-card grid. Update the table card structure:

Add a new section to each card, between the key prompt and the impact: a **"Key Override"** block. Style it with a dashed border and primary colour heading. Each table should have a compelling override story:

Table 01 (Maria S.): Already has one — keep it.
Table 02 (James K.): "AI placed 360-feedback in week 2. I moved it to week 5. Psychological safety has to be established before self-exposure. Only experience teaches you this."
Table 03 (Priya R.): "AI suggested generic risk labels. I rewrote them in the organisation's own competency language. Generic labels don't drive behaviour change. Recognition does."

Change the conversation prompt label from "💬 Discuss:" to "💬 Table question:" — slightly more formal and less casual.

Remove the badge labels "80% time saved" and "Real learner impact" from the table header. Replace with labels that reference judgment: "Strong override reasoning" and "Validated protocol" for the appropriate tables.

### Emerging Patterns

Keep the ranked bar chart. Update the pattern statements to reflect the new framing:

1. "Human judgment matters most at framing, validation, and interpretation — not at generation." (frequency: 9)
2. "Override logging surfaces tacit knowledge experts didn't know they had." (frequency: 8)
3. "AI-generated outputs require domain-specific contextualisation only the practitioner can provide." (frequency: 7)
4. "Peer interrogation of override reasoning develops professional judgment faster than solo reflection." (frequency: 6)
5. "The smallest experiments produce the most transferable insights." (frequency: 5)

Section label: "What We're Learning Across All Experiments" (keep)
Subtitle: "Patterns from 12 transformation stories and 80 experiments — ranked by how many teams experienced them independently."

### Programme Awards (Redesigned)

Remove all v1 awards. Replace with four new awards that celebrate judgment, not boldness:

**The Override Award** — Sparkles icon
Winner: Maria S.
Description: "Caught a significant AI error in needs prioritisation using organisational context no dataset could contain. The override changed the programme design."

**The Rigour Award** — Shield icon
Winner: Priya R.
Description: "Developed a 3-step validation protocol for AI-generated learning paths — now used as a template across the cohort."

**The Craft Award** — Star icon
Winner: Tom L.
Description: "Produced AI-assisted learning journeys where the human voice was so present, peers couldn't identify which parts AI contributed."

**The Transferability Award** — Share2 icon
Winner: James K.
Description: "Developed a persona stress-test prompt adopted by 6 other participants. The technique, not just the output, became a shared resource."

Section heading: "Recognising Professional Judgment" (replace "Celebrating the Boldest Contributors")
Section subhead: "These awards recognise where human expertise made AI-assisted work better — not where AI was used most ambitiously."

### Facilitation Guide Card

Keep the download card. Update the body copy:
"Run this World Café format with your own team. Includes table setup, timing guide, Override Log templates, and debrief facilitation notes. All materials are designed to work with Copilot-only environments."

### Final CTA

Replace v1's "Ready to Start Breaking the Sandbox?" with:
Heading: "You've Seen the Whole Experience"
Body: "Ten weeks. Five cycles. One Override Log running throughout. Help us make the next version better."
Buttons: "Back to Overview" (outline) + "Leave Feedback" (primary) — links to a simple feedback screen

---

## Screen 7 — About `/about`

Keep the general structure. Replace the four "What Makes This Different" cards with:

1. Studio icon — "Studio, not classroom" — same copy, keep
2. Users icon — "Cohort-powered" — same copy, keep
3. Shield icon — "Constraints welcome" — "Whether you have full tool access or Copilot only, whether you work in a regulated environment or a creative agency — the programme works within your reality, not an idealised version of it."
4. Lightbulb icon — "Judgment first" — "The Override Log isn't a reflection tool. It's a practice of naming your expertise in real time — so it becomes visible to you, your peers, and your stakeholders."

Replace the "The Shift" section with:
Heading: "Two Kinds of Professionals"
Body: "This programme was designed with two orientations in mind. The professional who needs to move carefully inside constraints — and the professional who needs to protect the craft and voice that defines their work. Both belong here. Both find what they need in the Override Log."

---

## Visual Style Notes

**Keep from v1:**
- Sticky-card aesthetic with subtle CSS rotation
- Warm palette: yellow, green, blue, pink sticky colours
- Display font (bold, expressive) for headings
- Body font (clean, readable) for prose
- Primary colour for interactive elements and labels
- Lab surface background (#f5f3ee feel) for alternating sections
- Prompt-box styling: monospace-ish, slightly warm background, left accent border

**Change from v1:**
- The homepage hero should feel less like a product pitch and more like a provocation — more negative space, more weight on the opening question
- The Override Log specimen (on homepage) should look like a real working document, not a UI mockup — no card chrome, just a clean document-like panel
- Awards section: more restrained visual treatment — no trophy icons on every card, quieter celebration

**Tone of all copy throughout:**
- Direct and specific, not inspirational and vague
- Acknowledges ambivalence — does not assume enthusiasm
- Uses "you" throughout (second person)
- Never uses: "transform," "revolutionise," "unlock," "future-proof," "cutting-edge," "next level"
- Does use: "protect," "judgment," "your expertise," "your context," "your voice," "evidence," "validate"

---

## What to Preserve From V1 Exactly

- The Gantt bar interaction on the Weekly Workflow screen (click to expand step detail)
- The accordion interaction on the Deep Dive topic cards
- The experiment card expand/collapse on the Tiny Experiments screen
- The Previous / Next navigation CTAs at the bottom of every screen
- The Navbar with logo, site title, and nav links
- The SandboxCarousel on the homepage (update step names but keep the component)
- The Supabase feedback submission on the Feedback screen
- The overall page layout: container, max-width, section padding

---

## What to Remove From V1

- The "From Order Takers to Strategists" heading
- The outcomes bullet list on the homepage ("Using AI to analyse learning data faster" etc.)
- The "Share with Cohort" button in the Experiment Builder
- The 👍 Like reaction on Reflection Pod discussions
- The "Boldest Experiment" and "Best Override" and "Best Validation Discipline" award names and descriptions
- The homepage top banner's prominent styling (keep the text, make it a quiet line of text)
- The phrase "Not another course" from the hero

---

*This is a redesign of the storyboard prototype, not a rebuild from scratch. Preserve all functional interactions from v1. Apply the three improvements — new opening proposition, Sprint/Studio toggle, live Override Log — throughout every screen where they are relevant.*
