// Programme dates are edited in the platform. This endpoint exposes no applicants or reviews.
const ENDPOINT = 'https://hushed-schnauzer-311.convex.cloud/api/query';
type Intake = { number: number; current: boolean; opensAt: number | null; closesAt: number | null; enabled: boolean; residencyStart: string; residencyEnd: string };
let lastFetch = 0;
let latest: Intake | undefined;
let pending: Promise<void> | undefined;
const date = new Intl.DateTimeFormat('en-MY', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kuala_Lumpur' });
const time = new Intl.DateTimeFormat('en-MY', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kuala_Lumpur' });
function render() {
  if (!latest) return;
  const intake = latest;
  const now = Date.now();
  const configured = intake.opensAt !== null && intake.closesAt !== null;
  const open = configured && intake.enabled && now >= intake.opensAt! && now < intake.closesAt!;
  const status = open ? `Cohort ${intake.number} applications are open` : configured && intake.enabled && now < intake.opensAt! ? `Cohort ${intake.number} applications open ${date.format(intake.opensAt!)} at ${time.format(intake.opensAt!).toUpperCase()} MYT` : `Cohort ${intake.number} applications are closed`;
  const term = intake.residencyStart && intake.residencyEnd ? `${date.format(Date.parse(`${intake.residencyStart}T00:00:00+08:00`))} to ${date.format(Date.parse(`${intake.residencyEnd}T00:00:00+08:00`))}` : 'Residency dates to be announced';
  const deadline = intake.closesAt === null ? 'Deadline to be announced' : `${date.format(intake.closesAt)} at ${time.format(intake.closesAt).toUpperCase()} MYT`;
  const values: Record<string, string> = { status, term, deadline, cohort: `Cohort ${intake.number}`, announcement: status };
  document.querySelectorAll<HTMLElement>('[data-intake-text]').forEach(element => { const value = values[element.dataset.intakeText ?? '']; if (value && element.textContent !== value) element.textContent = value; });
  document.querySelectorAll<HTMLAnchorElement>('[data-intake-apply]').forEach(link => { link.href = `https://platform.malaysian.ai/application?cohort=${intake.number}`; link.textContent = open ? 'Apply now' : 'View application'; });
}
async function refresh() {
  render();
  if (pending || Date.now() - lastFetch < 60_000) return pending;
  lastFetch = Date.now();
  pending = (async () => {
    try {
      const response = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: 'cohorts:catalog', args: {}, format: 'json' }), signal: AbortSignal.timeout(10_000) });
      if (!response.ok) return;
      const result = await response.json() as { status: string; value?: Intake[] };
      const current = result.status === 'success' && Array.isArray(result.value) ? result.value.find(row => row.current) : undefined;
      if (current && Number.isInteger(current.number) && current.number >= 1 && typeof current.enabled === 'boolean' && (current.closesAt === null || Number.isFinite(current.closesAt)) && (current.opensAt === null || Number.isFinite(current.opensAt)) && typeof current.residencyStart === 'string' && typeof current.residencyEnd === 'string') { latest = current; render(); }
    } catch { /* Keep the platform link available if programme dates cannot be loaded. */ }
    finally { pending = undefined; }
  })();
  return pending;
}
document.addEventListener('astro:page-load', () => void refresh());
window.setInterval(render, 1_000);
window.setInterval(() => void refresh(), 60_000);
void refresh();
