import { NextResponse } from "next/server";

const RESEND_API = "https://api.resend.com";
const FROM_LINE = "AI Bible Gospels <info@anointed.app>";
const CHEATSHEET_URL = "https://aibiblegospels.com/deut28-cheatsheet.pdf";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeBody = { email?: unknown; source?: unknown };

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json(
      { ok: false, error: "server_misconfigured" },
      { status: 500 }
    );
  }

  let body: SubscribeBody;
  try {
    body = (await req.json()) as SubscribeBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 80) : "welcome";

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 }
    );
  }

  // 1. Add to Resend Audience. Duplicates return 4xx — treat as success.
  const audienceRes = await fetch(
    `${RESEND_API}/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
      }),
    }
  );

  if (!audienceRes.ok && audienceRes.status !== 409 && audienceRes.status !== 422) {
    console.error("Resend audience add failed", audienceRes.status, await audienceRes.text());
    // Don't fail the request — still try to send the cheatsheet.
  }

  // 2. Send the cheatsheet email.
  const emailRes = await fetch(`${RESEND_API}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_LINE,
      to: [email],
      subject: "Deuteronomy 28 — the cheatsheet",
      html: cheatsheetEmailHtml(),
      text: cheatsheetEmailText(),
      headers: {
        "X-Entity-Ref-ID": `subscribe-${source}-${Date.now()}`,
      },
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    console.error("Resend send failed", emailRes.status, err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

function cheatsheetEmailHtml(): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0A0A2A;font-family:Georgia,'Times New Roman',serif;color:#F5DEB3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A2A;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;">
        <tr><td style="padding:0 0 24px;">
          <p style="margin:0;font-family:Arial,sans-serif;letter-spacing:0.3em;font-size:11px;text-transform:uppercase;color:#D4A04A;">
            AI Bible Gospels
          </p>
        </td></tr>
        <tr><td style="padding:0 0 20px;">
          <h1 style="margin:0;color:#E8C46B;font-size:32px;line-height:1.15;font-weight:700;">
            Welcome, remnant.
          </h1>
        </td></tr>
        <tr><td style="padding:0 0 16px;font-size:16px;line-height:1.65;color:#F5DEB3;">
          You asked for the Deuteronomy 28 cheatsheet. Here it is.
        </td></tr>
        <tr><td style="padding:0 0 28px;font-size:16px;line-height:1.65;color:#F5DEB3;">
          Twelve curses, hand-decoded from the King James, mapped to where we are now. Sit with them.
        </td></tr>
        <tr><td align="left" style="padding:8px 0 32px;">
          <a href="${CHEATSHEET_URL}" style="display:inline-block;background:#E8C46B;color:#0A0A2A;text-decoration:none;font-weight:700;font-family:Arial,sans-serif;font-size:14px;letter-spacing:0.05em;padding:14px 28px;border-radius:999px;">
            Open the cheatsheet (PDF) &rarr;
          </a>
        </td></tr>
        <tr><td style="padding:0 0 16px;font-size:15px;line-height:1.65;color:#F5DEB3;">
          When you're done, three places to plug in:
        </td></tr>
        <tr><td style="padding:0 0 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:8px 0;border-top:1px solid #1a1a4a;font-size:14px;line-height:1.5;">
              <span style="color:#D4A04A;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">YouTube</span><br/>
              <a href="https://www.youtube.com/@AIBIBLEGOSPELS" style="color:#E8C46B;text-decoration:none;">The full prophecy series &mdash; 80+ episodes</a>
            </td></tr>
            <tr><td style="padding:8px 0;border-top:1px solid #1a1a4a;font-size:14px;line-height:1.5;">
              <span style="color:#D4A04A;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Faith Walk Live</span><br/>
              <a href="https://faithwalklive.com" style="color:#E8C46B;text-decoration:none;">A real minister walking 3,000 miles for the gospel</a>
            </td></tr>
            <tr><td style="padding:8px 0;border-top:1px solid #1a1a4a;border-bottom:1px solid #1a1a4a;font-size:14px;line-height:1.5;">
              <span style="color:#D4A04A;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">TikTok</span><br/>
              <a href="https://www.tiktok.com/@aibiblegospels_" style="color:#E8C46B;text-decoration:none;">Daily 60-second decodes</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 0 24px;border-left:2px solid rgba(232,196,107,0.6);padding-left:14px;font-style:italic;font-size:14px;line-height:1.55;color:#F5DEB3;">
          "Then they that feared the LORD spake often one to another: and the LORD hearkened, and heard it, and a book of remembrance was written before him for them that feared the LORD, and that thought upon his name."
          <br/><span style="font-style:normal;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8B5E3C;">Malachi 3:16</span>
        </td></tr>
        <tr><td style="padding:20px 0 0;border-top:1px solid #1a1a4a;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8B5E3C;">
          AI Bible Gospels &middot; aibiblegospels.com
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function cheatsheetEmailText(): string {
  return `Welcome, remnant.

You asked for the Deuteronomy 28 cheatsheet. Here it is.

Twelve curses, hand-decoded from the King James, mapped to where we are now. Sit with them.

Open the cheatsheet (PDF): ${CHEATSHEET_URL}

When you're done, three places to plug in:

- YouTube — the full prophecy series, 80+ episodes:
  https://www.youtube.com/@AIBIBLEGOSPELS

- Faith Walk Live — a real minister walking 3,000 miles for the gospel:
  https://faithwalklive.com

- TikTok — daily 60-second decodes:
  https://www.tiktok.com/@aibiblegospels_

"Then they that feared the LORD spake often one to another: and the LORD hearkened, and heard it, and a book of remembrance was written before him for them that feared the LORD, and that thought upon his name."
— Malachi 3:16

AI Bible Gospels · aibiblegospels.com`;
}
