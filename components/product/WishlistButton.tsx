"use client";

import { useState } from "react";
import { Product } from "@/types/Product";
import useWishlistStore from "@/store/useWishlistStore";

interface Props {
  product?: Product;
  initialLiked?: boolean;
}

export default function WishlistButton({ product, initialLiked = false }: Props) {
  const [burst, setBurst] = useState(false);

  const addToWishlist = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
  const isInWishlist = (product && useWishlistStore.getState().isInWishlist(product.id)) || false;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    setBurst(true);
    setTimeout(() => setBurst(false), 200);
    isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      style={{ WebkitTapHighlightColor: "transparent" }}
      className={`
        w-8 h-8 bg-white cursor-pointer rounded-full flex items-center justify-center shadow
        transition-transform duration-150  hover:bg-red-500 hover:text-white
        ${burst ? "scale-90" : "scale-100"}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
        stroke={isInWishlist ? "pink" : "currentColor"}
        fill={isInWishlist ? "pink" : "none"}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}