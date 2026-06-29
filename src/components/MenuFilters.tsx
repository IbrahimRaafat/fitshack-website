"use client";

import { Search } from "lucide-react";

export interface FilterOptions {
  search: string;
  tags: string[];
  calorieRange: [number, number];
}

interface MenuFiltersProps {
  onGlobalSearchOpen?: () => void;
}

export default function MenuFilters({ onGlobalSearchOpen }: MenuFiltersProps) {
  return (
    <button
      onClick={onGlobalSearchOpen}
      className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card hover:bg-muted transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground"
      style={{ fontSize: "16px" }}
    >
      <Search className="w-5 h-5 flex-shrink-0" />
      <span>Search entire menu...</span>
    </button>
  );
}
