import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./app.css";
import "./i18n/config";
import { getLocaleFromPathname } from "./i18n/utils";
import LanguageHandler from "./components/LanguageHandler";

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
        <LanguageHandler>
          <Outlet />
        </LanguageHandler>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
