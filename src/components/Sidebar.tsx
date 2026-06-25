"use client";

import { menuPages } from "@/lib/menuData";

const GREEN = "#2c5f1a";

interface SidebarProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function Sidebar({ activeIndex, onSelect }: SidebarProps) {
  return (
    <aside
      className="hidden md:flex flex-col w-56 shrink-0 py-6 px-4 gap-2 border-r"
      style={{ background: "var(--bg)", borderColor: "var(--green-mid)" }}
    >
      <h2
        className="text-sm font-bold tracking-widest uppercase px-4 py-2 mb-2"
        style={{ color: GREEN }}
      >
        Menu
      </h2>
      {menuPages.map((page, index) => (
        <button
          key={page.id}
          onClick={() => onSelect(index)}
          className="w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-all"
          style={
            activeIndex === index
              ? {
                  background: GREEN,
                  color: "white",
                }
              : {
                  background: "transparent",
                  color: GREEN,
                }
          }
        >
          {page.label}
        </button>
      ))}
    </aside>
  );
}
