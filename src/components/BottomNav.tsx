"use client";

import {
  BrandInstagram,
  Phone,
  MapPin,
  BrandWhatsapp,
  Home,
} from "tabler-icons-react";

const GREEN = "#2c5f1a";

export default function BottomNav() {
  return (
    <>
      {/* Mobile-only bottom nav - 5 icons */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around py-3 shrink-0 border-t z-40"
        style={{ background: "var(--bg)", borderColor: "var(--green-mid)" }}
      >
        {/* Instagram */}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity p-2"
          aria-label="Instagram"
        >
          <BrandInstagram size={28} color={GREEN} stroke="2" />
        </a>

        {/* Phone */}
        <a
          href="tel:+201000000000"
          className="hover:opacity-70 transition-opacity p-2"
          aria-label="Call"
        >
          <Phone size={28} color={GREEN} stroke="2" />
        </a>

        {/* Home - Center */}
        <a
          href="/"
          className="hover:opacity-70 transition-opacity p-2"
          aria-label="Home"
        >
          <Home size={28} color={GREEN} stroke="2" />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/201000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity p-2"
          aria-label="WhatsApp"
        >
          <BrandWhatsapp size={28} color={GREEN} stroke="2" />
        </a>

        {/* Location */}
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity p-2"
          aria-label="Location"
        >
          <MapPin size={28} color={GREEN} stroke="2" />
        </a>
      </nav>

      {/* Spacer for bottom nav on mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
