import { useState } from "react";
import { useWall, type ReactionCounts } from "./useWall";
import { WallBanner } from "./WallBanner";
import { VERDICT_META, type Verdict } from "../game/types";

const CONTEXT_FILTERS = ["All", "Corporate", "Education", "Freelance", "Other"] as const;
const VERDICT_FILTERS: ("all" | Verdict)[] = ["all", "strong", "candidate", "redirect"];
const ZERO: ReactionCounts = { sharp: 0, broader: 0, think: 0 };

interface ChallengesWallProps {
  ownBannerId: string | null;
}

export function ChallengesWall({ ownBannerId }: ChallengesWallProps) {
  const { status, banners, counts, freshIds, retry } = useWall();
  const [contextFilter, setContextFilter] = useState<(typeof CONTEXT_FILTERS)[number]>("All");
  const [verdictFilter, setVerdictFilter] = useState<"all" | Verdict>("all");

  const visible = banners.filter(
    (b) =>
      (contextFilter === "All" || b.context_tag === contextFilter) &&
      (verdictFilter === "all" || b.verdict === verdictFilter),
  );

  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{
        /* stone castle wall */
        backgroundColor: "#23233a",
        backgroundImage:
          "linear-gradient(rgba(240,234,214,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(240,234,214,0.05) 2px, transparent 2px), linear-gradient(rgba(240,234,214,0.025) 2px, transparent 2px)",
        backgroundSize: "120px 60px, 120px 60px, 60px 30px",
        backgroundPosition: "0 0, 60px 30px, 0 0",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="font-pixel text-paper text-base sm:text-xl leading-relaxed text-center">
          ZONE 7 · THE CHALLENGES WALL
        </h1>
        <p className="font-mono text-paper/70 text-sm text-center mt-3 mb-10">
          Every flag planted in the field hangs here. React to what you read.
        </p>

        {/* Filter bar */}
        {status === "ready" && banners.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-12">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-pixel text-[8px] text-paper/60">CONTEXT</span>
              {CONTEXT_FILTERS.map((c) => (
                <button
                  key={c}
                  onClick={() => setContextFilter(c)}
                  className={`font-mono text-xs px-3 py-1.5 border-2 ${
                    contextFilter === c
                      ? "border-amber text-amber"
                      : "border-paper/30 text-paper/70 hover:border-paper"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-pixel text-[8px] text-paper/60">VERDICT</span>
              {VERDICT_FILTERS.map((vf) => (
                <button
                  key={vf}
                  onClick={() => setVerdictFilter(vf)}
                  className={`font-mono text-xs px-3 py-1.5 border-2 ${
                    verdictFilter === vf
                      ? "border-amber text-amber"
                      : "border-paper/30 text-paper/70 hover:border-paper"
                  }`}
                >
                  {vf === "all" ? "All" : `${VERDICT_META[vf].emoji} ${VERDICT_META[vf].label}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {status === "loading" && (
          <p className="font-mono text-paper/70 text-center py-24 blink-step">
            Raising the banners...
          </p>
        )}

        {status === "error" && (
          <div className="text-center py-24">
            <p className="font-mono text-problem mb-6">
              The wall is unreachable. The connection to the field broke.
            </p>
            <button className="pixel-btn pixel-btn-amber" onClick={retry}>
              RETRY
            </button>
          </div>
        )}

        {status === "ready" && banners.length === 0 && (
          <p className="font-mono text-paper/80 text-center py-24">
            You're the first one here. Others are on their way.
          </p>
        )}

        {status === "ready" && banners.length > 0 && visible.length === 0 && (
          <p className="font-mono text-paper/60 text-center py-24">
            No banners match these filters. Yet.
          </p>
        )}

        {visible.length > 0 && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((b) => (
              <WallBanner
                key={b.id}
                banner={b}
                counts={counts[b.id] ?? ZERO}
                isOwn={b.id === ownBannerId}
                fresh={freshIds.has(b.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
