import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Sparkles, Shield, Share2, MessageCircle, ArrowRight, ArrowLeft, RotateCcw, Users, Coffee, Lightbulb, Download } from "lucide-react";
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
  badges: ["80% time saved", "Real learner impact"]
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
  badges: ["Novel prompt technique", "Transferable pattern"]
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
  badges: ["Real learner impact", "35% completion lift"]
}];


const awards = [
{ icon: Sparkles, name: "Boldest Experiment", winner: "James K.", initial: "J", desc: "Simulated 50 learner personas to stress-test a leadership program." },
{ icon: Star, name: "Best Override", winner: "Maria S.", initial: "M", desc: "Detected AI bias in needs prioritization using organizational context knowledge." },
{ icon: Shield, name: "Best Validation Discipline", winner: "Priya R.", initial: "P", desc: "Designed a 3-step validation protocol for AI-generated learning paths." },
{ icon: Share2, name: "Most Transferable Prompt", winner: "Tom L.", initial: "T", desc: "Needs-analysis prompt adopted by 4 other participants." }];


const patterns = [
{ text: "AI enables faster stakeholder communication through automated insight synthesis.", frequency: 8 },
{ text: "Persona simulation reveals design flaws that traditional testing might take weeks to uncover.", frequency: 6 },
{ text: "Override logging surfaces tacit knowledge that improves AI collaboration over time.", frequency: 5 },
{ text: "Prompt chaining creates more reliable outputs than single complex prompts.", frequency: 4 },
{ text: "Human judgment matters most at the framing, validation, and interpretation stages.", frequency: 9 }];


