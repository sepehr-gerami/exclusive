"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

import Navbar from "@/components/nav/Navbar";
import Wishlist from "@/features/wishlist/Wishlist";
import Basket from "@/features/basket/Basket";
import SearchInput from "../ui/search-box/SearchInput";
import MobileMenu from "./MobileMenu";
import UserAccount from "@/features/account/Account";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="mt-4 border-b border-gray-200 px-3 py-3 sm:mt-10 sm:px-5 sm:py-5">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-2xl font-bold lg:text-3xl"
          >
            Exclusive
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Navbar />
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center mx-5  gap-15 lg:flex">

            <SearchInput />
          <div className="hidden items-center gap-1 lg:flex">
            <Wishlist />
            <Basket />
            <UserAccount/>
          </div>

          </div>

          {/* Mobile Right */}
          <div className="flex items-center gap-1 lg:hidden">
            <Basket />

            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              className="rounded-lg p-2 transition hover:bg-gray-100"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 transition hover:bg-gray-100"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="mt-4 lg:hidden">
            <SearchInput />
          </div>
        )}
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}