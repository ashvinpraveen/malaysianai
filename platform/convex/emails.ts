import { ConvexError, v } from 'convex/values';
import { internalAction, internalMutation } from './_generated/server';
import { internal } from './_generated/api';
import { email } from './validators';
import { adminMutation, adminQuery } from './access';
const delays = [60_000, 300_000, 1_800_000];
export const claim = internalMutation({ args: { id: v.id('emailDeliveries') }, returns: v.union(email, v.null()), handler: async (ctx, args) => {
  const item = await ctx.db.get(args.id);
  if (!item || item.state !== 'pending') return null;
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM || !process.env.PLATFORM_URL) {
    await ctx.db.patch(item._id, { state: 'failed', lastError: 'Email configuration is incomplete.' });
    return null;
  }
  if (item.firstAttemptAt && Date.now() - item.firstAttemptAt > 23 * 60 * 60 * 1000) {
    await ctx.db.patch(item._id, { state: 'failed', lastError: 'Delivery is uncertain beyond the provider retry window. Verify delivery before any manual resend.' });
    return null;
  }
  const next = { ...item, state: 'sending' as const, attempts: item.attempts + 1, firstAttemptAt: item.firstAttemptAt ?? Date.now() };
  await ctx.db.patch(item._id, { state: next.state, attempts: next.attempts, firstAttemptAt: next.firstAttemptAt });
  await ctx.scheduler.runAfter(120_000, internal.emails.recover, { id: item._id, attempt: next.attempts });
  return next;
} });
export const finish = internalMutation({ args: { id: v.id('emailDeliveries'), providerId: v.union(v.string(), v.null()), error: v.string() }, returns: v.null(), handler: async (ctx, args) => {
  const item = await ctx.db.get(args.id);
  if (!item || item.state === 'sent') return null;
  if (args.providerId) await ctx.db.patch(item._id, { state: 'sent', providerId: args.providerId, lastError: '' });
  else {
    const retry = item.attempts < 4;
    await ctx.db.patch(item._id, { state: retry ? 'pending' : 'failed', lastError: args.error });
    if (retry) await ctx.scheduler.runAfter(delays[item.attempts - 1] ?? 1_800_000, internal.emails.send, { id: item._id });
  }
  return null;
} });
export const recover = internalMutation({ args: { id: v.id('emailDeliveries'), attempt: v.number() }, returns: v.null(), handler: async (ctx, args) => {
  const item = await ctx.db.get(args.id);
  if (item?.state === 'sending' && item.attempts === args.attempt) {
    await ctx.db.patch(item._id, { state: item.attempts < 4 ? 'pending' : 'failed', lastError: 'Email action interrupted; delivery has not been confirmed.' });
    if (item.attempts < 4) await ctx.scheduler.runAfter(0, internal.emails.send, { id: item._id });
  }
  return null;
} });
export const send = internalAction({ args: { id: v.id('emailDeliveries') }, returns: v.null(), handler: async (ctx, args) => {
  const item = await ctx.runMutation(internal.emails.claim, args);
  if (!item) return null;
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const origin = process.env.PLATFORM_URL;
  if (!key || !from || !origin) {
    await ctx.runMutation(internal.emails.finish, { id: item._id, providerId: null, error: 'Email configuration is incomplete.' }); return null;
  }
  const messages = {
    submitted: ["We've received your application", 'Your application to the Malaysian AI Residency has been received. You can check its status in your account.'],
    accepted: ["Welcome to the Residency", 'Your application to the Malaysian AI Residency has been accepted. The team will be in touch about joining.'],
    rejected: ['An update on your residency application', 'Thank you for applying to the Malaysian AI Residency. After reviewing your application, we are unable to offer you a place this time. Thank you for sharing your work with us.'],
  };
  const [subject, body] = messages[item.kind];
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST', signal: AbortSignal.timeout(20_000),
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `residency-${item._id}` },
      body: JSON.stringify({ from, to: [item.email], subject, text: `Hi ${item.name},\n\n${body}\n\n${new URL('/application', origin).href}\n\nMalaysian AI` }),
    });
    const result = await response.json() as { id?: string };
    if (!response.ok || !result.id) throw new Error(`Email provider returned HTTP ${response.status}.`);
    await ctx.runMutation(internal.emails.finish, { id: item._id, providerId: result.id, error: '' });
  } catch {
    await ctx.runMutation(internal.emails.finish, { id: item._id, providerId: null, error: 'The provider did not confirm delivery. Safe retry scheduled within its idempotency window.' });
  }
  return null;
} });
export const failures = adminQuery({ args: {}, returns: v.array(email), handler: async ctx => ctx.db.query('emailDeliveries').withIndex('by_state', q => q.eq('state', 'failed')).order('desc').take(50) });
export const retry = adminMutation({ args: { id: v.id('emailDeliveries') }, returns: v.null(), handler: async (ctx, args) => {
  const item = await ctx.db.get(args.id);
  if (!item || item.state !== 'failed') throw new ConvexError('Only failed deliveries can be retried.');
  if (item.firstAttemptAt && Date.now() - item.firstAttemptAt > 23 * 60 * 60 * 1000) throw new ConvexError('Verify delivery with the provider: the safe retry window has expired.');
  await ctx.db.patch(item._id, { state: 'pending', attempts: 0 });
  await ctx.db.insert('auditEvents', { actor: ctx.user._id, applicationId: item.applicationId, kind: 'email_retry', detail: `Retry ${item._id}` });
  await ctx.scheduler.runAfter(0, internal.emails.send, { id: item._id });
  return null;
} });
