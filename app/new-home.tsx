import Atmosphere from './atmosphere';
import TripCarousel from './trip-carousel';
import { ExperienceCollection } from './experience-components';
import { ContactActions } from './contact-actions';

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <section className="cinema-hero">
        <Atmosphere src="/images/hodos-courtyard.webp" />
        <div className="cinema-vignette" />
        <div className="cinema-copy">
          <p className="eyebrow">INDIA, BEYOND THE ORDINARY</p>
          <h1 className="experiential-headline">
            <span>Discover</span>
            <strong>
              Experiential
              <br />
              travelling.
            </strong>
            <span>With Hódos.</span>
          </h1>
          <p className="cinema-subtitle">
            Meet the people. Feel the place.
            <br />
            Come home with a story of your own.
          </p>
          <a className="hodos-action" href="/contact">
            Contact us &amp; plan your trip
          </a>
        </div>
        <div className="cinema-bottom">
          <span>TRAVEL, FELT DIFFERENTLY</span>
          <a href="#upcoming">DISCOVER UPCOMING TRIPS</a>
          <span>A WORLD INSPIRED BY HAMPI</span>
        </div>
      </section>
      <section className="upcoming-trips section" id="upcoming">
        <div className="section-heading">
          <div>
            <p className="eyebrow">HÓDOS CURATED</p>
            <h2>Upcoming trips.</h2>
            <p className="section-description">
              The dates, the destination, and something worth going for.
            </p>
          </div>
          <a className="hodos-action secondary" href="/curated">
            View all trips
          </a>
        </div>
        <TripCarousel />
      </section>
      <section id="experiences" className="home-experiences section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A DIFFERENT WAY TO EXPLORE</p>
            <h2>Hódos Originals.</h2>
            <p className="originals-explainer">
              Experiences built around a place, not a packed schedule. A morning
              in Hampi, an evening on the ghats, a slower day in Coorg. Pick
              what draws you in; we’ll talk through the details.
            </p>
          </div>
          <a className="hodos-action" href="/originals">
            Discover Originals
          </a>
        </div>
        <ExperienceCollection />
      </section>
      <section className="hodos-visual-story" id="path">
        <div className="hodos-story-photo">
          <img
            src="/images/navratri/dandiya.webp"
            alt="Colourful dandiya sticks brought together for a night of celebration"
            loading="lazy"
          />
          <span>SHARED EXPERIENCES / NEW CONNECTIONS</span>
        </div>
        <div className="hodos-story-copy">
          <p className="eyebrow">THE HÓDOS WAY</p>
          <h2>
            Go for the place.
            <br />
            Stay for the connections.
          </h2>
          <p>
            From a first surf lesson to a night of Garba, we make space for the
            experiences you came for—and the conversations along the way.
          </p>
          <a className="hodos-action secondary" href="/about">
            Get to know Hódos
          </a>
        </div>
      </section>
      <section className="home-how section" id="how-it-works">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM AN IDEA TO A JOURNEY</p>
            <h2>Your trip, in three steps.</h2>
          </div>
        </div>
        <ol className="planning-flow">
          <li>
            <span>01</span>
            <h3>Choose your experience.</h3>
            <p>
              Explore an upcoming trip or tell us the place you have in mind.
            </p>
          </li>
          <li>
            <span>02</span>
            <h3>Talk to your planner.</h3>
            <p>
              Discuss dates, budget and what you’d love to do, directly on
              WhatsApp.
            </p>
          </li>
          <li>
            <span>03</span>
            <h3>Confirm &amp; get ready.</h3>
            <p>
              Review the itinerary, inclusions and arrangements with us before
              booking.
            </p>
          </li>
        </ol>
        <a className="hodos-action" href="/contact">
          Let’s plan your trip
        </a>
      </section>
      <section className="home-invitation">
        <img src="/images/varkala/sunset.webp" alt="" loading="lazy" />
        <div>
          <p className="eyebrow">GOOD PLACES. GOOD COMPANY.</p>
          <h2>
            Make room for
            <br />
            your next adventure.
          </h2>
          <p>Have a trip in mind? Let’s make a plan.</p>
          <ContactActions />
        </div>
      </section>
    </main>
  );
}
