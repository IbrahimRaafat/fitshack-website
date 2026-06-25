"use client";

import { useState } from "react";
import Image from "next/image";
import MenuSwiper from "@/components/MenuSwiper";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header
        className="shrink-0 flex items-center justify-center md:justify-start py-3 md:py-4 px-4 md:px-6"
        style={{ background: "var(--bg)" }}
      >
        <Image
          src="/logo_no_white.png"
          alt="FitShack Logo"
          width={120}
          height={120}
          className="w-24 md:w-28 h-auto"
          priority
        />
      </header>

      {/* Main content area */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar (desktop only) */}
        <Sidebar activeIndex={activeIndex} onSelect={setActiveIndex} />

        {/* Menu content (takes remaining space) */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <MenuSwiper activeIndex={activeIndex} onSlideChange={setActiveIndex} />
        </div>
      </div>

      {/* Bottom nav (mobile only) */}
      <BottomNav />
    </div>
  );
}
