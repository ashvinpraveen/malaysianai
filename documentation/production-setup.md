# Production setup and team to-dos

The residency platform and Luma statistics code are merged into `main`. Production setup is partially complete. The next step is to deploy the backend, finish authentication and DNS, and verify the application on `platform.malaysian.ai` before changing the public application links.

Status below was checked on 15 September 2026. Owners are team responsibilities to assign, not named assignees.

## Current state

| Area | Verified state | Still needed |
| --- | --- | --- |
| Source | Merged revision `81bc1c4` includes the residency platform, verified-email security fix, and Luma statistics | Deploy the reviewed revision from `main` |
| Convex production | `healthy-ant-21` exists in the Malaysian AI project; it was empty and had never been deployed at inspection | Deployment access, environment configuration, deployment and live checks |
| Clerk production | Instance created for `platform.malaysian.ai`, using the approved primary application domain `malaysian.ai` | Verify saved token claims, Google OAuth, DNS, certificates and real sign-in |
| Frontend configuration | Production public values saved locally in ignored `platform/.env.production.local` | Configure the team's Vercel project; local files are not available through this PR |
| DNS | Clerk supplied the five CNAME records below; the administrator will add them later | Add records and verify them in Clerk |
| Applicant emails | Resend delivery intentionally deferred | Configure and test before promising receipt and decision emails at launch |

The clean snapshot passed frontend/backend TypeScript checks, 17 backend tests and a production build. Earlier development sign-in succeeded. Neither result proves production authentication or deployment.

## 1. Backend owner — Convex

- [ ] Obtain production deployment access for **healthy-ant-21** in team/project **malaysian-ai / malaysian-ai**. The previous development key expired. A proposed one-hour production key has not been approved or created; it was limited to deployment, environment read/write, data read and log read, stored locally only. Provision CI credentials separately for the operations they actually perform.
- [ ] Set `CLERK_JWT_ISSUER_DOMAIN=https://clerk.malaysian.ai` and `PLATFORM_URL=https://platform.malaysian.ai` in the **production Convex deployment**.
- [ ] Deploy `platform/` from the reviewed `main` revision. Confirm the CLI targets `https://healthy-ant-21.convex.cloud`; do not use the development deployment `beloved-pheasant-288`.
- [ ] Verify deployment history, the configured issuer, and all eight tables: `users`, `applications`, `reviews`, `auditEvents`, `emailDeliveries`, `lumaEvents`, `lumaObservations`, `lumaSync`.
- [ ] Confirm anonymous and ordinary applicant accounts cannot call resident/admin endpoints. Verify that direct API calls with missing or unverified email claims are rejected, and that submission captures the current verified email.
- [ ] Record the deployed source revision and verification results here. Production should start with real production accounts; do not copy development QA users or applications.

