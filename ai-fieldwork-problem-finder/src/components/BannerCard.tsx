import { forwardRef } from "react";
import { VERDICT_META, type Verdict } from "../game/types";
import { TerrainTile } from "./PixelSprite";

interface BannerCardProps {
  displayName: string;
  oneWord: string;
  problemStatement: string;
  rootCauseName: string;
  verdict: Verdict;
}

/* The downloadable banner card — fixed width so html2canvas renders a
   consistent PNG. Carries L&D Shakers branding + cohort label. */
export const BannerCard = forwardRef<HTMLDivElement, BannerCardProps>(
  ({ displayName, oneWord, problemStatement, rootCauseName, verdict }, ref) => {
    const v = VERDICT_META[verdict];
    return (
      <div
        ref={ref}
        className="bg-parchment border-8 p-8 flex flex-col"
        style={{ width: 640, borderColor: v.color, fontFamily: "Inter, sans-serif" }}
      >
        <div className="flex items-center justify-between">
          <div className="font-pixel text-[10px] text-amber leading-relaxed">
            AI FIELDWORK · FIELD BANNER
          </div>
          <TerrainTile terrain="flag" scale={3} />
        </div>

        <div className="mt-6">
          <div className="font-pixel text-base text-paper leading-relaxed">{displayName}</div>
          <div className="font-mono text-sm mt-2" style={{ color: v.color }}>
            {oneWord.toUpperCase()}
          </div>
        </div>

        <p className="font-mono text-paper text-lg leading-relaxed mt-6 mb-6">
          “{problemStatement}”
        </p>

        <div className="border-t-4 border-dotted border-paper/30 pt-4 flex items-center justify-between">
          <div>
            <div className="font-pixel text-[9px] leading-relaxed" style={{ color: v.color }}>
              {v.emoji} {v.label.toUpperCase()}
            </div>
            <div className="font-mono text-xs text-paper/70 mt-1">Root cause: {rootCauseName}</div>
          </div>
          <div className="text-right">
            <div className="font-pixel text-[9px] text-paper leading-relaxed">L&amp;D SHAKERS</div>
            <div className="font-mono text-[10px] text-paper/60 mt-1">AI Fieldwork Cohort 2026</div>
          </div>
        </div>
      </div>
    );
  },
);
BannerCard.displayName = "BannerCard";
