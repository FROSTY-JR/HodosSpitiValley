'use client';
import { useEffect, useRef, useState } from 'react';
export default function TravelJournal(){
 const frame=useRef<HTMLIFrameElement>(null);const observer=useRef<ResizeObserver|null>(null);const [height,setHeight]=useState(1280);
 const measure=()=>{const main=frame.current?.contentDocument?.querySelector('main');if(!main)return;const resize=()=>{const next=Math.ceil(main.getBoundingClientRect().height+16);requestAnimationFrame(()=>setHeight(previous=>previous===next?previous:next));};observer.current?.disconnect();observer.current=new ResizeObserver(resize);observer.current.observe(main);resize();};
 useEffect(()=>{measure();return()=>observer.current?.disconnect();},[]);
 return <section className="travel-journal" id="journal"><div className="journal-heading"><p className="eyebrow">THE HÓDOS FIELDNOTES / VOL. 01</p><h2>A few pages<br/>from <em>Varkala.</em></h2><p>Cliff walks, first waves, and everything in between.</p></div><iframe ref={frame} onLoad={measure} src="/journal/varkala.html?nointro" title="Interactive Varkala photo journal — turn pages, zoom and explore" loading="lazy" className="journal-frame" style={{height}}/><p className="journal-note">A visual moodboard from the trip itinerary. Final villa and arrangements will be confirmed.</p></section>
}
