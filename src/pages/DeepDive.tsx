import Layout from "@/components/Layout";
import { Search, Layers, Target, Users, Lightbulb, ArrowRight } from "lucide-react";

const diveTopics = [
  {
    emoji: "🔍",
    icon: Search,
    title: "Define",
    subtitle: "Needs Analysis Deep Dive",
    description: "Dig into how AI can reshape the way you identify learning needs — from survey analysis to stakeholder interviews.",
    prompts: [
      "How might AI surface patterns in qualitative feedback that humans miss?",
      "What happens when you let AI draft your needs report — and then override it?",
      "Where does context matter more than data?",
    ],
  },
  {
    emoji: "🧭",
    icon: Layers,
    title: "Discover",
    subtitle: "Research & Benchmarking Deep Dive",
    description: "Explore how AI accelerates research, competitive analysis, and trend-spotting across your domain.",
    prompts: [
      "Can AI help you benchmark faster without losing nuance?",
      "What sources does AI miss that your expertise catches?",
      "How do you validate AI-generated research?",
    ],
  },
  {
    emoji: "✏️",
    icon: Target,
    title: "Design & Develop",
    subtitle: "Learning Experience Design Deep Dive",
    description: "Go deeper on designing and developing learning journeys, assessments, and experiences with AI as a co-designer.",
    prompts: [
      "What does a good AI-assisted learner journey look like?",
      "Where does AI-generated assessment design fall short?",
      "How do you keep the human touch in AI-designed experiences?",
    ],
  },
  {
    emoji: "🚀",
    icon: Lightbulb,
    title: "Deploy & Iterate",
    subtitle: "Implementation & Improvement Deep Dive",
    description: "Tackle the real-world challenges of deploying AI-enhanced workflows — from pilot to scale — and refine them over time.",
    prompts: [
      "What's the smallest viable way to test this in your team?",
      "How do you measure whether AI actually improved the outcome?",
      "What feedback loops matter most?",
    ],
  },
];

const DeepDive = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Workflow Deep Dives
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-3">
            Go deeper on one workflow focus area. Unpack the hard questions. Practice with peers.
          </p>
          <p className="text-sm text-muted-foreground/70 font-body italic max-w-xl mx-auto">
            Each deep dive aligns with the bi-weekly session focus — so you arrive sharper and leave with more to ship.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-3">How a Deep Dive Works</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
            A structured 60-minute session to go beyond the surface.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="bg-sticky-yellow w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl">🎯</div>
              <h3 className="font-display font-bold mb-2">Frame</h3>
              <p className="text-sm text-muted-foreground">Pick one workflow challenge. Define what "better" looks like for your context.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="bg-sticky-green w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl">🛠️</div>
              <h3 className="font-display font-bold mb-2">Build</h3>
              <p className="text-sm text-muted-foreground">Craft prompts, test with AI, iterate on outputs. Work through the messy middle together.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="bg-sticky-blue w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl">💬</div>
              <h3 className="font-display font-bold mb-2">Debrief</h3>
              <p className="text-sm text-muted-foreground">Share what worked, what you overrode, and what you'd take back to your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Topics */}
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-3">Deep Dive Topics</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
            One topic per cycle, aligned to the 5 workflow focus areas.
          </p>

          <div className="space-y-6">
            {diveTopics.map((topic) => (
              <div key={topic.title} className="bg-card border border-border rounded-xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">
                    {topic.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-display font-bold text-lg">{topic.title}</h3>
                      <span className="text-sm text-muted-foreground">— {topic.subtitle}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                      {topic.description}
                    </p>
                    <div className="space-y-2">
                      {topic.prompts.map((prompt, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          <p className="text-sm text-foreground/80">{prompt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you leave with */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">What You Leave With</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">🧪</p>
              <p className="font-display font-semibold text-sm">A tested prompt + output pair you can reuse</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">✍️</p>
              <p className="font-display font-semibold text-sm">An override log showing your expert judgment</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">💡</p>
              <p className="font-display font-semibold text-sm">A sharper mental model for AI collaboration</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">🤝</p>
              <p className="font-display font-semibold text-sm">Peer feedback on your approach and thinking</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DeepDive;
