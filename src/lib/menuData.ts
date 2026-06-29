export interface MenuPage {
  id: string;
  label: string;
  image: string;
}

export const menuPages: MenuPage[] = [
  { id: "deli",    label: "Deli Sandwiches",  image: "/menu/deli-sandwiches.jpeg" },
  { id: "hot",     label: "Hot Sandwiches",   image: "/menu/hot-sandwiches.jpeg" },
  { id: "vegan",   label: "Vegan",            image: "/menu/vegan-menu.jpeg" },
  { id: "snacks",  label: "Snacks",           image: "/menu/snacks.jpeg" },
  { id: "desserts",label: "Desserts",         image: "/menu/desserts.jpeg" },
  { id: "coffee",  label: "Coffee & Drinks",  image: "/menu/coffee-drinks.jpeg" },
];

export const categoryNotes: Record<string, string[]> = {
  deli: [
    "All Sandwiches are served in Gluten-Free & Low-carb Bread, using pure local meat.",
    "Served with Healthy Sauir Kraut or Kimchi",
    "* All Prices are inclusive of 14% Taxes adding only 12%. Service Charge for Dine in",
  ],
  hot: [
    "All Sandwiches are served in Gluten-Free & Low-carb Bread.",
    "All Dishes are served with Healthy Sauir Kraut or Kimchi",
    "* All Prices are inclusive of 14% Taxes adding only 12%. Service Charge for Dine in",
  ],
  vegan: [
    "* All Prices are inclusive of 14% Taxes adding only 12%. Service Charge for Dine in",
  ],
  snacks: [
    "All Snacks are Gluten-free & Low-Carb",
    "* All Prices are inclusive of 14% Taxes adding only 12%. Service Charge for Dine in",
  ],
  desserts: [
    "* All Prices are inclusive of 14% Taxes adding only 12%. Service Charge for Dine in",
  ],
  coffee: [
    "* All Prices are inclusive of 14% Taxes adding only 12%. Service Charge for Dine in",
  ],
};
