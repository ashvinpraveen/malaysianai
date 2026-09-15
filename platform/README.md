# Malaysian AI residency platform

Independent React/Vite application backed by Convex, with Clerk authentication. The existing Astro site remains at the repository root. Deploy this directory as a separate Vercel project for `platform.malaysian.ai`.

## Local development

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set `VITE_CLERK_PUBLISHABLE_KEY` in `.env.local`. The development Convex deployment is `beloved-pheasant-288`, at `https://beloved-pheasant-288.convex.cloud`. The `.convex.site` URL is for Convex HTTP actions, not the frontend client.

Once the CLI has access to the Malaysian AI team, run `npx convex dev --once` to publish the schema/functions and regenerate the checked-in API types, then use `npx convex dev` while developing. Never commit deploy keys or local environment files.

## Authentication and access

Configure the Malaysian.AI Clerk application for Google and emailed verification codes. Enable its Convex integration/JWT template with audience `convex`, including the `email` and boolean `email_verified` claims. Set Convex `CLERK_JWT_ISSUER_DOMAIN` to the matching Clerk issuer. The development issuer is `https://trusted-lynx-9080.clerk.accounts.dev`; production needs its own verified issuer.

The current Clerk integration adds only `aud`. In Clerk → Configure → Sessions → Customize session token, keep that audience and add these dynamic claims (do not hardcode verification to `true`):

```json
{
  "aud": "convex",
  "email": "{{user.primary_email_address}}",
  "email_verified": "{{user.email_verified}}",
  "name": "{{user.full_name}}"
}
```

Clerk substitutes the verification shortcode with a boolean. After changing claims, reload with a fresh session token. Missing claims are a configuration error; unverified addresses remain blocked.

Every protected request requires current signed, verified email claims. Drafts and submissions use that verified address; submitted applications retain their frozen email even if the account changes later. An authenticated, verified email creates a private user record. Accounts begin with neither resident nor admin access. After the first designated admin signs in, use trusted Convex deployment access to run the internal `users:bootstrapAdmin` mutation with that user's exact `tokenIdentifier`. This initializer refuses to run once an admin exists. The admin can then grant resident/admin access to other signed-in accounts through `/admin/residents`. The final admin cannot be removed.

## Review rules

- One application per account. Drafts remain private. Submission freezes the answers, profile, verified email and current resident panel; the applicant is excluded from that panel.
- Three integer scores from 1–10 accompany Yes/No. No requires a private reason. Abstain submits no scores. A No with its own average strictly above 7.5 receives an amber flag.
- All assigned reviewers voting Yes accepts automatically. Any No blocks acceptance and enables admin rejection. Once all respond without a No, abstentions require an explicit admin outcome and reason.
- Residents can revise their own votes until the final decision. Admins can add reviewers or replace someone who has not voted. Existing votes cannot be removed. Changes are audited.
- Applicants cannot read private reviews, including after they become residents. Accepted applicants do not automatically gain resident access.
- The dashboard paginates 25 applications at a time. Name/status filtering is server-side; review-focus filtering applies to loaded pages, explicitly labelled in the UI. The panel is limited to 100 residents.

## Applicant emails

Set Convex `RESEND_API_KEY`, `EMAIL_FROM` (a verified sender) and `PLATFORM_URL`. Submission and final outcomes enqueue separate delivery records. Email bodies never contain scores or internal reasons. Missing configuration leaves a visible failed delivery that an admin can retry after setup.

Provider calls use stable idempotency keys, limited automatic retries and interruption recovery. Unconfirmed attempts older than 23 hours require provider verification before manual resend. Test delivery to a controlled address before enabling public applications.

## Calendar statistics

Residents and admins can open **Resident room → Events & statistics** at `/admin/events`. Public Luma metadata and registration counts sync daily through GitHub Actions; admins record attendance separately with source notes. Daily observations preserve changes over time. Calendar ownership, curated listings, missing counts and sync freshness are explicitly labelled.

See [Luma operations](../documentation/luma-operations.md) for deployment variables, cron activation, canary checks, metric definitions and limits. Scheduled writes remain disabled until `LUMA_SYNC_ENABLED=true` is configured after production backend deployment. Preview runs work without credentials.

## Checks

```sh
npm run check
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

Backend checks execute the actual functions against `convex-test`, with synthetic identities and mocked mail delivery. Browser checks cover the actual form/scoring components on desktop and mobile, with synthetic callbacks at `/tests/fixture.html`. This fixture is development-only and excluded from the production build; it does not verify live authentication, database deployment or email delivery.

## Release checklist

1. Publish and verify the development backend on the exact deployment above. Test real Clerk sign-in, draft persistence across reloads and resident access with separate accounts.
2. Configure separate production Convex and Clerk instances. Set Vercel production `CONVEX_DEPLOY_KEY`, `VITE_CONVEX_URL` and `VITE_CLERK_PUBLISHABLE_KEY`. Configure the matching backend issuer and mail environment. The build command deploys Convex before building the frontend.
3. Add `platform.malaysian.ai` to the Vercel project and configure the DNS records Vercel provides. Verify TLS, deep links, sign-in and production isolation.
4. Bootstrap the designated admin, activate the initial resident panel and verify receipt/final-decision emails to controlled accounts.
5. Only after those checks pass, replace `APPLY_FORM_URL` in `src/consts.ts` at the repository root and the `/residency/apply` redirect in root `vercel.json` with the platform application URL. Verify the public site's application journey.

## Current deployment status

On 15 September 2026, the schema and functions were deployed successfully to `beloved-pheasant-288`, with the verified development Clerk issuer configured. Live checks passed for idempotent account creation, draft persistence, applicant isolation, resident access denial and signed-out access denial. Two clearly named QA accounts and one private QA draft remain in this development database.

The temporary development key expired and was omitted when the ignored, owner-readable `.env.local` was recreated. Backend deployments require renewed deployment access. Backend-specific TypeScript checks are included in `npm run check`.

The Clerk integration is active. Its initially missing email claims were added to the session token, and real browser authentication was verified by loading Brendan's profile successfully. The first designated admin is to be `malaysian.ai.community@gmail.com`, after that account signs in. Applicant email delivery is intentionally pending at the user's request. Production hosting, production credentials and the custom domain are not configured; public application links have not been switched.

The security-review follow-up enforces verified email claims on every protected request and uses the current signed email when saving a draft or submitting. This follow-up passes local checks but has not been redeployed to Convex because the temporary deployment key expired.
