# Hódos monitoring plan

## Separate traffic health from visitor behaviour

Netlify Observability counts requests, including assets, crawlers and scanners. One page visit causes many requests. Its request duration is response time, not time a visitor spends on the site. Use it for HTTP status codes, bandwidth, traffic spikes, slow responses and suspected abuse.

The supplied screenshots show WordPress endpoint probes returning 404. This static site does not run WordPress or PHP. Those entries do not demonstrate successful intrusion. A 301 is a redirect, not proof of access. Normal assets return 200/304. robots.txt and llms.txt requests can be ordinary crawler discovery. Countries alone do not identify attackers.

## Proposed visitor dashboard

- Acquisition: visitors, sessions, landing pages, referring domains, approved campaign tags, device categories and broad location when enabled.
- Engagement: engaged seconds while visible/active, scroll milestones, trip views, itinerary downloads, gallery opens and deliberate magazine page turns.
- Enquiry funnel: home or campaign landing -> trip view -> itinerary/engagement -> phone or Instagram enquiry click.
- Retention: returning consenting browsers, day-1/day-7/day-30 cohorts. This requires a persistent pseudonymous browser identifier and enough elapsed time. It is not the same as repeat customers.
- Reliability: 404/5xx trends, response times, client failures and performance. Do not upload raw errors or URLs without sanitization.

A phone click is not a completed phone call; an Instagram click is not a booking. Bookings must be recorded separately before reporting revenue or booking conversion. Historical user journeys cannot be reconstructed from existing asset logs.

## Privacy defaults for any integration

Keep optional analytics off until consent. Provide an equally easy decline and a way to withdraw. Disable session replay, keystroke capture, broad autocapture and form/text collection. Explicitly allowlist event names and properties; strip query strings, fragments and unapproved referrers. Never send phone numbers, names, emails, message text or precise location as event properties. Vendor transport still receives network information such as IP addresses; review its location processing, retention and access settings. Consent and browser blocking mean reports will be incomplete.

Limit dashboard access to the team, enable MFA, set a finite data-retention period and keep exports private. Public ingestion/project keys are distinct from private admin API keys; never commit admin credentials. Select the account and region before enabling a provider. Add an accurate privacy notice before activation.

## Security changes in this branch

Added a crawler robots.txt file and narrow CSP restrictions against foreign framing, object/plugin embeds and off-origin base URLs. SAMEORIGIN framing preserves the local photo journals. These headers do not filter traffic or replace a full script policy, a WAF or dependency updates.

Keep missing WordPress routes as real 404s. If abusive volume grows, use Netlify project Security > Firewall traffic rules or available rate limits for evidenced offending sources. Avoid blocking continents merely because they appear in logs. Enable MFA on GitHub and Netlify and review team/deploy access.

## Activation status

PostHog EU is integrated using the supplied public project key. The Netlify production build enables the consent interface automatically through CONTEXT=production. Deploy previews and ordinary local builds are disabled by default. VITE_HODOS_ANALYTICS=0 explicitly disables analytics. Only use VITE_HODOS_ANALYTICS=1 in isolated tests with requests intercepted; do not enable it for public deploy previews. Account-side dashboards and live production ingestion still require verification after merge.


## Dashboard setup in PostHog

Open the EU project and create a private dashboard named Hódos — Trip interest & enquiries. Add these insights:

1. Visitors: unique users performing `$pageview`, by day. Break down by `page`, `referrer_source`, `$device_type` or `$browser`.
2. Trip interest: unique users performing `trip_viewed`, broken down by `trip`.
3. Enquiries: unique users performing `enquiry_clicked`, broken down by `channel` and `page`.
4. Trip funnel: `$pageview` -> `trip_viewed` -> `enquiry_clicked`, same-session where available. Downloads are a separate optional-intent metric, not a compulsory funnel step.
5. Downloads: `itinerary_downloaded`, broken down by `trip`.
6. Engagement: sum `seconds` on `engagement`. Divide by distinct `$session_id` for average measured active time per session. This is an estimate: visible pages with interaction in the previous 60 seconds; tab closure or blockers can lose the last interval. Do not interpret request duration as engagement.
7. Depth: `scroll_depth`, broken down by `percent` (25, 50, 75, 90). Each milestone fires once per page visit after consent.
8. Magazine and photos: counts of `journal_interacted` and `gallery_opened`, broken down by `page`. Magazine actions are next/previous/chapter/drag, never automatic opening animation.
9. Retention: unique browsers performing `$pageview` initially and again on later days/weeks. Use day 1/7/30 once enough time has elapsed. Consent, storage clearing and different devices affect these counts.

Broad referring sources are direct/google/instagram/facebook/bing/internal/other. Full referral URLs and campaign query strings are intentionally not collected. Geolocation enrichment is disabled, so no location report is promised. No booking, revenue or completed-call data is collected.

## Event privacy and activation checks

The SDK is dynamically imported after acceptance. Autocapture, session replay, surveys, remote flags, exception capture, performance autocapture and external SDK extensions are off. Only explicit event names and property keys pass the outbound filter. Unknown page paths are grouped as /not-found; query strings and fragments are dropped. The browser choice expires after 180 days. DNT and GPC disable optional collection; withdrawal clears project-specific local/session storage. Analytics may fail without interrupting the website.

After deploying main: visit the production URL in a fresh browser, confirm no PostHog requests before choosing, accept, open a trip and click an enquiry link. In PostHog Activity, check the events and their properties. Do not share dashboards publicly. Enable MFA and review project access and actual account retention settings. The ingestion key in source is public; personal/admin keys must never be placed there.

## Dependency audit note (3 October 2026)

Compatible npm audit patches were applied during integration. Remaining advisories concern existing build-tool dependency chains, including braces via glob tooling and undici via old Cloudflare tools. No forced downgrade was applied. A successful build is not a clean security audit; schedule toolchain cleanup separately. These build tools are not a PHP/WordPress server on the statically deployed site.

Before enabling production collection, turn on PostHog’s project-level Discard IP data setting. The JavaScript ip option is deprecated and cannot enforce network IP handling. Geolocation enrichment is disabled on every event in this integration. Verify the account-level setting in the PostHog project.
