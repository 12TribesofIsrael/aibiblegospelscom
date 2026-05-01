import { NextRequest, NextResponse } from "next/server";

const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_USERINFO_URL =
  "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,username";
const REDIRECT_URI = "https://aibiblegospels.com/api/tiktok/callback";
const BASE = "https://aibiblegospels.com";

function errorRedirect(reason: string) {
  const res = NextResponse.redirect(
    new URL(`/connect/tiktok/error?reason=${encodeURIComponent(reason)}`, BASE)
  );
  res.cookies.delete("tiktok_oauth_state");
  return res;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const tikTokError = url.searchParams.get("error");

  if (tikTokError) {
    return errorRedirect(tikTokError);
  }
  if (!code || !state) {
    return errorRedirect("missing_code_or_state");
  }

  const cookieState = request.cookies.get("tiktok_oauth_state")?.value;
  if (!cookieState || cookieState !== state) {
    return errorRedirect("state_mismatch");
  }

  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  if (!clientKey || !clientSecret) {
    return errorRedirect("server_misconfigured");
  }

  let accessToken: string;
  try {
    const tokenRes = await fetch(TIKTOK_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    });
    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok || !tokenJson.access_token) {
      return errorRedirect("token_exchange_failed");
    }
    accessToken = tokenJson.access_token;
  } catch {
    return errorRedirect("token_exchange_network");
  }

  let username = "";
  let displayName = "";
  try {
    const infoRes = await fetch(TIKTOK_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const infoJson = await infoRes.json();
    const user = infoJson?.data?.user;
    if (user) {
      username = user.username ?? "";
      displayName = user.display_name ?? "";
    }
  } catch {
    // user info is non-fatal — still treat the connection as successful
  }

  const successUrl = new URL("/connect/tiktok/success", BASE);
  if (username) successUrl.searchParams.set("handle", username);
  if (displayName) successUrl.searchParams.set("display_name", displayName);

  const res = NextResponse.redirect(successUrl);
  res.cookies.delete("tiktok_oauth_state");
  return res;
}
