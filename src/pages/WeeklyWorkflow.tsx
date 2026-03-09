import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

const focusAreas = ["Define", "Discover", "Design", "Deploy & Develop", "Iterate"];

const steps = [
  {
    id: "guest",
    emoji: "🎤",
    title: "Guest + Show & Tell",
    duration: 20,
    label: "20 min",
    color: "bg-sticky-yellow",
    barColor: "bg-[hsl(var(--sticky-yellow))]",
    description:
      "Each session starts with a guest-led show & tell connected to one workflow focus. The guest introduces a real challenge related to one step in the L&D workflow.",
    extra: "focus-areas",
  },
  {
    id: "sprint",
    emoji: "⚡",
    title: "Micro-case Sprint",
    duration: 45,
    label: "45 min",
    color: "bg-sticky-green",
    barColor: "bg-[hsl(var(--sticky-green))]",
    description:
      "Participants design and test one micro-case in 45 minutes using AI. No theory — just hands-on experimentation with a real workflow challenge.",
  },
  {
    id: "experiment",
    emoji: "🧪",
    title: "Tiny Experiment",
    duration: 60,
    label: "60 min async",
    color: "bg-sticky-blue",
    barColor: "bg-[hsl(var(--sticky-blue))]",
    description:
      "Before leaving, each participant commits to one small workplace experiment. The goal is a minimum viable experiment — not a perfect solution. The tiny experiments from each cycle are collected and appear in 'Tiny Experiments' section.",
  },
  {
    id: "reflection",
    emoji: "👥",
    title: "Reflection Pods",
    duration: 10,
    label: "10 min",
    color: "bg-sticky-pink",
    barColor: "bg-[hsl(var(--sticky-pink))]",
    description:
      "Between sessions, you reflect with two peers — sync or async — on what you made, what changed, and what you learned.",
    extra: "reflection-prompts",
  },
  {
    id: "override",
    emoji: "✍️",
    title: "The Override Log",
    duration: 10,
    label: "10 min",
    color: "bg-accent",
    barColor: "bg-[hsl(var(--accent))]",
    description:
      "Participants don't just use AI — they learn to see where human judgment matters most.",
    extra: "override-log",
  },
];

const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);

const WeeklyWorkflow = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-display font-medium mb-6">
            Weekly Workflow
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Your 2-Week Rhythm for AI Experimentation
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-3">
            Every two weeks, you'll follow this cycle to redesign one workflow step with AI.
          </p>
          <p className="text-sm text-muted-foreground/70 font-body italic max-w-xl mx-auto">
            Test it. Reflect with peers. Showcase what you can now do that was impossible before.
          </p>
        </div>
      </section>

      {/* Timeline / Gantt */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-4">
            Inside Each Bi-weekly Cycle
          </h2>
          <p className="text-center text-sm text-muted-foreground font-body mb-10">
            Total cycle: <span className="font-display font-bold text-foreground">{totalDuration} min</span> · Click any step to explore
          </p>

          {/* Gantt bars */}
          <div className="space-y-3 mb-8">
            {steps.map((step, index) => {
              const widthPercent = (step.duration / totalDuration) * 100;
              const isActive = activeStep === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(isActive ? null : step.id)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Step number & emoji */}
                    <div className="flex items-center gap-2 w-24 sm:w-32 shrink-0">
                      <span className="text-xs font-mono text-muted-foreground font-bold w-5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg">{step.emoji}</span>
                      <span className="hidden sm:inline text-xs font-display font-medium text-foreground truncate">
                        {step.title}
                      </span>
                    </div>

                    {/* Bar track */}
                    <div className="flex-1 relative">
                      <div className="w-full h-10 sm:h-12 bg-muted/40 rounded-lg overflow-hidden">
                        <div
                          className={`h-full rounded-lg transition-all duration-500 ease-out flex items-center px-3 gap-2 ${
                            isActive
                              ? `${step.barColor} opacity-100 shadow-md`
                              : `${step.barColor} opacity-70 group-hover:opacity-90`
                          }`}
                          style={{ width: `${Math.max(widthPercent, 12)}%` }}
                        >
                          <span className="sm:hidden text-xs font-display font-bold text-foreground/90 truncate">
                            {step.title}
                          </span>
                          <span className="text-xs font-mono font-bold text-foreground/70 ml-auto whitespace-nowrap">
                            {step.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded detail panel */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isActive ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-24 sm:ml-32 bg-card border border-border rounded-xl p-5 sm:p-6">
                      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
                        {step.description}
                      </p>

                      {step.extra === "focus-areas" && (
                        <div className="flex flex-wrap gap-2">
                          {focusAreas.map((area) => (
                            <span
                              key={area}
                              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-display font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      )}

                      {step.extra === "reflection-prompts" && (
                        <div className="grid sm:grid-cols-3 gap-3">
                          {[
                            "What did you ship since last time?",
                            "Show the artifact (prompt + output)",
                            "What can we do now that we couldn't before?",
                          ].map((q) => (
                            <div key={q} className="bg-muted/50 rounded-lg p-3 text-center">
                              <p className="text-xs font-display font-medium text-foreground">{q}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.extra === "override-log" && (
                        <>
                          <div className="bg-muted/30 border border-border rounded-lg p-4 font-mono text-sm space-y-2">
                            {["What did AI suggest?", "What did I override?", "What is uniquely mine?"].map(
                              (q, i) => (
                                <div key={q}>
                                  {i > 0 && <div className="border-t border-border/50 mb-2" />}
                                  <div className="flex items-start gap-3">
                                    <span className="text-primary font-bold shrink-0">
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-foreground/80">{q}</span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground/70 font-body mt-3 italic">
                            This is where participants learn not just to use AI, but to collaborate with it
                            deliberately.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mini legend */}
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground font-body">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[hsl(var(--sticky-yellow))]" />
              <span>Live session</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[hsl(var(--sticky-blue))]" />
              <span>Async work</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[hsl(var(--sticky-pink))]" />
              <span>Peer reflection</span>
            </div>
          </div>

          {/* Next Section CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground font-body mb-4">
              Ready to see how experiments are tracked?
            </p>
            <Link
              to="/experiments"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-medium text-sm hover:opacity-90 transition-opacity"
            >
              View Tiny Experiments →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WeeklyWorkflow;