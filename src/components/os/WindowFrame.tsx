import type { CSSProperties, PointerEvent, PropsWithChildren } from "react";
import { Minus, X } from "lucide-react";

import type { Locale } from "@/i18n/translations";
import { cn } from "@/lib/utils";

function WindowMaximizeIcon({ isMaximized }: { isMaximized: boolean }) {
  if (isMaximized) {
    return (
      <svg
        className="window-maximize-icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        aria-hidden="true"
      >
        <rect x="4.25" y="0.75" width="7" height="7" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1.35" />
        <rect x="0.75" y="4.25" width="7" height="7" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1.35" />
      </svg>
    );
  }

  return (
    <svg
      className="window-maximize-icon"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <rect x="1.25" y="1.25" width="9.5" height="9.5" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

export type ResizeDirection = "n" | "e" | "s" | "w" | "ne" | "nw" | "se" | "sw";

type WindowFrameProps = PropsWithChildren<{
  title: string;
  locale: Locale;
  controlsCopy: {
    drag: (title: string) => string;
    minimize: string;
    maximize: string;
    restore: string;
    close: (title: string) => string;
    resize: (title: string) => string;
  };
  isActive?: boolean;
  isMaximized?: boolean;
  onFocus?: () => void;
  onClose?: () => void;
  onDragStart?: (event: PointerEvent<HTMLElement>) => void;
  onMinimize?: () => void;
  onToggleMaximize?: () => void;
  onResizeStart?: (direction: ResizeDirection, event: PointerEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
}>;

export function WindowFrame({
  title,
  locale,
  controlsCopy,
  isActive = false,
  isMaximized = false,
  onFocus,
  onClose,
  onDragStart,
  onMinimize,
  onToggleMaximize,
  onResizeStart,
  className,
  style,
  children,
}: WindowFrameProps) {
  const resizeHandles: ResizeDirection[] = ["n", "e", "s", "w", "ne", "nw", "se", "sw"];

  return (
    <section
      className={cn("window-frame", isActive && "window-frame-active", className)}
      style={style}
      onMouseDown={onFocus}
    >
      <header
        className="window-header"
        aria-label={controlsCopy.drag(title)}
        lang={locale}
        onPointerDown={(event) => onDragStart?.(event)}
        onDoubleClick={onToggleMaximize}
      >
        <div className="window-title">{title}</div>
        <div className="window-actions">
          <button
            className="window-action"
            type="button"
            aria-label={controlsCopy.minimize}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={onMinimize}
          >
            <Minus size={14} strokeWidth={2.2} />
          </button>
          <button
            className="window-action"
            type="button"
            aria-label={isMaximized ? controlsCopy.restore : controlsCopy.maximize}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={onToggleMaximize}
          >
            <WindowMaximizeIcon isMaximized={isMaximized} />
          </button>
          <button
            className="window-action window-action-close"
            type="button"
            aria-label={controlsCopy.close(title)}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={onClose}
          >
            <X size={14} strokeWidth={2.2} />
          </button>
        </div>
      </header>
      <div className="window-body">{children}</div>
      {!isMaximized &&
        resizeHandles.map((direction) => (
          <button
            key={direction}
            type="button"
            className={cn("window-resize-handle", `window-resize-${direction}`)}
            aria-label={controlsCopy.resize(title)}
            onPointerDown={(event) => onResizeStart?.(direction, event)}
          />
        ))}
    </section>
  );
}
