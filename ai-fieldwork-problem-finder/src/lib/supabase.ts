import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export type ReactionType = "sharp" | "broader" | "think";

export interface BannerRow {
  id: string;
  player_name: string;
  one_word: string;
  problem_statement: string;
  root_cause: string;
  verdict: "strong" | "candidate" | "redirect";
  context_tag: string;
  created_at: string;
}

export interface ReactionRow {
  id: string;
  banner_id: string;
  reaction_type: ReactionType;
  created_at: string;
}

export async function fetchBanners(): Promise<BannerRow[]> {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchReactions(): Promise<ReactionRow[]> {
  const { data, error } = await supabase.from("reactions").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function insertBanner(
  banner: Omit<BannerRow, "id" | "created_at">,
): Promise<BannerRow> {
  const { data, error } = await supabase
    .from("banners")
    .insert(banner)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function insertReaction(
  bannerId: string,
  type: ReactionType,
): Promise<void> {
  const { error } = await supabase
    .from("reactions")
    .insert({ banner_id: bannerId, reaction_type: type });
  if (error) throw error;
}

export interface WisdomRow {
  id: string;
  zone: number;
  prompt_index: number;
  answer_text: string;
  created_at: string;
}

/* One random anonymised answer another player wrote at the same prompt.
   Returns null when the table is empty or missing — the card simply
   doesn't appear in a first session. */
export async function fetchWisdom(
  zone: number,
  promptIndex: number,
): Promise<WisdomRow | null> {
  const { data, error } = await supabase
    .from("wisdom")
    .select("*")
    .eq("zone", zone)
    .eq("prompt_index", promptIndex)
    .limit(50);
  if (error || !data || data.length === 0) return null;
  return data[Math.floor(Math.random() * data.length)];
}

/* Populate the wisdom pool from real dig answers as players complete
   Zone 3. Fire-and-forget; very short answers are not worth borrowing. */
export async function contributeWisdom(whys: string[]): Promise<void> {
  const rows = whys
    .map((answer_text, i) => ({
      zone: 3,
      prompt_index: i + 1,
      answer_text: answer_text.trim(),
    }))
    .filter((r) => r.answer_text.split(/\s+/).length >= 4);
  if (rows.length === 0) return;
  await supabase.from("wisdom").insert(rows); // errors intentionally ignored
}

/* One reaction per player per banner per type — no auth, so enforced
   per-browser via localStorage. */
const REACTED_KEY = "fieldwork-reacted";

export function hasReacted(bannerId: string, type: ReactionType): boolean {
  try {
    const set = JSON.parse(localStorage.getItem(REACTED_KEY) ?? "[]");
    return set.includes(`${bannerId}:${type}`);
  } catch {
    return false;
  }
}

export function markReacted(bannerId: string, type: ReactionType): void {
  try {
    const set: string[] = JSON.parse(localStorage.getItem(REACTED_KEY) ?? "[]");
    set.push(`${bannerId}:${type}`);
    localStorage.setItem(REACTED_KEY, JSON.stringify(set));
  } catch {
    /* localStorage unavailable — dedupe degrades gracefully */
  }
}
