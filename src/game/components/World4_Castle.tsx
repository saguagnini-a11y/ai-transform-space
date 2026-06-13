import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import { calculateVerdict } from '../lib/gameLogic';
import VerdictBadge from './VerdictBadge';
import '../styles/mario.css';

const AMBER = 'var(--coin-gold)';

const SOLUTION_TRIGGERS = [
  'we need', 'i need', 'i want to build', "let's build", 'implement',
  'deploy', 'create a tool', 'build a', 'develop a', 'use ai to',
  'an ai that', 'a chatbot', 'a system that', 'a platform',
];

const hasSolutionTrigger = (text: string) => {
  const lower = text.toLowerCase();
  return SOLUTION_TRIGGERS.some((t) => lower.includes(t));
};

const countWords = (text: string) =>
  text.trim().split(/\s+/).filter(Boolean).length;

const buildPOV = (who: string, what: string, insight: string): string => {
  const parts: string[] = [];
  if (who.trim()) parts.push(who.trim());
  if (what.trim()) { parts.push('needs'); parts.push(what.trim()); }
  if (insight.trim()) { parts.push('because'); parts.push(insight.trim()); }
  return parts.length ? parts.join(' ') + '.' : '';
};

const World4_Castle: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const playerName = localStorage.getItem('game_player_name') ?? 'Player';

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(localStorage.getItem('game_size_check') ?? '');
  const [toolAnswer, setToolAnswer] = useState('');
  const [learnerImpact, setLearnerImpact] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [finalStatement, setFinalStatement] = useState('');
  const [povWho, setPovWho] = useState('');
  const [povWhat, setPovWhat] = useState('');
  const [povInsight, setPovInsight] = useState('');
  const [shrunkStatement, setShrunkStatement] = useState('');
  const [verdict, setVerdict] = useState<ReturnType<typeof calculateVerdict> | null>(null);
  const [loading, setLoading] = useState(false);
  const [flagRaised, setFlagRaised] = useState(false);
  const [fieldChecks, setFieldChecks] = useState([false, false, false]);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [swapNudgeVisible, setSwapNudgeVisible] = useState(false);

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

  const handleAdvanceToSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalStatement.trim()) return;
    setStep(5);
  };

  const handleAdvanceToPOV = () => {
    setStep(6);
  };

  const handleAdvanceToShrink = () => {
    const pov = buildPOV(povWho, povWhat, povInsight);
    // Pre-fill shrink with POV if any field was filled, otherwise use finalStatement
    setShrunkStatement(pov || finalStatement);
    setStep(7);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shrunkStatement.trim() || !verdict || countWords(shrunkStatement) > 10) return;
    setLoading(true);
    try {
      const contextTags = JSON.parse(localStorage.getItem('game_context_tags') ?? '{}');
      const pov = buildPOV(povWho, povWhat, povInsight);
      await gameSupabase.from('problem_statements').insert({
        player_id: playerId,
        player_name: playerName,
        raw_statement: pov || finalStatement,
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
  const assembledPOV = buildPOV(povWho, povWhat, povInsight);

  const stepLabels = ['DRAFT', 'TOOL TEST', 'LEARNER', 'ROOT CAUSE', 'REFINE', 'SWAP TEST', 'POV', 'SHRINK'];

  return (
    <div className="game-screen castle-bg" style={{ minHeight: '100vh', paddingBottom: 80, color: 'var(--white)' }}>
      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>WORLD 4-1</span>
        <span>FIELD REPORT</span>
        <span>{stepLabels[step]}</span>
      </div>

      {/* Castle turrets */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ width: 32, height: 48, background: '#4A2C1A', boxShadow: '-2px 0 0 var(--black), 2px 0 0 var(--black), 0 -2px 0 var(--black), 0 2px 0 var(--black)' }} />
        ))}
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px' }}>

        {/* Step 0 — Draft */}
        {step === 0 && (
          <form onSubmit={handleDraftSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.75rem', color: AMBER, textShadow: '3px 3px 0 rgba(0,0,0,0.8)', lineHeight: 2 }}>
              YOUR L&D PROBLEM<br />WORTH SOLVING IS...
            </h2>

            <textarea
              className="mario-input"
              style={{ minHeight: 160, resize: 'vertical', lineHeight: 1.8 }}
              value={draft}
              onChange={(e) => { setDraft(e.target.value); setNudgeDismissed(false); }}
              placeholder="Write freely. No rules here."
              autoFocus
            />

            {/* Solution detector */}
            {hasSolutionTrigger(draft) && !nudgeDismissed && (
              <div style={{ background: 'rgba(251,208,0,0.12)', borderLeft: '4px solid var(--coin-gold)', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="vt323-font" style={{ color: AMBER, fontSize: '1.2rem', margin: 0 }}>
                  That sounds like a solution. What problem does it solve?
                </p>
                <button type="button" className="mario-btn mario-btn-dark" style={{ fontSize: '0.45rem', alignSelf: 'flex-start' }} onClick={() => setNudgeDismissed(true)}>
                  I KNOW, KEEP GOING
                </button>
              </div>
            )}

            {/* Field test checkboxes */}
            {draft.trim() && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="mario-font" style={{ fontSize: '0.4rem', color: AMBER, margin: 0, letterSpacing: '0.05em' }}>
                  DOES YOUR PROBLEM PASS THE FIELD TEST?
                </p>
                {[
                  'My problem has a who (a specific person, team, or role)',
                  'My problem has a when (a moment, frequency, or trigger)',
                  "My problem has a what — and it's not a solution",
                ].map((label, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                    <div
                      onClick={() => setFieldChecks((prev) => prev.map((v, j) => j === i ? !v : v))}
                      style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2, background: fieldChecks[i] ? AMBER : 'transparent', boxShadow: `-2px 0 0 ${AMBER}, 2px 0 0 ${AMBER}, 0 -2px 0 ${AMBER}, 0 2px 0 ${AMBER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      {fieldChecks[i] && <span style={{ color: 'var(--black)', fontSize: '0.65rem', fontFamily: 'Press Start 2P, monospace', lineHeight: 1 }}>✓</span>}
                    </div>
                    <span className="vt323-font" style={{ color: fieldChecks[i] ? AMBER : '#aaa', fontSize: '1.1rem', lineHeight: 1.4, transition: 'color 0.15s' }}>
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            )}

            <button type="submit" className="mario-btn mario-btn-red" disabled={!draft.trim()}>
              SHARPEN IT ▶
            </button>
          </form>
        )}

        {/* Step 1 — Tool Test */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, lineHeight: 2 }}>THE TOOL TEST</h2>
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

        {/* Step 2 — Learner Impact */}
        {step === 2 && (
          <form onSubmit={handleLearnerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, lineHeight: 2 }}>THE LEARNER IMPACT TEST</h2>
            <p className="vt323-font" style={{ fontSize: '1.3rem', color: 'var(--white)', margin: 0 }}>
              If this problem was solved, what would change for a learner?
            </p>
            <input className="mario-input" placeholder="Max 80 chars..." value={learnerImpact} onChange={(e) => setLearnerImpact(e.target.value.slice(0, 80))} autoFocus />
            <button type="submit" className="mario-btn mario-btn-gold" disabled={!learnerImpact.trim()}>NEXT TEST ▶</button>
          </form>
        )}

        {/* Step 3 — Root Cause Test */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, lineHeight: 2 }}>THE ROOT CAUSE TEST</h2>
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

        {/* Step 4 — Refine + Verdict */}
        {step === 4 && verdict && (
          <form onSubmit={handleAdvanceToSwap} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, lineHeight: 2 }}>REFINE YOUR STATEMENT</h2>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: 16, fontFamily: 'VT323, monospace', fontSize: '1.2rem', color: '#ddd', boxShadow: '-2px 0 0 var(--white), 2px 0 0 var(--white), 0 -2px 0 var(--white), 0 2px 0 var(--white)' }}>
              Draft: "{draft}"
            </div>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              Write your sharpest version. Then we'll tell you how it lands.
            </p>
            <textarea className="mario-input" style={{ minHeight: 140, resize: 'vertical', lineHeight: 1.8 }} value={finalStatement} onChange={(e) => setFinalStatement(e.target.value)} placeholder="The problem worth solving is..." autoFocus />
            {finalStatement.trim() && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p className="mario-font" style={{ fontSize: '0.45rem', color: '#aaa', margin: 0 }}>YOUR AI FITNESS VERDICT</p>
                <VerdictBadge verdict={verdict.verdict} showReason={verdict.reason} />
              </div>
            )}
            <button type="submit" className="mario-btn mario-btn-red" disabled={!finalStatement.trim()}>ONE MORE CHECK ▶</button>
          </form>
        )}

        {/* Step 5 — Swap Test */}
        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, textShadow: '3px 3px 0 rgba(0,0,0,0.8)', lineHeight: 2 }}>
              COULD A CHECKLIST, A TEMPLATE, OR A BETTER PROCESS FIX THIS?
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              Be honest. It's a faster question than it sounds.
            </p>
            {swapNudgeVisible ? (
              <div style={{ background: 'rgba(0,0,0,0.5)', borderLeft: '4px solid var(--coin-gold)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p className="vt323-font" style={{ color: AMBER, fontSize: '1.2rem', margin: 0 }}>
                  That's not a reason to stop. But the best AI projects start where process ends — not where it hasn't been tried yet.
                </p>
                <button className="mario-btn mario-btn-dark" style={{ fontSize: '0.45rem', alignSelf: 'flex-start' }}
                  onClick={() => { setSwapNudgeVisible(false); handleAdvanceToPOV(); }}>
                  NOTED — KEEP GOING
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button className="platform-option" onClick={handleAdvanceToPOV}>🚀 Probably not — AI adds something here</button>
                <button className="platform-option" onClick={() => setSwapNudgeVisible(true)}>🤔 Actually… maybe yes</button>
              </div>
            )}
          </div>
        )}

        {/* Step 6 — POV Refinement */}
        {step === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.75rem', color: AMBER, textShadow: '3px 3px 0 rgba(0,0,0,0.8)', lineHeight: 2 }}>
              NOW GIVE IT A WHO
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              A problem without a person is just a situation.
            </p>

            {/* Their statement */}
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 16px', boxShadow: '-2px 0 0 #555, 2px 0 0 #555, 0 -2px 0 #555, 0 2px 0 #555' }}>
              <p className="mario-font" style={{ fontSize: '0.4rem', color: '#aaa', margin: '0 0 6px' }}>YOU WROTE:</p>
              <p className="vt323-font" style={{ color: '#ddd', fontSize: '1.1rem', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                "{finalStatement}"
              </p>
            </div>

            {/* POV frame */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, boxShadow: `-2px 0 0 ${AMBER}, 2px 0 0 ${AMBER}, 0 -2px 0 ${AMBER}, 0 2px 0 ${AMBER}` }}>
              {/* WHO row */}
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid rgba(251,208,0,0.2)` }}>
                <span className="mario-font" style={{ fontSize: '0.4rem', color: AMBER, padding: '10px 12px', whiteSpace: 'nowrap', minWidth: 60 }}>WHO</span>
                <input
                  className="mario-input"
                  style={{ flex: 1, border: 'none', boxShadow: 'none', background: 'transparent', padding: '10px 12px' }}
                  placeholder="the person or role this affects most"
                  value={povWho}
                  onChange={(e) => setPovWho(e.target.value)}
                  autoFocus
                />
              </div>
              {/* NEEDS row */}
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid rgba(251,208,0,0.2)` }}>
                <span className="mario-font" style={{ fontSize: '0.4rem', color: '#666', padding: '10px 12px', whiteSpace: 'nowrap', minWidth: 60 }}>NEEDS</span>
                <input
                  className="mario-input"
                  style={{ flex: 1, border: 'none', boxShadow: 'none', background: 'transparent', padding: '10px 12px' }}
                  placeholder="what they actually need"
                  value={povWhat}
                  onChange={(e) => setPovWhat(e.target.value)}
                />
              </div>
              {/* BECAUSE row */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="mario-font" style={{ fontSize: '0.4rem', color: '#666', padding: '10px 12px', whiteSpace: 'nowrap', minWidth: 60 }}>BECAUSE</span>
                <input
                  className="mario-input"
                  style={{ flex: 1, border: 'none', boxShadow: 'none', background: 'transparent', padding: '10px 12px' }}
                  placeholder="what's making it hard"
                  value={povInsight}
                  onChange={(e) => setPovInsight(e.target.value)}
                />
              </div>
            </div>

            {/* Live assembly */}
            {assembledPOV && (
              <p className="vt323-font" style={{ color: AMBER, fontSize: '1.4rem', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                {assembledPOV}
              </p>
            )}

            <button className="mario-btn mario-btn-red" onClick={handleAdvanceToShrink}>
              THAT'S THE FRAME ▶
            </button>
          </div>
        )}

        {/* Step 7 — Shrink */}
        {step === 7 && (
          <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.75rem', color: 'var(--mario-red)', textShadow: '3px 3px 0 rgba(0,0,0,0.8)', lineHeight: 2 }}>
              NOW MAKE IT SMALLER
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              Say it in 10 words or fewer. If you can't, you haven't found it yet.
            </p>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 16px', boxShadow: '-2px 0 0 #555, 2px 0 0 #555, 0 -2px 0 #555, 0 2px 0 #555' }}>
              <p className="mario-font" style={{ fontSize: '0.4rem', color: '#aaa', margin: '0 0 6px' }}>YOUR FRAME:</p>
              <p className="vt323-font" style={{ color: '#ddd', fontSize: '1.1rem', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                {assembledPOV || `"${finalStatement}"`}
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <textarea
                className="mario-input"
                style={{ minHeight: 80, resize: 'none', lineHeight: 1.8, paddingRight: 72 }}
                value={shrunkStatement}
                onChange={(e) => setShrunkStatement(e.target.value)}
                placeholder="10 words. Go."
                autoFocus
              />
              <div style={{ position: 'absolute', top: 10, right: 10, fontFamily: 'Press Start 2P, monospace', fontSize: '0.7rem', color: overLimit ? 'var(--mario-red)' : AMBER, background: 'rgba(0,0,0,0.7)', padding: '4px 8px', pointerEvents: 'none', transition: 'color 0.15s' }}>
                {shrunkStatement.trim() === '' ? 10 : Math.max(0, 10 - shrunkWordCount)}
              </div>
            </div>

            {overLimit && (
              <p className="vt323-font" style={{ color: 'var(--mario-red)', fontSize: '1.1rem', margin: 0 }}>
                {shrunkWordCount} words — cut {shrunkWordCount - 10} more
              </p>
            )}

            <button type="submit" className="mario-btn mario-btn-red" disabled={!shrunkStatement.trim() || overLimit || loading}>
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
              <div className="flag-raise" style={{ position: 'absolute', top: 0, left: 8, width: 60, height: 40, background: 'var(--mario-red)', boxShadow: '-2px 0 0 var(--black), 2px 0 0 var(--black), 0 -2px 0 var(--black), 0 2px 0 var(--black)' }} />
            </div>
            <h2 className="mario-font" style={{ color: AMBER, fontSize: '1.2rem', marginTop: 8 }}>LEVEL COMPLETE!</h2>
            <p className="vt323-font" style={{ color: 'var(--white)', fontSize: '1.5rem' }}>Your problem is on the Wall of Challenges.</p>
            <p className="vt323-font" style={{ color: '#aaa', fontSize: '1.2rem' }}>Now let's see who else is here...</p>
            <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="coin-shower-item" style={{ position: 'relative', animationDelay: `${i * 0.08}s`, animationDuration: '0.9s' }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default World4_Castle;
