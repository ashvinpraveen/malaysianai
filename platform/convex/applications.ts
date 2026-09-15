import { ConvexError, v } from 'convex/values';
import { paginationOptsValidator, paginationResultValidator } from 'convex/server';
import { memberQuery, memberMutation, reviewerQuery, reviewerMutation, adminMutation } from './access';
import { answers, application, event, profile, review, state, vote } from './validators';
import { consensus, isFinal, isFlagged, validateAnswers, validateProfile, validateVote } from '../src/domain';
import type { Doc, Id } from './_generated/dataModel';
import type { MutationCtx, QueryCtx } from './_generated/server';
import { internal } from './_generated/api';

const namedReviewer = v.object({ id: v.id('users'), name: v.string(), active: v.boolean() });
const applicantView = v.object({ id: v.id('applications'), profile, answers, email: v.string(), state: v.union(v.literal('draft'), v.literal('submitted'), v.literal('reviewing'), v.literal('accepted'), v.literal('rejected')), submittedAt: v.union(v.number(), v.null()), decidedAt: v.union(v.number(), v.null()) });
async function reviewsFor(ctx: QueryCtx, id: Id<'applications'>) {
  return ctx.db.query('reviews').withIndex('by_applicationId_and_reviewer', q => q.eq('applicationId', id)).take(101);
}
async function getSubmitted(ctx: QueryCtx & { user: Doc<'users'> }, id: Id<'applications'>) {
  const app = await ctx.db.get(id);
  if (!app?.submitted || app.owner === ctx.user._id) throw new ConvexError('Application not found.');
  return app;
}
async function audit(ctx: MutationCtx, actor: Id<'users'>, applicationId: Id<'applications'>, kind: string, detail: string) {
  await ctx.db.insert('auditEvents', { actor, applicationId, kind, detail });
}
async function queueEmail(ctx: MutationCtx, app: Doc<'applications'>, kind: 'submitted' | 'accepted' | 'rejected') {
  if (await ctx.db.query('emailDeliveries').withIndex('by_applicationId_and_kind', q => q.eq('applicationId', app._id).eq('kind', kind)).unique()) return;
  const id = await ctx.db.insert('emailDeliveries', { applicationId: app._id, kind, email: app.email, name: app.profile.name, state: 'pending', attempts: 0, firstAttemptAt: null, lastError: '', providerId: null });
  await ctx.scheduler.runAfter(0, internal.emails.send, { id });
}
async function recalculate(ctx: MutationCtx, app: Doc<'applications'>, actor: Id<'users'>) {
  const reviews = await reviewsFor(ctx, app._id);
  const next = consensus(app.voters.length, reviews);
  await ctx.db.patch(app._id, { state: next, flagged: reviews.some(isFlagged), decidedAt: next === 'accepted' ? Date.now() : null });
  if (next === 'accepted') {
    await audit(ctx, actor, app._id, 'accepted', 'All assigned residents voted Yes.');
    await queueEmail(ctx, app, 'accepted');
  }
}
export const mine = memberQuery({ args: {}, returns: v.union(applicantView, v.null()), handler: async ctx => {
  const app = await ctx.db.query('applications').withIndex('by_owner', q => q.eq('owner', ctx.user._id)).unique();
  if (!app) return null;
  const safeState = app.state === 'discussion' || app.state === 'admin_resolution' ? 'reviewing' : app.state;
  return { id: app._id, profile: app.profile, answers: app.answers, email: app.email, state: safeState, submittedAt: app.submittedAt, decidedAt: app.decidedAt };
} });
export const saveDraft = memberMutation({ args: { profile, answers }, returns: v.id('applications'), handler: async (ctx, args) => {
  validateProfile(args.profile, false); validateAnswers(args.answers, false);
  const existing = await ctx.db.query('applications').withIndex('by_owner', q => q.eq('owner', ctx.user._id)).unique();
  if (existing?.submitted) throw new ConvexError('Your submitted application is locked.');
  await ctx.db.patch(ctx.user._id, { profile: args.profile });
  const fields = { profile: args.profile, answers: args.answers, applicantName: args.profile.name, email: ctx.user.email };
  if (existing) { await ctx.db.patch(existing._id, fields); return existing._id; }
  return ctx.db.insert('applications', { ...fields, owner: ctx.user._id, submitted: false, state: 'draft', voters: [], flagged: false, submittedAt: null, decidedAt: null, decisionReason: '' });
} });
export const submit = memberMutation({ args: { profile, answers }, returns: v.id('applications'), handler: async (ctx, args) => {
  const existing = await ctx.db.query('applications').withIndex('by_owner', q => q.eq('owner', ctx.user._id)).unique();
  if (existing?.submitted) return existing._id;
  validateProfile(args.profile, true); validateAnswers(args.answers, true);
  const residents = await ctx.db.query('users').withIndex('by_resident', q => q.eq('resident', true)).take(101);
  if (residents.length > 100) throw new ConvexError('Please contact the team: the review panel needs configuration.');
  const fields = { owner: ctx.user._id, profile: args.profile, answers: args.answers, email: ctx.user.email, applicantName: args.profile.name, submitted: true, state: 'submitted' as const, voters: residents.filter(person => person._id !== ctx.user._id).map(person => person._id), flagged: false, submittedAt: Date.now(), decidedAt: null, decisionReason: '' };
  const id = existing ? existing._id : await ctx.db.insert('applications', fields);
  if (existing) await ctx.db.patch(id, fields);
  await ctx.db.patch(ctx.user._id, { profile: args.profile });
  await audit(ctx, ctx.user._id, id, 'submitted', 'Application and voter roster frozen.');
  await queueEmail(ctx, (await ctx.db.get(id))!, 'submitted');
  return id;
} });
const summary = v.object({ application, reviews: v.array(review) });
export const list = reviewerQuery({ args: { paginationOpts: paginationOptsValidator, search: v.string(), state: v.optional(state) }, returns: paginationResultValidator(summary), handler: async (ctx, args) => {
  const search = args.search.trim().slice(0, 200);
  const rows = search
    ? await ctx.db.query('applications').withSearchIndex('search_name', q => {
      const base = q.search('applicantName', search).eq('submitted', true);
      return args.state ? base.eq('state', args.state) : base;
    }).filter(q => q.neq(q.field('owner'), ctx.user._id)).paginate(args.paginationOpts)
    : await ctx.db.query('applications').withIndex('by_submitted_and_state', q => args.state ? q.eq('submitted', true).eq('state', args.state) : q.eq('submitted', true)).order('desc').filter(q => q.neq(q.field('owner'), ctx.user._id)).paginate(args.paginationOpts);
  return { ...rows, page: await Promise.all(rows.page.map(async app => ({ application: app, reviews: await reviewsFor(ctx, app._id) }))) };
} });
export const detail = reviewerQuery({ args: { id: v.id('applications') }, returns: v.object({ application, reviews: v.array(review), voters: v.array(namedReviewer), history: v.array(event) }), handler: async (ctx, args) => {
  const app = await getSubmitted(ctx, args.id);
  const voters = await Promise.all(app.voters.map(async id => {
    const person = await ctx.db.get(id);
    return { id, name: person?.profile.name || 'Resident', active: !!person?.resident };
  }));
  return { application: app, reviews: await reviewsFor(ctx, app._id), voters, history: await ctx.db.query('auditEvents').withIndex('by_applicationId', q => q.eq('applicationId', app._id)).order('desc').take(50) };
} });
export const saveReview = reviewerMutation({ args: { id: v.id('applications'), ...vote }, returns: v.null(), handler: async (ctx, args) => {
  const app = await getSubmitted(ctx, args.id);
  if (isFinal(app.state)) throw new ConvexError('This application has a final decision.');
  if (!ctx.user.resident || !app.voters.includes(ctx.user._id) || app.owner === ctx.user._id) throw new ConvexError('You are not an active assigned reviewer.');
  validateVote(args);
  const previous = await ctx.db.query('reviews').withIndex('by_applicationId_and_reviewer', q => q.eq('applicationId', app._id).eq('reviewer', ctx.user._id)).unique();
  const value = { decision: args.decision, scores: args.scores, reason: args.decision === 'no' ? args.reason.trim() : '', updatedAt: Date.now() };
  if (previous) await ctx.db.patch(previous._id, value);
  else await ctx.db.insert('reviews', { applicationId: app._id, reviewer: ctx.user._id, ...value });
  await audit(ctx, ctx.user._id, app._id, 'review_saved', JSON.stringify({ before: previous ? { decision: previous.decision, scores: previous.scores, reason: previous.reason } : null, after: value }));
  await recalculate(ctx, app, ctx.user._id);
  return null;
} });
export const resolve = adminMutation({ args: { id: v.id('applications'), decision: v.union(v.literal('accepted'), v.literal('rejected')), reason: v.string() }, returns: v.null(), handler: async (ctx, args) => {
  const app = await getSubmitted(ctx, args.id);
  if (isFinal(app.state)) throw new ConvexError('This application has a final decision.');
  if (app.owner === ctx.user._id) throw new ConvexError('You cannot resolve your own application.');
  if (!args.reason.trim() || args.reason.length > 4000) throw new ConvexError('Record a reason for the final decision.');
  const reviews = await reviewsFor(ctx, app._id);
  const current = consensus(app.voters.length, reviews);
  if (args.decision === 'accepted' && current !== 'admin_resolution') throw new ConvexError('Acceptance requires all responses and no No votes.');
  if (args.decision === 'rejected' && !['discussion', 'admin_resolution'].includes(current)) throw new ConvexError('A No vote or a completed abstention review is required.');
  await ctx.db.patch(app._id, { state: args.decision, decisionReason: args.reason.trim(), decidedAt: Date.now() });
  await audit(ctx, ctx.user._id, app._id, args.decision, args.reason.trim());
  await queueEmail(ctx, app, args.decision);
  return null;
} });
export const changeRoster = adminMutation({ args: { id: v.id('applications'), replace: v.union(v.id('users'), v.null()), add: v.id('users'), reason: v.string() }, returns: v.null(), handler: async (ctx, args) => {
  const app = await getSubmitted(ctx, args.id);
  if (isFinal(app.state) || app.owner === ctx.user._id) throw new ConvexError('This roster cannot be changed.');
  if (!args.reason.trim() || args.reason.length > 2000) throw new ConvexError('Record a reason for changing the panel.');
  const target = await ctx.db.get(args.add);
  if (!target?.resident || app.voters.includes(args.add) || app.owner === args.add) throw new ConvexError('Choose another active resident.');
  if (args.replace) {
    if (!app.voters.includes(args.replace)) throw new ConvexError('Reviewer is not on this panel.');
    if (await ctx.db.query('reviews').withIndex('by_applicationId_and_reviewer', q => q.eq('applicationId', app._id).eq('reviewer', args.replace!)).unique()) throw new ConvexError('A reviewer who has voted cannot be removed.');
  }
  const voters = [...app.voters.filter(id => id !== args.replace), args.add];
  if (voters.length > 100) throw new ConvexError('A panel can have at most 100 reviewers.');
  await ctx.db.patch(app._id, { voters });
  await audit(ctx, ctx.user._id, app._id, 'roster_changed', JSON.stringify({ replaced: args.replace, added: args.add, reason: args.reason.trim() }));
  await recalculate(ctx, { ...app, voters }, ctx.user._id);
  return null;
} });
