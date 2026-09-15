import { ConvexError } from 'convex/values';
import type { UserIdentity } from 'convex/server';
import { customCtx, customQuery, customMutation } from 'convex-helpers/server/customFunctions';
import { query, mutation, type QueryCtx } from './_generated/server';
export function verifiedIdentity(identity: UserIdentity | null) {
  if (!identity) throw new ConvexError('Please sign in.');
  if (!identity.email || typeof identity.emailVerified !== 'boolean') throw new ConvexError('Your sign-in token is missing email information. Please contact the residency team to check the sign-in configuration.');
  if (!identity.emailVerified) throw new ConvexError('Sign in with a verified email address.');
  return { ...identity, email: identity.email };
}
export async function currentUser(ctx: QueryCtx) {
  const identity = verifiedIdentity(await ctx.auth.getUserIdentity());
  const user = await ctx.db.query('users').withIndex('by_tokenIdentifier', q => q.eq('tokenIdentifier', identity.tokenIdentifier)).unique();
  if (!user) throw new ConvexError('Finish setting up your account.');
  return { ...user, email: identity.email };
}
const memberContext = customCtx(async (ctx: QueryCtx) => ({ user: await currentUser(ctx) }));
const reviewerContext = customCtx(async (ctx: QueryCtx) => {
  const user = await currentUser(ctx);
  if (!user.resident && !user.admin) throw new ConvexError('Resident access required.');
  return { user };
});
const adminContext = customCtx(async (ctx: QueryCtx) => {
  const user = await currentUser(ctx);
  if (!user.admin) throw new ConvexError('Admin access required.');
  return { user };
});
export const memberQuery = customQuery(query, memberContext);
export const memberMutation = customMutation(mutation, memberContext);
export const reviewerQuery = customQuery(query, reviewerContext);
export const reviewerMutation = customMutation(mutation, reviewerContext);
export const adminQuery = customQuery(query, adminContext);
export const adminMutation = customMutation(mutation, adminContext);
