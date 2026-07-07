"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, LayoutGrid, Search, Heart, User } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useSearchUIStore } from "@/store/useSearchUIStore";


function ActiveIndicator() {
  return (
    <motion.span
      layoutId="bottomNavIndicator"
       className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gray-500/75"
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
    />
  );
}

const pulse = {
  scale: [1, 1.20, 1],
};

const pulseTransition = {
  duration: 1.5,
  repeat: Infinity,
  repeatType: "loop" as const,
  ease: "easeInOut" as const,
};

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());
  const wishlistHydrated = useWishlistStore((state) => state._hydrated);
  const requestMobileOpen = useSearchUIStore((state) => state.requestMobileOpen);
  const mobileSearchActive = useSearchUIStore((state) => state.mobileSearchActive);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const iconColor = (active: boolean) => (active ? "text-black" : "text-gray-500");
  const labelColor = (active: boolean ) =>
    active ? "font-bold  transition-all text-[12px] text-gray-800" : "text-gray-500";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid h-16 grid-cols-5">
        {/* Home */}
        <li className="relative flex">
          {isActive("/") && <ActiveIndicator />}
          <Link
            href="/"
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px]"
          >
            <motion.span
              animate={isActive("/") ? pulse : { scale: 1 }}
              whileTap={{ scale: 0.82 }}
            >
              <Home size={22} strokeWidth={1.75} className={iconColor(isActive("/"))} />
            </motion.span>
            <span className={labelColor(isActive("/"))}>{t.home}</span>
          </Link>
        </li>

        {/* Categories */}
        <li className="relative flex">
          {isActive("/product") && <ActiveIndicator />}
          <Link
            href="/product"
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px]"
          >
            <motion.span
              animate={isActive("/product") ? pulse : { scale: 1 }}
              whileTap={{ scale: 0.82 }}
            >
              <LayoutGrid
                size={22}
                strokeWidth={1.75}
                className={iconColor(isActive("/product"))}
              />
            </motion.span>
            <span className={labelColor(isActive("/product"))}>{t.categories}</span>
          </Link>
        </li>

        {/* Search — scrolls up and focuses the search input instead of navigating */}
        <li className="relative flex">
          {mobileSearchActive && <ActiveIndicator />}
          <button
            type="button"
            onClick={requestMobileOpen}
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px]"
          >
            <motion.span
              animate={mobileSearchActive ? pulse : { scale: 1 }}
              transition={pulseTransition}
              whileTap={{ scale: 0.78 }}
            >
              <Search size={22} strokeWidth={2} className={iconColor(mobileSearchActive)} />
            </motion.span>
            <span className={labelColor(mobileSearchActive)}>{t.search}</span>
          </button>
        </li>

        {/* Wishlist */}
        <li className="relative flex">
          {isActive("/wishlist") && <ActiveIndicator />}
          <Link
            href="/wishlist"
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px]"
          >
            <motion.span
              animate={isActive("/wishlist") ? pulse : { scale: 1 }}
              whileTap={{ scale: 0.82 }}
              className="relative flex items-center justify-center"
            >
              <Heart
                size={22}
                strokeWidth={1.75}
                className={iconColor(isActive("/wishlist"))}
              />
              {wishlistHydrated && wishlistCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-[9px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </motion.span>
            <span className={labelColor(isActive("/wishlist"))}>{t.wishlist}</span>
          </Link>
        </li>

        {/* Account */}
        <li className="relative flex">
          {isActive("/account") && <ActiveIndicator />}
          <Link
            href="/account"
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px]"
          >
            <motion.span
              animate={isActive("/account") ? pulse : { scale: 1 }}
              whileTap={{ scale: 0.82 }}
            >
              <User size={22} strokeWidth={1.75} className={iconColor(isActive("/account"))} />
            </motion.span>
            <span className={labelColor(isActive("/account"))}>{t.account}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}