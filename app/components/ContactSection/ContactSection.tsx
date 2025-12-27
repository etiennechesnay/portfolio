import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import ContactButton from "../ContactButton";

import IconEmail from "~/assets/svg/icon-email.svg?react";
import IconGithub from "~/assets/svg/icon-github.svg?react";
import IconLinkedin from "~/assets/svg/icon-linkedin.svg?react";
import { useMotionPreference } from "~/contexts/MotionContext";

export default function ContactSection() {
  const { t } = useTranslation();
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();

  return (
    <section
      className="relative w-full h-screen bg-gradient-to-b from-blue-700 to-blue-900"
      aria-labelledby="contact-heading"
    >
      {/* Contact Section */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.5 }
        }
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }
        }
        className="w-full h-full flex flex-col"
      >
        <div className="relative">
          <h2
            id="contact-heading"
            className="relative text-2xl sm:text-3xl md:text-4xl font-bold pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-12 text-white text-center z-10"
          >
            {t("contact.title")}
          </h2>
          <span
            className="absolute text-[80px] sm:text-[100px] md:text-[120px] lg:text-[180px] font-black opacity-10 uppercase top-20 sm:top-24 md:top-28 left-1/2 -translate-x-1/2 z-0 pointer-events-none blur-sm"
            aria-hidden="true"
          >
            {t("contact.title")}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-2xl w-full">
            <p className="text-base sm:text-lg md:text-xl text-white/80 text-center mb-2 sm:mb-3">
              {t("contact.description.get_in_touch")}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white/80 text-center mb-8 sm:mb-10 md:mb-12">
              {t("contact.description.connect")}
            </p>

            {/* Contact Buttons */}
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
      </motion.div>
    </section>
  );
}
