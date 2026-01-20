import { useTranslation } from "react-i18next";

import AnimatedSection from "../AnimatedSection";
import ContactButton from "../ContactButton";
import FloatingParticles from "../FloatingParticles";
import SectionTitle from "../SectionTitle";

import IconEmail from "~/assets/svg/icon-email.svg?react";
import IconGithub from "~/assets/svg/icon-github.svg?react";
import IconLinkedin from "~/assets/svg/icon-linkedin.svg?react";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full h-screen bg-gradient-to-b from-blue-700 to-blue-900 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <FloatingParticles count={4} color="blue" />
      <AnimatedSection>
        <SectionTitle id="contact-heading" title={t("contact.title")} />

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-2xl w-full">
            <p className="text-base sm:text-lg md:text-xl text-white/80 text-center mb-2 sm:mb-3">
              {t("contact.description.get_in_touch")}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white/80 text-center mb-8 sm:mb-10 md:mb-12">
              {t("contact.description.connect")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <ContactButton
                type="email"
                href="mailto:etiennechesnaypro@proton.me"
              >
                <IconEmail className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                {t("contact.email")}
              </ContactButton>

              <ContactButton
                type="linkedin"
                href="https://www.linkedin.com/in/etienne-chesnay"
                ariaLabel={`${t("contact.linkedin")} (${t("accessibility.opensInNewWindow")})`}
              >
                <IconLinkedin className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                {t("contact.linkedin")}
              </ContactButton>

              <ContactButton
                type="github"
                href="https://github.com/etiennechesnay"
                ariaLabel={`${t("contact.github")} (${t("accessibility.opensInNewWindow")})`}
              >
                <IconGithub className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                {t("contact.github")}
              </ContactButton>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
