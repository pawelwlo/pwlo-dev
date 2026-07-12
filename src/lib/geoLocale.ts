import type { Locale } from "../i18n/translations";
import { getLocalePath, isLocale } from "./localeRouting";

export const localePreferenceCookieName = "pwlo-locale";
export const localePreferenceStorageKey = "pwlo-locale";

const polishCountries = new Set(["PL"]);
const germanCountries = new Set(["DE", "AT", "CH"]);

export function getLocaleForCountry(countryCode: string | null | undefined): Locale {
  if (!countryCode) {
    return "en";
  }

  const normalizedCountry = countryCode.trim().toUpperCase();

  if (polishCountries.has(normalizedCountry)) {
    return "pl";
  }

  if (germanCountries.has(normalizedCountry)) {
    return "de";
  }

  return "en";
}

export function getCookieValue(cookieHeader: string | null | undefined, name: string): string | null {
  if (!cookieHeader) {
    return null;
  }

  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getSavedLocalePreference(cookieHeader?: string | null): Locale | null {
  if (typeof window !== "undefined") {
    const cookieValue = getCookieValue(document.cookie, localePreferenceCookieName);

    if (isLocale(cookieValue)) {
      return cookieValue;
    }

    try {
      const storageValue = window.localStorage.getItem(localePreferenceStorageKey);

      if (isLocale(storageValue)) {
        return storageValue;
      }
    } catch {
      // Ignore storage access errors.
    }

    return null;
  }

  const cookieValue = getCookieValue(cookieHeader ?? null, localePreferenceCookieName);
  return isLocale(cookieValue) ? cookieValue : null;
}

export function persistLocalePreference(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(localePreferenceStorageKey, locale);
  } catch {
    // Ignore storage access errors.
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${localePreferenceCookieName}=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

export function getLocaleRedirectPath(
  pathname: string,
  countryCode: string | null | undefined,
  cookieHeader?: string | null,
): string | null {
  if (pathname !== "/" && pathname !== "") {
    return null;
  }

  const savedLocale =
    cookieHeader !== undefined
      ? (() => {
          const cookieValue = getCookieValue(cookieHeader, localePreferenceCookieName);
          return isLocale(cookieValue) ? cookieValue : null;
        })()
      : getSavedLocalePreference();

  if (savedLocale) {
    if (savedLocale === "en") {
      return null;
    }

    return getLocalePath(savedLocale);
  }

  const geoLocale = getLocaleForCountry(countryCode);

  if (geoLocale === "en") {
    return null;
  }

  return getLocalePath(geoLocale);
}

export async function redirectToGeoLocaleIfNeeded() {
  if (typeof window === "undefined") {
    return;
  }

  const pathname = window.location.pathname;

  if (pathname !== "/" && pathname !== "/index.html") {
    return;
  }

  const savedLocale = getSavedLocalePreference();

  if (savedLocale) {
    if (savedLocale !== "en") {
      const targetPath = getLocalePath(savedLocale);

      if (pathname !== targetPath) {
        window.location.replace(targetPath);
      }
    }

    return;
  }

  try {
    const response = await fetch("/api/geo-locale", {
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { locale?: string };
    const locale = isLocale(payload.locale) ? payload.locale : "en";

    if (locale !== "en") {
      window.location.replace(getLocalePath(locale));
    }
  } catch {
    // Middleware handles production redirects; ignore when the API is unavailable.
  }
}
