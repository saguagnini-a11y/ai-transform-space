import { useEffect, useState } from "react";
import { supabase } from "./supabase";

/* Counts players currently in the game via Supabase realtime presence.
   The displayed value refreshes every 30 seconds (first sample after a
   few seconds so the counter isn't stuck at 0 on arrival). */
export function useFieldPresence(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let latest = 0;
    const channel = supabase.channel("field-presence", {
      config: { presence: { key: Math.random().toString(36).slice(2) } },
    });
    channel.on("presence", { event: "sync" }, () => {
      latest = Object.keys(channel.presenceState()).length;
    });
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") void channel.track({ joined_at: Date.now() });
    });

    const first = setTimeout(() => setCount(latest), 4000);
    const interval = setInterval(() => setCount(latest), 30000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      void supabase.removeChannel(channel);
    };
  }, []);

  return count;
}
