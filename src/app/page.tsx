import MenuSwiper from "@/components/MenuSwiper";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header
        className="shrink-0 flex items-center justify-center py-2 md:py-3"
        style={{ background: "var(--green-dark)" }}
      >
        <div className="text-center">
          <p className="text-white text-[10px] md:text-xs tracking-widest uppercase opacity-80">By Healthy Food Hub</p>
          <h1 className="text-white text-xl md:text-2xl font-black tracking-tight leading-none">FitShack</h1>
        </div>
      </header>

      {/* Menu */}
      <MenuSwiper />
    </div>
  );
}
