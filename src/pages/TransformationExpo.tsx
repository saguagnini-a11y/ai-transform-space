import Layout from "@/components/Layout";
import { Trophy, Star, Sparkles, Shield, Share2, MessageCircle, ArrowRight, RotateCcw, Users, Coffee, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const caféTables = [
  {
    number: "01",
    host: "Maria S.",
    title: "From Slow Insights to Real-Time Learning Intelligence",
    before: ["Manual survey analysis", "2-week turnaround", "Stakeholder frustration"],
    after: ["AI-powered thematic analysis", "2-hour turnaround", "Real-time insights"],
    prompt: '"Analyze these 200 survey responses and identify top learning needs with supporting evidence."',
    impact: "80% time reduction. Stakeholders now receive insights within days, not weeks.",
    conversation: "Where in your workflow do insights arrive too late to influence decisions?",
    override: { insight: "AI ranked 'time management' as #1 need. I moved 'stakeholder communication' to #1 because an upcoming org restructuring makes it urgent — context AI couldn't know." },
  },
  {
    number: "02",
    host: "James K.",
    title: "From Linear Design to Rapid Learning Journey Prototyping",
    before: ["Linear learning design", "Weeks of iteration", "Single perspective"],
    after: ["AI-assisted journey prototyping", "Rapid iteration", "Multi-persona testing"],
    prompt: '"Design a blended learning journey for new managers and simulate 3 different learner personas."',
    impact: "Can now produce and test 5 journey variants in the time it previously took to create 1.",
    conversation: "What would you test if prototyping a learning journey took hours instead of weeks?",
    override: { insight: "AI placed 360-feedback in week 2. I moved it to week 5 because psychological safety needs to be established first — something only experience teaches you." },
  },
  {
    number: "03",
    host: "Priya R.",
    title: "From Reactive Evaluation to Predictive Learning Insights",
    before: ["Manual evaluation", "Kirkpatrick surveys", "Delayed reporting"],
    after: ["Predictive analytics", "Real-time dashboards", "Proactive insights"],
    prompt: '"Analyze completion data and predict which learners are at risk of disengagement."',
    impact: "Early intervention increased completion rates by 35%. Evaluation shifted from reactive to proactive.",
    conversation: "What signals would help you intervene before a learner drops off?",
    override: { insight: "AI suggested generic risk labels. I changed to org-specific language because alignment with internal frameworks drives completion rates." },
  },
];
const awards = [
  { icon: Sparkles, name: "Boldest Experiment", winner: "James K.", desc: "Simulated 50 learner personas to stress-test a leadership program." },
  { icon: Star, name: "Best Override", winner: "Maria S.", desc: "Detected AI bias in needs prioritization using organizational context knowledge." },
  { icon: Shield, name: "Best Validation Discipline", winner: "Priya R.", desc: "Designed a 3-step validation protocol for AI-generated learning paths." },
  { icon: Share2, name: "Most Transferable Prompt", winner: "Tom L.", desc: "Needs-analysis prompt adopted by 4 other participants." },
];

const patterns = [
  "AI enables faster stakeholder communication through automated insight synthesis.",
  "Persona simulation reveals design flaws that traditional testing might take weeks to uncover.",
  "Override logging surfaces tacit knowledge that improves AI collaboration over time.",
  "Prompt chaining creates more reliable outputs than single complex prompts.",
  "Human judgment matters most at the framing, validation, and interpretation stages.",
];

const TransformationExpo = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="lab-section relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Title + Steps */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-display font-semibold uppercase tracking-[0.2em] mb-6">
                <Coffee className="w-4 h-4" />
                World Café Format
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-4">
                Transformation Expo
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 font-body">
                A rotating conversation experience where L&D professionals share how they redesigned workflows with AI.
              </p>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: Coffee, label: "Join a table", desc: "Choose", number: "1" },
                  { icon: MessageCircle, label: "Discuss", desc: "10 min", number: "2" },
                  { icon: RotateCcw, label: "Rotate", desc: "New table", number: "3" },
                  { icon: Lightbulb, label: "Synthesize", desc: "Share insights", number: "4" },
                ].map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary mx-auto mb-2">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-display font-semibold text-xs text-foreground">{step.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: How it works panel */}
            <div className="rounded-2xl p-6 md:p-8 border border-border bg-card">
              <h2 className="font-display font-bold text-lg mb-5 text-foreground">
                How this World Café works
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  "Each table host presents one real AI transformation story.",
                  "Participants gather in small groups to discuss the case and response prompt.",
                  "After each round, participants rotate to another table.",
                  "Insights are captured across tables to reveal shared transformation patterns.",
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-display font-bold mt-0.5 bg-secondary text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{bullet}</p>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl p-4 border border-border bg-sticky-pink/40">
                <p className="text-xs font-display font-semibold uppercase tracking-wider mb-1 text-primary">
                  Facilitator cue
                </p>
                <p className="text-sm italic text-muted-foreground">
                  Invite people to browse, not browse past. This page should make movement feel natural and conversation feel irresistible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Café Tables Section */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3 text-primary">
              Café tables
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              Explore the transformations table by table
            </h2>
            <Badge variant="secondary" className="font-display text-xs px-3 py-1">
              <RotateCcw className="w-3 h-3 mr-1" /> Rotate every 10 minutes
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caféTables.map((table) => (
              <div key={table.number} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col shadow-sm">
                {/* Header */}
                <div className="p-5 pb-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-display font-bold uppercase tracking-wider text-primary">
                      Table {table.number}
                    </span>
                    <span className="text-[10px] font-display px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                      Table host
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold bg-secondary text-primary">
                      {table.host.charAt(0)}
                    </div>
                    <span className="font-display font-semibold text-sm text-foreground">{table.host}</span>
                  </div>
                  <h3 className="font-display font-bold text-base leading-snug text-foreground">
                    {table.title}
                  </h3>
                </div>

                {/* Before / After */}
                <div className="p-5 space-y-3 flex-1">
                  <div className="rounded-xl p-3 bg-sticky-orange/40 border border-sticky-orange/60">
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-2 text-destructive">Before</p>
                    <ul className="space-y-1">
                      {table.before.map((item, i) => (
                        <li key={i} className="text-xs flex items-center gap-1.5 text-foreground/70">
                          <span className="w-1 h-1 rounded-full flex-shrink-0 bg-destructive/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl p-3 bg-sticky-green/40 border border-sticky-green/60">
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-2 text-primary">After (AI-redesigned)</p>
                    <ul className="space-y-1">
                      {table.after.map((item, i) => (
                        <li key={i} className="text-xs flex items-center gap-1.5 text-foreground/70">
                          <span className="w-1 h-1 rounded-full flex-shrink-0 bg-primary/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key prompt */}
                  <div className="prompt-box">
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-1.5 text-muted-foreground">Key prompt used</p>
                    <p className="text-xs font-mono italic text-foreground/80">{table.prompt}</p>
                  </div>

                  {/* Impact */}
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                    <p className="text-xs font-display font-medium text-foreground">{table.impact}</p>
                  </div>
                </div>

                {/* Conversation prompt */}
                <div className="p-4 mx-4 mb-4 rounded-xl bg-sticky-blue/50 border border-sticky-blue">
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                    <p className="text-sm font-display font-medium text-foreground">
                      💬 {table.conversation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards + Patterns Split Section */}
      <section className="lab-section">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Awards */}
            <div>
              <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3 text-primary">
                Sandbox awards
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-foreground">
                Celebrating the boldest experiments
              </h2>
              <div className="space-y-4">
                {awards.map((award) => (
                  <div key={award.name} className="rounded-xl p-5 border border-border bg-card flex items-start gap-4 shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-sticky-yellow">
                      <award.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm text-foreground">{award.name}</h3>
                      <p className="text-xs mb-1 text-primary">{award.winner}</p>
                      <p className="text-xs text-muted-foreground">{award.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patterns */}
            <div>
              <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3 text-primary">
                Emerging patterns
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-foreground">
                Insights surfacing across tables
              </h2>
              <div className="space-y-4">
                {patterns.map((pattern, i) => (
                  <div key={i} className="rounded-xl p-5 border border-border bg-card flex items-start gap-4 shadow-sm">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-display font-bold bg-sticky-blue text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{pattern}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default TransformationExpo;
