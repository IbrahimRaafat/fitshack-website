"use client";

import { useState } from "react";
import Image from "next/image";
import MenuSwiper from "@/components/MenuSwiper";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function Home() {
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
    </div>
  );
}
