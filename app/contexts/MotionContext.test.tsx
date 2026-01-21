import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { MotionProvider, useMotionPreference } from "./MotionContext";

// Test component that uses the hook
function TestConsumer() {
  const { reduceMotion, toggleMotion } = useMotionPreference();
  return (
    <div>
      <span data-testid="motion-status">
        {reduceMotion ? "reduced" : "normal"}
      </span>
      <button onClick={toggleMotion}>Toggle</button>
    </div>
  );
}

describe("MotionContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("MotionProvider", () => {
    it("should render children", () => {
      render(
        <MotionProvider>
          <div data-testid="child">Child content</div>
        </MotionProvider>
      );

      expect(screen.getByTestId("child")).toHaveTextContent("Child content");
    });

    it("should provide default reduceMotion as false when system preference is normal", () => {
      // Mock matchMedia to return false (no reduce motion preference)
      vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(
        <MotionProvider>
          <TestConsumer />
        </MotionProvider>
      );

      expect(screen.getByTestId("motion-status")).toHaveTextContent("normal");
    });

    it("should set reduceMotion to true when system preference is reduce", () => {
      vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(
        <MotionProvider>
          <TestConsumer />
        </MotionProvider>
      );

      expect(screen.getByTestId("motion-status")).toHaveTextContent("reduced");
    });

    it("should toggle motion preference when toggleMotion is called", async () => {
      const user = userEvent.setup();

      vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(
        <MotionProvider>
          <TestConsumer />
        </MotionProvider>
      );

      expect(screen.getByTestId("motion-status")).toHaveTextContent("normal");

      await user.click(screen.getByRole("button", { name: "Toggle" }));

      expect(screen.getByTestId("motion-status")).toHaveTextContent("reduced");

      await user.click(screen.getByRole("button", { name: "Toggle" }));

      expect(screen.getByTestId("motion-status")).toHaveTextContent("normal");
    });

    it("should respond to system preference changes", () => {
      let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;

      vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
          if (event === "change") {
            changeHandler = handler;
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(
        <MotionProvider>
          <TestConsumer />
        </MotionProvider>
      );

      expect(screen.getByTestId("motion-status")).toHaveTextContent("normal");

      // Simulate system preference change
      act(() => {
        if (changeHandler) {
          changeHandler({ matches: true } as MediaQueryListEvent);
        }
      });

      expect(screen.getByTestId("motion-status")).toHaveTextContent("reduced");
    });

    it("should clean up event listener on unmount", () => {
      const removeEventListenerMock = vi.fn();

      vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerMock,
        dispatchEvent: vi.fn(),
      }));

      const { unmount } = render(
        <MotionProvider>
          <TestConsumer />
        </MotionProvider>
      );

      unmount();

      expect(removeEventListenerMock).toHaveBeenCalledWith(
        "change",
        expect.any(Function)
      );
    });
  });

  describe("useMotionPreference", () => {
    it("should throw error when used outside of MotionProvider", () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<TestConsumer />);
      }).toThrow("useMotionPreference must be used within a MotionProvider");

      consoleSpy.mockRestore();
    });
  });
});
