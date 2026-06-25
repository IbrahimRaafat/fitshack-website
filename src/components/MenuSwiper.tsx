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

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Swipeable pages */}
      <div className="flex-1 min-h-0">
        <Swiper
          modules={[Keyboard]}
          keyboard={{ enabled: true }}
          onSwiper={(s) => { swiperRef.current = s; }}
          onSlideChange={(s) => setActiveIndex(s.activeIndex)}
          className="h-full"
        >
          {menuPages.map((page) => (
            <SwiperSlide key={page.id} className="h-full overflow-y-auto">
              <div className="flex justify-center p-2 md:p-4" style={{ background: "var(--bg)" }}>
                <Image
                  src={page.image}
                  alt={page.label}
                  width={800}
                  height={1200}
                  className="w-full max-w-lg h-auto rounded-lg shadow"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Dot indicators */}
      <div
        className="flex justify-center gap-1.5 py-2 shrink-0"
        style={{ background: "var(--green-dark)" }}
      >
        {menuPages.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideTo(i)}
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
