import { useState } from "react";
import Layout from "@/components/Layout";
import { Search, Layers, Target, Lightbulb, ArrowRight, ChevronDown, ChevronUp, MessageSquare, Zap, HelpCircle } from "lucide-react";

const diveTopics = [
  {
    emoji: "🔍",
    icon: Search,
    title: "Define",
    subtitle: "Needs Analysis Deep Dive",
    description: "Dig into how AI can reshape the way you identify learning needs — from survey analysis to stakeholder interviews.",
    prompts: [
      { icon: "🔬", text: "How might AI surface patterns in qualitative feedback that humans miss?" },
      { icon: "✍️", text: "What happens when you let AI draft your needs report — and then override it?" },
      { icon: "🧭", text: "Where does context matter more than data?" },
    ],
  },
  {
    emoji: "🧭",
    icon: Layers,
    title: "Discover",
    subtitle: "Research & Benchmarking Deep Dive",
    description: "Explore how AI accelerates research, competitive analysis, and trend-spotting across your domain.",
    prompts: [
      { icon: "⚡", text: "Can AI help you benchmark faster without losing nuance?" },
      { icon: "🎯", text: "What sources does AI miss that your expertise catches?" },
      { icon: "✅", text: "How do you validate AI-generated research?" },
    ],
  },
  {
    emoji: "✏️",
    icon: Target,
    title: "Design & Develop",
    subtitle: "Learning Experience Design Deep Dive",
    description: "Go deeper on designing and developing learning journeys, assessments, and experiences with AI as a co-designer.",
    prompts: [
      { icon: "🗺️", text: "What does a good AI-assisted learner journey look like?" },
      { icon: "⚠️", text: "Where does AI-generated assessment design fall short?" },
      { icon: "💡", text: "How do you keep the human touch in AI-designed experiences?" },
    ],
  },
  {
    emoji: "🚀",
    icon: Lightbulb,
    title: "Deploy & Iterate",
    subtitle: "Implementation & Improvement Deep Dive",
    description: "Tackle the real-world challenges of deploying AI-enhanced workflows — from pilot to scale — and refine them over time.",
    prompts: [
      { icon: "🧪", text: "What's the smallest viable way to test this in your team?" },
      { icon: "📊", text: "How do you measure whether AI actually improved the outcome?" },
      { icon: "🔁", text: "What feedback loops matter most?" },
    ],
  },
];

const DeepDive = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

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
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-3">
            A structured 60-minute session to go beyond the surface.
          </p>
          <p className="text-sm text-primary font-display font-medium text-center mb-10">
            One deep dive per 2-week cycle, rotating through the 4 topics.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="bg-sticky-yellow w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl">🎯</div>
              <h3 className="font-display font-bold mb-1">Frame</h3>
              <span className="inline-block px-2 py-0.5 rounded-full bg-sticky-yellow/50 text-xs font-display font-semibold text-foreground/60 mb-2">15 min</span>
              <p className="text-sm text-muted-foreground">Pick one workflow challenge. Define what "better" looks like for your context.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="bg-sticky-green w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl">🛠️</div>
              <h3 className="font-display font-bold mb-1">Build</h3>
              <span className="inline-block px-2 py-0.5 rounded-full bg-sticky-green/50 text-xs font-display font-semibold text-foreground/60 mb-2">30 min</span>
              <p className="text-sm text-muted-foreground">Craft prompts, test with AI, iterate on outputs. Work through the messy middle together.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="bg-sticky-blue w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl">💬</div>
              <h3 className="font-display font-bold mb-1">Debrief</h3>
              <span className="inline-block px-2 py-0.5 rounded-full bg-sticky-blue/50 text-xs font-display font-semibold text-foreground/60 mb-2">15 min</span>
              <p className="text-sm text-muted-foreground">Share what worked, what you overrode, and what you'd take back to your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Deep Dive */}
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-3">Example: A Define Deep Dive</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
            Here's what one actual session looked like — from framing to artifact.
          </p>

          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6">
            {/* Frame */}
            <div className="flex items-start gap-3">
              <div className="bg-sticky-yellow w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm">🎯</div>
              <div>
                <h4 className="font-display font-bold text-sm mb-1">Frame <span className="text-muted-foreground font-normal">— The challenge</span></h4>
                <p className="text-sm text-muted-foreground">"Our annual engagement survey has 2,000+ open-text responses. Can AI surface learning needs we're missing manually?"</p>
              </div>
            </div>

            {/* Build */}
            <div className="flex items-start gap-3">
              <div className="bg-sticky-green w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm">🛠️</div>
              <div>
                <h4 className="font-display font-bold text-sm mb-1">Build <span className="text-muted-foreground font-normal">— The prompt & output</span></h4>
                <div className="bg-muted/50 rounded-lg p-4 text-sm font-mono space-y-2">
                  <p className="text-foreground/70"><span className="text-primary font-semibold">Prompt:</span> "Analyze these 200 survey responses. Identify the top 5 learning needs, with supporting quotes and confidence levels."</p>
                  <p className="text-foreground/70"><span className="text-primary font-semibold">Output:</span> AI returned 5 themes — but ranked "time management" as #1 with high confidence.</p>
                </div>
              </div>
            </div>

            {/* Override Log */}
            <div className="flex items-start gap-3">
              <div className="bg-sticky-pink w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm">✍️</div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-sm mb-2">Debrief <span className="text-muted-foreground font-normal">— The Override Log</span></h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-muted/30 rounded-lg p-3 border border-border">
                    <p className="text-xs font-display font-semibold text-muted-foreground mb-1">🤖 AI suggested</p>
                    <p className="text-sm">"Time management" as #1 learning need</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 border border-border">
                    <p className="text-xs font-display font-semibold text-muted-foreground mb-1">✏️ My modification</p>
                    <p className="text-sm">Moved "stakeholder communication" to #1</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 border border-border">
                    <p className="text-xs font-display font-semibold text-muted-foreground mb-1">💡 Why I changed it</p>
                    <p className="text-sm">Org restructuring makes stakeholder skills urgent — AI couldn't know this</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                    <p className="text-xs font-display font-semibold text-primary mb-1">🧠 Human insight</p>
                    <p className="text-sm">Context about upcoming changes is where human judgment matters most</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Topics */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-3">Deep Dive Topics</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
            One topic per cycle, aligned to the 4 workflow focus areas. Click to explore the guiding questions.
          </p>

          <div className="space-y-4">
            {diveTopics.map((topic) => {
              const isExpanded = expandedTopic === topic.title;
              return (
                <div key={topic.title} className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200">
                  <button
                    onClick={() => setExpandedTopic(isExpanded ? null : topic.title)}
                    className="w-full flex items-center gap-4 p-5 sm:p-6 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-xl">
                      {topic.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <h3 className="font-display font-bold text-lg">{topic.title}</h3>
                        <span className="text-sm text-muted-foreground hidden sm:inline">— {topic.subtitle}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-1">
                        {topic.description}
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-border">
                      <p className="text-sm text-muted-foreground font-body leading-relaxed mt-4 mb-4">
                        {topic.description}
                      </p>
                      <p className="text-xs font-display font-semibold text-primary uppercase tracking-wide mb-3">Guiding Questions</p>
                      <div className="space-y-2.5">
                        {topic.prompts.map((prompt, i) => (
                          <div key={i} className="flex items-start gap-3 bg-muted/30 rounded-lg p-3">
                            <span className="text-base shrink-0">{prompt.icon}</span>
                            <p className="text-sm text-foreground/80">{prompt.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you leave with */}
      <section className="lab-section">
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
