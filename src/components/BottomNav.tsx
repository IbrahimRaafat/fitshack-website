"use client";

import { useState } from "react";
import { Heart, Phone, MapPin, MessageCircle, Home } from "lucide-react";

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
          className="hover:opacity-70 transition-opacity"
          aria-label="Instagram"
        >
          <Heart size={28} color={GREEN} fill={GREEN} />
        </a>

        {/* Phone */}
        <a
          href="tel:+201000000000"
          className="hover:opacity-70 transition-opacity"
          aria-label="Call"
        >
          <Phone size={28} color={GREEN} />
        </a>

        {/* Home - Center */}
        <a
          href="/"
          className="hover:opacity-70 transition-opacity"
          aria-label="Home"
        >
          <Home size={28} color={GREEN} />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/201000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="WhatsApp"
        >
          <MessageCircle size={28} color={GREEN} />
        </a>

        {/* Location */}
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="Location"
        >
          <MapPin size={28} color={GREEN} />
        </a>
      </nav>

      {/* Spacer for bottom nav on mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
