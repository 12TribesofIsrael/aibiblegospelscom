import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-6">
          AI Bible Gospels
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cloud leading-tight">
          Faith-tech for ministers,
          <br />
          <span className="text-brand-gold">streamers, and missions.</span>
        </h1>
        <p className="text-lg text-brand-softgold mt-8 max-w-2xl mx-auto leading-relaxed">
          We build tools that serve the gospel. Live trackers, stream automation,
          ministry websites, prayer walls. Software in service of the calling.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#flagship"
            className="inline-block px-6 py-3 rounded-full bg-brand-gold text-brand-black font-semibold hover:bg-brand-amber transition"
          >
            See the flagship
          </a>
          <a
            href="#work-with-us"
            className="inline-block px-6 py-3 rounded-full border border-brand-border text-brand-softgold hover:border-brand-gold hover:text-brand-gold transition"
          >
            Work with us
          </a>
        </div>
      </section>

      {/* ── FLAGSHIP CASE STUDY ── */}
      <section
        id="flagship"
        className="border-t border-brand-border bg-brand-black/40"
      >
        <div className="max-w-4xl mx-auto px-4 py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">
            Flagship — currently live
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud">
            Faith Walk Live
          </h2>
          <p className="text-brand-softgold mt-4 text-lg leading-relaxed">
            A companion platform for Minister Zay&apos;s 3,000-mile Faith Walk
            from Philadelphia to California. Built in service of the mission,
            not to monetize it.
          </p>

          <ul className="mt-8 space-y-3 text-brand-softgold">
            <li className="flex gap-3">
              <span className="text-brand-gold">•</span>
              <span>
                Live interactive checkpoint map, updated daily from the Twitch
                stream title
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold">•</span>
              <span>
                Daily Twitch clip archive — faith moments, milestones, prayer
                stops
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold">•</span>
              <span>
                OBS stream overlay shipped to production for the Twitch browser
                source
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold">•</span>
              <span>
                Scripture-of-the-day, prayer wall, daily email signup
              </span>
            </li>
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="https://faithwalklive.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold text-brand-black font-medium hover:bg-brand-amber transition"
            >
              Visit faithwalklive.com →
            </a>
            <a
              href="https://twitch.tv/hmblzayy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-border text-brand-softgold hover:border-brand-gold hover:text-brand-gold transition"
            >
              Watch the stream
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">
            What we build
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud">
            Tools that serve the calling.
          </h2>
          <p className="text-brand-softgold mt-4 max-w-2xl leading-relaxed">
            Real deliverables, shipped to real ministries. No hype, no
            subscriptions for software you&apos;ll never use.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-brand-border bg-brand-black/30 p-6">
              <h3 className="text-xl font-semibold text-brand-cloud">
                Live trackers
              </h3>
              <p className="text-brand-softgold mt-2 text-sm leading-relaxed">
                Interactive maps for walks, missions trips, and journeys.
                Automated checkpoint ingestion from stream titles or GPS.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-border bg-brand-black/30 p-6">
              <h3 className="text-xl font-semibold text-brand-cloud">
                Stream automation
              </h3>
              <p className="text-brand-softgold mt-2 text-sm leading-relaxed">
                Twitch/YouTube auto-clippers, chatbots with custom commands,
                OBS browser-source overlays.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-border bg-brand-black/30 p-6">
              <h3 className="text-xl font-semibold text-brand-cloud">
                Ministry websites
              </h3>
              <p className="text-brand-softgold mt-2 text-sm leading-relaxed">
                Full-stack sites with prayer walls, email signup, donation
                tooling, and mobile-first design.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-border bg-brand-black/30 p-6">
              <h3 className="text-xl font-semibold text-brand-cloud">
                Content pipelines
              </h3>
              <p className="text-brand-softgold mt-2 text-sm leading-relaxed">
                Intro videos, highlight reels, thumbnail generation, and
                cross-platform clip distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── YOUTUBE ── */}
      <section className="border-t border-brand-border bg-brand-black/40">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">
            On YouTube
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud">
            Faith-driven technology content.
          </h2>
          <p className="text-brand-softgold mt-4 max-w-2xl mx-auto leading-relaxed">
            The AI Bible Gospels channel shares how believers can use
            technology in service of the gospel without losing the faith-first
            voice.
          </p>
          <a
            href="https://www.youtube.com/@AIBIBLEGOSPELS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-500 transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-label="YouTube"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </section>

      {/* ── WORK WITH US ── */}
      <section
        id="work-with-us"
        className="border-t border-brand-border"
      >
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">
            Work with us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cloud">
            Building something for your ministry?
          </h2>
          <p className="text-brand-softgold mt-4 leading-relaxed">
            If you&apos;re a minister, Christian streamer, or mission
            organization and you need tools built — let&apos;s talk. No sales
            pitch, just a conversation.
          </p>
          <a
            href="mailto:aibiblegospels444@gmail.com?subject=Faith-tech%20inquiry"
            className="inline-block mt-8 px-6 py-3 rounded-full bg-brand-gold text-brand-black font-semibold hover:bg-brand-amber transition"
          >
            Send a note
          </a>
          <p className="text-brand-bronze text-xs mt-4">
            aibiblegospels444@gmail.com
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-brand-border py-8 text-sm text-brand-amber">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <blockquote className="border-l-2 border-brand-gold/60 pl-4 italic text-brand-softgold">
            &ldquo;Whatever you do, work at it with all your heart, as working
            for the Lord, not for human masters.&rdquo;
            <span className="block not-italic text-xs text-brand-bronze mt-1">
              Colossians 3:23
            </span>
          </blockquote>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-brand-border">
            <p className="text-brand-bronze">
              AI Bible Gospels
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="https://faithwalklive.com"
                className="text-brand-softgold hover:text-brand-gold transition"
              >
                Faith Walk Live
              </Link>
              <a
                href="https://www.youtube.com/@AIBIBLEGOSPELS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-softgold hover:text-red-400 transition"
              >
                YouTube
              </a>
              <Link
                href="/privacy"
                className="text-brand-softgold hover:text-brand-gold transition"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-brand-softgold hover:text-brand-gold transition"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
