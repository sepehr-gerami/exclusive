"use client";

import ProductSlider from "./ProductSlider";

export default function BestSellingSection() {
  return (
    <section className="mx-10 mt-20">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-8 bg-red-500 rounded-sm" />
            <span className="text-red-500 font-semibold">
              This Month
            </span>
          </div>

          <h2 className="text-4xl font-bold">
            Best Selling Products
          </h2>
        </div>

        <button className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition">
          View All
        </button>
      </div>

      {/* SLIDER */}
      <ProductSlider />

      <hr className="mt-16 border-gray-200" />
    </section>
  );
}