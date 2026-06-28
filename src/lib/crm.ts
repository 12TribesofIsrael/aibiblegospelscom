// CRM lead ingestion — submits a lead into the BMB LeadStack CRM hosted form.
//
// Why the FORM endpoint (not /api/v1/contacts): only the hosted-form submit path
// (/api/forms/<id>/submit) fires the CRM's automation engine (Speed-to-Lead:
// owner notification + pipeline deal). The /api/v1 contacts API only creates a
// contact — no follow-up. The endpoint is public (CORS *) and needs no API key —
// the form id is the capability.
//
// Routes into the Anointed sub-account (same AI Bible Gospels brand family).
//
// Fire-and-forget by design: never throws, never blocks the caller. If the CRM is
// unreachable the submit is silently skipped, so the form keeps working. Wire it
// from a route with Next's after() so it runs after the response is sent:
//
//   import { after } from "next/server";
//   after(() => pushLeadToCrm({ email, source: "website-form" }));

// Base + form id are public (the form endpoint takes no API key; the form id IS the
// capability), so they ship as defaults and work without env config. Override via
// env only if the CRM moves or the Anointed form id changes.
const CRM_BASE =
  process.env.BMB_CRM_BASE_URL ??
  process.env.BMB_CRM_INGEST_URL ??
  "https://bmb-crm.vercel.app";
const CRM_FORM_ID =
  process.env.BMB_CRM_FORM_ID ?? "cNsPnGzNYUB8GAEvbWpX"; // Anointed sub-account hosted form

export type CrmLead = {
  /** Display name. Falls back to the email when omitted — the form requires one. */
  name?: string;
  email?: string;
  phone?: string;
  // Accepted for back-compat with existing callers, but the hosted form applies
  // its own tags / source / pipeline stage, so these are no longer sent.
  company?: string;
  source?: string;
  tags?: string[];
  pipelineStage?: string | null;
  /** Optional UTM/referrer attribution to persist on the contact. */
  attribution?: Record<string, string>;
};

export async function pushLeadToCrm(lead: CrmLead): Promise<void> {
  if (!CRM_BASE || !CRM_FORM_ID) return; // not wired up — skip silently

  const email = (lead.email ?? "").trim().toLowerCase();
  const name = (lead.name ?? "").trim() || email;
  if (!name || !email) return; // the form requires both name + email

  // Form submissions are keyed by field id (see the form's fields[] config).
  const values: Record<string, string> = { name, email };
  const phone = (lead.phone ?? "").trim();
  if (phone) values.phone = phone;

  try {
    const res = await fetch(
      `${CRM_BASE.replace(/\/$/, "")}/api/forms/${CRM_FORM_ID}/submit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values,
          ...(lead.attribution ? { attribution: lead.attribution } : {}),
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[crm] form submit failed", res.status, detail.slice(0, 300));
    }
  } catch (err) {
    console.error("[crm] form submit error", err instanceof Error ? err.message : err);
  }
}
