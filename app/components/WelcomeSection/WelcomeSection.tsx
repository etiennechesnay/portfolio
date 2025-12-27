import clsx from "clsx";
import { useScroll, useTransform, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { useTranslation } from "react-i18next";

import Wave from "~/components/Wave";

interface WelcomeSectionProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export default function WelcomeSection({
  scrollContainerRef,
}: WelcomeSectionProps) {
  const { t } = useTranslation();
  const [isFixed, setIsFixed] = useState(true);

  // Track scroll position du conteneur
  const { scrollY } = useScroll({
    container: scrollContainerRef,
  });

  // Le texte disparaît entre 40vh et 50vh
  const textOpacity = useTransform(
    scrollY,
    [
      0,
      typeof window !== "undefined" ? window.innerHeight * 0.3 : 300,
      typeof window !== "undefined" ? window.innerHeight * 0.4 : 400,
    ],
    [1, 1, 0]
  );

  // Vérifier si le bas de la section Welcome est arrivé au niveau du texte
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (typeof window !== "undefined") {
        // Quand scrollY atteint 40vh, on enlève le fixed
        setIsFixed(latest < window.innerHeight * 0.4);
      }
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <section className="relative w-full h-screen bg-primary-bg">
      {/* Texte qui passe de fixed à absolute quand Welcome arrive en bas */}
      <motion.div
        style={{ opacity: textOpacity }}
        className={clsx(
          "h-screen w-full flex items-center justify-center px-6 z-10 pointer-events-none",
          isFixed ? "fixed top-0 left-0" : "absolute top-0 left-0"
        )}
      >
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-primary-text mb-2 sm:mb-4 opacity-70">
            {t("firstName")}{" "}
            <span className="text-primary-text">{t("lastName")}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-primary-text font-light opacity-90">
            {t("jobTitle")}
          </p>
        </div>
      </motion.div>

      {/* Wave SVG en bas de la section */}
      <Wave
        className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
        scrollContainerRef={scrollContainerRef}
      />
    </section>
  );
}
