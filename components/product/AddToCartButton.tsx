"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/Product";
import { useCart } from "@/store/useCart";
import React from "react";

type Props = {
  product: Product;
  qty?: number;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function AddToCartButton({ product, qty = 1, className, children, disabled }: Props) {
  const addToCart = useCart((s) => s.addToCart);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) addToCart(product);
      }}
      disabled={disabled}
      className={className}
    >
      {children ?? (
        <>
          <ShoppingCart size={18} /> Add to Cart
        </>
      )}
    </button>
  );
}
