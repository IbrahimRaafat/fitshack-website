import Navbar from "@/components/Navbar";
import MenuSwiper from "@/components/MenuSwiper";

export const metadata = { title: "Menu — FitShack" };

export default function MenuPage() {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <MenuSwiper />
    </div>
  );
}
