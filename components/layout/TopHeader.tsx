"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";
import { useTranslation } from "@/hooks/useTranslation";

const LANGUAGES = [
  { code: "en" as const, label: "English", flag: "🇺🇸" },
  { code: "fa" as const, label: "فارسی", flag: "🇮🇷" },
];

export default function TopHeader() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // بستن دراپ‌داون با کلیک بیرون یا کلید Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <section className="bg-black text-white">
      <div className="mx-auto flex flex-col gap-2 sm:flex-row sm:items-center h-auto sm:h-10 max-w-7xl justify-between px-4 py-2">
        <div className="w-full sm:w-20" />

        <span className="text-white/90 text-sm text-center sm:text-left">
         {t.header.summerSale}
          <Link href="/" className="ml-2 underline font-semibold">
         {t.header.shopNow}
          </Link>
        </span>

        <div className="relative" ref={containerRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm transition hover:bg-white/10"
          >
            <span>{current.flag}</span>
            <span>{current.label}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          <div
            role="listbox"
            className={`absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md border border-white/10 bg-gray-900 shadow-lg overflow-hidden transition-all duration-150 ${
              open
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-white/10 ${
                    isSelected ? "font-semibold text-white" : "text-white/80"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {isSelected && <Check size={14} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}