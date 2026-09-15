# Malaysian AI calendar statistics

## Scope and evidence

Read the locally supplied `luma-calendar-sync-handoff.md` first (preserved unchanged in the original worktree). The destination already uses React/Vite, Convex, Clerk and verified resident/admin access. Reuse them; no production dependencies or second database.

Live public discovery on 15 September 2026 returned 101 event instances (11 future, 90 past), of which 50 name `cal-pPgkuwCFrycSv1Z` as their owning calendar. These are a point-in-time observation, not attendance or unique people. The calendar also curates other calendars' events. Three events omitted registration counts. Public responses contain guest snippets; discard them immediately and never persist/log them.

The public calendar is https://luma.com/malaysianai. The supplied management URL identifies the same calendar. Luma's documented API requires Plus and a calendar key; the public response currently reports the free plan. Source: https://docs.luma.com/reference/getting-started-with-your-api. Public registration counts do not provide check-ins.

## Implementation

1. Fetch both periods through the verified public website endpoint, paginate, deduplicate by event ID, allowlist metadata, validate every row and cursor, and fail closed on incomplete discovery. Native fetch with bounded timeouts and retries handles network errors, 429 and 5xx. Do not fetch guest lists or individual event pages: the listing contains the statistics needed here.
2. Persist a complete observation atomically in Convex: latest events, one event/count snapshot per Kuala Lumpur day, and latest sync health. Repeated daily runs update that day's observation. Missing counts remain unknown. Events absent from a complete feed are retained and marked no longer listed, not cancelled. Ignore an older overlapping observation. Keep imported fields separate from admin-recorded attendance.
3. Add `/admin/events`, restricted by the existing server-side resident/admin guard. Default to events owned by this calendar; let readers include curated events, select dates, search and inspect individual daily registration observations. Explain ownership as a source signal, not proof of sole organization. Present past events, registrations, count coverage, recorded attendance coverage and refresh status; never label registration totals as attendance or unique people.
4. Provide an admin-only attendance total with a required evidence/source note and an audit record; unknown stays distinct from zero. Residents can read but cannot edit. This is the provisional attendance path unless an existing authorized check-in integration is supplied.
5. Add daily GitHub Actions cron at 01:17 UTC / 09:17 Kuala Lumpur and manual dispatch, single-run concurrency, bounded runtime and aggregate-only summaries. Use existing Convex deployment authentication stored only in GitHub secrets. Add platform checks to CI.
6. Test parser/pagination failures, retries, deduplication, null/zero handling, atomic persistence, idempotency, disappearance/reappearance, snapshot history, access denial and attendance protection. Test desktop/mobile UI and production build. Run a public preview, then development canary and repeat sync when deployment access is available.

## Release

Refresh `origin/main`; preserve the provided untracked handoff and existing worktree commits. Commit only this feature and its documentation. Release on current main and verify CI and a public GitHub Actions preview. Brendan subsequently confirmed Malaysian AI will handle the separate Vercel deployment. The production credentials, first write and cron activation are documented in `luma-operations.md` for that deployment; they are not a prerequisite for the requested repository release.

Production hosting is not yet configured according to the platform runbook. Current Vercel credentials expose only Brendan's personal team, with no Malaysian AI project; GitHub currently has no repository secrets/variables. Validate schema/functions and full syncs on an isolated local Convex backend, without altering the existing development environment. Verify the intended production account, Convex/Clerk credentials, domain control and admin access before claiming a live release. Applicant email setup remains outside this task.

## Deliberate limits

- Latest daily observations start with deployment; earlier registration growth cannot be reconstructed.
- Public website JSON is undocumented and can change; validation fails visibly rather than reporting a successful partial import.
- Atomic ingestion/dashboard reads cap at 1,000 retained events (currently 101); exceeding the cap fails explicitly. Move to staged batches and paginated aggregate queries when approaching that scale.
- Attendance entered by an admin is a sourced manual total, not automatically verified Luma check-ins. Check-in automation needs an authorized data source.
- A complete calendar listing still does not prove an event occurred or that every participant checked in.
