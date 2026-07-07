import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  FolderKanban,
  Gauge,
  ShieldCheck,
  Layers3,
  Mail,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { DesktopIcon } from "@/components/os/DesktopIcon";
import { WindowFrame, type ResizeDirection } from "@/components/os/WindowFrame";
import { HeroWindow } from "@/components/portfolio/HeroWindow";
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
import { copyByLocale, type Locale } from "@/i18n/translations";
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

const initialPositions: Record<WindowId, { x: number; y: number }> = {
  projects: { x: 20, y: 24 },
  about: { x: 20, y: 116 },
  tech: { x: 20, y: 208 },
  contact: { x: 20, y: 300 },
  speed: { x: 20, y: 392 },
  leads: { x: 20, y: 484 },
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
  projects: { x: 272, y: 24, width: 648, height: 352, minWidth: 560, minHeight: 320 },
  about: { x: 940, y: 24, width: 280, height: 168, minWidth: 280, minHeight: 168 },
  tech: { x: 940, y: 208, width: 280, height: 168, minWidth: 280, minHeight: 168 },
  contact: { x: 272, y: 396, width: 468, height: 170, minWidth: 400, minHeight: 170 },
  speed: { x: 756, y: 396, width: 464, height: 170, minWidth: 320, minHeight: 170 },
  leads: { x: 320, y: 88, width: 780, height: 440, minWidth: 520, minHeight: 360 },
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

const compactLayoutBreakpoint = 1100;
const autoMaximizeWindowIds = new Set<WindowId>(["projects"]);
const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);

type DragState = {
  id: WindowId;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

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
  const [iconPositions, setIconPositions] = useState(initialPositions);
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
  const [isCompactLayout, setIsCompactLayout] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= compactLayoutBreakpoint : false,
  );
  const desktopSurfaceRef = useRef<HTMLDivElement | null>(null);
  const iconDragStateRef = useRef<DragState | null>(null);
  const windowDragStateRef = useRef<WindowDragState | null>(null);
  const resizeStateRef = useRef<ResizeState | null>(null);
  const suppressClickRef = useRef<WindowId | null>(null);
  const autoMaximizedRef = useRef<Set<WindowId>>(new Set());

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
    const updateLayoutMode = () => {
      setIsCompactLayout(window.innerWidth <= compactLayoutBreakpoint);
    };

    updateLayoutMode();
    window.addEventListener("resize", updateLayoutMode);

    return () => {
      window.removeEventListener("resize", updateLayoutMode);
    };
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

      const dragState = iconDragStateRef.current;

      if (!dragState) {
        return;
      }

      const nextX = Math.max(12, dragState.originX + event.clientX - dragState.startX);
      const nextY = Math.max(12, dragState.originY + event.clientY - dragState.startY);

      if (Math.abs(event.clientX - dragState.startX) > 5 || Math.abs(event.clientY - dragState.startY) > 5) {
        suppressClickRef.current = dragState.id;
      }

      setIconPositions((current) => ({
        ...current,
        [dragState.id]: { x: nextX, y: nextY },
      }));
    };

    const handlePointerUp = () => {
      resizeStateRef.current = null;
      windowDragStateRef.current = null;
      iconDragStateRef.current = null;
      window.setTimeout(() => {
        suppressClickRef.current = null;
      }, 0);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const openFromIcon = useCallback((windowId: WindowId) => {
    if (suppressClickRef.current === windowId) {
      return;
    }

    setWindowStates((current) => ({
      ...current,
      [windowId]: {
        ...current[windowId],
        minimized: false,
      },
    }));
    openWindow(windowId);
  }, [openWindow]);

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
    <main className="portfolio-shell">
      <div className="shell-noise" aria-hidden="true" />
      <div className="shell-grid" aria-hidden="true" />

      <div className="system-status-bar" aria-label="System Status Bar">
        <span className="system-status-item">{copy.statusBar.localTime}: {localTime}</span>
        <span className="system-status-item">{copy.statusBar.os}</span>
        <span className="system-status-item">{copy.statusBar.performance}</span>
        <span className="system-status-item system-status-online">{copy.statusBar.online}</span>
      </div>

      <section className="hero-section">
        <HeroWindow
          locale={locale}
          copy={copy}
          isDark={theme === "dark"}
          onChangeLocale={handleLocaleChange}
          onToggleTheme={toggleTheme}
          onOpenProjects={() => openFromIconWithAutoMaximize("projects")}
          onOpenContact={() => openFromIconWithAutoMaximize("contact")}
        />
      </section>

      <section className="desktop-section">
        <div
          className="desktop-surface"
          ref={desktopSurfaceRef}
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            setPointerGlow({
              x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 20,
              y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 20,
            });
          }}
        >
          <div
            className="desktop-parallax"
            aria-hidden="true"
            style={{
              transform: `translate3d(${pointerGlow.x}px, ${pointerGlow.y}px, 0)`,
            }}
          />

          <div className="desktop-icons-layer">
            {desktopIcons.map((item) => {
              const Icon = iconMap[item.id];
              const position = iconPositions[item.id];
              const iconCopy = copy.desktopIcons[item.id];

              return (
                <DesktopIcon
                  key={item.id}
                  icon={Icon}
                  label={iconCopy.label}
                  subtitle={iconCopy.subtitle}
                  stat={item.stat}
                  x={position.x}
                  y={position.y}
                  isActive={activeWindow === item.id}
                  onPointerDown={(event) => {
                    iconDragStateRef.current = {
                      id: item.id,
                      startX: event.clientX,
                      startY: event.clientY,
                      originX: position.x,
                      originY: position.y,
                    };
                  }}
                  onOpen={() => openFromIconWithAutoMaximize(item.id)}
                />
              );
            })}
          </div>

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
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Pawel Wlodarczyk</span>
        <span>{copy.footer.builtWith}</span>
        <span>pwlo.dev</span>
      </footer>
    </main>
  );
}
