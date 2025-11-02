import { useTranslation } from "react-i18next";

export default function Welcome() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen w-full bg-primary-bg flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-primary-text mb-4">
          {t("firstName")}{" "}
          <span className="text-primary-text opacity-80">{t("lastName")}</span>
        </h1>
        <p className="text-2xl md:text-4xl text-primary-text font-light opacity-90">
          {t("jobTitle")}
        </p>
      </div>
    </section>
  );
}
