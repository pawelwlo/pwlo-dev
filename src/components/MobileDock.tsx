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
  className?: string;
};

export function MobileDock({ items, onItemClick, getLabel, className = "" }: MobileDockProps) {
  return (
    <nav className={`mobile-dock os-dock ${className}`.trim()} aria-label="Dock">
      <div className="mobile-dock__glass" aria-hidden="true" />
      {items.map((item) => (
        <button
          key={item.id}
          className="mobile-dock__item os-dock-icon"
          type="button"
          onClick={() => onItemClick(item.id)}
          aria-label={getLabel(item.id)}
        >
          <MobileIconGlyph icon={item.icon} tintClass={item.tintClass} size="dock" />
        </button>
      ))}
    </nav>
  );
}
