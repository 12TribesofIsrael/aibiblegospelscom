// CRM lead ingestion — pushes a contact into the BMB LeadStack CRM.
//
// Fire-and-forget by design: this never throws and never blocks the caller.
// If the env vars are missing the push is silently skipped, so the form keeps
// working even when the CRM is unconfigured or down. Wire it from a route with
// Next's after() so it runs after the response is sent:
//
//   import { after } from "next/server";
//   after(() => pushLeadToCrm({ email, source: "website-form", tags: ["..."] }));

const CRM_BASE = process.env.BMB_CRM_INGEST_URL; // e.g. https://bmb-crm.vercel.app
const CRM_KEY = process.env.BMB_CRM_API_KEY; // LeadStack key: lsk_live_<id>:<secret>

export type CrmLead = {
  /** Display name. Falls back to the email when omitted — the CRM requires one. */
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  /** ContactSource value; defaults to "website-form". */
  source?: string;
  tags?: string[];
  /** "new" puts the lead on the sales board; null/undefined = contact only. */
  pipelineStage?: string | null;
};

export async function pushLeadToCrm(lead: CrmLead): Promise<void> {
  if (!CRM_BASE || !CRM_KEY) return; // not wired up — skip silently

  const email = (lead.email ?? "").trim().toLowerCase();
  const name = (lead.name ?? "").trim() || email;
  if (!name) return; // the CRM requires a non-empty name

  try {
    const res = await fetch(`${CRM_BASE.replace(/\/$/, "")}/api/v1/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CRM_KEY}`,
        "Content-Type": "application/json",
        // 24h idempotency so a double-submit doesn't create two contacts.
        // The CRM only allows [A-Za-z0-9_-:.] — strip everything else (e.g. the
        // "@" and "+" in emails) or it rejects the whole request with a 400.
        "Idempotency-Key": `${lead.source ?? "form"}:${email || name}`
          .replace(/[^A-Za-z0-9_:.-]/g, "-")
          .slice(0, 255),
      },
      body: JSON.stringify({
        name,
        email,
        phone: lead.phone ?? "",
        company: lead.company ?? "",
        source: lead.source ?? "website-form",
        tags: lead.tags ?? [],
        pipeline_stage: lead.pipelineStage ?? null,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[crm] ingest failed", res.status, detail.slice(0, 300));
    }
  } catch (err) {
    console.error("[crm] ingest error", err instanceof Error ? err.message : err);
  }
}
