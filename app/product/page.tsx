// app/product/page.tsx

import { Suspense } from "react";
import { getProducts } from "@/lib/api/Product";
import ProductCard from "@/features/best-selling/ProductCard";
import Link from "next/link";
import EmptyWithLoader from "@/components/ui/Emptywithloader";
import ProductSkeleton from "@/features/best-selling/ProductSkeleton";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

// ─── Data-fetching sub-component ──────────────────────────────────────────
async function ProductGrid({ category }: { category?: string }) {
  const products = await getProducts();

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  if (filtered.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">
          No products found
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function ProductPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const isSpecial = category === "camera" || category === "gaming";

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">{category ?? "All Products"}</h1>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-red-500 transition">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">{category ?? "Product"}</span>
      </div>

      {isSpecial ? (
        <EmptyWithLoader />
      ) : (
        <Suspense fallback={<ProductSkeleton />}>
          <ProductGrid category={category} />
        </Suspense>
      )}
    </section>
  );
}