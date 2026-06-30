function SkeletonBox({ className }: { className?: string }) {
  return <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
}

export default function ContactSkeleton() {
  return (
    <section className="flex flex-col px-20 py-10">
      <div className="flex gap-2 mb-10">
        <SkeletonBox className="h-3 w-10" />
        <SkeletonBox className="h-3 w-2" />
        <SkeletonBox className="h-3 w-16" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-md p-8 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <SkeletonBox className="w-11 h-11 rounded-full" />
              <SkeletonBox className="h-4 w-24" />
            </div>
            <SkeletonBox className="h-3 w-full" />
            <SkeletonBox className="h-3 w-3/4" />
          </div>
          <hr />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <SkeletonBox className="w-11 h-11 rounded-full" />
              <SkeletonBox className="h-4 w-24" />
            </div>
            <SkeletonBox className="h-3 w-full" />
            <SkeletonBox className="h-3 w-5/6" />
            <SkeletonBox className="h-3 w-4/5" />
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-4 p-4">
          <div className="grid grid-cols-3 gap-4">
            <SkeletonBox className="h-11 rounded" />
            <SkeletonBox className="h-11 rounded" />
            <SkeletonBox className="h-11 rounded" />
          </div>
          <SkeletonBox className="h-40 rounded" />
          <div className="flex justify-end">
            <SkeletonBox className="h-11 w-36 rounded" />
          </div>
        </div>
      </div>
    </section>
  )
}