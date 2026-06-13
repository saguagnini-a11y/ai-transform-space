import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import { calculateVerdict } from '../lib/gameLogic';
import VerdictBadge from './VerdictBadge';
import '../styles/mario.css';

const AMBER = 'var(--coin-gold)';

const countWords = (text: string) =>
  text.trim().split(/\s+/).filter(Boolean).length;

const World4_Castle: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const playerName = localStorage.getItem('game_player_name') ?? 'Player';

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(
    localStorage.getItem('game_size_check') ?? ''
  );
  const [toolAnswer, setToolAnswer] = useState('');
  const [learnerImpact, setLearnerImpact] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [finalStatement, setFinalStatement] = useState('');
  const [shrunkStatement, setShrunkStatement] = useState('');
  const [verdict, setVerdict] = useState<ReturnType<typeof calculateVerdict> | null>(null);
  const [loading, setLoading] = useState(false);
  const [flagRaised, setFlagRaised] = useState(false);

  if (!playerId) { navigate('/game'); return null; }

  const handleDraftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setStep(1);
  };

  const handleTool = (v: string) => { setToolAnswer(v); setStep(2); };

  const handleLearnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerImpact.trim()) return;
    setStep(3);
  };

  const handleRoot = (v: string) => {
    setRootCause(v);
    const result = calculateVerdict(toolAnswer, v);
    setVerdict(result);
    setFinalStatement(draft);
    setStep(4);
  };

  const handleAdvanceToShrink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalStatement.trim()) return;
    setStep(5);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shrunkStatement.trim() || !verdict || countWords(shrunkStatement) > 10) return;
    setLoading(true);
    try {
      const contextTags = JSON.parse(localStorage.getItem('game_context_tags') ?? '{}');
      await gameSupabase.from('problem_statements').insert({
        player_id: playerId,
        player_name: playerName,
        raw_statement: finalStatement,
        sharpened_statement: shrunkStatement,
        context_tags: contextTags,
        ai_fitness_verdict: verdict.verdict,
        ai_fitness_reason: verdict.reason,
        reactions: [],
      });
      await gameSupabase.from('players').update({ world: 4 }).eq('id', playerId);
      localStorage.setItem('game_verdict', JSON.stringify(verdict));
      localStorage.setItem('game_final_statement', shrunkStatement);
      setFlagRaised(true);
      setTimeout(() => navigate('/game/castle-wall'), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const shrunkWordCount = countWords(shrunkStatement);
  const overLimit = shrunkWordCount > 10;

  const stepLabels = ['DRAFT', 'TOOL TEST', 'LEARNER', 'ROOT CAUSE', 'REFINE', 'SHRINK'];

  return (
    <div className="game-screen castle-bg" style={{ minHeight: '100vh', paddingBottom: 80, color: 'var(--white)' }}>
      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>WORLD 4-1</span>
        <span>FIELD REPORT</span>
        <span>{stepLabels[step]}</span>
      </div>

      {/* Castle turrets decoration */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: 32,
              height: 48,
              background: '#4A2C1A',
              boxShadow: '-2px 0 0 var(--black), 2px 0 0 var(--black), 0 -2px 0 var(--black), 0 2px 0 var(--black)',
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px' }}>
        {step === 0 && (
          <form onSubmit={handleDraftSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.75rem', color: AMBER, textShadow: '3px 3px 0 rgba(0,0,0,0.8)', lineHeight: 2 }}>
              YOUR L&D PROBLEM<br />WORTH SOLVING IS...
            </h2>
            <textarea
              className="mario-input"
              style={{ minHeight: 160, resize: 'vertical', lineHeight: 1.8 }}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write freely. No rules here."
              autoFocus
            />
            <button type="submit" className="mario-btn mario-btn-red" disabled={!draft.trim()}>
              SHARPEN IT ▶
            </button>
          </form>
        )}

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, lineHeight: 2 }}>
              THE TOOL TEST
            </h2>
            <p className="vt323-font" style={{ fontSize: '1.3rem', color: 'var(--white)', margin: 0 }}>
              Could a tool realistically help with this — or does it need a human decision first?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="platform-option" onClick={() => handleTool('tool')}>🤖 A tool could genuinely help here</button>
              <button className="platform-option" onClick={() => handleTool('human')}>🧑 This needs human judgment first</button>
              <button className="platform-option" onClick={() => handleTool('both')}>🤝 Both — a tool that supports human judgment</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleLearnerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, lineHeight: 2 }}>
              THE LEARNER IMPACT TEST
            </h2>
            <p className="vt323-font" style={{ fontSize: '1.3rem', color: 'var(--white)', margin: 0 }}>
              If this problem was solved, what would change for a learner?
            </p>
            <input
              className="mario-input"
              placeholder="Max 80 chars..."
              value={learnerImpact}
              onChange={(e) => setLearnerImpact(e.target.value.slice(0, 80))}
              autoFocus
            />
            <button type="submit" className="mario-btn mario-btn-gold" disabled={!learnerImpact.trim()}>
              NEXT TEST ▶
            </button>
          </form>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, lineHeight: 2 }}>
              THE ROOT CAUSE TEST
            </h2>
            <p className="vt323-font" style={{ fontSize: '1.3rem', color: 'var(--white)', margin: 0 }}>
              Could this problem exist even if everyone had perfect skills and motivation?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="platform-option" onClick={() => handleRoot('structural')}>✅ Yes — it's structural/systemic</button>
              <button className="platform-option" onClick={() => handleRoot('skills')}>❌ No — it's about skills or will</button>
              <button className="platform-option" onClick={() => handleRoot('partial')}>🌀 Partially</button>
            </div>
          </div>
        )}

        {step === 4 && verdict && (
          <form onSubmit={handleAdvanceToShrink} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, lineHeight: 2 }}>
              REFINE YOUR STATEMENT
            </h2>
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: 16,
                fontFamily: 'VT323, monospace',
                fontSize: '1.2rem',
                color: '#ddd',
                boxShadow: '-2px 0 0 var(--white), 2px 0 0 var(--white), 0 -2px 0 var(--white), 0 2px 0 var(--white)',
              }}
            >
              Draft: "{draft}"
            </div>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              Write your sharpest version. Then we'll tell you how it lands.
            </p>
            <textarea
              className="mario-input"
              style={{ minHeight: 140, resize: 'vertical', lineHeight: 1.8 }}
              value={finalStatement}
              onChange={(e) => setFinalStatement(e.target.value)}
              placeholder="The problem worth solving is..."
              autoFocus
            />
            {finalStatement.trim() && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p className="mario-font" style={{ fontSize: '0.45rem', color: '#aaa', margin: 0 }}>
                  YOUR AI FITNESS VERDICT
                </p>
                <VerdictBadge verdict={verdict.verdict} showReason={verdict.reason} />
              </div>
            )}
            <button type="submit" className="mario-btn mario-btn-red" disabled={!finalStatement.trim()}>
              NOW MAKE IT SMALLER ▶
            </button>
          </form>
        )}

        {step === 5 && (
          <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.75rem', color: 'var(--mario-red)', textShadow: '3px 3px 0 rgba(0,0,0,0.8)', lineHeight: 2 }}>
              NOW MAKE IT SMALLER
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              Say it in 10 words or fewer. If you can't, you haven't found it yet.
            </p>

            {/* Show full statement above */}
            <div
              style={{
                background: 'rgba(0,0,0,0.4)',
                padding: '12px 16px',
                boxShadow: '-2px 0 0 #555, 2px 0 0 #555, 0 -2px 0 #555, 0 2px 0 #555',
              }}
            >
              <p className="mario-font" style={{ fontSize: '0.4rem', color: '#aaa', margin: '0 0 6px' }}>
                YOU WROTE:
              </p>
              <p className="vt323-font" style={{ color: '#ddd', fontSize: '1.1rem', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                "{finalStatement}"
              </p>
            </div>

            {/* Input + word counter */}
            <div style={{ position: 'relative' }}>
              <textarea
                className="mario-input"
                style={{ minHeight: 80, resize: 'none', lineHeight: 1.8, paddingRight: 72 }}
                value={shrunkStatement}
                onChange={(e) => setShrunkStatement(e.target.value)}
                placeholder="10 words. Go."
                autoFocus
              />
              {/* Counter badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  fontFamily: 'Press Start 2P, monospace',
                  fontSize: '0.7rem',
                  color: overLimit ? 'var(--mario-red)' : AMBER,
                  background: 'rgba(0,0,0,0.7)',
                  padding: '4px 8px',
                  pointerEvents: 'none',
                  transition: 'color 0.15s',
                }}
              >
                {shrunkStatement.trim() === '' ? 10 : Math.max(0, 10 - shrunkWordCount)}
              </div>
            </div>

            {overLimit && (
              <p className="vt323-font" style={{ color: 'var(--mario-red)', fontSize: '1.1rem', margin: 0 }}>
                {shrunkWordCount} words — cut {shrunkWordCount - 10} more
              </p>
            )}

            <button
              type="submit"
              className="mario-btn mario-btn-red"
              disabled={!shrunkStatement.trim() || overLimit || loading}
            >
              {loading ? 'SAVING...' : "THAT'S MY PROBLEM — RAISE THE FLAG 🚩"}
            </button>
          </form>
        )}
      </div>

      {/* Flag raising + win screen */}
      {flagRaised && (
        <div className="world-complete">
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', width: 8, height: 160, background: '#888', margin: '0 auto' }}>
              <div
                className="flag-raise"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 8,
                  width: 60,
                  height: 40,
                  background: 'var(--mario-red)',
                  boxShadow: '-2px 0 0 var(--black), 2px 0 0 var(--black), 0 -2px 0 var(--black), 0 2px 0 var(--black)',
                }}
              />
            </div>
            <h2 className="mario-font" style={{ color: AMBER, fontSize: '1.2rem', marginTop: 8 }}>
              LEVEL COMPLETE!
            </h2>
            <p className="vt323-font" style={{ color: 'var(--white)', fontSize: '1.5rem' }}>
              Your problem is on the Wall of Challenges.
            </p>
            <p className="vt323-font" style={{ color: '#aaa', fontSize: '1.2rem' }}>
              Now let's see who else is here...
            </p>
            <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="coin-shower-item"
                  style={{ position: 'relative', animationDelay: `${i * 0.08}s`, animationDuration: '0.9s' }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default World4_Castle;
