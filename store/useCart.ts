// store/useCartStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/Product";

export type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  hydrated: boolean;

  setHydrated: (value: boolean) => void;

  addToCart: (product: Product) => void;
  removeFromCart: (id: Product["id"]) => void;

  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;

  clearCart: () => void;

  isInCart: (id: Product["id"]) => boolean;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,

      setHydrated: (value) => set({ hydrated: value }),

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.id === product.id
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: 1,
              },
            ],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () =>
        set({
          items: [],
        }),

      isInCart: (id) =>
        get().items.some((item) => item.id === id),
    }),
    {
      name: "exclusive-cart",

      partialize: (state) => ({
        items: state.items,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

/* -------------------- */
/* Selectors */
/* -------------------- */

export const useCartItems = () =>
  useCartStore((state) => state.items);

export const useCartHydrated = () =>
  useCartStore((state) => state.hydrated);

export const useCartCount = () =>
  useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

export const useAddToCart = () =>
  useCartStore((state) => state.addToCart);

export const useRemoveFromCart = () =>
  useCartStore((state) => state.removeFromCart);

export const useIncreaseQuantity = () =>
  useCartStore((state) => state.increaseQuantity);

export const useDecreaseQuantity = () =>
  useCartStore((state) => state.decreaseQuantity);

export const useClearCart = () =>
  useCartStore((state) => state.clearCart);

export const useIsInCart = () =>
  useCartStore((state) => state.isInCart);