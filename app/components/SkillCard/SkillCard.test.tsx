import { render, screen } from "~/test-utils";
import { describe, it, expect } from "vitest";

import SkillCard from "./SkillCard";

describe("SkillCard", () => {
  const defaultProps = {
    name: "React",
    icon: "https://example.com/react-icon.svg",
  };

  it("should render the skill name", () => {
    render(<SkillCard {...defaultProps} />);

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("should render the skill icon with correct alt text", () => {
    render(<SkillCard {...defaultProps} />);

    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("src", "https://example.com/react-icon.svg");
    expect(icon).toHaveAttribute("alt", "React logo");
  });

  it("should be a list item", () => {
    render(<SkillCard {...defaultProps} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should have correct aria-label for accessibility", () => {
    render(<SkillCard {...defaultProps} />);

    const listItem = screen.getByRole("button");
    // The aria-label includes translated "technology" text
    expect(listItem).toHaveAttribute("aria-label");
  });

  it("should be focusable", () => {
    render(<SkillCard {...defaultProps} />);

    const listItem = screen.getByRole("button");
    expect(listItem).toHaveAttribute("tabIndex", "0");
  });

  it("should render with different skill names", () => {
    render(<SkillCard name="TypeScript" icon="https://example.com/ts.svg" />);

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "TypeScript logo");
  });
});
