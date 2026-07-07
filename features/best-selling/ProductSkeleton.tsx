export default function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-100 bg-white p-3 sm:p-4">
      <div className="h-32 sm:h-40 rounded-lg bg-gray-200 mb-4" />
      <div className="h-3 w-3/4 rounded bg-gray-200 mb-2" />
      <div className="h-3 w-1/2 rounded bg-gray-200" />
    </div>
  );
}