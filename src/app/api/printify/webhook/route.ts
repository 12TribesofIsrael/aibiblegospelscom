// Printify order webhook -> CRM buyer contact.
//
// The gap this closes: buying a shirt used to create nothing on our side. The
// only contact record a customer could ever get was the study-guide opt-in,
// which requires them to scan the insert card after the box arrives. A buyer who
// never scans was invisible. Now the order itself creates the contact.
//
// Trust model — read this before changing anything here:
//
// Printify's OpenAPI spec documents webhook creation as { topic, url } only. It
// specifies no shared secret and no signature header, so there is nothing to
// verify cryptographically and the POST body cannot be trusted on its own.
// Two independent guards instead:
//
//   1. The URL carries a secret (`?k=`), so the endpoint is unlisted — the same
//      capability-URL pattern the CRM hosted forms already use.
//   2. Nothing in the POST body is believed. We take only the order id from it,
//      then re-read that order from the Printify API with our own token. A forged
//      POST for an order that is not really in our shop 404s and is dropped, and
//      a forged POST carrying a fake email cannot inject it, because the email we
//      use comes from the authenticated read-back, never from the request.
//
// Guard 2 is the real one; guard 1 only keeps the noise down.
//
// Subscribed topic is `order:created` specifically. `order:updated` fires
// repeatedly through the fulfilment lifecycle and would re-submit the same buyer
// on every status change.

import { NextResponse, after } from "next/server";
import { pushLeadToCrm } from "@/lib/crm";

const PRINTIFY_API = "https://api.printify.com/v1";

// Anointed sub-account hosted form with autoTags
// ["anything-is-possible","buyer","aip-purchase"]. Shipped as a default for the
// same reason as the other form ids in lib/crm.ts: the form id is a public
// capability, not a secret, and a missing env var must never drop a paying
// customer.
const BUYER_FORM_ID =
  process.env.BMB_CRM_FORM_ID_AIP_BUYER ?? "ZT1JcChG6RsaYj27x24h";

type PrintifyOrder = {
  id?: string;
  address_to?: {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  line_items?: Array<{ metadata?: { title?: string; variant_label?: string } }>;
};

/** Read the order back from Printify. Returns null on any failure — a webhook we
 *  cannot corroborate is a webhook we ignore. */
async function fetchOrder(
  shopId: string,
  orderId: string,
  token: string,
): Promise<PrintifyOrder | null> {
  try {
    const res = await fetch(
      `${PRINTIFY_API}/shops/${encodeURIComponent(shopId)}/orders/${encodeURIComponent(orderId)}.json`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      console.error("[printify] order read-back failed", res.status, orderId);
      return null;
    }
    return (await res.json()) as PrintifyOrder;
  } catch (err) {
    console.error(
      "[printify] order read-back error",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

export async function POST(req: Request) {
  const secret = process.env.PRINTIFY_WEBHOOK_SECRET;
  const token = process.env.PRINTIFY_API_TOKEN;

  if (!secret || !token) {
    console.error("[printify] webhook not configured");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  // Unlisted-URL guard. 404 rather than 401 so a prober cannot tell the route
  // exists at all.
  const url = new URL(req.url);
  if (url.searchParams.get("k") !== secret) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Printify sends the order id as `id` (and `resource.id` on some topics).
  const resource = body.resource as { id?: unknown; data?: unknown } | undefined;
  const rawId = body.id ?? resource?.id;
  const orderId = typeof rawId === "string" ? rawId : "";
  const rawShop = body.shop_id;
  const shopId =
    typeof rawShop === "string" || typeof rawShop === "number" ? String(rawShop) : "";

  if (!orderId || !shopId) {
    return NextResponse.json({ ok: false, error: "missing_ids" }, { status: 400 });
  }

  // Acknowledge immediately; do the read-back and CRM write after the response so
  // a slow CRM never causes Printify to retry a webhook we already accepted.
  after(async () => {
    const order = await fetchOrder(shopId, orderId, token);
    if (!order) return;

    const to = order.address_to ?? {};
    const email = (to.email ?? "").trim().toLowerCase();
    if (!email) {
      console.error("[printify] order has no buyer email", orderId);
      return;
    }
    const name = [to.first_name, to.last_name].filter(Boolean).join(" ").trim();
    const item = order.line_items?.[0]?.metadata;

    console.log(
      "[printify] buyer -> CRM",
      orderId,
      item?.title ?? "(no title)",
      item?.variant_label ?? "",
    );

    await pushLeadToCrm({
      name: name || email,
      email,
      formId: BUYER_FORM_ID,
      attribution: {
        source: "printify",
        shop_id: shopId,
        order_id: orderId,
        ...(item?.title ? { product: item.title } : {}),
        ...(item?.variant_label ? { variant: item.variant_label } : {}),
      },
    });
  });

  return NextResponse.json({ ok: true });
}
