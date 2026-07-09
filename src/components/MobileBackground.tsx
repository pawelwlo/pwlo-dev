import type { CSSProperties } from "react";

import { IOS_WALLPAPER } from "@/lib/iosGloss";

type MobileBackgroundProps = {
  className?: string;
  variant?: "home" | "lockscreen";
};

export function MobileBackground({ className = "", variant = "home" }: MobileBackgroundProps) {
  return (
    <div
      className={`mobile-background os-wallpaper mobile-background--${variant} ${className}`.trim()}
      aria-hidden="true"
      style={
        {
          "--mobile-wallpaper-image": `url("${IOS_WALLPAPER.imageUrl}")`,
          "--mobile-wallpaper-blur": IOS_WALLPAPER.blur,
          "--mobile-wallpaper-bloom": IOS_WALLPAPER.bloom,
          "--mobile-wallpaper-gloss": IOS_WALLPAPER.gloss,
          "--mobile-wallpaper-diagonal": IOS_WALLPAPER.diagonal,
        } as CSSProperties
      }
    >
      <div className="mobile-background__photo" />
      <div className="mobile-background__gradient" />
      <div className="mobile-background__bloom" />
      <div className="mobile-background__gloss" />
      <div className="mobile-background__vignette" />
    </div>
  );
}
