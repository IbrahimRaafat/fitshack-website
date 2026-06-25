import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        {/* Hero */}
        <section className="relative bg-[var(--primary)] text-white px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            Fuel Your Hustle.
          </h1>
          <p className="text-lg md:text-xl text-red-100 max-w-xl mx-auto mb-8">
            Fresh, bold, nutritious food crafted for people who move fast and eat smart.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-white text-[var(--primary)] font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
          >
            See the Menu
          </Link>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-16 text-center">
          {[
            { icon: "🥗", title: "Always Fresh", body: "Ingredients sourced daily from local farms." },
            { icon: "⚡", title: "Fast & Fit", body: "Ready in minutes. Macro-balanced for your goals." },
            { icon: "🔥", title: "Bold Flavors", body: "Healthy never tasted this good. Period." },
          ].map((f) => (
            <div key={f.title} className="space-y-2">
              <div className="text-4xl">{f.icon}</div>
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.body}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
