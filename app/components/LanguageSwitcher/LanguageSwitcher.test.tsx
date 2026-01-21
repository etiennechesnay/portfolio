import { render, screen, waitFor } from "~/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import LanguageSwitcher from "./LanguageSwitcher";

// Mock SVG imports
vi.mock("~/assets/svg/flag-france.svg?react", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="flag-france" {...props} />
  ),
}));

vi.mock("~/assets/svg/flag-spain.svg?react", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="flag-spain" {...props} />
  ),
}));

vi.mock("~/assets/svg/flag-uk.svg?react", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="flag-uk" {...props} />
  ),
}));

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the language switcher button", () => {
    render(<LanguageSwitcher />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should show current locale flag (UK for default English)", () => {
    render(<LanguageSwitcher />, { initialEntries: ["/"] });

    expect(screen.getByTestId("flag-uk")).toBeInTheDocument();
  });

  it("should have accessible aria-label", () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
  });

  it("should have aria-expanded false when closed", () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("should toggle dropdown on click", async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("should show language options when dropdown is open", async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />, { initialEntries: ["/"] });

    await user.click(screen.getByRole("button"));

    // Should show other languages (not current one)
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();

    // Should have 2 other language options (fr, es when en is current)
    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(2);
  });

  it("should close dropdown when clicking outside", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <LanguageSwitcher />
        <button data-testid="outside">Outside</button>
      </div>
    );

    // Open dropdown
    await user.click(screen.getByRole("button", { expanded: false }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    // Click outside
    await user.click(screen.getByTestId("outside"));

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("should close dropdown on Escape key", async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    // Open dropdown
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    // Press Escape
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("should not close dropdown on Escape when already closed", async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    // Ensure dropdown is closed
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Press Escape (should do nothing)
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("should change language when selecting an option", async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />, { initialEntries: ["/"] });

    // Open dropdown
    await user.click(screen.getByRole("button"));

    // Click on a language option
    const menuItems = screen.getAllByRole("menuitem");
    await user.click(menuItems[0]);

    // Dropdown should close after selection
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("should display French flag when on French route", () => {
    render(<LanguageSwitcher />, { initialEntries: ["/fr"] });

    expect(screen.getByTestId("flag-france")).toBeInTheDocument();
  });

  it("should display Spanish flag when on Spanish route", () => {
    render(<LanguageSwitcher />, { initialEntries: ["/es"] });

    expect(screen.getByTestId("flag-spain")).toBeInTheDocument();
  });

  it("should have correct aria attributes", () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-haspopup", "true");
    expect(button).toHaveAttribute("aria-controls", "language-dropdown");
  });

  it("should be keyboard accessible", async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    await user.tab();

    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("should handle viewport overflow detection - default positioning", async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    await user.click(screen.getByRole("button"));

    // Default case: no overflow, should use centered positioning
    const dropdown = screen.getByRole("menu").parentElement;
    expect(dropdown).toHaveClass("left-1/2");
  });
});
