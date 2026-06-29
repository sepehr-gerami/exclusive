"use client";


import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";

export default function Basket() {
  const items = useCartStore((state) => state.items);

  return (
    <button className="relative">
       <ShoppingCart className="w-6 h-6 hover:text-red-500 transition-colors" />

      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs">
          {items.length}
        </span>
      )}
    </button>
  );
}