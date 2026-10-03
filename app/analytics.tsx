'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  choice,
  saveChoice,
  privacySignal,
  start,
  stop,
  track,
  safePath,
  referrerSource,
  clearIdentifiers,
  CONSENT_KEY,
} from './analytics-runtime';
import './analytics.css';
const production = import.meta.env.VITE_HODOS_ANALYTICS === '1';
export default function Analytics() {
  const path = usePathname();
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [signal, setSignal] = useState(false);
  useEffect(() => {
    if (!production) return;
    const blocked = privacySignal();
    setSignal(blocked);
    const saved = blocked ? 'declined' : choice();
    if (saved !== 'accepted') clearIdentifiers();
    setConsent(saved);
    setOpen(saved === null);
    setReady(true);
    const sync = () => {
      const value = privacySignal() ? 'declined' : choice();
      if (value !== 'accepted') stop();
      setConsent(value);
      setOpen(value === null);
    };
    const storage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY || e.key === null) sync();
    };
    window.addEventListener('storage', storage);
    return () => window.removeEventListener('storage', storage);
  }, []);
  useEffect(() => {
    if (!ready) return;
    if (consent !== 'accepted') {
      stop();
      return;
    }
    let disposed = false;
    let cleanup = () => {};
    start()
      .then((ok) => {
        if (!ok || disposed) return;
        const page = safePath(path);
        track('$pageview', { referrer_source: referrerSource() });
        if (page.startsWith('/curated/') || page.startsWith('/experiences/'))
          track('trip_viewed', { trip: page.split('/').pop()! });
        let last = performance.now(),
          active = performance.now(),
          seconds = 0;
        const reached = new Set<number>();
        const activity = () => {
          active = performance.now();
        };
        const flush = () => {
          if (seconds >= 1) {
            track('engagement', { seconds: Math.floor(seconds) });
            seconds = 0;
          }
        };
        const tick = () => {
          const now = performance.now();
          if (document.visibilityState === 'visible' && now - active < 60000)
            seconds += Math.min((now - last) / 1000, 2);
          last = now;
        };
        const visibility = () => {
          tick();
          if (document.hidden) flush();
          else {
            last = performance.now();
            active = last;
          }
        };
        const scroll = () => {
          activity();
          const max = document.documentElement.scrollHeight - innerHeight;
          if (max <= 0) return;
          const depth = Math.round((scrollY / max) * 100);
          for (const percent of [25, 50, 75, 90])
            if (depth >= percent && !reached.has(percent)) {
              reached.add(percent);
              track('scroll_depth', { percent });
            }
        };
        const click = (e: MouseEvent) => {
          if (!e.isTrusted) return;
          activity();
          const target = e.target as Element;
          if (!(target instanceof Element)) return;
          const tile = target.closest('.photo-tile');
          if (tile) {
            track('gallery_opened');
            return;
          }
          const a = target.closest('a');
          if (!a) return;
          const href = a.getAttribute('href') || '';
          if (href.startsWith('tel:')) {
            track('enquiry_clicked', { channel: 'phone' });
            return;
          }
          let u: URL;
          try {
            u = new URL(href, location.origin);
          } catch {
            return;
          }
          if (
            u.hostname === 'www.instagram.com' ||
            u.hostname === 'instagram.com'
          ) {
            track('enquiry_clicked', { channel: 'instagram' });
            return;
          }
          if (u.hostname === 'wa.me' || u.hostname === 'chat.whatsapp.com') {
            track('enquiry_clicked', {
              channel:
                u.hostname === 'wa.me'
                  ? 'whatsapp_planner'
                  : 'whatsapp_community',
            });
            return;
          }
          if (u.origin !== location.origin) return;
          if (
            [
              '/itineraries/hodos-navratri.pdf',
              '/itineraries/hodos-varkala.pdf',
            ].includes(u.pathname)
          ) {
            track('itinerary_downloaded', {
              trip: u.pathname.includes('navratri') ? 'navratri' : 'varkala',
            });
            return;
          }
          if (
            [
              '/curated/navratri',
              '/curated/varkala',
              '/curated/spiti',
              '/experiences/hampi',
              '/experiences/coorg',
              '/experiences/varanasi',
            ].includes(u.pathname)
          )
            track('trip_opened', { trip: u.pathname.split('/').pop()! });
        };
        const frameCleanups: Array<() => void> = [];
        document
          .querySelectorAll<HTMLIFrameElement>('iframe.journal-frame')
          .forEach((frame) => {
            let detach = () => {};
            const attach = () => {
              detach();
              try {
                const d = frame.contentDocument;
                if (!d) return;
                let x = 0;
                const fc = (e: MouseEvent) => {
                  if (!e.isTrusted) return;
                  activity();
                  const t = (e.target as Element).closest('button');
                  if (t && ['sbLeft', 'sbRight'].includes(t.id))
                    track('journal_interacted', {
                      action: t.id === 'sbRight' ? 'next' : 'previous',
                    });
                  else if (t?.classList.contains('plate'))
                    track('journal_interacted', { action: 'chapter' });
                };
                const down = (e: PointerEvent) => {
                  x = e.clientX;
                  activity();
                };
                const up = (e: PointerEvent) => {
                  if (e.isTrusted && Math.abs(e.clientX - x) > 55)
                    track('journal_interacted', { action: 'drag' });
                };
                d.addEventListener('click', fc);
                d.addEventListener('pointerdown', down);
                d.addEventListener('pointerup', up);
                detach = () => {
                  d.removeEventListener('click', fc);
                  d.removeEventListener('pointerdown', down);
                  d.removeEventListener('pointerup', up);
                };
              } catch {}
            };
            frame.addEventListener('load', attach);
            attach();
            frameCleanups.push(() => {
              frame.removeEventListener('load', attach);
              detach();
            });
          });
        const timer = setInterval(tick, 1000),
          report = setInterval(flush, 15000);
        document.addEventListener('click', click);
        document.addEventListener('pointerdown', activity);
        document.addEventListener('keydown', activity);
        window.addEventListener('scroll', scroll, { passive: true });
        document.addEventListener('visibilitychange', visibility);
        window.addEventListener('pagehide', flush);
        cleanup = () => {
          tick();
          flush();
          clearInterval(timer);
          clearInterval(report);
          document.removeEventListener('click', click);
          document.removeEventListener('pointerdown', activity);
          document.removeEventListener('keydown', activity);
          window.removeEventListener('scroll', scroll);
          document.removeEventListener('visibilitychange', visibility);
          window.removeEventListener('pagehide', flush);
          frameCleanups.forEach((f) => f());
        };
      })
      .catch(() => {
        /* Analytics failure must never prevent browsing. */
      });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [ready, consent, path]);
  const choose = (value: 'accepted' | 'declined') => {
    if (value === 'declined') stop();
    saveChoice(value);
    setConsent(value);
    setOpen(false);
  };
  if (!production || !ready) return null;
  return (
    <>
      <button className="analytics-settings" onClick={() => setOpen(true)}>
        Analytics choices
      </button>
      {open && (
        <section
          className="analytics-banner"
          role="region"
          aria-label="Analytics choices"
        >
          <h2>A little insight. Your choice.</h2>
          <p>
            With your permission, we use PostHog to measure visits, trip
            interest and enquiry clicks. No session recordings or form contents.{' '}
            <a href="/privacy">Privacy details</a>
          </p>
          {signal ? (
            <>
              <p>
                Your browser’s privacy preference is respected. Optional
                analytics is off.
              </p>
              <button onClick={() => setOpen(false)}>Close</button>
            </>
          ) : (
            <div>
              <button onClick={() => choose('declined')}>
                Decline analytics
              </button>
              <button onClick={() => choose('accepted')}>
                Accept analytics
              </button>
              {consent && <button onClick={() => setOpen(false)}>Close</button>}
            </div>
          )}
        </section>
      )}
    </>
  );
}
