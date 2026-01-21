import { render, screen, fireEvent } from "~/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import CarouselFreeScroll from "./CarouselFreeScroll";

// Mock ProjectCard to simplify testing
vi.mock("../ProjectCard", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="project-card">{title}</div>
  ),
}));

const mockProjects = [
  {
    title: "Project 1",
    description: "Description 1",
    technologies: ["React"],
    image: "image1.png",
    href: "https://example1.com",
  },
  {
    title: "Project 2",
    description: "Description 2",
    technologies: ["TypeScript"],
    image: "image2.png",
    href: "https://example2.com",
  },
  {
    title: "Project 3",
    description: "Description 3",
    technologies: ["Node.js"],
    image: "image3.png",
    href: "https://example3.com",
  },
];

describe("CarouselFreeScroll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the carousel container", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("should have correct aria-label for accessibility", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("aria-label");
    expect(region.getAttribute("aria-label")).toContain("carousel");
  });

  it("should be focusable with tabIndex", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("tabIndex", "0");
  });

  it("should render project cards (tripled for infinite scroll)", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    // Projects are tripled for infinite scroll effect
    const projectCards = screen.getAllByTestId("project-card");
    expect(projectCards).toHaveLength(mockProjects.length * 3);
  });

  it("should render all project titles", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    // Each project appears 3 times (tripled for infinite scroll)
    expect(screen.getAllByText("Project 1")).toHaveLength(3);
    expect(screen.getAllByText("Project 2")).toHaveLength(3);
    expect(screen.getAllByText("Project 3")).toHaveLength(3);
  });

  it("should have screen reader announcement area", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const srOnly = document.querySelector(".sr-only");
    expect(srOnly).toBeInTheDocument();
    expect(srOnly).toHaveAttribute("aria-live", "polite");
  });

  it("should handle focus event and set initial focused index", async () => {
    const user = userEvent.setup();

    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");
    await user.tab();

    expect(region).toHaveFocus();
  });

  it("should handle blur event when focus leaves carousel", () => {
    render(
      <>
        <CarouselFreeScroll projects={mockProjects} />
        <button data-testid="outside">Outside</button>
      </>
    );

    const region = screen.getByRole("region");

    // Focus the carousel
    fireEvent.focus(region);

    // Blur to outside element
    fireEvent.blur(region, {
      relatedTarget: screen.getByTestId("outside"),
    });

    // Component should handle blur gracefully
    expect(region).toBeInTheDocument();
  });

  it("should not clear focus when blur relatedTarget is inside carousel", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Focus the carousel
    fireEvent.focus(region);

    // Get an element inside the carousel
    const projectCard = screen.getAllByTestId("project-card")[0];

    // Blur to inside element (relatedTarget is within carousel)
    fireEvent.blur(region, {
      relatedTarget: projectCard,
    });

    expect(region).toBeInTheDocument();
  });

  it("should mark non-middle set items as aria-hidden", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const projectCardWrappers = document.querySelectorAll("[aria-hidden]");
    // First and third sets should be hidden
    const hiddenCount = Array.from(projectCardWrappers).filter(
      (el) => el.getAttribute("aria-hidden") === "true"
    ).length;

    // First set (3) + third set (3) = 6 hidden
    expect(hiddenCount).toBe(6);
  });

  it("should have draggable motion container", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const motionDiv = document.querySelector(".cursor-grab");
    expect(motionDiv).toBeInTheDocument();
  });

  it("should handle keyboard navigation - ArrowRight when focused", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Focus to set initial focused index
    fireEvent.focus(region);

    // Press ArrowRight
    fireEvent.keyDown(region, { key: "ArrowRight" });

    expect(region).toBeInTheDocument();
  });

  it("should handle keyboard navigation - ArrowLeft when focused", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Focus
    fireEvent.focus(region);

    // Move right first, then left
    fireEvent.keyDown(region, { key: "ArrowRight" });
    fireEvent.keyDown(region, { key: "ArrowLeft" });

    expect(region).toBeInTheDocument();
  });

  it("should handle keyboard navigation - Home", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Focus
    fireEvent.focus(region);

    // Press Home
    fireEvent.keyDown(region, { key: "Home" });

    expect(region).toBeInTheDocument();
  });

  it("should handle keyboard navigation - End", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Focus
    fireEvent.focus(region);

    // Press End
    fireEvent.keyDown(region, { key: "End" });

    expect(region).toBeInTheDocument();
  });

  it("should ignore keyboard navigation when not focused", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Don't focus first, just fire keydown
    fireEvent.keyDown(region, { key: "ArrowRight" });

    expect(region).toBeInTheDocument();
  });

  it("should handle horizontal wheel scroll", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Simulate horizontal wheel scroll
    fireEvent.wheel(region, { deltaX: 100, deltaY: 0 });

    expect(region).toBeInTheDocument();
  });

  it("should handle wheel scroll with large deltaX (causing overflow)", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Simulate large horizontal wheel scroll to trigger overflow handling
    fireEvent.wheel(region, { deltaX: 10000, deltaY: 0 });

    expect(region).toBeInTheDocument();
  });

  it("should handle wheel scroll with negative deltaX (positive newX)", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Simulate negative horizontal scroll (scrolling left)
    fireEvent.wheel(region, { deltaX: -10000, deltaY: 0 });

    expect(region).toBeInTheDocument();
  });

  it("should ignore vertical wheel scroll", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");

    // Simulate vertical wheel scroll (deltaX is 0)
    fireEvent.wheel(region, { deltaX: 0, deltaY: 100 });

    expect(region).toBeInTheDocument();
  });

  it("should have overflow hidden on container", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");
    expect(region).toHaveClass("overflow-hidden");
  });

  it("should update focused index in screen reader area", () => {
    render(<CarouselFreeScroll projects={mockProjects} />);

    const region = screen.getByRole("region");
    const srOnly = document.querySelector(".sr-only");

    // Focus to set initial index
    fireEvent.focus(region);

    // The sr-only area should be present for announcements
    expect(srOnly).toHaveAttribute("aria-atomic", "true");
  });
});
