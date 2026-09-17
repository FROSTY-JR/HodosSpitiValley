'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  const links = [

    { href: '/originals', label: 'Originals', active: pathname === '/originals' || pathname.startsWith('/experiences/') },
    { href: '/curated', label: 'Curated', active: pathname.startsWith('/curated') },
    { href: '/#path', label: 'The Hódos way', active: false },
  ];
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className={`nav ${scrolled || pathname !== '/' || open ? 'scrolled' : ''}`}>
    <a className="brand" href="/" aria-label="Hódos home"><img src="/images/hodos-logo.png" alt="Hódos" width="180" height="51"/><span>THE WAY, LESS TAKEN</span></a>
    <nav aria-label="Main navigation">{links.map(l => <a key={l.href} href={l.href} aria-current={l.active ? 'page' : undefined}>{l.label}</a>)}</nav>
    <a className="nav-cta" href="/#experiences">Find your moment </a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    {open && <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">{links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={l.active ? 'page' : undefined}>{l.label}</a>)}<a href="/#how-it-works" onClick={() => setOpen(false)}>How it works</a></nav>}
  </header></>;
}

export function SiteFooter() {
  return <footer><div className="footer-main"><div><a className="brand" href="/"><img src="/images/hodos-logo.png" alt="Hódos" width="180" height="51"/><span>THE WAY, LESS TAKEN</span></a><p>Travel, felt differently.</p></div><div className="footer-links"><a href="/originals">Hódos Originals</a><a href="/curated">Hódos Curated</a><a href="/#path">Our philosophy</a><a href="/#how-it-works">How it works</a></div><div className="footer-location"><span className="eyebrow">FROM INDIA, WITH INTENTION</span><p>Hódos International Private Limited<br/>Bangalore, Karnataka</p><a className="footer-phone" href="tel:+917676393083">Call +91 76763 93083</a><a className="footer-social" href="https://www.instagram.com/hodos.international/" target="_blank" rel="noopener noreferrer">@hodos.international </a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Hódos</span><span>ΟΔΟΣ — GREEK. “THE WAY.”</span><a href="#main-content">BACK TO THE TOP</a></div></footer>;
}
