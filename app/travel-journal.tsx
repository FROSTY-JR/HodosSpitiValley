'use client';
import { useEffect, useRef, useState } from 'react';
export default function TravelJournal({destination='Varkala',slug='varkala',volume='01',description='Cliff walks, first waves, and everything in between.',note='A visual moodboard from the trip itinerary. Final villa and arrangements will be confirmed.'}:{destination?:string;slug?:string;volume?:string;description?:string;note?:string}){
 const frame=useRef<HTMLIFrameElement>(null);const observer=useRef<ResizeObserver|null>(null);const [height,setHeight]=useState(1280);
 const measure=()=>{const main=frame.current?.contentDocument?.querySelector('main');if(!main)return;const resize=()=>{const next=Math.ceil(main.getBoundingClientRect().height+16);requestAnimationFrame(()=>setHeight(previous=>previous===next?previous:next));};observer.current?.disconnect();observer.current=new ResizeObserver(resize);observer.current.observe(main);resize();};
 useEffect(()=>{measure();return()=>observer.current?.disconnect();},[]);
 return <section className="travel-journal" id="journal"><div className="journal-heading"><p className="eyebrow">THE HÓDOS FIELDNOTES / VOL. {volume}</p><h2>A few pages<br/>from <em>{destination}.</em></h2><p>{description}</p></div><iframe ref={frame} onLoad={measure} src={`/journal/${slug}.html?nointro`} title={`Interactive ${destination} photo journal — turn pages, zoom and explore`} loading="lazy" className="journal-frame" style={{height}}/><p className="journal-note">{note}</p></section>
}
