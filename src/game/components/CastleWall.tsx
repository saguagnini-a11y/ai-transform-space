import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase, ProblemStatement } from '../lib/supabase';
import VerdictBadge from './VerdictBadge';
import ArtifactCard from './ArtifactCard';
import '../styles/mario.css';

type ReactionType = 'sharp' | 'broader' | 'think';

const REACTION_LABELS: Record<ReactionType, string> = {
  sharp: '🎯 Sharp — this is a real problem',
  broader: '🌀 Might be broader than AI',
  think: '💡 This made me think',
};

const CastleWall: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const [statements, setStatements] = useState<ProblemStatement[]>([]);
  const [filterVerdict, setFilterVerdict] = useState('');
  const [filterContext, setFilterContext] = useState('');
  const [showArtifact, setShowArtifact] = useState(false);

  useEffect(() => {
    if (!playerId) { navigate('/game'); return; }
    fetchStatements();
    const channel = gameSupabase
      .channel('castle-wall')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'problem_statements' }, fetchStatements)
      .subscribe();
    return () => { gameSupabase.removeChannel(channel); };
  }, []);

  const fetchStatements = async () => {
    const { data } = await gameSupabase
      .from('problem_statements')
      .select('*')
      .order('completed_at', { ascending: false });
    if (data) setStatements(data as ProblemStatement[]);
  };

  const react = async (statementId: string, type: ReactionType) => {
    const statement = statements.find((s) => s.id === statementId);
    if (!statement) return;

    const reactions: Array<{ type: string; count: number }> = Array.isArray(statement.reactions)
      ? [...statement.reactions]
      : [];
    const existing = reactions.find((r) => r.type === type);
    if (existing) {
      existing.count = (existing.count || 0) + 1;
    } else {
      reactions.push({ type, count: 1 });
    }

    await gameSupabase
      .from('problem_statements')
      .update({ reactions })
      .eq('id', statementId);

    setStatements((prev) =>
      prev.map((s) => (s.id === statementId ? { ...s, reactions } : s))
    );
  };

  const getReactionCount = (statement: ProblemStatement, type: ReactionType): number => {
    if (!Array.isArray(statement.reactions)) return 0;
    return statement.reactions.find((r) => r.type === type)?.count ?? 0;
  };

  const myStatement = statements.find((s) => s.player_id === playerId);

  const filtered = statements.filter((s) => {
    if (filterVerdict && s.ai_fitness_verdict !== filterVerdict) return false;
    if (filterContext) {
      const tags = s.context_tags ?? {};
      const vals = Object.values(tags).join(' ').toLowerCase();
      if (!vals.includes(filterContext.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="game-screen castle-wall-bg" style={{ minHeight: '100vh', paddingBottom: 80 }}>
      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>THE WALL OF CHALLENGES</span>
        <span>{statements.length} problems</span>
        <span>21 players</span>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
        <h1 className="mario-font" style={{ fontSize: '0.9rem', color: 'var(--coin-gold)', textAlign: 'center', marginBottom: 8, textShadow: '3px 3px 0 rgba(0,0,0,0.7)' }}>
          THE WALL OF CHALLENGES
        </h1>
        <p className="vt323-font" style={{ color: 'var(--white)', textAlign: 'center', fontSize: '1.4rem', marginBottom: 24 }}>
          21 problems. One cohort.
        </p>

        {/* My artifact button */}
        {myStatement && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <button className="mario-btn mario-btn-gold" onClick={() => setShowArtifact(!showArtifact)} style={{ fontSize: '0.5rem' }}>
              {showArtifact ? '▼ HIDE MY CARD' : '🏆 VIEW MY ARTIFACT CARD'}
            </button>
          </div>
        )}

        {/* Artifact card modal */}
        {showArtifact && myStatement && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
            onClick={() => setShowArtifact(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ArtifactCard
                playerName={myStatement.player_name}
                realityWord={(myStatement.context_tags as Record<string, string>)?.reality ?? '...'}
                finalStatement={myStatement.sharpened_statement}
                verdict={myStatement.ai_fitness_verdict}
                verdictReason={myStatement.ai_fitness_reason}
              />
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          <span className="mario-font" style={{ fontSize: '0.4rem', color: 'var(--white)', alignSelf: 'center' }}>FILTER:</span>
          {['', 'strong', 'maybe', 'redirect'].map((v) => (
            <button
              key={v}
              className={`reaction-btn ${filterVerdict === v ? 'reacted' : ''}`}
              onClick={() => setFilterVerdict(v)}
            >
              {v === '' ? 'All verdicts' : v === 'strong' ? '🟢 Strong' : v === 'maybe' ? '🟡 Maybe' : '🔴 Redirect'}
            </button>
          ))}
          {['', 'Corporate', 'Education', 'Freelance'].map((c) => (
            <button
              key={c}
              className={`reaction-btn ${filterContext === c ? 'reacted' : ''}`}
              onClick={() => setFilterContext(c)}
            >
              {c === '' ? 'All contexts' : c}
            </button>
          ))}
        </div>

        {/* Banners grid */}
        {filtered.length === 0 ? (
          <p className="vt323-font" style={{ color: '#aaa', fontSize: '1.3rem', textAlign: 'center' }}>
            No problems here yet. Be the first to complete!
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
            {filtered.map((s) => (
              <div
                key={s.id}
                className="banner-card"
                style={{
                  outline: s.player_id === playerId ? '3px solid var(--coin-gold)' : 'none',
                }}
              >
                {/* Player name */}
                <div className="mario-font" style={{ fontSize: '0.5rem', marginBottom: 8, color: '#333' }}>
                  {s.player_name}
                  {s.player_id === playerId && (
                    <span style={{ marginLeft: 8, color: 'var(--mario-red)' }}>← YOU</span>
                  )}
                </div>

                {/* Context tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                  {s.context_tags &&
                    Object.values(s.context_tags as Record<string, string>)
                      .filter(Boolean)
                      .map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            background: '#333',
                            color: 'var(--white)',
                            fontFamily: 'VT323, monospace',
                            fontSize: '0.9rem',
                            padding: '2px 8px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                </div>

                {/* Problem statement */}
                <p style={{ fontFamily: 'VT323, monospace', fontSize: '1.2rem', color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.5 }}>
                  {s.sharpened_statement}
                </p>
                {s.raw_statement && s.raw_statement !== s.sharpened_statement && (
                  <p style={{ fontFamily: 'VT323, monospace', fontSize: '0.95rem', color: '#555', margin: '0 0 6px', lineHeight: 1.4, fontStyle: 'italic' }}>
                    {s.raw_statement}
                  </p>
                )}
                {(s.context_tags as Record<string, string>)?.first_experiment && (
                  <p style={{ fontFamily: 'VT323, monospace', fontSize: '0.9rem', color: '#777', margin: '0 0 12px', lineHeight: 1.4 }}>
                    <span style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '0.35rem', color: '#999', marginRight: 6 }}>FIRST MOVE:</span>
                    {(s.context_tags as Record<string, string>).first_experiment}
                  </p>
                )}

                <VerdictBadge verdict={s.ai_fitness_verdict} />

                {/* Reactions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                  {(['sharp', 'broader', 'think'] as ReactionType[]).map((type) => (
                    <button
                      key={type}
                      className="reaction-btn"
                      onClick={() => react(s.id, type)}
                      style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span>{REACTION_LABELS[type]}</span>
                      <span style={{ marginLeft: 8, opacity: 0.8 }}>
                        {getReactionCount(s, type) > 0 && `×${getReactionCount(s, type)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CastleWall;
