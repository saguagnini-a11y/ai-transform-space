import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Beaker, ArrowRight, Lightbulb, Users, Trophy, Repeat, FlaskConical, Target } from "lucide-react";
import Layout from "@/components/Layout";

const journeyWeeks = [
  { week: "1", label: "Guest + Sprint", phase: "Define", color: "bg-sticky-yellow" },
  { week: "2", label: "Experiment + Reflect", phase: "", color: "bg-sticky-green" },
  { week: "3", label: "Guest + Sprint", phase: "Discover", color: "bg-sticky-yellow" },
  { week: "4", label: "Experiment + Reflect", phase: "", color: "bg-sticky-green" },
  { week: "5", label: "Guest + Sprint", phase: "Design & Develop", color: "bg-sticky-yellow" },
  { week: "6", label: "Experiment + Reflect", phase: "", color: "bg-sticky-green" },
  { week: "7", label: "Guest + Sprint", phase: "Deploy & Iterate", color: "bg-sticky-yellow" },
  { week: "8", label: "Experiment + Reflect", phase: "", color: "bg-sticky-green" },
  { week: "9", label: "Workflow Deep Dive & Peer Café", phase: "", color: "bg-sticky-blue" },
  { week: "10", label: "Transformation Expo", phase: "World Café", color: "bg-sticky-pink" },
];

const outcomes = [
  "Using AI to analyse learning data faster",
  "Using AI agents to stress-test learning experiences",
  "Using AI to anticipate capability gaps",
  "Prototyping learning journeys in minutes",
  "Simulating learner personas at scale",
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="lab-section relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-display font-medium mb-8">
            <Beaker className="w-4 h-4" />
            Cohort-based experimentation lab
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
            AI Sandbox for<br />
            <span className="text-primary">L&D Shakers</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 font-body">
            A hands-on studio where learning designers experiment with AI to redesign real work.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl mx-auto mb-10 font-body italic">
            Not another course. A practice space for building the future of learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/experiments">Explore the Sandbox <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/experiments">Explore Experiments</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core question */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="bg-sticky-yellow p-8 rounded-sm shadow-sm inline-block" style={{ transform: "rotate(-1deg)" }}>
            <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              "What can we do now that we couldn't do before?"
            </p>
          </div>
          <p className="mt-8 text-muted-foreground max-w-xl mx-auto">
            This is the guiding question of the sandbox. Every experiment, every reflection, every workflow redesign circles back to this.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="lab-section">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-display font-bold text-center mb-12">How the Sandbox Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FlaskConical, title: "Experiment", desc: "Run micro-cases with AI on real workflows", color: "bg-sticky-yellow" },
              { icon: Users, title: "Reflect", desc: "Share artifacts and override logs with peers", color: "bg-sticky-green" },
              { icon: Target, title: "Ship", desc: "Test minimum viable experiments at work", color: "bg-sticky-blue" },
              { icon: Repeat, title: "Pattern", desc: "Extract reusable AI collaboration patterns", color: "bg-sticky-pink" },
            ].map((item) => (
              <div key={item.title} className={`sticky-card ${item.color}`} style={{ "--rotation": `${Math.random() * 2 - 1}deg` } as React.CSSProperties}>
                <item.icon className="w-8 h-8 text-foreground/70 mb-3" />
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Sandbox Principles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Imperfect thinking is welcome",
              "Experimentation is encouraged",
              "Process thinking beats tool mastery",
              "Learning happens through building and sharing",
            ].map((principle) => (
              <div key={principle} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
                <Lightbulb className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm font-medium">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-center mb-4">The 10-Week Journey</h2>
          <p className="text-center text-muted-foreground mb-12">Every 2 weeks: Sprint → Experiment → Reflect → Pattern</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {journeyWeeks.map((w) => (
              <div key={w.week} className={`sticky-card ${w.color} text-center`} style={{ "--rotation": `${Math.random() * 3 - 1.5}deg` } as React.CSSProperties}>
                <div className="text-xs font-display font-semibold text-foreground/50 mb-1">Week {w.week}</div>
                <div className="text-sm font-display font-semibold">{w.label}</div>
                {w.phase && <div className="text-xs text-foreground/60 mt-1">{w.phase}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Promise */}
      <section className="lab-section bg-lab-surface">
        <div className="container mx-auto max-w-3xl text-center">
          <Trophy className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-4">The Promise</h2>
          <p className="text-lg text-muted-foreground mb-8">
            At the end of 10 weeks, participants should say:
          </p>
          <div className="bg-sticky-orange p-6 rounded-sm shadow-sm inline-block mb-8" style={{ transform: "rotate(0.5deg)" }}>
            <p className="text-xl font-display font-bold">
              "Thanks to AI, I am now doing something I had never done before."
            </p>
          </div>
          <div className="space-y-3 text-left max-w-md mx-auto">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex items-start gap-3">
                <span className="text-primary mt-1">→</span>
                <span className="text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lab-section">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Experiment?</h2>
          <p className="text-muted-foreground mb-8">
            Start redesigning your L&D workflows with AI today.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/experiments">Start Your First Experiment <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
