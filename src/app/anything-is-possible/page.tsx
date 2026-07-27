import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import StudyGuideForm from "@/components/StudyGuideForm";

// Campaign display faces, scoped to this route so the rest of the site keeps
// Geist. Both are SIL OFL and cleared for commercial merchandise — licences ship
// alongside the .ttf files in ./fonts/.
const anton = localFont({
  src: "../fonts/Anton.ttf",
  variable: "--font-anton",
  display: "swap",
});
const oswald = localFont({
  src: "../fonts/Oswald.ttf",
  variable: "--font-oswald",
  display: "swap",
});

// ─────────────────────────────────────────────────────────────────────────────
// FILL THESE IN AFTER PHASE 0
// Until each is set the page degrades gracefully rather than rendering a broken
// embed or a dead link — so this route is safe to deploy before the uploads and
// the storefront exist.
// ─────────────────────────────────────────────────────────────────────────────
/** MissionOfChrist_adult.mp4 — uploaded public to @AIBIBLEGOSPELS 2026-07-26. */
const VIDEO_ADULT = "_-v5yU3iUH8";
/** MissionOfChrist_kids.mp4 — public, declared made-for-kids (no cards/comments). */
const VIDEO_KIDS = "fzzAiSv4opg";
/** Printify Pop-Up storefront URL once the sales channel is connected. */
const SHOP_URL = "https://anything-is-possible-co.printify.me";
// ─────────────────────────────────────────────────────────────────────────────

const CHANNEL = "https://www.youtube.com/@AIBIBLEGOSPELS";

export const metadata: Metadata = {
  title: "Anything Is Possible — Philippians 4:13 | AI Bible Gospels",
  description:
    "The teaching behind Philippians 4:13 — the mission of Christ, the what, the how, and the why. Watch it free, and take the study guide with you.",
  alternates: { canonical: "https://aibiblegospels.com/anything-is-possible" },
  openGraph: {
    title: "Anything Is Possible — Philippians 4:13",
    description:
      "Scripture first, explanation second. The teaching behind the verse, plus a free study guide.",
    url: "https://aibiblegospels.com/anything-is-possible",
    type: "article",
  },
};

/** The three-part framework, condensed from docs/mission-of-christ-framework.md. */
const FRAMEWORK = [
  {
    q: "The What",
    label: "His mission",
    a: "Bring God's people back to Him.",
    detail:
      "Find the lost, teach them to obey, and give His life to make a way back.",
  },
  {
    q: "The How",
    label: "His method",
    a: "Teach them to repent, obey God, love others, and follow His example.",
    detail:
      "Repent. Believe God. Learn His word. Live it. Then help someone else do the same.",
  },
  {
    q: "The Why",
    label: "His purpose",
    a: "So they can become like their Father, glorify Him, and inherit His Kingdom.",
    detail:
      "Restore the relationship, transform the character, prepare for the Kingdom.",
  },
];

/** Live Printify products. Images pulled from the shop, so they show real artwork. */
const PRODUCTS = [
  { img: "tee", name: "Tee", blank: "Bella+Canvas 3001", note: "10 colours · S–3XL" },
  { img: "sweatshirt", name: "Crewneck", blank: "Gildan 18000", note: "8 colours · S–3XL" },
  { img: "hoodie", name: "Hoodie", blank: "Gildan 18500", note: "Chest mark front, graphic back" },
  { img: "hoodie_ls_tee", name: "Hooded long sleeve", blank: "Bella+Canvas 3512", note: "6 colours · S–2XL" },
  { img: "cap_otto", name: "Embroidered snapback", blank: "OTTO 125-978", note: "Front, back and side" },
  { img: "cap_yupoong", name: "Flat bill snapback", blank: "Yupoong 6089M", note: "5 colours" },
];

