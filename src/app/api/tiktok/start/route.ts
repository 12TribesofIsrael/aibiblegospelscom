import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

const TIKTOK_AUTH_BASE = "https://www.tiktok.com/v2/auth/authorize/";
const REDIRECT_URI = "https://aibiblegospels.com/api/tiktok/callback";
const SCOPES = "user.info.basic,video.upload";

export async function GET() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  if (!clientKey) {
    return NextResponse.redirect(
      new URL(
        "/connect/tiktok/error?reason=server_misconfigured",
        "https://aibiblegospels.com"
      )
    );
  }

  const state = randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_key: clientKey,
    scope: SCOPES,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state,
  });

  const response = NextResponse.redirect(`${TIKTOK_AUTH_BASE}?${params.toString()}`);
  response.cookies.set("tiktok_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return response;
}
