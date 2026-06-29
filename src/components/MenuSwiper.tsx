"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { menuPages } from "@/lib/menuData";
import MenuItemList from "./MenuItemList";
import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ZoomIn, ZoomOut, RotateCcw, List, Image as ImageIcon } from "lucide-react";

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
  const panContainerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [viewMode, setViewMode] = useState<"image" | "list">("list");

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
    setZoom((z) => {
      const next = Math.max(z - ZOOM_STEP, ZOOM_MIN);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const clampPan = useCallback((x: number, y: number, container: HTMLElement) => {
    const rect = container.getBoundingClientRect();
    const maxX = Math.max(0, (rect.width * zoom - rect.width) / 2);
    const maxY = Math.max(0, (rect.height * zoom - rect.height) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, [zoom]);

  useEffect(() => {
    if (zoom <= 1) {
      setPanOffset({ x: 0, y: 0 });
    }
  }, [zoom]);

  function handlePointerDown(e: React.PointerEvent) {
    if (zoom <= 1) return;
    panStartRef.current = { x: e.clientX, y: e.clientY, px: panOffset.x, py: panOffset.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!panStartRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    const container = panContainerRef.current;
    if (!container) return;
    const clamped = clampPan(panStartRef.current.px + dx, panStartRef.current.py + dy, container);
    setPanOffset(clamped);
  }

  function handlePointerUp() {
    panStartRef.current = null;
  }

  const isZoomed = zoom > 1;

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
          allowTouchMove={!isZoomed && viewMode === "image"}
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
              {viewMode === "image" ? (
                <div
                  ref={panContainerRef}
                  className={cn(
                    "w-full h-full overflow-hidden",
                    isZoomed && "cursor-grab active:cursor-grabbing"
                  )}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <div
                    className="flex justify-center items-center w-full h-full"
                    style={{
                      transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
                      transformOrigin: "center center",
                      transition: panStartRef.current ? "none" : "transform 0.2s ease",
                    }}
                  >
                    <Image
                      src={page.image}
                      alt={`FitShack ${page.label} menu — healthy food in Hurghada and Sahl Hashish`}
                      width={800}
                      height={1200}
                      className="w-full max-w-sm md:max-w-xl lg:max-w-lg xl:max-w-xl h-auto object-contain rounded-xl shadow-md"
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 40vw"
                      draggable={false}
                    />
                  </div>
                </div>
              ) : (
                <MenuItemList category={page.id} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View mode & zoom controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-md p-1 z-10">
          {/* View mode toggle */}
          <div className="flex items-center gap-0.5 border-r border-border pr-1">
            <button
              onClick={() => setViewMode("image")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewMode === "image"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
              aria-label="Image view"
              title="Image view"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
              aria-label="List view"
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom controls - only show in image mode */}
          {viewMode === "image" && (
            <>
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
              {isZoomed && (
                <button
                  onClick={handleZoomReset}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors ml-0.5 border-l border-border"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-4 h-4 text-foreground" />
                </button>
              )}
            </>
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
