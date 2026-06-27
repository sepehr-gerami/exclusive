// app/Components/ExploreProductsSection.tsx
import { Suspense } from "react";
import { getProducts } from "@/lib/api/Product";
import ExploreProductsGrid from "./ExploreProductsGrid";
import ProductSkeleton from "@/features/best-selling/ProductSkeleton";

// ─── skeleton header stub (matches the real header layout) ──────────────
function ExploreHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-8 w-64 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="w-10 h-10 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

function ExploreSkeleton() {
  return (
    <>
      <ExploreHeaderSkeleton />
      <ProductSkeleton />
    </>
  );
}

// ─── async data-fetcher (triggers Suspense) ───────────────────────────────
async function ProductsFetcher() {
  const products = await getProducts();
  return <ExploreProductsGrid products={products} />;
}

// ─── export ───────────────────────────────────────────────────────────────
export default function ExploreProductsSection() {
  return (
    <section className="container mx-auto px-4 py-14">
      <Suspense fallback={<ExploreSkeleton />}>
        <ProductsFetcher />
      </Suspense>
    </section>
  );
}