import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  FolderKanban,
  Gauge,
  Languages,
  Layers3,
  Mail,
  MoonStar,
  Search,
  ShieldCheck,
  SunMedium,
  UserRound,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import { DesktopIcon } from "@/components/os/DesktopIcon";
import { WindowFrame, type ResizeDirection } from "@/components/os/WindowFrame";
import { Desktop } from "@/components/Desktop";
import { Hero } from "@/components/Hero";
import { ScrollAnimation, type ScrollAnimationHandle } from "@/components/ScrollAnimation";
import { LeadsWindow } from "@/components/portfolio/LeadsWindow";
import { OsHomeLayout } from "@/components/portfolio/OsHomeLayout";
import { ProjectsWindow } from "@/components/portfolio/ProjectsWindow";
import {
  AboutWindow,
  ContactWindow,
  SpeedWindow,
  TechStackWindow,
} from "@/components/portfolio/UtilityWindows";
import { desktopIcons, type WindowId } from "@/data/portfolioData";
import { copyByLocale, localeOptions, type Locale } from "@/i18n/translations";
import { getLocalePath } from "@/lib/localeRouting";
import { fetchAdminLeads, submitLead, type LeadRecord } from "@/lib/leadsApi";
import { useDesktopStore } from "@/store/desktopStore";

const iconMap: Record<WindowId, LucideIcon> = {
  projects: FolderKanban,
  about: UserRound,
  tech: Layers3,
  contact: Mail,
  speed: Gauge,
  leads: ShieldCheck,
};

type WindowRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
};

const initialWindowRects: Record<WindowId, WindowRect> = {
  projects: { x: 100, y: 40, width: 840, height: 600, minWidth: 640, minHeight: 480 },
  about: { x: 600, y: 80, width: 480, height: 420, minWidth: 400, minHeight: 360 },
  tech: { x: 160, y: 120, width: 520, height: 440, minWidth: 420, minHeight: 380 },
  contact: { x: 220, y: 160, width: 560, height: 540, minWidth: 460, minHeight: 480 },
  speed: { x: 640, y: 200, width: 580, height: 460, minWidth: 460, minHeight: 380 },
  leads: { x: 280, y: 240, width: 780, height: 540, minWidth: 560, minHeight: 460 },
};

type WindowState = {
  minimized: boolean;
  maximized: boolean;
  previousRect: WindowRect | null;
};

const initialWindowStates: Record<WindowId, WindowState> = {
  projects: { minimized: false, maximized: false, previousRect: null },
  about: { minimized: false, maximized: false, previousRect: null },
  tech: { minimized: false, maximized: false, previousRect: null },
  contact: { minimized: false, maximized: false, previousRect: null },
  speed: { minimized: false, maximized: false, previousRect: null },
  leads: { minimized: false, maximized: false, previousRect: null },
};

const compactLayoutBreakpoint = 1280;

function getIsCompactLayout() {
  if (typeof window === "undefined") {
    return false;
  }

  if (typeof window.matchMedia === "function") {
    return window.matchMedia(`(max-width: ${compactLayoutBreakpoint}px)`).matches;
  }

  return window.innerWidth <= compactLayoutBreakpoint;
}
const autoMaximizeWindowIds = new Set<WindowId>(["projects"]);
const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);
const garmischWeatherUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=47.4917&longitude=11.0955&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1";
const desktopPrivacyConsentStorageKey = "pwlo-desktop-privacy-accepted-v1";

type WeatherSnapshot = {
  temperature: number;
  high: number;
  low: number;
  weatherCode: number;
};

const defaultWeatherSnapshot: WeatherSnapshot = {
  temperature: 14,
  high: 18,
  low: 9,
  weatherCode: 2,
};

function getWeatherPresentation(weatherCode: number, locale: Locale): { label: string; icon: LucideIcon } {
  if (weatherCode === 0) {
    return {
      label: locale === "pl" ? "Bezchmurnie" : locale === "de" ? "Klar" : "Clear",
      icon: SunMedium,
    };
  }

  if (weatherCode === 1 || weatherCode === 2) {
    return {
      label: locale === "pl" ? "Czesciowe zachmurzenie" : locale === "de" ? "Teilweise bewolkt" : "Partly Cloudy",
      icon: CloudSun,
    };
  }

  if (weatherCode === 3) {
    return {
      label: locale === "pl" ? "Pochmurno" : locale === "de" ? "Bewoelkt" : "Cloudy",
      icon: Cloud,
    };
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return {
      label: locale === "pl" ? "Mgla" : locale === "de" ? "Nebel" : "Fog",
      icon: CloudFog,
    };
  }

  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
    return {
      label: locale === "pl" ? "Deszcz" : locale === "de" ? "Regen" : "Rain",
      icon: CloudRain,
    };
  }

  if ((weatherCode >= 71 && weatherCode <= 77) || weatherCode === 85 || weatherCode === 86) {
    return {
      label: locale === "pl" ? "Snieg" : locale === "de" ? "Schnee" : "Snow",
      icon: CloudSnow,
    };
  }

  if (weatherCode >= 95) {
    return {
      label: locale === "pl" ? "Burza" : locale === "de" ? "Gewitter" : "Storm",
      icon: CloudLightning,
    };
  }

  return {
    label: locale === "pl" ? "Zachmurzenie" : locale === "de" ? "Wolken" : "Cloudy",
    icon: Cloud,
  };
}

