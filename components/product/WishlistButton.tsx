"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Product } from "@/types/Product";
import useWishlistStore from "@/store/useWishlistStore";

interface Props {
  product?: Product;
  initialLiked?: boolean;
}

export default function WishlistButton({
  product,
  initialLiked = false,
}: Props) {
const items = useWishlistStore((state) => state.items);
const addToWishlist = useWishlistStore((state) => state.addToWishlist);
const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
const hydrated = useWishlistStore((state) => state.hydrated);

if (!hydrated) return null;
const liked = items.some((item) => item.id === product?.id);

function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  e.stopPropagation();

  if (!product) return;

  if (liked) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
}

  return (
    <button
      onClick={handleClick}
      className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow"
    >
      <Heart
        className={`h-5 w-5 transition-all duration-200 ${liked
            ? "fill-red-500 text-red-500"
            : "fill-none text-gray-500"
          }`}
      />
    </button>
  );
}