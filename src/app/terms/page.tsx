import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for AI Bible Gospels — the conditions under which creators may use our content-publishing platform and connected integrations with TikTok, Instagram, Facebook, and YouTube.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-6">
          Legal
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-cloud leading-tight">
          Terms of Service
        </h1>
        <p className="text-brand-bronze text-sm mt-4">
          Effective: April 29, 2026 · Operator: AI Bible Gospels
        </p>

        <div className="mt-12 space-y-10 text-brand-softgold leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using any website, application, or software
              service operated by AI Bible Gospels (the &ldquo;Service&rdquo;),
              you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
              If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              2. Description of Service
            </h2>
            <p>
              AI Bible Gospels operates a content-publishing platform that
              connects to creators&rsquo; TikTok, Instagram Business, Facebook,
              and YouTube accounts to schedule posts, surface engagement
              metrics, and manage content on the creator&rsquo;s behalf. The
              Service is offered to faith-tech creators, ministry teams, and
              independent publishers who own and authorize the connected
              accounts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              3. Eligibility
            </h2>
            <p>
              You must be at least 18 years old and the authorized owner or
              administrator of any social media account you connect to the
              Service. By connecting an account, you represent that you have
              the right to grant the access you grant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              4. Account Connection and Authorization
            </h2>
            <p>
              The Service uses OAuth 2.0 to connect to third-party platforms.
              You authorize specific scopes when you connect each account, and
              you may revoke that authorization at any time through the
              respective platform&rsquo;s app permissions page or by contacting
              us at{" "}
              <a
                href="mailto:aibiblegospels444@gmail.com"
                className="text-brand-gold hover:text-brand-amber underline"
              >
                aibiblegospels444@gmail.com
              </a>
              . Revocation stops further access; previously published content
              remains on the platform unless you delete it directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              5. Acceptable Use
            </h2>
            <p>You agree not to use the Service to:</p>
            <ul className="mt-3 space-y-2 list-disc list-outside ml-6">
              <li>Impersonate another person or entity, or misrepresent your affiliation</li>
              <li>Violate any law, regulation, or platform policy of TikTok, Meta, YouTube, or any other connected service</li>
              <li>Distribute spam, malware, or content that infringes intellectual property rights</li>
              <li>Scrape, reverse engineer, or attempt to gain unauthorized access to the Service or its underlying systems</li>
              <li>Publish content that is harassing, hateful, sexually explicit, or otherwise prohibited by the connected platform&rsquo;s community guidelines</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              6. Content Ownership
            </h2>
            <p>
              You retain all rights to content you submit through the Service.
              By using the Service, you grant AI Bible Gospels a limited,
              non-exclusive license to process, transmit, and publish that
              content to the platforms you have connected, solely for the
              purpose of fulfilling your scheduling and publishing requests.
              AI Bible Gospels retains all rights to the Service&rsquo;s code,
              user interface, branding, and underlying technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              7. Third-Party Platforms
            </h2>
            <p>
              The Service interacts with third-party platforms including
              TikTok, Meta (Instagram and Facebook), and YouTube. Your use of
              those platforms is also governed by their respective terms and
              policies. We are not responsible for the actions, policies, or
              availability of those platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              8. Disclaimers
            </h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as
              available,&rdquo; without warranties of any kind, express or
              implied. We do not guarantee uninterrupted operation, error-free
              publishing, or specific engagement results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, AI Bible Gospels and its
              operators shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of
              profits, revenue, data, or goodwill arising from your use of the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              10. Termination
            </h2>
            <p>
              You may stop using the Service at any time and disconnect your
              accounts. We may suspend or terminate access for violation of
              these Terms or applicable platform policies, with or without
              notice. Upon termination, we will delete stored credentials and
              account data within 30 days, subject to legal retention
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              11. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. The &ldquo;Effective&rdquo;
              date at the top of this page reflects the current version.
              Continued use of the Service after changes take effect
              constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              12. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the United States and
              the state in which AI Bible Gospels is operated, without regard
              to conflict-of-law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-cloud mb-3">
              13. Contact
            </h2>
            <p>
              Questions about these Terms can be sent to{" "}
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
            href="/privacy"
            className="text-brand-softgold hover:text-brand-gold transition"
          >
            Privacy Policy →
          </Link>
        </div>
      </section>
    </main>
  );
}
