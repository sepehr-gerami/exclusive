"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { Product } from "@/types/Product";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
  product?: Product; // ✅ optional
}

export default function Wishlist({ product }: WishlistButtonProps) {
  const addToWishlist      = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  // ✅ اگر product نداشت، false برگردون
  const isInWishlist = useWishlistStore((state) =>
    product ? state.items.some((item) => item.id === product.id) : false
  );
  const totalItems = useWishlistStore((state) => state.items.length);

  const handleToggle = () => {
    if (!product) return; // ✅ guard — در Header کاری نکن
    isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className="group relative px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600"
    >
      {/* Hover Background */}
      <span className="
        absolute inset-0 left-1/2
        -translate-x-1/2
        w-0 rounded-2xl bg-gray-100
        transition-all duration-200
        group-hover:w-full
      "/>

      {/* Bottom Bar */}
      <span className="
        absolute bottom-0 left-1/2
        h-0.5 w-5
        -translate-x-1/2
        bg-black
        transition-all duration-300
        group-hover:w-9
      "/>

      {/* Icon — ✅ رنگ عوض می‌شه وقتی در wishlist باشه */}
      <span className="relative z-10 transition-all duration-200 group-hover:pl-2">
        <Heart size={48} color="#ff0000" strokeWidth={3} absoluteStrokeWidth 
          width={20}
          height={20}
          alt="Wishlist"
          className={`
            transition-all duration-200 
            group-hover:scale-110
            ${isInWishlist ? "opacity-100 filter-[invert(27%)_sepia(90%)_saturate(700%)_hue-rotate(330deg)]" : "opacity-70"}
          `}
        />
      </span>

      {/* Badge — ✅ تعداد کل wishlist */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}