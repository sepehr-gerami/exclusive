// app/Components/ProductDetailSkeleton.tsx

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductDetailSkeleton() {
  return (
    <section className="container mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-10">
        <Skeleton width={40}  height={16} />
        <Skeleton width={8}   height={16} />
        <Skeleton width={60}  height={16} />
        <Skeleton width={8}   height={16} />
        <Skeleton width={120} height={16} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image placeholder */}
        <Skeleton className="rounded-xl" height={420} />

        {/* Info placeholder */}
        <div className="flex flex-col gap-4">
          <Skeleton width={280} height={36} />
          <Skeleton width={100} height={24} />

          <div className="flex items-center gap-2 mt-2">
            <Skeleton width={120} height={20} />
            <Skeleton width={80}  height={20} />
          </div>

          <Skeleton height={1} className="my-2" />

          <Skeleton count={3} height={16} className="mb-1" />

          <div className="flex gap-4 mt-4">
            <Skeleton width={140} height={48} className="rounded-lg" />
            <Skeleton width={48}  height={48} className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}