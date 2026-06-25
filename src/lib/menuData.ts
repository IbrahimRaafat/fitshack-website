export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string; // path under /public/menu/
  calories?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "bowls",
    label: "Bowls",
    items: [
      {
        id: "bowl-1",
        name: "Power Bowl",
        description: "Grilled chicken, quinoa, roasted veggies, and tahini drizzle.",
        price: "$14.99",
        calories: "520 kcal",
        image: "/menu/bowl-power.jpg",
      },
      {
        id: "bowl-2",
        name: "Green Goddess Bowl",
        description: "Falafel, hummus, cucumber, tomato, and green goddess dressing.",
        price: "$13.99",
        calories: "480 kcal",
        image: "/menu/bowl-green.jpg",
      },
      {
        id: "bowl-3",
        name: "Teriyaki Salmon Bowl",
        description: "Atlantic salmon, brown rice, edamame, pickled ginger.",
        price: "$16.99",
        calories: "610 kcal",
        image: "/menu/bowl-salmon.jpg",
      },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    items: [
      {
        id: "wrap-1",
        name: "Turkey Avocado Wrap",
        description: "Sliced turkey, avocado, romaine, tomato in a whole-wheat tortilla.",
        price: "$12.99",
        calories: "440 kcal",
        image: "/menu/wrap-turkey.jpg",
      },
      {
        id: "wrap-2",
        name: "Spicy Tuna Wrap",
        description: "Seared tuna, sriracha mayo, cabbage slaw, sesame seeds.",
        price: "$13.99",
        calories: "390 kcal",
        image: "/menu/wrap-tuna.jpg",
      },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    items: [
      {
        id: "salad-1",
        name: "Caesar Crunch",
        description: "Romaine, parmesan, croutons, house-made Caesar dressing.",
        price: "$11.99",
        calories: "350 kcal",
        image: "/menu/salad-caesar.jpg",
      },
      {
        id: "salad-2",
        name: "Kale & Berry",
        description: "Kale, strawberries, blueberries, candied walnuts, balsamic.",
        price: "$12.99",
        calories: "310 kcal",
        image: "/menu/salad-kale.jpg",
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    items: [
      {
        id: "drink-1",
        name: "Green Detox Smoothie",
        description: "Spinach, banana, mango, almond milk, chia seeds.",
        price: "$7.99",
        calories: "220 kcal",
        image: "/menu/drink-green.jpg",
      },
      {
        id: "drink-2",
        name: "Protein Shake",
        description: "Vanilla whey, oat milk, peanut butter, banana.",
        price: "$8.99",
        calories: "380 kcal",
        image: "/menu/drink-protein.jpg",
      },
    ],
  },
];
