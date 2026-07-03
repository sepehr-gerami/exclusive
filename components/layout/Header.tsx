"use client";
import Link from 'next/link'
import Navbar from '@/components/nav/Navbar'
import Wishlist from '@/features/wishlist/Wishlist';
import Basket from '@/features/basket/Basket';
import SearchInput from '../ui/search-box/SearchInput';


export default function Header() {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mt-10 border-b border-gray-200 p-5">
      <Link href="/" className="font-bold text-3xl">
        Exclusive
      </Link>

      <Navbar />

      <div className="flex flex-col gap-4 items-stretch justify-between lg:flex-row lg:items-center">
        <SearchInput />

        <div className="flex items-center gap-4 lg:mr-8">
          <Wishlist />
          <Basket />
        </div>
      </div>
    </header>
  )
}
