import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/Product";

interface WishlistStore {
  items: Product[];
  _hydrated: boolean;
  _setHydrated: (value: boolean) => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
  isWishlisted: (id: number) => boolean;
  getWishlistCount: () => number;
  moveToCart: (id: number) => void; // برای منطق "Move to Bag"
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      _hydrated: false,
      _setHydrated: (value) => set({ _hydrated: value }),

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
          const exists = state.items.some((item) => item.id === product.id);
          return {
            items: exists
              ? state.items.filter((item) => item.id !== product.id)
              : [...state.items, product],
          };
        }),

      clearWishlist: () =>
        set({
          items: [],
        }),

      isWishlisted: (id: number) =>
        get().items.some((item) => item.id === id),

      getWishlistCount: () =>
        get().items.length,

    
      moveToCart: (id: number) => {
        const product = get().items.find((item) => item.id === id);
        if (product) {
          get().removeFromWishlist(id);
        }
      },
    }),
    {
      name: "exclusive-wishlist",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._setHydrated(true);
        }
      },
    }
  )
);

export default useWishlistStore;
