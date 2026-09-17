import type { Metadata } from 'next';

import { experiences } from '../experience-data';
import { ExperienceCollection, Enquiry } from '../experience-components';
export const metadata: Metadata = { title: 'Hódos Originals | One experience. A world within it.', description: 'Explore Hódos Originals in Hampi, Varanasi and Coorg. Individual experiences shaped around local perspectives and an unhurried pace.' };
export default function OriginalsPage() {
  return <main id="main-content" className="originals-page">
    <section className="collection-hero"><div className="collection-intro"><p className="eyebrow">HÓDOS ORIGINALS / THE COLLECTION</p><h1>One experience.<br/>A world <em>within it.</em></h1><p>Sometimes a single morning is enough.<br/>A local perspective. A different way in.<br/>Something that stays with you.</p><a className="text-link" href="#collection">Find your moment </a><span className="collection-edition">THE ORIGINALS COLLECTION / 01</span></div><div className="collection-hero-image"><img src={experiences[2].image} alt="A quiet path beneath the green canopy in Coorg" fetchPriority="high"/><div><span className="eyebrow">COORG, KARNATAKA</span><p>Take the<br/><em>longer way.</em></p><a href="/experiences/coorg" aria-label="Explore the Coorg experience">Explore</a></div></div></section>
    <section className="originals-intro section"><span className="eyebrow">SMALL BY DESIGN</span><p>A single experience, with space to be fully there. Make it part of your own journey, or let it be the reason you leave.</p></section>
    <section className="originals-collection section" id="collection"><div className="section-heading"><div><p className="eyebrow">CHOOSE THE FEELING</p><h2>What calls <em>to you?</em></h2></div><p className="section-description">Three places. Three different rhythms.<br/>Details and availability confirmed personally.</p></div><ExperienceCollection/></section>
    <section className="collection-principles section"><div><span>01 / A LOCAL PERSPECTIVE</span><h3>See a little closer.</h3><p>Begin with the people and details that make a place its own.</p></div><div><span>02 / ROOM TO BE THERE</span><h3>Take your time.</h3><p>A moment does not have to be packed full to feel complete.</p></div><div><span>03 / A PERSONAL CONVERSATION</span><h3>Know before you go.</h3><p>Discuss the host, route, arrangements and price with the team before booking.</p></div></section>
    <Enquiry title="Which moment is yours?"/>
    <section className="collection-crosslink"><p>Looking for a whole new chapter?</p><a href="/curated">Discover Hódos Curated </a></section>
  </main>;
}
