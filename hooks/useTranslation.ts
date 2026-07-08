// hooks/useTranslation.ts
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/lib/i18n/translations";

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  return { t: translations[language], language };
}