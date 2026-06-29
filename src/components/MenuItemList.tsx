"use client";

import { useState, useMemo } from "react";
import { MenuItem, getItemsByCategory } from "@/lib/menuItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MenuFilters, { FilterOptions } from "./MenuFilters";

interface MenuItemListProps {
  category: string;
}

function NutritionBadges({ nutrition }: { nutrition?: MenuItem["nutrition"] }) {
  if (!nutrition) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {nutrition.calories && (
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
            <span className="text-xs font-bold text-green-700">{nutrition.calories}</span>
          </div>
          <span className="text-xs text-muted-foreground">cal</span>
        </div>
      )}
      {nutrition.carbs && (
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-cyan-100 border-2 border-cyan-500 flex items-center justify-center">
            <span className="text-xs font-bold text-cyan-700">{nutrition.carbs}</span>
          </div>
          <span className="text-xs text-muted-foreground">g carbs</span>
        </div>
      )}
      {nutrition.fat && (
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center">
            <span className="text-xs font-bold text-blue-700">{nutrition.fat}</span>
          </div>
          <span className="text-xs text-muted-foreground">g fat</span>
        </div>
      )}
      {nutrition.protein && (
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-purple-100 border-2 border-purple-600 flex items-center justify-center">
            <span className="text-xs font-bold text-purple-700">{nutrition.protein}</span>
          </div>
          <span className="text-xs text-muted-foreground">g protein</span>
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
    return allItems.filter((item) => {
      // Search filter
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

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
    });
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
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <MenuFilters onFilterChange={setFilters} availableTags={availableTags} />
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  {item.description && (
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                  )}
                </div>
                <div className="text-lg font-bold text-primary whitespace-nowrap">
                  {item.price} {item.currency}
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
