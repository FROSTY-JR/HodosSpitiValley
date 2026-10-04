import TripPlanner from './trip-planner';
import { COMMUNITY_URL } from '../contact-actions';
import '../about/story.css';
export const metadata = {
  title: 'Let’s talk trips | Hódos',
  description:
    'Request a call with Sanjay or Dhyata, or message the team on WhatsApp. Our text-first trip planner is coming soon.',
};
export default function Page() {
  return (
    <main id="main-content" className="planning-page">
      <header className="planning-intro">
        <p className="eyebrow">NO PERFECT PLAN REQUIRED</p>
        <h1>
          Got a place in mind?
          <br />
          Or just a <em>feeling?</em>
        </h1>
        <p>
          Start with Sanjay or Dhyata. Prefer typing to talking? Message us on WhatsApp instead—no call required.
        </p>
      </header>
      <TripPlanner />
      <section className="planner-community">
        <p className="eyebrow">NOT READY TO PLAN YET?</p>
        <h2>Find your travel people.</h2>
        <p>Join the Hódos community for upcoming journeys and trip updates.</p>
        <a
          className="hodos-action"
          href={COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the travel circle
        </a>
        <a className="contact-call" href="tel:+917676123083">
          Or call Hódos: +91 76761 23083
        </a>
      </section>
    </main>
  );
}
