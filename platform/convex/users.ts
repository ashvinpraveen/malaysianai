import { ConvexError, v } from 'convex/values';
import { query, mutation, internalMutation } from './_generated/server';
import { adminMutation, adminQuery, memberMutation } from './access';
import { profile, user } from './validators';
import { EMPTY_PROFILE, validateProfile } from '../src/domain';

export const me = query({ args: {}, returns: v.union(user, v.null()), handler: async ctx => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return ctx.db.query('users').withIndex('by_tokenIdentifier', q => q.eq('tokenIdentifier', identity.tokenIdentifier)).unique();
} });
export const ensure = mutation({ args: {}, returns: v.id('users'), handler: async ctx => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError('Please sign in.');
  if (!identity.email || typeof identity.emailVerified !== 'boolean') throw new ConvexError('Your sign-in token is missing email information. Please contact the residency team to check the sign-in configuration.');
  if (!identity.emailVerified) throw new ConvexError('Sign in with a verified email address.');
  const existing = await ctx.db.query('users').withIndex('by_tokenIdentifier', q => q.eq('tokenIdentifier', identity.tokenIdentifier)).unique();
  if (existing) { if (existing.email !== identity.email) await ctx.db.patch(existing._id, { email: identity.email }); return existing._id; }
  return ctx.db.insert('users', { tokenIdentifier: identity.tokenIdentifier, email: identity.email, profile: { ...EMPTY_PROFILE, name: identity.name ?? '' }, resident: false, admin: false });
} });
export const saveProfile = memberMutation({ args: { profile }, returns: v.null(), handler: async (ctx, args) => {
  validateProfile(args.profile, false); await ctx.db.patch(ctx.user._id, { profile: args.profile }); return null;
} });
export const residents = adminQuery({ args: {}, returns: v.array(user), handler: async ctx => {
  // ponytail: at most 100 active reviewers; move to paginated panel membership if the residency exceeds this.
  return ctx.db.query('users').withIndex('by_resident', q => q.eq('resident', true)).take(101);
} });
export const findByEmail = adminQuery({ args: { email: v.string() }, returns: v.array(user), handler: async (ctx, args) => ctx.db.query('users').withIndex('by_email', q => q.eq('email', args.email.trim())).take(10) });
export const setAccess = adminMutation({ args: { userId: v.id('users'), resident: v.boolean(), admin: v.boolean(), reason: v.string() }, returns: v.null(), handler: async (ctx, args) => {
  if (!args.reason.trim() || args.reason.length > 2000) throw new ConvexError('Record a reason for this access change.');
  const target = await ctx.db.get(args.userId);
  if (!target) throw new ConvexError('Account not found.');
  if (target.admin && !args.admin) {
    const admins = await ctx.db.query('users').withIndex('by_admin', q => q.eq('admin', true)).take(2);
    if (admins.length < 2) throw new ConvexError('Keep at least one designated admin.');
  }
  await ctx.db.patch(target._id, { resident: args.resident, admin: args.admin });
  await ctx.db.insert('auditEvents', { actor: ctx.user._id, applicationId: null, kind: 'access_changed', detail: JSON.stringify({ userId: target._id, before: { resident: target.resident, admin: target.admin }, after: { resident: args.resident, admin: args.admin }, reason: args.reason.trim() }) });
  return null;
} });
export const bootstrapAdmin = internalMutation({ args: { tokenIdentifier: v.string() }, returns: v.null(), handler: async (ctx, args) => {
  if (await ctx.db.query('users').withIndex('by_admin', q => q.eq('admin', true)).first()) throw new ConvexError('An admin already exists.');
  const target = await ctx.db.query('users').withIndex('by_tokenIdentifier', q => q.eq('tokenIdentifier', args.tokenIdentifier)).unique();
  if (!target) throw new ConvexError('The designated admin must sign in first.');
  await ctx.db.patch(target._id, { admin: true });
  await ctx.db.insert('auditEvents', { actor: target._id, applicationId: null, kind: 'admin_bootstrapped', detail: 'First admin activated through trusted deployment access.' });
  return null;
} });
