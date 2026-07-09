import type { ComponentType, CSSProperties } from "react";

import {
  getIconCssVariables,
  IOS_GLOSS,
  resolveIosTint,
  type IosIconTint,
} from "@/lib/iosGloss";

type MobileIconGlyphProps = {
  icon: ComponentType<{ size?: number | string; strokeWidth?: number; className?: string }>;
  tintClass: string;
  size?: "app" | "dock";
  className?: string;
};

type MobileAppIconProps = MobileIconGlyphProps & {
  label: string;
  onClick: () => void;
  ariaLabel?: string;
};

export function MobileIconGlyph({ icon: Icon, tintClass, size = "app", className = "" }: MobileIconGlyphProps) {
  const tint = resolveIosTint(tintClass);
  const iconSize = size === "dock" ? 20 : 26;
  const style = getIconCssVariables(tint) as CSSProperties;

  return (
    <span
      className={`mobile-icon mobile-icon--${tint} mobile-icon--${size} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      <span className="mobile-icon__gloss" />
      <Icon
        size={iconSize}
        strokeWidth={IOS_GLOSS.glyphStrokeWidth}
        className="mobile-icon__glyph"
      />
    </span>
  );
}

export function MobileAppIcon({ label, onClick, ariaLabel, ...glyphProps }: MobileAppIconProps) {
  return (
    <button
      className="mobile-app-icon os-app-icon"
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
    >
      <MobileIconGlyph {...glyphProps} />
      <span className="mobile-app-icon__label os-app-label">{label}</span>
    </button>
  );
}

export function getMobileTint(tintClass: string): IosIconTint {
  return resolveIosTint(tintClass);
}
