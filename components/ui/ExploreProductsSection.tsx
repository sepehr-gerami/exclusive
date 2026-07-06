// app/Components/ExploreProductsSection.tsx

import { Suspense } from "react";
import { getProducts } from "@/lib/api/Product";
import ExploreProductsGrid from "./ExploreProductsGrid";
import Skeleton from "react-loading-skeleton";

function ExploreSectionSkeleton() {
  return (
    <>
     <section className="container mx-auto px-4 mt-20">
        <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Skeleton width={16} height={32} />
                <Skeleton width={60} height={16} />
              </div>
  
              <Skeleton width={220} height={40} />
            </div>
  
            <div className="flex gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton width={40} height={12} />
                  <Skeleton width={55} height={30} />
                </div>
              ))}
            </div>
          </div>
  
          <div className="flex gap-3">
            <Skeleton circle width={44} height={44} />
            <Skeleton circle width={44} height={44} />
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <Skeleton height={260} />
  
              <div className="p-4">
                <Skeleton height={20} />
                <Skeleton width={120} height={18} className="mt-3" />
                <Skeleton width={80} height={16} className="mt-3" />
              </div>
            </div>
          ))}
        </div>
  
        <div className="flex justify-center mt-10">
          <Skeleton width={220} height={48} />
        </div>
      </section>

      
    </>
  );
}

async function Products() {
  const products = await getProducts();

  return <ExploreProductsGrid products={products} />;
}

export default function ExploreProductsSection() {
  return (
    <section className="container mx-auto px-4 py-14">
      <Suspense fallback={<ExploreSectionSkeleton />}>
        <Products />
      </Suspense>
    </section>
  );
}