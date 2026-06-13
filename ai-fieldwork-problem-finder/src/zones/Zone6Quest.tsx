import { useState } from "react";
import { ZoneShell } from "../components/ZoneShell";
import { getRootCause } from "../game/rootCauses";
import { VERDICT_META, type ContextTag, type GameAnswers } from "../game/types";

interface Zone6Props {
  answers: GameAnswers;
  onAdvance: (quest: {
    questStatement: string;
    displayName: string;
    oneWord: string;
    contextTag: ContextTag;
  }) => void;
}

const CONTEXT_TAGS: ContextTag[] = ["Corporate", "Education", "Freelance", "Other"];

export function Zone6Quest({ answers, onAdvance }: Zone6Props) {
  const [statement, setStatement] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [oneWord, setOneWord] = useState("");
  const [contextTag, setContextTag] = useState<ContextTag | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const rc = getRootCause(answers.rootCauseId);

  const plantFlag = () => {
    if (!statement.trim()) {
      setHint("No flag without a quest. Write your problem statement first.");
      return;
    }
    if (!displayName.trim()) {
      setHint("Your banner needs a name. Twenty characters or fewer.");
      return;
    }
    if (!oneWord.trim()) {
      setHint("Give your practice one word. It becomes your banner's label.");
      return;
    }
    if (!contextTag) {
      setHint("Pick a context tag — it's how others will find your banner.");
      return;
    }
    onAdvance({
      questStatement: statement.trim(),
      displayName: displayName.trim(),
      oneWord: oneWord.trim(),
      contextTag,
    });
  };

  return (
    <ZoneShell
      zone={6}
      prompt="You've dug, mapped, and checked the fit. Now name your quest."
      advanceLabel="Plant the flag"
      canAdvance={true}
      onAdvance={plantFlag}
      emptyHint={hint ?? undefined}
      showEmptyHint={hint !== null}
    >
      {/* Assembled outputs from the journey */}
      <div className="pixel-panel p-5 mb-8 space-y-4">
        <div>
          <div className="font-pixel text-[8px] text-amber leading-relaxed">YOUR PRACTICE</div>
          <p className="font-mono text-sm text-paper/85 mt-1">{answers.practice || "—"}</p>
        </div>
        <div>
          <div className="font-pixel text-[8px] text-amber leading-relaxed">YOUR PROBLEM FRAME</div>
          <p className="font-mono text-sm text-paper/85 mt-1">
            {answers.frameProblem} It keeps happening because: {answers.frameBecause}
          </p>
        </div>
        {rc && (
          <div>
            <div className="font-pixel text-[8px] text-amber leading-relaxed">AI FIT</div>
            <p className="font-mono text-sm text-paper/85 mt-1">
              {VERDICT_META[rc.verdict].emoji} {rc.routingLabel} — {rc.name}
            </p>
          </div>
        )}
      </div>

      <label className="font-mono text-paper text-base block mb-3">
        Name your quest. Write your problem statement in one sentence.
      </label>
      <textarea
        className="field-input min-h-[90px] resize-y"
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
        autoFocus
      />

      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        <div>
          <label className="font-mono text-paper/90 text-sm block mb-2">
            What name should go on your banner?
          </label>
          <input
            className="field-input"
            maxLength={20}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="First name, 20 chars max"
          />
        </div>
        <div>
          <label className="font-mono text-paper/90 text-sm block mb-2">
            Give your practice one word.
          </label>
          <input
            className="field-input"
            maxLength={24}
            value={oneWord}
            onChange={(e) => setOneWord(e.target.value)}
            placeholder='e.g. "Onboarding", "Compliance"'
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="font-mono text-paper/90 text-sm block mb-3">Context tag:</label>
        <div className="flex flex-wrap gap-3">
          {CONTEXT_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setContextTag(tag)}
              className={`pixel-btn ${
                contextTag === tag ? "pixel-btn-amber" : "pixel-btn-ghost"
              } !px-4 !py-3 !text-[9px]`}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </ZoneShell>
  );
}
