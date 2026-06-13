import { useRef, useState } from "react";
import { getRootCause } from "../game/rootCauses";
import { VERDICT_META, type GameAnswers } from "../game/types";
import { BannerCard } from "./BannerCard";
import { downloadBannerPng } from "../lib/downloadBanner";

interface FieldReportProps {
  answers: GameAnswers;
  onEnterWall: () => void;
}

export function FieldReport({ answers, onEnterWall }: FieldReportProps) {
  const rc = getRootCause(answers.rootCauseId);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!rc) return null;
  const v = VERDICT_META[rc.verdict];

  const reportText = [
    `FIELD REPORT — AI Fieldwork Problem Finder`,
    ``,
    `Quest: ${answers.questStatement}`,
    `Practice: ${answers.oneWord} (${answers.contextTag})`,
    `AI fit: ${v.label} — ${rc.name}`,
    `Next step: ${rc.nextStep}`,
  ].join("\n");

  const copy = async () => {
    await navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      await downloadBannerPng(
        cardRef.current,
        `fieldwork-banner-${answers.displayName.toLowerCase().replace(/\s+/g, "-")}.png`,
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-14">
      <h1 className="font-pixel text-paper text-lg leading-relaxed mb-2">FIELD REPORT</h1>
      <p className="font-mono text-paper/70 text-sm mb-10">
        This is what you came for. Take it with you.
      </p>

      {/* The quest card — quest blue per the visual identity */}
      <div className="pixel-panel w-full max-w-xl p-8" style={{ borderColor: "#3498DB" }}>
        <div className="font-pixel text-[9px] text-quest leading-relaxed">YOUR QUEST</div>
        <p className="font-mono text-paper text-lg leading-relaxed mt-4">
          “{answers.questStatement}”
        </p>

        <div className="mt-8 space-y-3 font-mono text-sm">
          <div>
            <span className="text-amber">AI fit: </span>
            <span style={{ color: v.color }}>
              {v.emoji} {v.label}
            </span>
            <span className="text-paper/80"> — {rc.name}</span>
          </div>
          <div className="text-paper/80">
            <span className="text-amber">What to do next: </span>
            {rc.nextStep}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-10 justify-center">
        <button className="pixel-btn pixel-btn-ghost" onClick={copy}>
          {copied ? "COPIED ✓" : "COPY TO CLIPBOARD"}
        </button>
        <button className="pixel-btn pixel-btn-ghost" onClick={download} disabled={downloading}>
          {downloading ? "RENDERING..." : "DOWNLOAD MY BANNER"}
        </button>
        <button className="pixel-btn pixel-btn-amber" onClick={onEnterWall}>
          ENTER THE CHALLENGES WALL
        </button>
      </div>

      {/* Offscreen render target for the PNG download */}
      <div className="fixed -left-[2000px] top-0" aria-hidden="true">
        <BannerCard
          ref={cardRef}
          displayName={answers.displayName}
          oneWord={answers.oneWord}
          problemStatement={answers.questStatement}
          rootCauseName={rc.name}
          verdict={rc.verdict}
        />
      </div>
    </div>
  );
}
