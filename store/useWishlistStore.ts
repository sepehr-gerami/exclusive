import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/Product";

interface WishlistStore {
  items: Product[];
  hydrated: boolean;

  setHydrated: (value: boolean) => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,

      setHydrated: (value) => set({ hydrated: value }),

      addToWishlist: (product) =>
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) {
            return state;
          }

          return {
            items: [...state.items, product],
          };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.items.some(
            (item) => item.id === product.id
          );

          return {
            items: exists
              ? state.items.filter((item) => item.id !== product.id)
              : [...state.items, product],
          };
        }),

      clearWishlist: () => ({
        items: [],
      }),
    }),
    {
      name: "exclusive-wishlist",

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export default useWishlistStore;