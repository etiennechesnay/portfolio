import { describe, it, expect } from "vitest";

import {
  isValidLocale,
  defaultLocale,
  supportedLocales,
  type Locale,
} from "./config";

describe("i18n/config", () => {
  describe("defaultLocale", () => {
    it("should be 'en'", () => {
      expect(defaultLocale).toBe("en");
    });
  });

  describe("supportedLocales", () => {
    it("should contain en, fr, and es", () => {
      expect(supportedLocales).toEqual(["en", "fr", "es"]);
    });

    it("should have exactly 3 locales", () => {
      expect(supportedLocales).toHaveLength(3);
    });
  });

  describe("isValidLocale", () => {
    it("should return true for 'en'", () => {
      expect(isValidLocale("en")).toBe(true);
    });

    it("should return true for 'fr'", () => {
      expect(isValidLocale("fr")).toBe(true);
    });

    it("should return true for 'es'", () => {
      expect(isValidLocale("es")).toBe(true);
    });

    it("should return false for unsupported locale 'de'", () => {
      expect(isValidLocale("de")).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(isValidLocale("")).toBe(false);
    });

    it("should return false for invalid locale 'english'", () => {
      expect(isValidLocale("english")).toBe(false);
    });

    it("should return false for uppercase locale 'EN'", () => {
      expect(isValidLocale("EN")).toBe(false);
    });

    it("should work as a type guard", () => {
      const locale: string = "fr";
      if (isValidLocale(locale)) {
        // TypeScript should narrow the type to Locale
        const typedLocale: Locale = locale;
        expect(typedLocale).toBe("fr");
      }
    });
  });
});
