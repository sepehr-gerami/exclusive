"use client";

import { Product } from "@/types/Product";
import { useWishlistStore } from "@/store/useWishlistStore";

export function useWishlist(product: Product) {
  const { items, addToWishlist, removeFromWishlist } = useWishlistStore();

  const liked = items.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return {
    liked,
    toggleWishlist,
  };
}