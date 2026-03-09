import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Sparkles, AlertTriangle, TrendingDown, ShieldQuestion } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const questions = [
  {
    icon: Sparkles,
    number: "1",
    label: "Excitement trigger",
    question: 'What part of this concept makes you think:\n"This could actually work."',
  },
  {
    icon: TrendingDown,
    number: "2",
    label: "Drop-off moment",
    question: "At what moment will participants stop showing up?",
  },
  {
    icon: AlertTriangle,
    number: "3",
    label: "Anxiety spike",
    question: 'When will people think:\n"This is too much / too technical / too risky."',
  },
  {
    icon: ShieldQuestion,
    number: "4",
    label: "Implementation gap",
    question: 'Where will people say:\n"Interesting… but I won\'t actually change my workflow."',
  },
];

const FeedbackPage = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you!",
      description: "Your feedback has been submitted.",
    });
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
              <div
                key={q.number}
                className="rounded-2xl border border-border bg-card p-6"
              >
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
                  value={answers[q.number] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [q.number]: e.target.value }))
                  }
                  className="min-h-[100px]"
                />
              </div>
            ))}

            <div className="flex justify-center pt-4">
              <Button type="submit" size="lg" className="gap-2">
                <Send className="w-4 h-4" /> Submit Feedback
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default FeedbackPage;
