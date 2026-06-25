"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { menuCategories, type MenuCategory } from "@/lib/menuData";
import { useRef, useState } from "react";

function CategorySlide({ category }: { category: MenuCategory }) {
  return (
    <div className="h-full overflow-y-auto px-4 py-6 md:px-8">
      <h2 className="text-2xl font-black mb-6 text-gray-900">{category.label}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-12">
        {category.items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <span className="text-gray-300 text-sm select-none z-0">📷 Image coming soon</span>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover z-10"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <span className="text-[var(--primary)] font-bold shrink-0">{item.price}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              {item.calories && (
                <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {item.calories}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuSwiper() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Category tabs */}
      <div className="flex gap-1 px-4 pt-4 pb-2 border-b border-gray-100 overflow-x-auto shrink-0">
        {menuCategories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => goTo(i)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeIndex === i
                ? "bg-[var(--primary)] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Swipeable slides */}
      <div className="flex-1 min-h-0">
        <Swiper
          modules={[Pagination, Keyboard]}
          keyboard={{ enabled: true }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full"
        >
          {menuCategories.map((cat) => (
            <SwiperSlide key={cat.id} className="h-full overflow-hidden">
              <CategorySlide category={cat} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swipe hint */}
      <p className="text-center text-xs text-gray-400 py-2 shrink-0 select-none">
        Swipe left / right or tap a category
      </p>
    </div>
  );
}
