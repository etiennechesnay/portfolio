import { render, screen } from "~/test-utils";
import { describe, it, expect, vi } from "vitest";

import SkillsSection from "./SkillsSection";

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

// Mock SkillCard
vi.mock("../SkillCard", () => ({
  default: ({ name }: { name: string }) => (
    <li data-testid="skill-card">{name}</li>
  ),
}));

describe("SkillsSection", () => {
  it("should render the section with correct aria-labelledby", () => {
    render(<SkillsSection />);

    const section = document.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "skills-heading");
  });

  it("should render the section title", () => {
    render(<SkillsSection />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render FloatingParticles", () => {
    render(<SkillsSection />);

    expect(screen.getByTestId("floating-particles")).toBeInTheDocument();
  });

  it("should render skill cards", () => {
    render(<SkillsSection />);

    const skillCards = screen.getAllByTestId("skill-card");
    expect(skillCards.length).toBeGreaterThan(0);
  });

  it("should render 16 skills", () => {
    render(<SkillsSection />);

    const skillCards = screen.getAllByTestId("skill-card");
    expect(skillCards).toHaveLength(16);
  });

  it("should render React skill", () => {
    render(<SkillsSection />);

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("should render TypeScript skill", () => {
    render(<SkillsSection />);

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("should have full screen height", () => {
    render(<SkillsSection />);

    const section = document.querySelector("section");
    expect(section).toHaveClass("h-screen");
  });

  it("should render skills as a list", () => {
    render(<SkillsSection />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
