import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import type { FunctionReturnType } from 'convex/server';
import type { Doc, Id } from '../convex/_generated/dataModel';
import { api } from '../convex/_generated/api';
import { CALENDAR_ID, CALENDAR_URL } from '../convex/lumaModel';
import { Hero, Notice, errorMessage } from './ui';

type DashboardData = FunctionReturnType<typeof api.luma.dashboard>;
type Event = Doc<'lumaEvents'>;
const count = (value: number | null) => value === null ? 'Unknown' : value.toLocaleString('en-MY');
const date = (value: number) => new Intl.DateTimeFormat('en-MY', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kuala_Lumpur' }).format(value);
const day = (value: number) => new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Kuala_Lumpur' }).format(value);

export function EventsPage({ admin }: { admin: boolean }) {
  const data = useQuery(api.luma.dashboard);
  if (!data) return <div className="loading" role="status">Loading calendar statistics…</div>;
  return <EventsView data={data} detail={event => <EventDetails event={event} admin={admin} />} />;
}

export function EventsView({ data, detail }: { data: DashboardData; detail?: (event: Event) => React.ReactNode }) {
  const [scope, setScope] = useState('owned'), [period, setPeriod] = useState('past'), [search, setSearch] = useState('');
  const [from, setFrom] = useState(''), [to, setTo] = useState(''), [showRemoved, setShowRemoved] = useState(false);
  const [selected, setSelected] = useState<Id<'lumaEvents'> | null>(null);
  useEffect(() => { if (selected) document.getElementById('event-detail')?.focus(); }, [selected]);
  const now = Date.now();
  const invalidRange = !!from && !!to && from > to;
  const events = data.events.filter(event => !invalidRange && (scope === 'all' || event.ownerCalendarId === CALENDAR_ID) && (showRemoved || event.listed)
    && (period === 'all' || (period === 'past' ? (event.endAt ?? event.startAt) <= now : (event.endAt ?? event.startAt) > now))
    && (!from || day(event.startAt) >= from) && (!to || day(event.startAt) <= to)
    && `${event.title} ${event.location} ${event.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  const active = events.filter(event => event.lifecycle !== 'cancelled');
  const known = active.filter(event => event.registrations !== null);
  const attendanceKnown = active.filter(event => event.attendance?.count != null);
  const selectedEvent = events.find(event => event._id === selected);
  const stale = data.sync?.lastSuccessAt != null && now - data.sync.lastSuccessAt > 36 * 60 * 60_000;
  return <><a className="back-link" href="/admin">← Resident room</a>
    <Hero eyebrow="Malaysian AI / Calendar" title={<>The things<br /><em>we bring people to.</em></>} description="Follow our events, public registrations and recorded attendance over time."><div className="actions"><a className="text-link" href={CALENDAR_URL} target="_blank" rel="noreferrer">Public Luma calendar ↗</a><span className="hint">Daily refresh · 9:17 am Kuala Lumpur</span></div></Hero>
    {!data.sync?.lastSuccessAt ? <Notice>No complete sync yet. Statistics will appear after the first successful GitHub Actions run.</Notice> : <p className="hint">Last complete observation: {date(data.sync.lastSuccessAt)}, {new Intl.DateTimeFormat('en-MY', { timeZone: 'Asia/Kuala_Lumpur', hour: '2-digit', minute: '2-digit' }).format(data.sync.lastSuccessAt)} MYT · {data.sync.eventCount} listed events.</p>}
    {(data.sync?.error || stale) && <Notice error>{data.sync?.error ?? 'The calendar has not refreshed in over 36 hours. These are the last saved figures.'}</Notice>}
    <div className="dashboard-tools event-filters">
      <div className="filter-field"><label htmlFor="event-scope">Calendar scope</label><select id="event-scope" value={scope} onChange={e => setScope(e.target.value)}><option value="owned">Owned by Malaysian AI</option><option value="all">All calendar listings</option></select></div>
      <div className="filter-field"><label htmlFor="event-period">Event period</label><select id="event-period" value={period} onChange={e => setPeriod(e.target.value)}><option value="past">Past events</option><option value="upcoming">Upcoming / ongoing</option><option value="all">All dates</option></select></div>
      <div className="filter-field"><label htmlFor="event-from">Starts on or after</label><input id="event-from" type="date" value={from} onChange={e => setFrom(e.target.value)} /></div>
      <div className="filter-field"><label htmlFor="event-to">Starts on or before</label><input id="event-to" type="date" value={to} onChange={e => setTo(e.target.value)} /></div>
      <div className="search-field"><label htmlFor="event-search">Find an event</label><input id="event-search" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Title, city or tag" /></div>
    </div>
    <label className="check"><input type="checkbox" checked={showRemoved} onChange={e => setShowRemoved(e.target.checked)} />Include events no longer listed</label>
    {invalidRange && <Notice error>The start date must be on or before the end date.</Notice>}
    <p className="hint">Ownership uses Luma’s owning-calendar field; it does not prove sole organization. Dates use Kuala Lumpur time. Past means the scheduled time has passed, not proof the event took place.</p>
    <dl className="event-stats" aria-label="Statistics for filtered events">
      <div><dt>Events</dt><dd>{active.length}</dd><small>{events.length - active.length} known cancellations excluded</small></div>
      <div><dt>Public registrations</dt><dd>{known.length ? count(known.reduce((sum, event) => sum + event.registrations!, 0)) : 'Unknown'}</dd><small>Counts available for {known.length} of {active.length} events</small></div>
      <div><dt>Recorded attendance</dt><dd>{attendanceKnown.length ? count(attendanceKnown.reduce((sum, event) => sum + event.attendance!.count!, 0)) : 'Unknown'}</dd><small>Recorded for {attendanceKnown.length} of {active.length} events</small></div>
    </dl>
    <p className="hint">Registrations are Luma’s public guest counts. Attendance totals are entered by admins with a source note. Neither sum represents unique people across events. Unknown counts are never treated as zero.</p>
    <div className="queue-heading"><h2>Events</h2><span>{events.length} matching</span></div>
    {events.length ? <div className="event-table-wrap" role="region" aria-label="Event statistics" tabIndex={0}><table className="event-table"><thead><tr><th scope="col">Event / scheduled date</th><th scope="col">Registrations</th><th scope="col">Attendance</th><th scope="col">Details</th></tr></thead><tbody>{events.map(event => <tr key={event._id}>
      <th scope="row"><a href={event.url} target="_blank" rel="noreferrer">{event.title} ↗</a><small>{date(event.startAt)} · {event.location || 'Location unavailable'}</small><small>{event.ownerCalendarId === CALENDAR_ID ? 'Malaysian AI calendar' : 'Curated / other or unknown owner'}{!event.listed ? ' · No longer listed' : ''}{event.lifecycle === 'cancelled' || event.lifecycle === 'postponed' ? ` · ${event.lifecycle}` : ''}</small></th>
      <td>{count(event.registrations)}</td><td>{count(event.attendance?.count ?? null)}</td><td><button className="button secondary" aria-label={`Details for ${event.title}`} aria-expanded={selected === event._id} aria-controls="event-detail" onClick={() => setSelected(selected === event._id ? null : event._id)}>Details</button></td>
    </tr>)}</tbody></table></div> : <Notice>No events match these filters.</Notice>}
    <section id="event-detail" tabIndex={-1} aria-live="polite">{selectedEvent && <><h2>{selectedEvent.title}</h2><p className="hint">Last seen {date(selectedEvent.observedAt)} · Tickets: {count(selectedEvent.tickets)} · Capacity: {count(selectedEvent.capacity)}{selectedEvent.soldOut === true ? ' · Sold out' : ''}{selectedEvent.registrationAvailability ? ` · Registration: ${selectedEvent.registrationAvailability}` : ''}</p>{selectedEvent.attendance && <p className="notice">Attendance source: {selectedEvent.attendance.note}<br /><small>Recorded {date(selectedEvent.attendance.recordedAt)}. {selectedEvent.attendance.count === null ? 'Total cleared to unknown.' : 'Admin-recorded total.'}</small></p>}{detail?.(selectedEvent)}</>}</section>
  </>;
}
function EventDetails({ event, admin }: { event: Event; admin: boolean }) {
  const history = useQuery(api.luma.history, { id: event._id });
  return <><RegistrationHistory history={history} />{admin && <AttendanceForm key={`${event._id}-${event.attendance?.recordedAt}`} event={event} />}</>;
}
export function RegistrationHistory({ history }: { history: Doc<'lumaObservations'>[] | undefined }) {
  return <details className="history" open><summary>Registration observations <span>Most recent 90 observed days · latest reading per Kuala Lumpur day</span></summary>{history === undefined ? <p role="status">Loading observations…</p> : !history.length ? <p>No observations yet.</p> : <><p className="hint">Tracking starts at the first sync; earlier growth is unavailable. These are daily totals, not additional registrations to add together.</p><ol className="event-history">{history.map(item => <li key={item._id}><time>{item.day}</time><strong>{count(item.registrations)} registrations</strong><span>{count(item.tickets)} tickets</span></li>)}</ol></>}</details>;
}
function AttendanceForm({ event }: { event: Event }) {
  const save = useMutation(api.luma.recordAttendance);
  return <AttendanceEditor initialCount={event.attendance?.count ?? null} onSave={(count, note) => save({ id: event._id, count, note })} future={event.startAt > Date.now()} />;
}
export function AttendanceEditor({ initialCount, onSave, future = false }: { initialCount: number | null; onSave: (count: number | null, note: string) => Promise<unknown>; future?: boolean }) {
  const [value, setValue] = useState(initialCount === null ? '' : String(initialCount)), [note, setNote] = useState(''), [message, setMessage] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false);
  if (future) return <Notice>Attendance can be recorded once the event starts.</Notice>;
  return <form className="attendance-form" onSubmit={async e => { e.preventDefault(); setBusy(true); setError(''); setMessage(''); try { await onSave(value === '' ? null : Number(value), note); setMessage('Attendance saved with its source note.'); } catch (err) { setError(errorMessage(err)); } finally { setBusy(false); } }}><h3>Record attendance</h3><p className="hint">Use a check-in export or an organizer’s verified headcount. Do not enter guest names or emails. Leave the total blank to clear an incorrect figure to unknown.</p><label htmlFor="attendance-count">Attendance total</label><input id="attendance-count" type="number" min="0" step="1" value={value} onChange={e => setValue(e.target.value)} /><label htmlFor="attendance-note">Source or correction note</label><textarea id="attendance-note" required maxLength={1000} value={note} onChange={e => setNote(e.target.value)} placeholder="For example: organizer headcount, recorded after the session." /><button className="button" disabled={busy || !note.trim()}>{busy ? 'Saving…' : 'Save attendance'}</button>{error && <Notice error>{error}</Notice>}{message && <Notice>{message}</Notice>}</form>;
}
