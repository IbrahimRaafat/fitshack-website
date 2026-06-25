import Image from "next/image";
import MenuSwiper from "@/components/MenuSwiper";
import BottomNav from "@/components/BottomNav";

export default function Home() {
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

      {/* Menu */}
      <MenuSwiper />

      {/* Bottom Nav (mobile only) */}
      <BottomNav />
    </div>
  );
}
