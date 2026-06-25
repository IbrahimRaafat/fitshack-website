import Navbar from "@/components/Navbar";

export const metadata = { title: "Contact — FitShack" };

export default function ContactPage() {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex-1 overflow-y-auto px-6 py-16 max-w-xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Get in Touch</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--primary)] text-white font-bold px-8 py-2.5 rounded-full hover:bg-[var(--primary-dark)] transition-colors"
          >
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
}
