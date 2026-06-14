# SCAMPER Audit: AI Problem Finder (the game)

**Date:** 2026-06-14
**Target:** The playable AI Problem Finder — World 1 (Context) → World 2 (The Dig) → World 3 (Field Report) → The Challenges Wall
**Audit question:** Does the flow actually lead a player to the *right* problem to solve with AI in L&D? If not, what fixes it?
**Personas:** Marit (Constrained Corporate) · Yael (Authentic Craft) · Daan (Stranded Pioneer)

The four SCAMPER "components" are re-mapped onto the game's actual screens:

| # | Component | What it does | Role in "rightness" |
|---|-----------|--------------|---------------------|
| C1 | **World 1 — Context** | Workplace, audience, reality-word, scarcity | Framing only — does not feed the verdict |
| C2 | **World 2 — The Dig** | Name 1–3 challenges → **choose one** → why → recurring? | First and only *selection* moment |
| C3 | **World 3 — Field Report** | Draft → **categorise (9 types / 3 tiers)** → refine + **AI-fitness verdict** → POV → one small thing | The decision engine |
| C4 | **The Challenges Wall** | Shared statements, reactions, verdict/context filters | Social proof, no feedback into selection |

**The Override Log** — the program's stated pedagogical spine (what did AI suggest / what did I override / what is uniquely mine) — **does not exist anywhere in the game.** All three personas flag this. The closest analogue is the POV "BECAUSE" line and the verdict reason, neither of which makes a human-judgment-over-AI move visible.

---

## Vote Tracker

### Round 1 Commitment Votes
| Persona | Vote | Condition |
|---|---|---|
| Marit | **CONDITIONAL** | IF a worked example precedes the cold draft, and context constraints change the verdict |
| Yael | **NO** | The final step ("repetitive, slow, manual") forces the efficiency frame the program claims to fight |
| Daan | **CONDITIONAL** | IF selection happens *after* AI-fitness criteria, not before — and process-level problems get a real track |

### Round 2 Commitment Votes (post-debate)
| Persona | Original | Final | Changed? | Reason |
|---|---|---|---|---|
| Marit | CONDITIONAL | CONDITIONAL | No | Held; added that self-categorisation is an audit risk she hadn't named |
| Yael | NO | **CONDITIONAL** | **Yes** | Daan's "score all three, then pick" reframes selection as judgment, not speed |
| Daan | CONDITIONAL | CONDITIONAL | No | Held; conceded Marit's worked-example point as a triage accelerator, not a crutch |

### Cross-Suggestion Votes
| Suggestion | Source | Marit | Yael | Daan |
|---|---|---|---|---|
| Worked example before the cold draft | Marit | — | CONDITIONAL | YES |
| Context constraints must change the verdict | Marit | — | YES | YES |
| Make the human-judgment move explicit (Override Log in-game) | Yael | YES | — | YES |
| Replace "repetitive/slow/manual" ending with a capacity reframe | Yael | CONDITIONAL | — | YES |
| Score all named challenges, *then* pick | Daan | YES | YES | — |
| Triangulate the verdict (don't trust the self-click) | Daan | YES | YES | — |

---

## Round 1 Results

### Marit — The Constrained Corporate
*Risk-assessment voice. Reads the game as something she'd have to defend in a governance meeting.*

**C2 — The Dig · Eliminate / Reverse.** I am asked to "choose my problem to dig" at step two, before the game has told me anything about what makes a problem AI-suitable. So I choose the one I can *defend*, not the one that's *right*. Then I spend the whole rest of the session refining a choice I made blind. Reverse it: show me the sorting criteria first, then let me pick.

**C3 — Field Report · Substitute.** The verdict is generated entirely from the category I click myself. There is no independent check. In my world, a control that relies on the operator self-certifying the outcome is not a control. If I miscategorise "no system for it" as "no shared way of doing it," I get a different fitness verdict for the identical problem. I can't take a verdict to my director that I produced by grading my own homework.

**C1 — Context · Put to another use.** I tell the game I work in a regulated multinational and that my scarcity is "stakeholder buy-in." Then that information does *nothing*. It decorates my artifact card. If context doesn't change what counts as a good AI problem *for me*, why collect it? A "no system for it" problem in pharma is not the same green-light it is for a freelancer.

**3 Key Improvements**
1. **Add a 30-second worked example before World 3's cold draft** — a redacted real problem from a regulated environment, run through the same funnel, ending in its verdict. I need to see a safe path before I walk it. *(Behavioral driver: governance anxiety — I don't experiment cold.)*
2. **Let context gate the verdict.** If scarcity = buy-in and workplace = regulated, a "strong AI candidate" should carry a caveat: "structurally sound, but your blocker is adoption — here's the validation step." *(Driver: I need defensibility, not a green light.)*
3. **Reframe the verdict as documentation, not a grade.** Output a one-line "why this is/ isn't an AI problem" I can paste into a proposal. *(Driver: the Override Log works for me only as QA evidence.)*

