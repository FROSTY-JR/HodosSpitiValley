'use client';
import { useRef, useState } from 'react';
import { Expand, X } from 'lucide-react';
export type Photo = { src:string; title:string; note?:string };
export default function PhotoGallery({photos,label='Varkala, in frames',className=''}:{photos:Photo[];label?:string;className?:string}){
 const [selected,setSelected]=useState(0);const dialog=useRef<HTMLDialogElement>(null);
 const move=(n:number)=>setSelected(i=>(i+n+photos.length)%photos.length);
 return <div className={`photo-gallery ${className}`} aria-label={label}>
 {photos.map((p,i)=><button className="photo-tile" key={p.src} onClick={()=>{setSelected(i);dialog.current?.showModal();}} aria-label={`View photo: ${p.title}`}><img src={p.src} alt={p.title} loading="lazy"/><span className="photo-caption"><span><small>{String(i+1).padStart(2,'0')}</small>{p.title}</span><Expand size={19}/></span></button>)}
 <dialog ref={dialog} className="photo-lightbox" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}}}>
 <button className="lightbox-close" aria-label="Close photo" onClick={()=>dialog.current?.close()}><X/></button><figure><img src={photos[selected].src} alt={photos[selected].title}/><figcaption><span>{photos[selected].title}<small>{photos[selected].note||'From the Hódos Varkala itinerary moodboard.'}</small></span><span>{selected+1} / {photos.length}</span></figcaption></figure><div className="lightbox-controls"><button aria-label="Previous photo" onClick={()=>move(-1)}><span>Previous</span></button><button aria-label="Next photo" onClick={()=>move(1)}><span>Next</span></button></div>
 </dialog></div>
}
