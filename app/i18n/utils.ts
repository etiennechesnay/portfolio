import { defaultLocale, type Locale, isValidLocale } from "./config";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";

const translations = {
  en,
  fr,
  es,
};

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return typeof value === "string" ? value : "";
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const potentialLocale = segments[0];

  if (isValidLocale(potentialLocale)) {
    return potentialLocale as Locale;
  }

  return defaultLocale;
}

export function getPathnameWithoutLocale(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);

  if (locale === defaultLocale) {
    return pathname;
  }

  return pathname.replace(`/${locale}`, "") || "/";
}

export function getPathnameWithLocale(
  pathname: string,
  locale: Locale
): string {
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);

  if (locale === defaultLocale) {
    return pathnameWithoutLocale;
  }

  return `/${locale}${pathnameWithoutLocale}`;
}
