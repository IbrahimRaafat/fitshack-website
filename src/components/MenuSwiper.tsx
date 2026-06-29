"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { menuPages } from "@/lib/menuData";
import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface MenuSwiperProps {
  activeIndex?: number;
  onSlideChange?: (index: number) => void;
}

export default function MenuSwiper({
  activeIndex: externalIndex = 0,
  onSlideChange,
}: MenuSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(externalIndex);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  const ZOOM_MIN = 1;
  const ZOOM_MAX = 3;
  const ZOOM_STEP = 0.05;

  function goTo(index: number) {
    swiperRef.current?.slideTo(index);
  }

  useEffect(() => {
    if (swiperRef.current && externalIndex !== activeIndex) {
      swiperRef.current.slideTo(externalIndex);
      setActiveIndex(externalIndex);
    }
  }, [externalIndex]);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Category tabs - hidden on lg+ where sidebar handles nav */}
      <div className="shrink-0 border-b border-border bg-card lg:hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-1 px-3 py-2 overflow-x-auto scrollbar-hide"
        >
          {menuPages.map((page, i) => (
            <button
              key={page.id}
              onClick={() => goTo(i)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all shrink-0",
                activeIndex === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Swipeable pages */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        <Swiper
          modules={[Keyboard]}
          keyboard={{ enabled: true }}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          onSlideChange={(s) => {
            setActiveIndex(s.activeIndex);
            onSlideChange?.(s.activeIndex);
          }}
          className="h-full !overflow-hidden"
        >
          {menuPages.map((page) => (
            <SwiperSlide key={page.id} className="!h-full !overflow-hidden">
              <div
                className="w-full h-full overflow-auto scrollbar-hide"
                style={{ touchAction: zoom > 1 ? "pan-x pan-y" : "manipulation" }}
              >
                <div
                  className="flex justify-center items-center min-h-full"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <Image
                    src={page.image}
                    alt={page.label}
                    width={800}
                    height={1200}
                    className="w-full max-w-sm md:max-w-xl lg:max-w-lg xl:max-w-xl h-auto object-contain rounded-xl shadow-md"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 40vw"
                    draggable={false}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Zoom controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-md p-1 z-10">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= ZOOM_MIN}
            className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-foreground" />
          </button>
          <span className="text-xs font-medium text-muted-foreground px-1 min-w-[2.5rem] text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= ZOOM_MAX}
            className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-foreground" />
          </button>
          {zoom > 1 && (
            <button
              onClick={handleZoomReset}
              className="p-1.5 rounded-md hover:bg-muted transition-colors ml-0.5 border-l border-border"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-4 h-4 text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="shrink-0 flex justify-center items-center gap-2 py-2 bg-card border-t border-border">
        {menuPages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "rounded-full transition-all duration-200",
              i === activeIndex
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={menuPages[i].label}
          />
        ))}
      </div>
    </div>
  );
}