type WindowDragState = {
  id: WindowId;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  width: number;
  height: number;
};

type ResizeState = {
  id: WindowId;
  direction: ResizeDirection;
  startX: number;
  startY: number;
  originRect: WindowRect;
};

type ContactStatus = {
  tone: "success" | "error";
  message: string;
} | null;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getResizedRect(
  originRect: WindowRect,
  direction: ResizeDirection,
  deltaX: number,
  deltaY: number,
  boundsWidth: number,
  boundsHeight: number,
) {
  const nextRect = { ...originRect };
  const rightEdge = originRect.x + originRect.width;
  const bottomEdge = originRect.y + originRect.height;

  if (direction.includes("e")) {
    nextRect.width = clamp(originRect.width + deltaX, originRect.minWidth, boundsWidth - originRect.x);
  }

  if (direction.includes("s")) {
    nextRect.height = clamp(originRect.height + deltaY, originRect.minHeight, boundsHeight - originRect.y);
  }

  if (direction.includes("w")) {
    const nextX = clamp(originRect.x + deltaX, 0, rightEdge - originRect.minWidth);
    nextRect.x = nextX;
    nextRect.width = clamp(rightEdge - nextX, originRect.minWidth, boundsWidth - nextX);
  }

  if (direction.includes("n")) {
    const nextY = clamp(originRect.y + deltaY, 0, bottomEdge - originRect.minHeight);
    nextRect.y = nextY;
    nextRect.height = clamp(bottomEdge - nextY, originRect.minHeight, boundsHeight - nextY);
  }

  nextRect.x = clamp(nextRect.x, 0, Math.max(0, boundsWidth - nextRect.minWidth));
  nextRect.y = clamp(nextRect.y, 0, Math.max(0, boundsHeight - nextRect.minHeight));
  nextRect.width = clamp(nextRect.width, nextRect.minWidth, boundsWidth - nextRect.x);
  nextRect.height = clamp(nextRect.height, nextRect.minHeight, boundsHeight - nextRect.y);

  return nextRect;
}

