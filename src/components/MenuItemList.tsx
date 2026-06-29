"use client";

import { useState, useMemo } from "react";
import { MenuItem, getItemsByCategory } from "@/lib/menuItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MenuFilters, { FilterOptions } from "./MenuFilters";

interface MenuItemListProps {
  category: string;
}

// Fuzzy search function - scores based on character proximity
function fuzzySearch(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  if (!q) return 1; // No query = perfect match
  if (t.includes(q)) return 100; // Exact substring match = highest score

  let score = 0;
  let queryIndex = 0;
  let lastMatchPos = -1;

  for (let i = 0; i < t.length && queryIndex < q.length; i++) {
    if (t[i] === q[queryIndex]) {
      // Character matches - score is higher for consecutive matches
      const gap = i - lastMatchPos;
      score += Math.max(0, 10 - gap * 0.5); // Penalize gaps
      lastMatchPos = i;
      queryIndex++;
    }
  }

  // Only return score if all characters matched
  return queryIndex === q.length ? score : 0;
}

function NutritionBadges({ nutrition }: { nutrition?: MenuItem["nutrition"] }) {
  if (!nutrition) return null;

  const roundValue = (val: number) => Math.round(val);

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {nutrition.calories && (
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-6 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-green-600">{roundValue(nutrition.calories)}</span>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">cal</span>
        </div>
      )}
      {nutrition.carbs && (
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-6 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-sky-600">{roundValue(nutrition.carbs)}</span>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">c</span>
        </div>
      )}
      {nutrition.fat && (
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-6 rounded-full bg-indigo-100 border border-indigo-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-indigo-600">{roundValue(nutrition.fat)}</span>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">f</span>
        </div>
      )}
      {nutrition.protein && (
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-6 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-purple-600">{roundValue(nutrition.protein)}</span>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">p</span>
        </div>
      )}
    </div>
  );
}

export default function MenuItemList({ category }: MenuItemListProps) {
  const allItems = getItemsByCategory(category as any);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    tags: [],
    priceRange: [0, 1000],
  });

  // Get all unique tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    allItems.forEach((item) => {
      item.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    return allItems
      .map((item) => {
        // Calculate fuzzy search score
        let searchScore = 0;
        if (filters.search) {
          const nameScore = fuzzySearch(filters.search, item.name);
          const descScore = fuzzySearch(filters.search, item.description || "");
          searchScore = Math.max(nameScore, descScore);
        }

        return { item, searchScore };
      })
      .filter(({ item, searchScore }) => {
        // Search filter
        if (filters.search && searchScore === 0) return false;

        // Price filter
        if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
          return false;
        }

        // Tags filter
        if (filters.tags.length > 0) {
          const hasMatchingTag = filters.tags.some((tag) =>
            item.tags?.includes(tag)
          );
          if (!hasMatchingTag) return false;
        }

        return true;
      })
      .sort((a, b) => b.searchScore - a.searchScore) // Sort by relevance
      .map(({ item }) => item);
  }, [allItems, filters]);

  if (filteredItems.length === 0) {
    return (
      <div className="p-4 h-full flex flex-col">
        <div className="mb-4">
          <MenuFilters onFilterChange={setFilters} availableTags={availableTags} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">No items match your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col bg-card">
      <div className="mb-4 flex-shrink-0 sticky top-0 z-40 -mx-4 px-4 py-2 bg-card border-b border-border">
        <MenuFilters onFilterChange={setFilters} availableTags={availableTags} />
      </div>
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-2">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow hover:bg-muted/50">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  {item.description && (
                    <CardDescription className="mt-1 text-xs line-clamp-2">
                      {item.description}
                    </CardDescription>
                  )}
                </div>
                <div className="text-base font-bold text-primary whitespace-nowrap flex-shrink-0">
                  {item.price} EGP
                </div>
              </div>
            </CardHeader>
            {(item.nutrition || item.tags) && (
              <CardContent className="space-y-2">
                {item.nutrition && <NutritionBadges nutrition={item.nutrition} />}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
