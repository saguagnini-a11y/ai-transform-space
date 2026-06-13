import { ZONES } from "../game/types";
import { Fieldworker, SmallFlag, TerrainTile } from "./PixelSprite";

interface WorldMapProps {
  /* zones 1..completedThrough are done; currentZone is where the player is */
  completedThrough: number;
  currentZone: number;
  started: boolean;
  /* live presence count; hidden when you're alone (0 or 1) */
  fieldworkers: number;
  onBegin: () => void;
  onContinue: () => void;
}

export function WorldMap({
  completedThrough,
  currentZone,
  started,
  fieldworkers,
  onBegin,
  onContinue,
}: WorldMapProps) {
  const allDone = completedThrough >= 6;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <h1 className="font-pixel text-amber text-sm sm:text-base mb-2 text-center leading-relaxed">
        AI FIELDWORK
      </h1>
      <h2 className="font-pixel text-paper text-lg sm:text-2xl mb-10 text-center leading-relaxed">
        PROBLEM FINDER
      </h2>

      {/* The overhead map: six zone tiles connected by a dotted trail */}
      <div className="pixel-panel px-6 py-8 sm:px-10 w-full max-w-4xl">
        <div className="grid grid-cols-3 gap-x-4 gap-y-10 sm:grid-cols-6 sm:gap-x-2">
          {ZONES.map((z, i) => {
            const done = z.zone <= completedThrough;
            const isCurrent = started && z.zone === currentZone && !done;
            const locked = !done && !isCurrent;
            return (
              <div key={z.zone} className="flex flex-col items-center relative">
                {/* trail connector */}
                {i < ZONES.length - 1 && (
                  <div
                    className="hidden sm:block absolute top-7 left-[calc(50%+34px)] w-[calc(100%-44px)] border-t-4 border-dotted border-paper/25"
                    aria-hidden="true"
                  />
                )}
                <div className={`relative ${locked ? "opacity-35 grayscale" : ""}`}>
                  <TerrainTile terrain={z.terrain} scale={5} />
                  {done && (
                    <div className="absolute -top-4 -right-2">
                      <SmallFlag />
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 blink-step">
                      <Fieldworker scale={3} />
                    </div>
                  )}
                </div>
                <div
                  className={`mt-3 font-pixel text-[8px] leading-relaxed text-center ${
                    isCurrent ? "text-amber" : done ? "text-grass" : "text-paper/50"
                  }`}
                >
                  ZONE {z.zone}
                </div>
                <div
                  className={`mt-1 font-mono text-xs text-center ${
                    locked ? "text-paper/40" : "text-paper"
                  }`}
                >
                  {z.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {fieldworkers >= 2 && (
        <p className="font-mono text-paper/50 text-xs mt-4">
          {fieldworkers} fieldworkers currently in the field.
        </p>
      )}

      {!started ? (
        <>
          <p className="font-mono text-paper/90 text-base mt-10 mb-6 text-center max-w-md">
            Welcome to the field. You're not here to build anything yet.
          </p>
          <button className="pixel-btn pixel-btn-amber" onClick={onBegin}>
            BEGIN FIELDWORK
          </button>
        </>
      ) : (
        <>
          <p className="font-mono text-paper/90 text-base mt-10 mb-6 text-center max-w-md">
            {allDone
              ? "All zones cleared. Your field report is ready."
              : `Next: Zone ${currentZone} — ${ZONES[currentZone - 1].name}. ${ZONES[currentZone - 1].task}.`}
          </p>
          <button className="pixel-btn pixel-btn-amber" onClick={onContinue}>
            {allDone ? "READ FIELD REPORT" : `ENTER ZONE ${currentZone}`}
          </button>
        </>
      )}
    </div>
  );
}
