export const ROLES = [
  'Software Engineer', 'Indie Builder / Solo Hacker', 'Systems / Infra Engineer',
  'Data Engineer / Analytics Engineer', 'ML / AI Engineer', 'Product Manager',
  'Researcher', 'Frontend / Design Engineer', 'Hardware / Robotics / Edge AI Builder',
  'Web3 / Protocol Builder', 'GTM / Sales Operator', 'Community Builder', 'Writer',
  'Videographer/Content Creator / Marketer',
] as const;
export type Role = typeof ROLES[number];
export type Profile = { name: string; nationality: string; roles: Role[]; phone: string; linkedin: string; x: string; threads: string; instagram: string };
export type Answers = { built: string; building: string; motivation: string; failure: string };
export const EMPTY_PROFILE: Profile = { name: '', nationality: '', roles: [], phone: '', linkedin: '', x: '', threads: '', instagram: '' };
export const EMPTY_ANSWERS: Answers = { built: '', building: '', motivation: '', failure: '' };
export const QUESTIONS: { key: keyof Answers; title: string; hint: string }[] = [
  { key: 'built', title: "Show us something you've built", hint: 'A product, experiment, film, community, or something wonderfully specific. Tell us what you did and add links we can explore.' },
  { key: 'building', title: 'What are you building right now?', hint: 'What has your attention? Where are you today, and what are you trying to figure out next?' },
  { key: 'motivation', title: 'The Residency is intense and unstructured. Why do you want in?', hint: 'What are you looking for in this room, and what would you bring to it?' },
  { key: 'failure', title: 'What would make this a failure for you?', hint: 'Be honest about what you need. The right fit goes both ways.' },
];
export const CRITERIA = ['Degree of obsession', 'Vibes', 'Execution pace'] as const;
export type Scores = { obsession: number; vibes: number; executionPace: number };
export type Vote = { decision: 'yes' | 'no' | 'abstain'; scores: Scores | null; reason: string };
export type ReviewState = 'draft' | 'submitted' | 'reviewing' | 'discussion' | 'admin_resolution' | 'accepted' | 'rejected';
export const STATE_LABELS: Record<ReviewState, string> = { draft: 'Draft', submitted: 'Submitted', reviewing: 'Under review', discussion: 'Needs discussion', admin_resolution: 'Admin resolution', accepted: 'Accepted', rejected: 'Not accepted' };
export const mean = (scores: Scores) => (scores.obsession + scores.vibes + scores.executionPace) / 3;
export const isFlagged = (vote: Vote) => vote.decision === 'no' && vote.scores !== null && mean(vote.scores) > 7.5;
export const isFinal = (state: ReviewState) => state === 'accepted' || state === 'rejected';
export function consensus(voterCount: number, votes: Vote[]): ReviewState {
  if (votes.some(vote => vote.decision === 'no')) return 'discussion';
  if (!voterCount || votes.length < voterCount) return votes.length ? 'reviewing' : 'submitted';
  return votes.every(vote => vote.decision === 'yes') ? 'accepted' : 'admin_resolution';
}
export function validateVote(vote: Vote) {
  if (vote.decision === 'abstain') {
    if (vote.scores !== null) throw new Error('Abstentions do not include scores.');
  } else {
    if (!vote.scores || [vote.scores.obsession, vote.scores.vibes, vote.scores.executionPace].some(score => !Number.isInteger(score) || score < 1 || score > 10)) throw new Error('Choose a score from 1 to 10 for all three criteria.');
    if (vote.decision === 'no' && !vote.reason.trim()) throw new Error('Please explain your No vote.');
  }
  if (vote.reason.length > 4000) throw new Error('Keep your reason within 4,000 characters.');
}
export function validateProfile(profile: Profile, complete: boolean) {
  for (const [key, value] of Object.entries(profile)) {
    if (typeof value === 'string' && value.length > (key === 'linkedin' || key === 'x' ? 1000 : 200)) throw new Error(`${key} is too long.`);
  }
  if (new Set(profile.roles).size !== profile.roles.length || profile.roles.some(role => !ROLES.includes(role))) throw new Error('Choose valid, distinct roles.');
  if (complete && (!profile.name.trim() || !profile.nationality.trim() || !profile.phone.trim() || !profile.roles.length)) throw new Error('Complete your name, nationality, roles and phone number.');
  if (profile.phone && !/^\+[1-9][\d ()-]{5,24}$/.test(profile.phone.trim())) throw new Error('Include your phone country code, for example +60 12 345 6789.');
  for (const key of ['linkedin', 'x'] as const) {
    if (!profile[key]) continue;
    try { if (!['https:', 'http:'].includes(new URL(profile[key]).protocol)) throw new Error(); }
    catch { throw new Error(`Enter a complete ${key === 'x' ? 'X' : 'LinkedIn'} URL starting with https://.`); }
  }
  for (const key of ['threads', 'instagram'] as const) if (profile[key] && !/^@?[A-Za-z0-9._]{1,30}$/.test(profile[key])) throw new Error(`Enter a valid ${key} handle.`);
}
export function validateAnswers(answers: Answers, complete: boolean) {
  for (const answer of Object.values(answers)) {
    if (complete && !answer.trim()) throw new Error('Please answer all four application questions.');
    if (answer.length > 6000) throw new Error('Keep each answer within 6,000 characters.');
  }
}
