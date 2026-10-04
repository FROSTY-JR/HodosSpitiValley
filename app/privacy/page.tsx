import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Privacy & analytics | Hódos' };
export default function Privacy() {
  return (
    <main id="main-content" className="privacy-page">
      <p className="eyebrow">YOUR VISIT, YOUR CHOICE</p>
      <h1>Privacy &amp; analytics.</h1>
      <p>
        Hódos International Private Limited uses optional analytics to
        understand which journeys interest visitors and improve this website.
      </p>
      <h2>Optional website analytics</h2>
      <p>
        Only after you accept, we send selected page views and interactions to
        our EU-hosted PostHog project. These include trip views, itinerary
        download clicks, phone, WhatsApp or Instagram clicks, gallery opens,
        magazine interactions, scroll milestones and an estimate of active
        browsing time. We also group referring traffic into broad sources such
        as Google, Instagram or direct visits.
      </p>
      <p>
        We do not enable session recordings, automatic form capture or user
        profiles linked to names or contact information. We remove query
        strings, page fragments and full referrer URLs from analytics events.
        Geolocation enrichment is disabled and our event properties do not
        include an IP address. PostHog still receives your network IP when
        handling requests; IP handling also depends on its project settings.
      </p>
      <h2>Browser storage &amp; returning visits</h2>
      <p>
        We remember your analytics choice in your browser for up to 180 days. If
        you accept, PostHog stores a random browser identifier to measure
        returning visits. This identifier does not tell us who you are, and does
        not connect different devices. Declining or withdrawing clears the
        project’s stored analytics identifiers and stops further optional
        tracking.
      </p>
      <p>
        Use “Analytics choices” at any time. We respect supported Do Not Track
        and Global Privacy Control signals. Withdrawing stops future collection;
        it does not automatically erase events already received. PostHog’s free
        plan lists one year of event retention. Account-level retention is
        managed by Hódos; contact us about deletion requests.
      </p>
      <h2>Call requests</h2>
      <p>
        Your preferred call time is held in the current page and is not saved to
        browser storage or sent to our server. Opening WhatsApp passes your
        reviewed request to WhatsApp; you decide whether to send it to Hódos
        there. Availability is confirmed by the team. Our planned text-first
        trip planner is not live yet.
      </p>
      <h2>Essential hosting &amp; external services</h2>
      <p>
        Netlify processes request logs to deliver and protect the site
        independently of optional analytics. Pages also use Google Fonts and
        some images from Unsplash; requests to those providers disclose network
        information. Following WhatsApp or Instagram links opens a separate
        service with its own privacy practices.
      </p>
      <h2>Contact</h2>
      <p>
        For questions or privacy requests, contact Hódos on{' '}
        <a href="tel:+917676123083">+91 76761 23083</a> or{' '}
        <a
          href="https://www.instagram.com/hodos.international/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @hodos.international
        </a>
        .
      </p>
      <p>
        <a
          href="https://posthog.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          PostHog privacy policy
        </a>
      </p>
    </main>
  );
}
