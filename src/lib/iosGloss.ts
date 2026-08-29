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

/** Semantic icon palette — derived from design tokens, not arbitrary pastels. */
export const IOS_ICON_GRADIENTS: Record<IosIconTint, { from: string; to: string }> = {
  blue: { from: "#3D66E6", to: "#6B93FF" },       /* Projects — primary accent */
  purple: { from: "#7C4FE0", to: "#A78BFA" },     /* Tech / secondary accent */
  violet: { from: "#7C4FE0", to: "#A78BFA" },     /* Tech stack */
  green: { from: "#0D9668", to: "#34D399" },      /* SEO / success */
  orange: { from: "#D97706", to: "#FBBF24" },     /* Contact / warning */
  pink: { from: "#D97706", to: "#FBBF24" },       /* Alias → contact */
  gray: { from: "#4B5563", to: "#9CA3AF" },       /* Settings / neutral */
  slate: { from: "#4B5563", to: "#9CA3AF" },      /* Neutral utility */
};

export const IOS_GLOSS = {
  topHighlight: "rgba(255, 255, 255, 0.28)",
  bottomGloss: "rgba(255, 255, 255, 0.08)",
  glyphStroke: "#ffffff",
  glyphOpacity: 0.95,
  glyphStrokeWidth: 2,
} as const;

export const IOS_WALLPAPER = {
  imageUrl: "none",
  blur: "0px",
  saturation: 1,
  brightness: 1,
  bloom: "transparent",
  gloss: "transparent",
  diagonal: "#04060A",
} as const;

/** Maps CSS tint classes to semantic icon colors. */
export const tintClassToIosTint: Record<string, IosIconTint> = {
  "os-icon-tint-blue": "blue",       /* Projects */
  "os-icon-tint-indigo": "purple",   /* Open source */
  "os-icon-tint-violet": "violet",   /* Tech */
  "os-icon-tint-green": "green",     /* SEO */
  "os-icon-tint-amber": "orange",    /* Contact */
  "os-icon-tint-pink": "orange",     /* Legacy → contact */
  "os-icon-tint-slate": "slate",     /* Utility */
  "os-icon-tint-gray": "gray",       /* Settings */
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
    return "0 20px 44px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.12)";
  }

  if (depth === "float") {
    return "0 14px 36px rgba(0, 0, 0, 0.28), 0 4px 12px rgba(0, 0, 0, 0.16)";
  }

  if (depth === "card") {
    return "0 10px 28px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
  }

  return "0 6px 18px rgba(0, 0, 0, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.14)";
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
