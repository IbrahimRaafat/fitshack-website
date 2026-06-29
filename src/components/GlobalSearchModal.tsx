"use client";

import { useState, useMemo } from "react";
import { X, Search } from "lucide-react";
import { MdFilterListAlt } from "react-icons/md";
import { menuItems } from "@/lib/menuItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RangeSlider from "./RangeSlider";
import { cn } from "@/lib/utils";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (categoryId: string) => void;
}

// Fuzzy search function
function fuzzySearch(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  if (!q) return 1;
  if (t.includes(q)) return 100;

  let score = 0;
  let queryIndex = 0;
  let lastMatchPos = -1;

  for (let i = 0; i < t.length && queryIndex < q.length; i++) {
    if (t[i] === q[queryIndex]) {
      const gap = i - lastMatchPos;
      score += Math.max(0, 10 - gap * 0.5);
      lastMatchPos = i;
      queryIndex++;
    }
  }

  return queryIndex === q.length ? score : 0;
}

export default function GlobalSearchModal({ isOpen, onClose, onSelectItem }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [calorieRange, setCalorieRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>(["keto", "vegan", "vegetarian"]);
    menuItems.forEach((item) => {
      item.tags?.forEach((tag) => {
        if (tag !== "omega-3") tags.add(tag);
      });
    });
    return Array.from(tags).sort();
  }, []);

  // Filter results from entire database
  const results = useMemo(() => {
    return menuItems
      .map((item) => {
        // Fuzzy search score
        let searchScore = 0;
        if (query.trim()) {
          const nameScore = fuzzySearch(query, item.name);
          const descScore = fuzzySearch(query, item.description || "");
          searchScore = Math.max(nameScore, descScore);
        }

        return { item, searchScore };
      })
      .filter(({ item, searchScore }) => {
        // Search filter
        if (query.trim() && searchScore === 0) return false;

        // Calorie filter
        if (item.nutrition?.calories) {
          if (
            item.nutrition.calories < calorieRange[0] ||
            item.nutrition.calories > calorieRange[1]
          ) {
            return false;
          }
        }

        // Tags filter
        if (selectedTags.length > 0) {
          const hasMatchingTag = selectedTags.some((tag) =>
            item.tags?.includes(tag)
          );
          if (!hasMatchingTag) return false;
        }

        return true;
      })
      .sort((a, b) => b.searchScore - a.searchScore)
      .map(({ item }) => item);
  }, [query, selectedTags, calorieRange]);

  const handleSelectItem = (categoryId: string) => {
    onSelectItem(categoryId);
    setQuery("");
    setSelectedTags([]);
    setCalorieRange([0, 1000]);
    onClose();
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const hasActiveFilters = query.trim() || selectedTags.length > 0 || calorieRange[0] > 0 || calorieRange[1] < 1000;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card rounded-lg shadow-xl border border-border max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="search"
              inputMode="search"
              autoFocus
              placeholder="Search entire menu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
              style={{ fontSize: "16px" }}
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-full justify-center",
              hasActiveFilters
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "bg-muted hover:bg-muted/80 text-foreground"
            )}
          >
            <MdFilterListAlt className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex-shrink-0 border-b border-border p-4 bg-muted/30 space-y-4">
            {/* Calorie Range */}
            <div>
              <RangeSlider
                min={0}
                max={1000}
                minVal={calorieRange[0]}
                maxVal={calorieRange[1]}
                onMinChange={(val) => setCalorieRange([val, calorieRange[1]])}
                onMaxChange={(val) => setCalorieRange([calorieRange[0], val])}
                label="Calories"
              />
            </div>

            {/* Tags */}
            <div>
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

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedTags([]);
                  setCalorieRange([0, 1000]);
                }}
                className="w-full px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg hover:bg-muted"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {!query.trim() && selectedTags.length === 0 && calorieRange[0] === 0 && calorieRange[1] === 1000 ? (
            <p className="text-center text-muted-foreground py-8">
              🔍 Search menu or use filters to find items
            </p>
          ) : results.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No results found
            </p>
          ) : (
            <div className="space-y-2">
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item.category)}
                  className="w-full text-left"
                >
                  <Card className="hover:shadow-md transition-all hover:border-primary/50 cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base">{item.name}</CardTitle>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="text-sm font-bold text-primary whitespace-nowrap flex-shrink-0">
                          {item.price} EGP
                        </div>
                      </div>
                    </CardHeader>
                    {item.tags && item.tags.length > 0 && (
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="flex-shrink-0 border-t border-border p-3 text-center text-xs text-muted-foreground">
            Found {results.length} result{results.length !== 1 ? "s" : ""} from entire menu
          </div>
        )}
      </div>
    </div>
  );
}
