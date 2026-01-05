import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { LinksFunction } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import "./app.css";
import "./i18n/config";
import LanguageHandler from "./components/LanguageHandler";
import { MotionProvider } from "./contexts/MotionContext";
import { getLocaleFromPathname } from "./i18n/utils";

// eslint-disable-next-line react-refresh/only-export-components
export const links: LinksFunction = () => [
  { rel: "icon", type: "image/png", href: "/favicon.png" },
];

export default function Root() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const locale = getLocaleFromPathname(location.pathname);

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MotionProvider>
          <LanguageHandler>
            <Outlet />
          </LanguageHandler>
        </MotionProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
