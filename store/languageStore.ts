// store/languageStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "@/lib/i18n/translations";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "fa", // زبان پیش‌فرض
      setLanguage: (lang) => {
        set({ language: lang });
        if (typeof document !== "undefined") {
          document.documentElement.lang = lang;
          document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
        }
      },
    }),
    {
      name: "language-storage",
      onRehydrateStorage: () => (state) => {
        // موقع لود اولیه از localStorage هم dir/lang رو ست کن
        if (state && typeof document !== "undefined") {
          document.documentElement.lang = state.language;
          document.documentElement.dir = state.language === "fa" ? "rtl" : "ltr";
        }
      },
    }
  )
);