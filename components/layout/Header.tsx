"use client";
import Link from 'next/link'
import React from 'react'
import Navbar from './Navbar'
import Wishlist from '@/features/Wishlist';
import Basket from '@/features/Basket';
import SearchInput from '../ui/search-box/SearchInput';


export default function Header() {
  return (
    <header className="flex items-center justify-between mt-10 border-b border-gray-200 p-5">
  <Link href="/" className="font-bold text-3xl">
    Exclusive
  </Link>

  <Navbar />

  <div className="flex items-center gap-15">
    <SearchInput/>
    {/* <SearchBox /> */}
    
    <div className="flex items-center gap-8 mr-8">
      <Wishlist />
      <Basket />
    </div>
  </div>
</header>
  )
}
