import { useCallback, useRef, useState } from "react";
import { WorldMap } from "./components/WorldMap";
import { FlagPlant } from "./components/FlagPlant";
import { FieldReport } from "./components/FieldReport";
import { ChallengesWall } from "./wall/ChallengesWall";
import { OpenTextZone } from "./zones/OpenTextZone";
import { Zone3Dig } from "./zones/Zone3Dig";
import { Zone4Map } from "./zones/Zone4Map";
import { Zone5FitCheck } from "./zones/Zone5FitCheck";
import { Zone6Quest } from "./zones/Zone6Quest";
import { emptyAnswers, type ContextTag, type GameAnswers } from "./game/types";
import { getRootCause } from "./game/rootCauses";
import { insertBanner } from "./lib/supabase";
import { useFieldPresence } from "./lib/usePresence";

type Phase = "map" | "zone" | "flag" | "report" | "wall";

export default function App() {
  const [phase, setPhase] = useState<Phase>("map");
  const [started, setStarted] = useState(false);
  const [currentZone, setCurrentZone] = useState(1);
  const [completedThrough, setCompletedThrough] = useState(0);
  const [answers, setAnswers] = useState<GameAnswers>(emptyAnswers);
  const [ownBannerId, setOwnBannerId] = useState<string | null>(null);
  const fieldworkers = useFieldPresence();
  /* the banner row is built at flag-plant time; kept for retry on wall entry */
  const pendingBanner = useRef<Parameters<typeof insertBanner>[0] | null>(null);

  const completeZone = (zone: number, patch: Partial<GameAnswers>) => {
    setAnswers((a) => ({ ...a, ...patch }));
    setCompletedThrough(zone);
    if (zone < 6) {
      setCurrentZone(zone + 1);
      setPhase("map"); // world map as transition screen between zones
    }
  };

  const submitBanner = useCallback(async () => {
    if (ownBannerId || !pendingBanner.current) return;
    try {
      const row = await insertBanner(pendingBanner.current);
      setOwnBannerId(row.id);
    } catch {
      /* wall entry retries; if Supabase is down the player still gets
         their Field Report and can browse the wall */
    }
  }, [ownBannerId]);

  const plantFlag = (quest: {
    questStatement: string;
    displayName: string;
    oneWord: string;
    contextTag: ContextTag;
  }) => {
    const merged = { ...answers, ...quest };
    setAnswers(merged);
    setCompletedThrough(6);
    const rc = getRootCause(merged.rootCauseId);
    pendingBanner.current = {
      player_name: quest.displayName,
      one_word: quest.oneWord,
      problem_statement: quest.questStatement,
      root_cause: rc?.id ?? "unknown",
      verdict: rc?.verdict ?? "candidate",
      context_tag: quest.contextTag,
    };
    setPhase("flag");
    void submitBanner();
  };

  if (phase === "map") {
    return (
      <WorldMap
        completedThrough={completedThrough}
        currentZone={currentZone}
        started={started}
        fieldworkers={fieldworkers}
        onBegin={() => {
          setStarted(true);
          setPhase("zone");
        }}
        onContinue={() => setPhase(completedThrough >= 6 ? "report" : "zone")}
      />
    );
  }

  if (phase === "flag") {
    return <FlagPlant onDone={() => setPhase("report")} />;
  }

  if (phase === "report") {
    return (
      <FieldReport
        answers={answers}
        onEnterWall={() => {
          void submitBanner(); // retry if the flag-plant insert failed
          setPhase("wall");
        }}
      />
    );
  }

  if (phase === "wall") {
    return <ChallengesWall ownBannerId={ownBannerId} />;
  }

  // phase === "zone"
  switch (currentZone) {
    case 1:
      return (
        <OpenTextZone
          zone={1}
          prompt="Every expert L&D pro has a practice. Name yours. Where do you work? Who do you work with? What does L&D mean in your context?"
          placeholder="Write what you know. No word limit, no minimum."
          advanceLabel="Stake the ground"
          initialValue={answers.practice}
          onAdvance={(v) => completeZone(1, { practice: v })}
        />
      );
    case 2:
      return (
        <OpenTextZone
          zone={2}
          prompt="Something isn't working. Don't fix it yet. Just look at it. Describe what you keep running into."
          placeholder="What keeps happening? Stay descriptive — no solutions allowed here."
          advanceLabel="Survey the terrain"
          initialValue={answers.terrain}
          onAdvance={(v) => completeZone(2, { terrain: v })}
        />
      );
    case 3:
      return (
        <Zone3Dig
          terrain={answers.terrain}
          onAdvance={(whys, focus) =>
            completeZone(3, {
              whys,
              digFocus: focus,
              frameProblem: answers.terrain,
              frameBecause: whys[whys.length - 1] ?? "",
            })
          }
        />
      );
    case 4:
      return (
        <Zone4Map
          initialProblem={answers.frameProblem}
          initialBecause={answers.frameBecause}
          onAdvance={(problem, because) =>
            completeZone(4, { frameProblem: problem, frameBecause: because })
          }
        />
      );
    case 5:
      return <Zone5FitCheck onAdvance={(id) => completeZone(5, { rootCauseId: id })} />;
    case 6:
      return <Zone6Quest answers={answers} onAdvance={plantFlag} />;
    default:
      return null;
  }
}
