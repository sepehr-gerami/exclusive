import CategorySidebar from "@/components/layout/CategorySidebar";
import HeroBanner from "@/components/ui/HeroBanner";
import FlashSalesServer from "@/features/flash-sales/FlashServer";
import Categories from "@/features/flash-sales/Categories";
import { Suspense } from "react";
import FlashSaleSkeleton from "@/features/flash-sales/FlashSaleSkeleton";
import BestSellingSection from "@/features/best-selling/BestSellingSection";
import ExploreProductsSection from "@/components/ui/ExploreProductsSection";
import HeroBannerFooter from "@/components/ui/HeroBannerFooter";
import HeroBannerSkeleton from "@/components/ui/HeroBannerSkeleton";
import NewArrivals from "@/features/new-arrivals/NewArrivals";
import ServiceStrip from "@/features/services/ServiceStrip";


export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <section className="flex flex-col gap-6 mt-5 items-stretch lg:flex-row">
        {/* Hide on mobile, show on desktop */}
        <div className="hidden lg:block lg:w-1/5">
          <CategorySidebar />
        </div>

        <div className="w-full lg:w-4/5">
          <Suspense fallback={<HeroBannerSkeleton />}>
            <HeroBanner />
          </Suspense>
        </div>
      </section>

      {/* Mobile-only category sidebar */}
      <div className="lg:hidden mb-6">
        <CategorySidebar />
      </div>

      <Suspense fallback={<FlashSaleSkeleton />}>
        <FlashSalesServer />
      </Suspense>
      <Categories />
      <BestSellingSection />
      <div className="space-y-16 py-8">
        <HeroBannerFooter />
        <ExploreProductsSection />
        <NewArrivals />
        <ServiceStrip />
      </div>
    </main>
  );
}