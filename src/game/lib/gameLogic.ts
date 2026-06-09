export type Verdict = 'strong' | 'maybe' | 'redirect';

export type VerdictResult = {
  verdict: Verdict;
  badge: string;
  reason: string;
};

export function calculateVerdict(toolAnswer: string, rootCauseAnswer: string): VerdictResult {
  const isTool = toolAnswer === 'tool';
  const isBoth = toolAnswer === 'both';
  const isStructural = rootCauseAnswer === 'structural';
  const isSkills = rootCauseAnswer === 'skills';

  if (isTool && isStructural) {
    return {
      verdict: 'strong',
      badge: '🟢 Strong AI candidate',
      reason: 'A tool can help and the problem is structural — great fit for AI-assisted solutions.',
    };
  }
  if (isTool && isSkills) {
    return {
      verdict: 'maybe',
      badge: '🟡 Maybe — pair with training',
      reason: 'A tool could help, but the root cause is about skills or will — pair tech with human development.',
    };
  }
  if (!isTool && !isBoth && isStructural) {
    return {
      verdict: 'maybe',
      badge: '🟡 Maybe — AI can support, not lead',
      reason: 'The problem is structural but needs human judgment first — AI can play a supporting role.',
    };
  }
  if (!isTool && !isBoth && isSkills) {
    return {
      verdict: 'redirect',
      badge: '🔴 Redirect — start with people, not tools',
      reason: 'This problem needs human judgment and is rooted in skills or will — start with people, not technology.',
    };
  }
  // isBoth → default maybe
  return {
    verdict: 'maybe',
    badge: '🟡 Maybe — paired approach',
    reason: 'A hybrid of human judgment and tooling may work best here.',
  };
}
