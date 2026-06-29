import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = "https://fitshack-website.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "FitShack — Healthy Food in Hurghada & Sahl Hashish",
    template: "%s | FitShack",
  },
  description:
    "FitShack is a healthy food restaurant in Hurghada and Sahl Hashish, Egypt. Enjoy deli sandwiches, hot sandwiches, vegan meals, snacks, desserts, and coffee — all made with fresh, wholesome ingredients. Where Wellness meets Flavor!",
  keywords: [
    "healthy food Hurghada",
    "healthy food Sahl Hashish",
    "healthy restaurant Hurghada",
    "healthy restaurant Sahl Hashish",
    "FitShack",
    "healthy sandwiches Hurghada",
    "vegan food Hurghada",
    "healthy snacks Hurghada",
    "healthy desserts Hurghada",
    "fitness food Hurghada",
    "keto food Hurghada",
    "low carb food Hurghada",
    "Healthy Food Hub",
    "health food Egypt",
  ],
  authors: [{ name: "FitShack — By Healthy Food Hub" }],
  creator: "FitShack",
  publisher: "FitShack",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FitShack",
    title: "FitShack — Healthy Food in Hurghada & Sahl Hashish",
    description:
      "Healthy sandwiches, vegan meals, snacks, desserts and coffee in Hurghada & Sahl Hashish. Where Wellness meets Flavor!",
    images: [
      {
        url: "/logo_no_white.png",
        width: 1200,
        height: 630,
        alt: "FitShack — By Healthy Food Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitShack — Healthy Food in Hurghada & Sahl Hashish",
    description:
      "Healthy sandwiches, vegan meals, snacks, desserts and coffee in Hurghada & Sahl Hashish.",
    images: ["/logo_no_white.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "FitShack",
    alternateName: "FitShack — By Healthy Food Hub",
    description:
      "Healthy food restaurant in Hurghada and Sahl Hashish offering deli sandwiches, hot sandwiches, vegan meals, snacks, desserts, and coffee.",
    url: siteUrl,
    logo: `${siteUrl}/logo_no_white.png`,
    image: `${siteUrl}/logo_no_white.png`,
    telephone: "+201144335666",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sahl Hashish",
      addressRegion: "Hurghada",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.0866,
      longitude: 33.8581,
    },
    menu: siteUrl,
    servesCuisine: [
      "Healthy Food",
      "Sandwiches",
      "Vegan",
      "Desserts",
      "Coffee",
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "23:00",
    },
    sameAs: [
      "https://www.instagram.com/fitshackhurghada/",
      "https://www.facebook.com/profile.php?id=61585252553201",
    ],
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full flex flex-col overflow-hidden font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
