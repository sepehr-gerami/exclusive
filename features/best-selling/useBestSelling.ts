"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api/Product";
import { Product } from "@/types/Product";

export function useBestSelling() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const sorted = [...data]
          .filter((p): p is Product => !!p)
          .sort((a, b) => b.rating - a.rating);

        setProducts(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}