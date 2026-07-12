import type { ComponentType } from "react";

import { MobileIconGlyph } from "@/components/MobileIcons";

type MobileDockItem = {
  id: string;
  tintClass: string;
  icon: ComponentType<{ size?: number | string; strokeWidth?: number; className?: string }>;
};

type MobileDockProps = {
  items: MobileDockItem[];
  onItemClick: (id: string) => void;
  getLabel: (id: string) => string;
  activeAppId?: string;
  className?: string;
};

export function MobileDock({ items, onItemClick, getLabel, activeAppId, className = "" }: MobileDockProps) {
  return (
    <nav className={`mobile-dock os-dock ${className}`.trim()} aria-label="Dock">
      <div className="mobile-dock__glass" aria-hidden="true" />
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`mobile-dock__item os-dock-icon ${activeAppId === item.id ? "active" : ""}`}
            type="button"
            onClick={() => onItemClick(item.id)}
            aria-label={getLabel(item.id)}
          >
            <Icon size={26} strokeWidth={2} className="mobile-dock-icon-svg" />
          </button>
        );
      })}
    </nav>
  );
}
