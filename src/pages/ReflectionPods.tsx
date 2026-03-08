import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, HelpCircle } from "lucide-react";

const pods = [
  {
    id: "1",
    name: "Pod Alpha",
    members: ["Maria S.", "James K.", "Priya R."],
    discussions: [
      {
        author: "Maria S.",
        prompt: "What did you ship since the last session?",
        content: "I tested an AI-powered needs analysis with our Q1 survey data. The prompt identified 3 themes I hadn't seen manually.",
        artifact: "Prompt: 'Analyze these survey responses for hidden learning needs...'\nOutput: 3 themes with supporting evidence",
        overrideLog: {
          aiSuggestion: "AI ranked 'time management' as #1 need",
          override: "Moved 'stakeholder communication' to #1",
          uniquelyMine: "Understanding of org restructuring context",
        },
        reactions: { likes: 2, questions: 1 },
        comments: ["Great insight about the org context! — James"],
      },
    ],
  },
  {
    id: "2",
    name: "Pod Beta",
    members: ["Tom L.", "Sarah W.", "Alex M."],
    discussions: [
      {
        author: "Tom L.",
        prompt: "Show the artifact (prompt + output)",
        content: "Used Claude to prototype a leadership development journey. Got a full 8-week plan in 10 minutes.",
        artifact: "Prompt: 'Design an 8-week leadership journey for mid-level managers...'\nOutput: Complete journey with weekly themes, activities, and assessments",
        overrideLog: {
          aiSuggestion: "AI included a 360-feedback module in week 2",
          override: "Moved to week 5 after trust-building activities",
          uniquelyMine: "Knowing that 360 feedback needs psychological safety first",
        },
        reactions: { likes: 3, questions: 0 },
        comments: [],
      },
    ],
  },
];

const ReflectionPods = () => {
  return (
    <Layout>
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-display font-bold mb-2">Reflection Pods</h1>
          <p className="text-muted-foreground mb-8">
            Groups of 3. Share artifacts, practice override logging, surface human expertise.
          </p>

          <div className="space-y-8">
            {pods.map((pod) => (
              <div key={pod.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-bold text-lg">{pod.name}</h2>
                    <p className="text-sm text-muted-foreground">{pod.members.join(" · ")}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-display font-medium">
                    {pod.members.length} members
                  </span>
                </div>

                {pod.discussions.map((disc, i) => (
                  <div key={i} className="p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-display font-bold text-primary">
                        {disc.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">{disc.prompt}</p>
                        <p className="text-sm font-medium mb-1">{disc.author}</p>
                        <p className="text-sm">{disc.content}</p>
                      </div>
                    </div>

                    <div className="prompt-box ml-11">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Artifact</p>
                      <p className="text-sm whitespace-pre-line">{disc.artifact}</p>
                    </div>

                    <div className="ml-11 border-2 border-dashed border-primary/20 rounded-lg p-4 space-y-2">
                      <p className="text-xs font-display font-semibold text-primary">🔄 Override Log</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">AI suggested:</span> {disc.overrideLog.aiSuggestion}</p>
                        <p><span className="text-muted-foreground">I overrode:</span> {disc.overrideLog.override}</p>
                        <p><span className="text-muted-foreground">What's uniquely mine:</span> {disc.overrideLog.uniquelyMine}</p>
                      </div>
                    </div>

                    <div className="ml-11 flex items-center gap-4">
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" /> {disc.reactions.likes}
                      </button>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <HelpCircle className="w-3.5 h-3.5" /> {disc.reactions.questions}
                      </button>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" /> Comment
                      </button>
                    </div>

                    {disc.comments.length > 0 && (
                      <div className="ml-11 space-y-2">
                        {disc.comments.map((c, ci) => (
                          <div key={ci} className="bg-muted p-3 rounded-md text-sm">{c}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReflectionPods;
