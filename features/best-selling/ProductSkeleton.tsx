export default function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg p-4 h-72">
      <div className="h-40 bg-gray-200 rounded mb-4" />
      <div className="h-3 bg-gray-200 w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 w-1/2" />
    </div>
  );
}