**3 Risks**
- **Self-certification risk:** the verdict's authority is fake — it's my own click reflected back. A confident-but-wrong verdict is worse than no verdict, because I'll cite it. *(Mechanism: misplaced institutional trust.)*
- **Premature-commitment risk:** choosing before criteria means I polish the defensible problem, not the right one. *(Mechanism: safety-seeking under ambiguity.)*
- **Decorative-context risk:** collecting my constraints and ignoring them signals the tool doesn't actually understand my terrain — the exact thing that makes me save the link and never return. *(Mechanism: "this wasn't built for someone like me.")*

**Pre-mortem.** *Ten weeks out, dropped.* I finished the game once. I got a green "Strong AI candidate" on a problem about onboarding consistency, and for about an hour I felt good. Then I tried to use it. I opened the proposal template for my steering group and realised I had nothing defensible — just a verdict I'd generated by picking my own category off a list. There was no validation trail, no acknowledgement that in my environment "build an AI helper" triggers a six-week risk review. The game had treated my regulated context as flavour text. I didn't rage-quit. I just quietly stopped opening it, because it had given me confidence I couldn't stand behind in a room.

**Vote: CONDITIONAL** — IF a worked example precedes the draft and my context actually changes the verdict.

---

### Yael — The Authentic Craft Professional
*Design-critique voice. Scanning for whether the game sees the professional or just the output.*

**C3 — Field Report · Reverse (the ending).** The last thing the game asks me — the step that becomes my artifact — is to name "the bit that's repetitive, slow, or manual every single time." That is the efficiency frame. The whole premise of this program, as I understand it, is that L&D is *stuck* seeing AI as faster content. And then the game's own finale walks me straight back into "what can I automate." You've built a funnel that ends exactly where the problem starts.

**C3 — Field Report · Substitute (the POV).** "Give it a who / needs / because" is fine, but it's a template, not a judgment. The interesting question was never "who has the problem." It's "what did *you* decide that a model couldn't." The game never asks what's distinctly mine. There's no moment where my craft is the subject.

**C2 — The Dig · Modify.** "Why is this happening? Don't explain. Describe." — this is the one line in the whole game that respects how practitioners actually think. It's good. It's also buried and under-weighted: one textbox, then gone. The root-cause description should travel all the way to the verdict and shape it. Instead it's collected and dropped.

**Override Log · Eliminate (by omission).** The pedagogical spine isn't here. There is no "what did AI suggest / what did I override / what is mine." For a program whose thesis is *deliberate* human-AI collaboration, the game finds a problem and then stops precisely before the part that matters. It teaches problem-shaping, not judgment.

**3 Key Improvements**
1. **Replace the "repetitive/slow/manual" ending with a capacity reframe:** "What could you attempt that you couldn't before — not faster, but *at all*?" Make the artifact about new range, not saved minutes. *(Driver: I refuse to be reduced to throughput.)*
2. **Add one live judgment beat:** after the verdict, show a plausible AI "answer" to the player's problem and ask "what would you override, and why?" That single screen *is* the Override Log, and it puts the professional back at the centre. *(Driver: judgment is the unit of value, and it happens in the moment.)*
3. **Carry the root-cause description into the verdict.** What I wrote in "why is this happening" should visibly inform whether this is an AI problem — not be replaced by a category click. *(Driver: process over output.)*

**3 Risks**
- **Identity-flattening risk:** a player finishes feeling like a prompt-writer, not a designer who used judgment. The game celebrates the *problem found*, never the *decision made*. *(Mechanism: not-being-seen → deflation → exit.)*
- **Generic-output risk:** the POV template produces interchangeable statements. On the Wall, every card reads the same. Nothing signals craft. *(Mechanism: commodity anxiety.)*
- **Retrospective-only risk:** every reflective beat is after-the-fact. The raw decision — the actual moment of overriding the obvious answer — is never captured, because the game never puts a model output in front of me to react to. *(Mechanism: the real response is gone by debrief.)*

**Pre-mortem.** *Ten weeks out, dropped.* I played it properly, once, taking it seriously. It was competent. The world-map looked lovely. And at the end I had a tidy sentence — "managers need a way to give feedback because there's no structure for it" — and a note to automate the repetitive part. I looked at it and felt the specific deflation I always feel: this could have been written by anyone, about anything. Nowhere in twenty minutes did it ask me what I would have done differently from the model, what I'd refuse, what only I could see. It found me a problem and handed me back a commodity. I closed the tab the way you close a well-made thing that wasn't made for you.

