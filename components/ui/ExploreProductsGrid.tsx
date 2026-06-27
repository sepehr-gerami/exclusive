"use client";

// app/Components/ExploreProductsGrid.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/features/best-selling/ProductCard";
import { Product } from "@/types/Product";

const PAGE_SIZE = 8;

export default function ExploreProductsGrid({
  products,
}: {
  products: Product[];
}) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const visible = products.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <>
      {/* ── Section header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          {/* red label */}
          <div className="flex items-center gap-3 mb-2">
            <span className="w-4 h-8 bg-red-500 rounded-sm inline-block" />
            <span className="text-red-500 text-sm font-semibold">
              Our Products
            </span>
          </div>
          <h2 className="text-3xl font-bold">Explore Our Products</h2>
        </div>

        {/* arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white
                       disabled:opacity-30 disabled:cursor-not-allowed flex items-center
                       justify-center transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white
                       disabled:opacity-30 disabled:cursor-not-allowed flex items-center
                       justify-center transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ── View All button ── */}
      <div className="flex justify-center mt-12">
        <Link
          href="/product"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold
                     px-10 py-3 rounded-md transition"
        >
          View All Products
        </Link>
      </div>
    </>
  );
}