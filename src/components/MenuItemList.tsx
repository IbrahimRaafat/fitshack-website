"use client";

import { MenuItem, getItemsByCategory } from "@/lib/menuItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MenuFilters from "./MenuFilters";

interface MenuItemListProps {
  category: string;
  onGlobalSearchOpen?: () => void;
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

export default function MenuItemList({ category, onGlobalSearchOpen }: MenuItemListProps) {
  const items = getItemsByCategory(category as any);

  if (items.length === 0) {
    return (
      <div className="p-4 h-full flex flex-col">
        <div className="mb-4">
          <MenuFilters onGlobalSearchOpen={onGlobalSearchOpen} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">No items in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col bg-card">
      <div className="mb-4 flex-shrink-0 sticky top-0 z-40 -mx-4 px-4 py-2 bg-card border-b border-border">
        <MenuFilters onGlobalSearchOpen={onGlobalSearchOpen} />
      </div>
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-2">
        {items.map((item) => (
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
