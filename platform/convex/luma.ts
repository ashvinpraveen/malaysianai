import { v, ConvexError } from 'convex/values';
import { internalMutation } from './_generated/server';
import { reviewerQuery, adminMutation } from './access';
import { CALENDAR_ID, MAX_EVENTS, sourceEvent, storedEvent, observation, syncState, validateEvent, validCount, observationDay } from './lumaModel';

export const ingest = internalMutation({
  args: { events: v.array(sourceEvent), observedAt: v.number() }, returns: v.object({ applied: v.boolean(), events: v.number() }),
  handler: async (ctx, { events, observedAt }) => {
    if (!Number.isSafeInteger(observedAt) || observedAt > Date.now() + 60_000 || observedAt < Date.now() - 60 * 60_000) throw new Error('Observation must be from the current sync.');
    if (!events.length || events.length > MAX_EVENTS || new Set(events.map(event => event.lumaId)).size !== events.length) throw new Error('Invalid event batch.');
    events.forEach(validateEvent);
    const state = await ctx.db.query('lumaSync').withIndex('by_calendarId', q => q.eq('calendarId', CALENDAR_ID)).unique();
    if (state?.lastSuccessAt != null && observedAt <= state.lastSuccessAt) return { applied: false, events: state.eventCount };
    const existing = await ctx.db.query('lumaEvents').take(MAX_EVENTS + 1);
    if (new Set([...existing.map(event => event.lumaId), ...events.map(event => event.lumaId)]).size > MAX_EVENTS) throw new Error('Retained events exceed the atomic sync limit.');
    const byId = new Map(existing.map(event => [event.lumaId, event]));
    const day = observationDay(observedAt);
    const previous = await ctx.db.query('lumaObservations').withIndex('by_day', q => q.eq('day', day)).take(MAX_EVENTS + 1);
    const snapshots = new Map(previous.map(item => [item.lumaId, item]));
    for (const event of events) {
      const old = byId.get(event.lumaId);
      const fields = { ...event, observedAt, listed: true };
      if (old) await ctx.db.patch(old._id, fields);
      else await ctx.db.insert('lumaEvents', { ...fields, attendance: null });
      const snapshot = { lumaId: event.lumaId, day, observedAt, registrations: event.registrations, tickets: event.tickets };
      const previousSnapshot = snapshots.get(event.lumaId);
      if (previousSnapshot) await ctx.db.patch(previousSnapshot._id, snapshot);
      else await ctx.db.insert('lumaObservations', snapshot);
      byId.delete(event.lumaId);
    }
    for (const absent of byId.values()) if (absent.listed) await ctx.db.patch(absent._id, { listed: false });
    const fields = { calendarId: CALENDAR_ID, lastSuccessAt: observedAt, lastAttemptAt: observedAt, error: null, eventCount: events.length };
    if (state) await ctx.db.patch(state._id, fields); else await ctx.db.insert('lumaSync', fields);
    return { applied: true, events: events.length };
  },
});

export const failed = internalMutation({
  args: { attemptedAt: v.number() }, returns: v.null(),
  handler: async (ctx, { attemptedAt }) => {
    if (!Number.isSafeInteger(attemptedAt) || attemptedAt > Date.now() + 60_000 || attemptedAt < Date.now() - 60 * 60_000) throw new Error('Invalid attempt time.');
    const state = await ctx.db.query('lumaSync').withIndex('by_calendarId', q => q.eq('calendarId', CALENDAR_ID)).unique();
    if (state && (state.lastAttemptAt > attemptedAt || (state.lastSuccessAt !== null && state.lastSuccessAt >= attemptedAt))) return null;
    const fields = { lastAttemptAt: attemptedAt, error: 'Sync failed. The last complete observation is retained. Check GitHub Actions.' };
    if (state) await ctx.db.patch(state._id, fields);
    else await ctx.db.insert('lumaSync', { calendarId: CALENDAR_ID, lastSuccessAt: null, eventCount: 0, ...fields });
    return null;
  },
});

export const dashboard = reviewerQuery({
  args: {}, returns: v.object({ events: v.array(storedEvent), sync: v.union(syncState, v.null()) }),
  handler: async ctx => {
    const events = await ctx.db.query('lumaEvents').withIndex('by_startAt').order('desc').take(MAX_EVENTS + 1);
    if (events.length > MAX_EVENTS) throw new ConvexError('Calendar exceeds the dashboard limit. Please contact an admin.');
    return { events, sync: await ctx.db.query('lumaSync').withIndex('by_calendarId', q => q.eq('calendarId', CALENDAR_ID)).unique() };
  },
});
export const history = reviewerQuery({
  args: { id: v.id('lumaEvents') }, returns: v.array(observation),
  handler: async (ctx, { id }) => {
    const event = await ctx.db.get(id);
    if (!event) throw new ConvexError('Event not found.');
    return ctx.db.query('lumaObservations').withIndex('by_lumaId_and_day', q => q.eq('lumaId', event.lumaId)).order('desc').take(90);
  },
});
export const recordAttendance = adminMutation({
  args: { id: v.id('lumaEvents'), count: v.union(v.number(), v.null()), note: v.string() }, returns: v.null(),
  handler: async (ctx, { id, count, note }) => {
    validCount(count);
    const event = await ctx.db.get(id);
    if (!event) throw new ConvexError('Event not found.');
    if (event.startAt > Date.now()) throw new ConvexError('Attendance can only be recorded after the event starts.');
    if (!note.trim() || note.length > 1000) throw new ConvexError('Provide an attendance source or correction note (up to 1,000 characters).');
    await ctx.db.patch(id, { attendance: { count, note: note.trim(), recordedAt: Date.now(), recordedBy: ctx.user._id } });
    await ctx.db.insert('auditEvents', { applicationId: null, actor: ctx.user._id, kind: 'event_attendance_recorded', detail: JSON.stringify({ lumaId: event.lumaId, previousCount: event.attendance?.count ?? null, count, note: note.trim() }) });
    return null;
  },
});
