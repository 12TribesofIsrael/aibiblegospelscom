import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connection issue",
  description: "Something went wrong while connecting your TikTok account.",
  alternates: { canonical: "/connect/tiktok/error" },
  robots: { index: false, follow: false },
};

const REASON_COPY: Record<string, { heading: string; body: string }> = {
  access_denied: {
    heading: "You declined the connection.",
    body: "TikTok reported that the authorization request was declined. No account was connected and we didn't store any data. You can try again whenever you're ready.",
  },
  state_mismatch: {
    heading: "Security check failed.",
    body: "The authorization response didn't match the request we sent. This usually happens when the connection was opened in one browser and finished in another, or when the link sat unused for too long. Please start over.",
  },
  missing_code_or_state: {
    heading: "The authorization response was incomplete.",
    body: "TikTok returned to our site without the expected parameters. Please try connecting again.",
  },
  token_exchange_failed: {
    heading: "TikTok rejected the authorization code.",
    body: "We received your authorization but TikTok declined to issue a token. This is usually temporary — please wait a moment and try again.",
  },
  token_exchange_network: {
    heading: "We couldn't reach TikTok.",
    body: "There was a network error while exchanging your authorization. Please try again in a moment.",
  },
  server_misconfigured: {
    heading: "Our connector isn't configured yet.",
    body: "The TikTok connector on our side is missing credentials. Our team has been notified — please email us so we can let you know when it's ready.",
  },
};

const DEFAULT_REASON = {
  heading: "Something went wrong.",
  body: "We weren't able to complete the TikTok connection. Please try again, and if the issue continues, email us so we can look into it.",
};

type SearchParams = Promise<{ reason?: string }>;

export default async function ConnectTikTokError({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { reason } = await searchParams;
  const copy = (reason && REASON_COPY[reason]) || DEFAULT_REASON;

  return (
    <main className="flex-1">
      <section className="max-w-2xl mx-auto px-4 pt-20 pb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-6">
          Connection issue
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-cloud leading-tight">
          {copy.heading}
        </h1>
        <p className="text-lg text-brand-softgold mt-6 leading-relaxed">
          {copy.body}
        </p>

        {reason && (
          <p className="text-brand-bronze text-xs mt-6 font-mono">
            Reference: {reason}
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/connect/tiktok"
            className="inline-block px-6 py-3 rounded-full bg-brand-gold text-brand-black font-semibold hover:bg-brand-amber transition text-center"
          >
            Try connecting again
          </Link>
          <a
            href={`mailto:aibiblegospels444@gmail.com?subject=TikTok%20connect%20issue${
              reason ? `%20(${encodeURIComponent(reason)})` : ""
            }`}
            className="inline-block px-6 py-3 rounded-full border border-brand-border text-brand-softgold hover:border-brand-gold hover:text-brand-gold transition text-center"
          >
            Email support
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-border text-sm">
          <Link
            href="/"
            className="text-brand-softgold hover:text-brand-gold transition"
          >
            &larr; Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
