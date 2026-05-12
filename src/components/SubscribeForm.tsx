"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function SubscribeForm({ source = "welcome" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(
          data.error === "invalid_email"
            ? "That email doesn't look right."
            : "Something went sideways. Try again in a moment."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network hiccup. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-12 max-w-xl mx-auto rounded-2xl border border-brand-gold/40 bg-brand-black/50 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-amber">
          Sent
        </p>
        <h3 className="text-2xl font-semibold text-brand-cloud mt-2">
          Check your inbox, remnant.
        </h3>
        <p className="text-brand-softgold mt-3 text-sm leading-relaxed">
          The Deuteronomy 28 cheatsheet is on its way to{" "}
          <span className="text-brand-gold">{email}</span>. If you don&apos;t
          see it in a minute, peek in the promotions tab.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 max-w-xl mx-auto rounded-2xl border border-brand-border bg-brand-black/40 p-8 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-brand-amber">
        Free download
      </p>
      <h3 className="text-2xl font-semibold text-brand-cloud mt-2">
        Get the Deuteronomy 28 cheatsheet.
      </h3>
      <p className="text-brand-softgold mt-3 text-sm leading-relaxed">
        12 curses, hand-decoded from the King James, mapped to where we are
        now. PDF straight to your inbox.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col sm:flex-row gap-3"
      >
        <label htmlFor="subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="subscribe-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className="flex-1 rounded-full bg-brand-black/60 border border-brand-border px-5 py-3 text-brand-cloud placeholder:text-brand-bronze focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-brand-gold text-brand-black font-semibold px-6 py-3 hover:bg-brand-amber transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending…" : "Send me the PDF"}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-300/90" role="alert">
          {errorMsg}
        </p>
      )}

      <p className="mt-4 text-xs text-brand-bronze">
        One email with the PDF. No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
