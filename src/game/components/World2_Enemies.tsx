import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import { getRandomEnemies } from '../lib/enemyPool';
import '../styles/mario.css';

interface ImportedEnemy {
  id: string;
  blocker_text: string;
  kept: boolean | null;
}

const GoombaSprite: React.FC<{ label: string; imported?: boolean; boss?: boolean; onClick?: () => void }> = ({
  label, imported, boss, onClick,
}) => (
  <div
    className={`enemy-sprite ${imported ? 'enemy-imported' : ''}`}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default', position: 'relative' }}
  >
    {boss && <div className="boss-crown" />}
    <div className="goomba-head">
      <div style={{ position: 'absolute', top: 8, left: 10, width: 8, height: 8, background: 'white', boxShadow: '12px 0 0 white' }} />
      <div style={{ position: 'absolute', bottom: 6, left: 6, width: 16, height: 4, background: 'var(--black)' }} />
    </div>
    <div className="goomba-feet">
      <div className="goomba-foot" />
      <div className="goomba-foot" />
    </div>
    <div className="enemy-label">{label}</div>
    {imported && (
      <div style={{ fontFamily: 'VT323, monospace', fontSize: '0.75rem', color: '#88AAFF' }}>👤 cohort</div>
    )}
  </div>
);

const World2_Enemies: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const [step, setStep] = useState(0);
  const [blockers, setBlockers] = useState(['', '', '']);
  const [importedEnemies, setImportedEnemies] = useState<ImportedEnemy[]>([]);
  const [boss, setBoss] = useState('');
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!playerId) { navigate('/game'); return; }
  }, []);

  const handleBlockersSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockers[0].trim() || !blockers[1].trim() || !blockers[2].trim()) return;
    setLoading(true);
    try {
      const imported = await getRandomEnemies(playerId!, 2);
      setImportedEnemies(imported.map((e) => ({ id: e.id, blocker_text: e.blocker_text, kept: null })));
      setStep(1);
    } catch (err) {
      setImportedEnemies([]);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleImportedDecision = (id: string, kept: boolean) => {
    setImportedEnemies((prev) => prev.map((e) => (e.id === id ? { ...e, kept } : e)));
  };

  const allDecided = importedEnemies.length === 0 || importedEnemies.every((e) => e.kept !== null);

  const allCandidates = [
    ...blockers.filter(Boolean).map((b, i) => ({ id: `own-${i}`, label: b, own: true })),
    ...importedEnemies.filter((e) => e.kept === true).map((e) => ({ id: e.id, label: e.blocker_text, own: false })),
  ];

  const handleFinish = async () => {
    setLoading(true);
    try {
      const inserts = blockers
        .filter(Boolean)
        .map((b) => ({ player_id: playerId!, blocker_text: b, world_origin: 2 }));
      await gameSupabase.from('enemies').insert(inserts);
      await gameSupabase.from('players').update({ world: 3 }).eq('id', playerId!);
      localStorage.setItem('game_boss_enemy', boss);
      setComplete(true);
      setTimeout(() => navigate('/game/world/3'), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="game-screen"
      style={{ background: '#5C94FC', minHeight: '100vh', paddingBottom: 80 }}
    >
      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>WORLD 2-1</span>
        <span>THE ENEMIES</span>
        <span>STEP {step + 1}/3</span>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px' }}>
        {step === 0 && (
          <form onSubmit={handleBlockersSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.75rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              NAME YOUR ENEMIES
            </h2>
            <p className="vt323-font" style={{ color: 'var(--coin-gold)', fontSize: '1.3rem', margin: 0 }}>
              You can't fight what you won't face.
            </p>

            {[
              'The thing that comes back every time...',
              'The thing that slows everything down...',
              "The thing nobody talks about but everyone feels...",
            ].map((placeholder, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label className="mario-font" style={{ fontSize: '0.45rem', color: '#ccc' }}>
                  ENEMY {i + 1}
                </label>
                <input
                  className="mario-input"
                  placeholder={placeholder}
                  value={blockers[i]}
                  onChange={(e) => {
                    const next = [...blockers];
                    next[i] = e.target.value;
                    setBlockers(next);
                  }}
                />
              </div>
            ))}

            <button
              type="submit"
              className="mario-btn mario-btn-red"
              disabled={!blockers[0].trim() || !blockers[1].trim() || !blockers[2].trim() || loading}
            >
              {loading ? 'LOADING...' : 'SPAWN ENEMIES ▶'}
            </button>
          </form>
        )}

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {importedEnemies.length > 0 && (
              <>
                <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
                  IMPORTED ENEMIES
                </h2>
                <p className="vt323-font" style={{ color: '#88AAFF', fontSize: '1.2rem', margin: 0 }}>
                  Someone in your cohort faces these too.
                </p>
                {importedEnemies.map((enemy) => (
                  <div
                    key={enemy.id}
                    style={{
                      background: 'rgba(0,0,100,0.4)',
                      padding: 16,
                      boxShadow: '-2px 0 0 var(--white), 2px 0 0 var(--white), 0 -2px 0 var(--white), 0 2px 0 var(--white)',
                    }}
                  >
                    <p className="vt323-font" style={{ color: '#88AAFF', fontSize: '1.3rem', margin: '0 0 12px' }}>
                      👤 "{enemy.blocker_text}"
                    </p>
                    {enemy.kept === null && (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button className="mario-btn mario-btn-green" style={{ fontSize: '0.6rem' }} onClick={() => handleImportedDecision(enemy.id, true)}>
                          ✓ Keep
                        </button>
                        <button className="mario-btn mario-btn-dark" style={{ fontSize: '0.6rem' }} onClick={() => handleImportedDecision(enemy.id, false)}>
                          ✕ Not relevant
                        </button>
                      </div>
                    )}
                    {enemy.kept !== null && (
                      <span className="mario-font" style={{ fontSize: '0.45rem', color: enemy.kept ? 'var(--grass-green)' : '#888' }}>
                        {enemy.kept ? '✓ KEPT' : '✕ DISMISSED'}
                      </span>
                    )}
                  </div>
                ))}
              </>
            )}

            {allDecided && (
              <button className="mario-btn mario-btn-gold" onClick={() => setStep(2)}>
                PICK YOUR BOSS ▶
              </button>
            )}

            {importedEnemies.length === 0 && (
              <button className="mario-btn mario-btn-gold" onClick={() => setStep(2)}>
                PICK YOUR BOSS ▶
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--mario-red)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              PICK YOUR BOSS ENEMY
            </h2>
            <p className="vt323-font" style={{ color: 'var(--white)', fontSize: '1.3rem', margin: 0 }}>
              Which one is the REAL blocker — the one behind the others?
            </p>

            {/* Enemies parade */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', padding: '16px 0' }}>
              {allCandidates.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setBoss(c.label)}
                  style={{
                    outline: boss === c.label ? '4px solid var(--coin-gold)' : 'none',
                    padding: 12,
                    background: boss === c.label ? 'rgba(251,208,0,0.2)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <GoombaSprite label={c.label} boss={boss === c.label} />
                </div>
              ))}
            </div>

            {boss && (
              <button
                className="mario-btn mario-btn-red"
                onClick={handleFinish}
                disabled={loading}
              >
                {loading ? 'SAVING...' : `FIGHT "${boss.slice(0, 20)}..." ▶`}
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
            Boss identified ✓
          </p>
        </div>
      )}
    </div>
  );
};

export default World2_Enemies;
