"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/constants/nav-links";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [open]);
  return (
  <>
  {/* Overlay */}
  <div
    onClick={onClose}
    className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
      open ? "opacity-100 visible" : "opacity-0 invisible"
    }`}
  />

  {/* Drawer */}
  <aside
    className={`fixed right-0 top-0 z-50 h-screen w-[60%] max-w-sm overflow-y-auto rounded-l-3xl bg-linear-to-b from-white to-gray-50 shadow-[0_10px_60px_rgba(0,0,0,.18)] transition-transform duration-300  ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
  >
    {/* Header */}
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 px-6 py-5 backdrop-blur-xl">
      <div>
        <h2 className="text-xl font-bold">Exclusive</h2>
        <p className="text-xs text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <button
        onClick={onClose}
        className="rounded-full p-2 transition hover:bg-gray-100"
      >
        <X size={22} />
      </button>
    </div>

    {/* Navigation */}
    <nav className="space-y-2 p-4">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="flex items-center justify-between rounded-2xl px-4 py-4 font-medium text-gray-700 transition-all hover:bg-red-50 hover:text-red-500 hover:translate-x-1"
        >
          {link.title}
        </Link>
      ))}

      {/* Categories */}
      <div className="rounded-2xl bg-white shadow-sm">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex w-full items-center justify-between px-4 py-4 font-medium"
        >
          Categories

          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              categoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {categoryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: .25 }}
              className="overflow-hidden"
            >
              <div className="space-y-1 pb-3">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={onClose}
                    className="mx-2 flex rounded-xl px-4 py-3 text-sm text-gray-600 transition-all hover:bg-red-50 hover:pl-6 hover:text-red-500"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>

    {/* Footer */}
    <div className="mt-auto border-t p-4">
      <div className="rounded-2xl bg-black p-5 text-white">
        <h3 className="font-semibold">
          Welcome to Exclusive
        </h3>

        <p className="mt-2 text-sm text-white/70">
          Discover thousands of premium products.
        </p>
      </div>
    </div>
  </aside>
    </>
  );
}