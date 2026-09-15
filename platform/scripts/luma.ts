import { CALENDAR_ID, CALENDAR_URL, MAX_EVENTS, validateEvent, type SourceEvent } from '../convex/lumaModel.ts';

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Unexpected Luma object.');
  return value as Record<string, unknown>;
}
function optionalObject(value: unknown) { return value == null ? {} : object(value); }
function string(value: unknown): string { if (typeof value !== 'string') throw new Error('Unexpected Luma text.'); return value; }
function count(value: unknown) { if (value == null) return null; if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) throw new Error('Invalid Luma count.'); return value; }
function boolean(value: unknown) { if (value == null) return null; if (typeof value !== 'boolean') throw new Error('Invalid Luma boolean.'); return value; }

export function parseEvent(value: unknown): SourceEvent {
  const entry = object(value), event = object(entry.event), ticket = optionalObject(entry.ticket_info);
  if (entry.calendar_api_id !== CALENDAR_ID) throw new Error('Unexpected source calendar.');
  const external = entry.platform === 'external';
  if (!external && entry.platform != null && entry.platform !== 'luma') throw new Error('Unsupported calendar entry platform.');
  if (event.visibility !== 'public' && (!external || event.visibility != null)) throw new Error('Non-public event in public calendar response.');
  const address = optionalObject(event.geo_address_info);
  const slug = string(event.url);
  const lifecycle = event.cancelled_at ? 'cancelled' : ['scheduled', 'cancelled', 'postponed'].includes(String(event.status)) ? event.status as SourceEvent['lifecycle'] : 'unknown';
  const result: SourceEvent = {
    lumaId: string(external ? entry.api_id : event.api_id), title: string(event.name), url: external || slug.startsWith('https://') ? slug : `https://luma.com/${slug}`,
    startAt: Date.parse(string(event.start_at)), endAt: event.end_at == null ? null : Date.parse(string(event.end_at)),
    timezone: string(event.timezone), ownerCalendarId: event.calendar_api_id == null ? null : string(event.calendar_api_id),
    // Only a city label: never carry hidden street addresses or virtual meeting credentials.
    location: event.location_type === 'online' ? 'Online' : [address.city, address.country].filter(value => typeof value === 'string' && value).join(', '),
    tags: entry.tags == null ? [] : (() => { if (!Array.isArray(entry.tags)) throw new Error('Invalid Luma tags.'); return entry.tags.map(tag => string(object(tag).name)); })(),
    registrations: count(entry.guest_count), tickets: count(entry.ticket_count), capacity: count(event.capacity),
    soldOut: boolean(ticket.is_sold_out), registrationAvailability: entry.registration_availability == null ? null : string(entry.registration_availability), lifecycle,
  };
  validateEvent(result);
  return result;
}

export async function fetchJson(url: URL, fetcher: typeof fetch = fetch, wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))): Promise<unknown> {
  for (let attempt = 0; attempt < 3; attempt++) {
    let response: Response;
    try {
      response = await fetcher(url, { headers: { Accept: 'application/json', Origin: 'https://luma.com', Referer: CALENDAR_URL }, signal: AbortSignal.timeout(30_000), redirect: 'error' });
      if (response.ok) return await response.json();
    } catch {
      if (attempt === 2) throw new Error('Luma request or JSON parsing failed after three attempts.');
      await wait(1000 * 2 ** attempt); continue;
    }
    if (response.status !== 429 && response.status < 500) throw new Error(`Luma HTTP ${response.status}.`);
    if (attempt === 2) throw new Error(`Luma HTTP ${response.status} after three attempts.`);
    const retry = response.headers.get('retry-after');
    const delay = retry ? (/^\d+(\.\d+)?$/.test(retry) ? Number(retry) * 1000 : Date.parse(retry) - Date.now()) : 1000 * 2 ** attempt;
    if (delay > 60_000) throw new Error('Luma retry delay exceeds the job budget.');
    await wait(Number.isFinite(delay) ? Math.max(0, delay) : 1000 * 2 ** attempt);
  }
  throw new Error('Luma request failed.');
}

export async function discover(fetchPage: (url: URL) => Promise<unknown> = fetchJson) {
  const events = new Map<string, SourceEvent>();
  for (const period of ['future', 'past']) {
    let cursor: string | null = null;
    const cursors = new Set<string>();
    for (let page = 0; page < 50; page++) {
      const url = new URL('https://api.luma.com/calendar/get-items');
      Object.entries({ calendar_api_id: CALENDAR_ID, period, pagination_limit: '50', ...(cursor ? { pagination_cursor: cursor } : {}) }).forEach(([key, value]) => url.searchParams.set(key, value));
      const data = object(await fetchPage(url));
      if (!Array.isArray(data.entries) || typeof data.has_more !== 'boolean') throw new Error('Invalid Luma pagination response.');
      for (const value of data.entries) {
        const event = parseEvent(value);
        events.set(event.lumaId, event);
        if (events.size > MAX_EVENTS) throw new Error('Calendar exceeds the atomic sync limit.');
      }
      if (!data.has_more) break;
      cursor = string(data.next_cursor);
      if (!cursor || cursors.has(cursor) || page === 49) throw new Error('Luma pagination is incomplete.');
      cursors.add(cursor);
    }
  }
  // An unexpected empty response must never mark the entire known calendar absent.
  if (!events.size) throw new Error('Luma returned an empty calendar; investigate before reconciling.');
  return [...events.values()];
}
