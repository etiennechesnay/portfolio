import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import CarouselFreeScroll from "../CarouselFreeScroll";

import canalPlusImage from "~/assets/portfolio-cards/canalplus.png";
import canalPlusTVImage from "~/assets/portfolio-cards/canalplus_tv.png";
import f1memoImage from "~/assets/portfolio-cards/f1memo.png";
import shadowImage from "~/assets/portfolio-cards/shadow.png";
import stonalImage from "~/assets/portfolio-cards/stonal.png";
import { useMotionPreference } from "~/contexts/MotionContext";

export default function PortfolioSection() {
  const { t } = useTranslation();
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();

  const projectsData = [
    {
      title: t("portfolio.f1memo.title"),
      description: t("portfolio.f1memo.description"),
      technologies: [
        "React",
        "Typescript",
        "Tailwind CSS",
        "React-Router",
        "Vercel",
      ],
      image: f1memoImage,
      href: "https://www.f1memo.com",
    },
    {
      title: t("portfolio.canalplus.title"),
      description: t("portfolio.canalplus.description"),
      technologies: [
        "React",
        "Typescript",
        "Redux",
        "Webpack",
        "Lerna",
        "Jest",
      ],
      image: canalPlusImage,
      href: "https://www.canalplus.com",
    },
    {
      title: t("portfolio.canalplusTv.title"),
      description: t("portfolio.canalplusTv.description"),
      technologies: ["React", "Typescript", "Redux", "Webpack"],
      image: canalPlusTVImage,
      href: "https://www.canalplus.com",
    },
    {
      title: t("portfolio.shadow.title"),
      description: t("portfolio.shadow.description"),
      technologies: ["React", "Typescript", "Next.Js", "Jest", "GitlabCI"],
      image: shadowImage,
      href: "https://shadow.tech",
    },
    {
      title: t("portfolio.stonal.title"),
      description: t("portfolio.stonal.description"),
      technologies: ["React", "Typescript", "Angular", "Vite", "Redux"],
      image: stonalImage,
      href: "https://www.stonal.com",
    },
  ];
  return (
    <section
      className="relative w-full h-screen bg-gradient-to-b from-blue-wave to-blue-600"
      aria-labelledby="portfolio-heading"
    >
      {/* Portfolio Section */}
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
            id="portfolio-heading"
            className="relative text-2xl sm:text-3xl md:text-4xl font-bold pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-12 text-white text-center z-10"
          >
            {t("portfolio.title")}
          </h2>
          <span
            className="absolute text-[80px] sm:text-[100px] md:text-[120px] lg:text-[180px] font-black opacity-10 uppercase top-20 sm:top-24 md:top-28 left-1/2 -translate-x-1/2 z-0 pointer-events-none blur-sm"
            aria-hidden="true"
          >
            {t("portfolio.title")}
          </span>
        </div>
        <div className="flex-1 relative">
          <CarouselFreeScroll projects={projectsData} />
        </div>
      </motion.div>
    </section>
  );
}
