import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FlashSaleSkeleton() {
  return (
    <section className="mt-20 mx-10">
      <div className="flex items-end justify-between mb-10">
        <div className="flex gap-18">
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
  );
}