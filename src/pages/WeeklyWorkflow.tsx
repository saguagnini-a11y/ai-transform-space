import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Mic, FlaskConical, Users, PenLine, ChevronRight } from "lucide-react";

const loopSteps = [
  { icon: Mic, emoji: "🎤", label: "Guest Challenge", color: "bg-sticky-yellow" },
  { icon: Zap, emoji: "⚡", label: "Sprint", color: "bg-sticky-green" },
  { icon: FlaskConical, emoji: "🧪", label: "Tiny Experiment", color: "bg-sticky-blue" },
  { icon: Users, emoji: "👥", label: "Reflection Pod", color: "bg-sticky-pink" },
  { icon: PenLine, emoji: "✍️", label: "Override Log", color: "bg-accent" },
];

const focusAreas = ["Define", "Discover", "Design", "Deploy & Develop", "Iterate"];

const workflows = [
  { id: "needs", name: "Needs Analysis", desc: "Identify learning gaps and priorities", steps: ["Gather data", "Analyze surveys", "Interview stakeholders", "Prioritize needs", "Report findings"] },
  { id: "design", name: "Learning Design", desc: "Design learning experiences", steps: ["Define objectives", "Map learner journey", "Select modalities", "Create assessments", "Peer review"] },
  { id: "content", name: "Content Development", desc: "Create and curate content", steps: ["Research topics", "Write content", "Create visuals", "Review & iterate", "Publish"] },
  { id: "eval", name: "Evaluation", desc: "Measure learning impact", steps: ["Define metrics", "Collect data", "Analyze results", "Generate insights", "Share recommendations"] },
  { id: "stakeholder", name: "Stakeholder Communication", desc: "Align with business leaders", steps: ["Map stakeholders", "Craft messaging", "Present data", "Get buy-in", "Follow up"] },
];

const sprintSteps = [
  { label: "Define the Challenge", placeholder: "What workflow challenge do you want to tackle?" },
  { label: "Write a Prompt", placeholder: "Write the prompt you'll use to test this with AI..." },
  { label: "Test with AI", placeholder: "Paste the AI output here..." },
  { label: "Capture Output", placeholder: "What was the result? What worked, what didn't?" },
  { label: "Write a Reflection", placeholder: "What did you learn? What would you do differently?" },
];

const WeeklyWorkflow = () => {

  return (
    <Layout>
      {/* Hero */}
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            How the Sandbox Works
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-3">
            Every two weeks, redesign one workflow step with AI.
          </p>
          <p className="text-sm text-muted-foreground/70 font-body italic max-w-xl mx-auto mb-10">
            Test it. Reflect with peers. Showcase what you can now do that was impossible before.
          </p>

          {/* Visual loop */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            {loopSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-3">
                <div className={`${step.color} px-4 py-2.5 rounded-lg shadow-sm`}>
                  <span className="text-base sm:text-lg mr-1.5">{step.emoji}</span>
                  <span className="font-display font-semibold text-sm sm:text-base text-foreground">{step.label}</span>
                </div>
                {i < loopSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60 font-display tracking-wide uppercase">Repeat every two weeks</p>
        </div>
      </section>

      {/* Step Cards */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-10">Inside Each Bi-weekly Cycle</h2>

          <div className="grid gap-6">
            {/* Card 1 — Guest */}
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-sticky-yellow w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">🎤</div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">Guest + Show & Tell</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
                    Each session starts with a guest-led show & tell connected to one workflow focus. The guest introduces a real challenge.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {focusAreas.map((area) => (
                      <span key={area} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-display font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Sprint */}
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-sticky-green w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">⚡</div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">Micro-case Sprint</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    Participants design and test one micro-case in 45 minutes using AI. No theory — just hands-on experimentation with a real workflow challenge.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 — Tiny Experiment */}
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-sticky-blue w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">🧪</div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">Tiny Experiment</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    Before leaving, each participant commits to one small workplace experiment. The goal is a minimum viable experiment — not a perfect solution.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 — Reflection Pods */}
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-sticky-pink w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">👥</div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">Reflection Pods</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                    Between sessions, you reflect with two peers — sync or async — on what you made, what changed, and what you learned.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-sm font-display font-medium text-foreground">What did you ship since last time?</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-sm font-display font-medium text-foreground">Show the artifact (prompt + output)</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-sm font-display font-medium text-foreground">What can we do now that we couldn't before?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 — Override Log */}
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-accent w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">✍️</div>
                <div className="w-full">
                  <h3 className="font-display font-bold text-lg mb-2">The Override Log</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                    Participants don't just use AI — they learn to see where human judgment matters most.
                  </p>
                  <div className="bg-muted/30 border border-border rounded-lg p-5 font-mono text-sm space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold shrink-0">01</span>
                      <span className="text-foreground/80">What did AI suggest?</span>
                    </div>
                    <div className="border-t border-border/50" />
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold shrink-0">02</span>
                      <span className="text-foreground/80">What did I override?</span>
                    </div>
                    <div className="border-t border-border/50" />
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold shrink-0">03</span>
                      <span className="text-foreground/80">What is uniquely mine?</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/70 font-body mt-3 italic">
                    This is where participants learn not just to use AI, but to collaborate with it deliberately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default WeeklyWorkflow;
