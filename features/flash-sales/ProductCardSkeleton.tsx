export default function ProductCardSkeleton() {
  return (
    <div className="h-40 w-full rounded-lg border border-gray-200 bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-300" />
      <div className="w-24 h-3 bg-gray-300 rounded" />
    </div>
  );
}