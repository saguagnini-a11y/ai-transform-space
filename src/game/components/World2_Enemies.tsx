import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import { getRandomEnemies } from '../lib/enemyPool';
import '../styles/mario.css';

interface ImportedChallenge {
  id: string;
  blocker_text: string;
  kept: boolean | null;
}

// steps:
// 0 — Name your challenges (3 fields)
// 1 — Cohort challenges (imported)
// 2 — Choose your problem to dig
// 3 — Why is this happening?
// 4 — Who's in the room?
// 5 — If you fixed it tomorrow...
// 6 — Pick your root cause

const AMBER = 'var(--coin-gold)';

const InputScreen: React.FC<{
  header: string;
  subtitle: string;
  placeholder: string;
  advanceLabel: string;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  multiline?: boolean;
}> = ({ header, subtitle, placeholder, advanceLabel, value, onChange, onSubmit, multiline }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <h2 className="mario-font" style={{ fontSize: '0.7rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)', lineHeight: 2 }}>
      {header}
    </h2>
    <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
      {subtitle}
    </p>
    {multiline ? (
      <textarea
        className="mario-input"
        style={{ minHeight: 120, resize: 'vertical', lineHeight: 1.8 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
      />
    ) : (
      <input
        className="mario-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
      />
    )}
    <button className="mario-btn mario-btn-gold" disabled={!value.trim()} onClick={onSubmit}>
      {advanceLabel}
    </button>
  </div>
);

const World2_Enemies: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const [step, setStep] = useState(0);
  const [challenges, setChallenges] = useState(['', '', '']);
  const [importedChallenges, setImportedChallenges] = useState<ImportedChallenge[]>([]);
  const [chosenChallenge, setChosenChallenge] = useState('');
  const [whyHappening, setWhyHappening] = useState('');
  const [whoInRoom, setWhoInRoom] = useState('');
  const [stillBroken, setStillBroken] = useState('');
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!playerId) { navigate('/game'); return; }
  }, []);

  const handleChallengesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filled = challenges.filter((c) => c.trim());
    if (filled.length === 0) return;
    setLoading(true);
    try {
      const imported = await getRandomEnemies(playerId!, 2);
      setImportedChallenges(imported.map((e) => ({ id: e.id, blocker_text: e.blocker_text, kept: null })));
      setStep(1);
    } catch {
      setImportedChallenges([]);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleImportedDecision = (id: string, kept: boolean) => {
    setImportedChallenges((prev) => prev.map((e) => (e.id === id ? { ...e, kept } : e)));
  };

  const allDecided = importedChallenges.length === 0 || importedChallenges.every((e) => e.kept !== null);

  const handleFinish = async () => {
    setLoading(true);
    try {
      const inserts = challenges
        .filter(Boolean)
        .map((b) => ({ player_id: playerId!, blocker_text: b, world_origin: 2 }));
      await gameSupabase.from('enemies').insert(inserts);
      await gameSupabase.from('players').update({ world: 3 }).eq('id', playerId!);
      localStorage.setItem('game_chosen_challenge', chosenChallenge);
      localStorage.setItem('game_root_cause_why', whyHappening);
      localStorage.setItem('game_root_cause_who', whoInRoom);
      localStorage.setItem('game_still_broken', stillBroken);
      setComplete(true);
      setTimeout(() => navigate('/game/world/3'), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Candidates for "Choose your problem to dig"
  const digOptions = challenges.filter((c) => c.trim());

  return (
    <div
      className="game-screen"
      style={{ background: '#5C94FC', minHeight: '100vh', paddingBottom: 80 }}
    >
      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>WORLD 2-1</span>
        <span>THE DIG</span>
        <span>STEP {step + 1}/7</span>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px' }}>

        {/* Step 0 — Name your challenges */}
        {step === 0 && (
          <form onSubmit={handleChallengesSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.7rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              NAME YOUR CHALLENGES
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0 }}>
              You can't fight what you won't name.
            </p>
            {[
              'The thing that comes back every time...',
              'The thing that slows everything down...',
              'The thing nobody talks about but everyone feels...',
            ].map((placeholder, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label className="mario-font" style={{ fontSize: '0.45rem', color: '#ccc' }}>
                  CHALLENGE {i + 1}
                </label>
                <input
                  className="mario-input"
                  placeholder={placeholder}
                  value={challenges[i]}
                  onChange={(e) => {
                    const next = [...challenges];
                    next[i] = e.target.value;
                    setChallenges(next);
                  }}
                />
              </div>
            ))}
            <button
              type="submit"
              className="mario-btn mario-btn-red"
              disabled={!challenges.some((c) => c.trim()) || loading}
            >
              {loading ? 'LOADING...' : 'DIG DEEPER ▶'}
            </button>
          </form>
        )}

        {/* Step 1 — Cohort challenges */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {importedChallenges.length > 0 && (
              <>
                <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
                  FROM YOUR COHORT
                </h2>
                <p className="vt323-font" style={{ color: '#88AAFF', fontSize: '1.2rem', margin: 0 }}>
                  Someone in your cohort faces these too.
                </p>
                {importedChallenges.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(0,0,100,0.4)',
                      padding: 16,
                      boxShadow: '-2px 0 0 var(--white), 2px 0 0 var(--white), 0 -2px 0 var(--white), 0 2px 0 var(--white)',
                    }}
                  >
                    <p className="vt323-font" style={{ color: '#88AAFF', fontSize: '1.3rem', margin: '0 0 12px' }}>
                      👤 "{item.blocker_text}"
                    </p>
                    {item.kept === null && (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button className="mario-btn mario-btn-green" style={{ fontSize: '0.6rem' }} onClick={() => handleImportedDecision(item.id, true)}>
                          ✓ Keep
                        </button>
                        <button className="mario-btn mario-btn-dark" style={{ fontSize: '0.6rem' }} onClick={() => handleImportedDecision(item.id, false)}>
                          ✕ Not relevant
                        </button>
                      </div>
                    )}
                    {item.kept !== null && (
                      <span className="mario-font" style={{ fontSize: '0.45rem', color: item.kept ? 'var(--grass-green)' : '#888' }}>
                        {item.kept ? '✓ KEPT' : '✕ DISMISSED'}
                      </span>
                    )}
                  </div>
                ))}
              </>
            )}
            {(allDecided || importedChallenges.length === 0) && (
              <button className="mario-btn mario-btn-gold" onClick={() => setStep(2)}>
                DIG DEEPER ▶
              </button>
            )}
          </div>
        )}

        {/* Step 2 — Choose your problem to dig */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)', lineHeight: 2 }}>
              CHOOSE YOUR PROBLEM TO DIG
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              You can't dig everywhere. Pick one that's keeping you awake at night.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {digOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { setChosenChallenge(opt); setStep(3); }}
                  style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '1.3rem',
                    background: chosenChallenge === opt ? 'var(--coin-gold)' : 'rgba(0,0,0,0.5)',
                    color: chosenChallenge === opt ? 'var(--black)' : 'var(--white)',
                    border: 'none',
                    padding: '20px 24px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: '-4px 0 0 0 var(--white), 4px 0 0 0 var(--white), 0 -4px 0 0 var(--white), 0 4px 0 0 var(--white)',
                    transition: 'background 0.15s',
                    lineHeight: 1.4,
                  }}
                >
                  {opt.length > 60 ? opt.slice(0, 60) + '...' : opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Why is this happening? */}
        {step === 3 && (
          <InputScreen
            header="WHY IS THIS HAPPENING?"
            subtitle="Don't explain. Describe."
            placeholder="Because..."
            advanceLabel="DIG DEEPER ▶"
            value={whyHappening}
            onChange={setWhyHappening}
            multiline
            onSubmit={() => setStep(4)}
          />
        )}

        {/* Step 4 — Who's in the room? */}
        {step === 4 && (
          <InputScreen
            header="WHO'S IN THE ROOM?"
            subtitle="Name the last time this went wrong. Who was there? Who owned it?"
            placeholder="The people involved are..."
            advanceLabel="DIG DEEPER ▶"
            value={whoInRoom}
            onChange={setWhoInRoom}
            multiline
            onSubmit={() => setStep(5)}
          />
        )}

        {/* Step 5 — If you fixed it tomorrow */}
        {step === 5 && (
          <InputScreen
            header="IF YOU FIXED IT TOMORROW, WHAT WOULD STILL BE BROKEN?"
            subtitle="This tells you whether you found the root — or just a symptom."
            placeholder="Even if I fixed this, I'd still have..."
            advanceLabel="THAT'S THE ROOT ▶"
            value={stillBroken}
            onChange={setStillBroken}
            multiline
            onSubmit={() => setStep(6)}
          />
        )}

        {/* Step 6 — Pick your root cause */}
        {step === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--mario-red)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)', lineHeight: 2 }}>
              PICK YOUR ROOT CAUSE
            </h2>

            {/* Summary card from last answer */}
            <div
              style={{
                background: 'rgba(251,208,0,0.15)',
                borderLeft: '4px solid var(--coin-gold)',
                padding: '12px 16px',
              }}
            >
              <p className="mario-font" style={{ fontSize: '0.4rem', color: AMBER, margin: '0 0 6px' }}>
                YOUR DIG FOUND:
              </p>
              <p className="vt323-font" style={{ color: 'var(--white)', fontSize: '1.2rem', margin: 0, fontStyle: 'italic' }}>
                "{stillBroken}"
              </p>
            </div>

            <p className="vt323-font" style={{ color: 'var(--white)', fontSize: '1.3rem', margin: 0 }}>
              Which one of your challenges is the real root cause — the one behind the others?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {digOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setChosenChallenge(opt);
                  }}
                  style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '1.3rem',
                    background: chosenChallenge === opt ? 'var(--coin-gold)' : 'rgba(0,0,0,0.5)',
                    color: chosenChallenge === opt ? 'var(--black)' : 'var(--white)',
                    border: 'none',
                    padding: '20px 24px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: '-4px 0 0 0 var(--white), 4px 0 0 0 var(--white), 0 -4px 0 0 var(--white), 0 4px 0 0 var(--white)',
                    transition: 'background 0.15s',
                    lineHeight: 1.4,
                  }}
                >
                  {opt.length > 60 ? opt.slice(0, 60) + '...' : opt}
                </button>
              ))}
            </div>

            {chosenChallenge && (
              <button
                className="mario-btn mario-btn-red"
                onClick={handleFinish}
                disabled={loading}
              >
                {loading ? 'SAVING...' : 'SOLVE THIS CHALLENGE ▶'}
              </button>
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
            Root cause identified ✓
          </p>
        </div>
      )}
    </div>
  );
};

export default World2_Enemies;