**Vote: NO** — the ending betrays the thesis and my judgment never becomes the subject.

---

### Daan — The Stranded Pioneer
*Impatient-architect voice. Reviewing beginner blueprints.*

**C2 — The Dig · Reverse.** The sequence is backwards. I name up to three challenges, then immediately "pick one to dig" — on instinct, with zero fitness criteria on screen. Then forty steps later the game finally reveals what separates a structural AI problem from a behaviour problem. So I've already thrown away the two I didn't pick, and they're never scored. Score all three against the tiers, *then* let me choose. Right now the selection logic runs before the only screen that contains selection logic.

**C3 — Field Report · Substitute.** The verdict is a lookup on my own click. I pick "bottleneck," the game says gold. That's not an assessment, it's an echo. I've built pipelines — I know the difference between a system telling me something and a system agreeing with me. Triangulate: cross my category against my root-cause text and my recurring answer, and flag the contradiction when they disagree.

**C3 — Field Report · Modify (scope).** Everything is scoped at task level. "One small thing… the bit that's repetitive." I don't have a repetitive bit, I have a broken *process*. The game has no altitude setting. A person redesigning a workflow and a person automating a copy-paste get the identical funnel and the identical tiny-experiment prompt.

**C1 — Context · Adapt.** Context asks "what do you never have enough of" but not "how far have you already gone." I've been doing this eighteen months. The game can't tell me apart from someone who opened ChatGPT yesterday. One screening question — "have you already shipped something like this?" — could route me to a harder track.

**3 Key Improvements**
1. **Move scoring before selection:** run all named challenges through the tier test, show me three verdicts, *then* I pick the strongest AI candidate — that's the whole point of the tool. *(Driver: I want the system to do triage I can't do alone.)*
2. **Triangulate the verdict** across category + root-cause text + recurrence; surface mismatches ("you called this structural but described a people-won't problem"). *(Driver: I trust signal, not agreement.)*
3. **Add an altitude switch** — task / process / org — that changes both the categories shown and the final experiment prompt. *(Driver: task-level framing makes me leave.)*

**3 Risks**
- **Echo-chamber risk:** the verdict confirms whatever I already believed, so the tool never corrects a wrong pick — it just ratifies it faster. *(Mechanism: confirmation, dressed as assessment.)*
- **Scope-floor risk:** the tiny-experiment ending caps ambition at the task level; process people disengage at the exact moment the game thinks it's delivering value. *(Mechanism: "this is for someone who hasn't started.")*
- **Lost-alternatives risk:** the two unscored challenges might have been the gold ones. The game's single-path design guarantees I never find out. *(Mechanism: premature narrowing.)*

**Pre-mortem.** *Ten weeks out, dropped — actually, week one.* I named three challenges. The game made me pick one before it told me anything, so I picked the obvious one. Twenty minutes later it handed me a green verdict that was just my own first click reflected back, and a prompt to find "the repetitive bit." I don't have a repetitive bit. I have a four-stage intake process I rebuilt over a year on a personal laptop. The game had no setting for that. It was pitched at someone explaining what a prompt is. I'd closed it before the flag finished raising, and I went back to building the thing I was already building, alone.

**Vote: CONDITIONAL** — IF selection follows scoring and process-level problems get a real track.

---

## Round 2 Results

### Alliance Map
- **Strongest alliance: Daan ↔ Marit** on *don't trust the self-click*. Marit calls it a failed control; Daan calls it an echo. Same flaw, two vocabularies. This is the audit's highest-confidence signal.
- **Second alliance: Daan ↔ Yael** on *the ending is wrong*. Daan: too low-altitude. Yael: too efficiency-framed. Both want the finale to be about new capability, not saved time.
- **Tension with no clean resolution: Marit ↔ Daan** on the worked example. Marit needs it to start at all. Daan thinks any worked example drags the median down and signals "beginner program." The disagreement is about *who the game is for.*
- **Quiet tension: Yael ↔ everyone** on whether finding a problem is even the goal. Yael thinks the game optimises the wrong verb — it should be teaching judgment, not selection.

### The Debate

