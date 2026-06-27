export function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border rounded-xl p-4">
          <div className="h-55 bg-gray-200 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}