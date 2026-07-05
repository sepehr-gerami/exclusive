"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import "swiper/css";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { useBestSelling } from "./useBestSelling";
import type { Swiper as SwiperType } from "swiper";
import { ReactNode } from "react";

interface ProductSliderProps {
  children?: ReactNode;
}

export default function ProductSlider({children}:ProductSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const { products, loading } = useBestSelling();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div>
      {/* NAV BUTTONS */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          disabled={isBeginning}
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition
                     enabled:hover:bg-gray-200
                     disabled:cursor-not-allowed
                     disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          disabled={isEnd}
          onClick={() => swiperRef.current?.slideNext()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition
                     enabled:hover:bg-gray-200
                     disabled:cursor-not-allowed
                     disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* SWIPER */}
      <Swiper
        onSwiper={(swiper:SwiperType) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper:SwiperType) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        spaceBetween={24}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
         {children
                    ? children
                    : loading
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