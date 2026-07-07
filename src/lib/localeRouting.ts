import type { Locale } from "@/i18n/translations";

const localePathMap: Record<Locale, string> = {
  en: "/",
  pl: "/pl/",
  de: "/de/",
};

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === "/pl" || pathname.startsWith("/pl/")) {
    return "pl";
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    return "de";
  }

  return "en";
}

export function getLocalePath(locale: Locale) {
  return localePathMap[locale];
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "pl" || value === "de";
}
