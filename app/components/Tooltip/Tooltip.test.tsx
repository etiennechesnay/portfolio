import { render, screen, waitFor, fireEvent } from "~/test-utils";
import { describe, it, expect } from "vitest";

import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  it("should render children", () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });

  it("should not show tooltip content initially", () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
  });

  it("should show tooltip on mouse enter", async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);

    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });
  });

  it("should hide tooltip on mouse leave", async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);

    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });

    fireEvent.mouseLeave(wrapper);

    await waitFor(() => {
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });
  });

  it("should show tooltip on focus", async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Focus me</button>
      </Tooltip>
    );

    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.focus(wrapper);

    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });
  });

  it("should hide tooltip on blur", async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Focus me</button>
      </Tooltip>
    );

    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.focus(wrapper);

    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });

    fireEvent.blur(wrapper);

    await waitFor(() => {
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });
  });

  describe("position classes", () => {
    it("should apply top position classes", async () => {
      render(
        <Tooltip content="Top tooltip" position="top">
          <button>Hover</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip", { hidden: true });
        expect(tooltip).toHaveClass("bottom-full");
      });
    });

    it("should apply bottom position classes (default)", async () => {
      render(
        <Tooltip content="Bottom tooltip" position="bottom">
          <button>Hover</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip", { hidden: true });
        expect(tooltip).toHaveClass("top-full");
      });
    });

    it("should apply left position classes", async () => {
      render(
        <Tooltip content="Left tooltip" position="left">
          <button>Hover</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip", { hidden: true });
        expect(tooltip).toHaveClass("right-full");
      });
    });

    it("should apply right position classes", async () => {
      render(
        <Tooltip content="Right tooltip" position="right">
          <button>Hover</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip", { hidden: true });
        expect(tooltip).toHaveClass("left-full");
      });
    });

    it("should default to bottom when no position is specified", async () => {
      render(
        <Tooltip content="Default tooltip">
          <button>Hover</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip", { hidden: true });
        expect(tooltip).toHaveClass("top-full");
      });
    });
  });

  describe("reduced motion", () => {
    it("should render without animation when reduceMotion is true", async () => {
      render(
        <Tooltip content="Reduced motion tooltip">
          <button>Hover</button>
        </Tooltip>,
        { reduceMotion: true }
      );

      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        expect(screen.getByText("Reduced motion tooltip")).toBeInTheDocument();
      });
    });
  });

  it("should have aria-hidden on tooltip for accessibility", async () => {
    render(
      <Tooltip content="Accessible tooltip">
        <button>Hover</button>
      </Tooltip>
    );

    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip", { hidden: true });
      expect(tooltip).toHaveAttribute("aria-hidden", "true");
    });
  });
});
