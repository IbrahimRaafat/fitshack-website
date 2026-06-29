"use client";

import { MenuItem, getItemsByCategory } from "@/lib/menuItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface MenuItemListProps {
  category: string;
}

function NutritionBadges({ nutrition }: { nutrition?: MenuItem["nutrition"] }) {
  if (!nutrition) return null;

  const items = [];
  if (nutrition.calories) items.push(`${nutrition.calories} cal`);
  if (nutrition.protein) items.push(`${nutrition.protein}g protein`);
  if (nutrition.carbs) items.push(`${nutrition.carbs}g carbs`);
  if (nutrition.fat) items.push(`${nutrition.fat}g fat`);

  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Badge key={item} variant="secondary" className="text-xs">
          {item}
        </Badge>
      ))}
    </div>
  );
}

export default function MenuItemList({ category }: MenuItemListProps) {
  const items = getItemsByCategory(category as any);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No items in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3 overflow-y-auto h-full">
      {items.map((item) => (
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
  );
}
