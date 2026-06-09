import { gameSupabase } from './supabase';

export async function getRandomEnemies(playerId: string, count: number) {
  const { data, error } = await gameSupabase
    .from('enemies')
    .select('*')
    .neq('player_id', playerId)
    .limit(50);

  if (error || !data) return [];

  // Fisher-Yates shuffle then slice
  const arr = [...data];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

export async function getRandomFragment(playerId: string): Promise<string | null> {
  const enemies = await getRandomEnemies(playerId, 10);
  if (enemies.length === 0) return null;
  const pick = enemies[Math.floor(Math.random() * enemies.length)];
  return pick.blocker_text;
}
