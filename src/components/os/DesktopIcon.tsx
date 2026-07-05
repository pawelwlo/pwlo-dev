import type { PointerEvent } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type DesktopIconProps = {
  label: string;
  subtitle: string;
  stat: string;
  icon: LucideIcon;
  x: number;
  y: number;
  isActive: boolean;
  onPointerDown: (event: PointerEvent<HTMLButtonElement>) => void;
  onOpen: () => void;
};

export function DesktopIcon({
  label,
  subtitle,
  stat,
  icon: Icon,
  x,
  y,
  isActive,
  onPointerDown,
  onOpen,
}: DesktopIconProps) {
  return (
    <button
      type="button"
      className={cn("desktop-icon", isActive && "desktop-icon-active")}
      style={{ left: `${x}px`, top: `${y}px` }}
      onPointerDown={onPointerDown}
      onDoubleClick={onOpen}
      onClick={onOpen}
    >
      <span className="desktop-icon-glyph">
        <Icon size={24} strokeWidth={1.8} />
      </span>
      <span className="desktop-icon-copy">
        <strong>{label}</strong>
        <small>{subtitle}</small>
      </span>
      <span className="desktop-icon-stat">{stat}</span>
    </button>
  );
}
