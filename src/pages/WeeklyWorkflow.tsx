import Layout from "@/components/Layout";

const focusAreas = ["Define", "Discover", "Design", "Deploy & Develop", "Iterate"];

const WeeklyWorkflow = () => {
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

      {/* Step Cards */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-10">Inside Each Bi-weekly Cycle</h2>

          <div className="grid gap-6">
            {/* Card 1 — Guest */}
            <div id="section-guest" className="bg-card border border-border rounded-xl p-6 sm:p-8 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="bg-sticky-yellow w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">🎤</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg">Guest + Show & Tell</h3>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-display font-medium">20 min</span>
                  </div>
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
            <div id="section-sprint" className="bg-card border border-border rounded-xl p-6 sm:p-8 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="bg-sticky-green w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">⚡</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg">Micro-case Sprint</h3>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-display font-medium">45 min</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    Participants design and test one micro-case in 45 minutes using AI. No theory — just hands-on experimentation with a real workflow challenge.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 — Tiny Experiment */}
            <div id="section-experiment" className="bg-card border border-border rounded-xl p-6 sm:p-8 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="bg-sticky-blue w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">🧪</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg">Tiny Experiment</h3>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-display font-medium">60 min</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    Before leaving, each participant commits to one small workplace experiment. The goal is a minimum viable experiment — not a perfect solution.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 — Reflection Pods */}
            <div id="section-reflection" className="bg-card border border-border rounded-xl p-6 sm:p-8 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="bg-sticky-pink w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">👥</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg">Reflection Pods</h3>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-display font-medium">10 min with peers</span>
                  </div>
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
            <div id="section-override" className="bg-card border-2 border-primary/20 rounded-xl p-6 sm:p-8 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="bg-accent w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">✍️</div>
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg">The Override Log</h3>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-display font-medium">10 min self-reflection</span>
                  </div>
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
