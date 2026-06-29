"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";
import { useTranslation } from "@/hooks/useTranslation";

export default function TopHeader() {
  const [open, setOpen] = useState(false);

  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  return (
    <section className="bg-black text-white">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4">
        <div className="w-20" />

        <span className="text-white/90 text-sm">
          {t.summerSale}
          <Link href="/" className="ml-2 underline font-semibold">
            {t.shopNow}
          </Link>
        </span>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="group flex items-center gap-1"
          >
            {language === "en" ? "English" : "فارسی"}

            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-32 rounded-md bg-gray-900 text-white font-semibold shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  setLanguage("en");
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-700 transition"
                disabled 
              >
                🇺🇸 English
              </button>

              <button
                onClick={() => {
                  setLanguage("fa");
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-800 transition"
              >
                🇮🇷 فارسی
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}