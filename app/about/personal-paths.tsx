'use client';
import { useState } from 'react';
const paths = [
  {
    name: 'The sketchbook person',
    tag: 'MAKE A LITTLE SPACE TO CREATE',
    title: 'Pick up where life got busy.',
    copy: 'You used to draw. It’s been a while. Your personal moment could be time in an inspiring spot with your sketchbook, or a session with a local artist—if that’s what you’d enjoy.',
    moment: 'A sketchbook, a view, and no rush.',
    mark: '01',
  },
  {
    name: 'The outdoors person',
    tag: 'FOLLOW YOUR CURIOSITY OUTSIDE',
    title: 'A little more trail time.',
    copy: 'You’re drawn to the outdoors. Your personal moment could be a suitable guided hike or a planned camping experience, with the route, conditions and appropriate support agreed in advance.',
    moment: 'An outdoor plan that fits your ability.',
    mark: '02',
  },
  {
    name: 'The quiet-moment person',
    tag: 'YOU DON’T NEED TO FILL EVERY HOUR',
    title: 'Time to hear yourself think.',
    copy: 'You’d like some stillness. Your personal moment could be a quiet walk, journalling or space for reflection. A workshop is an option, not a requirement.',
    moment: 'A little quiet. Nothing to perform.',
    mark: '03',
  },
];
export default function PersonalPaths() {
  const [active, setActive] = useState(0);
  const p = paths[active];
  return (
    <section className="personal-paths" id="your-way">
      <p className="eyebrow">ONE GROUP. THREE DIFFERENT WAYS TO FEEL IT.</p>
      <h2>
        Time together.
        <br />A moment that’s yours.
      </h2>
      <p className="paths-intro">
        Picture three people on one journey. They share the destination and
        group activities. Here’s how their personal time could look.
      </p>
      <div className="shared-stop">
        <span>TOGETHER</span>
        <p>Shared experiences. Conversations. A place to discover.</p>
      </div>
      <div
        className="path-choices"
        role="group"
        aria-label="Explore a personal experience"
      >
        {paths.map((p, i) => (
          <button
            key={p.name}
            aria-pressed={active === i}
            aria-controls="personal-example"
            onClick={() => setActive(i)}
          >
            <span>{p.mark}</span>
            {p.name}
          </button>
        ))}
      </div>
      <div
        id="personal-example"
        className="personal-example"
        aria-live="polite"
      >
        <div className="example-mark" aria-hidden="true">
          {p.mark}
          <span>
            YOUR OWN
            <br />
            LITTLE CHAPTER
          </span>
        </div>
        <div>
          <p className="eyebrow">{p.tag}</p>
          <h3>{p.title}</h3>
          <p>{p.copy}</p>
          <strong>{p.moment}</strong>
        </div>
      </div>
      <div className="shared-stop reunion">
        <span>BACK TOGETHER</span>
        <p>Different moments. More stories to share.</p>
      </div>
      <p className="example-disclaimer">
        An illustration of our approach, not a fixed itinerary or an
        included-activity promise. We’ll confirm personal arrangements with you.
      </p>
    </section>
  );
}
