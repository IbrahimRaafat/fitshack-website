"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { MdFilterListAlt } from "react-icons/md";
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
    <div className="flex items-center gap-2">
      {/* Search Bar */}
      <input
        type="search"
        inputMode="search"
        placeholder="Search menu..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-card"
        style={{ fontSize: "16px" }}
      />

      {/* Filter Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2 rounded-lg transition-colors flex items-center gap-2",
            hasActiveFilters
              ? "bg-primary/10 text-primary hover:bg-primary/20"
              : "bg-muted hover:bg-muted/80 text-foreground"
          )}
          title="Filter menu"
        >
          <MdFilterListAlt className="w-5 h-5" />
          {hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-muted-foreground mb-3">
                Price Range: {priceRange[0]} - {priceRange[1]} EGP
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
              <label className="block text-xs font-semibold text-muted-foreground mb-3">
                Dietary & Options
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
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
                className="w-full px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg hover:bg-muted"
              >
                Clear All Filters
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1 hover:bg-muted rounded transition-colors"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
