"""Build scripts/timeline-reading-plan.html from scripts/timeline-series.json.

The reading plan people download has to match the order they will actually watch, so the
source of truth is the series file the video pipeline runs on (biblerevamp/data/series.json,
copied here as timeline-series.json). Nothing in this document is typed by hand: every season,
book, chapter range and date comes from that file. Re-copy the file and re-run this when the
series changes, then render the PDF with generate-timeline-pdf.ps1.

  python scripts/build-timeline-reading-plan.py
  powershell scripts/generate-timeline-pdf.ps1
"""
import json
from html import escape
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "timeline-series.json"
OUT = HERE / "timeline-reading-plan.html"

ROWS_PER_PAGE = 24   # season header rows are taller; 24 keeps every page clear of the footer


def era(text):
    return escape(text.replace("~", "c. ").replace("–", "–"))


def range_text(ep):
    lo, hi = ep["chapters"]
    return f"{lo}" if lo == hi else f"{lo}–{hi}"


def main():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    seasons = {s["n"]: s for s in data["seasons"]}
    eps = data["episodes"]
    books = len({e["book"] for e in eps})
    chapters = sum(e["chapters"][1] - e["chapters"][0] + 1 for e in eps)
    quotes = data.get("quotes", {})

    # ── table pages: one row per episode, season header rows inline ──────────────
    rows = []
    current = None
    for i, ep in enumerate(eps, 1):
        if ep["season"] != current:
            current = ep["season"]
            s = seasons[current]
            rows.append(
                f'<tr class="season"><td colspan="4">'
                f'<span class="snum">Season {s["n"]}</span> {escape(s["name"])}'
                f'<span class="sera">{era(s["era"])}</span></td></tr>'
            )
        rows.append(
            f'<tr><td class="num">{i:02d}</td>'
            f'<td class="book">{escape(ep["book"])} <span class="ch">{range_text(ep)}</span></td>'
            f'<td class="event">{escape(ep["event"])}</td>'
            f'<td class="date">{era(ep["date"])}</td></tr>'
        )

    pages = []
    chunk = []
    for r in rows:
        chunk.append(r)
        if len(chunk) >= ROWS_PER_PAGE:
            pages.append(chunk)
            chunk = []
    if chunk:
        pages.append(chunk)

    table_pages = []
    for n, chunk in enumerate(pages, 1):
        first = n == 1
        table_pages.append(f'''
  <section class="page">
    {'<p class="eyebrow-sm">The order</p><h1 class="section">Read it the way it <span class="gold">happened.</span></h1>' if first else '<p class="eyebrow-sm">The order, continued</p>'}
    <table class="map">
      <thead><tr><th>#</th><th>Book &amp; chapters</th><th>What happens</th><th>When</th></tr></thead>
      <tbody>
        {"".join(chunk)}
      </tbody>
    </table>
    <div class="pagefoot">
      <span>The Complete Biblical Timeline &middot; Reading Plan</span>
      <span class="right">aibiblegospels.com &middot; {n + 2} / {len(pages) + 3}</span>
    </div>
  </section>''')

    opening = quotes.get("opening")
    closing = quotes.get("closing")
    opening_html = (
        f'<div class="scripture-quote" style="margin-top:0.7in;">{escape(opening["text"])}'
        f'<span class="ref">{escape(opening["ref"])}</span></div>' if opening else "")
    closing_html = (
        f'<div class="scripture-quote" style="margin-top:0.5in;">{escape(closing["text"])}'
        f'<span class="ref">{escape(closing["ref"])}</span></div>' if closing else "")

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>The Complete Biblical Timeline — Reading Plan</title>
<style>
  @page {{ size: letter; margin: 0; }}
  * {{ box-sizing: border-box; }}
  html, body {{
    margin: 0; padding: 0; background: #0A0A2A; color: #F5DEB3;
    font-family: Georgia, 'Times New Roman', serif;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }}
  .page {{ width: 8.5in; height: 11in; padding: 0.75in 0.85in; page-break-after: always; position: relative; overflow: hidden; }}
  .page:last-child {{ page-break-after: auto; }}

  .cover {{ display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; height: 100%; padding-bottom: 1.2in; }}
  .cover .eyebrow {{ font-family: Arial, Helvetica, sans-serif; letter-spacing: 0.35em; font-size: 11pt; text-transform: uppercase; color: #D4A04A; margin-bottom: 0.7in; }}
  .cover .title {{ font-size: 46pt; color: #E8C46B; line-height: 1.02; font-weight: 700; letter-spacing: -0.01em; margin: 0 0 0.15in 0; }}
  .cover .subtitle {{ font-size: 24pt; color: #F0E6D2; font-style: italic; font-weight: 400; margin: 0 0 0.5in 0; }}
  .cover .deck {{ font-size: 14pt; color: #F5DEB3; line-height: 1.5; max-width: 5.2in; }}
  .cover .deck .accent {{ color: #E8C46B; }}
  .cover .footline {{ position: absolute; bottom: 0.75in; left: 0; right: 0; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 9pt; letter-spacing: 0.25em; text-transform: uppercase; color: #8B5E3C; }}
  .cover .rule {{ width: 1.5in; height: 1px; background: #E8C46B; margin: 0.4in auto; }}

  .eyebrow-sm {{ font-family: Arial, Helvetica, sans-serif; letter-spacing: 0.3em; font-size: 9pt; text-transform: uppercase; color: #D4A04A; margin: 0 0 0.12in 0; }}
  h1.section {{ font-size: 26pt; color: #F0E6D2; font-weight: 700; line-height: 1.1; margin: 0 0 0.3in 0; letter-spacing: -0.01em; }}
  h1.section .gold {{ color: #E8C46B; }}
  p.body {{ font-size: 11.5pt; line-height: 1.6; color: #F5DEB3; margin: 0 0 0.16in 0; max-width: 6in; }}
  p.body .em {{ color: #E8C46B; }}
  .stats {{ display: flex; gap: 0.3in; margin: 0.25in 0 0.35in 0; }}
  .stat {{ flex: 1; border-top: 1px solid #E8C46B; padding-top: 0.1in; }}
  .stat .n {{ font-size: 28pt; color: #E8C46B; font-weight: 700; line-height: 1; }}
  .stat .l {{ font-family: Arial, Helvetica, sans-serif; font-size: 8pt; letter-spacing: 0.2em; text-transform: uppercase; color: #D4A04A; margin-top: 0.06in; }}

  table.map {{ width: 100%; border-collapse: collapse; font-size: 9.6pt; }}
  table.map th {{ text-align: left; font-family: Arial, Helvetica, sans-serif; font-size: 7.5pt; letter-spacing: 0.18em; text-transform: uppercase; color: #D4A04A; padding: 0 0.08in 0.08in 0; border-bottom: 1px solid #E8C46B; }}
  table.map td {{ padding: 0.055in 0.08in 0.055in 0; border-bottom: 1px solid #1a1a4a; vertical-align: top; color: #F5DEB3; line-height: 1.3; }}
  table.map td.num {{ font-family: 'Courier New', monospace; color: #8B5E3C; width: 0.35in; }}
  table.map td.book {{ color: #F0E6D2; font-weight: 700; width: 2.35in; }}
  table.map td.book .ch {{ font-weight: 400; color: #E8C46B; }}
  table.map td.event {{ color: #F5DEB3; }}
  table.map td.date {{ font-family: Arial, Helvetica, sans-serif; font-size: 8.2pt; color: #D4A04A; width: 1.15in; white-space: nowrap; }}
  table.map tr.season td {{ padding-top: 0.14in; padding-bottom: 0.05in; border-bottom: 1px solid #E8C46B; color: #F0E6D2; font-weight: 700; font-size: 10.5pt; }}
  table.map tr.season .snum {{ font-family: Arial, Helvetica, sans-serif; font-size: 7.5pt; letter-spacing: 0.2em; text-transform: uppercase; color: #D4A04A; margin-right: 0.12in; }}
  table.map tr.season .sera {{ float: right; font-family: Arial, Helvetica, sans-serif; font-size: 8pt; font-weight: 400; color: #8B5E3C; }}

  .cta-list {{ margin: 0.2in 0 0 0; padding: 0; list-style: none; }}
  .cta-list li {{ padding: 0.12in 0; border-top: 1px solid #1a1a4a; }}
  .cta-list li:last-child {{ border-bottom: 1px solid #1a1a4a; }}
  .cta-list .k {{ font-family: Arial, Helvetica, sans-serif; font-size: 8pt; letter-spacing: 0.2em; text-transform: uppercase; color: #D4A04A; display: block; margin-bottom: 0.03in; }}
  .cta-list .v {{ font-size: 10.5pt; color: #F5DEB3; line-height: 1.45; margin: 0; }}
  .cta-list .url {{ font-family: 'Courier New', monospace; color: #E8C46B; font-size: 10pt; }}

  .scripture-quote {{ padding-left: 0.2in; border-left: 2px solid rgba(232,196,107,0.6); color: #F5DEB3; font-size: 11pt; line-height: 1.55; font-style: italic; max-width: 5.5in; }}
  .scripture-quote .ref {{ display: block; margin-top: 0.08in; font-family: Arial, Helvetica, sans-serif; font-style: normal; text-transform: uppercase; letter-spacing: 0.18em; font-size: 8pt; color: #8B5E3C; }}
  .pagefoot {{ position: absolute; left: 0.85in; right: 0.85in; bottom: 0.5in; border-top: 1px solid #1a1a4a; padding-top: 0.15in; font-family: Arial, Helvetica, sans-serif; font-size: 8pt; letter-spacing: 0.18em; text-transform: uppercase; color: #8B5E3C; display: flex; justify-content: space-between; }}
  .pagefoot .right {{ color: #D4A04A; }}
</style>
</head>
<body>
  <!-- Page 1 - Cover -->
  <section class="page cover">
    <p class="eyebrow">AI Bible Gospels</p>
    <h1 class="title">THE COMPLETE<br/>BIBLICAL TIMELINE</h1>
    <p class="subtitle">The Reading Plan</p>
    <div class="rule"></div>
    <p class="deck">
      <span class="accent">{books} books. {chapters:,} chapters.</span> In the order the events actually happened.<br/>
      The 1611 King James Bible with the Apocrypha restored.
    </p>
    <p class="footline">Creation to Revelation &middot; aibiblegospels.com</p>
  </section>

  <!-- Page 2 - How to use it -->
  <section class="page">
    <p class="eyebrow-sm">Start here</p>
    <h1 class="section">Your table of contents is not a <span class="gold">timeline.</span></h1>
    <p class="body">
      The Bible you own groups its books by type: law, history, poetry, prophets, letters. It never tells you
      when anything happened. So you finish Malachi, turn one page, and land in Matthew four hundred years
      later with nobody explaining what went on in between.
    </p>
    <p class="body">
      This plan puts the books in the order the events unfolded, and it puts the Apocrypha back between the
      Old and New Testaments, where it sat in 1611. Read it this way and the prophets land where they were
      always going to land. <span class="em">Chronology reveals context.</span>
    </p>
    <div class="stats">
      <div class="stat"><div class="n">{len(data["seasons"])}</div><div class="l">Seasons</div></div>
      <div class="stat"><div class="n">{books}</div><div class="l">Books</div></div>
      <div class="stat"><div class="n">{len(eps)}</div><div class="l">Readings</div></div>
      <div class="stat"><div class="n">{chapters:,}</div><div class="l">Chapters</div></div>
    </div>
    <p class="body">
      <span class="em">How to read it.</span> Take the readings in order, one a day if you can. Each row on the
      pages that follow is one reading: the book, the chapters, and where it sits in the story. Every reading
      is also one episode of the series on the channel, narrated word for word from the 1611 text, so you can
      read it, listen to it, or both.
    </p>
    {opening_html}
    <div class="pagefoot">
      <span>The Complete Biblical Timeline &middot; Reading Plan</span>
      <span class="right">aibiblegospels.com &middot; 2 / {len(pages) + 3}</span>
    </div>
  </section>
{"".join(table_pages)}

  <!-- Last page - Where to go next -->
  <section class="page">
    <p class="eyebrow-sm">Keep going</p>
    <h1 class="section">Hear it in <span class="gold">order.</span></h1>
    <p class="body">
      Every reading in this plan is one episode of The Complete Biblical Timeline on the AI Bible Gospels
      channel: the 1611 King James Bible with the Apocrypha, read verbatim, in this exact order, narrated by
      Tommy Lee. No music, no edits, no gaps. A new book drops every day at 7 PM Eastern until all
      {books} are up.
    </p>
    <ul class="cta-list">
      <li><span class="k">The series</span><p class="v">The Complete Biblical Timeline playlist, Season 1 to Season {len(data["seasons"])}<br/><span class="url">youtube.com/@AIBIBLEGOSPELS</span></p></li>
      <li><span class="k">Start with episode zero</span><p class="v">The Complete Story: why your Bible timeline is broken, and what this series does about it</p></li>
      <li><span class="k">The community</span><p class="v">Questions, discussion, and the daily drop<br/><span class="url">t.me/aibiblegospels</span></p></li>
      <li><span class="k">The rest of the work</span><p class="v">Faith Walk Live, Anointed, and everything else AI Bible Gospels is building<br/><span class="url">aibiblegospels.com</span></p></li>
    </ul>
    {closing_html}
    <div class="pagefoot">
      <span>The Complete Biblical Timeline &middot; Reading Plan</span>
      <span class="right">aibiblegospels.com &middot; {len(pages) + 3} / {len(pages) + 3}</span>
    </div>
  </section>
</body>
</html>
'''
    OUT.write_text(html, encoding="utf-8")
    print(f"wrote {OUT}  ({len(pages) + 3} pages, {len(eps)} readings, {books} books, {chapters} chapters)")


if __name__ == "__main__":
    main()
