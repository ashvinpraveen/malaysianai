import { appendFile } from 'node:fs/promises';
import { CALENDAR_ID } from '../convex/lumaModel.ts';
import { discover } from './luma.ts';

const preview = process.argv.includes('--preview');
if (process.argv.slice(2).some(arg => arg !== '--preview')) throw new Error('Usage: npm run sync:luma -- [--preview]');
const url = process.env.LUMA_CONVEX_URL;
const key = process.env.CONVEX_DEPLOY_KEY;
if (!preview) {
  if (!url || !key) throw new Error('LUMA_CONVEX_URL and CONVEX_DEPLOY_KEY are required.');
  if (!/^https:\/\/[a-z0-9-]+\.convex\.cloud$/.test(url) && url !== 'http://127.0.0.1:3210') throw new Error('Expected a Convex cloud deployment URL or the local canary backend.');
}
async function mutate(path: 'luma:ingest' | 'luma:failed', args: Record<string, unknown>) {
  const response = await fetch(`${url}/api/mutation`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Convex ${key}` }, body: JSON.stringify({ path, args, format: 'json' }), signal: AbortSignal.timeout(60_000), redirect: 'error' });
  if (!response.ok) throw new Error('Convex request failed.');
  const result = await response.json();
  if (result.status !== 'success') throw new Error('Convex mutation failed.');
  return result.value;
}
const observedAt = Date.now();
let stage = 'calendar discovery';
try {
  const events = await discover();
  stage = 'Convex ingestion';
  const result = preview ? null : await mutate('luma:ingest', { events, observedAt });
  const summary = { ok: true, preview, observedAt: new Date(observedAt).toISOString(), events: events.length, ownedByCalendar: events.filter(event => event.ownerCalendarId === CALENDAR_ID).length, eventsWithRegistrationCounts: events.filter(event => event.registrations !== null).length, ...(result ? { applied: result.applied } : {}) };
  console.log(JSON.stringify(summary, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `## Luma calendar sync\n\n\x60\x60\x60json\n${JSON.stringify(summary, null, 2)}\n\x60\x60\x60\n\nCounts are registration instances, not attendance or unique people.\n`);
} catch {
  // Never log provider bodies, credentials, or guest snippets, including in SDK errors.
  if (!preview) await mutate('luma:failed', { attemptedAt: observedAt }).catch(() => console.error('Could not record sync failure in Convex.'));
  console.error(`Luma sync failed during ${stage}. No partial calendar is published; an unconfirmed complete write may have succeeded. Check source availability, deployment access and parser tests.`);
  process.exitCode = 1;
}
