import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import '../styles/mario.css';

const Q1_OPTIONS = [
  { emoji: '🏢', label: 'Corporate L&D' },
  { emoji: '🎓', label: 'Education / Training institute' },
  { emoji: '🧩', label: 'Freelance / Consultant' },
  { emoji: '🌀', label: 'Hybrid / Other' },
];

const Q2_OPTIONS = [
  { emoji: '👶', label: 'New hires / Onboarding' },
  { emoji: '🧑‍💼', label: 'Managers / Leaders' },
  { emoji: '🔬', label: 'Specialists / Experts' },
  { emoji: '🧑‍🎓', label: 'Teachers / Students' },
  { emoji: '🌍', label: 'Everyone / Mixed' },
];

const Q4_OPTIONS = [
  { emoji: '⏱', label: 'Time' },
  { emoji: '🧠', label: 'SME access' },
  { emoji: '💰', label: 'Budget' },
  { emoji: '📊', label: 'Data / Evidence' },
  { emoji: '👀', label: 'Stakeholder buy-in' },
];

interface CoinPop {
  id: number;
  x: number;
  y: number;
}

// steps: 0=where do you work, 1=who design for, 2=one word, 3=never enough, 4=something isn't working, 5=summary
const TOTAL_STEPS = 5;

const World1_Terrain: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const [step, setStep] = useState(0);
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState(''); // "something isn't working"
  const [coins, setCoins] = useState<CoinPop[]>([]);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const coinId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!playerId) { navigate('/game'); return null; }

  const popCoin = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    const id = ++coinId.current;
    setCoins((c) => [
      ...c,
      { id, x: rect.left - containerRect.left + rect.width / 2, y: rect.top - containerRect.top },
    ]);
    setTimeout(() => setCoins((c) => c.filter((coin) => coin.id !== id)), 700);
  };

  const selectAndAdvance = (setter: (v: string) => void, value: string, e: React.MouseEvent) => {
    setter(value);
    popCoin(e);
    setTimeout(() => setStep((s) => s + 1), 400);
  };

  const handleQ3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q3.trim()) return;
    setStep(3);
  };

  const handleQ5Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q5.trim()) return;
    setStep(5);
  };

  const handleFinish = async (e: React.MouseEvent) => {
    popCoin(e);
    setLoading(true);
    const tags = { workplace: q1, audience: q2, reality: q3, challenge: q4, situation: q5 };
    try {
      await gameSupabase
        .from('players')
        .update({ context_tags: tags, world: 2 })
        .eq('id', playerId);
      localStorage.setItem('game_context_tags', JSON.stringify(tags));
      setComplete(true);
      setTimeout(() => navigate('/game/world/2'), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="game-screen sky-bg"
      style={{ position: 'relative', minHeight: '100vh', paddingBottom: 80 }}
    >
      {/* Coin pops */}
      {coins.map((c) => (
        <div key={c.id} className="coin-pop" style={{ left: c.x, top: c.y }} />
      ))}

      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>WORLD 1-1</span>
        <span>YOUR CONTEXT</span>
        <span>STEP {step + 1}/{TOTAL_STEPS}</span>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px', position: 'relative', zIndex: 2 }}>

        {/* Step 0 — Where do you work */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.8rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)', marginBottom: 4 }}>
              WHERE DO YOU WORK?
            </h2>
            <p className="vt323-font" style={{ color: 'var(--coin-gold)', fontSize: '1.3rem', margin: 0 }}>
              Jump to your platform!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Q1_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  className={`platform-option ${q1 === opt.label ? 'selected' : ''}`}
                  onClick={(e) => selectAndAdvance(setQ1, opt.label, e)}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — Who do you design for */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.7rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              WHO DO YOU DESIGN FOR MOST?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Q2_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  className={`platform-option ${q2 === opt.label ? 'selected' : ''}`}
                  onClick={(e) => selectAndAdvance(setQ2, opt.label, e)}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — One word */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.7rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              YOUR L&D REALITY IN ONE WORD
            </h2>
            <p className="vt323-font" style={{ color: 'var(--coin-gold)', fontSize: '1.2rem', margin: 0 }}>
              Max 20 characters. This word goes on your final artifact.
            </p>
            <form onSubmit={handleQ3Submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                className="mario-input"
                value={q3}
                onChange={(e) => setQ3(e.target.value.slice(0, 20))}
                placeholder="CHAOTIC..."
                autoFocus
              />
              <button type="submit" className="mario-btn mario-btn-gold" disabled={!q3.trim()}>
                JUMP ▶
              </button>
            </form>
          </div>
        )}

        {/* Step 3 — Never enough of */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.6rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              THE ONE THING YOU NEVER HAVE ENOUGH OF?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Q4_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  className={`platform-option ${q4 === opt.label ? 'selected' : ''}`}
                  onClick={(e) => {
                    setQ4(opt.label);
                    popCoin(e);
                    setTimeout(() => setStep(4), 400);
                  }}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Something isn't working */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.75rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              SOMETHING ISN'T WORKING
            </h2>
            <p className="vt323-font" style={{ color: 'var(--coin-gold)', fontSize: '1.4rem', margin: 0 }}>
              Don't fix it yet. Just look at it.
            </p>
            <form onSubmit={handleQ5Submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <textarea
                className="mario-input"
                style={{ minHeight: 120, resize: 'vertical', lineHeight: 1.8 }}
                value={q5}
                onChange={(e) => setQ5(e.target.value)}
                placeholder="Describe what you keep running into..."
                autoFocus
              />
              <button type="submit" className="mario-btn mario-btn-gold" disabled={!q5.trim()}>
                I SEE IT ▶
              </button>
            </form>
          </div>
        )}

        {/* Step 5 — Summary */}
        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', textAlign: 'center' }}>
            <h2 className="mario-font" style={{ fontSize: '0.8rem', color: 'var(--coin-gold)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              CONTEXT MAPPED!
            </h2>
            <div className="vt323-font" style={{ fontSize: '1.2rem', color: 'var(--white)', display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left', width: '100%' }}>
              <p>🏢 {q1}</p>
              <p>👥 {q2}</p>
              <p>💬 "{q3}"</p>
              <p>⚡ {q4}</p>
              <p>🔍 "{q5}"</p>
            </div>
            <button className="mario-btn mario-btn-red" onClick={handleFinish} disabled={loading}>
              {loading ? 'SAVING...' : 'CONTINUE TO THE DIG ▶'}
            </button>
          </div>
        )}
      </div>

      {/* World complete overlay */}
      {complete && (
        <div className="world-complete">
          <h2 className="mario-font" style={{ color: 'var(--coin-gold)', fontSize: '1.5rem', textAlign: 'center' }}>
            WORLD 1<br />COMPLETE!
          </h2>
          <p className="vt323-font" style={{ color: 'var(--white)', fontSize: '1.5rem' }}>
            Context mapped ✓
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="coin-shower-item"
                style={{ left: `${20 + i * 8}%`, animationDelay: `${i * 0.1}s`, position: 'relative' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default World1_Terrain;
