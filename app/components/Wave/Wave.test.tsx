import { render, screen } from "~/test-utils";
import { describe, it, expect } from "vitest";
import { createRef } from "react";

import Wave from "./Wave";

describe("Wave", () => {
  it("should render an SVG element", () => {
    render(<Wave />);

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should have aria-hidden for decorative purpose", () => {
    render(<Wave />);

    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("should have presentation role", () => {
    render(<Wave />);

    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("role", "presentation");
  });

  it("should apply custom className", () => {
    render(<Wave className="custom-class" />);

    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("custom-class");
  });

  it("should render three wave paths", () => {
    render(<Wave />);

    const paths = document.querySelectorAll("svg path");
    // 2 motion.path + 1 regular path = 3 paths
    expect(paths.length).toBe(3);
  });

  it("should use default wave colors", () => {
    render(<Wave />);

    const paths = document.querySelectorAll("svg path");
    // Check that default colors are applied
    expect(paths[0]).toHaveAttribute("fill", "#ffffff");
    expect(paths[1]).toHaveAttribute("fill", "#89c8e1");
    expect(paths[2]).toHaveAttribute("fill", "#4cc0fb");
  });

  it("should use custom wave colors when provided", () => {
    render(
      <Wave
        wave1Color="#ff0000"
        wave2Color="#00ff00"
        wave3Color="#0000ff"
      />
    );

    const paths = document.querySelectorAll("svg path");
    expect(paths[0]).toHaveAttribute("fill", "#ff0000");
    expect(paths[1]).toHaveAttribute("fill", "#00ff00");
    expect(paths[2]).toHaveAttribute("fill", "#0000ff");
  });

  it("should accept scrollContainerRef prop", () => {
    const ref = createRef<HTMLDivElement>();

    // Create a container with the ref
    const { container } = render(
      <div ref={ref}>
        <Wave scrollContainerRef={ref} />
      </div>
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should have correct viewBox", () => {
    render(<Wave />);

    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 1440 270");
  });

  it("should have correct namespace attributes", () => {
    render(<Wave />);

    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
  });
});
