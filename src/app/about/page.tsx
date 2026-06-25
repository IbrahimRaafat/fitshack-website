import Navbar from "@/components/Navbar";

export const metadata = { title: "About — FitShack" };

export default function AboutPage() {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex-1 overflow-y-auto px-6 py-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-black mb-4">Our Story</h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          FitShack was born from a simple idea: healthy food should taste incredible. We are a
          team of athletes, nutritionists, and food obsessives who refused to choose between
          performance and flavor.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Every bowl, wrap, and smoothie on our menu is built to fuel your day — with clean
          ingredients, bold spices, and zero compromise.
        </p>
      </main>
    </div>
  );
}
