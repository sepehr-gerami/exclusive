"use client";

import { Heart } from "lucide-react";
import { Product } from "@/types/Product";
import useWishlistStore from "@/store/useWishlistStore";

interface Props {
  product?: Product;
  size?: "sm" | "md" | "lg";
}

export default function WishlistButton({
  product,
  size = "md",
}: Props) {
  const items = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);
  const hydrated = useWishlistStore((state) => state._hydrated);

  if (!hydrated) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  const liked = product ? isWishlisted(product.id) : false;

  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 22,
  };

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
      className={`${sizeClasses[size]} rounded-full cursor-pointer flex items-center justify-center bg-white shadow hover:shadow-lg`}
    >
      <Heart
        size={iconSizes[size]}
        className={`transition ${
          liked ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
    </button>
  );
}