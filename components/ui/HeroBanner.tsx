"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";

const banners = [
    {
        title: "Up to 10% off Voucher",
        subtitle: "Galaxy S26 Ultra Series",
        brand: "samsung",
        image: "https://dkstatics-public.digikala.com/digikala-products/65a51880ee47c4f78bda2c5fed47d36e20874ddf_1779812219.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    },
    {
        title: "Gaming Collection",
        subtitle: "PlayStation 5",
        brand: "playstation",
        image: "https://dkstatics-public.digikala.com/digikala-products/5b11c668e2e77ce49491e21dd9d05f8fa36ca85f_1754252369.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    },
    {
        title: "Summer Sale",
        subtitle: "iPhone 17 Pro Max",
        brand: "apple",
        image: "https://dkstatics-public.digikala.com/digikala-products/ec57ce03f2a92834058f502174b1a2aeffc9a580_1759666637.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    },
];

export default function HeroBanner() {
    return (
        <>


            <Swiper
                modules={[Autoplay, Pagination]}
                loop
                autoplay={{ delay: 7000 }}
                pagination={{ clickable: true }}
                className="hero-swiper h-50 overflow-hidden rounded-2xl bg-black sm:h-72 lg:h-96"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index} className="h-full">
                        <div className="flex h-full items-center justify-between px-4 sm:px-5 md:px-8 lg:pl-16 text-white">

                            {/* Left: Text */}
                            <div className="w-[55%] text-left">
                                <div className="mb-3 flex items-center gap-2">

                                    {banner.brand === "apple" && (
                                        <Image
                                            src="/brand/apple-black-logo-svgrepo-com.svg"
                                            alt="Apple"
                                            width={18}
                                            height={18}
                                            className=" bg-white rounded-sm p-0.5"
                                        />
                                    )}

                                    {banner.brand === "samsung" && (
                                        <Image
                                            src="/brand/samsung-logo-svgrepo-com.svg"
                                            alt="Samsung"
                                            width={35}
                                            height={30}
                                            className=" bg-white rounded-sm p-0.5 "
                                        />
                                    )}

                                    {banner.brand === "playstation" && (
                                        <Image
                                            src="/brand/play-station-logo-svgrepo-com.svg"
                                            alt="PlayStation"
                                            width={22}
                                            height={22}
                                            className=" bg-white rounded-sm p-0.5"
                                        />
                                    )}

                                    <span className="text-sm text-white/60">
                                        {banner.subtitle}
                                    </span>

                                </div>

                                <h2 className="max-w-xs text-xl font-bold leading-tight sm:text-3xl lg:text-5xl">
                                    {banner.title}
                                </h2>

                                <button className="mt-6 flex cursor-pointer items-center gap-2 border-b border-white pb-0.5 text-sm transition-opacity hover:opacity-60">
                                    Shop Now →
                                </button>
                            </div>


                            {/* Right: Image */}
                            <div className="relative  h-36 w-38  mb-4 shrink-0 sm:h-56 sm:w-56 lg:h-80 lg:w-80">
                                <div className="absolute inset-0 animate-zoomSlow">
                                    <Image
                                        src={banner.image}
                                        alt={banner.title}
                                        fill
                                        unoptimized
                                        className="object-contain rounded-3xl pl-5"
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}