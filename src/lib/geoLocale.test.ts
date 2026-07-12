import { describe, expect, it } from "vitest";

import {
  getLocaleForCountry,
  getLocaleRedirectPath,
  localePreferenceCookieName,
} from "@/lib/geoLocale";

describe("getLocaleForCountry", () => {
  it("maps Poland to Polish", () => {
    expect(getLocaleForCountry("PL")).toBe("pl");
  });

  it("maps Germany, Austria, and Switzerland to German", () => {
    expect(getLocaleForCountry("DE")).toBe("de");
    expect(getLocaleForCountry("AT")).toBe("de");
    expect(getLocaleForCountry("CH")).toBe("de");
  });

  it("maps all other countries to English", () => {
    expect(getLocaleForCountry("US")).toBe("en");
    expect(getLocaleForCountry("FR")).toBe("en");
    expect(getLocaleForCountry(null)).toBe("en");
  });
});

describe("getLocaleRedirectPath", () => {
  it("redirects Poland visitors on the root path to Polish", () => {
    expect(getLocaleRedirectPath("/", "PL")).toBe("/pl/");
  });

  it("redirects DACH visitors on the root path to German", () => {
    expect(getLocaleRedirectPath("/", "AT")).toBe("/de/");
  });

  it("keeps other countries on English", () => {
    expect(getLocaleRedirectPath("/", "US")).toBeNull();
  });

  it("does not redirect explicit locale paths", () => {
    expect(getLocaleRedirectPath("/pl/", "US")).toBeNull();
    expect(getLocaleRedirectPath("/de/", "PL")).toBeNull();
  });

  it("respects a saved English preference over geo", () => {
    const cookie = `${localePreferenceCookieName}=en`;
    expect(getLocaleRedirectPath("/", "PL", cookie)).toBeNull();
  });

  it("respects a saved Polish preference when visiting the root path", () => {
    const cookie = `${localePreferenceCookieName}=pl`;
    expect(getLocaleRedirectPath("/", "US", cookie)).toBe("/pl/");
  });
});
