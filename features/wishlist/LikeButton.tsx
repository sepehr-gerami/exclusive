"use client";

import "./animations.css";

import { Heart } from "lucide-react";
import { Product } from "@/types/Product";
import { useWishlist } from "./useWishlist";

type Props = {
  product: Product;
};

export default function LikeButton({ product }: Props) {
  const { liked, toggleWishlist } = useWishlist(product);

  return (
    <div className="relative group/like">
      <button
        onClick={toggleWishlist}
        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105 active:scale-95"
      >
        <Heart
          className={`
            h-5 w-5 transition-all duration-300
            ${
              liked
                ? "fill-red-500 text-red-500 heart-animation"
                : "text-gray-700 group-hover:text-red-500"
            }
          `}
        />

        {liked && (
          <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-red-500 circle-animation" />
        )}
      </button>

      <div className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded bg-red-500 px-2 py-1 text-xs text-white group-hover:block">
        {liked ? "Remove" : "Wishlist"}

        <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-red-500" />
      </div>
    </div>
  );
}