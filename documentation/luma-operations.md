# Luma statistics: deployment and operations

## What ships

The resident room links to `/admin/events`. Both residents and admins can read event metadata, public registration counts and daily observations. Admins can record or clear attendance totals with an evidence/correction note. Every attendance edit is audited. No guest names, emails, private lists, street addresses or meeting credentials are imported.

The importer reads the public Malaysian AI calendar (`cal-pPgkuwCFrycSv1Z`) through `api.luma.com/calendar/get-items`, including future and past pages. Native Luma events use `evt-` IDs. Externally hosted listings use stable `calev-` IDs and retain their HTTPS links. Those links are not fetched by the job. The 15 September canary found 101 events: 98 native Luma events with public registration counts and three externally hosted listings without counts. Fifty events named Malaysian AI as their owning calendar.

The dashboard defaults to past events owned by Malaysian AI's calendar. **All calendar listings** includes curated and externally hosted events. Ownership is a source field, not proof of sole organization; external event ownership may be unknown. Dates and daily observation boundaries use Kuala Lumpur time. Known cancellations are excluded from summary totals but remain visible in the table. Events missing from a complete feed are retained as no longer listed and excluded by default, not labelled cancelled.

Registration totals count event registrations, not unique people or attendance. Missing counts stay unknown. Attendance is separately recorded by admins; unknown differs from a verified zero. The page shows how many events have each metric, so a partial sum cannot masquerade as full coverage.

## Finish production setup

Brendan confirmed that Malaysian AI will deploy the separate Vercel project. This code release does not provision Vercel, DNS, Clerk or a production Convex deployment.

1. Follow `platform/README.md` to configure the Malaysian AI production Convex and Clerk instances and deploy `platform/` to the Malaysian AI Vercel project. The existing Vercel build command deploys Convex before building the frontend. Set the production Vite/Clerk variables and matching backend issuer; connect `platform.malaysian.ai`. Use production credentials, not the `beloved-pheasant-288` development deployment. Applicant email setup is unchanged.
2. Verify the backend contains `lumaEvents`, `lumaObservations`, `lumaSync` and the `luma` functions. Bootstrap the designated admin and grant resident access using the existing workflow.
3. In **ashvinpraveen/malaysianai → Settings → Secrets and variables → Actions**, configure:

   | Kind | Name | Value |
   | --- | --- | --- |
   | Secret | `CONVEX_DEPLOY_KEY` | Deploy key for the same production Convex deployment used by Vercel |
   | Variable | `LUMA_CONVEX_URL` | Its `https://<deployment>.convex.cloud` URL, without a trailing slash |
   | Variable | `LUMA_SYNC_ENABLED` | Leave unset until the first write is verified; then set to `true` |

   The deploy key has full deployment privileges, not just access to event tables. Never use a `VITE_` variable for it or commit it. It is sent only to the configured Convex deployment over HTTPS.

4. Run **Actions → Luma calendar sync → Run workflow → preview=true**. This needs no credentials and makes no database writes. Check its aggregate summary.
5. Run the workflow with **preview=false**. It should report `ok: true`, `applied: true` and the discovered event count. In `/admin/events`, verify the last observation, ownership filter, date, registration counts, unknown values, and event links. Expand an event to inspect its daily history.
6. Run it again. Each event should retain one record and one observation for that Kuala Lumpur day. Record a controlled attendance total with a source note and repeat the sync; that attendance must remain intact. Verify a resident can read but cannot edit, and an applicant cannot read the dashboard or call its query.
7. Set `LUMA_SYNC_ENABLED=true`. The daily schedule is **01:17 UTC / 09:17 Kuala Lumpur**. GitHub may start scheduled jobs late. Verify a completed scheduled run the next day and a second dated observation.

To pause scheduled writes, set `LUMA_SYNC_ENABLED=false`. Manual runs remain available. A manual write without credentials fails visibly; a disabled schedule skips its job. No writes are performed by pull-request checks or public preview runs.

## Local commands

From `platform/`, with Node 24 and dependencies installed:

```sh
npm ci
npm run check
npm test
npm run build
npm run test:browser

# Public network reads only; no credentials needed.
npm run sync:luma -- --preview

# Write only after exporting LUMA_CONVEX_URL and CONVEX_DEPLOY_KEY securely.
npm run sync:luma
```

The script does not automatically load `.env.local`. For controlled local use, Node's `--env-file` flag can load an ignored, owner-readable file. A local Convex canary may use `http://127.0.0.1:3210`; other non-cloud URLs are rejected. Normal jobs use HTTPS Convex cloud URLs.

## Failure behavior and history

- Both periods must paginate completely, every row must validate, and the result must be non-empty before writing. A malformed row, repeated/missing cursor, unsupported URL, empty response, or page/record limit fails the job. There is no silent partial-success mode.
- Requests have a 30-second timeout covering response parsing and up to three attempts. 429 and server errors retry; `Retry-After` is honoured up to 60 seconds. Permanent errors fail immediately. The whole Action has a 15-minute ceiling and serialized concurrency.
- The complete observation writes in one Convex transaction. A failure preserves the last complete state; a timeout after submission can mean the complete write succeeded, so inspect last-success time before diagnosing. Older overlapping observations cannot replace newer ones.
- Error reporting stores a generic failure and last attempt, without provider bodies. Logs identify discovery versus ingestion failure. If Convex is unreachable, the workflow still fails and the dashboard becomes stale after 36 hours. A failure matching an already committed successful observation cannot replace its success state.
- Snapshots keep the latest observation per event per Kuala Lumpur day, including null counts. They start at the first successful sync; historic registration growth is not reconstructable from today's count. The UI displays the most recent 90 observed days; earlier stored observations remain in Convex.
- Retained events are capped at 1,000, with a hard failure rather than truncated dashboard totals. At that scale, replace the atomic import with staged batches and paginate dashboard/aggregate queries. Page discovery also has a 50-page limit per period.
- Only the current source fields refresh. Attendance edits, source notes and audit entries survive syncs. Missing source counts become unknown in the current observation; older observations retain their original values.
- No event-page descriptions, cover mirroring, paid API access, guest-list exports, unique-person metrics or automatic check-in integration are needed by this release.

## Verification on 15 September 2026

- TypeScript checks and production frontend build passed.
- Parser/backend tests passed, including pagination failure, external listings, null/zero counts, daily snapshots, access checks, attendance audit/preservation, disappearance/reappearance and stale-write protection.
- Ten browser checks passed across desktop/mobile, with synthetic data and external requests blocked. Desktop and mobile screenshots were visually inspected.
- The schema and actual functions deployed successfully to an isolated local Convex backend. Two live public-calendar syncs produced 101 unique event rows and 101 daily observations, with zero duplicates. Real HTTP checks denied anonymous dashboard reads and internal ingestion, denied applicant reads, and allowed a synthetic admin to read all observations.
- These checks do not establish a production Convex deployment or authenticated operation on the custom domain. Those remain part of Malaysian AI's separate hosting setup above.
