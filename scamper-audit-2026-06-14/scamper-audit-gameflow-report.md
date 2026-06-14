# SCAMPER Audit: AI Problem Finder — Game Flow Simulation
**Date:** 2026-06-14  
**Target:** AI Transform Space game flow (World 2 + World 3)  
**Method:** Three personas simulated step-by-step through the actual game mechanics  
**Question:** Does the flow reliably lead players to the *right* problem to solve with AI in L&D — not just any problem?

---

## Vote Tracker

### Round 1 Commitment Votes (does the game flow produce a trustworthy problem statement?)

| Persona | Vote | Condition |
|---------|------|-----------|
| Marit | CONDITIONAL | Only if the triangulation warning fires reliably for will/culture problems — right now she can self-certify a red problem as gold |
| Yael | NO | The flow produces a *legible* problem statement, not a *true* one. It mistakes articulation for diagnosis |
| Daan | CONDITIONAL | Needs a way to express process-level problems, not just task-level irritants. The three-challenge cap undersells his situation |

### Round 2 Commitment Votes (post-debate)

| Persona | Original | Final | Changed? | Reason |
|---------|----------|-------|----------|--------|
| Marit | CONDITIONAL | CONDITIONAL | No — but reframed | Daan's point about the "why" field being unvalidated sharpened her concern. She now wants a minimum word count or a guided prompt for step 3 |
| Yael | NO | CONDITIONAL | Yes | Marit's argument that the POV step is structurally sound moved her. She'll commit if the "one small thing" step asks for a *judgment* not just an *idea* |
| Daan | CONDITIONAL | YES | Yes | Yael conceded that craft-level articulation is a prerequisite for system-level change. He hadn't thought of the game as an onramp document |

### Cross-Suggestion Votes

