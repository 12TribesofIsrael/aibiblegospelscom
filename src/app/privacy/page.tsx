import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for AI Bible Gospels — what data we collect from creators who connect their TikTok, Instagram, Facebook, and YouTube accounts, how we use it, and how to request deletion.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-6">
          Legal
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-cloud leading-tight">
          Privacy Policy
        </h1>
        <p className="text-brand-bronze text-sm mt-4">
          Effective: April 29, 2026 · Operator: AI Bible Gospels
        </p>

        <div className="mt-12 space-y-10 text-brand-softgold leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy explains how AI Bible Gospels (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; &ldquo;our&rdquo;) collects, uses, stores, and
              shares information when creators use our content-publishing
              platform and connect their TikTok, Instagram Business, Facebook,
              or YouTube accounts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              2. Information We Collect
            </h2>
            <p>We collect three categories of information:</p>
            <ul className="mt-4 space-y-3 list-disc list-outside ml-6">
              <li>
                <strong className="text-brand-cloud">Account data.</strong>{" "}
                When a creator connects an account via OAuth, we receive access
                tokens, refresh tokens, the connected account&rsquo;s public
                profile (handle, display name, account ID), and the scopes the
                creator has authorized.
              </li>
              <li>
                <strong className="text-brand-cloud">Content data.</strong>{" "}
                Posts, captions, video files, scheduling metadata, and any
                other content the creator submits to be published or analyzed
                through the Service.
              </li>
              <li>
                <strong className="text-brand-cloud">Usage data.</strong>{" "}
                Basic application analytics (page views, error logs, request
                timestamps) used to operate and improve the Service. We do not
                use third-party advertising trackers or fingerprinting.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              3. How We Use Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-3 space-y-2 list-disc list-outside ml-6">
              <li>Publish content to the connected platforms on the creator&rsquo;s behalf</li>
              <li>Surface engagement metrics (views, likes, comments, follower changes) returned by those platforms</li>
              <li>Maintain account security, rotate tokens, and respond to support requests</li>
              <li>Diagnose and fix technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              4. How We Share Information
            </h2>
            <p>
              We share information only with the platforms required to fulfill
              the creator&rsquo;s scheduling and publishing requests
              (TikTok, Meta, YouTube), and only the data necessary for the
              specific request. We do not sell personal information. We do not
              share data with advertisers. We may disclose information when
              required by law, valid legal process, or to protect against
              fraud or abuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              5. Data Retention
            </h2>
            <p>
              Access tokens are rotated approximately every 60 days; expired
              tokens are deleted. Content data is retained for as long as the
              connected account remains active in the Service. Upon
              disconnection or upon receipt of a verified deletion request,
              we delete stored credentials and content data within 30 days,
              subject to any legal retention obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              6. Data Deletion Requests
            </h2>
            <p>
              You may request deletion of any data we hold about you or your
              connected accounts at any time by emailing{" "}
              <a
                href="mailto:aibiblegospels444@gmail.com?subject=Data%20Deletion%20Request"
                className="text-brand-gold hover:text-brand-amber underline"
              >
                aibiblegospels444@gmail.com
              </a>{" "}
              with the subject line &ldquo;Data Deletion Request.&rdquo; Please
              include the connected account handle and platform so we can
              verify your identity. We will confirm receipt within 7 days and
              complete the deletion within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              7. Security
            </h2>
            <p>
              We use industry-standard practices to protect the information we
              hold: encrypted storage at rest, TLS in transit, scope
              minimization (we request only the OAuth permissions needed),
              regular token rotation, and access controls on internal systems.
              No system can guarantee absolute security, and we encourage
              creators to use strong passwords and enable two-factor
              authentication on their connected platform accounts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              8. Children&rsquo;s Privacy
            </h2>
            <p>
              The Service is not directed to individuals under 18, and we do
              not knowingly collect information from anyone under 18. If we
              learn that we have collected such information, we will delete
              it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              9. Third-Party Platforms
            </h2>
            <p>
              When you use the Service to publish to or pull metrics from a
              third-party platform, that platform&rsquo;s own privacy policy
              also applies to data flowing through that platform:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-outside ml-6">
              <li>
                <a
                  href="https://www.tiktok.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-brand-amber underline"
                >
                  TikTok Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://privacycenter.instagram.com/policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-brand-amber underline"
                >
                  Instagram / Meta Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-brand-amber underline"
                >
                  Google / YouTube Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              10. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to access,
              correct, delete, or receive a portable copy of the personal
              information we hold about you, and to object to or restrict
              certain processing. To exercise any of these rights, email{" "}
              <a
                href="mailto:aibiblegospels444@gmail.com"
                className="text-brand-gold hover:text-brand-amber underline"
              >
                aibiblegospels444@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              11. International Users
            </h2>
            <p>
              The Service is operated from the United States. If you use the
              Service from outside the U.S., you understand that your
              information will be transferred to and processed in the U.S.,
              which may have different data protection rules than your home
              jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              12. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The
              &ldquo;Effective&rdquo; date at the top of this page reflects
              the current version. Material changes will be communicated to
              connected creators via the email address on file.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              13. Contact
            </h2>
            <p>
              Privacy questions or concerns can be sent to{" "}
              <a
                href="mailto:aibiblegospels444@gmail.com"
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
            ← Back to home
          </Link>
          <Link
            href="/terms"
            className="text-brand-softgold hover:text-brand-gold transition"
          >
            Terms of Service →
          </Link>
        </div>
      </section>
    </main>
  );
}
