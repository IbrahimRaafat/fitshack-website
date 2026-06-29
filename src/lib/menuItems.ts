export interface MenuItem {
  id: string;
  category: "deli" | "hot" | "vegan" | "snacks" | "desserts" | "coffee";
  name: string;
  description?: string;
  price: number;
  currency: string;
  image?: string;
  nutrition?: {
    calories?: number;
    protein?: number; // grams
    carbs?: number; // grams
    fat?: number; // grams
    fiber?: number; // grams
  };
  tags?: string[]; // e.g., ["vegan", "gluten-free", "spicy"]
}

export const menuItems: MenuItem[] = [
  // Deli Sandwiches
  {
    id: "deli-1",
    category: "deli",
    name: "Classic Chicken Club",
    description: "Grilled chicken, lettuce, tomato, mayo",
    price: 45,
    currency: "EGP",
    nutrition: { calories: 450, protein: 35, carbs: 40, fat: 12 },
    tags: ["gluten-free-option"],
  },
  {
    id: "deli-2",
    category: "deli",
    name: "Turkey & Swiss",
    description: "Sliced turkey with swiss cheese and mustard",
    price: 50,
    currency: "EGP",
    nutrition: { calories: 480, protein: 38, carbs: 42, fat: 14 },
  },
  {
    id: "deli-3",
    category: "deli",
    name: "Tuna Classic",
    description: "Fresh tuna salad with crispy lettuce",
    price: 48,
    currency: "EGP",
    nutrition: { calories: 420, protein: 32, carbs: 38, fat: 16 },
  },

  // Hot Sandwiches
  {
    id: "hot-1",
    category: "hot",
    name: "Spicy Tuna Melt",
    description: "Tuna, cheese, jalapeños, toasted bread",
    price: 55,
    currency: "EGP",
    nutrition: { calories: 520, protein: 32, carbs: 45, fat: 18 },
    tags: ["spicy"],
  },
  {
    id: "hot-2",
    category: "hot",
    name: "Grilled Steak Sandwich",
    description: "Prime beef with caramelized onions",
    price: 60,
    currency: "EGP",
    nutrition: { calories: 580, protein: 40, carbs: 48, fat: 20 },
  },
  {
    id: "hot-3",
    category: "hot",
    name: "Chicken Panini",
    description: "Grilled chicken with pesto and mozzarella",
    price: 52,
    currency: "EGP",
    nutrition: { calories: 490, protein: 36, carbs: 44, fat: 16 },
  },

  // Vegan
  {
    id: "vegan-1",
    category: "vegan",
    name: "Buddha Bowl",
    description: "Quinoa, roasted veggies, tahini dressing",
    price: 50,
    currency: "EGP",
    nutrition: { calories: 380, protein: 12, carbs: 52, fat: 16, fiber: 8 },
    tags: ["vegan", "vegetarian"],
  },
  {
    id: "vegan-2",
    category: "vegan",
    name: "Falafel Wrap",
    description: "Crispy falafel with hummus and fresh veggies",
    price: 45,
    currency: "EGP",
    nutrition: { calories: 420, protein: 14, carbs: 58, fat: 14, fiber: 8 },
    tags: ["vegan", "vegetarian"],
  },
  {
    id: "vegan-3",
    category: "vegan",
    name: "Veggie Power Bowl",
    description: "Mixed greens, nuts, seeds and plant-based dressing",
    price: 48,
    currency: "EGP",
    nutrition: { calories: 360, protein: 11, carbs: 46, fat: 18, fiber: 10 },
    tags: ["vegan", "vegetarian"],
  },

  // Snacks
  {
    id: "snacks-1",
    category: "snacks",
    name: "Hummus & Veggie Platter",
    description: "Fresh veggies with creamy hummus",
    price: 30,
    currency: "EGP",
    nutrition: { calories: 180, protein: 6, carbs: 20, fat: 8, fiber: 4 },
    tags: ["vegan", "vegetarian"],
  },
  {
    id: "snacks-2",
    category: "snacks",
    name: "Energy Balls",
    description: "No-bake protein energy bites",
    price: 20,
    currency: "EGP",
    nutrition: { calories: 160, protein: 8, carbs: 18, fat: 6, fiber: 2 },
    tags: ["vegan", "vegetarian", "high-protein"],
  },
  {
    id: "snacks-3",
    category: "snacks",
    name: "Greek Yogurt & Berries",
    description: "Creamy yogurt with mixed fresh berries",
    price: 25,
    currency: "EGP",
    nutrition: { calories: 180, protein: 15, carbs: 22, fat: 3, fiber: 3 },
    tags: ["vegetarian", "high-protein"],
  },

  // Desserts
  {
    id: "desserts-1",
    category: "desserts",
    name: "Protein Brownies",
    description: "Fudgy brownies with added protein",
    price: 25,
    currency: "EGP",
    nutrition: { calories: 220, protein: 18, carbs: 24, fat: 6 },
    tags: ["high-protein"],
  },
  {
    id: "desserts-2",
    category: "desserts",
    name: "Acai Bowl",
    description: "Superfood acai with granola and berries",
    price: 35,
    currency: "EGP",
    nutrition: { calories: 280, protein: 8, carbs: 42, fat: 9, fiber: 6 },
    tags: ["vegan", "vegetarian"],
  },
  {
    id: "desserts-3",
    category: "desserts",
    name: "Protein Cheesecake",
    description: "Creamy cheesecake with whey protein",
    price: 30,
    currency: "EGP",
    nutrition: { calories: 240, protein: 20, carbs: 22, fat: 8 },
    tags: ["high-protein", "vegetarian"],
  },

  // Coffee & Drinks
  {
    id: "coffee-1",
    category: "coffee",
    name: "Protein Coffee",
    description: "Espresso with protein shake",
    price: 35,
    currency: "EGP",
    nutrition: { calories: 120, protein: 20, carbs: 5, fat: 1 },
    tags: ["high-protein"],
  },
  {
    id: "coffee-2",
    category: "coffee",
    name: "Green Smoothie",
    description: "Spinach, apple, banana and almond milk",
    price: 28,
    currency: "EGP",
    nutrition: { calories: 140, protein: 5, carbs: 28, fat: 3, fiber: 4 },
    tags: ["vegetarian", "vegan"],
  },
  {
    id: "coffee-3",
    category: "coffee",
    name: "Matcha Latte",
    description: "Traditional matcha with steamed milk",
    price: 32,
    currency: "EGP",
    nutrition: { calories: 160, protein: 4, carbs: 22, fat: 6 },
    tags: ["vegetarian"],
  },
];

export function getItemsByCategory(category: MenuItem["category"]): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function searchMenuItems(query: string): MenuItem[] {
  const q = query.toLowerCase();
  return menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(q))
  );
}
