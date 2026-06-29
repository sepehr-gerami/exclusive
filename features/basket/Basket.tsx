"use client";

import { useCartStore } from "@/store/cartStore";
import  ShoppingCart  from "@/app/assets/Cart1.svg";
import Image from "next/image";
export default function Basket() {
  const items = useCartStore((state) => state.items);

  
  return (
    <button
      className="
        group relative
        px-4 py-2
        cursor-pointer
        text-black
        transition-all duration-200
      "
    >
      {/* Hover Background */}
      <span
        className="
          absolute inset-0 left-1/2
          -translate-x-1/2
          w-0 rounded-2xl bg-gray-100
          transition-all duration-200
          group-hover:w-full
        "
      />

      {/* Bottom Bar */}
      <span
        className="
          absolute bottom-0 left-1/2
          h-0.5 w-5
          -translate-x-1/2
          bg-black
          transition-all duration-300
          group-hover:w-9
        "
      />

      {/* Icon */}
      <span className="relative z-10 transition-all duration-200 group-hover:pl-2">
        <Image
          src={ShoppingCart}
          width={26}
          height={26}
          alt="ShoppingCart"
          className="transition-transform duration-200 group-hover:scale-110"
        />
      </span>

      {/* Badge */}
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {items.length}
        </span>
      )}
    </button>
  );
}

