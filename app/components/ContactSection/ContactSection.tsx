import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

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
              <a
                href="mailto:etiennechesnaypro@proton.me"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-white focus:outline-none text-white font-semibold rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {t("contact.email")}
              </a>

              <a
                href="https://www.linkedin.com/in/etienne-chesnay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-linkedin hover:bg-linkedin-hover focus:ring-2 focus:ring-white focus:outline-none text-white font-semibold rounded-lg transition-colors"
                aria-label={`${t("contact.linkedin")} (opens in new window)`}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {t("contact.linkedin")}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
