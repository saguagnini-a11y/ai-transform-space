-- L&D Problem Finder — run this in the Supabase SQL editor for project jqppaweurtodqkvfxkni

create table if not exists players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamp default now(),
  world integer default 1,
  context_tags jsonb
);

create table if not exists enemies (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references players(id),
  blocker_text text not null,
  world_origin integer default 2,
  created_at timestamp default now()
);

create table if not exists problem_statements (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references players(id),
  player_name text,
  raw_statement text,
  sharpened_statement text,
  context_tags jsonb,
  ai_fitness_verdict text,
  ai_fitness_reason text,
  reactions jsonb default '[]',
  completed_at timestamp default now()
);

-- Enable realtime
alter publication supabase_realtime add table players;
alter publication supabase_realtime add table problem_statements;
