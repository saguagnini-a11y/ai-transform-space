import React from 'react';
import '../styles/mario.css';

type Verdict = 'strong' | 'maybe' | 'redirect';

interface Props {
  verdict: Verdict;
  showReason?: string;
}

const labels: Record<Verdict, string> = {
  strong: '🟢 Strong AI candidate',
  maybe: '🟡 Maybe',
  redirect: '🔴 Redirect',
};

const VerdictBadge: React.FC<Props> = ({ verdict, showReason }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
    <span className={`verdict-badge verdict-${verdict}`}>{labels[verdict]}</span>
    {showReason && (
      <p style={{ fontFamily: 'VT323, monospace', fontSize: '1.1rem', margin: 0, color: '#333' }}>
        {showReason}
      </p>
    )}
  </div>
);

export default VerdictBadge;
