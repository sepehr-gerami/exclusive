"use client";


import { useCartStore } from "@/store/cartStore";

export default function Basket() {
  const items = useCartStore((state) => state.items);

  return (
    <button className="relative">
      <i className="bi bi-cart3 w-8 h-8"></i>

      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs">
          {items.length}
        </span>
      )}
    </button>
  );
}