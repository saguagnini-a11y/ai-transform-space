import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import '../styles/mario.css';

// steps:
// 0 — Name your challenge(s)
// 1 — Quick-scan: rate each challenge (gold/silver/red) before picking — NEW
// 2 — Choose your problem to dig (now shows tier badges)
// 3 — Why is this happening?
// 4 — Does this happen more than once a month?

const AMBER = 'var(--coin-gold)';

type Tier = 'gold' | 'silver' | 'red';

const STUCK_OPTIONS: { tier: Tier; emoji: string; label: string; color: string }[] = [
  { tier: 'red',    emoji: '🔴', label: 'Very stuck — this blocks real work',          color: '#e94560' },
  { tier: 'silver', emoji: '🟡', label: 'Somewhat stuck — it slows things, we manage', color: '#c8c8c8' },
  { tier: 'gold',   emoji: '🟢', label: 'More of an itch — bothers me but not critical', color: '#fbd000' },
];

const TIER_LABEL: Record<Tier, string> = {
  red:    '🔴 Very stuck',
  silver: '🟡 Somewhat stuck',
  gold:   '🟢 More of an itch',
};

const World2_Enemies: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const [step, setStep] = useState(0);
  const [challenge, setChallenge] = useState('');
  const [extraChallenges, setExtraChallenges] = useState(['', '']);
  // tier per challenge index (0, 1, 2)
  const [challengeTiers, setChallengeTiers] = useState<Record<number, Tier>>({});
  const [chosenChallenge, setChosenChallenge] = useState('');
  const [whyHappening, setWhyHappening] = useState('');
  const [repetitionNudgeVisible, setRepetitionNudgeVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const STEP_TITLES = [
    'Name your challenge | AI Problem Finder',
    'Quick scan | AI Problem Finder',
    'Choose your problem | AI Problem Finder',
    'Why is this happening? | AI Problem Finder',
    'Recurring? | AI Problem Finder',
  ];
  useEffect(() => { document.title = STEP_TITLES[step] ?? 'World 2 | AI Problem Finder'; }, [step]);
  useEffect(() => { if (!playerId) { navigate('/game'); } }, []);

  const handleChallengesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge.trim()) return;
    setChallengeTiers({});
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
      // save chosen tier so World 3 can use it for initial hint
      const idx = digOptions.indexOf(chosenChallenge);
      if (idx >= 0 && challengeTiers[idx]) {
        localStorage.setItem('game_chosen_tier', challengeTiers[idx]);
      }
      setComplete(true);
      setTimeout(() => navigate('/game/world/3'), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const digOptions = [challenge, ...extraChallenges].filter((c) => c.trim());
  const allScanned = digOptions.length > 0 && Object.keys(challengeTiers).length === digOptions.length;

  const stepLabel = ['NAME IT', 'SCAN', 'CHOOSE', 'WHY?', 'RECURRING?'][step] ?? 'RECURRING?';

  const tierColor = (t: Tier) => ({ gold: '#fbd000', silver: '#c8c8c8', red: '#e94560' }[t]);

  return (
    <div className="game-screen" style={{ background: '#5C94FC', minHeight: '100vh', paddingBottom: 80 }}>
      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>WORLD 2-1</span>
        <span>THE DIG</span>
        <span>{stepLabel}</span>
      </div>

      <main style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px' }}>

        {/* Step 0 — Name your challenges */}
        {step === 0 && (
          <form onSubmit={handleChallengesSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h1 className="mario-font" style={{ fontSize: '0.7rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              NAME YOUR CHALLENGES
            </h1>
            <p className="vt323-font" style={{ color: '#1a1a2e', fontSize: '1.3rem', margin: 0 }}>
              Name three problems that keep coming back. You'll rate them all, then pick one to dig into.
            </p>
            <p className="vt323-font" style={{ color: '#1a1a2e', fontSize: '1rem', margin: 0 }}>
              Only your final statement will be shared with others at the end — nothing before that is visible.
            </p>
            <input
              className="mario-input"
              placeholder="The thing that comes back every time..."
              aria-label="First challenge"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              autoFocus
            />
            {extraChallenges.map((val, i) => (
              <input
                key={i}
                className="mario-input"
                placeholder={i === 0 ? 'The thing that slows everything down...' : 'The thing nobody talks about but everyone feels...'}
                aria-label={i === 0 ? 'Second challenge' : 'Third challenge'}
                value={val}
                onChange={(e) => {
                  const next = [...extraChallenges];
                  next[i] = e.target.value;
                  setExtraChallenges(next);
                }}
              />
            ))}
            <button type="submit" className="mario-btn mario-btn-red" disabled={!challenge.trim() || !extraChallenges[0].trim() || !extraChallenges[1].trim() || loading}>
              DIG DEEPER ▶
            </button>
          </form>
        )}

        {/* Step 1 — Quick scan: rate each challenge */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h2 className="mario-font" style={{ fontSize: '0.6rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)', lineHeight: 2 }}>
              QUICK SCAN
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              Rate how stuck each one makes you. Then pick one to dig.
            </p>

            {digOptions.map((opt, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  borderLeft: challengeTiers[i]
                    ? `5px solid ${tierColor(challengeTiers[i])}`
                    : '5px solid rgba(255,255,255,0.2)',
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'border-color 0.2s',
                }}
              >
                <p className="vt323-font" style={{ color: '#fff', fontSize: '1.2rem', margin: 0, lineHeight: 1.4 }}>
                  {opt.length > 100 ? opt.slice(0, 100) + '...' : opt}
                </p>
                <p className="mario-font" style={{ fontSize: '0.35rem', color: '#aaa', margin: 0 }}>
                  HOW STUCK DOES THIS MAKE YOU FEEL?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {STUCK_OPTIONS.map(({ tier, emoji, label, color }) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setChallengeTiers((prev) => ({ ...prev, [i]: tier }))}
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.15rem',
                        background: challengeTiers[i] === tier ? `rgba(0,0,0,0.7)` : 'rgba(0,0,0,0.2)',
                        color: challengeTiers[i] === tier ? color : '#bbb',
                        border: challengeTiers[i] === tier ? `2px solid ${color}` : '2px solid rgba(255,255,255,0.12)',
                        padding: '10px 14px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        lineHeight: 1.3,
                        transition: 'all 0.15s',
                      }}
                      aria-pressed={challengeTiers[i] === tier}
                    >
                      {emoji} {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {allScanned && (
              <button
                className="mario-btn mario-btn-gold"
                onClick={() => setStep(2)}
                style={{ marginTop: 8 }}
              >
                CHOOSE WHICH TO DIG ▶
              </button>
            )}
          </div>
        )}

        {/* Step 2 — Choose your problem (sorted by stuck level) */}
        {step === 2 && (() => {
          const stuckOrder: Tier[] = ['red', 'silver', 'gold'];
          const sorted = digOptions
            .map((opt, i) => ({ opt, i, tier: challengeTiers[i] }))
            .sort((a, b) => stuckOrder.indexOf(a.tier) - stuckOrder.indexOf(b.tier));
          const topTier = sorted[0]?.tier;
          return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)', lineHeight: 2 }}>
              CHOOSE YOUR PROBLEM TO DIG
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              Your most stuck problem is at the top. Pick one to dig into.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {sorted.map(({ opt, i, tier }, rank) => {
                const borderColor = tier ? tierColor(tier) : 'rgba(255,255,255,0.3)';
                const isTop = rank === 0 && tier === topTier;
                return (
                  <button
                    key={i}
                    onClick={() => { setChosenChallenge(opt); setStep(3); }}
                    style={{
                      fontFamily: 'VT323, monospace',
                      fontSize: '1.3rem',
                      background: isTop ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.4)',
                      color: 'var(--white)',
                      border: 'none',
                      padding: '20px 24px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      boxShadow: `-4px 0 0 0 ${borderColor}, 4px 0 0 0 ${borderColor}, 0 -4px 0 0 ${borderColor}, 0 4px 0 0 ${borderColor}`,
                      lineHeight: 1.4,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <span>{opt.length > 80 ? opt.slice(0, 80) + '...' : opt}</span>
                    {tier && (
                      <span className="mario-font" style={{ fontSize: '0.35rem', color: tierColor(tier) }}>
                        {TIER_LABEL[tier]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          );
        })()}

        {/* Step 3 — Why is this happening? */}
        {step === 3 && (
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'When exactly does this break down?',
                'Who feels it most when it does?',
                'What would have to be true for it not to happen?',
              ].map((q, i) => (
                <p key={i} className="vt323-font" style={{ color: '#aaa', fontSize: '1rem', margin: 0 }}>
                  {i + 1}. {q}
                </p>
              ))}
            </div>
            <textarea
              className="mario-input"
              style={{ minHeight: 140, resize: 'vertical', lineHeight: 1.8 }}
              value={whyHappening}
              onChange={(e) => setWhyHappening(e.target.value)}
              placeholder="Because..."
              aria-label="Why is this happening?"
              autoFocus
            />
            <button
              className="mario-btn mario-btn-gold"
              disabled={!whyHappening.trim()}
              onClick={() => setStep(4)}
            >
              DIG DEEPER ▶
            </button>
          </div>
        )}

        {/* Step 4 — Recurring? */}
        {step === 4 && (
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
                    onClick={() => { setRepetitionNudgeVisible(false); setStep(2); }}
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
      </main>

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
