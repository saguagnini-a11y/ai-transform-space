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

type RootCauseVerdict = 'structural' | 'partial' | 'skills';

const ROOT_CAUSE_CATEGORIES: Array<{
  id: string;
  label: string;
  desc: string;
  example: string;
  verdict: RootCauseVerdict;
  tier: 'gold' | 'silver' | 'red';
  icon: string;
}> = [
  {
    id: 'no_system',
    label: 'No system for it',
    desc: 'People do this manually, skip it, or wait on someone else',
    example: 'Managers give feedback on learning transfer informally because there\'s no structure for it',
    verdict: 'structural',
    tier: 'gold',
    icon: '🔧',
  },
  {
    id: 'bottleneck',
    label: 'One step blocks everything',
    desc: 'Work piles up before one person, tool, or approval',
    example: 'Every learning request goes through one business partner who\'s already at capacity',
    verdict: 'structural',
    tier: 'gold',
    icon: '🚧',
  },
  {
    id: 'knowledge_holder',
    label: 'One person holds the knowledge',
    desc: 'Progress depends on who\'s available',
    example: 'The only person who can brief facilitators is the L&D manager — and she\'s in back-to-back meetings',
    verdict: 'structural',
    tier: 'gold',
    icon: '🔑',
  },
  {
    id: 'no_shared_way',
    label: 'No shared way of doing it',
    desc: 'Same situation, different outcomes every time',
    example: 'Three facilitators run the same onboarding programme three different ways',
    verdict: 'partial',
    tier: 'silver',
    icon: '🗺️',
  },
  {
    id: 'capacity',
    label: 'Not enough hands',
    desc: 'The team knows what to do — there just aren\'t enough people to do it',
    example: 'The L&D team can\'t keep content current because two people left and weren\'t replaced',
    verdict: 'partial',
    tier: 'silver',
    icon: '⏱️',
  },
  {
    id: 'adoption',
    label: 'Organisational adoption',
    desc: 'A tool, process, or behaviour exists — people aren\'t using it consistently',
    example: 'The new LMS has been live for six months. Half the managers still email PDFs',
    verdict: 'partial',
    tier: 'silver',
    icon: '📊',
  },
  {
    id: 'norms',
    label: 'Professional norms problem',
    desc: 'This is how the field works — or how people think it should work',
    example: 'L&D is still measured on hours delivered, not outcomes. Nobody questions it',
    verdict: 'partial',
    tier: 'silver',
    icon: '🌐',
  },
  {
    id: 'wrong_tool',
    label: 'The tool is the problem',
    desc: 'You\'re building workarounds because the system doesn\'t do what you need',
    example: 'The authoring tool generates SCORM that breaks on mobile — fix is a better tool, not AI on top',
    verdict: 'skills',
    tier: 'red',
    icon: '⚠️',
  },
  {
    id: 'will',
    label: 'People are choosing not to',
    desc: 'The process exists. The tools exist. People just aren\'t following through',
    example: 'Managers skip the post-training reflection because nobody checks and there\'s no consequence',
    verdict: 'skills',
    tier: 'red',
    icon: '⚠️',
  },
];

const TIER_COLORS: Record<string, string> = {
  gold: 'var(--coin-gold)',
  silver: '#aaa',
  red: 'var(--mario-red)',
};

