import { useState } from "react";
import { ZoneShell } from "../components/ZoneShell";
import { CastleDoor } from "../components/PixelSprite";
import { ROOT_CAUSES } from "../game/rootCauses";
import { VERDICT_META, type Verdict } from "../game/types";

interface Zone5Props {
  onAdvance: (rootCauseId: string) => void;
}

/* Door colors by routing: Strong Candidate = golden, Candidate = silver,
   Redirect = red. The player cannot be wrong — every door advances. */
const DOOR_COLOR: Record<Verdict, string> = {
  strong: "#F5A623",
  candidate: "#B8B8C8",
  redirect: "#E74C3C",
};

/* Choice-screen pattern: one door per screen with a DOOR x/9 counter.
   Opening a door reveals the routing result on the next screen, where the
   player either confirms the route or walks back to the corridor. */
export function Zone5FitCheck({ onAdvance }: Zone5Props) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const rc = ROOT_CAUSES[index];
  const v = VERDICT_META[rc.verdict];
  const prev = () => setIndex((index + ROOT_CAUSES.length - 1) % ROOT_CAUSES.length);
  const next = () => setIndex((index + 1) % ROOT_CAUSES.length);

  return (
    <ZoneShell
      zone={5}
      prompt={
        <>
          <div className="font-pixel text-[8px] text-paper/50 leading-relaxed mb-3">
            DOOR {index + 1} / {ROOT_CAUSES.length}
          </div>
          {!revealed ? (
            <>
              <div className="font-pixel text-sm sm:text-base text-paper leading-relaxed">
                {rc.name.toUpperCase()}
              </div>
              <p className="font-mono text-amber text-sm mt-3">{rc.description}</p>
            </>
          ) : (
            <div
              className="font-pixel text-sm sm:text-base leading-relaxed"
              style={{ color: v.color }}
            >
              {v.emoji} {rc.routingLabel.toUpperCase()}
            </div>
          )}
        </>
      }
      advanceLabel={revealed ? "Confirm your route" : "Open this door"}
      canAdvance={true}
      onAdvance={revealed ? () => onAdvance(rc.id) : () => setRevealed(true)}
    >
      {!revealed ? (
        <>
          {/* the door, full width */}
          <div className="pixel-panel p-6 flex items-start gap-6">
            <CastleDoor color={DOOR_COLOR[rc.verdict]} scale={6} className="shrink-0" />
            <div>
              <p className="font-mono text-sm text-paper/85 leading-relaxed">{rc.looksLike}</p>
              <p className="font-ui text-xs text-paper/55 mt-4 leading-snug italic">
                e.g. {rc.example}
              </p>
            </div>
          </div>

          {/* corridor navigation */}
          <div className="flex justify-between mt-6">
            <button className="pixel-btn pixel-btn-ghost !px-4 !py-3 !text-[9px]" onClick={prev}>
              ◂ PREVIOUS DOOR
            </button>
            <button className="pixel-btn pixel-btn-ghost !px-4 !py-3 !text-[9px]" onClick={next}>
              NEXT DOOR ▸
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="pixel-panel p-6 unfurl" style={{ borderColor: v.color }}>
            <div className="font-pixel text-[10px] text-paper leading-relaxed">
              {rc.name.toUpperCase()}
            </div>
            <p className="font-mono text-sm text-paper mt-4 leading-relaxed">{rc.whatItMeans}</p>
            <p className="font-mono text-sm text-paper/80 mt-3 leading-relaxed">
              <span className="text-amber">Next:</span> {rc.nextStep}
            </p>
          </div>
          <button
            className="pixel-btn pixel-btn-ghost !px-4 !py-3 !text-[9px] mt-6"
            onClick={() => setRevealed(false)}
          >
            ◂ BACK TO THE DOORS
          </button>
        </>
      )}
    </ZoneShell>
  );
}
