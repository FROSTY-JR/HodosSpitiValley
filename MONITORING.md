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

No analytics provider is connected and no visitor tracking is enabled by this branch. Provider/account selection and configuration are still required. Netlify account-side controls and live response headers have not been changed or verified here.
