"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOptions {
  search: string;
  tags: string[];
  priceRange: [number, number];
}

interface MenuFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableTags: string[];
}

export default function MenuFilters({ onFilterChange, availableTags }: MenuFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, tags: selectedTags, priceRange });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilterChange({ search, tags: newTags, priceRange });
  };

  const handlePriceChange = (value: number, index: 0 | 1) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
    onFilterChange({ search, tags: selectedTags, priceRange: newRange });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedTags([]);
    setPriceRange([0, 1000]);
    onFilterChange({ search: "", tags: [], priceRange: [0, 1000] });
  };

  const hasActiveFilters = search || selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
      >
        🔍 Filters
        {hasActiveFilters && (
          <span className="ml-1 w-2 h-2 bg-primary rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
          {/* Search */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-muted-foreground mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-2 py-1.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-muted-foreground mb-2">
              Price: {priceRange[0]} - {priceRange[1]} EGP
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                className="w-full"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-muted-foreground mb-2">
              Dietary & Options
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium transition-colors",
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded hover:bg-muted"
            >
              Clear Filters
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
