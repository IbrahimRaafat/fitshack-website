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
