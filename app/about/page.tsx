export const metadata = { title: 'About us | Hódos' };
export default function Page() {
  return (
    <main id="main-content" className="info-page">
      <p className="eyebrow">HÓDOS / THE WAY</p>
      <h1>
        Travel is a place.
        <br />
        And the people in it.
      </h1>
      <p className="info-lead">
        Hódos is about experiencing a destination through what you do there: a
        first wave in Varkala, a Garba night in Gujarat, a journey through
        Spiti.
      </p>
      <div className="about-editorial">
        <img
          src="/images/navratri/garba.webp"
          alt="Garba dancers celebrating beneath a colourful canopy"
        />
        <div>
          <h2>A little closer to the place.</h2>
          <p>
            We bring together activities, time to explore and shared moments.
            The aim is simple: make the experience as memorable as the
            destination.
          </p>
          <h3>Two ways to travel with us.</h3>
          <p>
            <strong>Hódos Curated</strong> brings together multi-day journeys
            with an itinerary to explore. <strong>Hódos Originals</strong>{' '}
            focuses on individual experiences, shaped around the feeling and
            character of a place.
          </p>
          <a className="hodos-action" href="/contact">
            Contact us &amp; plan your trip
          </a>
        </div>
      </div>
    </main>
  );
}
