import { create } from "zustand";

type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type CartStore = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
}));