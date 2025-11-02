import { useTranslation } from "react-i18next";
import Welcome from "~/components/Welcome";
import Header from "~/components/Header";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Welcome />

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-6 bg-slate-800"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {t("about.title")}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t("about.description")}
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center px-6 bg-slate-900"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            {t("projects.title")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards will go here */}
            <div className="bg-slate-800 p-6 rounded-lg hover:transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-semibold text-white mb-3">
                {t("projects.project1.title")}
              </h3>
              <p className="text-slate-300 mb-4">
                {t("projects.project1.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-6 bg-slate-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            {t("contact.description")}
          </p>
          {/* Contact form or links will go here */}
        </div>
      </section>
    </>
  );
}
