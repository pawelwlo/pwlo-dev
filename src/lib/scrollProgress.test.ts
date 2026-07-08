import { describe, expect, it } from "vitest";

import { getScrollProgress, getScrollVisualState } from "@/lib/scrollProgress";

describe("scrollProgress", () => {
  it("locks the desktop before 10% scroll progress", () => {
    const state = getScrollVisualState(0.08, 3);

    expect(state.desktopOpacity).toBe(0);
    expect(state.desktopInteractive).toBe(false);
  });

  it("reveals the desktop between 10% and 70% scroll progress", () => {
    const midState = getScrollVisualState(0.4, 15);

    expect(midState.desktopOpacity).toBeGreaterThan(0);
    expect(midState.desktopOpacity).toBeLessThan(1);
    expect(midState.desktopBlur).toBeGreaterThan(0);
    expect(midState.heroOpacity).toBeGreaterThan(0);
  });

  it("fully reveals the desktop at 70% scroll progress", () => {
    const state = getScrollVisualState(0.7, 27);

    expect(state.desktopOpacity).toBe(1);
    expect(state.desktopBlur).toBe(0);
    expect(state.desktopScale).toBe(1);
    expect(state.heroOpacity).toBe(0);
    expect(state.desktopInteractive).toBe(true);
    expect(state.layerOpacity).toBe(0);
  });

  it("maps container metrics to scroll progress", () => {
    const progress = getScrollProgress(-920, 2160, 900);

    expect(progress).toBeGreaterThan(0.74);
  });
});
