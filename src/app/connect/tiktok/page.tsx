import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connect your TikTok",
  description:
    "Connect your TikTok account to AI Bible Gospels to schedule and publish faith-driven content. For ministers, Christian streamers, and missions teams.",
  alternates: { canonical: "/connect/tiktok" },
  robots: { index: true, follow: true },
};

export default function ConnectTikTokPage() {
  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-6">
          Creator onboarding
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-cloud leading-tight">
          Connect your TikTok.
        </h1>
        <p className="text-lg text-brand-softgold mt-6 max-w-2xl leading-relaxed">
          AI Bible Gospels is a content-publishing platform for ministers,
          Christian streamers, and missions teams. Connect your TikTok account
          to schedule and publish faith-driven video content from a single
          dashboard.
        </p>

        <div className="mt-10">
          <a
            href="/api/tiktok/start"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-brand-gold text-brand-black font-semibold hover:bg-brand-amber transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-label="TikTok"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
            </svg>
            Connect with TikTok
          </a>
          <p className="text-brand-bronze text-sm mt-4">
            You&rsquo;ll be redirected to TikTok to authorize access.
          </p>
        </div>

        <div className="mt-16 space-y-10 text-brand-softgold leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              What we ask for
            </h2>
            <p className="mb-4">
              When you click Connect, TikTok will ask whether you want to grant
              AI Bible Gospels these permissions:
            </p>
            <ul className="space-y-3 list-disc list-outside ml-6">
              <li>
                <strong className="text-brand-cloud">user.info.basic</strong>{" "}
                &mdash; read your TikTok handle, display name, and avatar so we
                can show you which account is connected.
              </li>
              <li>
                <strong className="text-brand-cloud">video.upload</strong>{" "}
                &mdash; upload videos you submit to your TikTok inbox as drafts.
                You always review and approve every draft inside the TikTok app
                before it goes live.
              </li>
            </ul>
            <p className="mt-4">
              We do not request video.publish, follower data, or comment
              moderation scopes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              Who this is for
            </h2>
            <ul className="space-y-3 list-disc list-outside ml-6">
              <li>Ministers running a TikTok presence alongside their pulpit work</li>
              <li>Christian streamers cross-posting Twitch/YouTube clips</li>
              <li>Missions teams publishing field updates from the road</li>
              <li>Faith-tech creators building public ministries online</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              How to disconnect
            </h2>
            <p>
              You can revoke access at any time from{" "}
              <a
                href="https://www.tiktok.com/setting/manage-app-permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:text-brand-amber underline"
              >
                TikTok &rsaquo; Settings &rsaquo; Manage app permissions
              </a>
              , or by emailing{" "}
              <a
                href="mailto:aibiblegospels444@gmail.com?subject=Disconnect%20TikTok"
                className="text-brand-gold hover:text-brand-amber underline"
              >
                aibiblegospels444@gmail.com
              </a>
              . Disconnection stops further posting; previously published
              content remains on TikTok unless you delete it from the TikTok
              app directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              Legal
            </h2>
            <p>
              By connecting your account you agree to our{" "}
              <Link
                href="/terms"
                className="text-brand-gold hover:text-brand-amber underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-brand-gold hover:text-brand-amber underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-border flex items-center justify-between text-sm">
          <Link
            href="/"
            className="text-brand-softgold hover:text-brand-gold transition"
          >
            &larr; Back to home
          </Link>
          <a
            href="mailto:aibiblegospels444@gmail.com?subject=TikTok%20connect%20question"
            className="text-brand-softgold hover:text-brand-gold transition"
          >
            Questions? Email us &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}
