import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TikTok connected",
  description:
    "Your TikTok account is now connected to AI Bible Gospels. Activate your scheduling dashboard.",
  alternates: { canonical: "/connect/tiktok/success" },
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ handle?: string; display_name?: string }>;

export default async function ConnectTikTokSuccess({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { handle, display_name } = await searchParams;
  const showHandle = handle ? `@${handle}` : null;

  return (
    <main className="flex-1">
      <section className="max-w-2xl mx-auto px-4 pt-20 pb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-6">
          Step 1 of 2 complete
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-cloud leading-tight">
          TikTok connected.
        </h1>

        {showHandle && (
          <div className="mt-8 rounded-2xl border border-brand-border bg-brand-black/40 p-6">
            <p className="text-brand-bronze text-xs uppercase tracking-widest mb-2">
              Connected account
            </p>
            <p className="text-brand-cloud text-2xl font-semibold">
              {display_name || showHandle}
            </p>
            {display_name && (
              <p className="text-brand-softgold text-sm mt-1">{showHandle}</p>
            )}
          </div>
        )}

        <div className="mt-10 space-y-6 text-brand-softgold leading-relaxed">
          <p>
            We&rsquo;ve received the OAuth grant from your TikTok account.
            AI Bible Gospels is currently in invite-only beta, so the next
            step is account activation.
          </p>

          <div className="rounded-2xl border border-brand-gold/40 bg-brand-gold/5 p-6">
            <h2 className="text-xl font-semibold text-brand-cloud mb-3">
              Activate your scheduling dashboard
            </h2>
            <p className="mb-4">
              Email{" "}
              <a
                href={`mailto:aibiblegospels444@gmail.com?subject=Activate%20TikTok%20scheduling${
                  showHandle ? `%20for%20${encodeURIComponent(showHandle)}` : ""
                }`}
                className="text-brand-gold hover:text-brand-amber underline"
              >
                aibiblegospels444@gmail.com
              </a>{" "}
              with the subject line{" "}
              <span className="text-brand-cloud font-medium">
                &ldquo;Activate TikTok scheduling{showHandle ? ` for ${showHandle}` : ""}&rdquo;
              </span>{" "}
              and we&rsquo;ll provision your dashboard within 1&ndash;2 business
              days. Include a brief note about your ministry, stream, or mission
              so we can tailor your onboarding.
            </p>
            <a
              href={`mailto:aibiblegospels444@gmail.com?subject=Activate%20TikTok%20scheduling${
                showHandle ? `%20for%20${encodeURIComponent(showHandle)}` : ""
              }`}
              className="inline-block px-5 py-2.5 rounded-full bg-brand-gold text-brand-black font-medium hover:bg-brand-amber transition"
            >
              Send activation email
            </a>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              What happens next
            </h2>
            <ol className="space-y-3 list-decimal list-outside ml-6">
              <li>
                Activation email reviewed within 1&ndash;2 business days.
              </li>
              <li>
                We provision your dashboard and confirm the activation by
                replying to your email.
              </li>
              <li>
                You upload videos through the dashboard or by replying to your
                activation email; we send each upload to your TikTok inbox as a
                draft.
              </li>
              <li>
                You review and publish drafts from inside the TikTok app on
                your phone &mdash; you stay in control of every post.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              Want to disconnect?
            </h2>
            <p>
              You can revoke access from{" "}
              <a
                href="https://www.tiktok.com/setting/manage-app-permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:text-brand-amber underline"
              >
                TikTok &rsaquo; Settings &rsaquo; Manage app permissions
              </a>{" "}
              at any time, or by emailing{" "}
              <a
                href="mailto:aibiblegospels444@gmail.com?subject=Disconnect%20TikTok"
                className="text-brand-gold hover:text-brand-amber underline"
              >
                aibiblegospels444@gmail.com
              </a>
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
          <Link
            href="/connect/tiktok"
            className="text-brand-softgold hover:text-brand-gold transition"
          >
            Connect another account
          </Link>
        </div>
      </section>
    </main>
  );
}
