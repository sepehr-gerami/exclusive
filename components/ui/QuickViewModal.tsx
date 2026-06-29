"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import WishlistButton from "@/components/product/WishlistButton";

type Props = {
  product: Product;
  onClose: () => void;
};

export default function QuickViewModal({ product, onClose }: Props) {
  const [qty, setQty] = useState(1);

  const originalPrice =
    product.discount > 0
      ? (product.price / (1 - product.discount / 100)).toFixed(2)
      : null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-lg p-6 animate-in fade-in duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/30 bg-white/90 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,.25)] grid lg:grid-cols-[1fr_1fr]"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-lg transition-all duration-300 hover:rotate-90 hover:bg-red-500 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* ── LEFT — Image ── */}
        <div className="relative flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-red-50 p-14">
          <div className="absolute h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

          {product.discount > 0 && (
            <span className="absolute left-8 top-8 rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white">
              -{product.discount}%
            </span>
          )}

          <Image
            src={product.thumbnail}
            alt={product.title}
            width={420}
            height={420}
            className="relative h-80 w-80 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,.18)] transition-all duration-500 hover:scale-105"
          />
        </div>

        {/* ── RIGHT — Info ── */}
        <div className="flex flex-col p-10 overflow-y-auto max-h-[90vh]">

          {/* Brand */}
          <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">
            {product.brand}
          </span>

          {/* Title */}
          <h2 className="text-3xl font-bold leading-tight tracking-tight mt-1">
            {product.title}
          </h2>

          {/* Rating & Stock */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span
              className={`font-medium text-sm ${
                product.stock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-end gap-3">
            <span className="text-5xl font-black text-red-500">
              ${product.price}
            </span>
            {originalPrice && (
              <span className="text-lg line-through text-gray-400 mb-1">
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-5 leading-7 text-gray-600 text-[15px] line-clamp-3">
            {product.description}
          </p>

          <hr className="my-6 border-gray-200" />

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Qty</span>
            {/* <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                
                className="px-4 py-2 text-lg hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="px-5 py-2 font-semibold text-sm border-x border-gray-200">
                {qty}
              </span>
              <button
                
                disabled={product.stock === 0}
                className="px-4 py-2 text-lg hover:bg-gray-100 transition disabled:opacity-40"
              >
                +
              </button>
            </div> */}
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              disabled={product.stock === 0}
              className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <WishlistButton />
          </div>

          {/* Full page link */}
          <Link
            href={`/product/${product.id}`}
            onClick={onClose}
            className="mt-4 text-center  text-sm text-gray-400 hover:text-red-500 transition underline underline-offset-4"
          >
            View Full Details →
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}