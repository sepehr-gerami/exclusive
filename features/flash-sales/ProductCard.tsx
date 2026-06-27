"use client";


import Image from "next/image";
import { Product } from "@/types/Product";
import { useCartStore } from "@/store/cartStore";
import { Eye } from "lucide-react";
import { useState } from "react";
import QuickViewModal from "@/components/ui/QuickViewModal";
import LikeButton from "../wishlist/LikeButton";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isOpen, setIsOpen] = useState(false);



  return (
    <div className="group cursor-grab  border border-gray-200 rounded-xl">
      <div className="relative bg-gray-100 rounded-md p-4 h-60 ">

        <span className="absolute top-3 left-3  bg-red-500 text-white text-xs px-2 py-1 rounded">
          -40%
        </span>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Wishlist */}
  <LikeButton product={product} />

          {/* Quick View */}
          <button
            onClick={() => setIsOpen(true)}
            className="
w-8
h-8
bg-white
rounded-full
flex
items-center
justify-center
shadow
hover:scale-110
transition
cursor-pointer
"
          >
            <Eye size={18} />
          </button>

        </div>
        <div  className="relative h-full overflow-hidden rounded-md">

          <Image
            src={product.thumbnail}
            alt={product.title}
            width={160}
            height={160}
            className="mx-auto h-36 w-auto object-contain "
          />
        </div>

        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 rounded-md 
opacity-0 translate-y-4 transition-all duration-300 
group-hover:opacity-100 group-hover:translate-y-0"
        >
          Add To Cart
        </button>
      </div>

      <h3 className="mt-4 text-sm font-medium p-1 line-clamp-1">
        {product.title}
      </h3>

      <div className="mt-2 p-1 flex gap-3">
        <span className="text-red-500 font-semibold">
          ${product.price}
        </span>

        <span className="text-gray-400 line-through">
          ${(product.price * 1.4).toFixed(0)}
        </span>
      </div>

      <div className="mt-2 p-1 text-yellow-500">
        ★★★★★
      </div>
      {isOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}