| Suggestion | Source | Marit | Yael | Daan |
|-----------|--------|-------|------|------|
| Guided "why" prompt (scaffolded sub-questions) | Marit | — | CONDITIONAL (only if sub-questions don't lead) | YES |
| "One small thing" asks for judgment criteria, not just idea | Yael | YES | — | CONDITIONAL (scoped to process-change) |
| Allow 5 challenges, not 3 | Daan | NO (more noise, not signal) | CONDITIONAL | — |
| Show tier badge rationale before rating, not after | Marit | — | YES | YES |
| Reorder: verdict BEFORE POV construction | Daan | YES | NO (verdict poisons the POV framing) | — |

---

## Round 1: Persona Walkthroughs

---

### MARIT — The Constrained Corporate

**Emotional baseline entering the game:** Cautious curiosity. She's been told to "explore AI for learning design." She does not know what that means in practice. She has 20 minutes.

---

#### WORLD 2 — THE DIG

**Step 0: Name 3 Challenges**

The instruction "Name three problems that keep coming back" is clear. She doesn't pause here. She types fast — these are real.

> Challenge 1: `Compliance training completion rates drop off after month 3`  
> Challenge 2: `We don't capture what managers actually did differently after a leadership programme`  
> Challenge 3: `New starters get 4 different onboarding experiences depending on who's available to run it`

*Reaction to the UI:* The required-three mechanic works for her. "I appreciate that I can't skip. It forces me to be honest about what the actual problems are, not just the loudest one."

*One flag:* The placeholder copy ("The thing nobody talks about but everyone feels...") activates mild discomfort. "That's a bit... theatrical? In my organisation that framing would raise eyebrows." She fills it in anyway.

---

**Step 1: Quick Scan (Tier Rating)**

She reads the three options carefully before rating anything.

- 🟢 No system or structure → *"People do this manually, skip it, or it depends who's available"*
- 🟡 Something exists but isn't working → *"Inconsistent, under-used, or incomplete"*
- 🔴 People won't, or the tool is broken → *"The system exists. People are choosing not to use it"*

**Her ratings:**
- Challenge 1 (compliance drop-off): 🔴 "The system exists. Reminders go out. People are choosing not to complete."
- Challenge 2 (manager transfer): 🟢 "There is literally no mechanism for this. Nobody captures it."
- Challenge 3 (onboarding inconsistency): 🟡 "We have an onboarding guide. It just gets ignored differently each time."

*Reaction:* "This is the most useful thing I've done in ten minutes. I came in thinking challenge 1 was the priority. Seeing it labelled 🔴 immediately reframes it. The game is doing something I haven't seen a tool do — it's separating the loudest problems from the solvable ones."

*But:* "I gave challenge 1 a 🔴 because I know the system exists. But I'm not sure that's right. The system exists but it's broken — the content is terrible, nobody finds it relevant, they log in and click through. That's somewhere between 🔴 and 🟡. The tier options don't have room for that nuance."

**⚠ UI gap identified:** The 🔴 tier conflates two very different causes — "people won't" (motivation/culture) and "the tool is broken" (system failure). Marit files this under *ambiguity she'll resolve by picking what sounds nearest*, not what's truest.

---

**Step 2: Choose Your Problem**

She picks Challenge 2 (manager transfer capture) with the 🟢 badge. "It's the only one the scan said was genuinely structural. That's the signal I needed."

---

**Step 3: Why Is This Happening?**

She types:

> `Nobody has ever built a system for it. After a programme ends, managers go back to their jobs. There's no prompt, no tool, no moment that asks them to record what they actually did differently. It depends on whether their L&D contact follows up — and most don't because they're already running the next programme.`

*Reaction:* "Good. I can be honest here because it says nothing is visible yet." She notices the input has no guidance — just a cursor. "I'd have appreciated a prompt. Something like 'describe the moment the problem occurs.' I wrote a paragraph. Someone else writes two words."

---

**Step 4: Recurring?**

> Yes — this happens after every programme we run. Every single time.

---

#### WORLD 3 — FIELD REPORT

**Step 0: Draft Problem Statement**

Pre-filled with her chosen challenge. She edits slightly:

> `After leadership programmes, there's no system to capture whether managers actually changed their behaviour. The evidence disappears with the programme.`

No solution triggers. Clean.

---

**Step 1: Pick Root Cause Category**

She reads all 9. This takes her 90 seconds. She selects:

**🔑 One person holds the knowledge** — *"Progress depends on who's available"*

*Internal reasoning:* "It's not quite right, but it's the nearest. The real problem is that nobody holds the knowledge — it disappears. But this category implies there's one person who has it. Close enough."

**→ No triangulation warning fires.** Her "why" text mentions "no system" and "no tool" (structural signals), but she picks a gold-tier category, so no mismatch detected. The warning system passes her through correctly — she's not miscategorising, she's choosing the best available approximation.

*But notice:* she chose "one person holds the knowledge" when the truer category might be "no system for it." If she'd clicked differently, the verdict would be identical (both gold-tier structural). The 9-category taxonomy doesn't affect the output for gold-tier choices. **The granularity is cosmetic for gold-tier selections.**

---

**Step 2: Verdict + Triangulation**

> 🟢 Strong AI candidate — "This is a structural problem — great fit for AI-assisted solutions."

*Reaction:* "Yes. That's what I needed. Something defensible. I can now say 'we identified a structural gap and assessed it as a strong AI candidate using a validated framework.' That's language I can put in a proposal."

She does not get a triangulation warning. She reads the verdict badge, notes the reason line, moves on.

---

**Step 3: Frame Your POV**

> Who: `L&D teams running leadership programmes`  
> Needs: `a lightweight way to capture manager behaviour change after a programme ends`  
> Because: `Nobody has ever built a system for it and the evidence disappears without one`

Assembled POV: *"L&D teams running leadership programmes needs a lightweight way to capture manager behaviour change after a programme ends because nobody has ever built a system for it and the evidence disappears without one."*

*Reaction:* "The grammar is slightly off — 'needs' after a plural subject — but the structure is useful. It reads like a design brief. That's actually what I want."

---

**Step 4: One Small Thing**

Prompt: *"What becomes possible now that wasn't before — not faster, but at all?"*

> `We could create a 30-day post-programme check-in prompt that asks managers three specific questions and logs their answers. Right now that literally cannot happen because there's no system to hold the data. AI could generate the questions, route them, and synthesise the responses into something L&D can actually read.`

*Reaction:* "The capacity reframe is working. I wasn't thinking about 'what becomes possible' — I was thinking about 'what would be faster.' The question actually redirected me."

---

**Final Problem Statement:**
> *"L&D teams running leadership programmes needs a lightweight way to capture manager behaviour change after a programme ends because nobody has ever built a system for it and the evidence disappears without one."*

**Verdict:** 🟢 Strong AI candidate

**Did the game lead her to the right problem?** Largely yes. The quick-scan was the critical intervention — it moved her from challenge 1 (compliance, which is a will/motivation problem) to challenge 2 (transfer capture, which is structural). Without the scan, she would have entered World 3 with the wrong problem.

---

**Marit's 3 Key Improvements**

1. **Split the 🔴 tier into two.** "People won't" and "the tool is broken" are different diagnoses with different remedies. Collapsing them into one tier forces players to pick the nearest approximation, not the true one. Split into 🔴-a (motivation/culture — AI won't fix this) and 🔴-b (system failure — fix the system first, then consider AI).

2. **Add a guided scaffold to the "Why is this happening?" field.** A single open cursor produces wildly different response quality. Add 2–3 sub-questions as ghost prompts: "When exactly does this break down? Who's affected when it does? What would have to be true for it not to happen?" The triangulation warning is only as good as what players write.

3. **Show tier badge rationale before rating, not just after.** Right now players see the badge label after selecting it. Show the "what this means for AI" implication as a tooltip *before* they click, so the rating is informed rather than retrospectively interpreted.

---

**Marit's 3 Risks**

1. **The "why" field is the game's weakest link (insufficient input = bad triangulation).** The triangulation warning depends on players writing something meaningful. A two-word entry ("people forget") contains no signal. The risk: players who type minimally get an unearned verdict. *Behavioral mechanism: compliance comfort — fill in enough to pass, not enough to learn.*

2. **Gold-tier granularity is cosmetic — all gold-tier categories produce the same verdict.** A player who picks "no system for it" vs "one person holds the knowledge" vs "not enough hands" gets identical output. This means the 9-category taxonomy is doing less diagnostic work than it appears to. *Behavioral mechanism: anchoring — the category label feels meaningful even when it doesn't affect the result.*

3. **The POV step may produce grammatically confident nonsense.** The who/what/because template generates fluent-sounding statements from thin inputs. A player who types vague fragments will get a vague statement that *reads* like a design brief but isn't one. The game has no quality gate on the POV. *Behavioral mechanism: fluency bias — a well-formatted sentence feels like a good idea.*

---

**Marit's Pre-mortem**

*It's 10 weeks from now. I dropped out after the first session. Here's what happened.*

I went through the game during the pre-work. My problem statement came out well — I was pleased with it, actually. "L&D teams running leadership programmes needs a lightweight way to capture manager behaviour change after a programme ends." I copied it into a slide. I even showed my line manager.

But then in the first live session, someone else's problem was: "Managers skip the post-training reflection because nobody checks and there's no consequence." They'd picked 🔴 in the quick scan. The facilitator acknowledged that this wasn't an AI problem. Fine. But then the group spent most of the Sprint building a nudge bot anyway. I watched the facilitator navigate this diplomatically and realised: the game gives you a verdict, but the session doesn't enforce it. The 🔴 problems were still in the room.

I didn't drop out dramatically. I just stopped doing the between-session work. The next cycle's pre-work arrived and I didn't open it. Nothing about the experience had been dangerous — it just hadn't been worth the time it was taking to navigate carefully.

**Vote: CONDITIONAL** — The game flow holds IF the live sessions actually use the verdict to gate what gets worked on. If 🔴 problems are allowed in the Sprint, the whole diagnostic instrument becomes decorative.

---
---

### YAEL — The Authentic Craft Professional

**Emotional baseline entering the game:** Mild scepticism wearing the costume of openness. She's been to too many "AI for L&D" sessions that started with enthusiasm and ended with a Canva slide. She gives this 15 minutes.

---

#### WORLD 2 — THE DIG

**Step 0: Name 3 Challenges**

She stares at the first field for a moment. *"The thing that comes back every time..."* She finds the placeholder melodramatic but functional. She types slowly — choosing words matters to her.

> Challenge 1: `Clients brief me on outcomes they want but can't name the behaviour change underneath`  
> Challenge 2: `Every discovery call surfaces the same systemic problems but I deliver bespoke solutions every time — nothing compounds`  
> Challenge 3: `I spend 20% of every project on formatting and file conversion that adds no value`

*Reaction:* "Three challenges. Interesting constraint. I immediately notice that my third challenge is the least interesting one but the one I most want to solve — it's the tax on doing everything else well. The game doesn't acknowledge that tension."

---

**Step 1: Quick Scan (Tier Rating)**

- Challenge 1 (client brief quality): 🟡 "Something exists but isn't working — there's a briefing process, clients just don't know how to use it."
- Challenge 2 (bespoke every time): 🟢 "No system or structure — I've never built a reuse layer. Everything is made fresh."
- Challenge 3 (formatting tax): 🔴 "The tool is broken — the problem is literally the incompatibility between file formats."

*Reaction:* "The scan is useful. I resisted it initially — 'I know my own problems' — but seeing them lined up with their tiers gives me information I didn't have. My formative instinct was to dig into challenge 1 because it's the most intellectually interesting. The scan says it's 🟡. Challenge 2 is 🟢. That's the signal."

*But:* "Challenge 2's 🟢 makes me uncomfortable. 'No system or structure' is technically correct. But I've worked without a reuse system by design — every client context is different. The game doesn't know whether the absence of a system is a problem or a choice. It treats all structural absences as the same kind of gap."

**⚠ Design gap identified:** The quick-scan tier options don't distinguish between *unintentional* structural gaps (problems) and *deliberate* structural choices (craft decisions). For someone like Yael, both look like 🟢 from the outside.

---

**Step 2: Choose Your Problem**

She picks Challenge 2 (bespoke every time). "The game pointed me there. Let me follow it."

---

**Step 3: Why Is This Happening?**

> `Because every client is genuinely different, I've never invested in a layer of reusable components. I build each project from scratch because I believe the context requires it. But I suspect 60% of what I build could be templated without losing quality — I just don't know which 60%.`

*Reaction:* She reads back what she's written. "Interesting. I've just admitted to myself that I might have a false belief about the necessity of bespoke work. The game didn't prompt me to do that — I got there because I was writing for an audience."

---

**Step 4: Recurring?**

> Yes — every single project, every client, for twelve years.

---

#### WORLD 3 — FIELD REPORT

**Step 0: Draft Problem Statement**

Pre-filled. She rewrites it completely.

> `I rebuild the same underlying structures for every client project because I've never created a reuse layer — not because each project is unique, but because I've never separated the genuinely unique parts from the repeatable scaffolding.`

*Reaction:* "Better. The first draft just named the symptom. This names the distinction."

The draft contains no solution triggers. She checks the "no solution framing" instruction before typing — she's read the UI carefully.

---

**Step 1: Pick Root Cause Category**

She reads all 9, visibly annoyed at herself for not having a faster take.

She selects: **🔧 No system for it** — *"People do this manually, skip it, or wait on someone else"*

*Internal reasoning:* "Technically accurate but slightly wrong. 'People do this manually' — yes, but I'm the people. And 'wait on someone else' — there's no someone else. The categories are written for teams, not for a solo practitioner. I'm fitting myself into a frame built for L&D departments."

**→ No triangulation warning fires.** Her "why" text doesn't contain will/tool/structural keywords in the pattern-match. She typed "I've never created a reuse layer" and "I've never separated" — these don't match the detection patterns (`no system`, `no process`, `manually`, etc.). **The triangulation system misses her because her language is too precise for the keyword patterns.**

*Reaction to the category selection:* "I notice I'm making myself fit a taxonomy. That's fine as a design constraint. But I want to flag it: the nine categories are L&D-team-centric. A sole practitioner maps onto them differently."

---

**Step 2: Verdict**

> 🟢 Strong AI candidate — "This is a structural problem — great fit for AI-assisted solutions."

*Reaction:* "I don't disagree. But 'great fit for AI-assisted solutions' is doing a lot of work. What kind of solutions? A system for indexing and retrieving reusable components is very different from a generative tool that builds new components. The verdict badge is a category, not a direction."

She does not get a triangulation warning.

---

**Step 3: Frame Your POV**

> Who: `Independent learning designers running multiple bespoke client projects`  
> Needs: `a way to identify and extract the repeatable scaffolding from genuinely unique work`  
> Because: `everything is built from scratch when 60% of the structure could compound across projects`

*Reaction:* "The POV template is serviceable. 'Who / needs / because' is a classic design brief frame. My objection is that the word 'because' forces a causal statement, but sometimes the insight isn't causal — it's perceptual. I don't just need to solve the problem; I need to see it differently first. The template skips that."

---

**Step 4: One Small Thing**

Prompt: *"What becomes possible now that wasn't before — not faster, but at all?"*

> `I could build a component library that evolves with each project — not a template, but a living index of the decisions I've made and why. AI could help me extract the structure from existing work I've already done. I couldn't do that before because it would take weeks. Now it might take hours. But more importantly: I've never had a way to make my own decision-making legible to me. That's new.`

*Reaction:* "That last sentence surprised me. The capacity question found something the efficiency frame wouldn't have. I'm keeping that."

---

**Final Problem Statement:**
> *"Independent learning designers running multiple bespoke client projects needs a way to identify and extract the repeatable scaffolding from genuinely unique work because everything is built from scratch when 60% of the structure could compound across projects."*

**Verdict:** 🟢 Strong AI candidate

**Did the game lead her to the right problem?** Partially. The quick-scan correctly redirected her from challenge 1 (briefing quality — 🟡, ambiguous) to challenge 2 (reuse layer — 🟢, structural). The POV step produced genuine insight. But the "one small thing" step was the most valuable moment — it found something the rest of the flow didn't.

**The triangulation warning didn't fire when it should have been most interesting** — her "why" text ("I've never created a reuse layer... I believe the context requires it") contains a belief-challenge that warrants reflection, but the keyword system doesn't detect belief-level blocks.

---

**Yael's 3 Key Improvements**

1. **The "one small thing" step should ask what judgment you'd apply, not just what you'd try.** Currently: "What becomes possible now that wasn't before?" Better: "What becomes possible — and what judgment would you need to apply to make sure AI doesn't flatten it?" This is the difference between capacity and craft. Right now the step finds capacity but doesn't name the professional judgment that guards it.

2. **The 9 categories need a note that they're written for L&D teams, not solo practitioners.** A sole practitioner encountering "one person holds the knowledge" or "not enough hands" in a context where *they are* the person and the hands will misread the categories. Add a single line: "If you're a solo practitioner, 'people' in these descriptions means you."

3. **The "why" field should allow reflection, not just causation.** The current field accepts any text, but it reads like a causal question. For craft professionals, the why is often a belief ("I build bespoke because bespoke is my value proposition") not a structural fact. Add a second prompt line: "Is this a fact about how things work, or a belief you hold about how they should work?"

---

**Yael's 3 Risks**

1. **The fluency trap: the game produces articulate statements from thin thinking.** The POV template generates grammatically clean output regardless of conceptual depth. Players who type quickly get a statement that reads like a brief but isn't. *Behavioral mechanism: aesthetic satisfaction — a well-worded sentence triggers completion, even when the underlying diagnosis is shallow.*

2. **The solo practitioner is invisible to the category taxonomy.** Five of the nine categories assume a team context ("not enough hands," "one person holds the knowledge," "organisational adoption"). Solo practitioners distort their self-diagnosis to fit team-framed categories. *Behavioral mechanism: category anchoring — the available options constrain what players can see about their own situation.*

3. **The game mistakes articulation for diagnosis.** Naming your problem clearly is not the same as understanding it correctly. The game has no mechanism to distinguish between a player who has genuinely understood their root cause and one who has simply written something plausible. *Behavioral mechanism: narrative closure — once a story is well-told, it feels true.*

---

**Yael's Pre-mortem**

*It's 10 weeks from now. I dropped out after week 4. Here's what happened.*

The game flow was actually good. I found something real in World 2 — the reuse-layer problem I'd been half-aware of for years. The POV step surprised me. I left the pre-work feeling like the program had looked at me.

Then the Sprint sessions happened. Week 2: someone built an AI-generated quiz and the group spent 25 minutes discussing which multiple-choice questions were better. I sat there thinking about my component library and wondering if anyone else in the room was working at the same level of abstraction. They weren't being wrong. But the Sprint format optimises for visible output, and visible output in 45 minutes is almost always a task-level artefact.

I kept attending but I stopped sharing. The moment I decided to stop sharing was week 3, when I showed the prototype component library I'd been building and someone asked if it was an AI tool. It wasn't. It was a system I'd designed. The question revealed they couldn't see the difference. I didn't drop out formally. I just became a spectator.

**Vote: NO (original)** → **CONDITIONAL (post-debate)** — I'll commit if the "one small thing" step is amended to name the professional judgment alongside the AI possibility. That would make the output something I'd actually use, not just archive.

---
---

### DAAN — The Stranded Pioneer

**Emotional baseline entering the game:** Impatient efficiency. He's given this 10 minutes before his next meeting. He's already built three things this week that this game is probably going to rediscover.

---

#### WORLD 2 — THE DIG

**Step 0: Name 3 Challenges**

He types fast. He has more than three. He picks the three most politically relevant.

> Challenge 1: `L&D produce content that nobody uses because we don't connect to what managers are actually measured on`  
> Challenge 2: `The AI tools I've built on my personal devices can't go live because they haven't been through IT security review`  
> Challenge 3: `My organisation measures L&D by hours delivered not outcomes — I can't get budget for anything I can't express as a course`

*Reaction:* "Three is too few. I have seven. But fine — I'll pick the ones that are actually solvable."

*He notices the third input placeholder:* "The thing nobody talks about but everyone feels." He stops. "Actually, challenge 3 is exactly that. Nobody in my organisation talks about the measurement problem openly. Interesting that the game surfaced it."

---

**Step 1: Quick Scan (Tier Rating)**

- Challenge 1 (content nobody uses): 🟡 "Something exists but isn't working — we produce it, it just doesn't land."
- Challenge 2 (shadow AI work, no path to legitimacy): 🔴 "People won't — sort of. IT won't. The process exists in theory (security review) but it's designed to say no."
- Challenge 3 (wrong measurement system): 🔴 "People won't. The org won't change how it measures L&D because nobody powerful enough has incentive to."

*Reaction:* "I've rated two challenges 🔴. The scan is telling me I picked problems that aren't AI problems. But that's not quite right — challenge 2 isn't 'people won't,' it's 'the governance system blocks.' There's no tier for 'the institution is the bottleneck.'"

*He picks challenge 1 anyway.* "Challenge 1 is 🟡 which means AI might help. Let me work with what I've got."

**⚠ Design gap identified:** Daan has accurately identified that his most important problems are governance and institutional blockages — neither of which map cleanly to the three-tier system. The 🔴 tier (people won't / tool broken) is the nearest approximation but misnames the mechanism. His most important problems are invisible to the diagnostic.

---

**Step 2: Choose Your Problem**

> Challenge 1: `L&D produce content that nobody uses because we don't connect to what managers are actually measured on`

*Reaction:* "The game chose this for me by process of elimination. The scan told me the others are 🔴. That's accurate but uncomfortable — my biggest problems are the 🔴 ones."

---

**Step 3: Why Is This Happening?**

> `We design content based on what L&D thinks is important, not what managers are actually measured on at end of quarter. There's no system that connects learning design briefs to business KPIs. The connection is made informally in kick-off meetings and then never revisited.`

*Reaction:* "Accurate. Boring. I've said this in three different strategy documents. Let me see if the game does anything useful with it."

---

**Step 4: Recurring?**

> Yes. Every programme. Every year.

---

#### WORLD 3 — FIELD REPORT

**Step 0: Draft Problem Statement**

Pre-filled. He rewrites it:

> `L&D content misses because design briefs aren't connected to the business KPIs managers are actually measured on — the connection happens in one kick-off meeting and is never revisited.`

---

**Step 1: Pick Root Cause Category**

He reads the 9 categories. He selects:

**🔧 No system for it** — "People do this manually, skip it, or wait on someone else"

*Internal reasoning:* "Closest. The real answer is 'no shared data layer between learning design and business performance tracking,' but that's not in the taxonomy. 'No system for it' will do."

**→ Triangulation warning check:** His "why" text says "There's no system that connects learning design briefs to business KPIs" — this contains "no system." He picks a gold-tier category. No mismatch → **warning does not fire** (correctly — this is a genuine structural gap, gold-tier selection is right).

---

**Step 2: Verdict**

> 🟢 Strong AI candidate — "This is a structural problem — great fit for AI-assisted solutions."

*Reaction:* "Yes. I know. I've been saying this for 18 months. The game has now confirmed what I already knew in 8 minutes. What I need is not a verdict — I need something I can put in front of my director that makes this legible to her. Does this give me that?"

He reads the verdict badge again. "It does, actually. Not the badge — the full statement. 'We identified a structural gap in how L&D briefs connect to business KPIs and assessed it as a strong AI candidate using a validated diagnostic.' That's the sentence I've been missing."

---

**Step 3: Frame Your POV**

> Who: `L&D managers designing programmes for line managers`  
> Needs: `a way to connect learning design decisions to the business KPIs managers are actually measured on`  
> Because: `the connection currently lives in one kick-off meeting and disappears before the programme is built`

*Reaction:* "Serviceable. The POV format is basic — HMW framing in a suit — but it's legible to non-L&D stakeholders. My director could read this."

---

**Step 4: One Small Thing**

Prompt: *"What becomes possible now that wasn't before — not faster, but at all?"*

> `I could pull the relevant manager KPIs from our HR system at brief-intake, surface them in the design document, and flag when learning objectives don't map to any of them. That review step doesn't exist right now. Nobody does it because it would take too long and require accessing two systems manually. AI could do it automatically at the point of brief creation. That's a workflow change that enables a quality gate that literally cannot exist today.`

*Reaction:* "The capacity question actually worked on me. I was going to write about speed. I wrote about a quality gate instead. The reframe is doing something real."

---

**Final Problem Statement:**
> *"L&D managers designing programmes for line managers needs a way to connect learning design decisions to the business KPIs managers are actually measured on because the connection currently lives in one kick-off meeting and disappears before the programme is built."*

**Verdict:** 🟢 Strong AI candidate

**Did the game lead him to the right problem?** Mostly — with a significant asterisk. The game correctly diagnosed challenge 1 as the most tractable AI problem among his three. But challenges 2 and 3 (governance blockage, wrong measurement system) are arguably more important — and the game has no mechanism to address them. It led him to the *most AI-tractable* problem, not the *most important* problem. For Daan, these are different things.

---

**Daan's 3 Key Improvements**

1. **Add a 4th tier: 'The institution is the bottleneck.'** "People won't" and "the tool is broken" don't cover governance blockages, approval processes, or measurement systems that actively disincentivise change. A 🔵 tier — "The constraint is organisational, not operational" — would name the right problem and give players a more honest verdict: "AI won't fix this. This needs change management or political capital."

2. **Show the verdict before the POV construction, not after.** Currently players build the POV and then — implicitly — the verdict confirms whether they should proceed. But the verdict is available after step 1 (category selection). Surfacing it earlier would let players reframe the POV with the verdict in mind. Right now Daan builds a POV that's consistent with his verdict, but only because he already knew what the verdict would be.

3. **The "one small thing" step should name what would need to change organisationally for the experiment to count.** Daan's first experiment is a workflow integration that requires HR system access. The game lets him commit to it without acknowledging that HR system access doesn't exist yet. Add: "What would need to be true in your organisation for this to be allowed?" This surfaces the real constraint — the one that kills most experiments.

---

**Daan's 3 Risks**

1. **The game redirects advanced players away from their most important problems.** Daan's hardest problems rated 🔴. The game correctly identified them as non-AI problems — but then steered him away from them entirely. For advanced practitioners, the most important work might be in the 🔴 problems (changing the conditions so the structural problems can be addressed). *Behavioral mechanism: self-selection bias — the game rewards people who bring AI-tractable problems, which are usually not the same as the most important ones.*

2. **The "why" field produces insight when players are verbose, noise when they're terse.** Daan wrote a full paragraph. Most players won't. The triangulation system, the POV step, and the "one small thing" prompt all depend on input quality. The game has no scaffolding to improve it. *Behavioral mechanism: efficiency satisficing — players who are pressed for time write the minimum needed to advance.*

3. **The verdict is self-certifying if the category selection is unconstrained.** Daan could have clicked "one person holds the knowledge" instead of "no system for it" — same tier, same verdict. He could have clicked "capacity" or "no shared way of doing it" — same result. The verdict is determined by tier (gold/silver/red), and tier is determined by which of three clusters the player maps their problem to in the quick scan. A player who rates their problem as 🟢 in the scan will almost certainly pick a gold-tier category in World 3 and get a 🟢 verdict. The two steps reinforce each other rather than check each other. *Behavioral mechanism: consistency bias — having rated a problem as 🟢, players feel motivated to confirm that rating in subsequent steps.*

---

**Daan's Pre-mortem**

*It's 10 weeks from now. I dropped out after week 2. Here's what happened.*

The game was fine. Fast. I did it in 8 minutes. My problem statement was accurate. I went into the first live session thinking someone else would have a problem as specific as mine — something about system integration or workflow architecture. Instead the group spent 45 minutes on prompt engineering for a quiz generator. I was polite. I contributed. I helped someone with their output.

But the Sprint format is 45 minutes. My problems don't fit in 45 minutes. The workflow integration I described in my "one small thing" requires HR system access I don't have, an API integration I'd need IT approval for, and a governance document I'd need to write. The Sprint gave me 45 minutes and a whiteboard. I came back the second week and somebody was building a slide deck with AI. I didn't come back the third week.

The game did its job. The container didn't match the problem.

**Vote: CONDITIONAL (original)** → **YES (post-debate)** — Yael persuaded me that having an articulable, legible problem statement is the prerequisite for the organisational change I actually need. The game isn't the whole journey. It's the first document in a longer argument.

---

## Round 2: Cross-Persona Debate

### Alliance Map

**Marit agrees with Yael on:** The "why" field needs scaffolding. Both noticed that the open cursor produces quality proportional to player effort. Neither of them think the current design gets consistent quality.

**Marit disagrees with Daan on:** Whether the game should accommodate 🔴 problems more generously. Marit thinks the 🔴 verdict is a feature — it stops people wasting time on non-AI problems. Daan thinks the 🔴 verdict is dismissive — it names the institutional constraint but gives no pathway through it.

**Yael agrees with Daan on:** The game produces articulate problem statements but doesn't verify whether they're true. Both spotted the fluency trap.

**Yael disagrees with Marit on:** Whether the verdict is something worth optimising for. Marit wants the verdict to be defensible in a meeting. Yael thinks optimising for meeting-defensibility is how you end up with a plausible-sounding wrong answer.

**Daan agrees with Marit on:** Nothing, initially. After the debate, he concedes that legibility to non-technical stakeholders is a real value — it's the sentence he's been missing.

**Daan disagrees with Yael on:** The significance of the fluency trap. Daan thinks a fluent-sounding wrong answer is useful because it forces stakeholders to engage. Yael thinks it's dangerous because it forecloses further questioning.

---

### The Debate

**Exchange 1: Is the verdict an instrument or a decoration?**

**Daan:** The verdict is self-certifying. I rated my problem 🟢 in the scan, picked a gold category, and got a 🟢 verdict. The two steps confirmed each other. That's not a diagnostic — it's a mirror.

**Marit:** The mirror is the point. The game isn't testing whether your self-assessment is correct. It's giving you a structured way to articulate a self-assessment that you can then defend. That's not nothing. That's exactly what I need before I walk into a room with a compliance officer.

**Daan:** So the game is a formatting tool, not a diagnostic tool.

**Marit:** All diagnosis begins with self-report. You're expecting the game to know more about your organisation than you do.

**Yael:** Marit's right that it starts with self-report. But then the game presents the output as a *verdict*, which implies external validation. It should present it as a *draft* — "here's your self-assessment, now go test it."

---

**Exchange 2: Should 🔴 problems have a pathway, not just a redirect?**

**Daan:** Two of my three problems rated 🔴. The game correctly said they weren't AI problems. But then it had nothing else to say. "Redirect — start here before AI" is not a pathway. It's a door with no handle.

**Marit:** The 🔴 verdict IS the pathway. It tells you to fix the underlying problem before you add AI. That's not nothing — it stops you building the wrong thing.

**Daan:** It stops me, full stop. The game gives me a verdict and then sends me to the World Map. My 🔴 problems are still my most important problems. What do I do with them?

**Yael:** This is the hardest design tension. If the game tries to address institutional blockages, it becomes a change management program. That's not what it is.

**Daan:** Then it should say so. "This is a problem for a different program" is more honest than "Redirect — start here before AI."

**Marit:** I actually agree with that. Name what the game is and isn't for.

---

**Exchange 3: Does the quick-scan produce the right choice or the most tractable choice?**

**Yael:** The scan correctly moved me from challenge 1 to challenge 2. But challenge 2 was 🟢 because I've never built a reuse system. The absence of a system isn't always a problem — sometimes it's a choice. The scan treats all structural absences the same.

**Daan:** That's a fair point. I had the opposite problem. My most important challenge is a governance blockage. The scan called it 🔴 and moved me away from it. The scan optimises for tractability, not importance.

**Marit:** Are those different things? If a problem isn't tractable, is it a problem you should be working on?

**Yael:** Yes. The intractable problems are often the ones that matter most. The scan creates a selection bias toward solvable problems.

**Marit:** I'd rather have a solvable problem I can make progress on than an important problem I can't touch. That's not avoidance — that's prioritisation.

**Daan:** That's a defensible position if you're working within an institution. If you're trying to change the institution, you have to work on the intractable problems.

*[This exchange has no resolution. Both positions are correct for their respective contexts.]*

---

**Exchange 4: Is the fluency of the output a feature or a bug?**

**Yael:** The game produces well-structured statements from thin inputs. Someone can type two-word answers and get a grammatically clean POV statement. That statement sounds like a design brief. It isn't one.

**Daan:** A fluent-sounding problem statement gets into rooms that a messy one doesn't. I'd rather have a well-formatted wrong answer than a correct answer nobody can read.

**Yael:** You're describing a communication tool, not a diagnostic tool.

**Daan:** Correct. And communication is the thing most practitioners need help with. They understand their own problems. They can't make them legible to the people who approve budgets.

**Marit:** He's right. The game's output is more useful for what comes after than for what happens during. It's a brief-generator more than a diagnosis-engine.

**Yael:** Then the framing should be honest about that. Don't call it a "verdict." Call it a "draft brief."

---

### Mind-Change Log

**Marit:** Vote unchanged (CONDITIONAL). But she sharpened the condition: the live sessions need to actively use the verdict to gate Sprint participation. If 🔴 problems get Sprint time anyway, the diagnostic is decorative. *New worry:* the consistency bias Daan named — once someone rates their problem 🟢 in the scan, they will almost certainly confirm it in World 3. The two steps reinforce rather than check each other.

**Yael:** Vote changed from NO to CONDITIONAL. Marit's argument that the output serves what comes *after* the game (rather than being the final word) moved her. She'd stopped thinking of it as a diagnostic and started thinking of it as a communication artefact. She can respect that. *New worry:* the game may be teaching players to articulate well without teaching them to diagnose well — those are different skills, and only one of them compounds.

**Daan:** Vote changed from CONDITIONAL to YES. Yael's point that articulation is a prerequisite for advocacy landed. He'd been thinking of the game as something that should meet him where he is. She reframed it as the first document in the argument he needs to make — the brief that gets the meeting that enables the project. He'll use it that way. *New worry:* the 🔴 problems still have no home. He'll commit to the program but he's going to bring his 🔴 challenges to every session until somebody addresses them.

---

## Key Tensions (No Clean Resolution)

**1. Tractability vs Importance**  
The quick-scan and verdict system optimises for finding the most AI-tractable problem. For practitioners whose most important problems are governance, culture, or institutional, the game correctly tells them those problems aren't AI problems — and then has nothing else to offer. The game cannot address this without becoming a change management program. It should at minimum acknowledge the limitation explicitly.

**2. Legibility vs Accuracy**  
The POV template produces fluent, meeting-ready output. This is genuinely useful for communicating upward. It may also produce confident-sounding misdiagnoses. The game has no quality gate on the POV — any input generates a valid-looking output. Making the output more legible (fixing the grammar, adding structure) may reduce the pressure players feel to think carefully.

**3. Consistency Check vs Self-Report**  
The quick-scan and World 3 category selection are designed to be independent checks. In practice, a player who rates their problem 🟢 in the scan will almost always pick a gold-tier category in World 3, confirming the rating rather than checking it. The triangulation warning partially addresses this (by cross-checking the "why" text) but only fires for obvious mismatches with specific keywords. Subtle mismatches pass through undetected.

---

## Consensus Points (High-Confidence Design Signals)

1. **The quick-scan is the most valuable addition to the game.** All three personas found it redirected them correctly, or gave them information they didn't have. It's the one step that functions as a check rather than just a capture.

2. **The capacity reframe on "one small thing" is working.** All three personas wrote about what becomes possible, not what becomes faster. The reframe is doing its job.

3. **The "why" field is the game's weakest link.** All three personas wanted more scaffolding. Quality of output depends heavily on quality of input, and the current design has no mechanism to improve input quality.

4. **The game is better understood as a brief-generator than a diagnostic engine.** All three personas, by the end of the debate, accepted that the game's most valuable output is a communication artefact for what comes after — not a final diagnosis of the root cause.

5. **The 🔴 verdict needs a "what next" pathway.** All three agreed that "Redirect — start here before AI" is useful but incomplete. It names the problem type without giving any direction about what to do instead.

---

## Decision Framework

**Prioritise first:**
1. Scaffold the "why" field (sub-questions or guided prompts) — this improves triangulation accuracy, POV quality, and "one small thing" relevance simultaneously. Highest leverage single change.
2. Add "what next" copy to the 🔴 verdict — even one sentence: "This isn't an AI problem yet. The change that needs to happen first is [problem type]. Come back when that's in motion."
3. Split the 🔴 tier into motivation (won't) vs structural/governance (can't) — different problems, different pathways.

**Can wait:**
- Allowing more than 3 challenges (adds noise before value is proven)
- Reversing verdict/POV order (low evidence this improves outcomes)
- Sole-practitioner language adjustment (edge case; note in facilitator guide instead)
