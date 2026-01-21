import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import SectionTitle from "./SectionTitle";

describe("SectionTitle", () => {
  it("should render the title", () => {
    render(<SectionTitle id="test-id" title="Test Title" />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Title"
    );
  });

  it("should have the correct id attribute", () => {
    render(<SectionTitle id="my-section" title="My Section" />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("id", "my-section");
  });

  it("should render decorative background text", () => {
    render(<SectionTitle id="test" title="Portfolio" />);

    // The decorative text should be aria-hidden
    const decorativeText = screen.getByText("Portfolio", {
      selector: "span[aria-hidden='true']",
    });
    expect(decorativeText).toBeInTheDocument();
  });

  it("should have proper accessibility attributes on decorative element", () => {
    render(<SectionTitle id="test" title="Skills" />);

    const decorativeSpan = document.querySelector("span[aria-hidden='true']");
    expect(decorativeSpan).toHaveAttribute("aria-hidden", "true");
  });
});
