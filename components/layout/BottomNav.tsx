"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, ShoppingCart, User } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartCount } from "@/store/useCart";
import { useTranslation } from "@/hooks/useTranslation";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());
  const wishlistHydrated = useWishlistStore((state) => state._hydrated);
  const cartCount = useCartCount();

  const TABS = [
    { href: "/", label: t.home, icon: Home, key: "home" },
    { href: "/product", label: t.shop, icon: LayoutGrid, key: "products" },
    { href: "/wishlist", label: t.wishlist, icon: Heart, key: "wishlist" },
    { href: "/cart", label: t.cart, icon: ShoppingCart, key: "cart" },
    { href: "/account", label: t.account, icon: User, key: "account" },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, label, icon: Icon, key }) => {
          const active = isActive(href);
          const badge =
            key === "wishlist"
              ? wishlistHydrated && wishlistCount > 0
                ? wishlistCount
                : null
              : key === "cart"
              ? cartCount > 0
                ? cartCount
                : null
              : null;

          return (
            <li key={key}>
              <Link
                href={href}
                className="flex flex-col items-center justify-center gap-0.5 py-2 text-[11px]"
              >
                <span className="relative flex items-center justify-center">
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.25 : 1.5}
                    className={active ? "text-black" : "text-gray-500"}
                  />
                  {badge !== null && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
                      {badge}
                    </span>
                  )}
                </span>
                <span
                  className={
                    active
                      ? "font-medium text-black"
                      : "text-gray-500"
                  }
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
