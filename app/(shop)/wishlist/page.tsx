"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import useWishlistStore from "@/store/useWishlistStore";

export default function CartPage() {
  const count = useWishlistStore((state) => state.getWishlistCount());
  const hydrated = useWishlistStore((state) => state._hydrated);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <div className="flex gap-2 text-sm text-gray-500 mb-8">
        <Link href="/">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">wishlist</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">
        {hydrated && count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px]">
            {count}
          </span>
        )}
      </h1>

                  <button
                    onClick={clearWishlist}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={22} />
                  </button>

          {/* Summary */}

          <div className="mt-10 w-full max-w-md rounded-xl border p-6 shadow-sm">

            <h2 className="text-xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr className="my-5" />

            <Link
              href="/checkout"
              className="mt-6 flex justify-center rounded-md bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
            >
              Proceed to Checkout
            </Link>

          </div>
      

    </section>
  );
}