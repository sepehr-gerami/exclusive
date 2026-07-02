import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id: number;
  title: string;
  price: number;
  image?: string;
};

type ShopState = {
  basket: (Product & { quantity: number })[];
  wishlist: Product[];

  // basket actions
  addToBasket: (product: Product) => void;
  removeFromBasket: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearBasket: () => void;

  // wishlist actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (product: Product) => void;
};

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      basket: [],
      wishlist: [],

      // ---------------- BASKET ----------------
      addToBasket: (product) => {
        const basket = get().basket;
        const existing = basket.find((p) => p.id === product.id);

        if (existing) {
          set({
            basket: basket.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          });
        } else {
          set({
            basket: [...basket, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromBasket: (id) =>
        set({
          basket: get().basket.filter((p) => p.id !== id),
        }),

      increaseQty: (id) =>
        set({
          basket: get().basket.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        }),

      decreaseQty: (id) =>
        set({
          basket: get().basket
            .map((p) =>
              p.id === id ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter((p) => p.quantity > 0),
        }),

      clearBasket: () => set({ basket: [] }),

      // ---------------- WISHLIST ----------------
      addToWishlist: (product) => {
        const exists = get().wishlist.find((p) => p.id === product.id);
        if (!exists) {
          set({ wishlist: [...get().wishlist, product] });
        }
      },

      removeFromWishlist: (id) =>
        set({
          wishlist: get().wishlist.filter((p) => p.id !== id),
        }),

      toggleWishlist: (product) => {
        const exists = get().wishlist.find((p) => p.id === product.id);
        if (exists) {
          set({
            wishlist: get().wishlist.filter((p) => p.id !== product.id),
          });
        } else {
          set({
            wishlist: [...get().wishlist, product],
          });
        }
      },
    }),
    {
      name: "shop-storage", // localStorage key
    }
  )
);