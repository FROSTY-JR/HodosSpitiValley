import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { experiences } from '../../experience-data';
import { stories } from '../../experience-stories';
import { ExperienceCollection, Enquiry } from '../../experience-components';
export function generateStaticParams(){ return experiences.map(e=>({slug:e.id})); }

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const e = experiences.find(e => e.id === slug);
  return { title: e ? `${e.short} | Hódos Originals` : 'Experience not found | Hódos', description: e?.description };
}
export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params; const e = experiences.find(e => e.id === slug);
  if (!e || !(slug in stories)) notFound();
  const story = stories[slug as keyof typeof stories];
  return <main id="main-content" className={`detail-page detail-${slug}`}>
    <section className="destination-hero"><img src={e.image} alt={e.short + ', ' + e.place} fetchPriority="high"/><div className="destination-shade"/><div className="destination-hero-copy"><a className="breadcrumb" href="/originals">Hódos Originals / {story.destination}</a><p className="eyebrow">{e.mood}</p><h1>{story.destination}<em>, felt differently.</em></h1><p>{e.short}.</p><a className="button outline-button" href="#experience">Discover the experience </a></div><div className="destination-hero-footer"><span>{story.chapter}</span><span>{e.coordinates}</span></div></section>
    <section className="story-opening section" id="experience"><div><p className="eyebrow">ONE PLACE. ANOTHER WAY IN.</p><h2>{story.intro}</h2></div><div><p className="story-lead">{e.description}</p><p>{story.body}</p><a className="text-link" href="#enquire">Ask about this experience </a></div></section>
    <section className="experience-flow section"><div className="flow-title"><p className="eyebrow">THE EXPERIENCE</p><h2>A morning<br/>with <em>room in it.</em></h2><p className="flow-disclaimer">A sense of the experience. The exact route and arrangements are confirmed with you.</p></div><div>{story.moments.map(([title, body], i) => <article className="moment-row" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
    <section className="destination-quote"><img src={e.image} alt="" loading="lazy"/><p>{story.quote}</p><span className="eyebrow">THE WAY, LESS TAKEN</span></section>
    <section className="practical section"><div><p className="eyebrow">BEFORE YOU ARRIVE</p><h2>The details,<br/><em>considered.</em></h2></div><dl>{story.practical.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    <Enquiry text={`Curious about ${story.destination}? Message the Hódos team to discuss dates, availability and the experience. No booking or payment is made on this page.`}/>
    <section className="related section"><p className="eyebrow">ANOTHER WAY TO FEEL SOMETHING</p><h2>Keep following <em>the feeling.</em></h2><ExperienceCollection exclude={slug}/></section>
  </main>;
}
