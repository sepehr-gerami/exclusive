"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function WishlistButton() {
  const items = useWishlistStore((state) => state.items);

  return (
    <Link
      href="/wishlist"
      className="
        group
        relative
        flex
        items-center
        justify-center
        px-3
        py-2
        cursor-pointer
        text-black
        transition-all
        duration-200
      "
    >
      {/* Hover Background */}
      <span className="absolute inset-0 left-1/2 -translate-x-1/2 w-0 rounded-2xl bg-gray-100 transition-all duration-200 group-hover:w-full" />
      <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 bg-black transition-all duration-300 group-hover:w-9" />

      {/* Cart Icon */}
      <span className="relative z-10 transition-all duration-200 group-hover:scale-110">
        <Heart color="#000" strokeWidth={1.5} />
      </span>

      {/* Badge */}
    
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {items.length}
        </span>
      )}
    </Link>
  );
}