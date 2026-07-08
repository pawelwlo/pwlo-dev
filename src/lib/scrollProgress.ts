export const DESKTOP_FADE_START = 0.1;
export const DESKTOP_FADE_END = 0.7;
export const HERO_FADE_END = 0.7;
export const DESKTOP_INTERACTIVE_THRESHOLD = 0.74;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function getScrollProgress(containerTop: number, containerHeight: number, viewportHeight: number): number {
  const totalScrollableDistance = Math.max(containerHeight - viewportHeight, 1);
  return clamp((-containerTop + viewportHeight * 0.08) / totalScrollableDistance, 0, 1);
}

export function getDesktopOpacity(progress: number): number {
  if (progress < DESKTOP_FADE_START) {
    return 0;
  }

  return clamp((progress - DESKTOP_FADE_START) / (DESKTOP_FADE_END - DESKTOP_FADE_START), 0, 1);
}

export function getHeroOpacity(progress: number): number {
  if (progress >= HERO_FADE_END) {
    return 0;
  }

  return clamp(1 - progress / HERO_FADE_END, 0, 1);
}

export function getDesktopBlur(desktopOpacity: number): number {
  return 20 * (1 - desktopOpacity);
}

export function getDesktopScale(desktopOpacity: number): number {
  return 1.02 - desktopOpacity * 0.02;
}

export function getHeroTranslateY(heroOpacity: number): number {
  return -20 * (1 - heroOpacity);
}

export function getDesktopTranslateY(desktopOpacity: number): number {
  return 20 * (1 - desktopOpacity);
}

export function getSequenceLayerOpacity(progress: number): number {
  const desktopOpacity = getDesktopOpacity(progress);
  return clamp(1 - desktopOpacity * 1.15, 0, 1);
}

export function isDesktopInteractive(desktopOpacity: number): boolean {
  return desktopOpacity > DESKTOP_INTERACTIVE_THRESHOLD;
}

export function isHeroHidden(heroOpacity: number): boolean {
  return heroOpacity <= 0.02;
}

export type ScrollVisualState = {
  progress: number;
  frameIndex: number;
  heroOpacity: number;
  heroTranslateY: number;
  desktopOpacity: number;
  desktopBlur: number;
  desktopScale: number;
  desktopTranslateY: number;
  layerOpacity: number;
  heroHidden: boolean;
  desktopInteractive: boolean;
};

export function getScrollVisualState(
  progress: number,
  frameIndex: number,
): ScrollVisualState {
  const desktopOpacity = getDesktopOpacity(progress);
  const heroOpacity = getHeroOpacity(progress);

  return {
    progress,
    frameIndex,
    heroOpacity,
    heroTranslateY: getHeroTranslateY(heroOpacity),
    desktopOpacity,
    desktopBlur: getDesktopBlur(desktopOpacity),
    desktopScale: getDesktopScale(desktopOpacity),
    desktopTranslateY: getDesktopTranslateY(desktopOpacity),
    layerOpacity: getSequenceLayerOpacity(progress),
    heroHidden: isHeroHidden(heroOpacity),
    desktopInteractive: isDesktopInteractive(desktopOpacity),
  };
}
