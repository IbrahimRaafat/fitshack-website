"use client";

import { useState } from "react";

export default function BottomNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile-only bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around py-3 shrink-0 border-t z-40"
        style={{ background: "var(--bg)", borderColor: "var(--green-mid)" }}
      >
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:opacity-70 transition-opacity"
          aria-label="Instagram"
        >
          📱
        </a>

        <a
          href="tel:+201000000000"
          className="text-2xl hover:opacity-70 transition-opacity"
          aria-label="Call"
        >
          ☎️
        </a>

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:opacity-70 transition-opacity"
          aria-label="Location"
        >
          📍
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl hover:opacity-70 transition-opacity"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {menuOpen && (
        <div
          className="md:hidden fixed bottom-16 right-4 bg-white rounded-lg shadow-lg z-40 p-4 space-y-3 w-40"
          style={{ background: "var(--bg)", borderTop: "3px solid var(--green-mid)" }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded font-semibold text-sm"
            style={{ color: "var(--green-dark)" }}
          >
            📋 View Menu
          </button>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded font-semibold text-sm"
            style={{ color: "var(--green-dark)" }}
          >
            📸 Instagram
          </a>
          <a
            href="tel:+201000000000"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded font-semibold text-sm"
            style={{ color: "var(--green-dark)" }}
          >
            📞 Call Us
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded font-semibold text-sm"
            style={{ color: "var(--green-dark)" }}
          >
            🗺️ Location
          </a>
        </div>
      )}

      {/* Spacer for bottom nav on mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
