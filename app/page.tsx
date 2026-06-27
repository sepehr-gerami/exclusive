import CategorySidebar from "@/components/layout/CategorySidebar";
import HeroBanner from "@/components/ui/HeroBanner";
import FlashSalesServer from "@/features/flash-sales/FlashServer";
import Categories from "@/features/flash-sales/Categories";
import { Suspense } from "react";
import FlashSaleSkeleton from "@/features/flash-sales/FlashSaleSkeleton";
import HeroBannerSkeleton from "@/components/ui/HeroBannerSkeleton";
import BestSellingSection from "@/features/best-selling/BestSellingSection";
import ExploreProductsSection from "@/components/ui/ExploreProductsSection";
import HeroBannerFooter from "@/components/ui/HeroBannerFooter";

export default function Home() {
  return (
    <main>
      <section className="flex gap-6 mt-5 items-stretch">
        <div className="w-1/5">
          <CategorySidebar />
        </div>

        <div className="w-3/4">
          <Suspense fallback={<HeroBannerSkeleton />}>
            <HeroBanner />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<FlashSaleSkeleton />}>
        <FlashSalesServer />
      </Suspense>

      <Suspense fallback={<div>Loading categories...</div>}>
        <Categories />
      </Suspense>
     <BestSellingSection />
       <div className="container mx-auto px-4 py-8 space-y-16">
      <HeroBannerFooter />
      <ExploreProductsSection />
    </div>
    </main>
  );
}