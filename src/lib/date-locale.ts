import { enUS, ar } from "date-fns/locale";
import type { Language } from "@/contexts/language-context";

export const dateLocales = {
  en: enUS,
  ar: ar,
};

export function getDateLocale(language: Language) {
  return dateLocales[language];
}
