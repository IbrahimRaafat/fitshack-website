"use client";

import { useState } from "react";
import { MenuItem, getItemsByCategory, getItemsByDrinkSubcategory, getDrinkSubcategories } from "@/lib/menuItems";
import { categoryNotes } from "@/lib/menuData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MenuFilters from "./MenuFilters";
import { cn } from "@/lib/utils";

interface MenuItemListProps {
  category: string;
  onGlobalSearchOpen?: () => void;
}

function NutritionBadges({ nutrition }: { nutrition?: MenuItem["nutrition"] }) {
  if (!nutrition) return null;

  const roundValue = (val: number) => Math.round(val);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {nutrition.calories && (
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-green-700">{roundValue(nutrition.calories)}</span>
          </div>
          <span className="text-xs font-medium text-foreground">Calories</span>
        </div>
      )}
      {nutrition.carbs && (
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-sky-700">{roundValue(nutrition.carbs)}</span>
          </div>
          <span className="text-xs font-medium text-foreground">Carbs</span>
        </div>
      )}
      {nutrition.fat && (
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-indigo-100 border border-indigo-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-indigo-700">{roundValue(nutrition.fat)}</span>
          </div>
          <span className="text-xs font-medium text-foreground">Fat</span>
        </div>
      )}
      {nutrition.protein && (
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-purple-700">{roundValue(nutrition.protein)}</span>
          </div>
          <span className="text-xs font-medium text-foreground">Protein</span>
        </div>
      )}
    </div>
  );
}

export default function MenuItemList({ category, onGlobalSearchOpen }: MenuItemListProps) {
  const isDrinksCategory = category === "coffee";
  const drinkSubcategories = getDrinkSubcategories();
  const [activeSubcategory, setActiveSubcategory] = useState<MenuItem["drinkSubcategory"]>(
    isDrinksCategory ? "hot-coffee" : undefined
  );

  const items = isDrinksCategory && activeSubcategory
    ? getItemsByDrinkSubcategory(activeSubcategory)
    : getItemsByCategory(category as any);

  if (items.length === 0 && !isDrinksCategory) {
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
      <div className="mb-4 flex-shrink-0 sticky top-0 z-40 -mx-4 px-4 py-2 bg-card border-b border-border space-y-3">
        {categoryNotes[category] && categoryNotes[category].length > 0 && (
          <div className="bg-green-100/50 border border-green-200 rounded-lg p-3 space-y-1.5">
            {categoryNotes[category].map((note, idx) => (
              <p key={idx} className="text-xs text-green-900 leading-relaxed">
                {note}
              </p>
            ))}
          </div>
        )}

        <MenuFilters onGlobalSearchOpen={onGlobalSearchOpen} />

        {isDrinksCategory && (
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {drinkSubcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all shrink-0",
                  activeSubcategory === sub.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 pr-4 pl-4 pb-4">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No items in this category.</p>
          </div>
        ) : (
          <>
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
                {(item.nutrition || item.tags) && item.tags && item.tags.length > 0 && (
                  <CardContent className="space-y-2">
                    {item.nutrition && <NutritionBadges nutrition={item.nutrition} />}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
