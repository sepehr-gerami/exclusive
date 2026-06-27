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
            <style>{`
                .hero-swiper .swiper-pagination { bottom: 14px; }
                .hero-swiper .swiper-pagination-bullet {
                    width: 8px; height: 8px;
                    background: rgba(255,255,255,0.35);
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .hero-swiper .swiper-pagination-bullet-active {
                    background: #DB4444;
                    width: 22px;
                    border-radius: 4px;
                }
            `}</style>

            <Swiper
                modules={[Autoplay, Pagination]}
                loop
                autoplay={{ delay: 7000 }}
                pagination={{ clickable: true }}
                className="hero-swiper overflow-hidden rounded-2xl bg-black h-95"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index} className="h-full">
                        <div className="flex items-center justify-between h-full pl-16 px-5  text-white">

                            {/* Left: Text */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">

                                    {banner.brand === "apple" && (
                                        <Image
                                            src="/brand/apple.svg"
                                            alt="Apple"
                                            width={18}
                                            height={18}
                                            className=" bg-white rounded-sm p-0.5"
                                        />
                                    )}

                                    {banner.brand === "samsung" && (
                                        <Image
                                            src="/brand/samsung.svg"
                                            alt="Samsung"
                                            width={35}
                                            height={30}
                                            className=" bg-white rounded-sm p-0.5 "
                                        />
                                    )}

                                    {banner.brand === "playstation" && (
                                        <Image
                                            src="/brand/playstationportable.svg"
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

                                <h2 className="text-5xl font-bold max-w-xs leading-tight mb-8">
                                    {banner.title}
                                </h2>

                                <button className="flex items-center cursor-pointer gap-2 text-sm border-b border-white pb-0.5 hover:opacity-60 transition-opacity">
                                    Shop Now →
                                </button>
                            </div>


                            {/* Right: Image */}
                            <div className="relative w-85 max-w-md h-85 overflow-hidden rounded-xl ">
                                <div className="absolute inset-0 animate-zoomSlow">
                                    <Image
                                        src={banner.image}
                                        alt={banner.title}
                                        fill
                                        unoptimized
                                        className="object-cover "
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