import { render, screen } from "~/test-utils";
import { describe, it, expect, vi } from "vitest";

import Header from "./Header";

// Mock the child components
vi.mock("~/components/LanguageSwitcher", () => ({
  default: () => <div data-testid="language-switcher">LanguageSwitcher</div>,
}));

vi.mock("~/components/MotionToggle", () => ({
  default: () => <div data-testid="motion-toggle">MotionToggle</div>,
}));

describe("Header", () => {
  it("should render the header element", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the MotionToggle component", () => {
    render(<Header />);

    expect(screen.getByTestId("motion-toggle")).toBeInTheDocument();
  });

  it("should render the LanguageSwitcher component", () => {
    render(<Header />);

    expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
  });

  it("should have fixed positioning", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("fixed");
  });

  it("should have high z-index for overlay", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("z-50");
  });
});
