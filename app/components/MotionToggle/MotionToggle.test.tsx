import { render, screen, waitFor } from "~/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import MotionToggle from "./MotionToggle";

describe("MotionToggle", () => {
  it("should render a button", () => {
    render(<MotionToggle />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should have an accessible label", () => {
    render(<MotionToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
  });

  it("should toggle motion preference on click", async () => {
    const user = userEvent.setup();

    render(<MotionToggle />);

    const button = screen.getByRole("button");
    const initialLabel = button.getAttribute("aria-label");

    await user.click(button);

    await waitFor(() => {
      expect(button.getAttribute("aria-label")).not.toBe(initialLabel);
    });
  });

  it("should render play icon when motion is enabled", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
      matches: false, // Motion enabled (not reduced)
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<MotionToggle />, { reduceMotion: false });

    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("should render pause icon when motion is disabled", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
      matches: true, // Motion disabled (reduced)
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<MotionToggle />, { reduceMotion: true });

    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should be keyboard accessible", async () => {
    const user = userEvent.setup();

    render(<MotionToggle />);

    await user.tab();

    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("should have proper focus styles", () => {
    render(<MotionToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("focus:outline-none", "focus:ring-2");
  });
});
