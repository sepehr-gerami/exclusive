"use client";

import { Heart } from "lucide-react";
import { Product } from "@/types/Product";
import useWishlistStore from "@/store/useWishlistStore";
import useAlert from "@/components/ui/alert/useAlert";

interface Props {
  product?: Product;
  size?: "sm" | "md" | "lg";
}

export default function WishlistButton({
  product,
  size = "md",
}: Props) {
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);
  const hydrated = useWishlistStore((state) => state._hydrated);
  const { showAlert } = useAlert();
  

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

    showAlert({
      title: "Removed from Wishlist",
      sub: product.title,
      type: "error",
    });
  } else {
    addToWishlist(product);

    showAlert({
      title: "Added to Wishlist",
      sub: product.title,
      type: "success",
    });
  }
}
  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full   transition-transform active:scale-95 cursor-pointer flex items-center justify-center bg-white shadow hover:shadow-lg`}
    >
      <Heart
        size={iconSizes[size]}
        className={`  ${liked ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
      />
    </button>
  );
}

