"use client";

import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function Wishlist() {
  const count = useWishlistStore((state) => state.getWishlistCount());
  const hydrated = useWishlistStore((state) => state._hydrated);

  return (
    <Link
      href="/wishlist"
      className="group relative flex items-center justify-center px-4 py-2 cursor-pointer text-black transition-all duration-200"
    >
      <span className="absolute inset-0 left-1/2 -translate-x-1/2 w-0 rounded-2xl bg-gray-100 transition-all duration-200 group-hover:w-full" />
      <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 bg-black transition-all duration-300 group-hover:w-9" />

      <span className="relative z-10 transition-all duration-200 group-hover:scale-110">
        <HeartIcon color="#000" strokeWidth={1.5} />
      </span>

      {/* Badge (SYNC with Zustand) */}
      {hydrated && count > 0 && (
        <span className="absolute ...">
          {count}
        </span>
      )}
    </Link>
  );
}