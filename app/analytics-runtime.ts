import type { PostHog } from 'posthog-js';
export const CONSENT_KEY = 'hodos_analytics_consent_v1';
export const PROJECT_KEY = 'phc_uCtFfQyFkUcWLvJXPcg9BZJJrEqgBMxCuhUv3troVmCw';
const MAX_AGE = 180 * 86400000;
let client: PostHog | undefined;
let loading: Promise<PostHog> | undefined;
let allowed = false;
export const events = [
  '$pageview',
  'trip_viewed',
  'trip_opened',
  'itinerary_downloaded',
  'enquiry_clicked',
  'gallery_opened',
  'journal_interacted',
  'scroll_depth',
  'engagement',
] as const;
export type EventName = (typeof events)[number];
const paths = [
  '/',
  '/curated',
  '/curated/navratri',
  '/curated/varkala',
  '/curated/spiti',
  '/originals',
  '/experiences/hampi',
  '/experiences/coorg',
  '/experiences/varanasi',
  '/privacy',
  '/about',
  '/contact',
];
export function safePath(path: string) {
  return paths.includes(path.replace(/\/$/, '') || '/')
    ? path.replace(/\/$/, '') || '/'
    : '/not-found';
}
export function privacySignal() {
  return (
    navigator.doNotTrack === '1' ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}
export function choice(): 'accepted' | 'declined' | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    return value &&
      Date.now() - value.at < MAX_AGE &&
      ['accepted', 'declined'].includes(value.value)
      ? value.value
      : null;
  } catch {
    return null;
  }
}
export function saveChoice(value: 'accepted' | 'declined') {
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ value, at: Date.now() }),
    );
  } catch {
    /* Consent works for this page if storage is blocked. */
  }
}
export function clearIdentifiers() {
  for (const storage of [() => localStorage, () => sessionStorage]) {
    try {
      const s = storage();
      for (const key of Object.keys(s)) {
        if (key.includes(PROJECT_KEY)) s.removeItem(key);
      }
    } catch {}
  }
}
export function stop() {
  allowed = false;
  client?.opt_out_capturing();
  client?.set_config({ disable_persistence: true });
  client?.reset();
  clearIdentifiers();
}
export async function start() {
  allowed = true;
  if (!loading)
    loading = import('posthog-js')
      .then(({ default: ph }) => {
        client = ph;
        ph.init(PROJECT_KEY, {
          api_host: 'https://eu.i.posthog.com',
          ui_host: 'https://eu.posthog.com',
          autocapture: false,
          capture_pageview: false,
          capture_pageleave: false,
          capture_dead_clicks: false,
          disable_session_recording: true,
          disable_surveys: true,
          disable_external_dependency_loading: true,
          advanced_disable_flags: true,
          capture_performance: false,
          capture_exceptions: false,
          save_campaign_params: false,
          save_referrer: false,
          person_profiles: 'identified_only',
          persistence: 'localStorage',
          respect_dnt: true,
          opt_out_capturing_by_default: true,
          opt_out_persistence_by_default: true,
          before_send: (event) => {
            if (
              !event ||
              !allowed ||
              privacySignal() ||
              !events.includes(event.event as EventName)
            )
              return null;
            const keep = [
              'token',
              'distinct_id',
              '$device_id',
              '$session_id',
              '$window_id',
              '$lib',
              '$lib_version',
              '$browser',
              '$browser_version',
              '$os',
              '$device_type',
              'page',
              'trip',
              'channel',
              'seconds',
              'percent',
              'action',
              'referrer_source',
            ];
            const clean: Record<string, unknown> = {};
            for (const key of keep) {
              if (key in event.properties) clean[key] = event.properties[key];
            }
            clean.$current_url = location.origin + safePath(location.pathname);
            clean.$pathname = safePath(location.pathname);
            clean.$geoip_disable = true;
            clean.$process_person_profile = false;
            event.properties = clean;
            return event;
          },
        });
        return ph;
      })
      .catch((e) => {
        loading = undefined;
        throw e;
      });
  const ph = await loading;
  if (!allowed || privacySignal()) return false;
  ph.set_config({ disable_persistence: false });
  ph.opt_in_capturing({ captureEventName: false });
  return true;
}
export function track(
  event: EventName,
  properties: Record<string, string | number> = {},
) {
  if (allowed && !privacySignal())
    client?.capture(event, {
      ...properties,
      page: safePath(location.pathname),
    });
}
export function referrerSource() {
  try {
    const h = new URL(document.referrer).hostname;
    if (h === location.hostname) return 'internal';
    if (/(^|\.)google\./.test(h)) return 'google';
    if (/(^|\.)instagram\.com$/.test(h)) return 'instagram';
    if (/(^|\.)facebook\.com$/.test(h)) return 'facebook';
    if (/(^|\.)bing\.com$/.test(h)) return 'bing';
    return 'other';
  } catch {
    return 'direct';
  }
}
