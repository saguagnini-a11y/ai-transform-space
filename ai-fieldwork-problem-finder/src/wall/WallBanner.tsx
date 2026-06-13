import { useRef, useState } from "react";
import {
  hasReacted,
  insertReaction,
  markReacted,
  type BannerRow,
  type ReactionType,
} from "../lib/supabase";
import { VERDICT_META } from "../game/types";
import { getRootCause } from "../game/rootCauses";
import { BannerCard } from "../components/BannerCard";
import { downloadBannerPng } from "../lib/downloadBanner";
import type { ReactionCounts } from "./useWall";

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: "sharp", emoji: "🎯", label: "Sharp — this is a real problem" },
  { type: "broader", emoji: "🌍", label: "Might be broader than AI" },
  { type: "think", emoji: "💡", label: "This made me think" },
];

interface WallBannerProps {
  banner: BannerRow;
  counts: ReactionCounts;
  isOwn: boolean;
  fresh: boolean;
}

export function WallBanner({ banner, counts, isOwn, fresh }: WallBannerProps) {
  const v = VERDICT_META[banner.verdict];
  const [, forceRender] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const rc = getRootCause(banner.root_cause);

  const react = async (type: ReactionType) => {
    if (hasReacted(banner.id, type)) return;
    markReacted(banner.id, type);
    forceRender((n) => n + 1);
    try {
      await insertReaction(banner.id, type);
    } catch {
      /* count reconciles via polling; the local mark stays to prevent spam */
    }
  };

  const download = async () => {
    if (cardRef.current) {
      await downloadBannerPng(
        cardRef.current,
        `fieldwork-banner-${banner.player_name.toLowerCase().replace(/\s+/g, "-")}.png`,
      );
    }
  };

  return (
    <div className={`relative group ${fresh ? "unfurl" : ""}`}>
      {/* hanging rope + rings */}
      <div className="flex justify-around px-6" aria-hidden="true">
        <div className="w-2 h-3 bg-[#5C3A1E]" />
        <div className="w-2 h-3 bg-[#5C3A1E]" />
      </div>

      {/* the pennant — verdict color drives the banner */}
      <div
        className="border-4 bg-[#141428] p-4 flex flex-col"
        style={{ borderColor: v.color, boxShadow: `0 6px 0 0 rgba(0,0,0,0.4)` }}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-pixel text-[9px] text-paper leading-relaxed">
              {banner.player_name}
            </div>
            <div className="font-mono text-[11px] mt-1" style={{ color: v.color }}>
              {banner.one_word.toUpperCase()}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-mono text-[10px] text-paper/60">{banner.context_tag}</div>
            <div className="font-mono text-[10px] mt-1" style={{ color: v.color }}>
              {v.emoji} {v.label}
            </div>
          </div>
        </div>

        <p className="font-mono text-sm text-paper/90 leading-relaxed mt-3 flex-1">
          “{banner.problem_statement}”
        </p>

        {/* peer reactions */}
        <div className="flex gap-2 mt-4">
          {REACTIONS.map((r) => {
            const done = hasReacted(banner.id, r.type);
            return (
              <button
                key={r.type}
                title={r.label}
                onClick={() => react(r.type)}
                disabled={done}
                className={`font-mono text-xs px-2 py-1 border-2 ${
                  done
                    ? "border-amber text-amber cursor-default"
                    : "border-paper/30 text-paper/80 hover:border-paper cursor-pointer"
                }`}
              >
                {r.emoji} {counts[r.type]}
              </button>
            );
          })}
        </div>

        {/* own banner: download icon on hover */}
        {isOwn && (
          <button
            onClick={download}
            title="Download my banner"
            className="absolute top-5 right-2 opacity-0 group-hover:opacity-100 font-mono text-paper/80 hover:text-amber text-sm border-2 border-paper/40 px-1.5 py-0.5 bg-parchment"
          >
            ⤓
          </button>
        )}
      </div>

      {/* pennant point */}
      <div
        className="mx-auto w-0 h-0 border-l-[18px] border-r-[18px] border-t-[14px] border-l-transparent border-r-transparent"
        style={{ borderTopColor: v.color }}
        aria-hidden="true"
      />

      {isOwn && rc && (
        <div className="fixed -left-[2000px] top-0" aria-hidden="true">
          <BannerCard
            ref={cardRef}
            displayName={banner.player_name}
            oneWord={banner.one_word}
            problemStatement={banner.problem_statement}
            rootCauseName={rc.name}
            verdict={banner.verdict}
          />
        </div>
      )}
    </div>
  );
}
