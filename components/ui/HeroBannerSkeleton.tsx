export default function HeroBannerSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-black min-h-[24rem] animate-pulse">
      <div className="flex flex-col justify-between h-full gap-8 p-5 md:flex-row md:items-center">
        
        {/* Left */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-gray-700" />
            <div className="w-32 h-4 rounded bg-gray-700" />
          </div>

          <div className="space-y-3 mb-8">
            <div className="w-72 h-8 rounded bg-gray-700" />
            <div className="w-56 h-8 rounded bg-gray-700" />
          </div>

          <div className="w-24 h-5 rounded bg-gray-700" />
        </div>

        {/* Right */}
        <div className="w-full md:w-[20rem] h-80 rounded-xl bg-gray-800" />
      </div>

      {/* Pagination */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-600" />
        <div className="w-6 h-2 rounded-full bg-gray-500" />
        <div className="w-2 h-2 rounded-full bg-gray-600" />
      </div>
    </div>
  );
}