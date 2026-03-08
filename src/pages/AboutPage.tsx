import Layout from "@/components/Layout";
import { Beaker, Users, Target, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Layout>
      <section className="lab-section">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-display font-bold mb-6">About the Sandbox</h1>

          <div className="prose prose-sm max-w-none space-y-6">
            <p className="text-lg text-muted-foreground">
              The L&D Shakers AI Sandbox is a cohort-based practice space for Learning & Development professionals who want to redesign their workflows using AI.
            </p>

            <div className="bg-sticky-yellow p-6 rounded-sm my-8" style={{ transform: "rotate(-0.5deg)" }}>
              <p className="text-lg font-display font-bold text-center">
                The goal is not learning AI tools — it's experimenting with AI to redesign real work processes.
              </p>
            </div>

            <h2 className="text-2xl font-display font-bold mt-10 mb-4">What Makes This Different</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Beaker, title: "Studio, not classroom", desc: "This is an experimentation lab. You build, test, and iterate — not just consume content." },
                { icon: Users, title: "Cohort-powered", desc: "You learn with peers in pods of 3. Reflection and peer feedback accelerate insight." },
                { icon: Target, title: "Real workflows", desc: "Every experiment starts with a real workflow you want to redesign. No toy examples." },
                { icon: Lightbulb, title: "Human judgment first", desc: "The Override Log helps you practice critical thinking about AI outputs." },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-lg p-5">
                  <item.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold mt-10 mb-4">The Shift</h2>
            <p className="text-muted-foreground">
              This sandbox helps L&D professionals make the shift from <strong>content creator</strong> to <strong>strategist</strong>. From doing everything manually to knowing when and how AI can amplify your expertise.
            </p>

            <div className="bg-lab-surface p-6 rounded-lg mt-8 text-center">
              <p className="font-display font-semibold text-lg mb-4">Ready to start experimenting?</p>
              <Button variant="hero" asChild>
                <Link to="/experiments">Start Your First Experiment <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
