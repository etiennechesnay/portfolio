import { useEffect, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
import { isValidLocale, defaultLocale } from "~/i18n/config";

interface LanguageHandlerProps {
  children: ReactNode;
}

export default function LanguageHandler({ children }: LanguageHandlerProps) {
  const navigate = useNavigate();
  const params = useParams();
  const lang = params.lang;

  useEffect(() => {
    // Si un paramètre de langue est présent mais invalide, rediriger vers /
    if (lang && !isValidLocale(lang)) {
      navigate("/", { replace: true });
      return;
    }

    // Si la langue est 'en' (défaut), rediriger vers / pour éviter /en/
    if (lang === defaultLocale) {
      navigate("/", { replace: true });
      return;
    }
  }, [lang, navigate]);

  return <>{children}</>;
}