const TransformationExpo = () => {
  const maxFrequency = 12;

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
                Week 10 — Final Showcase
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-4">
                Transformation Expo
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 font-body">
                A rotating conversation experience where L&D professionals share how they redesigned workflows with AI.
              </p>

              {/* Cohort stats */}
              <div className="flex items-center gap-3 mb-10 flex-wrap">
                <Badge variant="secondary" className="font-display text-xs px-3 py-1.5">
                  80 experiments completed
                </Badge>
                <Badge variant="secondary" className="font-display text-xs px-3 py-1.5">
                  <Users className="w-3 h-3 mr-1" /> 20 participants
                </Badge>
                <Badge className="font-display text-xs px-3 py-1.5">
                  Top 20 showcased today
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                { icon: Coffee, label: "Join a table", desc: "Choose", number: "1" },
                { icon: MessageCircle, label: "Discuss", desc: "10 min", number: "2" },
                { icon: RotateCcw, label: "Rotate", desc: "New table", number: "3" },
                { icon: Lightbulb, label: "Synthesize", desc: "Surface patterns", number: "4" }].
                map((step, i) =>
                <div key={i} className="text-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary mx-auto mb-2">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-display font-semibold text-xs text-foreground">{step.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                6 rotations × 10 min = 60 min total
              </p>
            </div>

            {/* Right: How it works panel */}
            <div className="rounded-2xl p-6 md:p-8 border border-border bg-card">
              <h2 className="font-display font-bold text-lg mb-5 text-foreground">How the Transformation Expo works

              </h2>
              <ul className="space-y-4 mb-8">
                {[
                "Each table host presents one real AI transformation story.",
                "Participants gather in small groups to discuss the case and response prompt.",
                "After each round, participants rotate to another table.",
                "Insights are captured across tables to reveal shared transformation patterns."].
                map((bullet, i) =>
                <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-display font-bold mt-0.5 bg-secondary text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{bullet}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Café Tables Section */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3 text-primary">TRANSFORMATION TABLES

            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              Explore the transformations table by table
            </h2>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Badge variant="secondary" className="font-display text-xs px-3 py-1">
                <RotateCcw className="w-3 h-3 mr-1" /> Rotate every 10 minutes
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caféTables.map((table) =>
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
                  <h3 className="font-display font-bold text-base leading-snug text-foreground mb-3">
                    {table.title}
                  </h3>
                  {/* Selection criteria badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {table.badges.map((badge, i) =>
                  <span key={i} className="inline-flex items-center gap-1 text-[10px] font-display font-semibold px-2 py-0.5 rounded-full bg-sticky-green/50 text-foreground/70">
                        ✓ {badge}
                      </span>
                  )}
                  </div>
                </div>

                {/* Before / After */}
                <div className="p-5 space-y-3 flex-1">
                  <div className="rounded-xl p-3 bg-sticky-orange/40 border border-sticky-orange/60">
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-2 text-destructive">Before</p>
                    <ul className="space-y-1">
                      {table.before.map((item, i) =>
                    <li key={i} className="text-xs flex items-center gap-1.5 text-foreground/70">
                          <span className="w-1 h-1 rounded-full flex-shrink-0 bg-destructive/60" />
                          {item}
                        </li>
                    )}
                    </ul>
                  </div>
                  <div className="rounded-xl p-3 bg-sticky-green/40 border border-sticky-green/60">
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-2 text-primary">After (AI-redesigned)</p>
                    <ul className="space-y-1">
                      {table.after.map((item, i) =>
                    <li key={i} className="text-xs flex items-center gap-1.5 text-foreground/70">
                          <span className="w-1 h-1 rounded-full flex-shrink-0 bg-primary/60" />
                          {item}
                        </li>
                    )}
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

                  {/* Key Override */}
                  <div className="border-2 border-dashed border-primary/20 rounded-xl p-3">
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-1.5 text-primary">💡 Key Override</p>
                    <p className="text-xs italic text-foreground/80">{table.override.insight}</p>
                  </div>
                </div>

                {/* Conversation prompt — always visible */}
                <div className="p-4 mx-4 mb-4 rounded-xl bg-sticky-blue/50 border border-sticky-blue">
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                    <p className="text-xs font-display font-medium text-foreground">
                      💬 Discuss: {table.conversation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Emerging Patterns — THE CLIMAX */}
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3 text-primary">
              Meta-learning
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              What We're Learning Across All Experiments
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Patterns that emerged across 12 transformation stories and 75 experiments — ranked by how many teams experienced them.
            </p>
          </div>

          <div className="space-y-4">
            {patterns.
            sort((a, b) => b.frequency - a.frequency).
            map((pattern, i) =>
            <div key={i} className="rounded-xl p-5 border border-border bg-card shadow-sm">
                <div className="flex items-start gap-4 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-display font-bold bg-primary/10 text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm font-display font-medium text-foreground flex-1">{pattern.text}</p>
                </div>
                <div className="ml-12 flex items-center gap-3">
                  <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                    <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${pattern.frequency / maxFrequency * 100}%` }} />
                  
                  </div>
                  <span className="text-xs font-display font-semibold text-muted-foreground whitespace-nowrap">
                    {pattern.frequency}/{maxFrequency} teams
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sandbox Awards — Celebratory */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3 text-primary">
              🏆 Sandbox awards
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              Celebrating the Boldest Contributors
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Recognizing participants who pushed boundaries, challenged AI outputs, and shared the most transferable insights.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {awards.map((award) =>
            <div key={award.name} className="rounded-2xl p-6 border border-border bg-card shadow-sm text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-sticky-yellow mx-auto mb-4">
                  <award.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-1">{award.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-display font-bold bg-secondary text-primary">
                    {award.initial}
                  </div>
                  <span className="text-sm font-display font-semibold text-primary">{award.winner}</span>
                </div>
                <p className="text-xs text-muted-foreground">{award.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Facilitation Guide */}
      <section className="lab-section">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 mx-auto mb-4">
              <Coffee className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2 text-foreground">Want to facilitate your own Expo?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-5">
              Run this World Café format with your own team. Includes table setup, timing guide, prompt templates, and debrief facilitation notes.
            </p>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Download Expo Facilitation Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="border border-border rounded-lg p-8 text-center space-y-4 bg-card">
            <p className="text-sm font-display font-semibold text-primary">✓ You've explored the entire AI Sandbox structure</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Ready to Start Breaking the Sandbox?</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              You've seen the 10-week journey, the weekly workflow, experiment tracking, reflection pods, deep dives, and the transformation showcase. Now help us make this sandbox even better.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link to="/feedback">
                <Button className="gap-2">Provide Feedback on This Storyboard <ArrowRight className="w-4 h-4" /></Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Back to Overview</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>);

};

export default TransformationExpo;