import en from "@/locales/en";
import fa from "@/locales/fa";
import { useLanguageStore } from "@/store/languageStore";

const translations = {
  en,
  fa,
};

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);

  return {
    t: translations[language],
    language,
  };
}