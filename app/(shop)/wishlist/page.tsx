"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import useWishlistStore from "@/store/useWishlistStore";
import ProductCard from "@/features/best-selling/ProductCard";
import { getProducts } from "@/lib/api/Product";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import ProductSlider from "@/features/best-selling/ProductSlider";
import { SwiperSlide } from "swiper/react";
import ProductSkeleton from "@/features/best-selling/ProductSkeleton";
import { WormLoader } from "@/components/ui/Emptywithloader";

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let mounted = true;

  async function loadProducts() {
    const data = await getProducts();
    if (mounted) setProducts(data);
    setLoading(false);
  }

  loadProducts();

  return () => {
    mounted = false;
  };
}, []);
  const hydrated = useWishlistStore((state) => state._hydrated);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const items = useWishlistStore((state) => state.items);
if (!hydrated || loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <WormLoader className="w-20 h-20" />
    </div>
  );
}
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <div className="flex gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-red-500 transition">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">wishlist</span>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Wishlist ({items.length})
        </h2>

        <button
          onClick={clearWishlist}
          className=" text-red-500 transition-all  rounded-2xl  hover:bg-red-50 hover:scale-98"
        >
          <div className="flex flex-row items-center justify-center gap-4 cursor-pointer border border-gray-200  rounded-2xl py-2 px-2">
            <span className=" text-2xl font-bold ">Move All To Bag</span>
            <Trash2 size={22} />
          </div>
        </button>

      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showWishlistButton={false}
            showRemoveButton={true}
          />
        ))}

      </div>


      <hr className="mt-16 border-gray-200" />

      <div className="container mx-auto px-4 mt-20">
        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-8 bg-red-500 rounded-sm" />
              <span className="text-red-500 font-semibold">
                Just For You
              </span>
            </div>
          </div>

          <Link href={'/product'}>
            <button className="cursor-pointer rounded-2xl border border-gray-200 px-4 py-2 transition-all hover:scale-98 "
              style={{
                background:
                  "radial-gradient(136.47% 136.47% at 0% 0%, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.2) 100%)",
              }}>
              <p className="text-2xl text-gray-900 font-bold hover:text-gray-800/75 ">
                See All
              </p>
            </button>
          </Link>
        </div>
        <ProductSlider>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <ProductSkeleton />
              </SwiperSlide>
            ))
            : products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  product={product}
                  showWishlistButton={true}
                  showRemoveButton={false}
                />
              </SwiperSlide>
            ))}
        </ProductSlider>

      </div>
    </section >
  );
}