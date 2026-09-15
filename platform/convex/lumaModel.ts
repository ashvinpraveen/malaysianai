import { v, type Infer } from 'convex/values';

export const CALENDAR_ID = 'cal-pPgkuwCFrycSv1Z';
export const CALENDAR_URL = 'https://luma.com/malaysianai';
// ponytail: atomic reads/writes cap at 1,000 retained events; stage batches and paginate aggregates beyond this.
export const MAX_EVENTS = 1000;
const count = v.union(v.number(), v.null());
export const sourceEvent = v.object({
  lumaId: v.string(), title: v.string(), url: v.string(), startAt: v.number(), endAt: v.union(v.number(), v.null()),
  timezone: v.string(), ownerCalendarId: v.union(v.string(), v.null()), location: v.string(), tags: v.array(v.string()),
  registrations: count, tickets: count, capacity: count, soldOut: v.union(v.boolean(), v.null()),
  registrationAvailability: v.union(v.string(), v.null()),
  lifecycle: v.union(v.literal('unknown'), v.literal('scheduled'), v.literal('cancelled'), v.literal('postponed')),
});
export type SourceEvent = Infer<typeof sourceEvent>;
export const attendance = v.object({ count: count, note: v.string(), recordedAt: v.number(), recordedBy: v.id('users') });
export const storedEventFields = { ...sourceEvent.fields, listed: v.boolean(), observedAt: v.number(), attendance: v.union(attendance, v.null()) };
export const storedEvent = v.object({ _id: v.id('lumaEvents'), _creationTime: v.number(), ...storedEventFields });
export const observationFields = { lumaId: v.string(), day: v.string(), observedAt: v.number(), registrations: count, tickets: count };
export const observation = v.object({ _id: v.id('lumaObservations'), _creationTime: v.number(), ...observationFields });
export const syncFields = { calendarId: v.string(), lastSuccessAt: v.union(v.number(), v.null()), lastAttemptAt: v.number(), error: v.union(v.string(), v.null()), eventCount: v.number() };
export const syncState = v.object({ _id: v.id('lumaSync'), _creationTime: v.number(), ...syncFields });

export function validCount(value: number | null) {
  if (value !== null && (!Number.isSafeInteger(value) || value < 0)) throw new Error('Counts must be non-negative integers or unknown.');
}
export function validateEvent(event: SourceEvent) {
  if (!/^(evt|calev)-[A-Za-z0-9]+$/.test(event.lumaId) || !event.title.trim() || event.title.length > 500) throw new Error('Invalid event identity or title.');
  const url = new URL(event.url);
  if (url.protocol !== 'https:' || url.username || url.password || event.url.length > 2048) throw new Error('Invalid public event URL.');
  if (event.lumaId.startsWith('evt-') && (url.origin !== 'https://luma.com' || url.search || url.hash || !/^\/[A-Za-z0-9_-]+$/.test(url.pathname))) throw new Error('Invalid Luma event URL.');
  if (!Number.isFinite(event.startAt) || Math.abs(event.startAt) > 8.64e15 || (event.endAt !== null && (!Number.isFinite(event.endAt) || event.endAt < event.startAt || Math.abs(event.endAt) > 8.64e15))) throw new Error('Invalid event dates.');
  new Intl.DateTimeFormat('en', { timeZone: event.timezone }).format(event.startAt);
  if (event.ownerCalendarId !== null && !/^cal-[A-Za-z0-9]+$/.test(event.ownerCalendarId)) throw new Error('Invalid owning calendar.');
  if (event.location.length > 500 || event.tags.length > 30 || event.tags.some(tag => !tag.trim() || tag.length > 100) || (event.registrationAvailability?.length ?? 0) > 100) throw new Error('Event metadata exceeds limits.');
  for (const value of [event.registrations, event.tickets, event.capacity]) validCount(value);
}
export function observationDay(timestamp: number) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp);
}
