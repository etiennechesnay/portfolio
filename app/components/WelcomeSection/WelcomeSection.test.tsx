import { render, screen, act } from "~/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createRef } from "react";

import WelcomeSection from "./WelcomeSection";

describe("WelcomeSection", () => {
  const createScrollRef = () => {
    const ref = createRef<HTMLDivElement>();
    return ref;
  };

  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      value: 1000,
    });
  });

  it("should render the section", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    expect(document.querySelector("section")).toBeInTheDocument();
  });

  it("should render the name (first and last)", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should render the job title", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    // Job title is translated - look for the paragraph
    const jobTitle = document.querySelector("p");
    expect(jobTitle).toBeInTheDocument();
  });

  it("should render the Wave component", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("should have sand-grain background class", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    const section = document.querySelector("section");
    expect(section).toHaveClass("sand-grain");
  });

  it("should start with fixed positioning when scroll is at top", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    const textContainer = document.querySelector(".fixed");
    expect(textContainer).toBeInTheDocument();
  });

  it("should have full screen height", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    const section = document.querySelector("section");
    expect(section).toHaveClass("h-screen");
  });

  it("should render text content centered", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    const textCenter = document.querySelector(".text-center");
    expect(textCenter).toBeInTheDocument();
  });

  it("should have pointer-events-none on text container", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    const container = document.querySelector(".pointer-events-none");
    expect(container).toBeInTheDocument();
  });

  it("should render Wave with z-20 for layering", () => {
    const ref = createScrollRef();

    render(
      <div ref={ref}>
        <WelcomeSection scrollContainerRef={ref} />
      </div>
    );

    const wave = document.querySelector(".z-20");
    expect(wave).toBeInTheDocument();
  });
});
