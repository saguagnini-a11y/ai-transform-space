-- AI Fieldwork Problem Finder — Supabase schema
-- Run in the Supabase SQL editor. Tables already existed in the project
-- (abfvvrxduqqlbgrhwscb) when this app was built; this file documents the
-- expected shape and the policies/realtime config the app relies on.

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  player_name text not null check (char_length(player_name) <= 20),
  one_word text not null check (char_length(one_word) <= 24),
  problem_statement text not null,
  root_cause text not null,
  verdict text not null check (verdict in ('strong', 'candidate', 'redirect')),
  context_tag text not null check (context_tag in ('Corporate', 'Education', 'Freelance', 'Other')),
  created_at timestamptz not null default now()
);

create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  banner_id uuid not null references public.banners (id) on delete cascade,
  reaction_type text not null check (reaction_type in ('sharp', 'broader', 'think')),
  created_at timestamptz not null default now()
);

-- Borrowed wisdom: anonymised Zone 3 answers, contributed as players
-- complete the dig and surfaced to later players at the same prompt.
create table if not exists public.wisdom (
  id uuid primary key default gen_random_uuid(),
  zone int not null,
  prompt_index int not null,
  answer_text text not null,
  created_at timestamptz not null default now()
);

-- Anonymous players: anon key may read everything and insert, never
-- update or delete (the wall is read-only after submission).
alter table public.banners enable row level security;
alter table public.reactions enable row level security;

drop policy if exists "anon read banners" on public.banners;
create policy "anon read banners" on public.banners for select using (true);
drop policy if exists "anon insert banners" on public.banners;
create policy "anon insert banners" on public.banners for insert with check (true);

drop policy if exists "anon read reactions" on public.reactions;
create policy "anon read reactions" on public.reactions for select using (true);
drop policy if exists "anon insert reactions" on public.reactions;
create policy "anon insert reactions" on public.reactions for insert with check (true);

alter table public.wisdom enable row level security;
drop policy if exists "anon read wisdom" on public.wisdom;
create policy "anon read wisdom" on public.wisdom for select using (true);
drop policy if exists "anon insert wisdom" on public.wisdom;
create policy "anon insert wisdom" on public.wisdom for insert with check (true);

-- Realtime: the wall subscribes to INSERTs on both tables.
alter publication supabase_realtime add table public.banners;
alter publication supabase_realtime add table public.reactions;
