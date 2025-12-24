import { useRef } from "react";
import type { MetaFunction } from "react-router";

import ContactSection from "~/components/ContactSection";
import Header from "~/components/Header";
import PortfolioSection from "~/components/PortfolioSection";
import SkillsSection from "~/components/SkillsSection";
import WelcomeSection from "~/components/WelcomeSection";

// eslint-disable-next-line react-refresh/only-export-components
export const meta: MetaFunction = () => {
  return [{ title: "Etienne Chesnay" }];
};

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-primary-text focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <div className="snap-start">
          <WelcomeSection scrollContainerRef={scrollContainerRef} />
        </div>
        <div className="snap-start">
          <PortfolioSection />
        </div>
        <div className="snap-start">
          <SkillsSection />
        </div>
        <div className="snap-start">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
