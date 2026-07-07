
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    title: "Manage My Account",
    items: [
      {
        title: "My Profile",
        href: "/account",
      },
      {
        title: "Address Book",
        href: "/account/address",
      },
      {
        title: "Payment Options",
        href: "/account/payment",
      },
    ],
  },
  {
    title: "My Orders",
    items: [
      {
        title: "My Orders",
        href: "/account/orders",
      },
      {
        title: "My Cancellations",
        href: "/account/cancellations",
      },
    ],
  },
  {
    title: "My Wishlist",
    items: [
      {
        title: "Wishlist",
        href: "/wishlist",
      },
    ],
  },
];
export default function AccountSidebar() {
    const pathname = usePathname();
  return (
   <nav className="w-full lg:w-64 lg:shrink-0">
  {menu.map((section) => (
    <div key={section.title} className="mb-6 lg:mb-8">
      <h3 className="mb-3 font-semibold text-gray-900">
        {section.title}
      </h3>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:block lg:space-y-2">
        {section.items.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block transition lg:pl-4 ${
                  active
                    ? "text-red-500 font-medium"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  ))}
</nav>
  )
}
