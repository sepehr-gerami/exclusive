import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4">
          <Skeleton height={220} />
          <Skeleton height={20} className="mt-4" />
          <Skeleton width={80} height={20} className="mt-2" />
          <Skeleton width={120} height={20} className="mt-2" />
        </div>
      ))}
    </div>
  );
}