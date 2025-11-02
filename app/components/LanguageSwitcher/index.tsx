import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { supportedLocales, type Locale } from "~/i18n/config";
import { getPathnameWithLocale, getLocaleFromPathname } from "~/i18n/utils";
import FlagUK from "~/assets/svg/flag-uk.svg?react";
import FlagFrance from "~/assets/svg/flag-france.svg?react";
import FlagSpain from "~/assets/svg/flag-spain.svg?react";

const FLAGS: Record<
  Locale,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  en: FlagUK,
  fr: FlagFrance,
  es: FlagSpain,
};

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLocale = getLocaleFromPathname(location.pathname);

  const changeLanguage = (locale: Locale) => {
    const newPathname = getPathnameWithLocale(location.pathname, locale);
    i18n.changeLanguage(locale);
    navigate(newPathname);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const CurrentFlag = FLAGS[currentLocale];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:scale-110 transition-transform cursor-pointer"
        aria-label="Change language"
      >
        <CurrentFlag className="w-8 h-8 saturate-75 brightness-105" />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-3">
          {/* Arrow pointing up */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
          {/* Dropdown content */}
          <div className="relative bg-white rounded-2xl shadow-lg px-2 py-2 flex gap-2">
            {supportedLocales
              .filter((locale) => locale !== currentLocale)
              .map((locale) => {
                const FlagComponent = FLAGS[locale];
                return (
                  <button
                    key={locale}
                    onClick={() => changeLanguage(locale)}
                    className="p-1 cursor-pointer hover:scale-110 transition-transform"
                    aria-label={`Switch to ${locale}`}
                  >
                    <FlagComponent className="w-6 h-6 saturate-75 brightness-105" />
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