[Convex production dashboard](https://dashboard.convex.dev/t/malaysian-ai/malaysian-ai/healthy-ant-21/settings).

## 2. Authentication owner — Clerk and Google

The production Clerk instance is `ins_3JLu3gdTsdEQ4z3futrjuPoT8Zp`, in application `app_3JLRltNqt8eE6V5KqoeDRl7SXhQ`. Its public key is `pk_live_Y2xlcmsubWFsYXlzaWFuLmFpJA`. The React/Convex integration does not need a Clerk secret key in the frontend.

- [ ] In production **Configure → Sessions**, verify these claims persisted. They were entered and saved during setup. Keep verification dynamic; never hardcode `true`.

```json
{
  "aud": "convex",
  "email": "{{user.primary_email_address}}",
  "email_verified": "{{user.email_verified}}",
  "name": "{{user.full_name}}"
}
```

- [ ] Create the authorized Google OAuth client under the Malaysian AI Google account/project. No client was created during this session. The browser account-selection view became stuck before project setup.
- [ ] Configure the OAuth consent screen and a web application client for Malaysian AI, using the minimum sign-in scopes. Copy the exact authorized origin and callback requirements from Clerk's production Google connection settings. Use `https://platform.malaysian.ai` as the application origin where requested.
- [ ] Store the client ID and secret in **production Clerk → Google connection settings**. Use a secure transfer; never add the secret to this document, Git, or a `VITE_` variable.
- [ ] Confirm the Google OAuth application's publishing status permits the intended applicants, rather than only explicitly listed test users.
- [ ] Verify Google sign-in and emailed verification-code sign-in on the real platform domain after DNS, certificates and frontend deployment are ready.

[Clerk production settings](https://dashboard.clerk.com/apps/app_3JLRltNqt8eE6V5KqoeDRl7SXhQ/instances/ins_3JLu3gdTsdEQ4z3futrjuPoT8Zp/sessions).

## 3. DNS administrator

- [ ] Add these **CNAME** records in the `malaysian.ai` zone. They are the exact values displayed by the production Clerk instance. Clerk did not request a TXT record.

| Name | Target |
| --- | --- |
| `clerk` | `frontend-api.clerk.services` |
| `accounts` | `accounts.clerk.services` |
| `clkmail` | `mail.k45v1i7wih5x.clerk.services` |
| `clk._domainkey` | `dkim1.k45v1i7wih5x.clerk.services` |
| `clk2._domainkey` | `dkim2.k45v1i7wih5x.clerk.services` |

- [ ] Run **Verify Records** in Clerk and confirm Frontend API, Account portal, and all email records verify; then confirm SSL certificates are issued.
- [ ] Add the separate `platform.malaysian.ai` hosting record supplied by the team's Vercel project. The Clerk CNAMEs do not host the application itself.

[Clerk domain verification](https://dashboard.clerk.com/apps/app_3JLRltNqt8eE6V5KqoeDRl7SXhQ/instances/ins_3JLu3gdTsdEQ4z3futrjuPoT8Zp/domains/dmn_3JLu3bw89gRdiR0df1sHKW5mAw2).

## 4. Hosting owner — Malaysian AI Vercel team

- [ ] Create/configure the separate platform project under the Malaysian AI team, using this GitHub repository and root directory **`platform`**. The existing Astro website continues to use the repository root.
- [ ] Configure these production variables in Vercel. Use isolated development/preview values outside production.

| Variable | Production value | Location |
| --- | --- | --- |
| `VITE_CONVEX_URL` | `https://healthy-ant-21.convex.cloud` | Vercel production |
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_live_Y2xlcmsubWFsYXlzaWFuLmFpJA` | Vercel production |
| `CONVEX_DEPLOY_KEY` | Production deployment credential, stored as a secret | Vercel production |
| `CLERK_JWT_ISSUER_DOMAIN` | `https://clerk.malaysian.ai` | Convex production |
| `PLATFORM_URL` | `https://platform.malaysian.ai` | Convex production |

- [ ] Retain the checked-in Vercel configuration: it deploys Convex before building the frontend. Confirm the build succeeds with production variables and contains no deployment or OAuth secrets.
- [ ] Attach `platform.malaysian.ai`, hand the exact hosting DNS record to the domain administrator, and verify HTTPS plus direct navigation to `/profile`, `/application`, `/admin`, and `/admin/events`.

## 5. Residency operators — acceptance checks

- [ ] Have **malaysian.ai.community@gmail.com** sign in to production. Use trusted deployment access to run `users:bootstrapAdmin` with that verified account's exact `tokenIdentifier`; the initializer only works before any admin exists. Never substitute a QA account.
- [ ] Have current residents sign in and grant their resident access before opening applications. Submission freezes the panel that exists at that moment.
- [ ] Verify profile editing, draft persistence after reload, required fields, multi-select roles, submission snapshots and applicant status.
- [ ] Verify scoring, required No reasons, the amber flag for a No averaging strictly above 7.5, vote revisions, and final-decision locks. All Yes accepts automatically; any No blocks acceptance; a completed panel with abstentions requires a recorded admin decision.
- [ ] Confirm applicants cannot read private scores, votes, reasons or review history, including if they later receive resident access. Acceptance alone must not grant resident access.
- [ ] Keep Resend delivery pending until its account and verified sender are ready. Before launch, configure `RESEND_API_KEY` and `EMAIL_FROM` in Convex, test receipt/final emails to controlled accounts, and verify admin retry behavior. Clerk verification-code email setup is separate.
- [ ] Complete the [Luma production canary and scheduling checklist](luma-operations.md#finish-production-setup). Keep `LUMA_SYNC_ENABLED` unset/false until the first production write and repeat-run checks pass; use `LUMA_CONVEX_URL=https://healthy-ant-21.convex.cloud` for the production workflow.
- [ ] After the checks pass, switch the public application URL and redirect using the [platform release checklist](../platform/README.md#release-checklist). Verify the full journey from the public residency page through sign-in and application submission.

Merging this handoff does not deploy the backend, complete DNS, or enable scheduled writes. Update the checkboxes with actual verification results as each owner completes their part.
