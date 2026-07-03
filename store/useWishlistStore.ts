import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/Product";

type WishlistStore = {
	items: Product[];
	addToWishlist: (product: Product) => void;
	removeFromWishlist: (id: number) => void;
	toggleWishlist: (product: Product) => void;
	clearWishlist: () => void;
	isInWishlist: (id: number) => boolean;
};

export const useWishlistStore = create<WishlistStore>()(
	persist(
		(set, get) => ({
			items: [],

			addToWishlist: (product) =>
				set((state) => ({ items: [...state.items.filter((i) => i.id !== product.id), product] })),

			removeFromWishlist: (id) =>
				set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

			toggleWishlist: (product) => {
				const exists = get().items.some((i) => i.id === product.id);
				if (exists) get().removeFromWishlist(product.id);
				else get().addToWishlist(product);
			},

			clearWishlist: () => set({ items: [] }),

			isInWishlist: (id) => get().items.some((i) => i.id === id),
		}),
		{
			name: "exclusive-wishlist",
		}
	)
);

export default useWishlistStore;
