import Image from "next/image";
import MenuSwiper from "@/components/MenuSwiper";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header
        className="shrink-0 flex items-center justify-center py-2 md:py-4"
        style={{ background: "var(--bg)" }}
      >
        <Image
          src="/logo_no_white.png"
          alt="FitShack Logo"
          width={80}
          height={80}
          className="w-16 md:w-20 h-auto"
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
