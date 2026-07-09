import { describe, expect, it } from "vitest";

import {
  generateGloss,
  generateGradient,
  generateShadow,
  getIconCssVariables,
  resolveIosTint,
} from "@/lib/iosGloss";

describe("iosGloss", () => {
  it("generates pastel gradients", () => {
    expect(generateGradient("#4DA3FF", "#A8D4FF")).toContain("linear-gradient");
    expect(generateGradient("#4DA3FF", "#A8D4FF")).toContain("#4DA3FF");
  });

  it("generates gloss and shadow utilities", () => {
    expect(generateGloss()).toContain("rgba(255, 255, 255, 0.35)");
    expect(generateShadow("icon")).toContain("inset 0 1px 2px");
    expect(generateShadow("dock")).toContain("0 20px 44px");
  });

  it("maps legacy tint classes and exposes css variables", () => {
    expect(resolveIosTint("os-icon-tint-blue")).toBe("blue");
    expect(getIconCssVariables("pink")).toMatchObject({
      "--ios-icon-gradient": expect.stringContaining("#FF7FBF"),
      "--ios-icon-shadow": expect.stringContaining("0 6px 18px"),
    });
  });
});
