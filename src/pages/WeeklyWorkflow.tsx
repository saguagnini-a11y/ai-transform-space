import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const workflows = [
  { id: "needs", name: "Needs Analysis", desc: "Identify learning gaps and priorities", steps: ["Gather data", "Analyze surveys", "Interview stakeholders", "Prioritize needs", "Report findings"] },
  { id: "design", name: "Learning Design", desc: "Design learning experiences", steps: ["Define objectives", "Map learner journey", "Select modalities", "Create assessments", "Peer review"] },
  { id: "content", name: "Content Development", desc: "Create and curate content", steps: ["Research topics", "Write content", "Create visuals", "Review & iterate", "Publish"] },
  { id: "eval", name: "Evaluation", desc: "Measure learning impact", steps: ["Define metrics", "Collect data", "Analyze results", "Generate insights", "Share recommendations"] },
  { id: "stakeholder", name: "Stakeholder Communication", desc: "Align with business leaders", steps: ["Map stakeholders", "Craft messaging", "Present data", "Get buy-in", "Follow up"] },
];

const WeeklyWorkflow = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [showSprint, setShowSprint] = useState(false);
  const [sprintStep, setSprintStep] = useState(0);

  const selected = workflows.find((w) => w.id === selectedWorkflow);

  const sprintSteps = [
    { label: "Define the Challenge", placeholder: "What workflow challenge do you want to tackle?" },
    { label: "Write a Prompt", placeholder: "Write the prompt you'll use to test this with AI..." },
    { label: "Test with AI", placeholder: "Paste the AI output here..." },
    { label: "Capture Output", placeholder: "What was the result? What worked, what didn't?" },
    { label: "Write a Reflection", placeholder: "What did you learn? What would you do differently?" },
  ];

  return (
    <Layout>
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-display font-bold mb-2">Weekly Workflow</h1>
          <p className="text-muted-foreground mb-8">Identify and redesign your L&D workflow steps with AI</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {workflows.map((wf) => (
              <button
                key={wf.id}
                onClick={() => { setSelectedWorkflow(wf.id); setShowSprint(false); }}
                className={`text-left p-5 rounded-lg border-2 transition-all ${
                  selectedWorkflow === wf.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 bg-card"
                }`}
              >
                <h3 className="font-display font-semibold mb-1">{wf.name}</h3>
                <p className="text-sm text-muted-foreground">{wf.desc}</p>
              </button>
            ))}
          </div>

          {selected && !showSprint && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display font-bold text-xl mb-4">{selected.name} — Current Process</h2>
              <div className="space-y-0">
                {selected.steps.map((step, i) => (
                  <div key={i} className="experiment-step">
                    <div className="ml-4">
                      <p className="text-sm font-medium">{step}</p>
                      <p className="text-xs text-muted-foreground mt-1">Could AI augment this step?</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="hero" className="mt-6" onClick={() => { setShowSprint(true); setSprintStep(0); }}>
                <Zap className="w-4 h-4 mr-1" /> Run a Micro-Case Sprint
              </Button>
            </div>
          )}

          {showSprint && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display font-bold text-xl mb-6">⚡ Micro-Case Sprint</h2>
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {sprintSteps.map((s, i) => (
                  <div
                    key={s.label}
                    className={`px-3 py-1.5 rounded-full text-xs font-display font-medium whitespace-nowrap ${
                      i === sprintStep ? "bg-primary text-primary-foreground" : i < sprintStep ? "bg-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{sprintSteps[sprintStep].label}</label>
                <textarea
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm min-h-[120px]"
                  placeholder={sprintSteps[sprintStep].placeholder}
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => sprintStep > 0 ? setSprintStep(sprintStep - 1) : setShowSprint(false)}>
                  Back
                </Button>
                {sprintStep < sprintSteps.length - 1 ? (
                  <Button onClick={() => setSprintStep(sprintStep + 1)}>
                    Next <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button variant="hero">Save Sprint</Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WeeklyWorkflow;
