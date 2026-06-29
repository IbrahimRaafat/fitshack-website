"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { menuItems } from "@/lib/menuItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  const results = useMemo(() => {
    if (!query.trim()) return [];

    return menuItems
      .map((item) => {
        const nameScore = fuzzySearch(query, item.name);
        const descScore = fuzzySearch(query, item.description || "");
        const searchScore = Math.max(nameScore, descScore);
        return { item, searchScore };
      })
      .filter(({ searchScore }) => searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore)
      .map(({ item }) => item)
      .slice(0, 20); // Limit to 20 results
  }, [query]);

  const handleSelectItem = (categoryId: string) => {
    onSelectItem(categoryId);
    setQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card rounded-lg shadow-xl border border-border max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border p-4">
          <div className="flex items-center gap-3">
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
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {query.trim() === "" ? (
            <p className="text-center text-muted-foreground py-8">
              Type to search menu...
            </p>
          ) : results.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No results found for "{query}"
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
            Found {results.length} result{results.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
