"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { menuPages } from "@/lib/menuData";
import { useRef, useState } from "react";

export default function MenuSwiper() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    swiperRef.current?.slideTo(index);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Category tabs */}
      <div
        className="flex gap-1 px-2 md:px-4 py-2 overflow-x-auto shrink-0 scrollbar-hide"
        style={{ background: "var(--green-mid)", borderBottom: "2px solid var(--green-dark)" }}
      >
        {menuPages.map((page, i) => (
          <button
            key={page.id}
            onClick={() => goTo(i)}
            className="px-2 md:px-3 py-1 md:py-1.5 rounded text-xs md:text-sm font-bold whitespace-nowrap transition-colors"
            style={
              activeIndex === i
                ? { background: "white", color: "var(--green-dark)" }
                : { background: "transparent", color: "white", opacity: 0.85 }
            }
          >
            {page.label}
          </button>
        ))}
      </div>

      {/* Swipeable pages */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Swiper
          modules={[Keyboard]}
          keyboard={{ enabled: true }}
          onSwiper={(s) => { swiperRef.current = s; }}
          onSlideChange={(s) => setActiveIndex(s.activeIndex)}
          className="h-full"
        >
          {menuPages.map((page) => (
            <SwiperSlide key={page.id} className="h-full overflow-y-auto">
              <div className="flex flex-col justify-center items-center p-2 md:p-4 w-full h-full" style={{ background: "var(--bg)", touchAction: "manipulation" }}>
                <Image
                  src={page.image}
                  alt={page.label}
                  width={800}
                  height={1200}
                  className="w-full max-w-md md:max-w-2xl h-auto rounded-lg shadow"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                  style={{ touchAction: "pinch-zoom" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Dot indicators */}
      <div
        className="flex justify-center gap-1.5 py-2 md:py-3 shrink-0"
        style={{ background: "var(--green-dark)" }}
      >
        {menuPages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all"
            style={{
              width: i === activeIndex ? 20 : 8,
              height: 8,
              background: i === activeIndex ? "white" : "rgba(255,255,255,0.4)",
            }}
            aria-label={menuPages[i].label}
          />
        ))}
      </div>
    </div>
  );
}
