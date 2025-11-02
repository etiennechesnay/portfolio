import { defaultLocale, type Locale, isValidLocale } from "./config";

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
