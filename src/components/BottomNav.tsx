"use client";

import { useState } from "react";
import { Heart, Phone, MapPin, Menu, X } from "lucide-react";

const GREEN = "#2c5f1a";

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
          className="hover:opacity-70 transition-opacity"
          aria-label="Instagram"
        >
          <Heart size={28} color={GREEN} />
        </a>

        <a
          href="tel:+201000000000"
          className="hover:opacity-70 transition-opacity"
          aria-label="Call"
        >
          <Phone size={28} color={GREEN} />
        </a>

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="Location"
        >
          <MapPin size={28} color={GREEN} />
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hover:opacity-70 transition-opacity"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={28} color={GREEN} />
          ) : (
            <Menu size={28} color={GREEN} />
          )}
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
          className="md:hidden fixed bottom-16 right-4 bg-white rounded-lg shadow-lg z-40 p-4 space-y-3 w-48"
          style={{ background: "var(--bg)", borderTop: "3px solid var(--green-mid)" }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded font-semibold text-sm flex items-center gap-2 transition-colors"
            style={{ color: GREEN }}
          >
            📋 View Menu
          </button>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 rounded font-semibold text-sm transition-colors"
            style={{ color: GREEN }}
          >
            <Share2 size={18} />
            Instagram
          </a>
          <a
            href="tel:+201000000000"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 rounded font-semibold text-sm transition-colors"
            style={{ color: GREEN }}
          >
            <Phone size={18} />
            Call Us
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 rounded font-semibold text-sm transition-colors"
            style={{ color: GREEN }}
          >
            <MapPin size={18} />
            Location
          </a>
        </div>
      )}

      {/* Spacer for bottom nav on mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
