import type { RootCause } from "./types";

export const ROOT_CAUSES: RootCause[] = [
  // --- Strong candidates: a POC is the right move ---
  {
    id: "tool-gap",
    name: "Tool Gap",
    description: "The work needs a capability that no current tool provides.",
    looksLike:
      "People build workarounds in spreadsheets, email, or their heads because nothing does the job.",
    example:
      "Trainers manually rewrite the same course outline for every client because no tool adapts content to context.",
    verdict: "strong",
    routingLabel: "Strong Candidate",
    whatItMeans:
      "Your problem comes from a missing capability. That's exactly the gap a small AI proof of concept can test.",
    nextStep: "Scope a POC around the single missing capability. Build the smallest version that fills the gap.",
  },
  {
    id: "workflow-bottleneck",
    name: "Workflow Bottleneck",
    description: "One slow, repetitive step is choking an otherwise working process.",
    looksLike:
      "Work queues up at the same point every time. One person or one task is always the holdup.",
    example:
      "Every e-learning module waits two weeks for one reviewer to check tone and terminology consistency.",
    verdict: "strong",
    routingLabel: "Strong Candidate",
    whatItMeans:
      "A single repetitive step is the constraint. AI is good at exactly this kind of narrow, repeated task.",
    nextStep: "POC the bottleneck step only — not the whole workflow. Measure time saved at that one point.",
  },
  {
    id: "dependency",
    name: "Dependency",
    description: "Progress stalls waiting on another person, team, or system.",
    looksLike:
      "You hear 'we're waiting on...' a lot. The work itself is fine; the waiting is the problem.",
    example:
      "Course updates wait weeks for subject-matter experts to answer routine factual questions.",
    verdict: "strong",
    routingLabel: "Strong Candidate",
    whatItMeans:
      "The wait, not the work, is your problem. AI can often stand in for the routine part of what you wait for.",
    nextStep: "POC a first-draft or self-serve version of what you wait for. Keep the expert for the final check.",
  },
  // --- Candidates: POC paired with something else ---
  {
    id: "process-gap",
    name: "Process Gap",
    description: "There is no agreed way of doing this — everyone improvises.",
    looksLike:
      "Five people do the same task five different ways. Quality depends on who you ask.",
    example:
      "Every facilitator collects session feedback differently, so results can't be compared across the programme.",
    verdict: "candidate",
    routingLabel: "Candidate",
    whatItMeans:
      "AI can help, but automating an improvised process just makes the chaos faster. Design the process first.",
    nextStep: "POC + process redesign: agree the way of working, then let AI support the agreed steps.",
  },
  {
    id: "resource-constraint",
    name: "Resource Constraint",
    description: "There genuinely isn't enough time, budget, or people for the work.",
    looksLike:
      "The team is competent and the process is clear — there's simply more demand than capacity.",
    example:
      "One L&D manager supports 800 employees and triages requests instead of designing learning.",
    verdict: "candidate",
    routingLabel: "Candidate",
    whatItMeans:
      "AI might stretch capacity, but first be sure the constraint is real and the demand is worth meeting.",
    nextStep: "Investigate first: measure where the time actually goes, then POC the biggest time sink.",
  },
  {
    id: "comms-breakdown",
    name: "Comms Breakdown",
    description: "Information exists but doesn't reach the people who need it.",
    looksLike:
      "The answer was in an email, a wiki, or someone's head — but nobody found it in time.",
    example:
      "Managers don't know which trainings their teams completed, so they keep requesting duplicates.",
    verdict: "candidate",
    routingLabel: "Candidate",
    whatItMeans:
      "AI can surface and route information, but if people don't share by habit, the tool will go quiet too.",
    nextStep: "POC + culture work: pair an AI answer/routing layer with new norms about where information lives.",
  },
  {
    id: "skill-gap",
    name: "Skill Gap",
    description: "People don't yet know how to do the thing well.",
    looksLike:
      "Errors and rework cluster around the same tasks. Confidence is low; avoidance is high.",
    example:
      "New trainers struggle to write good learning objectives, so seniors quietly rewrite everything.",
    verdict: "candidate",
    routingLabel: "Candidate",
    whatItMeans:
      "AI can scaffold the skill or coach in the moment — but sometimes plain training is the honest answer.",
    nextStep: "POC + training, or training only: decide whether AI scaffolds the skill or simply hides its absence.",
  },
  // --- Redirects: a POC probably isn't right ---
  {
    id: "product-issue",
    name: "Product Issue",
    description: "An existing tool or platform is broken, clunky, or wrong for the job.",
    looksLike:
      "Complaints cluster around one system. People avoid it, export out of it, or keep shadow copies.",
    example:
      "The LMS search is so bad that learners ask colleagues for course links instead of using the platform.",
    verdict: "redirect",
    routingLabel: "Redirect",
    whatItMeans:
      "This one doesn't need AI. It needs the product fixed or replaced. That's useful to know.",
    nextStep: "Take it to the product owner or vendor. Layering AI on a broken product hides the problem.",
  },
  {
    id: "will-motivation",
    name: "Will / Motivation",
    description: "People can do it — they don't want to, or don't see why they should.",
    looksLike:
      "Capability is there; incentives, trust, or buy-in are not. Mandates produce compliance, not change.",
    example:
      "Managers skip coaching conversations because nothing in their targets rewards developing people.",
    verdict: "redirect",
    routingLabel: "Redirect",
    whatItMeans:
      "This one doesn't need AI. It needs the people issue addressed. That's useful to know.",
    nextStep: "Work on incentives, leadership, and trust. No tool fixes a reason-to-care problem.",
  },
];

export const getRootCause = (id: string | null) =>
  ROOT_CAUSES.find((rc) => rc.id === id) ?? null;
