import { useTranslation } from "react-i18next";

import AnimatedSection from "../AnimatedSection";
import CarouselFreeScroll from "../CarouselFreeScroll";
import FloatingParticles from "../FloatingParticles";
import SectionTitle from "../SectionTitle";

import canalPlusImage from "~/assets/portfolio-cards/canalplus.png";
import canalPlusTVImage from "~/assets/portfolio-cards/canalplus_tv.png";
import f1memoImage from "~/assets/portfolio-cards/f1memo.png";
import shadowImage from "~/assets/portfolio-cards/shadow.png";
import stonalImage from "~/assets/portfolio-cards/stonal.png";

export default function PortfolioSection() {
  const { t } = useTranslation();

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
      className="relative w-full h-screen bg-gradient-to-b from-blue-wave to-blue-600 overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <FloatingParticles count={5} color="white" />
      <AnimatedSection>
        <SectionTitle id="portfolio-heading" title={t("portfolio.title")} />
        <div className="flex-1 relative">
          <CarouselFreeScroll projects={projectsData} />
        </div>
      </AnimatedSection>
    </section>
  );
}
