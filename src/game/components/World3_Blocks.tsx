import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import { getRandomFragment } from '../lib/enemyPool';
import '../styles/mario.css';

const World3_Blocks: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const [blockStep, setBlockStep] = useState(0); // 0 = intro, 1/2/3 = revealed
  const [b1, setB1] = useState('');
  const [b2, setB2] = useState('');
  const [b3, setB3] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [powerUpActive, setPowerUpActive] = useState(false);
  const [powerUpText, setPowerUpText] = useState('');
  const [powerUpFetched, setPowerUpFetched] = useState(false);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!playerId) { navigate('/game'); return; }
  }, []);

  // Power-up timer — fires after 30s on current block
  useEffect(() => {
    if (blockStep < 1 || blockStep > 3 || powerUpFetched) return;
    timerRef.current = setTimeout(async () => {
      const fragment = await getRandomFragment(playerId!);
      if (fragment) {
        setPowerUpText(fragment);
        setPowerUpActive(true);
        setPowerUpFetched(true);
      }
    }, 30000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [blockStep]);

  const hitBlock = () => setBlockStep((s) => s + 1);

  const handleB1 = (value: string) => {
    setB1(value);
    if (value === 'people') setShowWarning(true);
    setBlockStep(2);
  };

  const handleB2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!b2.trim()) return;
    setBlockStep(3);
  };

  const handleB3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!b3.trim()) return;
    setBlockStep(4);
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const w3data = { block1: b1, block2: b2, block3: b3 };
      localStorage.setItem('game_w3', JSON.stringify(w3data));
      await gameSupabase.from('players').update({ world: 4 }).eq('id', playerId!);
      setComplete(true);
      setTimeout(() => navigate('/game/world/4'), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="game-screen underground-bg"
      style={{ minHeight: '100vh', paddingBottom: 80, color: 'var(--white)' }}
    >
      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>WORLD 3-1</span>
        <span>HIDDEN BLOCKS</span>
        <span>BLOCK {Math.min(blockStep, 3)}/3</span>
      </div>

      {/* Torches */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 40px', marginTop: 8 }}>
        <div className="torch" />
        <div className="torch" />
      </div>

      {/* Power-up */}
      {powerUpActive && (
        <div className="power-up-brick" style={{ margin: '12px 20px' }} onClick={() => setPowerUpActive(false)}>
          ⭐ Someone in your cohort said: "{powerUpText}"
          <span style={{ marginLeft: 16, fontSize: '0.9rem', opacity: 0.7 }}>(tap to dismiss)</span>
        </div>
      )}

      {/* Warning */}
      {showWarning && (
        <div className="warning-banner" style={{ margin: '12px 20px' }}>
          💡 People problems are harder for AI to solve alone — but naming them clearly is still the work. Keep going. The sharpest problem statements often start here.
        </div>
      )}

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        {/* Intro */}
        {blockStep === 0 && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <h2 className="mario-font" style={{ fontSize: '0.8rem', color: 'var(--coin-gold)', textShadow: '3px 3px 0 rgba(0,0,0,0.8)' }}>
              THE HIDDEN BLOCKS
            </h2>
            <p className="vt323-font" style={{ fontSize: '1.3rem', color: '#ccc' }}>
              The real problem is hiding. Hit the blocks to reveal it.
            </p>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 16 }}>
              {[1, 2, 3].map((n) => (
                <div key={n} className="question-block" style={{ cursor: 'default', opacity: n === 1 ? 1 : 0.5 }}>?</div>
              ))}
            </div>
            <button className="mario-btn mario-btn-gold" onClick={hitBlock}>
              HIT BLOCK 1 ▶
            </button>
          </div>
        )}

        {/* Block 1 */}
        {blockStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="question-block hit" style={{ width: 64, height: 64, fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>!</div>
            </div>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--coin-gold)', textAlign: 'center' }}>
              THE COSTUME QUESTION
            </h2>
            <p className="vt323-font" style={{ fontSize: '1.3rem', color: 'var(--white)', textAlign: 'center', margin: 0 }}>
              Is this actually a PEOPLE problem wearing a PROCESS costume?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="platform-option" onClick={() => handleB1('people')}>
                🧠 It's about behaviour / motivation / culture
              </button>
              <button className="platform-option" onClick={() => handleB1('process')}>
                ⚙️ It's about systems / workflow / tools
              </button>
            </div>
          </div>
        )}

        {/* Block 2 */}
        {blockStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <div className="question-block hit" style={{ width: 64, height: 64 }}>!</div>
              <div className="question-block hit" style={{ width: 64, height: 64 }}>!</div>
            </div>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--coin-gold)', textAlign: 'center' }}>
              THE BENEFICIARY QUESTION
            </h2>
            <p className="vt323-font" style={{ fontSize: '1.3rem', color: 'var(--white)', textAlign: 'center', margin: 0 }}>
              Who benefits from this problem staying unsolved?
            </p>
            <form onSubmit={handleB2Submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                className="mario-input"
                placeholder="Be honest... (60 chars)"
                value={b2}
                onChange={(e) => setB2(e.target.value.slice(0, 60))}
                autoFocus
              />
              <button type="submit" className="mario-btn mario-btn-gold" disabled={!b2.trim()}>
                HIT BLOCK 3 ▶
              </button>
            </form>
          </div>
        )}

        {/* Block 3 */}
        {blockStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              {[1, 2, 3].map((n) => (
                <div key={n} className="question-block hit" style={{ width: 64, height: 64 }}>!</div>
              ))}
            </div>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--coin-gold)', textAlign: 'center' }}>
              THE VOICE QUESTION
            </h2>
            <p className="vt323-font" style={{ fontSize: '1.3rem', color: 'var(--white)', textAlign: 'center', margin: 0 }}>
              What would the person most affected say if they heard your diagnosis?
            </p>
            <form onSubmit={handleB3Submit} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <textarea
                className="mario-input"
                style={{ minHeight: 100, resize: 'vertical', lineHeight: 1.8 }}
                value={b3}
                onChange={(e) => setB3(e.target.value)}
                placeholder={`"They'd say..."`}
                autoFocus
              />
              <button type="submit" className="mario-btn mario-btn-gold" disabled={!b3.trim()}>
                HIT BLOCK 3 ▶
              </button>
            </form>
          </div>
        )}

        {/* All done — carry Block 3 answer into framing hint */}
        {blockStep === 4 && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <h2 className="mario-font" style={{ fontSize: '0.8rem', color: 'var(--coin-gold)' }}>
              ALL BLOCKS HIT!
            </h2>

            {/* Mirror of what they wrote */}
            <div style={{
              background: 'rgba(251,208,0,0.12)',
              borderLeft: '4px solid var(--coin-gold)',
              padding: '12px 16px',
              textAlign: 'left',
              width: '100%',
            }}>
              <p className="mario-font" style={{ fontSize: '0.4rem', color: 'var(--coin-gold)', margin: '0 0 6px' }}>THEY'D SAY:</p>
              <p className="vt323-font" style={{ color: 'var(--coin-gold)', fontSize: '1.2rem', margin: 0, fontStyle: 'italic' }}>
                "{b3}"
              </p>
              <p className="vt323-font" style={{ color: '#aaa', fontSize: '1rem', margin: '8px 0 0' }}>
                Hold that voice when you write your problem statement.
              </p>
            </div>

            <p className="vt323-font" style={{ fontSize: '1.3rem', color: '#ccc' }}>
              Now it's time to write it down.
            </p>
            <button className="mario-btn mario-btn-red" onClick={handleFinish} disabled={loading}>
              {loading ? 'SAVING...' : 'FIELD REPORT ▶'}
            </button>
          </div>
        )}
      </div>

      {complete && (
        <div className="world-complete">
          <h2 className="mario-font" style={{ color: 'var(--coin-gold)', fontSize: '1.5rem', textAlign: 'center' }}>
            WORLD 3<br />COMPLETE!
          </h2>
          <p className="vt323-font" style={{ color: 'var(--white)', fontSize: '1.5rem' }}>
            Blocks cleared ✓
          </p>
        </div>
      )}
    </div>
  );
};

export default World3_Blocks;
