"use client";


import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Product } from "@/types/Product";
import WishlistButton from "@/components/product/WishlistButton";
import QuickViewModal from "@/components/ui/Modal/QuickViewModal";
import { useState } from "react";
import AddToCartButton from "@/components/product/AddToCartButton";
import { Trash2 } from "lucide-react";
import useWishlistStore from "@/store/useWishlistStore";

interface ProductCardProps {
  product: Product;
  showWishlistButton?: boolean;
  showRemoveButton?: boolean;
  showEyeButton?: boolean;
}

export default function ProductCard({
  product,
  showWishlistButton = true,
  showRemoveButton = false,
  showEyeButton = true }: ProductCardProps) {

  const originalPrice =
    product.discount > 0
      ? (product.price / (1 - product.discount / 100)).toFixed(0)
      : null;
  const [isOpen, setIsOpen] = useState(false);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist)
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex flex-col w-full rounded-lg bg-[#F5F5F5]
                 overflow-hidden hover:-translate-y-1 transition duration-300"
    >
      {/* ── NEW badge ── */}
      {product.isNew && (
        <span className="absolute top-3 left-3 z-10 bg-green-500 text-white
                         text-[11px] font-semibold px-2 py-0.5 rounded">
          NEW
        </span>
      )}

      {/* ── Action icons (heart + eye) ── */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        {showRemoveButton && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeFromWishlist(product.id);
            }}
            className="w-8 h-8 bg-white cursor-pointer rounded-full flex items-center justify-center
                 shadow hover:bg-red-500 hover:text-white  transition-transform active:scale-95"
          >
            <Trash2 size={14} />
          </button>
        )}
        {showWishlistButton &&
          <WishlistButton product={product} />}

        {showWishlistButton &&
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center
                  shadow hover:bg-red-500 hover:text-white transition"
          >
            {showEyeButton &&  <Eye size={14} />}
       
          </button>
        }
      </div>

      {isOpen && (
        <QuickViewModal
          product={product}
          onCloseAction={() => setIsOpen(false)}
        />
      )}

      {/* ── Image + Add to Cart hover ── */}

      <div className="relative w-[80%] aspect-square bg-[#F5F5F5] overflow-hidden flex items-center justify-center mx-auto">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          className="w-[80%] h-[80%] object-contain"
        />

        <AddToCartButton
          product={product}
          className="absolute bottom-0 left-0 right-0 py-2.5 bg-black text-white
               text-sm font-medium text-center cursor-pointer active:scale-95
               translate-y-full group-hover:translate-y-0
               transition-transform duration-300"
        >
          Add to Cart
        </AddToCartButton>
      </div>

      {/* ── Info ── */}
      <div className="p-3 flex flex-col gap-1">
        {/* Title */}
        <h3 className="text-sm font-medium truncate">{product.title}</h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-semibold text-sm">
            ${product.price}
          </span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-xs">
              ${originalPrice}
            </span>
          )}
        </div>

        {/* Stars + review count */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < Math.round(product.rating)
                  ? "text-yellow-400 text-xs"
                  : "text-gray-300 text-xs"
              }
            >
              ★
            </span>
          ))}
          <span className="text-gray-400 text-xs ml-1">
            ({product.reviewCount})
          </span>
        </div>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="flex gap-1.5 mt-1.5">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={(e) => e.preventDefault()}
                title={color}
                className="w-5 h-5 rounded-full border-2 border-white
                           shadow hover:scale-125 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}