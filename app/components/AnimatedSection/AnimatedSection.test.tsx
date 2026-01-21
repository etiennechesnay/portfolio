import { render, screen } from "~/test-utils";
import { describe, it, expect } from "vitest";

import AnimatedSection from "./AnimatedSection";

describe("AnimatedSection", () => {
  it("should render children", () => {
    render(
      <AnimatedSection>
        <div data-testid="child">Child content</div>
      </AnimatedSection>
    );

    expect(screen.getByTestId("child")).toHaveTextContent("Child content");
  });

  it("should apply default className", () => {
    render(
      <AnimatedSection>
        <div>Content</div>
      </AnimatedSection>
    );

    const section = screen.getByText("Content").parentElement;
    expect(section).toHaveClass("w-full", "h-full", "flex", "flex-col");
  });

  it("should apply custom className", () => {
    render(
      <AnimatedSection className="custom-class">
        <div>Content</div>
      </AnimatedSection>
    );

    const section = screen.getByText("Content").parentElement;
    expect(section).toHaveClass("custom-class");
  });

  it("should render with reduced motion", () => {
    render(
      <AnimatedSection>
        <div data-testid="child">Content</div>
      </AnimatedSection>,
      { reduceMotion: true }
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should render with normal motion", () => {
    render(
      <AnimatedSection>
        <div data-testid="child">Content</div>
      </AnimatedSection>,
      { reduceMotion: false }
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
