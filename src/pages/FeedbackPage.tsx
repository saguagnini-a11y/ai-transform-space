import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Sparkles, AlertTriangle, TrendingDown, ShieldQuestion, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const questions = [
  {
    icon: Sparkles,
    number: "1",
    key: "excitement_trigger" as const,
    label: "Excitement trigger",
    question: 'What part of this concept makes you think:\n"This could actually work."',
  },
  {
    icon: TrendingDown,
    number: "2",
    key: "dropoff_moment" as const,
    label: "Drop-off moment",
    question: "At what moment will participants stop showing up?",
  },
  {
    icon: AlertTriangle,
    number: "3",
    key: "anxiety_spike" as const,
    label: "Anxiety spike",
    question: 'When will people think:\n"This is too much / too technical / too risky."',
  },
  {
    icon: ShieldQuestion,
    number: "4",
    key: "implementation_gap" as const,
    label: "Implementation gap",
    question: 'Where will people say:\n"Interesting… but I won\'t actually change my workflow."',
  },
];

const FeedbackPage = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasContent = Object.values(answers).some((v) => v.trim());
    if (!hasContent) {
      toast({ title: "Please answer at least one question", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("storyboard_feedback").insert({
      excitement_trigger: answers.excitement_trigger?.trim() || null,
      dropoff_moment: answers.dropoff_moment?.trim() || null,
      anxiety_spike: answers.anxiety_spike?.trim() || null,
      implementation_gap: answers.implementation_gap?.trim() || null,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      return;
    }

    toast({ title: "Thank you!", description: "Your feedback has been submitted." });
    setAnswers({});
  };

  return (
    <Layout>
      <section className="lab-section">
        <div className="container mx-auto max-w-3xl px-6">
          <Link to="/transformation-expo">
            <Button variant="ghost" size="sm" className="gap-2 mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Expo
            </Button>
          </Link>

          <div className="text-center mb-12">
            <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] mb-3 text-primary">
              Storyboard Review
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Provide Feedback on This Storyboard
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Help us stress-test this concept. Answer any or all of the questions below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((q) => (
              <div key={q.number} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 flex-shrink-0">
                    <q.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider text-primary mb-1">
                      {q.label}
                    </p>
                    <p className="text-sm font-display font-medium text-foreground whitespace-pre-line">
                      {q.question}
                    </p>
                  </div>
                </div>
                <Textarea
                  placeholder="Your thoughts…"
                  value={answers[q.key] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [q.key]: e.target.value }))
                  }
                  className="min-h-[100px]"
                  maxLength={2000}
                />
              </div>
            ))}

            <div className="flex justify-center pt-4">
              <Button type="submit" size="lg" className="gap-2" disabled={submitting}>
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {submitting ? "Submitting…" : "Submit Feedback"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default FeedbackPage;
