export type DishCategory = "starters" | "mains" | "breads" | "desserts";

export type Dish = {
  id: string;
  name: string;
  description: string;
  /** IDR, integer, tanpa format. Format saat render lewat formatPrice(). */
  price: number;
  category: DishCategory;
  /** Tampil di section "signature dishes" di home dan badge di menu. */
  signature?: boolean;
};

export const menu: readonly Dish[] = [
  {
    id: "chicken-manchurian",
    name: "Chicken Manchurian",
    description: "Crisp chicken balls, onion, capsicum, in a tangy Chinese sauce",
    price: 89_000,
    category: "mains",
    signature: true,
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    description: "Tandoori chicken simmered in tomato, cream, and fenugreek",
    price: 105_000,
    category: "mains",
    signature: true,
  },
  {
    id: "paneer-tikka-masala",
    name: "Paneer Tikka Masala",
    description: "Charred cottage cheese, cashew-tomato gravy, dried fenugreek",
    price: 95_000,
    category: "mains",
  },
  {
    id: "lamb-rogan-josh",
    name: "Lamb Rogan Josh",
    description: "Slow-braised lamb, Kashmiri chilli, yoghurt, whole spice",
    price: 125_000,
    category: "mains",
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    description: "Basmati layered with marinated chicken, saffron, fried onion",
    price: 98_000,
    category: "mains",
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    description: "Black lentils, slow-cooked overnight, finished with cream",
    price: 75_000,
    category: "mains",
  },
  {
    id: "garlic-naan",
    name: "Garlic Naan",
    description: "Hand-stretched dough, tandoor-baked, garlic butter",
    price: 35_000,
    category: "breads",
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    description: "Warm milk dumplings in cardamom-rose syrup",
    price: 45_000,
    category: "desserts",
  },
] as const;

export const categoryLabels: Record<DishCategory, string> = {
  starters: "Starters",
  mains: "Mains",
  breads: "Breads",
  desserts: "Desserts",
};

export const categoryOrder: readonly DishCategory[] = [
  "starters",
  "mains",
  "breads",
  "desserts",
];

/** 89000 -> "89K". Harga menu pendek, jadi sufiks K lebih ringkas. */
export function formatPrice(price: number): string {
  return `${Math.round(price / 1000)}K`;
}

export function dishesByCategory(category: DishCategory): readonly Dish[] {
  return menu.filter((dish) => dish.category === category);
}

export function signatureDishes(): readonly Dish[] {
  return menu.filter((dish) => dish.signature === true);
}
