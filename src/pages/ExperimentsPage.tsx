import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Beaker, Share2, Save, ChevronDown, ArrowRight } from "lucide-react";

interface Experiment {
  id: string;
  title: string;
  workflowStep: string;
  problem: string;
  aiUsed: string;
  prompt: string;
  output: string;
  workflowChange: string;
  becamePossible: string;
  overrideLog?: {
    aiSuggestion: string;
    modification: string;
    whyChanged: string;
    humanInsight: string;
  };
  createdAt: string;
}

const workflowSteps = ["Define", "Discover", "Design", "Deploy", "Iterate"];

const sampleExperiments: Experiment[] = [
  {
    id: "1",
    title: "No-Code Diagnostic Skills Assessment",
    workflowStep: "Define",
    problem: "We had no quick way to test learners' baseline skills before designing a programme",
    aiUsed: "ChatGPT-4",
    prompt: "Create a 10-question diagnostic quiz for mid-level managers to assess their baseline competency in giving feedback. Include scenario-based questions, a scoring rubric, and recommendations for learning pathways based on score ranges.",
    output: "A complete self-scoring diagnostic with scenario questions, a 3-tier rubric (Novice / Developing / Proficient), and suggested learning tracks per tier",
    workflowChange: "We can now build and deploy a baseline diagnostic in under an hour instead of commissioning a 3-week assessment design project",
    becamePossible: "Every programme can start with a data-informed learner profile, so we design for actual gaps, not assumed ones",
    overrideLog: {
      aiSuggestion: "AI proposed generic competency labels like 'Communication Skills'",
      modification: "Replaced with organisation-specific language: 'Constructive Challenge Conversations'",
      whyChanged: "The org uses specific internal competency frameworks that learners recognise",
      humanInsight: "Alignment with internal language drives higher learner buy-in and completion rates",
    },
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Learner Reaction Simulation",
    workflowStep: "Design",
    problem: "Learning designers couldn't anticipate how different learner personas would react to a new programme before launch",
    aiUsed: "Claude",
    prompt: "Act as 4 distinct learner personas (a sceptical senior manager, an eager new hire, a time-poor working parent, and a neurodiverse learner). For each persona, simulate their reaction to this blended learning journey: [journey outline]. Flag potential drop-off points, emotional friction, and engagement peaks.",
    output: "Detailed persona-by-persona walkthrough with predicted engagement curves, friction moments, and suggested design tweaks per persona",
    workflowChange: "We now 'stress-test' every learning journey against diverse personas before pilot, catching design flaws early",
    becamePossible: "We can empathy-test designs at scale without running expensive focus groups, making inclusive design the default",
    overrideLog: {
      aiSuggestion: "AI generated uniformly positive reactions for all four personas — each 'loved' the blended format with minor scheduling concerns",
      modification: "Rewrote the sceptical senior manager and time-poor parent personas to show genuine resistance: the manager questioned ROI evidence, the parent flagged impossible live-session times",
      whyChanged: "AI defaults to agreeable, conflict-free simulations. Real learners push back hard — and if we don't design for that resistance, we discover it at launch when it's too late to fix",
      humanInsight: "The whole point of persona simulation is to surface uncomfortable truths. If AI smooths away the friction, are we just building an echo chamber that validates our own designs? Where exactly does 'helpful simulation' end and 'false reassurance' begin?",
    },
    createdAt: "2024-01-22",
  },
  {
    id: "3",
    title: "Auto-Generated Practice Scenarios",
    workflowStep: "Deploy",
    problem: "Creating realistic practice scenarios for soft-skills training was slow and repetitive",
    aiUsed: "ChatGPT-4",
    prompt: "Generate 6 realistic workplace scenarios for practising difficult conversations, graded from low to high complexity. Each scenario should include context, stakeholder dynamics, and a success criteria rubric.",
    output: "Six branching scenarios with complexity ratings, character briefs, and evaluation rubrics ready for an LMS",
    workflowChange: "Scenario generation dropped from 2 days to 20 minutes, freeing designers to focus on facilitation design",
    becamePossible: "Every cohort can receive contextualised, role-specific practice scenarios instead of one-size-fits-all examples",
    overrideLog: {
      aiSuggestion: "AI set all scenarios in a generic 'tech company' context",
      modification: "Rewrote contexts to match the client's healthcare environment",
      whyChanged: "Learners disengage when scenarios feel unrealistic to their sector",
      humanInsight: "Domain-specific authenticity is what makes practice transfer to the real job",
    },
    createdAt: "2024-02-05",
  },
];

