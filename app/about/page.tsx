import { ContactActions, COMMUNITY_URL } from '../contact-actions';
import PersonalPaths from './personal-paths';
import './story.css';
export const metadata = {
  title: 'This is Hódos | A trip with room for you',
  description:
    'Shared adventures. Personal moments. Meet the Hódos way: a group journey shaped around the people coming along.',
};
export default function Page() {
  return (
    <main id="main-content" className="hodos-story-page">
      <section className="story-hero">
        <div className="story-hero-copy">
          <p className="eyebrow">THIS IS HÓDOS. THIS IS YOUR WAY.</p>
          <h1>
            Good company.
            <br />
            Your kind of <em>journey.</em>
          </h1>
          <p>
            You can love a group trip and still want a little space to do your
            own thing. We’re here for both.
          </p>
          <div className="story-hero-actions">
            <a className="hodos-action" href="/contact#call-request">
              Build my kind of trip
            </a>
            <a className="hodos-action secondary" href="#your-way">
              Show me how it works
            </a>
          </div>
        </div>
        <div className="story-poster">
          <img
            src="/images/hodos-courtyard.webp"
            alt="An atmospheric Hampi-inspired courtyard beneath the moon"
          />
          <span className="story-stamp">
            A LITTLE FURTHER
            <br />A LITTLE MORE YOU
          </span>
          <div>
            <span>THE HÓDOS FEELING</span>
            <p>
              Belong to the group.
              <br />
              Stay true to yourself.
            </p>
          </div>
        </div>
      </section>
      <section className="story-intro">
        <p className="eyebrow">BEYOND THE GROUP CHAT</p>
        <h2>
          Same destination.
          <br />
          Different things that light you up.
        </h2>
        <p>
          Travel gets interesting when you get to be part of it. Make something.
          Try something. Meet someone. Or find a quiet corner and simply be
          there.
        </p>
        <p>
          Hódos brings the shared plan and the personal details together. A
          journey with people you can connect with, and moments that feel like
          they were chosen for you. Because they were.
        </p>
      </section>
      <PersonalPaths />
      <section className="story-timeline" id="how-we-plan">
        <div>
          <p className="eyebrow">A PLAN. NOT A COPY-PASTE.</p>
          <h2>
            We start with a route.
            <br />
            Then we get to know you.
          </h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h3>See the bigger picture.</h3>
              <p>
                Explore the destination, shared activities and rough flow.
                You’ll have a starting point to talk through, rather than a
                surprise you have to commit to.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Tell us your thing.</h3>
              <p>
                Drawing? Getting outdoors? A little stillness? Share your
                interests, pace and preferences over WhatsApp, or request a call
                with Sanjay or Dhyata. No perfect answers needed.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Make the plan personal.</h3>
              <p>
                A few days before departure, we aim to shape your personal
                experience itinerary around what you’ve shared. We’ll discuss
                what’s possible, timings, any extra costs and support before you
                agree.
              </p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>Go together. Be yourself.</h3>
              <p>
                Enjoy the shared moments, take your personal time, and come back
                with different stories to swap. Joining every activity isn’t a
                personality test.
              </p>
            </div>
          </li>
        </ol>
        <aside>
          Personal moments depend on the destination, availability, budget and
          practical arrangements. They’re planned together—not guaranteed extras
          on every trip. Any changes and costs need your agreement.
        </aside>
      </section>
      <section className="story-luxury">
        <p className="eyebrow">OUR KIND OF LUXURY</p>
        <h2>
          Less figuring it out.
          <br />
          More feeling looked after.
        </h2>
        <div className="care-grid">
          {[
            [
              'You don’t have to keep explaining.',
              'A named point of contact who understands what you want from the journey.',
            ],
            [
              'You can be new at this.',
              'Space to ask basic questions, try something for the first time and go at a comfortable pace.',
            ],
            [
              'You know what you’re saying yes to.',
              'Clear conversations about the plan, inclusions, costs and what still needs confirming.',
            ],
            [
              'You can take a breather.',
              'Personal time without pressure to be the loudest person in the room.',
            ],
            [
              'The details have a reason.',
              'Thoughtful choices connected to your interests, rather than the same surprise for everyone.',
            ],
            [
              'The place matters, too.',
              'Experiences planned with hosts, respecting their time, boundaries and way of life.',
            ],
          ].map(([title, copy], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="story-text-first">
        <div>
          <p className="eyebrow">NOT A PHONE-CALL PERSON?</p>
          <h2>
            Start with a few taps.
            <br />
            We get it.
          </h2>
          <p>
            We’re working on a text-first trip planner, so you can share your
            interests at your own pace. For now, you can message the team on
            WhatsApp—no call required.
          </p>
          <p className="small-note-visible">
            The text-first planner is coming soon. It is not a live chatbot yet.
          </p>
          <a className="hodos-action" href="/contact#trip-planner">
            Find my way to connect
          </a>
        </div>
        <div className="story-note">
          <span>YOUR PACE IS A VALID PACE.</span>
          <p>
            “I’d love to meet people.
            <br />
            I’d also love an hour
            <br />
            with my sketchbook.”
          </p>
          <small>Both can belong in the same trip.</small>
        </div>
      </section>
      <section className="story-ways">
        <p className="eyebrow">FIND YOUR WAY IN</p>
        <h2>A whole journey. Or one good moment.</h2>
        <div>
          <article>
            <h3>Hódos Curated</h3>
            <p>
              Multi-day journeys with a shared plan and a conversation about how
              to make the experience yours.
            </p>
            <a className="hodos-action" href="/curated">
              Find my next trip
            </a>
          </article>
          <article>
            <h3>Hódos Originals</h3>
            <p>
              Individual experiences built around the character of a place.
              Start with what catches your curiosity.
            </p>
            <a className="hodos-action" href="/originals">
              Find my kind of moment
            </a>
          </article>
        </div>
      </section>
      <section className="story-faq">
        <p className="eyebrow">THE FAIR QUESTIONS</p>
        <h2>Before you’re in.</h2>
        {[
          [
            'Can I come on my own?',
            'Tell us you’re travelling solo and we’ll discuss the group, arrangements and whether the journey is a good fit. You don’t need to arrive with a ready-made friend group.',
          ],
          [
            'Do I have to do every group activity?',
            'Tell us which parts work for you. We’ll agree on practical options and meeting points; skipping an activity doesn’t automatically change the price.',
          ],
          [
            'Is my personal experience included?',
            'That depends on the trip and the experience. Workshops, guides or transport may cost extra. We’ll explain what is included and confirm any additions before you agree.',
          ],
          [
            'Can you arrange anything I ask for?',
            'We’ll explore your idea honestly. Availability, local conditions, safety and budget all matter. If something won’t work, we’ll discuss alternatives.',
          ],
          [
            'Who do I speak to?',
            'Choose Sanjay or Dhyata on our contact page. Both call requests go through the Hódos WhatsApp number. Your preferred time is a request; the team confirms availability.',
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <section className="story-finale">
        <p className="eyebrow">YOUR PEOPLE. YOUR PACE. YOUR WAY.</p>
        <h2>
          You bring yourself.
          <br />
          Let’s build the rest together.
        </h2>
        <ContactActions />
        <a
          href={COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="community-note"
        >
          Just browsing? The community is a good place to start.
        </a>
      </section>
    </main>
  );
}
