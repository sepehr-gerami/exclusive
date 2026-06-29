import { Suspense } from "react";
import Link from "next/link";
import ProductDetailSkeleton from "@/components/ui/ProductDetailSkeleton";
import ProductDetail from "@/components/product/ProductDetail";

type Props = {
  params: Promise<{ id: string }>;
};

// ─── Data-fetching sub-component (triggers the Suspense boundary) ──────────

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
        <Link href="/" className="hover:text-red-500 transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/product" className="hover:text-red-500 transition">
          Products
        </Link>
        <span>/</span>
        <span className="text-black font-medium">#{id}</span>
      </div>

      {/* Skeleton shows while ProductDetail fetches */}
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail id={id} />
      </Suspense>
    </section>
  );
}