import { useState } from "react";
import { ZoneShell } from "../components/ZoneShell";

interface Zone4Props {
  initialProblem: string; // seeded from Zone 2
  initialBecause: string; // seeded from the final why
  onAdvance: (problem: string, because: string) => void;
}

/* The game assembles the draft problem frame from Zones 2 and 3.
   Both fields stay editable — this is the player's map, not the game's. */
export function Zone4Map({ initialProblem, initialBecause, onAdvance }: Zone4Props) {
  const [problem, setProblem] = useState(initialProblem);
  const [because, setBecause] = useState(initialBecause);

  return (
    <ZoneShell
      zone={4}
      prompt="Here is your problem, assembled from your own words. Sharpen it. Edit anything that reads wrong."
      advanceLabel="This is the terrain"
      canAdvance={true}
      onAdvance={() => onAdvance(problem.trim(), because.trim())}
    >
      <div className="space-y-6">
        <div>
          <label className="font-mono text-amber text-sm block mb-2">The problem is:</label>
          <textarea
            className="field-input min-h-[100px] resize-y"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>
        <div>
          <label className="font-mono text-amber text-sm block mb-2">
            It keeps happening because:
          </label>
          <textarea
            className="field-input min-h-[100px] resize-y"
            value={because}
            onChange={(e) => setBecause(e.target.value)}
          />
        </div>
      </div>
    </ZoneShell>
  );
}
