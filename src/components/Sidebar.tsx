"use client";

import { Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { menuPages } from "@/lib/menuData";
import { cn } from "@/lib/utils";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

interface SidebarProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function Sidebar({ activeIndex, onSelect }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center justify-center px-4 py-5 border-b border-border">
        <Image
          src="/logo_no_white.png"
          alt="FitShack Logo"
          width={120}
          height={120}
          className="w-32 h-auto"
          priority
        />
      </div>

      <div className="px-4 pt-4 pb-2">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground px-2">
          Menu
        </h2>
      </div>
      <nav className="flex-1 px-3 pb-4 overflow-y-auto">
        <ul className="flex flex-col gap-0.5">
          {menuPages.map((page, index) => (
            <li key={page.id}>
              <button
                onClick={() => onSelect(index)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeIndex === index
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {page.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social links */}
      <div className="px-3 pb-4 pt-2 border-t border-border">
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/fitshackhurghada/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61585252553201"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Facebook"
          >
            <FacebookIcon className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/201144335666"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>
          <a
            href="tel:+201144335666"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Call"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href="https://maps.app.goo.gl/cFqfE1vGxRCEiGhV6?g_st=iw"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Location"
          >
            <MapPin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </aside>
  );
}
