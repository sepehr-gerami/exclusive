"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Smartphone,
    Monitor,
    Watch,
    Camera,
    Headphones,
    Gamepad2,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import CategoryCard from "./CategorieCard";

import "swiper/css";
import CategorySkeleton from "./ProductCardSkeleton";

export const categorie = [
    {
        id: 1,
        name: "Phones",
        slug: "phones",
        icon: Smartphone,
    },
    {
        id: 2,
        name: "Laptops",
        slug: "laptops",
        icon: Monitor,
    },
    {
        id: 3,
        name: "Tablets",
        slug: "tablets",
        icon: Watch,
    },
    {
        id: 4,
        name: "Accessories",
        slug: "mobile-accessories",
        icon: Headphones,
    },
    {
        id: 5,
        name: "Camera",
        apiCategory: "camera",
        icon: Camera,
    },
    {
        id: 6,
        name: "Gaming",
        apiCategory: "gaming",
        icon: Gamepad2,
    },
];

export default function Categories() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, []);

    return (
        <section className="mx-10 mt-20">
            {/* Header */}
            <div className="flex items-end justify-between mb-10">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-4 h-8 bg-red-500 rounded-sm" />
                        <span className="text-red-500 font-semibold">
                            Categories
                        </span>
                    </div>

                    <h2 className="text-4xl font-bold">
                        Browse By Category
                    </h2>
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

            {/* Categories Slider */}
            <Swiper
                onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
                spaceBetween={24}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                }}
            >
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <SwiperSlide key={i}>
                            <CategorySkeleton />
                        </SwiperSlide>
                    ))
                    : categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <CategoryCard category={category} />
                        </SwiperSlide>
                    ))}
            </Swiper>

            <hr className="mt-16 border-gray-200" />
        </section>
    );
}