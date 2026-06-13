import type { ReactNode } from "react";
import { ZONES } from "../game/types";
import { TerrainTile } from "./PixelSprite";

interface ZoneShellProps {
  zone: number;
  prompt: ReactNode;
  children: ReactNode;
  advanceLabel: string;
  canAdvance: boolean;
  onAdvance: () => void;
  /* shown under the advance button when the player tries to skip ahead */
  emptyHint?: string;
  showEmptyHint?: boolean;
  /* choice screens advance by tapping an option, not a button */
  hideAdvance?: boolean;
}

export function ZoneShell({
  zone,
  prompt,
  children,
  advanceLabel,
  canAdvance,
  onAdvance,
  emptyHint,
  showEmptyHint,
  hideAdvance,
}: ZoneShellProps) {
  const meta = ZONES[zone - 1];
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      {/* Zone header: terrain banner + name */}
      <div className="flex items-center gap-5 mb-3">
        <TerrainTile terrain={meta.terrain} scale={5} />
        <div>
          <div className="font-pixel text-[9px] text-amber leading-relaxed">
            ZONE {meta.zone} · {meta.marioWorld.toUpperCase()}
          </div>
          <h1 className="font-pixel text-base sm:text-xl text-paper mt-2 leading-relaxed">
            {meta.name}
          </h1>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <div className="font-mono text-paper text-base sm:text-lg leading-relaxed mb-8">
          {prompt}
        </div>

        {children}

        {!hideAdvance && (
          <div className="mt-10 flex flex-col items-start gap-3">
            <button className="pixel-btn pixel-btn-amber" onClick={onAdvance} disabled={!canAdvance}>
              {advanceLabel.toUpperCase()}
            </button>
            {showEmptyHint && emptyHint && (
              <p className="font-mono text-problem text-sm">{emptyHint}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
