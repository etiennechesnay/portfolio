import { render, screen } from "~/test-utils";
import { describe, it, expect, vi } from "vitest";

import PortfolioSection from "./PortfolioSection";

// Mock CarouselFreeScroll since it's complex
vi.mock("../CarouselFreeScroll", () => ({
  default: ({ projects }: { projects: { title: string }[] }) => (
    <div data-testid="carousel">
      {projects.map((p, i) => (
        <div key={i} data-testid="project-card">
          {p.title}
        </div>
      ))}
    </div>
  ),
}));

// Mock FloatingParticles
vi.mock("../FloatingParticles", () => ({
  default: () => <div data-testid="floating-particles" />,
}));

// Mock AnimatedSection to just render children
vi.mock("../AnimatedSection", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock SectionTitle
vi.mock("../SectionTitle", () => ({
  default: ({ id, title }: { id: string; title: string }) => (
    <h2 id={id}>{title}</h2>
  ),
}));

// Mock image imports
vi.mock("~/assets/portfolio-cards/canalplus.png", () => ({
  default: "canalplus.png",
}));
vi.mock("~/assets/portfolio-cards/canalplus_tv.png", () => ({
  default: "canalplus_tv.png",
}));
vi.mock("~/assets/portfolio-cards/f1memo.png", () => ({
  default: "f1memo.png",
}));
vi.mock("~/assets/portfolio-cards/shadow.png", () => ({
  default: "shadow.png",
}));
vi.mock("~/assets/portfolio-cards/stonal.png", () => ({
  default: "stonal.png",
}));

describe("PortfolioSection", () => {
  it("should render the section with correct aria-labelledby", () => {
    render(<PortfolioSection />);

    const section = document.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "portfolio-heading");
  });

  it("should render the section title", () => {
    render(<PortfolioSection />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render FloatingParticles with white color", () => {
    render(<PortfolioSection />);

    expect(screen.getByTestId("floating-particles")).toBeInTheDocument();
  });

  it("should render the carousel with projects", () => {
    render(<PortfolioSection />);

    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("should pass 5 projects to carousel", () => {
    render(<PortfolioSection />);

    const projectCards = screen.getAllByTestId("project-card");
    expect(projectCards).toHaveLength(5);
  });

  it("should have full screen height", () => {
    render(<PortfolioSection />);

    const section = document.querySelector("section");
    expect(section).toHaveClass("h-screen");
  });

  it("should have gradient background", () => {
    render(<PortfolioSection />);

    const section = document.querySelector("section");
    expect(section).toHaveClass("bg-gradient-to-b");
  });
});