export default function AnythingIsPossible() {
  return (
    <main className={`${anton.variable} ${oswald.variable} flex-1`}>
      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-6">
          AI Bible Gospels
        </p>
        <h1
          style={{ fontFamily: "var(--font-anton)" }}
          className="text-5xl sm:text-6xl md:text-7xl text-brand-cloud leading-[0.95] uppercase"
        >
          Anything
          <br />
          <span className="text-brand-gold">Is Possible</span>
        </h1>

        {/* Philippians 4:13, quoted verbatim from the 1611 KJV (with Apocrypha)
            PDF via pdftotext — never from memory. */}
        <blockquote
          style={{ fontFamily: "var(--font-oswald)" }}
          className="mt-10 text-xl sm:text-2xl text-brand-softgold leading-relaxed max-w-2xl mx-auto"
        >
          &ldquo;I can do all things through Christ which strengtheneth me.&rdquo;
        </blockquote>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-brand-bronze">
          Philippians 4:13
        </p>

        <p className="text-lg text-brand-softgold mt-10 max-w-2xl mx-auto leading-relaxed">
          It&apos;s one of the most quoted verses there is. Most people have never
          been walked through what Paul was actually saying, or the mission of
          Christ that made it true.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#teaching"
            className="inline-block px-6 py-3 rounded-full bg-brand-gold text-brand-black font-semibold hover:bg-brand-amber transition"
          >
            Watch the teaching
          </a>
          <a
            href="#guide"
            className="inline-block px-6 py-3 rounded-full border border-brand-border text-brand-softgold hover:border-brand-gold hover:text-brand-gold transition"
          >
            Get the free study guide
          </a>
        </div>
      </section>

      {/* ── THE TEACHING ── */}
      <section
        id="teaching"
        className="border-t border-brand-border bg-brand-black/40"
      >
        <div className="max-w-4xl mx-auto px-4 py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4 text-center">
            Scripture first, explanation second
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud text-center">
            The Mission of Christ
          </h2>
          <p className="text-brand-softgold mt-4 max-w-2xl mx-auto leading-relaxed text-center">
            The what, the how, and the why. Every point carried by the text
            before a word of explanation.
          </p>

          <div className="mt-12 rounded-2xl border border-brand-border bg-brand-black/40 overflow-hidden">
            {VIDEO_ADULT ? (
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ADULT}`}
                  title="The Mission of Christ — The What, The How, and The Why"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            ) : (
              <div className="aspect-video flex flex-col items-center justify-center text-center px-6">
                <p className="text-xs uppercase tracking-[0.25em] text-brand-amber">
                  Coming shortly
                </p>
                <p className="text-brand-softgold mt-3 max-w-md leading-relaxed">
                  The teaching is finished and going up on the channel. Leave
                  your email below and we&apos;ll send it the moment it&apos;s
                  live, along with the study guide.
                </p>
                <a
                  href={CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold text-sm mt-5"
                >
                  Watch on YouTube in the meantime &rarr;
                </a>
              </div>
            )}
          </div>

          {/* Kids edition */}
          <div id="kids" className="mt-6 rounded-2xl border border-brand-border bg-brand-black/30 p-6 sm:flex sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-amber">
                For the family
              </p>
              <h3 className="text-lg font-semibold text-brand-cloud mt-2">
                The same teaching, made for ages 8&ndash;12
              </h3>
              <p className="text-brand-softgold mt-2 text-sm leading-relaxed max-w-xl">
                Same three questions, told so a child can follow it and answer
                them back to you.
              </p>
            </div>
            <a
              href={VIDEO_KIDS ? `https://www.youtube.com/watch?v=${VIDEO_KIDS}` : CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-0 shrink-0 inline-block px-5 py-3 rounded-full border border-brand-border text-brand-softgold hover:border-brand-gold hover:text-brand-gold transition text-sm"
            >
              {VIDEO_KIDS ? "Watch the kids edition →" : "On the channel soon →"}
            </a>
          </div>
        </div>
      </section>

      {/* ── FREE STUDY GUIDE ── */}
      <section id="guide" className="border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <StudyGuideForm source="aip-page" />
        </div>
      </section>

      {/* ── WHAT / HOW / WHY ── */}
      <section className="border-t border-brand-border bg-brand-black/40">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4 text-center">
            Three questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud text-center">
            Understand these and you understand the gospel.
          </h2>

          <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left">
            {FRAMEWORK.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-brand-border bg-brand-black/30 p-6"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-brand-amber">
                  {f.q} &middot; {f.label}
                </p>
                <h3
                  style={{ fontFamily: "var(--font-oswald)" }}
                  className="text-lg text-brand-gold mt-3 leading-snug"
                >
                  {f.a}
                </h3>
                <p className="text-brand-softgold mt-3 text-sm leading-relaxed">
                  {f.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP THE COLLECTION ── */}
      <section id="collection" className="border-t border-brand-border">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4 text-center">
            Wear it
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud text-center">
            The collection
          </h2>
          <p className="text-brand-softgold mt-4 max-w-2xl mx-auto leading-relaxed text-center">
            The verse, the portrait, and the crown — printed properly on garments
            worth keeping. Every order carries a card with the teaching behind it.
          </p>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((p) => (
              <div
                key={p.img}
                className="rounded-2xl border border-brand-border bg-brand-black/30 overflow-hidden"
              >
                <div className="relative aspect-square bg-white">
                  <Image
                    src={`/campaign/${p.img}.png`}
                    alt={`${p.name} — Anything Is Possible, Philippians 4:13`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-brand-cloud font-semibold">{p.name}</h3>
                  <p className="text-brand-bronze text-xs mt-1">{p.blank}</p>
                  <p className="text-brand-softgold text-sm mt-2">{p.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            {SHOP_URL ? (
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-full bg-brand-gold text-brand-black font-semibold hover:bg-brand-amber transition"
              >
                Shop the collection
              </a>
            ) : (
              <p className="text-brand-bronze text-sm">
                The store opens shortly. Get the study guide above and
                we&apos;ll let you know.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── CHANNEL ── */}
      <section className="border-t border-brand-border bg-brand-black/40">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">
            Where the teaching lives
          </p>
          <h2 className="text-3xl font-bold text-brand-cloud">
            AI Bible Gospels
          </h2>
          <p className="text-brand-softgold mt-4 leading-relaxed">
            Scripture opened up, verse by verse, in a way you can sit with. This
            teaching is one of many.
          </p>
          <a
            href={CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block px-6 py-3 rounded-full bg-brand-gold text-brand-black font-semibold hover:bg-brand-amber transition"
          >
            Subscribe on YouTube
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-brand-border">
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-bronze">
            Anything Is Possible&trade; &middot; Through Christ&trade;
          </p>
          <p className="text-brand-bronze text-xs mt-3">
            <Link href="/" className="hover:text-brand-gold transition">
              AI Bible Gospels
            </Link>
            {" · "}
            <Link href="/privacy" className="hover:text-brand-gold transition">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="hover:text-brand-gold transition">
              Terms
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