const World4_Castle: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const playerName = localStorage.getItem('game_player_name') ?? 'Player';

  // 0=Draft, 1=ToolTest, 2=RootCause, 3=Refine, 4=SwapTest, 5=POV, 6=Shrink, 7=OneSmallThing
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(localStorage.getItem('game_size_check') ?? '');
  const [toolAnswer, setToolAnswer] = useState('');
  const [rootCauseCategory, setRootCauseCategory] = useState('');
  const [finalStatement, setFinalStatement] = useState('');
  const [povWho, setPovWho] = useState('');
  const [povWhat, setPovWhat] = useState('');
  const [povInsight, setPovInsight] = useState('');
  const [shrunkStatement, setShrunkStatement] = useState('');
  const [firstExperiment, setFirstExperiment] = useState('');
  const [verdict, setVerdict] = useState<ReturnType<typeof calculateVerdict> | null>(null);
  const [loading, setLoading] = useState(false);
  const [flagRaised, setFlagRaised] = useState(false);
  const [fieldChecks, setFieldChecks] = useState([false, false, false]);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [swapNudgeVisible, setSwapNudgeVisible] = useState(false);
  const [redirectFork, setRedirectFork] = useState<'none' | 'fork' | 'understand'>('none');
  const [reframeMode, setReframeMode] = useState(false);

  if (!playerId) { navigate('/game'); return null; }

  const handleDraftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setStep(1);
  };

  const handleTool = (v: string) => { setToolAnswer(v); setStep(2); };

  const handleRoot = (categoryId: string) => {
    const cat = ROOT_CAUSE_CATEGORIES.find((c) => c.id === categoryId)!;
    setRootCauseCategory(categoryId);
    const result = calculateVerdict(toolAnswer, cat.verdict);
    setVerdict(result);
    setFinalStatement(draft);
    setStep(3);
  };

  const handleAdvanceFromRefine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalStatement.trim() || !verdict) return;
    if (verdict.verdict === 'redirect' && redirectFork === 'none') {
      setRedirectFork('fork');
      return;
    }
    setStep(4);
  };

  const handleRedirectChoiceUnderstand = () => {
    setRedirectFork('understand');
  };

  const handleRedirectChoiceReframe = () => {
    setRedirectFork('none');
    setReframeMode(true);
    setDraft('');
    setStep(0);
  };

  const handleRedirectContinueToSwap = () => {
    setRedirectFork('none');
    setStep(4);
  };

  const handleAdvanceToPOV = () => { setStep(5); };

  const handleAdvanceToShrink = () => {
    const pov = buildPOV(povWho, povWhat, povInsight);
    setShrunkStatement(pov || finalStatement);
    setStep(6);
  };

  const handleAdvanceToExperiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shrunkStatement.trim() || !verdict || countWords(shrunkStatement) > 10) return;
    setStep(7);
  };

  const submitToWall = async () => {
    if (!verdict) return;
    setLoading(true);
    try {
      const contextTags = JSON.parse(localStorage.getItem('game_context_tags') ?? '{}');
      if (firstExperiment.trim()) {
        contextTags.first_experiment = firstExperiment.trim();
      }
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

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shrunkStatement.trim() || !verdict || countWords(shrunkStatement) > 10) return;
    await submitToWall();
  };

  const shrunkWordCount = countWords(shrunkStatement);
  const overLimit = shrunkWordCount > 10;
  const assembledPOV = buildPOV(povWho, povWhat, povInsight);

  const stepLabels = ['DRAFT', 'TOOL TEST', 'ROOT CAUSE', 'REFINE', 'SWAP TEST', 'POV', 'SHRINK', 'FIRST MOVE'];

  return (
    <div className="game-screen castle-bg" style={{ minHeight: '100vh', paddingBottom: 80, color: 'var(--white)' }}>
      {/* HUD */}
      <div className="score-display" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span>WORLD 4-1</span>
        <span>FIELD REPORT</span>
        <span>{stepLabels[Math.min(step, 7)]}</span>
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

            {reframeMode && (
              <div style={{ background: 'rgba(251,208,0,0.12)', borderLeft: '4px solid var(--coin-gold)', padding: '12px 16px' }}>
                <p className="vt323-font" style={{ color: AMBER, fontSize: '1.2rem', margin: 0 }}>
                  What part of this problem has a repeatable, time-consuming step that a human currently does manually?
                </p>
              </div>
            )}

            <textarea
              className="mario-input"
              style={{ minHeight: 160, resize: 'vertical', lineHeight: 1.8 }}
              value={draft}
              onChange={(e) => { setDraft(e.target.value); setNudgeDismissed(false); }}
              placeholder={reframeMode ? 'Find the crack where AI could fit...' : 'Write freely. No rules here.'}
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

        {/* Step 2 — Root Cause (9 L&D-native categories) */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="mario-font" style={{ fontSize: '0.65rem', color: AMBER, lineHeight: 2 }}>THE ROOT CAUSE TEST</h2>
            <p className="vt323-font" style={{ fontSize: '1.3rem', color: 'var(--white)', margin: 0 }}>
              Which of these best describes why your problem keeps happening?
            </p>

            {/* Gold tier — strong AI candidates */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p className="mario-font" style={{ fontSize: '0.35rem', color: TIER_COLORS.gold, margin: '8px 0 4px', letterSpacing: '0.05em' }}>
                🟢 STRONG AI TERRITORY
              </p>
              {ROOT_CAUSE_CATEGORIES.filter((c) => c.tier === 'gold').map((cat) => (
                <button
                  key={cat.id}
                  className="platform-option"
                  style={{ textAlign: 'left', borderLeft: `4px solid ${TIER_COLORS.gold}` }}
                  onClick={() => handleRoot(cat.id)}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ color: TIER_COLORS.gold }}>{cat.icon} {cat.label}</span>
                    <span className="vt323-font" style={{ fontSize: '1rem', color: '#bbb', fontFamily: 'VT323, monospace' }}>{cat.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Silver tier — candidates with caveats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p className="mario-font" style={{ fontSize: '0.35rem', color: TIER_COLORS.silver, margin: '8px 0 4px', letterSpacing: '0.05em' }}>
                🟡 AI CAN HELP — WITH THE RIGHT FRAMING
              </p>
              {ROOT_CAUSE_CATEGORIES.filter((c) => c.tier === 'silver').map((cat) => (
                <button
                  key={cat.id}
                  className="platform-option"
                  style={{ textAlign: 'left', borderLeft: `4px solid ${TIER_COLORS.silver}` }}
                  onClick={() => handleRoot(cat.id)}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ color: TIER_COLORS.silver }}>{cat.icon} {cat.label}</span>
                    <span className="vt323-font" style={{ fontSize: '1rem', color: '#888', fontFamily: 'VT323, monospace' }}>{cat.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Red tier — redirects */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p className="mario-font" style={{ fontSize: '0.35rem', color: TIER_COLORS.red, margin: '8px 0 4px', letterSpacing: '0.05em' }}>
                🔴 START HERE — BEFORE AI
              </p>
              {ROOT_CAUSE_CATEGORIES.filter((c) => c.tier === 'red').map((cat) => (
                <button
                  key={cat.id}
                  className="platform-option"
                  style={{ textAlign: 'left', borderLeft: `4px solid ${TIER_COLORS.red}` }}
                  onClick={() => handleRoot(cat.id)}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ color: TIER_COLORS.red }}>{cat.icon} {cat.label}</span>
                    <span className="vt323-font" style={{ fontSize: '1rem', color: '#888', fontFamily: 'VT323, monospace' }}>{cat.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Refine + Verdict + Redirect Fork */}
        {step === 3 && verdict && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Redirect Fork — shown after they submit refine if verdict = redirect */}
            {redirectFork === 'fork' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ background: 'rgba(233,69,96,0.1)', borderLeft: '4px solid var(--mario-red)', padding: '16px 20px' }}>
                  <p className="mario-font" style={{ fontSize: '0.6rem', color: 'var(--mario-red)', margin: '0 0 8px' }}>
                    NOT AN AI PROBLEM. YET.
                  </p>
                  <p className="vt323-font" style={{ color: '#ddd', fontSize: '1.2rem', margin: 0, lineHeight: 1.5 }}>
                    That's not failure. That's clarity. Most L&D problems aren't AI problems — they're design problems, adoption problems, or political problems wearing a technology costume.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button className="platform-option" style={{ textAlign: 'left', borderLeft: '4px solid #aaa' }} onClick={handleRedirectChoiceUnderstand}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span>💡 Help me understand what kind of problem this is</span>
                      <span className="vt323-font" style={{ fontSize: '1rem', color: '#888', fontFamily: 'VT323, monospace' }}>See what this problem actually needs — and what to do next</span>
                    </div>
                  </button>
                  <button className="platform-option" style={{ textAlign: 'left', borderLeft: '4px solid var(--coin-gold)' }} onClick={handleRedirectChoiceReframe}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span>🔍 I want to reframe it as an AI problem</span>
                      <span className="vt323-font" style={{ fontSize: '1rem', color: '#888', fontFamily: 'VT323, monospace' }}>Find the part of this that AI could actually touch</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Redirect Explain — path A */}
            {redirectFork === 'understand' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 className="mario-font" style={{ fontSize: '0.6rem', color: AMBER, lineHeight: 2 }}>WHAT KIND OF PROBLEM IS THIS?</h2>
                {(() => {
                  const cat = ROOT_CAUSE_CATEGORIES.find((c) => c.id === rootCauseCategory);
                  const problemType = cat?.id === 'wrong_tool'
                    ? { type: 'Tool mismatch', next: 'Evaluate whether a different tool — not AI — would close this gap. Talk to procurement or IT first.', example: cat.example }
                    : { type: 'Behaviour and will', next: 'This needs incentives, accountability, or culture change before technology. Start with the manager conversation, not the AI pilot.', example: cat?.example ?? '' };
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ background: 'rgba(251,208,0,0.08)', borderLeft: `4px solid ${AMBER}`, padding: '12px 16px' }}>
                        <p className="mario-font" style={{ fontSize: '0.4rem', color: AMBER, margin: '0 0 6px' }}>PROBLEM TYPE</p>
                        <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0 }}>{problemType.type}</p>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', boxShadow: '-2px 0 0 #555, 2px 0 0 #555, 0 -2px 0 #555, 0 2px 0 #555' }}>
                        <p className="mario-font" style={{ fontSize: '0.4rem', color: '#aaa', margin: '0 0 6px' }}>WHAT TO DO NEXT</p>
                        <p className="vt323-font" style={{ color: '#ddd', fontSize: '1.1rem', margin: 0, lineHeight: 1.6 }}>{problemType.next}</p>
                      </div>
                      <p className="vt323-font" style={{ color: '#888', fontSize: '1rem', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                        Naming this clearly is still the work. Bring a sharp problem statement — even a non-AI one — to the Wall.
                      </p>
                    </div>
                  );
                })()}
                <button className="mario-btn mario-btn-dark" onClick={handleRedirectContinueToSwap}>
                  TAKE IT TO THE WALL ▶
                </button>
              </div>
            )}

            {/* Normal refine — shown until fork is triggered */}
            {redirectFork === 'none' && (
              <form onSubmit={handleAdvanceFromRefine} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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
                <button type="submit" className="mario-btn mario-btn-red" disabled={!finalStatement.trim()}>
                  {verdict.verdict === 'redirect' ? 'SEE WHAT THIS MEANS ▶' : 'ONE MORE CHECK ▶'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Step 4 — Swap Test */}
        {step === 4 && (
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

        {/* Step 5 — POV Refinement */}
        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.75rem', color: AMBER, textShadow: '3px 3px 0 rgba(0,0,0,0.8)', lineHeight: 2 }}>
              NOW GIVE IT A WHO
            </h2>
            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              A problem without a person is just a situation.
            </p>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 16px', boxShadow: '-2px 0 0 #555, 2px 0 0 #555, 0 -2px 0 #555, 0 2px 0 #555' }}>
              <p className="mario-font" style={{ fontSize: '0.4rem', color: '#aaa', margin: '0 0 6px' }}>YOU WROTE:</p>
              <p className="vt323-font" style={{ color: '#ddd', fontSize: '1.1rem', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                "{finalStatement}"
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, boxShadow: `-2px 0 0 ${AMBER}, 2px 0 0 ${AMBER}, 0 -2px 0 ${AMBER}, 0 2px 0 ${AMBER}` }}>
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid rgba(251,208,0,0.2)` }}>
                <span className="mario-font" style={{ fontSize: '0.4rem', color: AMBER, padding: '10px 12px', whiteSpace: 'nowrap', minWidth: 60 }}>WHO</span>
                <input className="mario-input" style={{ flex: 1, border: 'none', boxShadow: 'none', background: 'transparent', padding: '10px 12px' }} placeholder="the person or role this affects most" value={povWho} onChange={(e) => setPovWho(e.target.value)} autoFocus />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid rgba(251,208,0,0.2)` }}>
                <span className="mario-font" style={{ fontSize: '0.4rem', color: '#666', padding: '10px 12px', whiteSpace: 'nowrap', minWidth: 60 }}>NEEDS</span>
                <input className="mario-input" style={{ flex: 1, border: 'none', boxShadow: 'none', background: 'transparent', padding: '10px 12px' }} placeholder="what they actually need" value={povWhat} onChange={(e) => setPovWhat(e.target.value)} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="mario-font" style={{ fontSize: '0.4rem', color: '#666', padding: '10px 12px', whiteSpace: 'nowrap', minWidth: 60 }}>BECAUSE</span>
                <input className="mario-input" style={{ flex: 1, border: 'none', boxShadow: 'none', background: 'transparent', padding: '10px 12px' }} placeholder="what's making it hard" value={povInsight} onChange={(e) => setPovInsight(e.target.value)} />
              </div>
            </div>

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

        {/* Step 6 — Shrink */}
        {step === 6 && (
          <form onSubmit={handleAdvanceToExperiment} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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

            <button type="submit" className="mario-btn mario-btn-red" disabled={!shrunkStatement.trim() || overLimit}>
              THAT'S MY PROBLEM ▶
            </button>
          </form>
        )}

        {/* Step 7 — One Small Thing */}
        {step === 7 && (
          <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="mario-font" style={{ fontSize: '0.75rem', color: AMBER, textShadow: '3px 3px 0 rgba(0,0,0,0.8)', lineHeight: 2 }}>
              ONE SMALL THING.
            </h2>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 16px', boxShadow: '-2px 0 0 #555, 2px 0 0 #555, 0 -2px 0 #555, 0 2px 0 #555' }}>
              <p className="mario-font" style={{ fontSize: '0.4rem', color: '#aaa', margin: '0 0 6px' }}>YOUR PROBLEM:</p>
              <p className="vt323-font" style={{ color: AMBER, fontSize: '1.2rem', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                "{shrunkStatement}"
              </p>
            </div>

            <p className="vt323-font" style={{ color: AMBER, fontSize: '1.3rem', margin: 0, fontStyle: 'italic' }}>
              You have a problem worth solving. Now find the crack in it.
            </p>

            <p className="vt323-font" style={{ color: '#ccc', fontSize: '1.1rem', margin: 0, lineHeight: 1.6 }}>
              {verdict?.verdict === 'redirect'
                ? 'If you were going to sneak AI into one corner of this — where would you start?'
                : 'What\'s the smallest part of this that AI could touch — without solving the whole thing?'}
            </p>

            <textarea
              className="mario-input"
              style={{ minHeight: 100, resize: 'vertical', lineHeight: 1.8 }}
              value={firstExperiment}
              onChange={(e) => setFirstExperiment(e.target.value)}
              placeholder="The bit that's repetitive, slow, or manual every single time..."
              autoFocus
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button type="submit" className="mario-btn mario-btn-red" disabled={loading || !firstExperiment.trim()}>
                {loading ? 'SAVING...' : 'RAISE THE FLAG 🚩'}
              </button>
              <button type="button" className="mario-btn mario-btn-dark" style={{ fontSize: '0.4rem' }} onClick={submitToWall} disabled={loading}>
                {loading ? '...' : 'SKIP — TAKE IT TO THE WALL'}
              </button>
            </div>
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
