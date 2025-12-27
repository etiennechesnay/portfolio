import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import FlagFrance from "~/assets/svg/flag-france.svg?react";
import FlagSpain from "~/assets/svg/flag-spain.svg?react";
import FlagUK from "~/assets/svg/flag-uk.svg?react";
import { supportedLocales, type Locale } from "~/i18n/config";
import { getPathnameWithLocale, getLocaleFromPathname } from "~/i18n/utils";

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
  const [alignRight, setAlignRight] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
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

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Check if tooltip overflows viewport
  useEffect(() => {
    if (isOpen && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const overflowsRight = rect.right > window.innerWidth;
      setAlignRight(overflowsRight);
    }
  }, [isOpen]);

  const CurrentFlag = FLAGS[currentLocale];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-text rounded"
        aria-label={t("languageSwitcher.changeLanguage")}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="language-dropdown"
      >
        <CurrentFlag
          className="w-8 h-8 saturate-75 brightness-105"
          aria-label={`Current language: ${currentLocale}`}
        />
      </button>

      {isOpen && (
        <div
          ref={tooltipRef}
          className={`absolute top-full mt-3 ${
            alignRight ? "right-0" : "left-1/2 -translate-x-1/2"
          }`}
        >
          {/* Arrow pointing up */}
          <div
            className={`absolute -top-2 w-4 h-4 bg-white rotate-45 shadow-lg ${
              alignRight ? "right-3" : "left-1/2 -translate-x-1/2"
            }`}
            aria-hidden="true"
          ></div>
          {/* Dropdown content */}
          <div
            id="language-dropdown"
            role="menu"
            className="relative bg-white rounded-2xl shadow-lg px-2 py-2 flex gap-2"
          >
            {supportedLocales
              .filter((locale) => locale !== currentLocale)
              .map((locale) => {
                const FlagComponent = FLAGS[locale];
                return (
                  <button
                    key={locale}
                    onClick={() => changeLanguage(locale)}
                    className="p-1 cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary-text rounded"
                    aria-label={t("languageSwitcher.switchTo", { locale })}
                    role="menuitem"
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