**Daan:** Move the scoring before the pick. The tool's one job is triage, and it does the triage *after* I've already triaged by gut. It's backwards.
**Marit:** Agreed, but scoring three problems against nine categories cold is exactly where I freeze. Put a worked example in front of it or I'll abandon at the first tier list.
**Daan:** A worked example is how you tell me this program is for beginners. The moment I see a hand-holding case study I'm gone. I don't need to be shown a path, I need the system to be sharper than me on one specific thing.
**Marit:** Then make it skippable. Your confidence is not a design spec. Some of us are calculating career exposure, not showing off pipelines.

**Yael:** You're both arguing about the order of the funnel. I'm telling you the funnel ends in the wrong place. "Find the repetitive, slow, manual bit" — that's the efficiency trap the whole program exists to break. You can reorder it perfectly and still arrive at "what can I automate."
**Daan:** That I'll sign. My problem isn't repetitive anyway, it's structural. The ending has no altitude.
**Yael:** It's not just altitude. Even your structural problem, framed as "what's slow," becomes a time-saving exercise. The question has to be "what becomes *possible*." Otherwise I finish as a faster version of myself, not a different one.

**Marit:** I can sell "possible" to a steering group less easily than "we saved 40 hours." Possible is unmeasurable. Don't design the ending around the one outcome I can't defend.
**Yael:** And there's the whole problem in one sentence. You'll keep choosing defensible-and-small over real-and-new, and the game will keep letting you, and in two years L&D still frames AI as faster content. The game is *complicit* in the thing it diagnoses.
**Marit:** Or it's realistic about where I actually live.

**Daan:** This is the real fork. The game either ratifies the safe, small, defensible pick — Marit's world — or it pushes for the structural, ambitious, harder-to-defend one. It currently pretends to do the second while its ending quietly does the first.

### Mind-Change Log
- **Yael: NO → CONDITIONAL.** Daan's "score all three, then pick" reframed selection as an act of judgment rather than speed — that's a version of choosing she can respect. Still needs the ending fixed and one live-judgment beat. Now more worried that the game is *actively complicit* in the efficiency frame, not merely silent on it.
- **Marit: held CONDITIONAL.** Unmoved on needing the worked example. Conceded she hadn't named the self-categorisation flaw and now rates it her top audit risk. More worried that a confident wrong verdict is more dangerous than none.
- **Daan: held CONDITIONAL.** Conceded a *skippable* worked example is triage acceleration, not a crutch. Unmoved on altitude. More worried the single-path design permanently hides whether the abandoned challenges were the better AI candidates.

---

## Key Tensions (no clean resolution)

1. **Defensible-and-small vs. real-and-new.** Marit can only sell measurable efficiency upward; Yael says efficiency framing is the disease. The game's ending currently sides with Marit while claiming Yael's mission. *You cannot fully satisfy both — you must choose which the artifact optimises for, or branch it by context.*
2. **Beginner legibility vs. expert respect.** A worked example rescues Marit and repels Daan. The map currently serves the median, which means it serves neither edge well.
3. **Selection vs. judgment as the core verb.** Is the game's job to help you *pick* the right problem (Daan/Marit) or to teach you the *judgment* that makes any pick yours (Yael)? It currently does a thin version of the first and none of the second.

## Consensus Points (high-confidence — fix these first)

1. **Don't trust the self-click.** The verdict must triangulate (category × root-cause text × recurrence), not echo a single selection. *All three.*
2. **Score before you select.** Run all named challenges through the tiers and let the player pick the strongest candidate — selection currently happens before any criteria exist. *All three.*
3. **The ending betrays the thesis.** "Repetitive / slow / manual" must become a capacity question ("what's now possible?"). *All three.*
4. **The Override Log / human-judgment move is missing.** The game finds a problem and stops before the part the program is actually about. *All three.*
5. **Context is decorative.** World 1 should change the verdict, not just the artifact card. *Marit + Daan, Yael sympathetic.*

## Decision Framework

Weigh each fix on **(a) does it improve problem-selection accuracy** and **(b) does it serve the identity-transition thesis**:

| Fix | Accuracy | Thesis | Effort | Priority |
|---|---|---|---|---|
| Triangulate verdict | High | Med | Med | **1 — do first** |
| Score-then-select | High | Med | Med | **2** |
| Capacity-reframe ending | Low | High | Low | **3 — cheapest thesis win** |
| Live judgment beat (Override Log) | Med | High | Med | **4** |
| Context gates verdict | Med | High | Med | 5 |
| Skippable worked example | Med | Low | Low | 6 |
| Altitude switch | Med | Med | High | 7 — defer |

**Do-first cluster:** #1, #2, #3. The first two fix *accuracy* (the literal answer to "does it lead me to the right problem" — currently no, because it lets you commit before scoring and then echoes your guess). The third is a one-line copy change that buys the biggest thesis alignment for the least work.
