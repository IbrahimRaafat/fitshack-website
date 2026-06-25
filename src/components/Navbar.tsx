"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-50">
      <Link href="/" className="text-2xl font-black tracking-tight text-[var(--primary)]">
        FitShack
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-semibold text-gray-700 hover:text-[var(--primary)] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-4 text-sm font-semibold text-gray-700 hover:text-[var(--primary)] hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
