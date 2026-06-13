import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchBanners,
  fetchReactions,
  supabase,
  type BannerRow,
  type ReactionRow,
} from "../lib/supabase";

export type WallStatus = "loading" | "ready" | "error";

export interface ReactionCounts {
  sharp: number;
  broader: number;
  think: number;
}

const zeroCounts: ReactionCounts = { sharp: 0, broader: 0, think: 0 };

export function useWall() {
  const [status, setStatus] = useState<WallStatus>("loading");
  const [banners, setBanners] = useState<BannerRow[]>([]);
  const [counts, setCounts] = useState<Record<string, ReactionCounts>>({});
  /* ids of banners that arrived via realtime — they get the unfurl animation */
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set());
  const mounted = useRef(true);

  const load = useCallback(async () => {
    try {
      const [b, r] = await Promise.all([fetchBanners(), fetchReactions()]);
      if (!mounted.current) return;
      setBanners(b);
      setCounts(tally(r));
      setStatus("ready");
    } catch {
      if (mounted.current) setStatus("error");
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();

    const channel = supabase
      .channel("challenges-wall")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "banners" },
        (payload) => {
          const row = payload.new as BannerRow;
          setBanners((prev) => (prev.some((b) => b.id === row.id) ? prev : [...prev, row]));
          setFreshIds((prev) => new Set(prev).add(row.id));
        },
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reactions" },
        (payload) => {
          const row = payload.new as ReactionRow;
          setCounts((prev) => {
            const c = prev[row.banner_id] ?? zeroCounts;
            return {
              ...prev,
              [row.banner_id]: { ...c, [row.reaction_type]: c[row.reaction_type] + 1 },
            };
          });
        },
      )
      .subscribe();

    /* Polling fallback: if realtime delivery is interrupted mid-session,
       the wall still converges within a few seconds. */
    const poll = setInterval(load, 8000);

    return () => {
      mounted.current = false;
      clearInterval(poll);
      supabase.removeChannel(channel);
    };
  }, [load]);

  return { status, banners, counts, freshIds, retry: load };
}

function tally(rows: ReactionRow[]): Record<string, ReactionCounts> {
  const out: Record<string, ReactionCounts> = {};
  for (const r of rows) {
    const c = out[r.banner_id] ?? { ...zeroCounts };
    c[r.reaction_type] += 1;
    out[r.banner_id] = c;
  }
  return out;
}
