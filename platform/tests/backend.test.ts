import { convexTest } from 'convex-test';
import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import schema from '../convex/schema';
import { api, internal } from '../convex/_generated/api';
import { EMPTY_PROFILE, consensus, isFlagged, validateVote, type Scores, type Vote } from '../src/domain';
const modules = import.meta.glob('../convex/**/*.ts');
const profile = { ...EMPTY_PROFILE, name: 'Test Builder', nationality: 'Malaysian', roles: ['Software Engineer' as const], phone: '+60 12 345 6789' };
const answers = { built: 'I built a working prototype. https://example.com', building: 'A better tool for small teams.', motivation: 'To build and learn alongside other residents.', failure: 'Not shipping or contributing.' };
const yes: Vote = { decision: 'yes', scores: { obsession: 8, vibes: 8, executionPace: 8 }, reason: '' };
const no: Vote = { ...yes, decision: 'no', reason: 'The timing and fit are not right.' };
const abstain: Vote = { decision: 'abstain', scores: null, reason: '' };
beforeEach(() => vi.useFakeTimers());
afterEach(() => { vi.useRealTimers(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
async function setup(count = 2) {
  const t = convexTest(schema, modules);
  const account = (name: string) => t.withIdentity({ tokenIdentifier: `https://test.clerk.accounts.dev|${name}`, subject: name, issuer: 'https://test.clerk.accounts.dev', email: `${name}@example.com`, emailVerified: true, name });
  const applicant = account('applicant'); const outsider = account('outsider'); const admin = account('admin');
  const owner = await applicant.mutation(api.users.ensure, {}); await outsider.mutation(api.users.ensure, {}); const adminId = await admin.mutation(api.users.ensure, {});
  await t.run(async ctx => { await ctx.db.patch(adminId, { admin: true }); });
  const reviewers = [];
  for (let index = 0; index < count; index++) { const client = account(`resident${index}`); const id = await client.mutation(api.users.ensure, {}); await t.run(async ctx => { await ctx.db.patch(id, { resident: true }); }); reviewers.push({ client, id }); }
  return { t, applicant, outsider, admin, adminId, owner, reviewers, account };
}
describe('review rules', () => {
  test('strict flag boundary, all three scores and valid ranges', () => {
    expect(isFlagged(no)).toBe(true);
    expect(isFlagged({ ...no, scores: { obsession: 7.5, vibes: 7.5, executionPace: 7.5 } })).toBe(false);
    expect(isFlagged(yes)).toBe(false);
    expect(() => validateVote({ ...yes, scores: {} as Scores })).toThrow();
    expect(() => validateVote({ ...yes, scores: { obsession: 0, vibes: 8, executionPace: 8 } })).toThrow();
    expect(() => validateVote({ ...yes, scores: { obsession: 8.1, vibes: 8, executionPace: 8 } })).toThrow();
    expect(() => validateVote({ ...no, reason: '   ' })).toThrow();
    expect(() => validateVote({ ...abstain, scores: yes.scores })).toThrow();
    expect(consensus(0, [])).toBe('submitted'); expect(consensus(2, [yes])).toBe('reviewing');
    expect(consensus(2, [yes, yes])).toBe('accepted'); expect(consensus(2, [yes, abstain])).toBe('admin_resolution');
    expect(consensus(2, [abstain, abstain])).toBe('admin_resolution'); expect(consensus(2, [no])).toBe('discussion');
  });
});
test('requires verified identity and isolates applicants, drafts and private reviews', async () => {
  const f = await setup();
  await expect(f.t.query(api.applications.mine, {})).rejects.toThrow();
  await expect(f.t.mutation(api.users.ensure, {})).rejects.toThrow('Please sign in.');
  await expect(f.t.withIdentity({ subject: 'missing-email' }).mutation(api.users.ensure, {})).rejects.toThrow('missing email information');
  await expect(f.t.withIdentity({ subject: 'missing-verification', email: 'test@example.com' }).mutation(api.users.ensure, {})).rejects.toThrow('missing email information');
  await expect(f.t.withIdentity({ subject: 'bad', email: 'bad@example.com', emailVerified: false }).mutation(api.users.ensure, {})).rejects.toThrow();
  const id = await f.applicant.mutation(api.applications.saveDraft, { profile, answers });
  expect(await f.outsider.query(api.applications.mine, {})).toBeNull();
  await expect(f.outsider.query(api.applications.detail, { id })).rejects.toThrow();
  await expect(f.reviewers[0].client.query(api.applications.detail, { id })).rejects.toThrow();
  await expect(f.outsider.mutation(api.users.setAccess, { userId: f.owner, resident: true, admin: true, reason: 'escalate' })).rejects.toThrow();
  await f.applicant.mutation(api.applications.submit, { profile, answers });
  await f.reviewers[0].client.mutation(api.applications.saveReview, { id, ...no });
  const mine = await f.applicant.query(api.applications.mine, {});
  expect(mine?.state).toBe('reviewing'); expect(Object.keys(mine!)).not.toContain('voters'); expect(Object.keys(mine!)).not.toContain('decisionReason'); expect(JSON.stringify(mine)).not.toContain(no.reason);
});
test('submission is idempotent and snapshots answers, profile and resident roster', async () => {
  const f = await setup();
  const id = await f.applicant.mutation(api.applications.submit, { profile, answers });
  expect(await f.applicant.mutation(api.applications.submit, { profile, answers })).toBe(id);
  await f.applicant.mutation(api.users.saveProfile, { profile: { ...profile, name: 'Changed later' } });
  const newResident = f.account('newResident'); const newId = await newResident.mutation(api.users.ensure, {});
  await f.t.run(async ctx => ctx.db.patch(newId, { resident: true }));
  const detail = await f.admin.query(api.applications.detail, { id });
  expect(detail.application.profile.name).toBe(profile.name); expect(detail.application.voters).toHaveLength(2);
  await expect(f.applicant.mutation(api.applications.saveDraft, { profile, answers })).rejects.toThrow();
  await expect(newResident.mutation(api.applications.saveReview, { id, ...yes })).rejects.toThrow();
  const deliveries = await f.t.run(ctx => ctx.db.query('emailDeliveries').take(10)); expect(deliveries).toHaveLength(1);
});
test('No blocks acceptance, preserves history and cannot be removed through panel edits', async () => {
  const f = await setup(); const id = await f.applicant.mutation(api.applications.submit, { profile, answers });
  await f.reviewers[0].client.mutation(api.applications.saveReview, { id, ...no });
  await expect(f.admin.mutation(api.applications.resolve, { id, decision: 'accepted', reason: 'Override' })).rejects.toThrow();
  const extra = f.account('extra'); const extraId = await extra.mutation(api.users.ensure, {}); await f.t.run(ctx => ctx.db.patch(extraId, { resident: true }));
  await expect(f.admin.mutation(api.applications.changeRoster, { id, replace: f.reviewers[0].id, add: extraId, reason: 'Remove veto' })).rejects.toThrow();
  await f.reviewers[0].client.mutation(api.applications.saveReview, { id, ...yes });
  let detail = await f.admin.query(api.applications.detail, { id }); expect(detail.application.flagged).toBe(false); expect(detail.reviews).toHaveLength(1); expect(detail.application.state).toBe('reviewing');
  await f.reviewers[1].client.mutation(api.applications.saveReview, { id, ...yes });
  detail = await f.admin.query(api.applications.detail, { id }); expect(detail.application.state).toBe('accepted'); expect(detail.history.filter(event => event.kind === 'review_saved')).toHaveLength(3);
  await expect(f.reviewers[0].client.mutation(api.applications.saveReview, { id, ...no })).rejects.toThrow();
  expect((await f.applicant.query(api.users.me, {}))?.resident).toBe(false);
});
test('abstentions await admin resolution; one No permits final rejection without all responses', async () => {
  for (const outcome of ['accepted', 'rejected'] as const) {
    const f = await setup(); const id = await f.applicant.mutation(api.applications.submit, { profile, answers });
    if (outcome === 'accepted') {
      await f.reviewers[0].client.mutation(api.applications.saveReview, { id, ...abstain });
      await expect(f.admin.mutation(api.applications.resolve, { id, decision: outcome, reason: 'Too soon' })).rejects.toThrow();
      await f.reviewers[1].client.mutation(api.applications.saveReview, { id, ...abstain });
    } else await f.reviewers[0].client.mutation(api.applications.saveReview, { id, ...no });
    await expect(f.admin.mutation(api.applications.resolve, { id, decision: outcome, reason: '' })).rejects.toThrow();
    await f.admin.mutation(api.applications.resolve, { id, decision: outcome, reason: 'Recorded after resident discussion.' });
    expect((await f.applicant.query(api.applications.mine, {}))?.state).toBe(outcome);
    const emails = await f.t.run(ctx => ctx.db.query('emailDeliveries').take(10)); expect(emails.map(item => item.kind).sort()).toEqual([outcome, 'submitted'].sort());
  }
});
test('empty panel does not accept; explicit roster additions and self-review restrictions work', async () => {
  const f = await setup(0); const id = await f.applicant.mutation(api.applications.submit, { profile, answers });
  await expect(f.admin.mutation(api.applications.resolve, { id, decision: 'accepted', reason: 'Nobody objected' })).rejects.toThrow();
  const extra = f.account('extra'); const extraId = await extra.mutation(api.users.ensure, {}); await f.t.run(ctx => ctx.db.patch(extraId, { resident: true }));
  await f.admin.mutation(api.applications.changeRoster, { id, replace: null, add: extraId, reason: 'Initial panel setup.' });
  await f.t.run(ctx => ctx.db.patch(f.owner, { resident: true }));
  await expect(f.applicant.mutation(api.applications.saveReview, { id, ...yes })).rejects.toThrow();
  await expect(f.applicant.query(api.applications.detail, { id })).rejects.toThrow();
  expect((await f.applicant.query(api.applications.list, { search: '', paginationOpts: { numItems: 25, cursor: null } })).page).toHaveLength(0);
  await f.t.run(ctx => ctx.db.patch(extraId, { resident: false }));
  await expect(extra.mutation(api.applications.saveReview, { id, ...yes })).rejects.toThrow();
});
test('email delivery uses a stable key, excludes internal details, and is not sent twice after confirmation', async () => {
  const f = await setup(); await f.applicant.mutation(api.applications.submit, { profile, answers });
  const item = (await f.t.run(ctx => ctx.db.query('emailDeliveries').take(10)))[0];
  vi.stubEnv('RESEND_API_KEY', 'test-key'); vi.stubEnv('EMAIL_FROM', 'Residency <residency@example.com>'); vi.stubEnv('PLATFORM_URL', 'https://platform.example.com');
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'email-test' }), { status: 200 })); vi.stubGlobal('fetch', fetchMock);
  await f.t.action(internal.emails.send, { id: item._id }); await f.t.action(internal.emails.send, { id: item._id });
  expect(fetchMock).toHaveBeenCalledTimes(1); const request = fetchMock.mock.calls[0][1]; expect(request.headers['Idempotency-Key']).toBe(`residency-${item._id}`); expect(request.body).not.toContain(answers.motivation);
  expect((await f.t.run(ctx => ctx.db.get(item._id)))?.state).toBe('sent');
});
test('email failures leave applications intact and retries stop outside the safe window', async () => {
  const f = await setup(); const id = await f.applicant.mutation(api.applications.submit, { profile, answers }); const item = (await f.t.run(ctx => ctx.db.query('emailDeliveries').take(10)))[0];
  vi.stubEnv('RESEND_API_KEY', '');
  await f.t.action(internal.emails.send, { id: item._id });
  expect((await f.applicant.query(api.applications.mine, {}))?.id).toBe(id);
  expect((await f.t.run(ctx => ctx.db.get(item._id)))?.lastError).toBe('Email configuration is incomplete.');
  expect((await f.t.run(ctx => ctx.db.get(item._id)))?.firstAttemptAt).toBeNull();
  await f.t.run(ctx => ctx.db.patch(item._id, { state: 'failed', firstAttemptAt: Date.now() - 25 * 60 * 60 * 1000 }));
  await expect(f.admin.mutation(api.emails.retry, { id: item._id })).rejects.toThrow();
});

