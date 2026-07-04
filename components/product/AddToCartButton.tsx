"use client";

import { ReactNode } from "react";
import { Product } from "@/types/Product";
import { useAddToCart } from "@/store/useCart";

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function AddToCartButton({
  product,
  disabled = false,
  className = "",
  children = "Add to Cart",
}: AddToCartButtonProps) {
  const addToCart = useAddToCart();

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}