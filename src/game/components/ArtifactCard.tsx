import React, { useRef } from 'react';
import VerdictBadge from './VerdictBadge';
import '../styles/mario.css';

interface Props {
  playerName: string;
  realityWord: string;
  finalStatement: string;
  verdict: 'strong' | 'maybe' | 'redirect';
  verdictReason: string;
}

const ArtifactCard: React.FC<Props> = ({ playerName, realityWord, finalStatement, verdict, verdictReason }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Print the card — simplest cross-browser approach
    const w = window.open('', '_blank');
    if (!w || !cardRef.current) return;
    w.document.write(`
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&display=swap" rel="stylesheet">
          <style>
            body { margin: 0; background: #5C94FC; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
            @media print { body { background: white; } }
          </style>
        </head>
        <body>${cardRef.current.outerHTML}</body>
      </html>
    `);
    w.document.close();
    setTimeout(() => w.print(), 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <div ref={cardRef} className="artifact-card">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div className="mario-font" style={{ fontSize: '0.5rem', color: 'var(--coin-gold)', marginBottom: 8 }}>
              AI FIELDWORK COHORT 2025
            </div>
            <div className="mario-font" style={{ fontSize: '0.75rem', color: 'var(--white)' }}>
              {playerName}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '6px 10px',
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '0.45rem',
              color: 'var(--white)',
            }}
          >
            L&D SHAKERS
          </div>
        </div>

        {/* Reality word */}
        <div style={{ marginBottom: 16 }}>
          <div className="mario-font" style={{ fontSize: '0.4rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
            MY L&D REALITY
          </div>
          <div
            className="mario-font"
            style={{
              fontSize: '1.2rem',
              color: 'var(--coin-gold)',
              textTransform: 'uppercase',
              textShadow: '3px 3px 0 rgba(0,0,0,0.5)',
            }}
          >
            {realityWord}
          </div>
        </div>

        {/* Problem statement */}
        <div
          style={{
            background: 'rgba(0,0,0,0.4)',
            padding: 16,
            marginBottom: 16,
            boxShadow: '-2px 0 0 rgba(255,255,255,0.3), 2px 0 0 rgba(255,255,255,0.3), 0 -2px 0 rgba(255,255,255,0.3), 0 2px 0 rgba(255,255,255,0.3)',
          }}
        >
          <div className="mario-font" style={{ fontSize: '0.4rem', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
            PROBLEM WORTH SOLVING
          </div>
          <p style={{ fontFamily: 'VT323, monospace', fontSize: '1.2rem', color: 'var(--white)', margin: 0, lineHeight: 1.5 }}>
            {finalStatement}
          </p>
        </div>

        {/* Verdict */}
        <VerdictBadge verdict={verdict} showReason={verdictReason} />

        {/* Footer */}
        <div
          className="mario-font"
          style={{ fontSize: '0.35rem', color: 'rgba(255,255,255,0.5)', marginTop: 20, textAlign: 'right' }}
        >
          L&D PROBLEM FINDER
        </div>
      </div>

      <button className="mario-btn mario-btn-gold" onClick={handleDownload} style={{ fontSize: '0.55rem' }}>
        🖨 PRINT / SAVE CARD
      </button>
    </div>
  );
};

export default ArtifactCard;
