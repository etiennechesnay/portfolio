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
            className="relative text-4xl font-bold pt-28 pb-12 text-white text-center z-10"
          >
            {t("contact.title")}
          </h2>
          <span
            className="absolute text-[120px] lg:text-[180px] font-black opacity-10 uppercase top-28 left-1/2 -translate-x-1/2 z-0 pointer-events-none blur-sm"
            aria-hidden="true"
          >
            {t("contact.title")}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-20">
          <div className="max-w-2xl w-full">
            <p className="text-xl text-white/80 text-center mb-3">
              {t("contact.description.get_in_touch")}
            </p>
            <p className="text-xl text-white/80 text-center mb-12">
              {t("contact.description.connect")}
            </p>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <ContactButton
                type="email"
                href="mailto:etiennechesnaypro@proton.me"
              >
                <IconEmail className="w-6 h-6" aria-hidden="true" />
                {t("contact.email")}
              </ContactButton>

              <ContactButton
                type="linkedin"
                href="https://www.linkedin.com/in/etienne-chesnay"
                ariaLabel={`${t("contact.linkedin")} (opens in new window)`}
              >
                <IconLinkedin className="w-6 h-6" aria-hidden="true" />
                {t("contact.linkedin")}
              </ContactButton>

              <ContactButton
                type="github"
                href="https://github.com/etiennechesnay"
                ariaLabel={`${t("contact.github")} (opens in new window)`}
              >
                <IconGithub className="w-6 h-6" aria-hidden="true" />
                {t("contact.github")}
              </ContactButton>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
