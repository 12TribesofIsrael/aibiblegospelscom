import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aibiblegospels.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/complete-biblical-timeline`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/anything-is-possible`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/connect/tiktok`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
