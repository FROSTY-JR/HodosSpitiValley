import { CONTACT_URL, COMMUNITY_URL } from '../contact-actions';
export const metadata = { title: 'Contact us | Hódos' };
export default function Page() {
  return (
    <main id="main-content" className="info-page">
      <p className="eyebrow">LET’S MAKE A PLAN</p>
      <h1>
        Where would you
        <br />
        love to go?
      </h1>
      <p className="info-lead">
        Tell us your destination, dates, group size and budget. Your Hódos trip
        planner will help you work through the options.
      </p>
      <div className="contact-options">
        <article>
          <span className="eyebrow">01 / PLAN WITH US</span>
          <h2>A real conversation.</h2>
          <p>
            Ask about an itinerary, check availability or start planning
            something personal.
          </p>
          <a
            className="hodos-action"
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact the trip planner
          </a>
          <a className="contact-call" href="tel:+917676123083">
            Or call +91 76761 23083
          </a>
        </article>
        <article>
          <span className="eyebrow">02 / STAY IN THE LOOP</span>
          <h2>Your travel people.</h2>
          <p>
            Join the Hódos WhatsApp community for upcoming journeys and trip
            updates.
          </p>
          <a
            className="hodos-action secondary"
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join our WhatsApp community
          </a>
        </article>
      </div>
    </main>
  );
}
