import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ContactButton from "./ContactButton";

describe("ContactButton", () => {
  describe("email type", () => {
    it("should render an email button", () => {
      render(
        <ContactButton type="email" href="mailto:test@example.com">
          Email Me
        </ContactButton>
      );

      const link = screen.getByRole("link", { name: "Email Me" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "mailto:test@example.com");
    });

    it("should not have target or rel attributes for email", () => {
      render(
        <ContactButton type="email" href="mailto:test@example.com">
          Email Me
        </ContactButton>
      );

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it("should apply email button styles", () => {
      render(
        <ContactButton type="email" href="mailto:test@example.com">
          Email Me
        </ContactButton>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveClass("bg-blue-600");
    });
  });

  describe("linkedin type", () => {
    it("should render a LinkedIn button with external link attributes", () => {
      render(
        <ContactButton type="linkedin" href="https://linkedin.com/in/test">
          LinkedIn
        </ContactButton>
      );

      const link = screen.getByRole("link", { name: "LinkedIn" });
      expect(link).toHaveAttribute("href", "https://linkedin.com/in/test");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should apply LinkedIn button styles", () => {
      render(
        <ContactButton type="linkedin" href="https://linkedin.com/in/test">
          LinkedIn
        </ContactButton>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveClass("bg-linkedin");
    });
  });

  describe("github type", () => {
    it("should render a GitHub button with external link attributes", () => {
      render(
        <ContactButton type="github" href="https://github.com/test">
          GitHub
        </ContactButton>
      );

      const link = screen.getByRole("link", { name: "GitHub" });
      expect(link).toHaveAttribute("href", "https://github.com/test");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should apply GitHub button styles", () => {
      render(
        <ContactButton type="github" href="https://github.com/test">
          GitHub
        </ContactButton>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveClass("bg-gray-800");
    });
  });

  describe("ariaLabel", () => {
    it("should set aria-label when provided", () => {
      render(
        <ContactButton
          type="linkedin"
          href="https://linkedin.com/in/test"
          ariaLabel="Visit my LinkedIn profile"
        >
          LinkedIn
        </ContactButton>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Visit my LinkedIn profile");
    });

    it("should not have aria-label when not provided", () => {
      render(
        <ContactButton type="email" href="mailto:test@example.com">
          Email
        </ContactButton>
      );

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("aria-label");
    });
  });

  describe("children", () => {
    it("should render children content", () => {
      render(
        <ContactButton type="email" href="mailto:test@example.com">
          <span data-testid="icon">📧</span>
          Contact Us
        </ContactButton>
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Contact Us")).toBeInTheDocument();
    });
  });
});
