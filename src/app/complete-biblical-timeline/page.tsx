import type { Metadata } from "next";
import Link from "next/link";
import TimelineForm from "@/components/TimelineForm";
import series from "../../../scripts/timeline-series.json";

// The page and the PDF read the same file the video pipeline runs on, so the
// seasons shown here, the plan people download and the order they watch never
// drift apart. Re-copy biblerevamp/data/series.json to scripts/ when it changes.

const CHANNEL = "https://www.youtube.com/@AIBIBLEGOSPELS";
const PLAYLIST = "https://www.youtube.com/playlist?list=PLXAp0-N3Ra9o";
const TELEGRAM = "https://t.me/aibiblegospels";

type Episode = { id: string; season: number; book: string; chapters: number[]; event: string; date: string };
type Season = { n: number; name: string; era: string };

const SEASONS = series.seasons as Season[];
const EPISODES = series.episodes as Episode[];
const BOOKS = new Set(EPISODES.map((e) => e.book)).size;
const CHAPTERS = EPISODES.reduce((n, e) => n + (e.chapters[1] - e.chapters[0] + 1), 0);

export const metadata: Metadata = {
  title: "The Complete Biblical Timeline — free reading plan | AI Bible Gospels",
  description:
    "All 81 books of the 1611 King James Bible with the Apocrypha restored, in the order the events actually happened. Eighteen seasons, Creation to Revelation. Get the free reading plan, then hear every book narrated word for word.",
  alternates: { canonical: "https://aibiblegospels.com/complete-biblical-timeline" },
  openGraph: {
    title: "The Complete Biblical Timeline — free reading plan",
    description:
      "Your table of contents is not a timeline. Read the Bible in the order it happened, Apocrypha restored. Free PDF.",
    url: "https://aibiblegospels.com/complete-biblical-timeline",
    type: "article",
  },
};

function era(text: string) {
  return text.replace("~", "c. ");
}

function booksFor(n: number) {
  return EPISODES.filter((e) => e.season === n).map((e) => {
    const [lo, hi] = e.chapters;
    return `${e.book} ${lo === hi ? lo : `${lo}–${hi}`}`;
  });
}

export default function CompleteBiblicalTimelinePage() {
  return (
    <main className="bg-brand-black text-brand-cloud">
      {/* ── HERO ── */}
      <section className="border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">
            AI Bible Gospels · a series in {SEASONS.length} seasons
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-brand-gold leading-[1.05]">
            The Complete Biblical Timeline
          </h1>
          <p className="text-brand-softgold mt-6 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            All {BOOKS} books of the 1611 King James Bible, Apocrypha restored, read word for word in
            the order the events actually happened. Creation to Revelation. No music, no edits, no gaps.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#plan"
              className="rounded-full bg-brand-gold text-brand-black font-semibold px-6 py-3 hover:bg-brand-amber transition"
            >
              Get the free reading plan
            </a>
            <a
              href={PLAYLIST}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-brand-border text-brand-softgold px-6 py-3 hover:border-brand-gold hover:text-brand-gold transition"
            >
              Watch the series →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="border-b border-brand-border bg-brand-black/40">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">Why the order matters</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud">
            Your table of contents is not a timeline.
          </h2>
          <p className="text-brand-softgold mt-6 leading-relaxed">
            The Bible you own groups its books by type: law, history, poetry, prophets, letters. It never
            tells you when anything happened. So you finish Malachi, turn one page, and land in Matthew four
            hundred years later with nobody explaining what went on in between.
          </p>
          <p className="text-brand-softgold mt-4 leading-relaxed">
            This series puts the books in the order the events unfolded, and it puts the Apocrypha back
            between the Old and New Testaments, where it sat in 1611. The Maccabees fighting Greek
            oppression, the Wisdom of Solomon, Sirach, the visions of 2 Esdras. Read it this way and the
            prophets land where they were always going to land.{" "}
            <span className="text-brand-gold">Chronology reveals context.</span>
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              [SEASONS.length, "seasons"],
              [BOOKS, "books"],
              [EPISODES.length, "readings"],
              [CHAPTERS.toLocaleString(), "chapters"],
            ].map(([n, l]) => (
              <div key={String(l)} className="border-t border-brand-gold pt-3">
                <p className="text-3xl font-bold text-brand-gold leading-none">{n}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-amber mt-2">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE READING PLAN ── */}
      <section id="plan" className="border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <TimelineForm source="timeline-page" />
        </div>
      </section>

      {/* ── THE SEASONS ── */}
      <section className="border-b border-brand-border bg-brand-black/40">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4 text-center">
            The {SEASONS.length} seasons
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud text-center">
            Creation to Revelation, in order.
          </h2>
          <ol className="mt-12 grid sm:grid-cols-2 gap-4 text-left">
            {SEASONS.map((s) => (
              <li key={s.n} className="rounded-2xl border border-brand-border bg-brand-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-amber">
                  Season {s.n} · {era(s.era)}
                </p>
                <h3 className="text-lg text-brand-gold mt-2 leading-snug font-semibold">{s.name}</h3>
                <p className="text-brand-softgold mt-3 text-sm leading-relaxed">{booksFor(s.n).join(" · ")}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── HEAR IT ── */}
      <section className="border-b border-brand-border">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">Hear it in order</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud">
            Every reading is an episode.
          </h2>
          <p className="text-brand-softgold mt-6 leading-relaxed">
            Each reading in the plan is one episode on the channel, narrated word for word from the 1611
            text by Tommy Lee. Start with episode zero, The Complete Story, then follow the playlist straight
            through. A new book drops every day at 7 PM Eastern until all {BOOKS} are up.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PLAYLIST}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-gold text-brand-black font-semibold px-6 py-3 hover:bg-brand-amber transition"
            >
              Open the playlist →
            </a>
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-brand-border text-brand-softgold px-6 py-3 hover:border-brand-gold hover:text-brand-gold transition"
            >
              Join on Telegram →
            </a>
          </div>
          <p className="mt-10 text-sm text-brand-bronze">
            The narration is Tommy Lee&apos;s voice, reproduced with AI voice cloning from his own recordings.
            The Scripture is the 1611 King James Bible read word for word; the text is never rewritten.{" "}
            <Link href="/" className="text-brand-gold hover:underline">
              About AI Bible Gospels →
            </Link>
          </p>
          <p className="mt-4 text-xs text-brand-bronze">
            <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">
              @AIBIBLEGOSPELS on YouTube
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
