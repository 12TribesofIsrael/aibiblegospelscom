"use client";

import { useState } from "react";

// The anointed.app hero background: muted clips played one after another,
// under a dark gradient so the headline stays readable.
const PLAYLIST = [
  "/landing/hero-loop.mp4",
  "/landing/sample-1.mp4",
  "/landing/sample-2.mp4",
  "/landing/sample-3.mp4",
  "/landing/sample-4.mp4",
];

export default function HeroVideo() {
  const [i, setI] = useState(0);

  return (
    <>
      <video
        key={PLAYLIST[i]}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={PLAYLIST[i]}
        poster="/landing/hero-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={() => setI((n) => (n + 1) % PLAYLIST.length)}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.75) 60%, rgba(3,7,18,0.95) 100%)",
        }}
      />
    </>
  );
}
