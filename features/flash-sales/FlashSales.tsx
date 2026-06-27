"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import "swiper/css";
import type { Swiper as SwiperType } from "swiper";

import ProductCard from "@/features/flash-sales/ProductCard";
import Countdown from "./Countdown";
import Link from "next/link";
import { Product } from "@/types/Product";

type Props = {
    products: Product[];
};

export default function FlashSales({ products }: Props) {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="mt-20 mx-10">
            <div className="flex items-end justify-between mb-10">
                <div className="flex gap-18">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-4 h-8 bg-red-500 rounded-sm" />
                            <span className="text-red-500 font-semibold">Today</span>
                        </div>
                        <h2 className="text-4xl font-bold">Flash Sales</h2>
                    </div>

                    <Countdown />
                </div>


                <div className="flex items-center gap-4">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <Swiper
                onSwiper={(s: SwiperType) => (swiperRef.current = s)}
                slidesPerView={4}
                spaceBetween={24}
                modules={[FreeMode]}
                freeMode
                breakpoints={{
                    320: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {products.map((p) => (
                    <SwiperSlide key={p.id}>
                        <ProductCard product={p} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-center mt-10">
                <Link
                    href="/product"
                    className="bg-red-500 text-white px-10 py-3 rounded-md"
                >
                    View All Products
                </Link>
            </div>
            <hr className="mt-16 border-gray-200" />
        </section>
    );
}