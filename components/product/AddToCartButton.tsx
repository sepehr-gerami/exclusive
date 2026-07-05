"use client";

import { ReactNode } from "react";
import { Product } from "@/types/Product";
import { useAddToCart } from "@/store/useCart";
import useAlert from "@/components/ui/alert/useAlert";

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
  const { showAlert } = useAlert();

  const handleClick = () => {
    addToCart(product);

    showAlert({
      title: "Added to Cart",
      sub: product.title,
      type: "success",
    });
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