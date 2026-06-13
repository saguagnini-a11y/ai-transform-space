import { useEffect, useState } from "react";
import { ZoneShell } from "../components/ZoneShell";
import { contributeWisdom, fetchWisdom, type WisdomRow } from "../lib/supabase";
import type { DigFocus } from "../game/types";

interface Zone3Props {
  terrain: string; // the player's Zone 2 answer
  onAdvance: (whys: string[], focus: DigFocus) => void;
}

const MAX_WHYS = 5;
const MIN_WHYS = 3;

/* One question per screen, choice-screen style: pixel header + amber
   sub-prompt. The repeated "And why is that?" is gone. */
const WHY_PROMPTS = [
  { header: "WHY IS THAT HAPPENING?", sub: "Don't explain. Describe." },
  { header: "WHO WAS IN THE ROOM?", sub: "Name the last time this went wrong. Who owned it?" },
  { header: "IS THIS YOURS TO SOLVE?", sub: "Or are you holding someone else's problem?" },
  { header: "WHAT WOULD STILL BE BROKEN?", sub: "If you fixed this tomorrow — what's left?" },
  { header: "WHAT WOULD HAVE TO STOP?", sub: "For this to disappear on its own — what changes?" },
];

const FOCUS_LABEL: Record<DigFocus, string> = {
  recurring: "the thing that comes back every time",
  costly: "the one that costs the most",
};

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

export function Zone3Dig({ terrain, onAdvance }: Zone3Props) {
  const [focus, setFocus] = useState<DigFocus | null>(null);
  const [whys, setWhys] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [wisdom, setWisdom] = useState<WisdomRow | null>(null);
  const [wisdomDismissed, setWisdomDismissed] = useState(false);

  /* Borrowed wisdom: one anonymised answer from a previous session at the
     "WHO WAS IN THE ROOM?" prompt. Silently absent when the pool is empty. */
  useEffect(() => {
    fetchWisdom(3, 2).then(setWisdom).catch(() => {});
  }, []);

  const depth = whys.length;
  const atMax = depth >= MAX_WHYS;
  const canStop = depth >= MIN_WHYS;
  /* soft nudge, not a block: a first why under 10 words is usually a symptom */
  const showNudge = depth === 1 && wordCount(whys[0]) < 10;

  const finishDig = (finalWhys: string[]) => {
    void contributeWisdom(finalWhys); // feed the wisdom pool, fire-and-forget
    onAdvance(finalWhys, focus ?? "recurring");
  };

  const submitWhy = () => {
    if (!draft.trim()) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    setWhys([...whys, draft.trim()]);
    setDraft("");
  };

  /* --- Screen 0: choose the dig site --- */
  if (focus === null) {
    return (
      <ZoneShell
        zone={3}
        prompt={
          <>
            <div className="font-pixel text-sm sm:text-base text-paper leading-relaxed">
              CHOOSE YOUR DIG SITE
            </div>
            <p className="font-mono text-amber text-sm mt-3">
              You can't dig everywhere. Pick one — that's a thinking act too.
            </p>
            <div className="mt-6 border-l-4 border-amber/60 pl-4 text-paper/80 text-sm">
              You said: “{terrain || "what you described in the terrain"}”
            </div>
          </>
        }
        advanceLabel=""
        canAdvance={false}
        onAdvance={() => {}}
        hideAdvance
      >
        <div className="grid gap-4">
          <button
            className="pixel-panel p-6 text-left hover:border-amber"
            onClick={() => setFocus("recurring")}
          >
            <div className="font-pixel text-[10px] text-paper leading-relaxed">
              🔍 I WANT TO DIG INTO THE THING THAT COMES BACK EVERY TIME
            </div>
            <p className="font-mono text-xs text-paper/60 mt-3">
              The repeat offender. It survives every fix you've thrown at it.
            </p>
          </button>
          <button
            className="pixel-panel p-6 text-left hover:border-amber"
            onClick={() => setFocus("costly")}
          >
            <div className="font-pixel text-[10px] text-paper leading-relaxed">
              ⚡ I WANT TO DIG INTO THE ONE THAT COSTS THE MOST
            </div>
            <p className="font-mono text-xs text-paper/60 mt-3">
              The expensive one. Time, money, trust — wherever it bleeds.
            </p>
          </button>
        </div>
      </ZoneShell>
    );
  }

  /* --- Screens 1–5: one why per screen --- */
  const prompt = WHY_PROMPTS[Math.min(depth, MAX_WHYS - 1)];
  const reflected = depth === 0 ? terrain || "what you described in the terrain" : whys[depth - 1];

  return (
    <ZoneShell
      zone={3}
      prompt={
        <>
          <div className="font-pixel text-[8px] text-paper/50 leading-relaxed mb-3">
            WHY {Math.min(depth + 1, MAX_WHYS)} / {MAX_WHYS} · DIGGING INTO{" "}
            {FOCUS_LABEL[focus].toUpperCase()}
          </div>
          <div className="font-pixel text-sm sm:text-base text-paper leading-relaxed">
            {atMax ? "THAT'S AS DEEP AS THE DIG GOES" : prompt.header}
          </div>
          {!atMax && <p className="font-mono text-amber text-sm mt-3">{prompt.sub}</p>}
          <div className="mt-6 border-l-4 border-amber/60 pl-4 text-paper/80 text-sm">
            {depth === 0 ? "You said:" : `Why #${depth}:`} “{reflected}”
          </div>
        </>
      }
      advanceLabel={atMax ? "That's the root" : "Dig deeper"}
      canAdvance={true}
      onAdvance={atMax ? () => finishDig(whys) : submitWhy}
      emptyHint="The dig needs an answer. Write why, even a rough one."
      showEmptyHint={showHint}
    >
      {/* the dig log — previous whys, deepest last */}
      {whys.length > 0 && (
        <ol className="mb-6 space-y-2">
          {whys.map((w, i) => (
            <li key={i} className="font-mono text-sm text-paper/70">
              <span className="text-amber">▸ why {i + 1}:</span> {w}
            </li>
          ))}
        </ol>
      )}

      {/* borrowed wisdom after Why #2 — read-only, one dismiss */}
      {depth === 2 && wisdom && !wisdomDismissed && (
        <div className="bg-[#0d0d18] border-2 border-paper/20 p-4 mb-6 flex items-start gap-4">
          <p className="font-mono text-sm text-paper/80 leading-relaxed flex-1">
            Someone else in the field wrote: <span className="italic">“{wisdom.answer_text}”</span>{" "}
            Does that land for you?
          </p>
          <button
            className="font-pixel text-[8px] text-paper/50 hover:text-amber border-2 border-paper/30 px-2 py-1.5 shrink-0"
            onClick={() => setWisdomDismissed(true)}
          >
            DISMISS
          </button>
        </div>
      )}

      {!atMax && (
        <>
          <textarea
            className="field-input min-h-[100px] resize-y"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            key={depth}
          />
          {showNudge && (
            <p className="font-mono text-amber text-sm mt-3 italic">
              That might be the symptom. What's underneath it?
            </p>
          )}
        </>
      )}

      {canStop && !atMax && (
        <button
          className="pixel-btn pixel-btn-ghost mt-6"
          onClick={() => {
            // count the draft if the player wrote one before stopping
            const final = draft.trim() ? [...whys, draft.trim()] : whys;
            finishDig(final);
          }}
        >
          THAT'S THE ROOT
        </button>
      )}
    </ZoneShell>
  );
}
