# Menu Management Guide

This guide explains how to manage the FitShack menu data including items, prices, and nutrition facts.

## Overview

The menu system has been upgraded to include:
- **Structured menu items** with prices and nutrition facts
- **Dual view modes**: Image-based and list-based display
- **CSV import/export** functionality
- **Easy data management** via spreadsheets

## File Structure

```
src/
├── lib/
│   ├── menuData.ts          # Category definitions
│   ├── menuItems.ts         # Menu items with prices & nutrition
│   ├── csvExport.ts         # Export data to CSV
│   └── csvImport.ts         # Import data from CSV
└── components/
    └── MenuItemList.tsx     # List view component
public/menu/
├── *.jpeg                   # Category images
└── menu-data.csv            # Sample CSV with all items
```

## Managing Menu Data

### Option 1: Edit TypeScript File (Quick Changes)

Edit `src/lib/menuItems.ts` directly:

```typescript
{
  id: "deli-1",
  category: "deli",
  name: "Classic Chicken Club",
  description: "Grilled chicken, lettuce, tomato, mayo",
  price: 45,
  currency: "EGP",
  nutrition: {
    calories: 450,
    protein: 35,      // grams
    carbs: 40,        // grams
    fat: 12,          // grams
    fiber: undefined, // optional
  },
  tags: ["gluten-free-option"],
}
```

### Option 2: Use CSV (Large Batch Changes)

1. **Edit the CSV file**: `public/menu/menu-data.csv`

2. **CSV Column Reference**:
   - `ID`: Unique identifier (e.g., "deli-1")
   - `Category`: One of: deli, hot, vegan, snacks, desserts, coffee
   - `Name`: Item name
   - `Description`: Short description (optional)
   - `Price (EGP)`: Price in Egyptian Pounds
   - `Calories`, `Protein (g)`, `Carbs (g)`, `Fat (g)`, `Fiber (g)`: Nutrition facts
   - `Tags`: Semicolon-separated tags (e.g., "vegan;vegetarian;high-protein")

3. **Import CSV into TypeScript**:
   ```typescript
   import { parseCSV, csvToMenuItems } from "@/lib/csvImport";
   
   const csvContent = await fetch("/menu/menu-data.csv").then(r => r.text());
   const rows = parseCSV(csvContent);
   const items = csvToMenuItems(rows);
   ```

4. **Update menuItems.ts** with the new items.

## Viewing the Menu

### Image View
- Displays the original JPEG menu images
- Supports zoom (1x - 3x) and pan
- Keyboard navigation with arrow keys

### List View
- Displays all items with:
  - Name and description
  - Price in EGP
  - Nutrition facts badges
  - Custom tags
- Scrollable within each category
- Mobile-friendly

**Toggle between views** using the button in the bottom-right corner.

## Exporting Data

### To Get Current Menu as CSV

```typescript
import { downloadMenuCSV } from "@/lib/csvExport";

// In a client component:
<button onClick={downloadMenuCSV}>Download Menu CSV</button>
```

This creates a file: `fitshack-menu-YYYY-MM-DD.csv`

## Adding New Items

1. Add entry to `src/lib/menuItems.ts`:
   ```typescript
   {
     id: "deli-4",  // Unique ID
     category: "deli",
     name: "New Sandwich",
     description: "Description here",
     price: 55,
     currency: "EGP",
     nutrition: {
       calories: 500,
       protein: 30,
       carbs: 45,
       fat: 15,
     },
     tags: ["tag1", "tag2"],
   }
   ```

2. The item appears automatically in:
   - List view (organized by category)
   - SEO content

## Adding Nutrition Facts

Supported nutrition fields:
- `calories`: Total calories
- `protein`: Grams of protein
- `carbs`: Grams of carbohydrates
- `fat`: Grams of fat
- `fiber`: Grams of dietary fiber

All fields are optional. Leave undefined if not known.

## Tags

Common tags for filtering/categorization:
- `vegan`
- `vegetarian`
- `gluten-free`
- `gluten-free-option`
- `high-protein`
- `spicy`
- `dairy-free`

Add custom tags as needed. They appear as badges in list view.

## Searching Menu Items

Use the search utility:

```typescript
import { searchMenuItems } from "@/lib/menuItems";

const results = searchMenuItems("protein");
// Returns all items with "protein" in name, description, or tags
```

## Getting Items by Category

```typescript
import { getItemsByCategory } from "@/lib/menuItems";

const deliItems = getItemsByCategory("deli");
const veganItems = getItemsByCategory("vegan");
```

## Categories

Six categories are supported:
- `deli` - Deli Sandwiches
- `hot` - Hot Sandwiches
- `vegan` - Vegan Menu
- `snacks` - Snacks
- `desserts` - Desserts
- `coffee` - Coffee & Drinks

## Next Steps

### Bulk Update from CSV
1. Get the CSV template: `public/menu/menu-data.csv`
2. Edit it in Excel/Google Sheets
3. Use `csvImport.ts` to parse it
4. Update `menuItems.ts` with new data

### Add Images to Items
Extend the `MenuItem` interface:
```typescript
export interface MenuItem {
  // ... existing fields
  image?: string; // URL to item image
}
```

### Implement Search UI
Create a search component:
```typescript
import { searchMenuItems } from "@/lib/menuItems";

export function MenuSearch() {
  const [query, setQuery] = useState("");
  const results = searchMenuItems(query);
  // Display results...
}
```

## Tips

- Keep IDs unique and lowercase with hyphens (e.g., "deli-1", "hot-2")
- Prices are in Egyptian Pounds (EGP)
- Nutrition values are per serving
- Tags help with filtering and SEO
- CSV files must have header row
- Empty nutrition fields are optional
