"use client";

import { Phone, MapPin, Home } from "lucide-react";
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

const navItems = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/fitshackhurghada/",
    icon: InstagramIcon,
    external: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61585252553201",
    icon: FacebookIcon,
    external: true,
  },
  {
    label: "Home",
    href: "/",
    icon: Home,
    external: false,
    center: true,
  },
  {
    label: "Call",
    href: "tel:+201144335666",
    icon: Phone,
    external: false,
  },
  {
    label: "Location",
    href: "https://maps.app.goo.gl/cFqfE1vGxRCEiGhV6?g_st=iw",
    icon: MapPin,
    external: true,
  },
];

export default function BottomNav() {
  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around py-2 shrink-0 border-t border-border bg-card z-40 safe-area-bottom">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={cn(
              "flex flex-col items-center gap-0.5 p-2 rounded-lg transition-colors",
              "text-muted-foreground hover:text-primary hover:bg-muted",
              item.center && "text-primary"
            )}
            aria-label={item.label}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Spacer for bottom nav on mobile */}
      <div className="lg:hidden h-16" />
    </>
  );
}
