// app/product/page.tsx

import { Suspense } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import Link from "next/link";
import EmptyWithLoader from "@/components/ui/Emptywithloader";
import ProductSkeleton from "@/features/best-selling/ProductSkeleton";

type Props = {
  searchParams: Promise<{ category?: string }>;
};


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