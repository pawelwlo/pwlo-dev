export const localeBootStorageKey = "pwlo-trigger-boot";
export const localeBootMessageStorageKey = "pwlo-trigger-boot-msg";

export function clearLocaleBootSession() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(localeBootStorageKey);
    window.sessionStorage.removeItem(localeBootMessageStorageKey);
    document.documentElement.classList.remove("locale-boot-pending");
  } catch {
    // Ignore storage access errors.
  }
}

export function hasPendingLocaleBoot() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(localeBootStorageKey) === "true";
  } catch {
    return false;
  }
}

export function markLocaleBootPending(message: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(localeBootStorageKey, "true");
    window.sessionStorage.setItem(localeBootMessageStorageKey, message);
    document.documentElement.classList.add("locale-boot-pending");
  } catch {
    // Ignore storage access errors.
  }
}
