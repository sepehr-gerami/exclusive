// components/LanguageSync.tsx
"use client";
import { useEffect } from "react";
import { useLanguageStore } from "@/store/languageStore";

export default function LanguageSync() {
  const language = useLanguageStore((state) => state.language);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);
  return null;
}