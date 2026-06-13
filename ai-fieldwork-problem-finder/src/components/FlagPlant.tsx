import { useEffect } from "react";
import { TerrainTile } from "./PixelSprite";

/* Interstitial after Zone 6 submission: the flag rises, then the
   Field Report appears. */
export function FlagPlant({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flag-rise">
        <TerrainTile terrain="flag" scale={10} />
      </div>
      <p className="font-pixel text-amber text-xs mt-10 leading-relaxed">FLAG PLANTED</p>
      <p className="font-mono text-paper/80 text-sm mt-4">
        You've named your quest. Now you can begin.
      </p>
    </div>
  );
}
