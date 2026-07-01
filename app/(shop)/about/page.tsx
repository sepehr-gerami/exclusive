import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import StatsSection from '@/components/ui/StatsSection'
import TeamSection from '@/components/ui/TeamSection' 
import ServiceStrip from '@/features/services/ServiceStrip'

export default function page() {
  return (
    <section className="px-20 py-16">
      {/* Breadcrumb */}
      <div className="flex gap-2 text-sm text-gray-500 mb-12">
        <Link href="/" className="hover:text-red-500 transition">Home</Link>
        <span>/</span>
        <span className="font-medium text-black">About</span>
      </div>
      {/* Story content */}
      <div className="grid grid-cols-2 items-center gap-20">
        {/* Left */}
        <div className="space-y-8">
          <h1 className="text-5xl font-bold">Our Story</h1>
          <p className="text-gray-600 leading-8">
            Launched in 2015, Exclusive is South Asia`s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a wide
            range of tailored marketing, data and service solutions, Exclusive has
            10,500 sellers and 300 brands and serves millions of customers across
            the region.
          </p>
          <p className="text-gray-600 leading-8">
            Exclusive has more than one million products to offer, growing at a
            very fast pace. We provide a diverse assortment in categories ranging
            from consumer goods to fashion.
          </p>
        </div>
        {/* Right */}
        <div className="flex justify-end">
          <div className="overflow-hidden rounded-xl group">
            <Image
              src="/HeroBanner/SideImage.png"
              alt="About"
              width={705}
              height={609}
              className="
                object-cover transition-all duration-700 ease-out
                scale-100 brightness-95
                group-hover:scale-110 group-hover:brightness-100
              "
            />
          </div>
        </div>
      </div>

      <StatsSection />
      <TeamSection />
      <ServiceStrip/>
    </section>
  )
}