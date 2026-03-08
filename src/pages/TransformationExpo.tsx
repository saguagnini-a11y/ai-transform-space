import Layout from "@/components/Layout";
import { Trophy, Star, Sparkles, Shield, Share2 } from "lucide-react";

const showcases = [
  {
    participant: "Maria S.",
    original: "Manual survey analysis → 2-week turnaround → stakeholder frustration",
    redesigned: "AI-powered thematic analysis → 2-hour turnaround → real-time insights",
    prompt: "Analyze these 200 survey responses and identify top learning needs with evidence...",
    impact: "80% time reduction. Stakeholders now get insights within days, not weeks.",
  },
  {
    participant: "James K.",
    original: "Linear learning design → weeks of iteration → single perspective",
    redesigned: "AI-assisted journey prototyping → rapid iteration → multiple persona testing",
    prompt: "Design a blended learning journey for new managers, simulating 3 learner personas...",
    impact: "Can now produce and test 5 journey variants in the time it took to create 1.",
  },
  {
    participant: "Priya R.",
    original: "Manual evaluation → Kirkpatrick surveys → delayed reporting",
    redesigned: "AI-driven sentiment analysis → real-time feedback loops → predictive insights",
    prompt: "Analyze post-training feedback and predict retention risks...",
    impact: "Shifted from reactive to predictive evaluation. Identified at-risk learners early.",
  },
];

const awards = [
  { icon: Sparkles, name: "Boldest Experiment", winner: "James K.", desc: "Simulated 50 learner personas to stress-test a leadership program" },
  { icon: Star, name: "Best Override", winner: "Maria S.", desc: "Caught AI bias in needs prioritization using org context knowledge" },
  { icon: Shield, name: "Best Validation Discipline", winner: "Priya R.", desc: "Created a 3-step validation protocol for AI-generated learning paths" },
  { icon: Share2, name: "Most Transferable Prompt", winner: "Tom L.", desc: "Needs analysis prompt adopted by 4 other participants" },
];

const patterns = [
  "AI enables real-time stakeholder communication through automated insight synthesis",
  "Persona simulation catches design flaws that user testing would take weeks to find",
  "Override logging surfaces tacit knowledge that improves AI collaboration over time",
  "Prompt chaining creates more reliable outputs than single complex prompts",
  "Human judgment is most critical at the problem framing and validation stages",
];

const TransformationExpo = () => {
  return (
    <Layout>
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-display font-bold mb-2">Transformation Expo</h1>
          <p className="text-muted-foreground mb-10">
            Showcasing how L&D professionals redesigned their workflows with AI
          </p>

          {/* Showcases */}
          <div className="space-y-6 mb-16">
            {showcases.map((s) => (
              <div key={s.participant} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display font-bold text-lg mb-4">{s.participant}</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-sticky-pink p-4 rounded-sm">
                    <p className="text-xs font-display font-semibold text-foreground/60 mb-1">Before</p>
                    <p className="text-sm">{s.original}</p>
                  </div>
                  <div className="bg-sticky-green p-4 rounded-sm">
                    <p className="text-xs font-display font-semibold text-foreground/60 mb-1">After (AI-redesigned)</p>
                    <p className="text-sm">{s.redesigned}</p>
                  </div>
                </div>
                <div className="prompt-box mb-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Key Prompt</p>
                  <p className="text-sm">{s.prompt}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">→</span>
                  <p className="text-sm font-medium">{s.impact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Awards */}
          <h2 className="text-2xl font-display font-bold mb-6 text-center">🏆 Sandbox Awards</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {awards.map((award) => (
              <div key={award.name} className="sticky-card bg-sticky-yellow" style={{ "--rotation": `${Math.random() * 2 - 1}deg` } as React.CSSProperties}>
                <award.icon className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-display font-bold text-sm mb-1">{award.name}</h3>
                <p className="text-xs text-foreground/70 mb-2">{award.winner}</p>
                <p className="text-xs">{award.desc}</p>
              </div>
            ))}
          </div>

          {/* Transformation Patterns */}
          <h2 className="text-2xl font-display font-bold mb-6 text-center">Transformation Patterns</h2>
          <div className="space-y-3">
            {patterns.map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
                <span className="text-primary font-display font-bold text-sm mt-0.5">{i + 1}</span>
                <p className="text-sm">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TransformationExpo;