const ExperimentsPage = () => {
  const [experiments, setExperiments] = useState<Experiment[]>(sampleExperiments);
  const [showBuilder, setShowBuilder] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newExp, setNewExp] = useState<Partial<Experiment>>({
    overrideLog: { aiSuggestion: "", modification: "", whyChanged: "", humanInsight: "" },
  });

  const builderSteps = [
    "Choose Workflow Step",
    "Define the Problem",
    "Run Micro-Case",
    "Capture Output & Reflection",
    "Extract Pattern",
  ];

  const handleSave = () => {
    const experiment: Experiment = {
      id: Date.now().toString(),
      title: newExp.title || "Untitled Experiment",
      workflowStep: newExp.workflowStep || "Define",
      problem: newExp.problem || "",
      aiUsed: newExp.aiUsed || "",
      prompt: newExp.prompt || "",
      output: newExp.output || "",
      workflowChange: newExp.workflowChange || "",
      becamePossible: newExp.becamePossible || "",
      overrideLog: newExp.overrideLog,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setExperiments([experiment, ...experiments]);
    setShowBuilder(false);
    setCurrentStep(0);
    setNewExp({ overrideLog: { aiSuggestion: "", modification: "", whyChanged: "", humanInsight: "" } });
  };

  return (
    <Layout>
      <section className="lab-section">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Tiny Experiments</h1>
              <p className="text-muted-foreground mt-1">Your personal AI workflow redesign workspace</p>
            </div>
            <Button variant="hero" onClick={() => setShowBuilder(true)}>
              <Plus className="w-4 h-4 mr-1" /> New Experiment
            </Button>
          </div>

          {/* Experiment Builder Wizard */}
          {showBuilder && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
              <h2 className="font-display font-bold text-xl mb-6">Experiment Builder</h2>

              {/* Blank template preview */}
              <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6 space-y-2">
                <p className="text-xs font-display font-semibold text-muted-foreground mb-3">You'll be filling in:</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground font-medium shrink-0">Prompt:</span>
                    <span className="text-muted-foreground/60 italic">What you asked AI to help you redesign</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground font-medium shrink-0">Output:</span>
                    <span className="text-muted-foreground/60 italic">What AI generated for you</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground font-medium shrink-0">Workflow Change:</span>
                    <span className="text-muted-foreground/60 italic">How you implemented this in real work</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sticky-yellow font-medium shrink-0">✨ What became possible:</span>
                    <span className="text-muted-foreground/60 italic">The transformation this enabled</span>
                  </div>
                  <div className="flex gap-2 sm:col-span-2">
                    <span className="text-primary font-medium shrink-0">🔄 Override Log:</span>
                    <span className="text-muted-foreground/60 italic">Where you improved on AI's suggestions</span>
                  </div>
                </div>
              </div>

              {/* Steps indicator */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {builderSteps.map((step, i) => (
                  <button
                    key={step}
                    onClick={() => setCurrentStep(i)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-display font-medium whitespace-nowrap transition-colors ${
                      i === currentStep
                        ? "bg-primary text-primary-foreground"
                        : i < currentStep
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs">
                      {i + 1}
                    </span>
                    {step}
                  </button>
                ))}
              </div>

              {/* Step content */}
              <div className="space-y-4">
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Experiment Title</label>
                      <input
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                        placeholder="e.g., Automated Needs Analysis"
                        value={newExp.title || ""}
                        onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Workflow Step</label>
                      <div className="flex flex-wrap gap-2">
                        {workflowSteps.map((step) => (
                          <button
                            key={step}
                            onClick={() => setNewExp({ ...newExp, workflowStep: step })}
                            className={`px-4 py-2 rounded-md text-sm font-display font-medium border transition-colors ${
                              newExp.workflowStep === step
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {step}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">What problem are you trying to solve?</label>
                      <textarea
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm min-h-[100px]"
                        placeholder="Describe the current pain point in your workflow..."
                        value={newExp.problem || ""}
                        onChange={(e) => setNewExp({ ...newExp, problem: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">What AI tool did you use?</label>
                      <input
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                        placeholder="e.g., ChatGPT, Claude, Gemini..."
                        value={newExp.aiUsed || ""}
                        onChange={(e) => setNewExp({ ...newExp, aiUsed: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Prompt Used</label>
                      <div className="prompt-box">
                        <textarea
                          className="w-full bg-transparent border-0 outline-none text-sm min-h-[120px] resize-none"
                          placeholder="Paste the prompt you used..."
                          value={newExp.prompt || ""}
                          onChange={(e) => setNewExp({ ...newExp, prompt: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Output Produced</label>
                      <textarea
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm min-h-[80px]"
                        placeholder="What did the AI produce?"
                        value={newExp.output || ""}
                        onChange={(e) => setNewExp({ ...newExp, output: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">What changed in your workflow?</label>
                      <textarea
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm min-h-[80px]"
                        placeholder="How did this change the way you work?"
                        value={newExp.workflowChange || ""}
                        onChange={(e) => setNewExp({ ...newExp, workflowChange: e.target.value })}
                      />
                    </div>
                    <div className="bg-sticky-yellow p-4 rounded-sm">
                      <label className="text-sm font-display font-semibold mb-1 block">
                        ✨ What became possible because of AI?
                      </label>
                      <textarea
                        className="w-full bg-transparent border-0 outline-none text-sm min-h-[60px] resize-none"
                        placeholder="e.g., I can now analyze learning feedback at scale..."
                        value={newExp.becamePossible || ""}
                        onChange={(e) => setNewExp({ ...newExp, becamePossible: e.target.value })}
                      />
                    </div>

                    {/* Override Log */}
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-5 bg-card">
                      <h3 className="font-display font-semibold text-base mb-4 flex items-center gap-2">
                        🔄 Override Log
                        <span className="text-xs text-muted-foreground font-body font-normal">— Practice human judgment</span>
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">AI Suggestion</label>
                          <input
                            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                            placeholder="What did AI suggest?"
                            value={newExp.overrideLog?.aiSuggestion || ""}
                            onChange={(e) =>
                              setNewExp({ ...newExp, overrideLog: { ...newExp.overrideLog!, aiSuggestion: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">My Modification</label>
                          <input
                            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                            placeholder="What did you change?"
                            value={newExp.overrideLog?.modification || ""}
                            onChange={(e) =>
                              setNewExp({ ...newExp, overrideLog: { ...newExp.overrideLog!, modification: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Why I Changed It</label>
                          <input
                            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                            placeholder="What was your reasoning?"
                            value={newExp.overrideLog?.whyChanged || ""}
                            onChange={(e) =>
                              setNewExp({ ...newExp, overrideLog: { ...newExp.overrideLog!, whyChanged: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Human Insight</label>
                          <input
                            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                            placeholder="What uniquely human knowledge did you apply?"
                            value={newExp.overrideLog?.humanInsight || ""}
                            onChange={(e) =>
                              setNewExp({ ...newExp, overrideLog: { ...newExp.overrideLog!, humanInsight: e.target.value } })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="bg-lab-surface p-6 rounded-lg text-center">
                      <Beaker className="w-10 h-10 text-primary mx-auto mb-3" />
                      <h3 className="font-display font-semibold text-lg mb-2">Experiment Summary</h3>
                      <p className="text-sm text-muted-foreground mb-4">Review your experiment before saving</p>
                      <div className="text-left space-y-3 max-w-md mx-auto">
                        {newExp.title && <p><span className="font-medium">Title:</span> {newExp.title}</p>}
                        {newExp.workflowStep && <p><span className="font-medium">Step:</span> {newExp.workflowStep}</p>}
                        {newExp.problem && <p><span className="font-medium">Problem:</span> {newExp.problem}</p>}
                        {newExp.becamePossible && (
                          <div className="bg-sticky-yellow p-3 rounded-sm text-sm">
                            <span className="font-medium">✨ New capability:</span> {newExp.becamePossible}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentStep === 0) setShowBuilder(false);
                    else setCurrentStep(currentStep - 1);
                  }}
                >
                  {currentStep === 0 ? "Cancel" : "Back"}
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-1" /> Save Experiment
                    </Button>
                    <Button onClick={handleSave}>
                      <Share2 className="w-4 h-4 mr-1" /> Share with Cohort
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section intro */}
          <div className="flex items-start gap-3 bg-accent/30 border border-accent rounded-lg p-4 mb-6">
            <span className="text-lg shrink-0">💡</span>
            <p className="text-sm font-body text-foreground/80">
              Each experiment includes an <span className="font-display font-semibold text-primary">Override Log</span> where you document what you changed from AI's suggestions — and why. This is where the real learning happens: seeing the boundary between AI capability and human judgment.
            </p>
          </div>

          {/* Experiment Cards */}
          <div className="space-y-4">
            {experiments.map((exp) => (
              <div key={exp.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  className="w-full p-5 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-1 rounded text-xs font-display font-medium bg-primary/10 text-primary">
                      {exp.workflowStep}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">{exp.problem}</p>
                    </div>
                    {exp.overrideLog && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-display font-semibold flex items-center gap-1 shrink-0">
                        🔄 Override logged
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedId === exp.id ? "rotate-180" : ""}`} />
                </button>

                {expandedId === exp.id && (
                  <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                    <div className="prompt-box">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Prompt</p>
                      <p className="text-sm">{exp.prompt}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Output</p>
                      <p className="text-sm">{exp.output}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Workflow Change</p>
                      <p className="text-sm">{exp.workflowChange}</p>
                    </div>
                    <div className="bg-sticky-yellow p-3 rounded-sm">
                      <p className="text-xs font-medium mb-1">✨ What became possible</p>
                      <p className="text-sm font-medium">
                        {exp.becamePossible || <span className="italic text-muted-foreground font-normal">Not yet captured — what can you do now that was impossible before?</span>}
                      </p>
                    </div>
                    {exp.overrideLog && (
                      <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 space-y-2">
                        <p className="text-xs font-display font-semibold text-primary">🔄 Override Log</p>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div><span className="text-muted-foreground">AI suggested:</span> {exp.overrideLog.aiSuggestion}</div>
                          <div><span className="text-muted-foreground">I changed:</span> {exp.overrideLog.modification}</div>
                          <div><span className="text-muted-foreground">Because:</span> {exp.overrideLog.whyChanged}</div>
                          <div><span className="text-muted-foreground">Insight:</span> {exp.overrideLog.humanInsight}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ExperimentsPage;
