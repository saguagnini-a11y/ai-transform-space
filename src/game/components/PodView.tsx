import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gameSupabase, ProblemStatement } from '../lib/supabase';
import VerdictBadge from './VerdictBadge';
import '../styles/mario.css';

const PLAYERS_PER_POD = 3;

const PodView: React.FC = () => {
  const { pod_id } = useParams<{ pod_id: string }>();
  const [statements, setStatements] = useState<ProblemStatement[]>([]);
  const [loading, setLoading] = useState(true);

  const podIndex = parseInt(pod_id ?? '1', 10);
  const offset = (podIndex - 1) * PLAYERS_PER_POD;

  useEffect(() => {
    const fetch = async () => {
      // Get statements ordered by completion time, take the pod's slice
      const { data } = await gameSupabase
        .from('problem_statements')
        .select('*')
        .order('completed_at', { ascending: true })
        .range(offset, offset + PLAYERS_PER_POD - 1);
      if (data) setStatements(data as ProblemStatement[]);
      setLoading(false);
    };
    fetch();

    const channel = gameSupabase
      .channel(`pod-view-${pod_id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'problem_statements' }, fetch)
      .subscribe();

    return () => { gameSupabase.removeChannel(channel); };
  }, [pod_id]);

  return (
    <div
      className="game-screen castle-wall-bg"
      style={{ minHeight: '100vh', padding: '32px 24px', color: 'var(--white)' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 className="mario-font" style={{ fontSize: '0.9rem', color: 'var(--coin-gold)', textShadow: '3px 3px 0 rgba(0,0,0,0.7)', marginBottom: 8 }}>
          POD {pod_id}
        </h1>
        <p className="vt323-font" style={{ color: '#ccc', fontSize: '1.3rem' }}>
          AI Fieldwork Cohort 2025 — Pod Debrief
        </p>
      </div>

      {loading && (
        <p className="vt323-font" style={{ textAlign: 'center', color: '#aaa', fontSize: '1.3rem' }}>
          Loading pod problems...
        </p>
      )}

      {!loading && statements.length === 0 && (
        <p className="vt323-font" style={{ textAlign: 'center', color: '#aaa', fontSize: '1.3rem' }}>
          No completed problems for this pod yet. Waiting...
        </p>
      )}

      {/* Side-by-side layout for screen share */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.max(1, statements.length)}, 1fr)`,
          gap: 24,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {statements.map((s) => (
          <div key={s.id} className="banner-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Name */}
            <div className="mario-font" style={{ fontSize: '0.6rem', color: '#333' }}>
              {s.player_name}
            </div>

            {/* Context tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
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
                        fontSize: '1rem',
                        padding: '2px 8px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
            </div>

            {/* Problem statement */}
            <p style={{ fontFamily: 'VT323, monospace', fontSize: '1.3rem', color: '#1a1a1a', margin: 0, lineHeight: 1.6, flexGrow: 1 }}>
              {s.sharpened_statement}
            </p>

            <VerdictBadge verdict={s.ai_fitness_verdict} showReason={s.ai_fitness_reason} />

            {/* Reactions */}
            {Array.isArray(s.reactions) && s.reactions.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {s.reactions.map((r, i) => (
                  <span key={i} style={{ fontFamily: 'VT323, monospace', fontSize: '1rem', background: 'rgba(0,0,0,0.15)', padding: '2px 8px' }}>
                    {r.type === 'sharp' ? '🎯' : r.type === 'broader' ? '🌀' : '💡'} ×{r.count}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodView;
