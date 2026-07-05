"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import WishlistButton from "@/components/product/WishlistButton";
import AddToCartButton from "@/components/product/AddToCartButton";
import styles from "./modal.module.css";
type Props = {
  product: Product;
  onCloseAction: () => void;
};

export default function QuickViewModal({ product, onCloseAction }: Props) {
  const [active, setActive] = useState(false);
  const handleClose = () => {
    setActive(true);

    setTimeout(() => {
      onCloseAction();
    }, 200);
  };
  const originalPrice =
    product.discount > 0
      ? (product.price / (1 - product.discount / 100)).toFixed(2)
      : null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {

      if (e.key === "Escape") onCloseAction();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };

  }, [onCloseAction,]);

  return createPortal(
    <div
      onClick={onCloseAction}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg p-3 sm:p-6 overflow-y-auto ${styles.dropIn}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl sm:max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/30 bg-white/90 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,.25)] grid grid-cols-1 md:grid-cols-[1fr_1fr] my-auto"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-fullblur-3xl" />

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute right-3 sm:right-5 top-3 sm:top-5 z-20 flex h-10 sm:h-11 w-10 sm:w-11 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-lg transition-all duration-300 "
          style={{
            background:
              "radial-gradient(136.47% 136.47% at 0% 0%, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.2) 100%)",
          }}>

          <X size={18} className={`transition-transform ${active ? "rotate-100 text-red-500" : ""
            } duration-300 group-hover:rotate-90 group-active:rotate-90`} />
        </button>

        {/* LEFT — Image */}
        <div className="relative flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-red-50 p-4 sm:p-8 md:p-14 min-h-64 md:min-h-auto">
          <div className="absolute h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

          {product.discount > 0 && (
            <span className="absolute left-4 sm:left-8 top-4 sm:top-8 rounded-full bg-red-500 px-3 sm:px-4 py-1 sm:py-2 text-xs font-semibold text-white z-10">
              -{product.discount}%
            </span>
          )}

          <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={300}
            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,.18)] transition-all duration-500 hover:scale-105"
          />
        </div>

        {/* RIGHT — Info */}
        <div className="flex flex-col p-4 sm:p-6 md:p-10 overflow-y-auto max-h-96 md:max-h-[90vh]">

          {/* Brand */}
          <span className="text-red-500 font-semibold uppercase tracking-wider text-xs sm:text-sm">
            {product.brand}
          </span>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight mt-1">
            {product.title}
          </h2>

          {/* Rating & Stock */}
          <div className="flex items-center gap-3 mt-2 sm:mt-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="fill-yellow-400 text-yellow-400" size={16} />
              <span className="font-semibold text-sm">{product.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span
              className={`font-medium text-xs sm:text-sm ${product.stock > 0 ? "text-green-600" : "text-red-500"
                }`}
            >
              {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
            </span>
          </div>

          {/* Price */}
          <div className="mt-3 sm:mt-6 flex items-end gap-2 sm:gap-3">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-red-500">
              ${product.price}
            </span>
            {originalPrice && (
              <span className="text-sm sm:text-lg line-through text-gray-400 mb-1">
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-3 sm:mt-5 leading-6 text-gray-600 text-xs sm:text-sm line-clamp-3">
            {product.description}
          </p>

          <hr className="my-4 sm:my-6 border-gray-200" />

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-medium text-gray-700">Qty</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <AddToCartButton
              product={product}
              disabled={product.stock === 0}
              className="flex-1 w-full flex items-center cursor-pointer justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm transition"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </AddToCartButton>

            <div className="w-10 h-10">
              <WishlistButton product={product} />
            </div>
          </div>

          {/* Full page link */}
          <Link
            href={`/product/${product.id}`}
            onClick={onCloseAction}
            className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-400 hover:text-red-500 transition underline underline-offset-4"
          >
            View Full Details →
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}