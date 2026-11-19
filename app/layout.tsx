import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";
import "./styles/globals.scss";
import { meta, person } from "@/app/lib/content";

// ── Fonts (self-hosted via next/font, Latin subset, font-display: swap) ──────
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: true,
});

const geist = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ui",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  preload: false, // only used below the fold
});

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: {
    default: meta.title,
    template: `%s | ${person.name}`,
  },
  description: meta.description,
  authors: [{ name: person.name }],
  creator: person.name,
  keywords: [
    "Darshita Singh",
    "Full-Stack Developer",
    "Software Engineer",
    "React Developer",
    "MERN Stack",
    "Django REST Framework",
    "AI Developer",
    "Jaipur",
    "India",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    locale: meta.locale,
    url: meta.siteUrl,
    siteName: person.name,
    title: meta.title,
    description: meta.description,
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: `${person.name} — Full-Stack Developer portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: meta.siteUrl,
    types: {
      "text/markdown": `${meta.siteUrl}/index.md`,
    },
  },
  other: {
    "darkreader-lock": "true",
  },
};

export const viewport: Viewport = {
  themeColor: meta.themeColor,
  width: "device-width",
  initialScale: 1,
};

// ── JSON-LD structured data ───────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${meta.siteUrl}/#person`,
      name: person.name,
      url: meta.siteUrl,
      image: `${meta.siteUrl}${person.portrait}`,
      jobTitle: person.role,
      description: meta.description,
      email: person.email,
      telephone: person.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
      sameAs: [person.github, person.linkedin],
      knowsAbout: [
        "JavaScript", "TypeScript", "React.js", "Node.js", "Express.js",
        "Django REST Framework", "MongoDB", "PostgreSQL", "Full-Stack Development",
        "AI Agent Workflows", "Generative AI", "Anthropic Claude API",
        "Frontend Engineering", "UI/UX Design",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Jaipur Engineering College and Research Centre (JECRC Foundation)",
        url: "https://jecrcfoundation.com",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${meta.siteUrl}/#profile`,
      url: meta.siteUrl,
      name: `${person.name} — Portfolio`,
      description: meta.description,
      about: { "@id": `${meta.siteUrl}/#person` },
      dateModified: "2026-11-01",
    },
    // Projects as CreativeWork
    {
      "@type": "CreativeWork",
      name: "Vrinda Valley Resort",
      description: "Full-stack luxury resort booking and management platform.",
      url: "https://www.vrindavalleyresort.com/",
      creator: { "@id": `${meta.siteUrl}/#person` },
      programmingLanguage: ["JavaScript", "TypeScript"],
    },
    {
      "@type": "SoftwareSourceCode",
      name: "DevJobsBoard",
      description: "Full-stack job aggregation platform with AI-assisted ATS resume scoring.",
      url: "https://devjobsboard-web.onrender.com/",
      creator: { "@id": `${meta.siteUrl}/#person` },
      programmingLanguage: ["TypeScript", "Python"],
    },
  ],
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Preconnect only where genuinely needed */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon — plain amber dot */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* AI/LLM discoverability */}
        <link rel="alternate" type="text/markdown" href="/index.md" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Skip to main content */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        {children}
      </body>
    </html>
  );
}
