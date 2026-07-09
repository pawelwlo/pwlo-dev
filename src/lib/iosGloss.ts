export type IosGlossDepth = "icon" | "dock" | "float" | "card";

export type IosIconTint =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "pink"
  | "gray"
  | "violet"
  | "slate";

export const IOS_ICON_GRADIENTS: Record<IosIconTint, { from: string; to: string }> = {
  blue: { from: "#4DA3FF", to: "#A8D4FF" },
  purple: { from: "#A07CFF", to: "#D7C8FF" },
  green: { from: "#5EDC9A", to: "#B9F2D0" },
  orange: { from: "#FFB36B", to: "#FFE0C2" },
  pink: { from: "#FF7FBF", to: "#FFD0E8" },
  gray: { from: "#C8CCD2", to: "#F1F3F5" },
  violet: { from: "#9B8CFF", to: "#D4CCFF" },
  slate: { from: "#A8B4C4", to: "#E4E9F0" },
};

export const IOS_GLOSS = {
  topHighlight: "rgba(255, 255, 255, 0.35)",
  bottomGloss: "rgba(255, 255, 255, 0.15)",
  glyphStroke: "#ffffff",
  glyphOpacity: 0.9,
  glyphStrokeWidth: 2,
} as const;

export const IOS_WALLPAPER = {
  imageUrl: "/os-mobile-wallpaper.webp",
  blur: "100px",
  saturation: 0.4,
  brightness: 0.75,
  bloom: "radial-gradient(circle at 40% 30%, rgba(255, 200, 150, 0.25), transparent 58%)",
  gloss: "linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))",
  diagonal:
    "linear-gradient(135deg, rgba(77, 163, 255, 0.28) 0%, rgba(255, 179, 107, 0.22) 48%, rgba(255, 127, 191, 0.2) 100%)",
} as const;

export const tintClassToIosTint: Record<string, IosIconTint> = {
  "os-icon-tint-blue": "blue",
  "os-icon-tint-indigo": "purple",
  "os-icon-tint-green": "green",
  "os-icon-tint-pink": "pink",
  "os-icon-tint-violet": "violet",
  "os-icon-tint-amber": "orange",
  "os-icon-tint-slate": "slate",
  "os-icon-tint-gray": "gray",
};

export function resolveIosTint(tintClass: string): IosIconTint {
  return tintClassToIosTint[tintClass] ?? "gray";
}

export function generateGradient(colorA: string, colorB: string, angle = 145): string {
  return `linear-gradient(${angle}deg, ${colorA} 0%, ${colorB} 100%)`;
}

export function generateGloss(angle = 180): string {
  return `linear-gradient(${angle}deg, ${IOS_GLOSS.topHighlight} 0%, ${IOS_GLOSS.bottomGloss} 100%)`;
}

export function generateShadow(depth: IosGlossDepth = "icon"): string {
  if (depth === "dock") {
    return "0 20px 44px rgba(0, 0, 0, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.4)";
  }

  if (depth === "float") {
    return "0 14px 36px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.08)";
  }

  if (depth === "card") {
    return "0 10px 28px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.28)";
  }

  return "0 6px 18px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.4)";
}

export function getIconGradientStyle(tint: IosIconTint): { background: string } {
  const palette = IOS_ICON_GRADIENTS[tint];
  return {
    background: generateGradient(palette.from, palette.to),
  };
}

export function getIconCssVariables(tint: IosIconTint): Record<string, string> {
  const palette = IOS_ICON_GRADIENTS[tint];
  return {
    "--ios-icon-gradient": generateGradient(palette.from, palette.to),
    "--ios-icon-shadow": generateShadow("icon"),
    "--ios-icon-gloss": generateGloss(),
  };
}