test('existing accounts require current verified claims and snapshot the current email without ensure', async () => {
  const f = await setup();
  const identity = (subject: string) => ({ tokenIdentifier: `https://test.clerk.accounts.dev|${subject}`, subject, issuer: 'https://test.clerk.accounts.dev' });
  for (const claims of [{}, { email: 'new@example.com' }, { email: 'new@example.com', emailVerified: false }]) {
    const applicant = f.t.withIdentity({ ...identity('applicant'), ...claims });
    await expect(applicant.query(api.users.me, {})).rejects.toThrow();
    await expect(applicant.query(api.applications.mine, {})).rejects.toThrow();
    await expect(applicant.mutation(api.applications.saveDraft, { profile, answers })).rejects.toThrow();
    await expect(applicant.mutation(api.applications.submit, { profile, answers })).rejects.toThrow();
    const resident = f.t.withIdentity({ ...identity('resident0'), ...claims });
    await expect(resident.query(api.applications.list, { search: '', paginationOpts: { numItems: 25, cursor: null } })).rejects.toThrow();
    const admin = f.t.withIdentity({ ...identity('admin'), ...claims });
    await expect(admin.mutation(api.users.setAccess, { userId: f.owner, resident: true, admin: true, reason: 'Invalid claims' })).rejects.toThrow();
  }
  expect(await f.applicant.query(api.applications.mine, {})).toBeNull();
  const changed = f.t.withIdentity({ ...identity('applicant'), email: 'new@example.com', emailVerified: true });
  expect((await changed.query(api.users.me, {}))?.email).toBe('new@example.com');
  await changed.mutation(api.applications.saveDraft, { profile, answers });
  expect((await changed.query(api.applications.mine, {}))?.email).toBe('new@example.com');
  await changed.mutation(api.applications.submit, { profile, answers });
  expect((await changed.query(api.applications.mine, {}))?.email).toBe('new@example.com');
  const email = await f.t.run(ctx => ctx.db.query('emailDeliveries').first());
  expect(email?.email).toBe('new@example.com');
  const later = f.t.withIdentity({ ...identity('applicant'), email: 'later@example.com', emailVerified: true });
  await later.mutation(api.users.ensure, {});
  expect((await later.query(api.applications.mine, {}))?.email).toBe('new@example.com');
});
