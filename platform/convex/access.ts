import { ConvexError } from 'convex/values';
import { customCtx, customQuery, customMutation } from 'convex-helpers/server/customFunctions';
import { query, mutation, type QueryCtx } from './_generated/server';
export async function currentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError('Please sign in.');
  const user = await ctx.db.query('users').withIndex('by_tokenIdentifier', q => q.eq('tokenIdentifier', identity.tokenIdentifier)).unique();
  if (!user) throw new ConvexError('Finish setting up your account.');
  return user;
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