export default function Home() {
  const {
    locale,
    setLocale,
    theme,
    setTheme,
    toggleTheme,
    openWindows,
    activeWindow,
    selectedProjectId,
    openWindow,
    closeWindow,
    focusWindow,
    selectProject,
  } = useDesktopStore();
  const [windowRects, setWindowRects] = useState(initialWindowRects);
  const [windowStates, setWindowStates] = useState(initialWindowStates);
  const [pointerGlow, setPointerGlow] = useState({ x: 0, y: 0 });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [contactStatus, setContactStatus] = useState<ContactStatus>(null);
  const [adminKey, setAdminKey] = useState("");
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [leadsError, setLeadsError] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState(() =>
    new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date()),
  );
  const [weatherSnapshot, setWeatherSnapshot] = useState<WeatherSnapshot>(defaultWeatherSnapshot);
  const [isCompactLayout, setIsCompactLayout] = useState(getIsCompactLayout);
  const [desktopLockscreenState, setDesktopLockscreenState] = useState<"locked" | "unlocking" | "unlocked">(() => {
    if (typeof window === "undefined") {
      return "locked";
    }

    try {
      return window.localStorage.getItem(desktopPrivacyConsentStorageKey) === "true" ? "unlocked" : "locked";
    } catch {
      return "locked";
    }
  });
  const [hasAcceptedDesktopCookies, setHasAcceptedDesktopCookies] = useState(false);
  const [hasAcceptedDesktopTerms, setHasAcceptedDesktopTerms] = useState(false);
  const [isDesktopPrivacyInfoExpanded, setIsDesktopPrivacyInfoExpanded] = useState(false);
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false);
  const [desktopSearch, setDesktopSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHighlightIndex, setSearchHighlightIndex] = useState(0);
  const portfolioShellRef = useRef<HTMLElement | null>(null);
  const scrollAnimationRef = useRef<ScrollAnimationHandle | null>(null);
  const localeMenuRef = useRef<HTMLDivElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const desktopSurfaceRef = useRef<HTMLDivElement | null>(null);
  const windowDragStateRef = useRef<WindowDragState | null>(null);
  const resizeStateRef = useRef<ResizeState | null>(null);
  const autoMaximizedRef = useRef<Set<WindowId>>(new Set());
  const desktopUnlockTimerRef = useRef<number | null>(null);

  const handleLocaleChange = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) {
        return;
      }

      const nextPath = getLocalePath(nextLocale);

      window.localStorage.setItem("pwlo-locale", nextLocale);
      setLocale(nextLocale);
      window.location.assign(nextPath);
    },
    [locale, setLocale],
  );

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!isLocaleMenuOpen && !isSearchFocused) {
        return;
      }

      if (isSearchFocused && searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
        setDesktopSearch("");
      }

      if (event.target instanceof Node && localeMenuRef.current && !localeMenuRef.current.contains(event.target)) {
        setIsLocaleMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLocaleMenuOpen(false);
        setIsSearchFocused(false);
        setDesktopSearch("");
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLocaleMenuOpen, isSearchFocused]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("pwlo-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    const savedAdminKey = window.localStorage.getItem("pwlo-admin-key");

    if (savedAdminKey) {
      setAdminKey(savedAdminKey);
    }
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("pwlo-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("pwlo-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (adminKey) {
      window.localStorage.setItem("pwlo-admin-key", adminKey);
      return;
    }

    window.localStorage.removeItem("pwlo-admin-key");
  }, [adminKey]);

  const copy = copyByLocale[locale];
  const weatherPresentation = useMemo(
    () => getWeatherPresentation(weatherSnapshot.weatherCode, locale),
    [weatherSnapshot.weatherCode, locale],
  );
  const WeatherIcon = weatherPresentation.icon;
  const desktopDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
  const isDesktopLockscreenVisible = desktopLockscreenState !== "unlocked";

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
    let isMounted = true;

    const updateTime = () => {
      if (!isMounted) {
        return;
      }

      setLocalTime(formatter.format(new Date()));
    };

    updateTime();

    const intervalId = window.setInterval(updateTime, 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [locale]);

  useEffect(() => {
    let isCancelled = false;

    const loadWeather = async () => {
      try {
        const response = await fetch(garmischWeatherUrl);

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = (await response.json()) as {
          current?: {
            temperature_2m?: number;
            weather_code?: number;
          };
          daily?: {
            temperature_2m_max?: number[];
            temperature_2m_min?: number[];
          };
        };

        if (isCancelled) {
          return;
        }

        setWeatherSnapshot({
          temperature: Math.round(data.current?.temperature_2m ?? defaultWeatherSnapshot.temperature),
          high: Math.round(data.daily?.temperature_2m_max?.[0] ?? defaultWeatherSnapshot.high),
          low: Math.round(data.daily?.temperature_2m_min?.[0] ?? defaultWeatherSnapshot.low),
          weatherCode: data.current?.weather_code ?? defaultWeatherSnapshot.weatherCode,
        });
      } catch {
        if (!isCancelled) {
          setWeatherSnapshot(defaultWeatherSnapshot);
        }
      }
    };

    void loadWeather();
    const refreshId = window.setInterval(() => {
      void loadWeather();
    }, 30 * 60 * 1000);

    return () => {
      isCancelled = true;
      window.clearInterval(refreshId);
    };
  }, []);

  useEffect(
    () => () => {
      if (desktopUnlockTimerRef.current) {
        window.clearTimeout(desktopUnlockTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${compactLayoutBreakpoint}px)`);
    const updateLayoutMode = () => {
      setIsCompactLayout(mediaQuery.matches);
    };

    updateLayoutMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateLayoutMode);
      return () => mediaQuery.removeEventListener("change", updateLayoutMode);
    }

    mediaQuery.addListener(updateLayoutMode);
    return () => mediaQuery.removeListener(updateLayoutMode);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const resizeState = resizeStateRef.current;

      if (resizeState && desktopSurfaceRef.current) {
        const bounds = desktopSurfaceRef.current.getBoundingClientRect();
        const nextRect = getResizedRect(
          resizeState.originRect,
          resizeState.direction,
          event.clientX - resizeState.startX,
          event.clientY - resizeState.startY,
          bounds.width,
          bounds.height,
        );

        setWindowRects((current) => ({
          ...current,
          [resizeState.id]: nextRect,
        }));

        return;
      }

      const windowDragState = windowDragStateRef.current;

      if (windowDragState && desktopSurfaceRef.current) {
        const bounds = desktopSurfaceRef.current.getBoundingClientRect();
        const nextX = clamp(
          windowDragState.originX + event.clientX - windowDragState.startX,
          0,
          Math.max(0, bounds.width - windowDragState.width),
        );
        const nextY = clamp(
          windowDragState.originY + event.clientY - windowDragState.startY,
          0,
          Math.max(0, bounds.height - windowDragState.height),
        );

        setWindowRects((current) => ({
          ...current,
          [windowDragState.id]: {
            ...current[windowDragState.id],
            x: nextX,
            y: nextY,
          },
        }));

        return;
      }

    };

    const handlePointerUp = () => {
      resizeStateRef.current = null;
      windowDragStateRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const openFromIcon = useCallback((windowId: WindowId) => {
    setWindowStates((current) => ({
      ...current,
      [windowId]: {
        ...current[windowId],
        minimized: false,
      },
    }));

    setWindowRects((current) => {
      const rect = current[windowId];
      if (!rect) return current;

      const maxW = window.innerWidth;
      const maxH = window.innerHeight;
      const padding = 20;
      const topBarHeight = 26;
      const dockHeight = 70;

      let { x, y, width, height } = rect;

      if (width > maxW - padding * 2) width = Math.max(rect.minWidth, maxW - padding * 2);
      if (height > maxH - topBarHeight - dockHeight - padding * 2) {
        height = Math.max(rect.minHeight, maxH - topBarHeight - dockHeight - padding * 2);
      }

      if (x + width > maxW - padding) x = maxW - width - padding;
      if (x < padding) x = padding;

      if (y + height > maxH - dockHeight - padding) y = maxH - height - dockHeight - padding;
      if (y < topBarHeight + padding) y = topBarHeight + padding;

      if (x === rect.x && y === rect.y && width === rect.width && height === rect.height) {
        return current;
      }

      return {
        ...current,
        [windowId]: { ...rect, x, y, width, height },
      };
    });

    openWindow(windowId);
  }, [openWindow]);

  const searchWindowMatches = useMemo(() => {
    if (!desktopSearch.trim()) return [];
    const q = desktopSearch.toLowerCase();
    return desktopIcons.filter(
      (icon) =>
        icon.label.toLowerCase().includes(q) ||
        icon.subtitle.toLowerCase().includes(q),
    );
  }, [desktopSearch]);

  const handleSearchOpenWindow = useCallback(
    (windowId: WindowId) => {
      openFromIcon(windowId);
      setDesktopSearch("");
      setIsSearchFocused(false);
      searchInputRef.current?.blur();
    },
    [openFromIcon],
  );

  const handleSearchSubmit = useCallback(() => {
    const highlighted = searchWindowMatches[searchHighlightIndex];
    if (highlighted) {
      handleSearchOpenWindow(highlighted.id);
      return;
    }
    if (desktopSearch.trim()) {
      window.find(desktopSearch, false, false, true, false, false, false);
    }
  }, [searchWindowMatches, searchHighlightIndex, desktopSearch, handleSearchOpenWindow]);

  const handleSearchKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearchSubmit();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSearchHighlightIndex((i) =>
          Math.min(i + 1, searchWindowMatches.length - 1),
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSearchHighlightIndex((i) => Math.max(i - 1, 0));
      }
    },
    [handleSearchSubmit, searchWindowMatches.length],
  );


  const maybeAutoMaximizeWindow = useCallback(
    (windowId: WindowId) => {
      if (isCompactLayout || !desktopSurfaceRef.current) {
        return false;
      }

      const bounds = desktopSurfaceRef.current.getBoundingClientRect();

      if (bounds.width < 1200 || bounds.height < 720) {
        return false;
      }

      const previousRect = windowRects[windowId];

      if (previousRect.width >= bounds.width * 0.92 && previousRect.height >= bounds.height * 0.92) {
        return false;
      }

      setWindowRects((currentRects) => ({
        ...currentRects,
        [windowId]: {
          ...currentRects[windowId],
          x: 0,
          y: 0,
          width: bounds.width,
          height: bounds.height,
        },
      }));

      setWindowStates((current) => {
        const state = current[windowId];

        if (state.maximized) {
          return current;
        }

        return {
          ...current,
          [windowId]: {
            ...state,
            minimized: false,
            maximized: true,
            previousRect,
          },
        };
      });

      focusWindow(windowId);
      return true;
    },
    [focusWindow, isCompactLayout, windowRects],
  );

  const openFromIconWithAutoMaximize = useCallback(
    (windowId: WindowId) => {
      openFromIcon(windowId);

      if (!autoMaximizeWindowIds.has(windowId)) {
        return;
      }

      if (autoMaximizedRef.current.has(windowId)) {
        return;
      }

      if (maybeAutoMaximizeWindow(windowId)) {
        autoMaximizedRef.current.add(windowId);
      }
    },
    [maybeAutoMaximizeWindow, openFromIcon],
  );

  const handleContactSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      setContactStatus({
        tone: "error",
        message: copy.contact.missingConfig,
      });
      return;
    }

    if (isSubmittingInquiry) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const projectType = String(formData.get("projectType") ?? "");
    const submissionDurationMs = Math.max(0, Date.now() - Number(formData.get("startedAt") ?? Date.now()));
    setIsSubmittingInquiry(true);
    setContactStatus(null);

    try {
      await submitLead({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        projectType,
        message: String(formData.get("message") ?? ""),
        locale,
        pageOrigin: window.location.href,
        website: String(formData.get("website") ?? ""),
        submissionDurationMs,
      });
    } catch (error) {
      console.error("Failed to submit lead", error);
      setContactStatus({
        tone: "error",
        message: error instanceof Error ? error.message : copy.contact.submitError,
      });
      setIsSubmittingInquiry(false);
      return;
    }

    form.reset();
    setContactStatus({
      tone: "success",
      message: copy.contact.submitSuccess,
    });
    setIsSubmittingInquiry(false);
  }, [copy.contact.missingConfig, copy.contact.submitError, copy.contact.submitSuccess, isSubmittingInquiry, locale]);

  const handleRefreshLeads = useCallback(async () => {
    if (!adminKey.trim()) {
      setLeadsError(copy.leads.unauthorized);
      return;
    }

    setIsLoadingLeads(true);
    setLeadsError(null);

    try {
      const nextLeads = await fetchAdminLeads(adminKey.trim());
      setLeads(nextLeads);
    } catch (error) {
      setLeadsError(error instanceof Error ? error.message : copy.leads.unauthorized);
    } finally {
      setIsLoadingLeads(false);
    }
  }, [adminKey, copy.leads.unauthorized]);

  const startResize = (
    windowId: WindowId,
    direction: ResizeDirection,
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (isCompactLayout) {
      return;
    }

    if (windowStates[windowId].maximized) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    focusWindow(windowId);
    resizeStateRef.current = {
      id: windowId,
      direction,
      startX: event.clientX,
      startY: event.clientY,
      originRect: windowRects[windowId],
    };
  };

  const startWindowDrag = (
    windowId: WindowId,
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    if (isCompactLayout) {
      return;
    }

    if (windowStates[windowId].maximized) {
      return;
    }

    event.preventDefault();
    focusWindow(windowId);
    windowDragStateRef.current = {
      id: windowId,
      startX: event.clientX,
      startY: event.clientY,
      originX: windowRects[windowId].x,
      originY: windowRects[windowId].y,
      width: windowRects[windowId].width,
      height: windowRects[windowId].height,
    };
  };

  const minimizeWindow = (windowId: WindowId) => {
    setWindowStates((current) => ({
      ...current,
      [windowId]: {
        ...current[windowId],
        minimized: true,
      },
    }));
  };

  const toggleMaximizeWindow = (windowId: WindowId) => {
    if (!desktopSurfaceRef.current || isCompactLayout) {
      return;
    }

    const bounds = desktopSurfaceRef.current.getBoundingClientRect();

    setWindowStates((current) => {
      const state = current[windowId];

      if (state.maximized && state.previousRect) {
        setWindowRects((currentRects) => ({
          ...currentRects,
          [windowId]: state.previousRect as WindowRect,
        }));

        return {
          ...current,
          [windowId]: {
            ...state,
            maximized: false,
            previousRect: null,
          },
        };
      }

      setWindowRects((currentRects) => ({
        ...currentRects,
        [windowId]: {
          ...currentRects[windowId],
          x: 0,
          y: 0,
          width: bounds.width,
          height: bounds.height,
        },
      }));

      return {
        ...current,
        [windowId]: {
          ...state,
          minimized: false,
          maximized: true,
          previousRect: windowRects[windowId],
        },
      };
    });

    focusWindow(windowId);
  };

  const closeWindowWithState = (windowId: WindowId) => {
    autoMaximizedRef.current.delete(windowId);
    setWindowStates((current) => ({
      ...current,
      [windowId]: {
        ...current[windowId],
        minimized: false,
        maximized: false,
        previousRect: null,
      },
    }));
    closeWindow(windowId);
  };

  const windowContent = useMemo<Record<WindowId, JSX.Element>>(
    () => ({
      projects: (
        <ProjectsWindow
          locale={locale}
          copy={{
            ...copy.projects,
            seo: copy.seo,
          }}
          selectedProjectId={selectedProjectId}
          onSelectProject={(projectId) => {
            selectProject(projectId);
            openFromIconWithAutoMaximize("projects");
          }}
        />
      ),
      about: <AboutWindow locale={locale} copy={copy} />,
      tech: <TechStackWindow locale={locale} copy={copy} />,
      contact: (
        <ContactWindow
          copy={copy}
          onSubmit={handleContactSubmit}
          isSubmitting={isSubmittingInquiry}
          statusMessage={contactStatus?.message ?? null}
          statusTone={contactStatus?.tone ?? null}
        />
      ),
      speed: <SpeedWindow locale={locale} copy={copy} />,
      leads: (
        <LeadsWindow
          copy={copy.leads}
          adminKey={adminKey}
          onAdminKeyChange={setAdminKey}
          onRefresh={handleRefreshLeads}
          isLoading={isLoadingLeads}
          errorMessage={leadsError}
          leads={leads}
        />
      ),
    }),
    [adminKey, contactStatus?.message, contactStatus?.tone, copy, handleContactSubmit, handleRefreshLeads, isLoadingLeads, isSubmittingInquiry, leads, leadsError, locale, openFromIconWithAutoMaximize, selectProject, selectedProjectId],
  );

  const acceptDesktopPrivacyNotice = () => {
    if (!hasAcceptedDesktopCookies || !hasAcceptedDesktopTerms) {
      return;
    }

    try {
      window.localStorage.setItem(desktopPrivacyConsentStorageKey, "true");
    } catch {
      // Ignore storage write errors and continue unlocking the workspace.
    }

    if (desktopUnlockTimerRef.current) {
      window.clearTimeout(desktopUnlockTimerRef.current);
    }

    setDesktopLockscreenState("unlocking");
    desktopUnlockTimerRef.current = window.setTimeout(() => {
      setDesktopLockscreenState("unlocked");
    }, 320);
  };

  useEffect(() => {
    if (isCompactLayout || desktopLockscreenState !== "unlocked") {
      return;
    }

    const revealDesktop = () => {
      scrollAnimationRef.current?.revealDesktop();
    };

    const frameId = window.requestAnimationFrame(revealDesktop);
    const timeoutId = window.setTimeout(revealDesktop, 120);
    const fallbackId = window.setTimeout(revealDesktop, 900);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(fallbackId);
    };
  }, [desktopLockscreenState, isCompactLayout]);

  if (isCompactLayout) {
    return (
      <OsHomeLayout
        locale={locale}
        copy={copy}
        localTime={localTime}
        selectedProjectId={selectedProjectId}
        onSelectProject={selectProject}
        onSubmitContact={handleContactSubmit}
        isSubmittingInquiry={isSubmittingInquiry}
        contactStatusMessage={contactStatus?.message ?? null}
        contactStatusTone={contactStatus?.tone ?? null}
        adminKey={adminKey}
        onAdminKeyChange={setAdminKey}
        onRefreshLeads={handleRefreshLeads}
        isLoadingLeads={isLoadingLeads}
        leadsError={leadsError}
        leads={leads}
        onChangeLocale={handleLocaleChange}
        onToggleTheme={toggleTheme}
        isDark={theme === "dark"}
      />
    );
  }

  return (
    <main
      ref={portfolioShellRef}
      className={`portfolio-shell${isDesktopLockscreenVisible ? " portfolio-shell-locked" : ""}`}
      onMouseMove={(event) => {
        const viewportWidth = window.innerWidth || 1;
        const viewportHeight = window.innerHeight || 1;

        portfolioShellRef.current?.style.setProperty(
          "--desktop-lockscreen-offset-x",
          `${((event.clientX / viewportWidth) - 0.5) * 6}px`,
        );
        portfolioShellRef.current?.style.setProperty(
          "--desktop-lockscreen-offset-y",
          `${((event.clientY / viewportHeight) - 0.5) * 6}px`,
        );
      }}
      onMouseLeave={() => {
        portfolioShellRef.current?.style.setProperty("--desktop-lockscreen-offset-x", "0px");
        portfolioShellRef.current?.style.setProperty("--desktop-lockscreen-offset-y", "0px");
      }}
    >
      <div className="desktop-wallpaper" aria-hidden="true">
        <div className="desktop-wallpaper-layer desktop-wallpaper-layer-base" />
        <div className="desktop-wallpaper-layer desktop-wallpaper-layer-warm" />
        <div className="desktop-wallpaper-layer desktop-wallpaper-layer-pink" />
        <div className="desktop-wallpaper-photo" />
        <div className="desktop-wallpaper-noise" />
        <div className="desktop-wallpaper-content-tint" />
      </div>
      <div className="shell-noise" aria-hidden="true" />
      <div className="shell-grid" aria-hidden="true" />

      {isDesktopLockscreenVisible ? (
        <section
          className={`desktop-lockscreen${desktopLockscreenState === "unlocking" ? " desktop-lockscreen-unlocking" : ""}`}
          aria-label={copy.osLayout.lockscreen.title}
        >
          <div className="desktop-lockscreen-clock" aria-live="polite">
            <div className="desktop-lockscreen-time">{localTime}</div>
            <div className="desktop-lockscreen-date">{desktopDate}</div>
            <div className="desktop-lockscreen-welcome">{copy.osLayout.lockscreen.welcome}</div>
          </div>

          <section className="desktop-lockscreen-panel" aria-label={copy.osLayout.lockscreen.title}>
            <div className="desktop-lockscreen-panel-body">
              <div className="desktop-lockscreen-panel-copy">
                <h2>{copy.osLayout.lockscreen.title}</h2>
                <p>{copy.osLayout.lockscreen.message}</p>
                {isDesktopPrivacyInfoExpanded ? (
                  <p className="desktop-lockscreen-detail">{copy.osLayout.lockscreen.infoDetail}</p>
                ) : null}
              </div>

              <div className="desktop-lockscreen-consent" aria-label={copy.osLayout.lockscreen.consentAriaLabel}>
                <label className="desktop-lockscreen-checkbox">
                  <input
                    type="checkbox"
                    checked={hasAcceptedDesktopCookies}
                    onChange={(event) => setHasAcceptedDesktopCookies(event.target.checked)}
                  />
                  <span>{copy.osLayout.lockscreen.cookiesConsent}</span>
                </label>
                <label className="desktop-lockscreen-checkbox">
                  <input
                    type="checkbox"
                    checked={hasAcceptedDesktopTerms}
                    onChange={(event) => setHasAcceptedDesktopTerms(event.target.checked)}
                  />
                  <span>{copy.osLayout.lockscreen.termsConsent}</span>
                </label>
              </div>

              <div className="desktop-lockscreen-actions">
                <button
                  className="desktop-lockscreen-button desktop-lockscreen-button-primary"
                  type="button"
                  onClick={acceptDesktopPrivacyNotice}
                  disabled={!hasAcceptedDesktopCookies || !hasAcceptedDesktopTerms}
                >
                  {copy.osLayout.lockscreen.accept}
                </button>
                <button
                  className="desktop-lockscreen-button desktop-lockscreen-button-secondary"
                  type="button"
                  onClick={() => setIsDesktopPrivacyInfoExpanded((current) => !current)}
                >
                  {copy.osLayout.lockscreen.moreInfo}
                </button>
              </div>
            </div>
          </section>
        </section>
      ) : null}

      <div className="system-menu-bar" aria-label="macOS style menu bar">
        <div className="system-menu-bar-section system-menu-bar-left">
          <span className="system-status-item system-status-app">{copy.statusBar.os}</span>
        </div>
        <div className="system-menu-bar-section system-menu-bar-center">
          <div
            ref={searchContainerRef}
            className={`system-menu-bar-search-wrap${isSearchFocused ? " system-menu-bar-search-wrap-open" : ""}`}
          >
            <div className={`system-menu-bar-search${isSearchFocused ? " system-menu-bar-search-focused" : ""}`}>
              <Search className="system-menu-bar-search-icon" size={12} aria-hidden="true" />
              <input
                ref={searchInputRef}
                id="desktop-search-input"
                className="system-menu-bar-search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                autoComplete="off"
                value={desktopSearch}
                onChange={(e) => {
                  setDesktopSearch(e.target.value);
                  setSearchHighlightIndex(0);
                }}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
            {isSearchFocused && desktopSearch.trim() && (
              <div className="search-results-dropdown" role="listbox" aria-label="Search results">
                {searchWindowMatches.length > 0 ? (
                  <>
                    <div className="search-results-section-label">Open window</div>
                    {searchWindowMatches.map((match, index) => {
                      const Icon = iconMap[match.id];
                      return (
                        <button
                          key={match.id}
                          className={`search-result-item${index === searchHighlightIndex ? " search-result-item-active" : ""}`}
                          type="button"
                          role="option"
                          aria-selected={index === searchHighlightIndex}
                          onPointerDown={(e) => {
                            e.preventDefault();
                            handleSearchOpenWindow(match.id);
                          }}
                        >
                          <span className="search-result-icon">
                            <Icon size={14} aria-hidden="true" />
                          </span>
                          <span className="search-result-label">{match.label}</span>
                          <span className="search-result-sub">{match.subtitle}</span>
                        </button>
                      );
                    })}
                    <div className="search-results-hint">↵ to open · ↑↓ to navigate</div>
                  </>
                ) : (
                  <>
                    <div className="search-results-section-label">Find on page</div>
                    <button
                      className="search-result-item search-result-item-active"
                      type="button"
                      onPointerDown={(e) => {
                        e.preventDefault();
                        handleSearchSubmit();
                      }}
                    >
                      <span className="search-result-icon">
                        <Search size={14} aria-hidden="true" />
                      </span>
                      <span className="search-result-label">"{desktopSearch}"</span>
                      <span className="search-result-sub">Find on page</span>
                    </button>
                    <div className="search-results-hint">↵ to find</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="system-menu-bar-section system-menu-bar-right">
          <div className="system-menu-bar-controls">
            <div
              ref={localeMenuRef}
              className={`system-menu-bar-locale${isLocaleMenuOpen ? " system-menu-bar-locale-open" : ""}`}
            >
              <button
                className="system-status-item system-status-control"
                type="button"
                onClick={() => setIsLocaleMenuOpen((current) => !current)}
                aria-expanded={isLocaleMenuOpen}
                aria-controls="system-menu-bar-locale-menu"
                aria-label={copy.localeLabel}
                title={copy.localeLabel}
              >
                <Languages size={16} aria-hidden="true" />
              </button>
              {isLocaleMenuOpen ? (
                <div
                  className="system-menu-bar-locale-menu"
                  role="menu"
                  id="system-menu-bar-locale-menu"
                  aria-label={copy.localeLabel}
                >
                  {localeOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`system-menu-bar-locale-menu-button${locale === option.value ? " system-menu-bar-locale-menu-button-active" : ""}`}
                      type="button"
                      onClick={() => {
                        setIsLocaleMenuOpen(false);
                        handleLocaleChange(option.value);
                      }}
                      role="menuitemradio"
                      aria-checked={locale === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button
              className="system-status-item system-status-control"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? copy.themeLight : copy.themeDark}
              title={theme === "dark" ? copy.themeLight : copy.themeDark}
            >
              {theme === "dark" ? <SunMedium size={16} aria-hidden="true" /> : <MoonStar size={16} aria-hidden="true" />}
            </button>
          </div>
          <div className="system-status-weather" aria-label="Weather in Garmisch-Partenkirchen">
            <span className="system-status-weather-icon" aria-hidden="true">
              <WeatherIcon size={16} />
            </span>
            <span className="system-status-weather-copy">
              <strong>{weatherSnapshot.temperature}°C</strong>
              <span>Garmisch-Partenkirchen</span>
            </span>
          </div>
          <span
            className="system-status-item system-status-wifi"
            aria-label={copy.statusBar.online}
            title={copy.statusBar.online}
          >
            <Wifi size={16} aria-hidden="true" />
          </span>
          <span className="system-status-item system-status-time">{copy.statusBar.localTime}: {localTime}</span>
        </div>
      </div>

      <ScrollAnimation
        ref={scrollAnimationRef}
        workspaceUnlocked={desktopLockscreenState === "unlocked"}
        hero={<Hero time={localTime} date={desktopDate} welcome={copy.osLayout.lockscreen.welcome} />}
        desktop={
          <Desktop
            surfaceRef={desktopSurfaceRef}
            onSurfaceMouseMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              setPointerGlow({
                x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 20,
                y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 20,
              });
            }}
            dock={
              <div className="desktop-dock" aria-label="macOS style dock">
                {desktopIcons.map((item) => {
                  const Icon = iconMap[item.id];
                  const iconCopy = copy.desktopIcons[item.id];

                  return (
                    <DesktopIcon
                      key={item.id}
                      variant="dock"
                      icon={Icon}
                      label={iconCopy.label}
                      subtitle={iconCopy.subtitle}
                      stat={item.stat}
                      isActive={activeWindow === item.id}
                      onOpen={() => openFromIconWithAutoMaximize(item.id)}
                    />
                  );
                })}
              </div>
            }
          >
            <div
              className="desktop-parallax"
              aria-hidden="true"
              style={{
                transform: `translate3d(${pointerGlow.x}px, ${pointerGlow.y}px, 0)`,
              }}
            />

            <div className="windows-layer">
              {openWindows
                .filter((windowId) => !windowStates[windowId].minimized)
                .map((windowId, index) => (
                  <WindowFrame
                    key={windowId}
                    title={copy.windowTitles[windowId]}
                    locale={locale}
                    controlsCopy={copy.windowControls}
                    className="floating-window"
                    isActive={activeWindow === windowId}
                    isMaximized={windowStates[windowId].maximized}
                    onFocus={() => focusWindow(windowId)}
                    onDragStart={(event) => startWindowDrag(windowId, event)}
                    onMinimize={() => minimizeWindow(windowId)}
                    onToggleMaximize={() => toggleMaximizeWindow(windowId)}
                    onClose={() => closeWindowWithState(windowId)}
                    onResizeStart={(direction, event) => startResize(windowId, direction, event)}
                    style={{
                      zIndex: index + 10,
                      ...(isCompactLayout
                        ? {}
                        : {
                            left: `${windowRects[windowId].x}px`,
                            top: `${windowRects[windowId].y}px`,
                            width: `${windowRects[windowId].width}px`,
                            height: `${windowRects[windowId].height}px`,
                          }),
                    }}
                  >
                    {windowContent[windowId]}
                  </WindowFrame>
                ))}
            </div>
          </Desktop>
        }
      />

      <footer className="site-footer">
        <span>© 2026 Pawel Wlodarczyk</span>
        <span>{copy.footer.builtWith}</span>
        <span>pwlo.dev</span>
      </footer>
    </main>
  );
}
