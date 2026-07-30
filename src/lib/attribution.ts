// Client-side marketing-attribution capture for aibiblegospels.com.
//
// A TikTok clip, a QR card, or an ad lands someone on a page carrying
// ?utm_source=…&utm_campaign=… — then they navigate to the campaign page or the
// capture form, URLs that DON'T carry those params. So we capture on the FIRST
// page of the visit and stash it in a cookie (first-touch), which the
// /api/subscribe route reads back and forwards to the CRM.
//
// Deliberately mirrors bmb-ai-automations/src/audit-webapp/lib/attribution.ts —
// same cookie shape, same nine keys — so one visitor crossing from the agency
// site to this one produces attribution the CRM can compare. Cookie NAME differs
// (`abg_attr`) because cookies are per-domain anyway and a distinct name makes
// which site captured it obvious when debugging.
//
// No "use client" directive on purpose: a plain util guarded by `typeof window`,
// so the server-side reader can share the key list without dragging a client
// module into a server bundle.

export const ATTR_COOKIE = "abg_attr";
const MAX_AGE_DAYS = 30;

// (urlParam -> CRM key). Only these map to real attribution; landingPage and
// referrer are added separately from location/document. `ttclid` is TikTok's
// click id — captured because TikTok is this brand's largest traffic source, but
// note the CRM persists only the nine keys below it, so ttclid rides in
// utmContent-adjacent space only if a link sets it there. See attribution-server.
const PARAM_MAP: ReadonlyArray<readonly [string, string]> = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["utm_term", "utmTerm"],
  ["fbclid", "fbclid"],
  ["gclid", "gclid"],
];

export type Attribution = Record<string, string>;

function readFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const out: Attribution = {};
  for (const [urlKey, outKey] of PARAM_MAP) {
    const v = params.get(urlKey);
    if (v && v.trim()) out[outKey] = v.trim().slice(0, 200);
  }
  const referrer = document.referrer?.trim();
  if (referrer) out.referrer = referrer.slice(0, 200);
  out.landingPage = window.location.href.slice(0, 200);
  return out;
}

// landingPage alone isn't "tracking" — require a real source/click signal (or at
// least an external referrer) before storing anything.
function hasTracking(a: Attribution): boolean {
  return PARAM_MAP.some(([, k]) => a[k]) || Boolean(a.referrer);
}

function readCookie(): Attribution | null {
  const raw = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ATTR_COOKIE}=`));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(
      decodeURIComponent(raw.slice(ATTR_COOKIE.length + 1)),
    );
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : null;
  } catch {
    return null;
  }
}

/**
 * Call once on first paint (from <Tracking/>). First-touch: if an abg_attr
 * cookie already exists we leave it, so the original click keeps the credit even
 * as the visitor moves around the site over the next 30 days.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (readCookie()) return; // first-touch already recorded
    const current = readFromUrl();
    if (!hasTracking(current)) return; // organic / direct — nothing to attribute
    const value = encodeURIComponent(JSON.stringify(current));
    document.cookie = `${ATTR_COOKIE}=${value}; path=/; max-age=${MAX_AGE_DAYS * 86400}; SameSite=Lax`;
  } catch {
    // Storage blocked (private mode, etc.) — attribution is best-effort.
  }
}

/**
 * Read the captured attribution for client-side pixel calls. Falls back to the
 * live URL when no cookie was written yet. Returns undefined when there's no
 * tracking signal at all, so callers can omit the field cleanly.
 */
export function getStoredAttribution(): Attribution | undefined {
  if (typeof window === "undefined") return undefined;
  const stored = readCookie();
  if (stored) return stored;
  const current = readFromUrl();
  return hasTracking(current) ? current : undefined;
}
