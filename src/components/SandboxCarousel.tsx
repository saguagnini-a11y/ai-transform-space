import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Lightbulb, FlaskConical, Target, Users, Repeat } from "lucide-react";

const steps = [
  { icon: Lightbulb, title: "Guest Challenge", desc: "A guest sets a real L&D challenge connected to the sprint focus", color: "bg-sticky-yellow" },
  { icon: FlaskConical, title: "Sprint", desc: "Design and test a micro-case with AI in 45 minutes", color: "bg-sticky-green" },
  { icon: Target, title: "Tiny Experiment", desc: "Commit to one small AI experiment to run at work", color: "bg-sticky-blue" },
  { icon: Users, title: "Reflection Pod", desc: "Share artifacts and learnings with your peer trio", color: "bg-sticky-pink" },
  { icon: Repeat, title: "Override Log", desc: "Document where you overrode AI and why it mattered", color: "bg-accent" },
];

const SandboxCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visible = 3;

  const canPrev = startIndex > 0;
  const canNext = startIndex + visible < steps.length;

  const prev = useCallback(() => setStartIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setStartIndex((i) => Math.min(steps.length - visible, i + 1)), []);

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          disabled={!canPrev}
          className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous step"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="overflow-hidden flex-1">
          <div
            className="flex transition-transform duration-400 ease-in-out gap-4"
            style={{ transform: `translateX(-${startIndex * (100 / visible + 1.33)}%)` }}
          >
            {steps.map((item, i) => (
              <div
                key={item.title}
                className="shrink-0"
                style={{ width: `calc((100% - ${(visible - 1) * 16}px) / ${visible})` }}
              >
                <div
                  className={`sticky-card ${item.color} h-full`}
                  style={{ "--rotation": `${(i % 2 === 0 ? -0.5 : 0.7)}deg` } as React.CSSProperties}
                >
                  <div className="flex items-center gap-2 mb-1 text-xs font-display font-semibold text-foreground/50 uppercase tracking-wide">
                    Step {i + 1}
                  </div>
                  <item.icon className="w-8 h-8 text-foreground/70 mb-3" />
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          disabled={!canNext}
          className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next step"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStartIndex(Math.min(i, steps.length - visible))}
            className={`w-2 h-2 rounded-full transition-colors ${
              i >= startIndex && i < startIndex + visible ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SandboxCarousel;
