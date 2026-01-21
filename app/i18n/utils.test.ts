import { describe, it, expect } from "vitest";

import {
  getTranslation,
  getLocaleFromPathname,
  getPathnameWithoutLocale,
  getPathnameWithLocale,
} from "./utils";

describe("i18n/utils", () => {
  describe("getTranslation", () => {
    it("should return translation for simple key", () => {
      const result = getTranslation("en", "firstName");
      expect(result).toBe("Etienne");
    });

    it("should return translation for nested key", () => {
      const result = getTranslation("en", "portfolio.title");
      expect(result).toBe("Portfolio");
    });

    it("should return translation for deeply nested key", () => {
      const result = getTranslation("en", "contact.description.get_in_touch");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should return empty string for non-existent key", () => {
      const result = getTranslation("en", "nonExistent.key");
      expect(result).toBe("");
    });

    it("should return empty string for partially valid path", () => {
      const result = getTranslation("en", "portfolio.nonExistent");
      expect(result).toBe("");
    });

    it("should return translation for French locale", () => {
      const result = getTranslation("fr", "firstName");
      expect(result).toBe("Etienne");
    });

    it("should return translation for Spanish locale", () => {
      const result = getTranslation("es", "firstName");
      expect(result).toBe("Etienne");
    });

    it("should return empty string when key leads to object not string", () => {
      // "portfolio" is an object, not a string
      const result = getTranslation("en", "portfolio");
      expect(result).toBe("");
    });
  });

  describe("getLocaleFromPathname", () => {
    it("should return 'en' for root path /", () => {
      expect(getLocaleFromPathname("/")).toBe("en");
    });

    it("should return 'en' for path without locale", () => {
      expect(getLocaleFromPathname("/about")).toBe("en");
    });

    it("should return 'fr' for French path", () => {
      expect(getLocaleFromPathname("/fr")).toBe("fr");
    });

    it("should return 'fr' for French path with subpath", () => {
      expect(getLocaleFromPathname("/fr/about")).toBe("fr");
    });

    it("should return 'es' for Spanish path", () => {
      expect(getLocaleFromPathname("/es")).toBe("es");
    });

    it("should return 'es' for Spanish path with subpath", () => {
      expect(getLocaleFromPathname("/es/contact")).toBe("es");
    });

    it("should return default locale for invalid locale in path", () => {
      expect(getLocaleFromPathname("/de/about")).toBe("en");
    });

    it("should return default locale for empty string", () => {
      expect(getLocaleFromPathname("")).toBe("en");
    });
  });

  describe("getPathnameWithoutLocale", () => {
    it("should return same path for root /", () => {
      expect(getPathnameWithoutLocale("/")).toBe("/");
    });

    it("should return same path for English (default locale)", () => {
      expect(getPathnameWithoutLocale("/about")).toBe("/about");
    });

    it("should remove French locale prefix", () => {
      expect(getPathnameWithoutLocale("/fr")).toBe("/");
    });

    it("should remove French locale prefix from subpath", () => {
      expect(getPathnameWithoutLocale("/fr/about")).toBe("/about");
    });

    it("should remove Spanish locale prefix", () => {
      expect(getPathnameWithoutLocale("/es")).toBe("/");
    });

    it("should remove Spanish locale prefix from subpath", () => {
      expect(getPathnameWithoutLocale("/es/contact")).toBe("/contact");
    });

    it("should return / for empty result after removing locale", () => {
      expect(getPathnameWithoutLocale("/fr")).toBe("/");
    });
  });

  describe("getPathnameWithLocale", () => {
    it("should return path without prefix for default locale (en)", () => {
      expect(getPathnameWithLocale("/", "en")).toBe("/");
    });

    it("should return path without prefix for default locale with subpath", () => {
      expect(getPathnameWithLocale("/about", "en")).toBe("/about");
    });

    it("should add French locale prefix", () => {
      expect(getPathnameWithLocale("/", "fr")).toBe("/fr/");
    });

    it("should add French locale prefix to subpath", () => {
      expect(getPathnameWithLocale("/about", "fr")).toBe("/fr/about");
    });

    it("should add Spanish locale prefix", () => {
      expect(getPathnameWithLocale("/", "es")).toBe("/es/");
    });

    it("should add Spanish locale prefix to subpath", () => {
      expect(getPathnameWithLocale("/contact", "es")).toBe("/es/contact");
    });

    it("should handle switching from fr to es", () => {
      expect(getPathnameWithLocale("/fr/about", "es")).toBe("/es/about");
    });

    it("should handle switching from es to en", () => {
      expect(getPathnameWithLocale("/es/about", "en")).toBe("/about");
    });

    it("should handle switching from fr to en", () => {
      expect(getPathnameWithLocale("/fr/contact", "en")).toBe("/contact");
    });
  });
});
