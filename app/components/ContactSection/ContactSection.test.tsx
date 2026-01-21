import { render, screen } from "~/test-utils";
import { describe, it, expect, vi } from "vitest";

import ContactSection from "./ContactSection";

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

// Mock ContactButton
vi.mock("../ContactButton", () => ({
  default: ({
    type,
    href,
    children,
  }: {
    type: string;
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} data-testid={`contact-button-${type}`}>
      {children}
    </a>
  ),
}));

// Mock SVG imports
vi.mock("~/assets/svg/icon-email.svg?react", () => ({
  default: () => <svg data-testid="icon-email" />,
}));
vi.mock("~/assets/svg/icon-linkedin.svg?react", () => ({
  default: () => <svg data-testid="icon-linkedin" />,
}));
vi.mock("~/assets/svg/icon-github.svg?react", () => ({
  default: () => <svg data-testid="icon-github" />,
}));

describe("ContactSection", () => {
  it("should render the section with correct aria-labelledby", () => {
    render(<ContactSection />);

    const section = document.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "contact-heading");
  });

  it("should render the section title", () => {
    render(<ContactSection />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render FloatingParticles", () => {
    render(<ContactSection />);

    expect(screen.getByTestId("floating-particles")).toBeInTheDocument();
  });

  it("should render email button", () => {
    render(<ContactSection />);

    const emailButton = screen.getByTestId("contact-button-email");
    expect(emailButton).toBeInTheDocument();
    expect(emailButton).toHaveAttribute("href", "mailto:etiennechesnaypro@proton.me");
  });

  it("should render LinkedIn button", () => {
    render(<ContactSection />);

    const linkedInButton = screen.getByTestId("contact-button-linkedin");
    expect(linkedInButton).toBeInTheDocument();
    expect(linkedInButton).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/etienne-chesnay"
    );
  });

  it("should render GitHub button", () => {
    render(<ContactSection />);

    const githubButton = screen.getByTestId("contact-button-github");
    expect(githubButton).toBeInTheDocument();
    expect(githubButton).toHaveAttribute(
      "href",
      "https://github.com/etiennechesnay"
    );
  });

  it("should render contact description paragraphs", () => {
    render(<ContactSection />);

    const paragraphs = document.querySelectorAll("p");
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  });

  it("should have full screen height", () => {
    render(<ContactSection />);

    const section = document.querySelector("section");
    expect(section).toHaveClass("h-screen");
  });

  it("should have gradient background", () => {
    render(<ContactSection />);

    const section = document.querySelector("section");
    expect(section).toHaveClass("bg-gradient-to-b");
  });

  it("should render all contact icons", () => {
    render(<ContactSection />);

    expect(screen.getByTestId("icon-email")).toBeInTheDocument();
    expect(screen.getByTestId("icon-linkedin")).toBeInTheDocument();
    expect(screen.getByTestId("icon-github")).toBeInTheDocument();
  });
});
