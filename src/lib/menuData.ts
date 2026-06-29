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

export const universalNote = "* All Prices are inclusive of 14% Taxes adding only 12%. Service Charge for Dine in";

export const categoryNotes: Record<string, string[]> = {
  deli: [
    "All Sandwiches are served in Gluten-Free & Low-carb Bread, using pure local meat.",
    "Served with Healthy Sauir Kraut or Kimchi",
  ],
  hot: [
    "All Sandwiches are served in Gluten-Free & Low-carb Bread, using pure local meat.",
    "Served with Healthy Sauir Kraut or Kimchi",
  ],
  vegan: [
    "All Sandwiches are served in Gluten-Free & Low-carb Bread.",
    "All Dishes are served with Healthy Sauir Kraut or Kimchi",
  ],
  snacks: [
    "All Snacks are Gluten-Free & Low-Carb",
  ],
  desserts: [
    "All desserts are Gluten-Free & Low-Carb",
  ],
  coffee: [],
};
