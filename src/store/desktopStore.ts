import { create } from "zustand";

import { projects, type WindowId } from "@/data/portfolioData";
import type { Locale } from "@/i18n/translations";
import { getLocaleFromPath, isLocale } from "@/lib/localeRouting";

type ThemeMode = "light" | "dark";

type DesktopStore = {
  locale: Locale;
  theme: ThemeMode;
  openWindows: WindowId[];
  activeWindow: WindowId | null;
  selectedProjectId: string;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  openWindow: (windowId: WindowId) => void;
  closeWindow: (windowId: WindowId) => void;
  focusWindow: (windowId: WindowId) => void;
  selectProject: (projectId: string) => void;
};

const initialLocale: Locale = (() => {
  if (typeof window === "undefined") {
    return "en";
  }

  const documentLocale = window.document?.documentElement?.lang;

  if (isLocale(documentLocale)) {
    return documentLocale;
  }

  return getLocaleFromPath(window.location.pathname);
})();

const initialTheme: ThemeMode = (() => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const datasetTheme = window.document?.documentElement?.dataset?.theme;

  if (datasetTheme === "light" || datasetTheme === "dark") {
    return datasetTheme;
  }

  return "dark";
})();

export const useDesktopStore = create<DesktopStore>((set) => ({
  locale: initialLocale,
  theme: initialTheme,
  openWindows: ["about", "projects", "contact"],
  activeWindow: "projects",
  selectedProjectId: projects[0].id,
  setLocale: (locale) => set({ locale }),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  openWindow: (windowId) =>
    set((state) => {
      const nextWindows = state.openWindows.includes(windowId)
        ? state.openWindows.filter((item) => item !== windowId).concat(windowId)
        : state.openWindows.concat(windowId);

      return {
        openWindows: nextWindows,
        activeWindow: windowId,
      };
    }),
  closeWindow: (windowId) =>
    set((state) => {
      const nextWindows = state.openWindows.filter((item) => item !== windowId);
      const activeWindow = state.activeWindow === windowId
        ? nextWindows[nextWindows.length - 1] ?? null
        : state.activeWindow;

      return {
        openWindows: nextWindows,
        activeWindow,
      };
    }),
  focusWindow: (windowId) =>
    set((state) => {
      if (!state.openWindows.includes(windowId)) {
        return {
          openWindows: state.openWindows.concat(windowId),
          activeWindow: windowId,
        };
      }

      return {
        openWindows: state.openWindows.filter((item) => item !== windowId).concat(windowId),
        activeWindow: windowId,
      };
    }),
  selectProject: (projectId) => set({ selectedProjectId: projectId }),
}));
