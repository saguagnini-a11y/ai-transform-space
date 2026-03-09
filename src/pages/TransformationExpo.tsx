import Layout from "@/components/Layout";
import { Trophy, Star, Sparkles, Shield, Share2, MessageCircle, ArrowRight, RotateCcw, Users, Coffee } from "lucide-react";
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
  },
  {
    number: "03",
    host: "Priya R.",
    title: "From Reactive Evaluation to Predictive Learning Insights",
    before: ["Manual evaluation", "Kirkpatrick surveys", "Delayed reporting"],
    after: ["AI-driven sentiment analysis", "Real-time feedback loops", "Predictive insights"],
    prompt: '"Analyze post-training feedback and predict retention risks."',
    impact: "Shifted from reactive evaluation to predictive learning insights and identified at-risk learners earlier.",
    conversation: "What early signals would you want to detect about learner success or failure?",
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
      {/* Hero Section — dark premium */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(220 30% 8%), hsl(230 25% 14%), hsl(220 30% 8%))" }}>
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, hsl(45 90% 55%), transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, hsl(280 60% 50%), transparent)" }} />

        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Title + Steps */}
            <div>
              <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(45 90% 65%)" }}>
                World Café Format
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4" style={{ color: "hsl(0 0% 96%)" }}>
                Transformation Expo
              </h1>
              <p className="text-lg md:text-xl mb-10" style={{ color: "hsl(220 15% 70%)" }}>
                A rotating conversation experience where L&D professionals share how they redesigned workflows with AI.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Coffee, label: "Join a table", desc: "Start with any host story that sparks your curiosity." },
                  { icon: MessageCircle, label: "Discuss the prompt", desc: "Explore what this transformation could mean in your own context." },
                  { icon: RotateCcw, label: "Rotate", desc: "Move to a new table every round and collect fresh ideas." },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(45 90% 55% / 0.15)" }}>
                      <step.icon className="w-5 h-5" style={{ color: "hsl(45 90% 65%)" }} />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm" style={{ color: "hsl(0 0% 92%)" }}>{step.label}</p>
                      <p className="text-sm" style={{ color: "hsl(220 15% 60%)" }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: How it works panel */}
            <div className="rounded-2xl p-6 md:p-8 border" style={{ background: "hsl(220 25% 12% / 0.8)", borderColor: "hsl(220 20% 22%)", backdropFilter: "blur(12px)" }}>
              <h2 className="font-display font-bold text-lg mb-5" style={{ color: "hsl(0 0% 92%)" }}>
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
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-display font-bold mt-0.5" style={{ background: "hsl(45 90% 55% / 0.2)", color: "hsl(45 90% 65%)" }}>
                      {i + 1}
                    </span>
                    <p className="text-sm" style={{ color: "hsl(220 15% 70%)" }}>{bullet}</p>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl p-4 border" style={{ background: "hsl(280 40% 20% / 0.3)", borderColor: "hsl(280 30% 30%)" }}>
                <p className="text-xs font-display font-semibold uppercase tracking-wider mb-1" style={{ color: "hsl(280 60% 70%)" }}>
                  Facilitator cue
                </p>
                <p className="text-sm italic" style={{ color: "hsl(220 15% 70%)" }}>
                  Invite people to browse, not browse past. This page should make movement feel natural and conversation feel irresistible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Café Tables Section */}
      <section className="relative" style={{ background: "linear-gradient(180deg, hsl(220 30% 8%), hsl(225 25% 11%))" }}>
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(45 90% 65%)" }}>
              Café tables
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ color: "hsl(0 0% 96%)" }}>
              Explore the transformations table by table
            </h2>
            <Badge className="border-0 font-display text-xs px-3 py-1" style={{ background: "hsl(45 90% 55% / 0.15)", color: "hsl(45 90% 65%)" }}>
              <RotateCcw className="w-3 h-3 mr-1" /> Rotate every 10 minutes
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caféTables.map((table) => (
              <div key={table.number} className="rounded-2xl border overflow-hidden flex flex-col" style={{ background: "hsl(220 25% 12%)", borderColor: "hsl(220 20% 20%)" }}>
                {/* Header */}
                <div className="p-5 pb-4 border-b" style={{ borderColor: "hsl(220 20% 20%)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-display font-bold uppercase tracking-wider" style={{ color: "hsl(45 90% 65%)" }}>
                      Table {table.number}
                    </span>
                    <span className="text-[10px] font-display px-2 py-0.5 rounded-full" style={{ background: "hsl(280 50% 40% / 0.3)", color: "hsl(280 60% 75%)" }}>
                      Table host
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold" style={{ background: "hsl(45 90% 55% / 0.2)", color: "hsl(45 90% 65%)" }}>
                      {table.host.charAt(0)}
                    </div>
                    <span className="font-display font-semibold text-sm" style={{ color: "hsl(0 0% 92%)" }}>{table.host}</span>
                  </div>
                  <h3 className="font-display font-bold text-base leading-snug" style={{ color: "hsl(0 0% 96%)" }}>
                    {table.title}
                  </h3>
                </div>

                {/* Before / After */}
                <div className="p-5 space-y-3 flex-1">
                  <div className="rounded-xl p-3" style={{ background: "hsl(0 50% 30% / 0.2)", border: "1px solid hsl(0 40% 30% / 0.3)" }}>
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-2" style={{ color: "hsl(0 60% 70%)" }}>Before</p>
                    <ul className="space-y-1">
                      {table.before.map((item, i) => (
                        <li key={i} className="text-xs flex items-center gap-1.5" style={{ color: "hsl(0 30% 75%)" }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "hsl(0 50% 60%)" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: "hsl(150 40% 25% / 0.2)", border: "1px solid hsl(150 30% 30% / 0.3)" }}>
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-2" style={{ color: "hsl(150 60% 65%)" }}>After (AI-redesigned)</p>
                    <ul className="space-y-1">
                      {table.after.map((item, i) => (
                        <li key={i} className="text-xs flex items-center gap-1.5" style={{ color: "hsl(150 30% 75%)" }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "hsl(150 50% 55%)" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key prompt */}
                  <div className="rounded-xl p-3 border" style={{ background: "hsl(220 25% 15%)", borderColor: "hsl(220 20% 22%)" }}>
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-1.5" style={{ color: "hsl(220 15% 55%)" }}>Key prompt used</p>
                    <p className="text-xs font-mono italic" style={{ color: "hsl(220 15% 75%)" }}>{table.prompt}</p>
                  </div>

                  {/* Impact */}
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(45 90% 65%)" }} />
                    <p className="text-xs font-display font-medium" style={{ color: "hsl(0 0% 85%)" }}>{table.impact}</p>
                  </div>
                </div>

                {/* Conversation prompt */}
                <div className="p-4 mx-4 mb-4 rounded-xl" style={{ background: "hsl(190 70% 30% / 0.2)", border: "1px solid hsl(190 50% 35% / 0.3)" }}>
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(190 80% 65%)" }} />
                    <p className="text-sm font-display font-medium" style={{ color: "hsl(190 70% 75%)" }}>
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
      <section className="relative" style={{ background: "linear-gradient(180deg, hsl(225 25% 11%), hsl(220 30% 8%))" }}>
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Awards */}
            <div>
              <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(45 90% 65%)" }}>
                Sandbox awards
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-8" style={{ color: "hsl(0 0% 96%)" }}>
                Celebrating the boldest experiments
              </h2>
              <div className="space-y-4">
                {awards.map((award) => (
                  <div key={award.name} className="rounded-xl p-5 border flex items-start gap-4" style={{ background: "hsl(220 25% 12%)", borderColor: "hsl(220 20% 20%)" }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(45 90% 55% / 0.2), hsl(280 50% 50% / 0.2))" }}>
                      <award.icon className="w-5 h-5" style={{ color: "hsl(45 90% 65%)" }} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm" style={{ color: "hsl(0 0% 92%)" }}>{award.name}</h3>
                      <p className="text-xs mb-1" style={{ color: "hsl(280 60% 70%)" }}>{award.winner}</p>
                      <p className="text-xs" style={{ color: "hsl(220 15% 60%)" }}>{award.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patterns */}
            <div>
              <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(190 80% 65%)" }}>
                Emerging patterns
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-8" style={{ color: "hsl(0 0% 96%)" }}>
                Insights surfacing across tables
              </h2>
              <div className="space-y-4">
                {patterns.map((pattern, i) => (
                  <div key={i} className="rounded-xl p-5 border flex items-start gap-4" style={{ background: "hsl(220 25% 12%)", borderColor: "hsl(220 20% 20%)" }}>
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-display font-bold" style={{ background: "hsl(190 70% 30% / 0.2)", color: "hsl(190 80% 65%)" }}>
                      {i + 1}
                    </span>
                    <p className="text-sm" style={{ color: "hsl(220 15% 70%)" }}>{pattern}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(230 30% 10%), hsl(280 30% 15%), hsl(230 30% 10%))" }}>
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at center, hsl(280 60% 40%), transparent 70%)" }} />
        <div className="container mx-auto max-w-3xl px-6 py-20 md:py-24 relative z-10 text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(45 90% 65%)" }}>
            Your turn
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-5" style={{ color: "hsl(0 0% 96%)" }}>
            What transformation will you test next?
          </h2>
          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto" style={{ color: "hsl(220 15% 65%)" }}>
            Before leaving the Expo, add one AI-enabled workflow experiment you want to test in your own L&D practice. Let your idea become the spark for the next conversation.
          </p>
          <div className="rounded-2xl p-6 md:p-8 border max-w-xl mx-auto" style={{ background: "hsl(220 25% 12% / 0.6)", borderColor: "hsl(45 90% 55% / 0.3)", backdropFilter: "blur(12px)" }}>
            <p className="text-xs font-display font-semibold uppercase tracking-wider mb-3" style={{ color: "hsl(45 90% 65%)" }}>
              Board prompt
            </p>
            <p className="text-lg md:text-xl font-display font-medium italic" style={{ color: "hsl(0 0% 90%)" }}>
              "One workflow I want to redesign with AI is…"
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TransformationExpo;
