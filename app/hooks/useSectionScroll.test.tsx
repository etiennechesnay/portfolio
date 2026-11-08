import { renderHook } from "@testing-library/react";
import { animate } from "motion/react";
import { createRef } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { useSectionScroll } from "./useSectionScroll";

vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  animate: vi.fn(),
}));

const SECTION_HEIGHT = 800;
const mockedAnimate = vi.mocked(animate);

function buildContainer(sections = 4) {
  const container = document.createElement("div");
  container.scrollTop = 0;
  container.getBoundingClientRect = () => ({ top: 0 }) as DOMRect;
  for (let i = 0; i < sections; i++) {
    const section = document.createElement("div");
    section.className = "snap-start";
    section.getBoundingClientRect = () =>
      ({ top: i * SECTION_HEIGHT - container.scrollTop }) as DOMRect;
    container.appendChild(section);
  }
  document.body.appendChild(container);
  return container;
}

function wheel(target: HTMLElement, deltaY: number, deltaX = 0) {
  const event = new WheelEvent("wheel", { deltaY, deltaX, cancelable: true });
  target.dispatchEvent(event);
  return event;
}

describe("useSectionScroll", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockedAnimate.mockImplementation((from, to, options) => {
      const target = to as number;
      options?.onUpdate?.(target);
      options?.onComplete?.();
      return { stop: vi.fn() } as unknown as ReturnType<typeof animate>;
    });
  });

  afterEach(() => {
    mockedAnimate.mockReset();
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  function setup(options?: Parameters<typeof useSectionScroll>[1]) {
    const container = buildContainer();
    const ref = createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
    Object.assign(ref, { current: container });
    const hook = renderHook(() => useSectionScroll(ref, options));
    return { container, ...hook };
  }

  it("scrolls to the next section on a vertical wheel gesture", () => {
    const { container } = setup();

    const event = wheel(container, 50);

    expect(event.defaultPrevented).toBe(true);
    expect(mockedAnimate).toHaveBeenCalledTimes(1);
    expect(mockedAnimate.mock.calls[0][1]).toBe(SECTION_HEIGHT);
    expect(container.scrollTop).toBe(SECTION_HEIGHT);
  });

  it("accumulates small deltas before moving", () => {
    const { container } = setup();

    wheel(container, 10);
    expect(mockedAnimate).not.toHaveBeenCalled();

    wheel(container, 20);
    expect(mockedAnimate).toHaveBeenCalledTimes(1);
  });

  it("lets horizontal gestures through for the carousel", () => {
    const { container } = setup();

    const event = wheel(container, 5, 120);

    expect(event.defaultPrevented).toBe(false);
    expect(mockedAnimate).not.toHaveBeenCalled();
  });

  it("ignores wheel events until the landing settles, then moves again", () => {
    const { container } = setup();

    wheel(container, 50);
    wheel(container, 50);
    expect(mockedAnimate).toHaveBeenCalledTimes(1);

    vi.runAllTimers();
    wheel(container, 50);
    expect(mockedAnimate).toHaveBeenCalledTimes(2);
    expect(container.scrollTop).toBe(2 * SECTION_HEIGHT);
  });

  it("scrolls back to the previous section on an upward gesture", () => {
    const { container } = setup();
    container.scrollTop = SECTION_HEIGHT;

    wheel(container, -50);

    expect(mockedAnimate.mock.calls[0][1]).toBe(0);
  });

  it("does nothing at the edges", () => {
    const { container } = setup();

    wheel(container, -50);

    expect(mockedAnimate).not.toHaveBeenCalled();
  });

  it("disables native snap during the animation and restores it after", () => {
    const { container } = setup();
    const seen: string[] = [];
    mockedAnimate.mockImplementation((from, to, options) => {
      seen.push(container.style.scrollSnapType, container.style.scrollBehavior);
      options?.onUpdate?.(to as number);
      options?.onComplete?.();
      return { stop: vi.fn() } as unknown as ReturnType<typeof animate>;
    });

    wheel(container, 50);

    expect(seen).toEqual(["none", "auto"]);
    expect(container.style.scrollSnapType).toBe("");
    expect(container.style.scrollBehavior).toBe("");
  });

  it("keeps native behaviour when disabled", () => {
    const { container } = setup({ enabled: false });

    const event = wheel(container, 50);

    expect(event.defaultPrevented).toBe(false);
    expect(mockedAnimate).not.toHaveBeenCalled();
  });

  it("stops the running animation and removes listeners on unmount", () => {
    const stop = vi.fn();
    mockedAnimate.mockImplementation(
      () => ({ stop }) as unknown as ReturnType<typeof animate>
    );
    const { container, unmount } = setup();

    wheel(container, 50);
    unmount();
    const event = wheel(container, 50);

    expect(stop).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });
});
