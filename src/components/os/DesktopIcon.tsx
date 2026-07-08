import type { PointerEvent } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type DesktopIconProps = {
  label: string;
  subtitle: string;
  stat: string;
  icon: LucideIcon;
  isActive: boolean;
  onOpen: () => void;
  variant?: "desktop" | "dock";
  x?: number;
  y?: number;
  onPointerDown?: (event: PointerEvent<HTMLButtonElement>) => void;
};

export function DesktopIcon({
  label,
  subtitle,
  stat,
  icon: Icon,
  isActive,
  onOpen,
  variant = "desktop",
  x,
  y,
  onPointerDown,
}: DesktopIconProps) {
  const isDock = variant === "dock";

  return (
    <button
      type="button"
      className={cn("desktop-icon", isDock && "desktop-dock-item", isActive && "desktop-icon-active")}
      style={!isDock && typeof x === "number" && typeof y === "number" ? { left: `${x}px`, top: `${y}px` } : undefined}
      onPointerDown={isDock ? undefined : onPointerDown}
      onDoubleClick={isDock ? undefined : onOpen}
      onClick={onOpen}
      aria-label={`${label}: ${subtitle}`}
      title={`${label} · ${subtitle}`}
    >
      <span className="desktop-icon-glyph">
        <Icon size={24} strokeWidth={1.8} />
      </span>
      <span className="desktop-icon-copy">
        <strong>{label}</strong>
        {isDock ? null : <small>{subtitle}</small>}
      </span>
      {isDock ? null : <span className="desktop-icon-stat">{stat}</span>}
    </button>
  );
}
