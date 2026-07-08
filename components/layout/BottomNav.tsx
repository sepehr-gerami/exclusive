"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Search, Heart, User, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useSearchUIStore } from "@/store/useSearchUIStore";

const TABS = [
  { key: "home", href: "/", icon: Home },
  { key: "cart", href: "/cart", icon: ShoppingBag },
  { key: "search", href: null, icon: Search }, // handled specially
  { key: "wishlist", href: "/wishlist", icon: Heart },
  { key: "account", href: "/account", icon: User },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());
  const wishlistHydrated = useWishlistStore((state) => state._hydrated);
  const requestMobileOpen = useSearchUIStore((state) => state.requestMobileOpen);
  const mobileSearchActive = useSearchUIStore((state) => state.mobileSearchActive);

  const isActive = (href: string | null) => {
    if (href === null) return mobileSearchActive;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  const activeIndex = TABS.findIndex((tab) => isActive(tab.href));

  const iconColor = (active: boolean) => (active ? "text-black" : "text-gray-500");
  const labelColor = (active: boolean) =>
    active ? "font-bold transition-all text-[12px] text-gray-800" : "text-gray-500";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative grid h-16 grid-cols-5">
        {/* Single shared indicator — slides via transform, never unmounts */}
        {activeIndex !== -1 && (
          <motion.span
            className="absolute top-0 h-0.5 w-8 rounded-full bg-gray-500/75"
            style={{ left: `calc(${activeIndex} * (100% / 5) + (100% / 10) - 16px)` }}
            animate={{ left: `calc(${activeIndex} * (100% / 5) + (100% / 10) - 16px)` }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          />
        )}

        {TABS.map((tab, i) => {
          const active = i === activeIndex;
          const content = (
            <>
              <motion.span
                initial={false}
                animate={active ? { scale: 1.15 } : { scale: 1 }}
                whileTap={{ scale: 0.82 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative flex items-center justify-center"
              >
                <tab.icon size={22} strokeWidth={1.75} className={iconColor(active)} />
                {tab.key === "wishlist" && wishlistHydrated && wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-[9px] font-semibold text-white">
                    {wishlistCount}
                  </span>
                )}
              </motion.span>
         <span className={labelColor(active)}>{t.nav[tab.key]}</span>
            </>
          );

          return (
            <li key={tab.key} className="relative flex list-none">
              {tab.href === null ? (
                <button
                  type="button"
                  onClick={requestMobileOpen}
                  className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px]"
                >
                  {content}
                </button>
              ) : (
                <Link
                  href={tab.href}
                  className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px]"
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </div>
    </nav>
  );
}