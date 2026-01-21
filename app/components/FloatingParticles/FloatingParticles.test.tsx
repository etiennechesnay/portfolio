import { render, screen, waitFor } from "~/test-utils";
import { describe, it, expect, vi } from "vitest";

import FloatingParticles from "./FloatingParticles";

describe("FloatingParticles", () => {
  it("should render an empty container initially", () => {
    render(<FloatingParticles />);

    // Initially renders empty container before useEffect runs
    const container = document.querySelector(".absolute.inset-0");
    expect(container).toBeInTheDocument();
  });

  it("should render particles after mount", async () => {
    render(<FloatingParticles count={3} />);

    // Wait for useEffect to generate particles
    await waitFor(() => {
      const particles = document.querySelectorAll(".rounded-full.bg-gradient-radial");
      expect(particles.length).toBe(3);
    });
  });

  it("should render default count of 6 particles", async () => {
    render(<FloatingParticles />);

    await waitFor(() => {
      const particles = document.querySelectorAll(".rounded-full.bg-gradient-radial");
      expect(particles.length).toBe(6);
    });
  });

  it("should apply blue color classes by default", async () => {
    render(<FloatingParticles color="blue" />);

    await waitFor(() => {
      const particle = document.querySelector(".from-blue-400\\/30");
      expect(particle).toBeInTheDocument();
    });
  });

  it("should apply white color classes when specified", async () => {
    render(<FloatingParticles color="white" />);

    await waitFor(() => {
      const particle = document.querySelector(".from-white\\/20");
      expect(particle).toBeInTheDocument();
    });
  });

  it("should render static particles with reduced motion", async () => {
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

    render(<FloatingParticles count={3} />, { reduceMotion: true });

    await waitFor(() => {
      const particles = document.querySelectorAll(".rounded-full.bg-gradient-radial");
      expect(particles.length).toBe(3);

      // Static version should not have animate-float class
      const animatedParticle = document.querySelector(".animate-float");
      expect(animatedParticle).not.toBeInTheDocument();
    });
  });

  it("should render animated particles with normal motion", async () => {
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

    render(<FloatingParticles count={3} />, { reduceMotion: false });

    await waitFor(() => {
      const animatedParticles = document.querySelectorAll(".animate-float");
      expect(animatedParticles.length).toBe(3);
    });
  });

  it("should apply correct styles to particles", async () => {
    render(<FloatingParticles count={1} />);

    await waitFor(() => {
      const particle = document.querySelector(".rounded-full.bg-gradient-radial");
      expect(particle).toHaveClass("absolute", "blur-3xl");
    });
  });

  it("should have pointer-events-none on container", async () => {
    render(<FloatingParticles />);

    const container = document.querySelector(".pointer-events-none");
    expect(container).toBeInTheDocument();
  });

  it("should regenerate particles when count changes", async () => {
    const { rerender } = render(<FloatingParticles count={2} />);

    await waitFor(() => {
      const particles = document.querySelectorAll(".rounded-full.bg-gradient-radial");
      expect(particles.length).toBe(2);
    });

    rerender(<FloatingParticles count={4} />);

    await waitFor(() => {
      const particles = document.querySelectorAll(".rounded-full.bg-gradient-radial");
      expect(particles.length).toBe(4);
    });
  });

  it("should regenerate particles when color changes", async () => {
    const { rerender } = render(<FloatingParticles color="blue" count={2} />);

    await waitFor(() => {
      expect(document.querySelector(".from-blue-400\\/30")).toBeInTheDocument();
    });

    rerender(<FloatingParticles color="white" count={2} />);

    await waitFor(() => {
      expect(document.querySelector(".from-white\\/20")).toBeInTheDocument();
    });
  });
});
