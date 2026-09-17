
import { experiences } from './experience-data';
export function ExperienceCollection({ exclude }: { exclude?: string }) {
  return <div className={`destination-grid ${exclude ? 'two-up' : ''}`}>{experiences.filter(e => e.id !== exclude).map((e, i) => <a className="destination-card" key={e.id} href={`/experiences/${e.id}`}>
    <div className="destination-image"><img src={e.image} alt={e.short} loading="lazy"/><span className="destination-index">0{i + 1} / ORIGINAL</span></div>
    <p className="eyebrow">{e.place}</p><h3>{e.name}</h3><p className="destination-summary">{e.mood}. {e.short}.</p><span className="text-link">Step inside </span>
  </a>)}</div>;
}
export function Enquiry({ title = 'Start with a conversation.', text = 'Tell us what caught your attention. We’ll talk through the experience and confirm the details with you.' }: { title?: string; text?: string }) {
  return <section className="enquiry-panel" id="enquire"><span className="eyebrow">A REAL PERSON. A PERSONAL JOURNEY.</span><h2>{title}</h2><p>{text}</p><a className="button" href="https://www.instagram.com/hodos.international/" target="_blank" rel="noopener noreferrer">Enquire on Instagram </a><a className="enquiry-phone" href="tel:+917676393083">Call +91 76763 93083</a><span className="enquiry-handle">@hodos.international · Opens Instagram</span></section>;
}
