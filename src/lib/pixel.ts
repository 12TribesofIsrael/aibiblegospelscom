// Thin wrappers over the ad pixels loaded in <Tracking/>. Every function is a
// no-op when the matching pixel isn't on the page (its env var is unset, so the
// global was never installed) — always safe to call from any client component.
//
// Mirrors bmb-ai-automations/src/audit-webapp/lib/pixel.ts so the two brands
// speak the same event vocabulary. This site has no checkout, so only the lead
// event is implemented; merch sales happen on Printify's own domain and are NOT
// trackable from here (see ecosystem/TRACKING.md Part 3 — the CRM email address
// is the only spine that crosses that boundary).
//
// No "use client" directive: plain util guarded by `typeof window`.

type GtagFn = (
  command: string,
  targetOrName: string,
  params?: Record<string, unknown>,
) => void;
type FbqFn = (
  method: string,
  eventName: string,
  params?: Record<string, unknown>,
) => void;
// TikTok's loader stubs `track`/`page` onto an array before the real SDK lands,
// so calling it early queues rather than throws.
type TtqFn = {
  track: (eventName: string, params?: Record<string, unknown>) => void;
  page: () => void;
};

declare global {
  interface Window {
    gtag?: GtagFn;
    fbq?: FbqFn;
    ttq?: TtqFn;
  }
}

/**
 * Fire a lead event across Meta + GA4 + TikTok on a successful capture-form
 * submit. `magnet` distinguishes which lead magnet converted (deut28 vs
 * study-guide) inside ONE pixel — the same offers-inside-one-pixel pattern the
 * agency site uses, so neither pixel gets starved of data.
 */
export function trackLead(params?: {
  campaign?: string | null;
  magnet?: string | null;
}): void {
  if (typeof window === "undefined") return;
  const contentName = params?.magnet || params?.campaign || undefined;
  try {
    window.fbq?.("track", "Lead", contentName ? { content_name: contentName } : undefined);
    window.gtag?.("event", "generate_lead", {
      ...(params?.campaign ? { campaign: params.campaign } : {}),
      ...(params?.magnet ? { magnet: params.magnet } : {}),
    });
    window.ttq?.track(
      "CompleteRegistration",
      contentName ? { content_name: contentName } : undefined,
    );
  } catch {
    /* pixels must never break form UX */
  }
}
