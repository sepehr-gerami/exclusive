"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/constants/nav-links";

interface Props {
  mobile?: boolean;
}

export default function Navbar({ mobile = false }: Props) {
  return (
    <nav className={`flex gap-2 ${mobile ? 'flex-col' : 'flex-row items-center'}`}>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            group relative
            px-4 py-2
            text-sm font-medium text-gray-600
            transition-all duration-200
            hover:text-black
            ${mobile ? 'block text-left w-full' : ''}
          `}
        >
          {mobile ? (
            <span className="relative">{link.title}</span>
          ) : (
            <>
              <span className="absolute inset-0 left-1/2 -translate-x-1/2 w-0 bg-gray-100 rounded-2xl transition-all duration-200 group-hover:w-full" />
              <span className="absolute bottom-0 left-1/2 h-0.5 w-5 bg-black transition-all duration-300 -translate-x-1/2 group-hover:w-9" />
              <span className="relative z-10 transition-all duration-200 group-hover:pl-2">
                {link.title}
              </span>
            </>
          )}
        </Link>
      ))}
    </nav>
  );
}