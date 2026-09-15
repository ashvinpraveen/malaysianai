import { convexTest } from 'convex-test';
import { afterEach, expect, test, vi } from 'vitest';
import schema from '../convex/schema';
import { api, internal } from '../convex/_generated/api';
import { CALENDAR_ID, MAX_EVENTS, observationDay } from '../convex/lumaModel';
import { discover, fetchJson, parseEvent } from '../scripts/luma';

const modules = import.meta.glob('../convex/**/*.ts');
const entry = () => ({ calendar_api_id: CALENDAR_ID, event: { api_id: 'evt-Test1', name: 'Builder evening', url: 'test-event', visibility: 'public', calendar_api_id: CALENDAR_ID, start_at: '2026-09-01T10:00:00Z', end_at: '2026-09-01T12:00:00Z', timezone: 'Asia/Kuala_Lumpur', geo_address_info: { city: 'Kuala Lumpur', country: 'Malaysia', full_address: 'Secret street' } }, guest_count: 0, ticket_count: 0, ticket_info: { is_sold_out: false }, featured_guests: [{ email: 'never-store@example.com' }], tags: [{ name: 'Build' }] });
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
test('parser preserves zero, drops personal snippets/hidden addresses, and leaves missing counts unknown', () => {
  const raw = entry(); const event = parseEvent(raw);
  expect(event.registrations).toBe(0); expect(event.soldOut).toBe(false); expect(event.capacity).toBeNull();
  expect(JSON.stringify(event)).not.toMatch(/never-store|Secret street|featured_guests/);
  expect(parseEvent({ ...raw, guest_count: null }).registrations).toBeNull();
  for (const guest_count of [-1, 2.5, '4', Infinity]) expect(() => parseEvent({ ...raw, guest_count })).toThrow();
  for (const change of [{ start_at: 'bad' }, { end_at: '2000-01-01' }, { timezone: 'invalid/zone' }, { url: 'https://evil.example/test' }, { visibility: 'private' }]) expect(() => parseEvent({ ...raw, event: { ...raw.event, ...change } })).toThrow();
  expect(() => parseEvent({ ...raw, calendar_api_id: 'cal-Wrong' })).toThrow();
});
test('discovery paginates both periods and deduplicates event identities', async () => {
  const calls: URL[] = [];
  const events = await discover(async url => {
    calls.push(url); const next = url.searchParams.has('pagination_cursor');
    return { entries: [entry()], has_more: !next, next_cursor: next ? null : 'second' };
  });
  expect(events).toHaveLength(1); expect(calls).toHaveLength(4);
  expect(calls.map(url => url.searchParams.get('period'))).toEqual(['future', 'future', 'past', 'past']);
});
test('public calendar external listings retain stable calendar-entry IDs with unknown registration counts', () => {
  const external = { ...entry(), api_id: 'calev-External1', platform: 'external', guest_count: null, ticket_count: null, event: { name: 'External event', url: 'https://aimto.my', start_at: '2026-08-11T02:00:00Z', timezone: 'Asia/Kuala_Lumpur' } };
  const event = parseEvent(external);
  expect(event.lumaId).toBe('calev-External1'); expect(event.ownerCalendarId).toBeNull(); expect(event.registrations).toBeNull();
  expect(event.url).toBe('https://aimto.my');
  expect(() => parseEvent({ ...external, event: { ...external.event, url: 'javascript:alert(1)' } })).toThrow();
});
test('incomplete pagination, malformed rows, empty feeds and excessive calendars fail closed', async () => {
  for (const response of [{ entries: [entry()], has_more: true, next_cursor: 'repeated' }, { entries: [entry()], has_more: true }, { entries: [{ event: {} }], has_more: false }, { entries: [], has_more: false }, { entries: [entry()] }]) {
    await expect(discover(async () => response)).rejects.toThrow();
  }
  await expect(discover(async () => ({ entries: Array.from({ length: MAX_EVENTS + 1 }, (_, i) => ({ ...entry(), event: { ...entry().event, api_id: `evt-Test${i}` } })), has_more: false }))).rejects.toThrow(/limit/);
  let pages = 0;
  await expect(discover(async () => ({ entries: [entry()], has_more: true, next_cursor: String(++pages) }))).rejects.toThrow(/incomplete/);
  expect(pages).toBe(50);
});
test('HTTP retries respect 429 delays and stop on permanent errors or long cooldowns', async () => {
  const wait = vi.fn().mockResolvedValue(undefined);
  const fetcher = vi.fn().mockResolvedValueOnce(new Response('', { status: 429, headers: { 'retry-after': '2' } })).mockResolvedValueOnce(new Response('{"ok":true}'));
  expect(await fetchJson(new URL('https://api.luma.com/test'), fetcher, wait)).toEqual({ ok: true });
  expect(wait).toHaveBeenCalledWith(2000);
  await expect(fetchJson(new URL('https://api.luma.com/test'), vi.fn().mockResolvedValue(new Response('', { status: 403 })), wait)).rejects.toThrow(/403/);
  await expect(fetchJson(new URL('https://api.luma.com/test'), vi.fn().mockResolvedValue(new Response('', { status: 429, headers: { 'retry-after': '120' } })), wait)).rejects.toThrow(/budget/);
  const failed = vi.fn().mockRejectedValue(new Error('private response must not escape'));
  await expect(fetchJson(new URL('https://api.luma.com/test'), failed, wait)).rejects.toThrow('Luma request or JSON parsing failed after three attempts.');
  expect(failed).toHaveBeenCalledTimes(3);
});
async function setup() {
  vi.useFakeTimers(); vi.setSystemTime(new Date('2026-09-15T01:00:00Z'));
  const t = convexTest(schema, modules);
  const account = (name: string, verified = true) => t.withIdentity({ tokenIdentifier: `test|${name}`, subject: name, issuer: 'test', email: `${name}@example.com`, emailVerified: verified });
  const admin = account('admin'), resident = account('resident'), applicant = account('applicant');
  const adminId = await admin.mutation(api.users.ensure, {}), residentId = await resident.mutation(api.users.ensure, {});
  await applicant.mutation(api.users.ensure, {});
  await t.run(async ctx => { await ctx.db.patch(adminId, { admin: true }); await ctx.db.patch(residentId, { resident: true }); });
  const event = parseEvent(entry());
  await t.mutation(internal.luma.ingest, { events: [event], observedAt: Date.now() });
  return { t, admin, resident, applicant, account, event };
}
test('dashboard and history require current resident/admin access; only admins record attendance', async () => {
  const f = await setup(); const id = (await f.admin.query(api.luma.dashboard, {})).events[0]._id;
  expect((await f.resident.query(api.luma.dashboard, {})).events).toHaveLength(1);
  for (const client of [f.t, f.applicant, f.account('resident', false)]) {
    await expect(client.query(api.luma.dashboard, {})).rejects.toThrow();
    await expect(client.query(api.luma.history, { id })).rejects.toThrow();
  }
  await expect(f.resident.mutation(api.luma.recordAttendance, { id, count: 1, note: 'Door count' })).rejects.toThrow();
  for (const count of [-1, 1.5]) await expect(f.admin.mutation(api.luma.recordAttendance, { id, count, note: 'Door count' })).rejects.toThrow();
  await expect(f.admin.mutation(api.luma.recordAttendance, { id, count: 1, note: ' ' })).rejects.toThrow();
  await f.admin.mutation(api.luma.recordAttendance, { id, count: 0, note: 'Organizer headcount: nobody arrived.' });
  expect((await f.resident.query(api.luma.dashboard, {})).events[0].attendance?.count).toBe(0);
  await f.admin.mutation(api.luma.recordAttendance, { id, count: null, note: 'Incorrect count; awaiting source.' });
  expect((await f.resident.query(api.luma.dashboard, {})).events[0].attendance?.count).toBeNull();
  expect(await f.t.run(ctx => ctx.db.query('auditEvents').take(10))).toHaveLength(2);
});
test('sync is atomic, daily-idempotent and never overwrites attendance; older runs cannot regress state', async () => {
  const f = await setup(); const original = (await f.admin.query(api.luma.dashboard, {})).events[0];
  await f.admin.mutation(api.luma.recordAttendance, { id: original._id, count: 10, note: 'Organizer headcount.' });
  vi.advanceTimersByTime(1000);
  await f.t.mutation(internal.luma.ingest, { events: [{ ...f.event, registrations: 12 }], observedAt: Date.now() });
  let data = await f.resident.query(api.luma.dashboard, {});
  expect(data.events).toHaveLength(1); expect(data.events[0]._id).toBe(original._id); expect(data.events[0].attendance?.count).toBe(10);
  expect(await f.resident.query(api.luma.history, { id: original._id })).toHaveLength(1);
  await expect(f.t.mutation(internal.luma.ingest, { events: [{ ...f.event, registrations: -2 }], observedAt: Date.now() + 1 })).rejects.toThrow();
  expect((await f.resident.query(api.luma.dashboard, {})).events[0].registrations).toBe(12);
  expect(await f.t.mutation(internal.luma.ingest, { events: [f.event], observedAt: original.observedAt })).toEqual({ applied: false, events: 1 });
  await f.t.mutation(internal.luma.failed, { attemptedAt: Date.now() });
  expect((await f.resident.query(api.luma.dashboard, {})).sync?.error).toBeNull();
  await f.t.mutation(internal.luma.failed, { attemptedAt: original.observedAt });
  expect((await f.resident.query(api.luma.dashboard, {})).sync?.error).toBeNull();
  vi.advanceTimersByTime(24 * 60 * 60_000);
  await f.t.mutation(internal.luma.ingest, { events: [{ ...f.event, registrations: null }], observedAt: Date.now() });
  data = await f.resident.query(api.luma.dashboard, {});
  expect(data.events[0].registrations).toBeNull(); expect(data.events[0].attendance?.count).toBe(10);
  const history = await f.resident.query(api.luma.history, { id: original._id });
  expect(history.map(item => item.registrations)).toEqual([null, 12]);
  expect(observationDay(Date.parse('2026-09-15T17:00:00Z'))).toBe('2026-09-16');
});
test('complete discovery marks disappeared events unlisted, reappearance restores them, failure preserves latest success', async () => {
  const f = await setup(); const next = { ...f.event, lumaId: 'evt-Second' };
  vi.advanceTimersByTime(1000);
  await f.t.mutation(internal.luma.ingest, { events: [next], observedAt: Date.now() });
  let data = await f.admin.query(api.luma.dashboard, {});
  expect(data.events.find(event => event.lumaId === f.event.lumaId)?.listed).toBe(false);
  expect(data.events.find(event => event.lumaId === f.event.lumaId)?.lifecycle).toBe('unknown');
  const lastSuccess = data.sync?.lastSuccessAt;
  vi.advanceTimersByTime(1000); await f.t.mutation(internal.luma.failed, { attemptedAt: Date.now() });
  data = await f.admin.query(api.luma.dashboard, {});
  expect(data.sync?.error).toContain('Sync failed'); expect(data.sync?.lastSuccessAt).toBe(lastSuccess);
  vi.advanceTimersByTime(1000); await f.t.mutation(internal.luma.ingest, { events: [next, f.event], observedAt: Date.now() });
  data = await f.admin.query(api.luma.dashboard, {}); expect(data.events.every(event => event.listed)).toBe(true); expect(data.sync?.error).toBeNull();
  await expect(f.t.mutation(internal.luma.ingest, { events: [], observedAt: Date.now() })).rejects.toThrow();
  await expect(f.t.mutation(internal.luma.ingest, { events: [next, next], observedAt: Date.now() })).rejects.toThrow();
});
