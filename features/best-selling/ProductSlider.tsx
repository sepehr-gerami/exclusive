"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import "swiper/css";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { useBestSelling } from "./useBestSelling";
import type { Swiper as SwiperType } from "swiper";



export default function ProductSlider() {
    const swiperRef = useRef<SwiperType | null>(null);
    const { products, loading } = useBestSelling();

    return (
        <div>
            {/* NAV BUTTONS */}
            <div className="flex justify-end gap-3 mb-4">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                    <ChevronLeft size={18} />
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* SWIPER */}
            <Swiper
                onSwiper={(s: SwiperType) => (swiperRef.current = s)}
                spaceBetween={24}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <SwiperSlide key={i}>
                            <ProductSkeleton />
                        </SwiperSlide>
                    ))
                    : products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}