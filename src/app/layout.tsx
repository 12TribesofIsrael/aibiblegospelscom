import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aibiblegospels.com"),
  title: {
    default: "AI Bible Gospels — Faith-Tech for Ministers, Streamers, and Missions",
    template: "%s · AI Bible Gospels",
  },
  description:
    "AI Bible Gospels builds faith-tech for ministers, Christian streamers, and missions organizations. Live trackers, stream automation, ministry websites, and prayer tools. Flagship: Faith Walk Live.",
  keywords: [
    "AI Bible Gospels",
    "faith tech",
    "christian streamers",
    "ministry website",
    "faith automation",
    "christian twitch",
    "faith walk live",
    "minister website",
  ],
  authors: [{ name: "AI Bible Gospels", url: "https://www.youtube.com/@AIBIBLEGOSPELS" }],
  creator: "AI Bible Gospels",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aibiblegospels.com",
    siteName: "AI Bible Gospels",
    title: "AI Bible Gospels — Faith-Tech for Ministers, Streamers, and Missions",
    description:
      "Faith-tech built to serve the gospel. Live trackers, stream automation, ministry websites, prayer tools. Flagship: Faith Walk Live.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Bible Gospels — Faith-Tech for the Gospel",
    description:
      "Faith-tech for ministers, Christian streamers, and missions. Flagship: Faith Walk Live.",
    creator: "@AIBIBLEGOSPELS",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aibiblegospels.com/#organization",
      name: "AI Bible Gospels",
      url: "https://aibiblegospels.com",
      description:
        "Faith-driven technology ministry using software and AI in service of the gospel. Builds tools for ministers, Christian streamers, and missions organizations.",
      sameAs: [
        "https://www.youtube.com/@AIBIBLEGOSPELS",
        "https://faithwalklive.com",
      ],
      founder: {
        "@type": "Person",
        name: "Thomas",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://aibiblegospels.com/#website",
      name: "AI Bible Gospels",
      url: "https://aibiblegospels.com",
      description:
        "Faith-tech for ministers, Christian streamers, and missions. Flagship: Faith Walk Live.",
      inLanguage: "en-US",
      publisher: { "@id": "https://aibiblegospels.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-navy text-brand-softgold">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
