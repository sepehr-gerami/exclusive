"use client";


import Image from "next/image";
import { Product } from "@/types/Product";
import { useCartStore } from "@/store/cartStore";
import { Eye } from "lucide-react";
import { useState } from "react";
import QuickViewModal from "@/components/ui/QuickViewModal";
import WishlistButton from "@/components/product/WishlistButton";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isOpen, setIsOpen] = useState(false);



  return (
    <div className="group  border border-gray-200 rounded-xl">
      <div className="relative bg-gray-100 rounded-md p-4 h-60 ">

        <span className="absolute top-3 left-3  bg-red-500 text-white text-xs px-2 py-1 rounded">
          -40%
        </span>
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <WishlistButton />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center
               shadow hover:bg-red-500 hover:text-white transition"
          >
            <Eye size={14} />
          </button>
        </div>

        {isOpen && (
          <QuickViewModal
            product={product}
            onClose={() => setIsOpen(false)} 
          />
        )}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
          {/* slides up on hover */}
          <button
            onClick={() => addToCart(product)}
            className="absolute bottom-0 left-0 cursor-pointer right-0 py-2.5 bg-black text-white
                               text-sm font-medium text-center
                               translate-y-full group-hover:translate-y-0
                               transition-transform duration-300"
          >
            Add to Cart
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

      </div>
    </div>
  );
};