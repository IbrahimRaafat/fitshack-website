"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import MenuSwiper from "@/components/MenuSwiper";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import Loading from "@/components/Loading";
import { menuPages } from "@/lib/menuData";

function HomeContent() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Sidebar (desktop) - contains logo + menu + socials */}
      <Sidebar activeIndex={activeIndex} onSelect={setActiveIndex} />

      {/* Mobile header with logo */}
      <header className="lg:hidden shrink-0 flex items-center justify-center py-3 px-4 border-b border-border bg-card">
        <Image
          src="/logo_no_white.png"
          alt="FitShack Logo"
          width={120}
          height={120}
          className="w-20 h-auto"
          priority
        />
      </header>

      {/* Main content area */}
      <main className="flex-1 min-h-0 overflow-hidden">
        <MenuSwiper activeIndex={activeIndex} onSlideChange={setActiveIndex} />
      </main>

      {/* Bottom nav (mobile only) */}
      <BottomNav />

      {/* SEO: hidden menu content for search engines */}
      <section className="sr-only" aria-label="FitShack Menu">
        <h1>FitShack — Healthy Food in Hurghada &amp; Sahl Hashish</h1>
        <p>
          FitShack by Healthy Food Hub is a healthy food restaurant in Sahl Hashish,
          Hurghada, Egypt. We serve deli sandwiches, hot sandwiches, vegan meals,
          snacks, desserts, and coffee &amp; drinks — all made with fresh,
          wholesome ingredients. Where Wellness meets Flavor!
        </p>
        <h2>Our Menu Categories</h2>
        <ul>
          {menuPages.map((page) => (
            <li key={page.id}>
              <h3>{page.label}</h3>
              <p>
                Browse our {page.label.toLowerCase()} menu at FitShack in Hurghada
                and Sahl Hashish. Healthy, delicious, and made with care.
              </p>
            </li>
          ))}
        </ul>
        <h2>Visit Us</h2>
        <p>Location: Sahl Hashish, Hurghada, Egypt</p>
        <p>Phone: +20 114 433 5666</p>
        <p>
          Follow us on{" "}
          <a href="https://www.instagram.com/fitshackhurghada/">Instagram</a> and{" "}
          <a href="https://www.facebook.com/profile.php?id=61585252553201">Facebook</a>.
        </p>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  );
}
