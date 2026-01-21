import { render, screen, waitFor, fireEvent } from "~/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import ProjectCard from "./ProjectCard";

describe("ProjectCard", () => {
  const defaultProps = {
    title: "Test Project",
    description: "A test project description",
    technologies: ["React", "TypeScript"],
    image: "https://example.com/image.png",
    href: "https://example.com",
  };

  it("should render a link to the project", () => {
    render(<ProjectCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("should open in a new tab", () => {
    render(<ProjectCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should have accessible aria-label", () => {
    render(<ProjectCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label");
    expect(link.getAttribute("aria-label")).toContain("Test Project");
  });

  it("should render the project image", () => {
    render(<ProjectCard {...defaultProps} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://example.com/image.png");
    expect(image).toHaveAttribute("alt", "Test Project project screenshot");
  });

  it("should render project title in details panel", () => {
    render(<ProjectCard {...defaultProps} />);

    // Title is rendered but in an aria-hidden container when not hovered
    const heading = document.querySelector("h3");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Project");
  });

  it("should render project description", () => {
    render(<ProjectCard {...defaultProps} />);

    expect(screen.getByText("A test project description")).toBeInTheDocument();
  });

  it("should render all technologies", () => {
    render(<ProjectCard {...defaultProps} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("should have details panel with aria-hidden attribute", () => {
    render(<ProjectCard {...defaultProps} />);

    // Details panel has aria-hidden attribute for accessibility
    const detailsPanel = document.querySelector("[aria-hidden]");
    expect(detailsPanel).toBeInTheDocument();

    // Initially hidden when not hovered
    expect(detailsPanel).toHaveAttribute("aria-hidden", "true");
  });

  it("should handle focus events", async () => {
    const user = userEvent.setup();

    render(<ProjectCard {...defaultProps} />);

    await user.tab();

    expect(screen.getByRole("link")).toHaveFocus();
  });

  it("should work with reduced motion", () => {
    render(<ProjectCard {...defaultProps} />, { reduceMotion: true });

    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should render with default placeholder image when none provided", () => {
    const propsWithoutImage = {
      ...defaultProps,
      image: undefined as unknown as string,
    };

    // The component has a default, so this should still work
    render(<ProjectCard {...propsWithoutImage} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/600x400");
  });

  it("should have proper styling classes", () => {
    render(<ProjectCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("block", "cursor-pointer");
  });

  it("should have inner motion container with tabindex -1", () => {
    render(<ProjectCard {...defaultProps} />);

    // The motion.div has tabindex=-1 for focus management
    const cardContainer = document.querySelector("[tabindex='-1']");
    expect(cardContainer).toBeInTheDocument();
  });

  it("should have image and details containers", () => {
    render(<ProjectCard {...defaultProps} />);

    // Both the image and details containers should exist
    const containers = document.querySelectorAll(".absolute.inset-0");
    expect(containers.length).toBeGreaterThanOrEqual(2);
  });

  it("should have gradient overlay on image", () => {
    render(<ProjectCard {...defaultProps} />);

    const gradientOverlay = document.querySelector(".bg-gradient-to-t");
    expect(gradientOverlay).toBeInTheDocument();
  });

  it("should have glassmorphism effect on details", () => {
    render(<ProjectCard {...defaultProps} />);

    const glassEffect = document.querySelector(".backdrop-blur-xl");
    expect(glassEffect).toBeInTheDocument();
  });
});
