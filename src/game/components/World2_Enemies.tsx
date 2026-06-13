import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import '../styles/mario.css';

// steps:
// 0 — Name your challenge
// 1 — Choose your problem to dig
// 2 — Why is this happening?
// 3 — Does this happen more than once a month?

const AMBER = 'var(--coin-gold)';

const World2_Enemies: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const [step, setStep] = useState(0);
  const [challenge, setChallenge] = useState('');
  const [extraChallenges, setExtraChallenges] = useState(['', '']);
  const [chosenChallenge, setChosenChallenge] = useState('');
  const [whyHappening, setWhyHappening] = useState('');
  const [repetitionNudgeVisible, setRepetitionNudgeVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!playerId) { navigate('/game'); }
  }, []);

  const handleChallengesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge.trim()) return;
    setStep(1);
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const allChallenges = [challenge, ...extraChallenges].filter(Boolean);
      const inserts = allChallenges.map((b) => ({
        player_id: playerId!,
        blocker_text: b,
        world_origin: 2,
      }));
      await gameSupabase.from('enemies').insert(inserts);
      await gameSupabase.from('players').update({ world: 3 }).eq('id', playerId!);
      localStorage.setItem('game_chosen_challenge', chosenChallenge);
      localStorage.setItem('game_root_cause_why', whyHappening);
      setComplete(true);
      setTimeout(() => navigate('/game/world/3'), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const digOptions = [challenge, ...extraChallenges].filter((c) => c.trim());

  const stepLabel = ['NAME IT', 'CHOOSE', 'WHY?', 'RECURRING?'][step] ?? 'RECURRING?';

  return (
    <div className="game-screen" style={{ background: '#5C94FC', minHeight: '100vh', paddingBottom: 80 }}>
      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>WORLD 2-1</span>
        <span>THE DIG</span>
        <span>{stepLabel}</span>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px' }}>

        {/* Step 0 — Name your challenge */}
        {step === 0 && (
          <form onSubmit={handleChallengesSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.7rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              NAME YOUR CHALLENGE
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0 }}>
              What's the problem that keeps coming back?
            </p>
            <p className="vt323-font" style={{ color: '#aaa', fontSize: '1rem', margin: 0 }}>
              Only your final statement will be shared with others at the end — nothing before that is visible.
            </p>
            <input
              className="mario-input"
              placeholder="The thing that comes back every time..."
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              autoFocus
            />
            {challenge.trim() && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="mario-font" style={{ fontSize: '0.4rem', color: '#aaa', margin: 0 }}>
                  GOT MORE? (OPTIONAL)
                </p>
                {extraChallenges.map((val, i) => (
                  <input
                    key={i}
                    className="mario-input"
                    placeholder={i === 0 ? 'The thing that slows everything down...' : 'The thing nobody talks about but everyone feels...'}
                    value={val}
                    onChange={(e) => {
                      const next = [...extraChallenges];
                      next[i] = e.target.value;
                      setExtraChallenges(next);
                    }}
                  />
                ))}
              </div>
            )}
            <button type="submit" className="mario-btn mario-btn-red" disabled={!challenge.trim() || loading}>
              DIG DEEPER ▶
            </button>
          </form>
        )}

        {/* Step 1 — Choose your problem to dig */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)', lineHeight: 2 }}>
              CHOOSE YOUR PROBLEM TO DIG
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              You can't dig everywhere. Pick one.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {digOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { setChosenChallenge(opt); setStep(2); }}
                  style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '1.3rem',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'var(--white)',
                    border: 'none',
                    padding: '20px 24px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: '-4px 0 0 0 var(--white), 4px 0 0 0 var(--white), 0 -4px 0 0 var(--white), 0 4px 0 0 var(--white)',
                    lineHeight: 1.4,
                  }}
                >
                  {opt.length > 80 ? opt.slice(0, 80) + '...' : opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Why is this happening? */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.7rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              WHY IS THIS HAPPENING?
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              Don't explain. Describe.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.4)', borderLeft: '4px solid #555', padding: '12px 16px' }}>
              <p className="mario-font" style={{ fontSize: '0.4rem', color: '#aaa', margin: '0 0 6px' }}>YOU PICKED:</p>
              <p className="vt323-font" style={{ color: '#ddd', fontSize: '1.1rem', margin: 0, fontStyle: 'italic' }}>
                "{chosenChallenge}"
              </p>
            </div>
            <textarea
              className="mario-input"
              style={{ minHeight: 120, resize: 'vertical', lineHeight: 1.8 }}
              value={whyHappening}
              onChange={(e) => setWhyHappening(e.target.value)}
              placeholder="Because..."
              autoFocus
            />
            <button
              className="mario-btn mario-btn-gold"
              disabled={!whyHappening.trim()}
              onClick={() => setStep(3)}
            >
              DIG DEEPER ▶
            </button>
          </div>
        )}

        {/* Step 3 — Recurring? */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--mario-red)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)', lineHeight: 2 }}>
              DOES THIS HAPPEN MORE THAN ONCE A MONTH?
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              AI is only worth building for things that keep coming back.
            </p>

            {repetitionNudgeVisible ? (
              <div style={{ background: 'rgba(0,0,0,0.5)', borderLeft: '4px solid var(--coin-gold)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p className="vt323-font" style={{ color: AMBER, fontSize: '1.2rem', margin: 0 }}>
                  One-off problems rarely need AI. Is there a recurring version of this? If yes, that's your real problem.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button
                    className="mario-btn mario-btn-gold"
                    style={{ fontSize: '0.45rem' }}
                    onClick={() => { setRepetitionNudgeVisible(false); handleFinish(); }}
                    disabled={loading}
                  >
                    {loading ? 'SAVING...' : 'GOT IT — KEEP GOING'}
                  </button>
                  <button
                    className="mario-btn mario-btn-dark"
                    style={{ fontSize: '0.45rem' }}
                    onClick={() => { setRepetitionNudgeVisible(false); setStep(1); }}
                  >
                    GOT IT — GO BACK
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button className="platform-option" onClick={() => handleFinish()} disabled={loading}>
                  {loading ? 'SAVING...' : "✅ Yes — it's recurring"}
                </button>
                <button className="platform-option" onClick={() => setRepetitionNudgeVisible(true)}>
                  🔁 Not really — it's more of a one-off
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {complete && (
        <div className="world-complete">
          <h2 className="mario-font" style={{ color: 'var(--coin-gold)', fontSize: '1.5rem', textAlign: 'center' }}>
            WORLD 2<br />COMPLETE!
          </h2>
          <p className="vt323-font" style={{ color: 'var(--white)', fontSize: '1.5rem' }}>
            Problem named ✓
          </p>
        </div>
      )}
    </div>
  );
};

export default World2_Enemies;
