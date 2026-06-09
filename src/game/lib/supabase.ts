import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_GAME_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_GAME_SUPABASE_ANON_KEY;

export const gameSupabase = createClient(supabaseUrl, supabaseKey);

export type Player = {
  id: string;
  name: string;
  created_at: string;
  world: number;
  context_tags: Record<string, string> | null;
};

export type Enemy = {
  id: string;
  player_id: string;
  blocker_text: string;
  world_origin: number;
  created_at: string;
};

export type ProblemStatement = {
  id: string;
  player_id: string;
  player_name: string;
  raw_statement: string;
  sharpened_statement: string;
  context_tags: Record<string, string> | null;
  ai_fitness_verdict: 'strong' | 'maybe' | 'redirect';
  ai_fitness_reason: string;
  reactions: Array<{ type: string; count: number }>;
  completed_at: string;
};
