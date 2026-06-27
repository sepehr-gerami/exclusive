import { create } from "zustand";
import { Product } from "@/types/Product";

type WishlistStore = {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
};

export const useWishlistStore = create<WishlistStore>((set) => ({
  items: [],

  addToWishlist: (product) =>
    set((state) => ({
      items: state.items.some((item) => item.id === product.id)
        ? state.items
        : [...state.items, product],
    })),

  removeFromWishlist: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));