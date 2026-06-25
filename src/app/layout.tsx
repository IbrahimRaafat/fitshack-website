import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitShack — By Healthy Food Hub",
  description: "Where Wellness meets Flavor!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="h-full flex flex-col overflow-hidden">{children}</body>
    </html>
  );
}
