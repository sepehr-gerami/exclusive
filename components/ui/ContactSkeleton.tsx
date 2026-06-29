// components/ContactSkeleton.tsx

const shimmer = `
  relative overflow-hidden before:absolute before:inset-0
  before:-translate-x-full before:animate-[shimmer_1.6s_infinite]
  before:bg-gradient-to-r before:from-transparent 
  before:via-white/20 before:to-transparent
`;

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
  );
}

// دکمه لودینگ
export function LoadingButton({ isLoading, onClick }: { 
  isLoading: boolean; 
  onClick?: () => void 
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        flex items-center gap-2 bg-red-500 hover:bg-red-600 
        disabled:opacity-70 disabled:cursor-not-allowed
        text-white px-10 py-3 rounded text-sm font-medium transition
      `}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25" cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {isLoading ? "Send Message..." : "Send Message"}
    </button>
  );
}

// اسکلتون کامل صفحه
export default function ContactSkeleton() {
  return (
    <section className='flex flex-col px-20 py-10'>

      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-10">
        <SkeletonBox className="h-3 w-10" />
        <SkeletonBox className="h-3 w-2" />
        <SkeletonBox className="h-3 w-16" />
      </div>

      <div className='grid grid-cols-3 gap-6'>

        {/* ستون چپ */}
        <div className='border border-gray-200 rounded-md p-8 flex flex-col gap-8'>

          {/* Call To Us */}
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <SkeletonBox className="w-11 h-11 rounded-full" />
              <SkeletonBox className="h-4 w-24" />
            </div>
            <SkeletonBox className="h-3 w-full" />
            <SkeletonBox className="h-3 w-3/4" />
          </div>

          <hr />

          {/* Write To Us */}
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <SkeletonBox className="w-11 h-11 rounded-full" />
              <SkeletonBox className="h-4 w-24" />
            </div>
            <SkeletonBox className="h-3 w-full" />
            <SkeletonBox className="h-3 w-5/6" />
            <SkeletonBox className="h-3 w-4/5" />
            <SkeletonBox className="h-3 w-4/5" />
          </div>

        </div>

        {/* ستون راست - فرم */}
        <div className='col-span-2 flex flex-col gap-4 p-4'>

          {/* سه input */}
          <div className='grid grid-cols-3 gap-4'>
            <SkeletonBox className="h-11 rounded" />
            <SkeletonBox className="h-11 rounded" />
            <SkeletonBox className="h-11 rounded" />
          </div>

          {/* textarea */}
          <SkeletonBox className="h-40 rounded" />

          {/* دکمه */}
          <div className='flex justify-end'>
            <LoadingButton isLoading={true} />
          </div>

        </div>

      </div>
    </section>
  );
}