// Server-side reader for the first-touch attribution cookie set by
// lib/attribution.ts (captureAttribution). /api/subscribe calls this with its
// incoming Request and forwards the result to pushLeadToCrm({ attribution }).
//
// Self-contained on purpose (duplicates the key list rather than importing the
// client util) so nothing client-side is pulled into a server bundle.

const ATTR_COOKIE = "abg_attr";

// The nine keys the CRM persists (bmb-crm ContactAttribution). Anything else it
// silently drops, so we don't bother forwarding it.
const KEYS = [
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "utmTerm",
  "fbclid",
  "gclid",
  "landingPage",
  "referrer",
] as const;

/**
 * Parse the abg_attr cookie off an incoming request into the CRM's attribution
 * shape. Returns undefined when the cookie is absent or empty, so callers can
 * spread it or pass it through without a guard.
 */
export function readAttributionFromCookies(
  req: Request,
): Record<string, string> | undefined {
  const header = req.headers.get("cookie");
  if (!header) return undefined;
  const raw = header
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ATTR_COOKIE}=`));
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(
      decodeURIComponent(raw.slice(ATTR_COOKIE.length + 1)),
    ) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object") return undefined;
    const out: Record<string, string> = {};
    for (const k of KEYS) {
      const v = parsed[k];
      if (typeof v === "string" && v.trim()) out[k] = v.slice(0, 500);
    }
    return Object.keys(out).length ? out : undefined;
  } catch {
    return undefined;
  }
}
