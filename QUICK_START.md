# Quick Start: Menu Data Management

## 🎯 What Changed

Your menu now has **two display modes**:

### Image View (Default)
- Shows JPEG menu images
- Zoom (1x - 3x) and pan
- Keyboard navigation
- Original experience preserved

### List View (New)
- Shows items with prices
- Displays nutrition facts
- Mobile-friendly cards
- Searchable tags

**Toggle between views** with the button in the bottom-right corner (Image/List icons).

---

## 📋 Sample Data (18 items)

**Deli (3 items)**
- Classic Chicken Club - 45 EGP
- Turkey & Swiss - 50 EGP
- Tuna Classic - 48 EGP

**Hot (3 items)**
- Spicy Tuna Melt - 55 EGP
- Grilled Steak Sandwich - 60 EGP
- Chicken Panini - 52 EGP

**Vegan (3 items)**
- Buddha Bowl - 50 EGP
- Falafel Wrap - 45 EGP
- Veggie Power Bowl - 48 EGP

**Snacks (3 items)**
- Hummus & Veggie Platter - 30 EGP
- Energy Balls - 20 EGP
- Greek Yogurt & Berries - 25 EGP

**Desserts (3 items)**
- Protein Brownies - 25 EGP
- Acai Bowl - 35 EGP
- Protein Cheesecake - 30 EGP

**Coffee (3 items)**
- Protein Coffee - 35 EGP
- Green Smoothie - 28 EGP
- Matcha Latte - 32 EGP

---

## 🔄 Updating Menu Data

### Quick: Edit TypeScript
```bash
Edit: src/lib/menuItems.ts
```
Add/edit items directly in the array.

### Bulk: Use CSV
```bash
1. Edit: public/menu/menu-data.csv
2. Copy data into src/lib/menuItems.ts
3. Update using csvImport.ts utilities
```

### Export Current Menu
In a client component:
```typescript
import { downloadMenuCSV } from "@/lib/csvExport";
// Gets CSV: fitshack-menu-2026-06-29.csv
```

---

## 📊 Menu Item Structure

```typescript
{
  id: "deli-1",              // Unique ID
  category: "deli",          // deli|hot|vegan|snacks|desserts|coffee
  name: "...",               // Item name
  description: "...",        // Optional description
  price: 45,                 // Price in EGP
  currency: "EGP",           // Currency (always EGP)
  nutrition: {               // All optional
    calories: 450,
    protein: 35,             // grams
    carbs: 40,               // grams
    fat: 12,                 // grams
    fiber: undefined         // grams (optional)
  },
  tags: ["gluten-free-option"]  // Custom tags
}
```

---

## 🏷️ Common Tags

- `vegan` - Suitable for vegans
- `vegetarian` - Vegetarian friendly
- `high-protein` - High protein content
- `spicy` - Contains spice
- `gluten-free` - No gluten
- `dairy-free` - No dairy

Add your own as needed!

---

## 🔍 Using Menu Functions

```typescript
// Get items by category
import { getItemsByCategory } from "@/lib/menuItems";
const deliItems = getItemsByCategory("deli");

// Search menu
import { searchMenuItems } from "@/lib/menuItems";
const protein = searchMenuItems("protein");
const vegan = searchMenuItems("vegan");

// Export to CSV
import { downloadMenuCSV } from "@/lib/csvExport";
downloadMenuCSV(); // Downloads file

// Import from CSV
import { parseCSV, csvToMenuItems } from "@/lib/csvImport";
const items = csvToMenuItems(parseCSV(csvContent));
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `src/lib/menuItems.ts` | Menu data (18 items) |
| `src/lib/csvExport.ts` | Export menu to CSV |
| `src/lib/csvImport.ts` | Import from CSV |
| `src/components/MenuItemList.tsx` | List view display |
| `public/menu/menu-data.csv` | CSV template |
| `MENU_MANAGEMENT.md` | Full documentation |

---

## ✅ Next Steps

1. **Update prices** - Change 45, 50, etc to real prices
2. **Add nutrition** - Get from suppliers or calculate
3. **Customize tags** - Add allergen info, dietary restrictions
4. **Review list view** - Make sure items display correctly
5. **Test both views** - Toggle image ↔ list

---

## 🚀 Features Ready to Use

✅ Structured menu data with prices
✅ Nutrition facts per item
✅ Dual view modes (image & list)
✅ CSV import/export
✅ Search functionality
✅ Mobile responsive
✅ Fully typed TypeScript

---

## 💡 Pro Tips

- Keep IDs unique: `deli-1`, `hot-2`, etc
- Prices in EGP (Egyptian Pounds)
- Nutrition per serving
- Tags help with searchability
- CSV format: comma-separated, quotes for special chars
- Images still work - they're not replaced

---

## 📖 Full Documentation

See `MENU_MANAGEMENT.md` for:
- Complete CSV reference
- How to batch update items
- Adding new categories
- Search examples
- Import/export workflows

---

## 🆘 Troubleshooting

**Image view missing?**
- Check: `public/menu/*.jpeg` files exist
- They're still there, just toggled to list view

**Items not showing in list?**
- Check category matches: deli, hot, vegan, snacks, desserts, coffee
- Check ID is unique

**CSV import failed?**
- Ensure header row matches exactly
- Check for special characters (quotes, commas)
- Use csvImport.ts parseCSV() function

---

Built with: Next.js 16 + TypeScript + TailwindCSS
