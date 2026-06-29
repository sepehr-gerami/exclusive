"use client"; // ✅ ضروری چون useState داری

import Link from 'next/link';
import phone from "@/app/assets/icon/Vector(2).svg";
import email from "@/app/assets/icon/Vector(3).svg";
import Image from 'next/image';
import { useState } from 'react';
import { LoadingButton } from "@/components/ui/ContactSkeleton";

export default function ContactPage() {

  
  const [isLoading, setIsLoading] = useState(false);
 
  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsLoading(false);
  };

  return (
    <section className='flex flex-col px-20 py-10'>

      {/* Breadcrumb */}
      <div className="flex gap-2 text-sm text-gray-500 mb-10">
        <Link href="/" className="hover:text-red-500 transition">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">Contact</span>
      </div>

      {/* Main Grid */}
      <div className='grid grid-cols-3 gap-6'>

        {/* ستون چپ */}
        <div className='border border-gray-200 rounded-md shadow-sm p-8 flex flex-col gap-8'>

          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <div className='bg-red-500 rounded-full p-3'>
                <Image src={phone} width={20} height={20} alt='Phone' />
              </div>
              <h3 className='font-semibold text-base'>Call To Us</h3>
            </div>
            <p className='text-sm text-gray-700'>We are available 24/7, 7 days a week.</p>
            <p className='text-sm text-gray-700'>Phone: +8801611122222</p>
          </div>

          <hr />

          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <div className='bg-red-500 rounded-full p-3'>
                <Image src={email} width={20} height={20} alt='Email' />
              </div>
              <h3 className='font-semibold text-base'>Write To Us</h3>
            </div>
            <p className='text-sm text-gray-600'>Fill out our form and we will contact you within 24 hours.</p>
            <p className='text-sm text-gray-600'>Emails: customer@exclusive.com</p>
            <p className='text-sm text-gray-600'>Emails: support@exclusive.com</p>
          </div>

        </div>

        {/* ستون راست - فرم */}
        <div className='col-span-2 flex flex-col gap-4 p-4'>

          <div className='grid grid-cols-3 gap-4'>
            <input
              type='text'
              placeholder='Your Name *'
              className='bg-gray-100 rounded px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-red-400'
            />
            <input
              type='email'
              placeholder='Your Email *'
              className='bg-gray-100 rounded px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-red-400'
            />
            <input
              type='tel'
              placeholder='Your Phone *'
              className='bg-gray-100 rounded px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-red-400'
            />
          </div>

          <textarea
            placeholder='Your Message'
            rows={10}
            className='bg-gray-100 rounded px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-red-400 resize-none w-full'
          />

          
          <div className='flex justify-end'>
            <LoadingButton isLoading={isLoading} onClick={handleSubmit} />
          </div>

        </div>

      </div>
    </section>
  );
}