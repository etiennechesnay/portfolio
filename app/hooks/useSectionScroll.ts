import { animate } from "motion/react";
import { useEffect } from "react";
import type { RefObject } from "react";

/** Wheel distance (px) a gesture must accumulate before a section change starts. */
const WHEEL_THRESHOLD = 24;
/** Duration of the scroll between two sections, in seconds. */
const SCROLL_DURATION = 1.25;
/** Slow ease-out: moves right away, then settles gently into the next section. */
const SCROLL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Time (ms) after landing during which trackpad inertia is swallowed. */
const SETTLE_DELAY = 220;

interface UseSectionScrollOptions {
  /** Set to false to keep the native (CSS snap) behaviour, e.g. for reduced motion. */
  enabled?: boolean;
  /** Selector of the section elements inside the container. */
  sectionSelector?: string;
}

/**
 * Turns wheel gestures on a snap container into one eased, section-by-section
 * scroll. Native CSS snap is kept for touch, keyboard and scrollbar input.
 */
export function useSectionScroll(
  containerRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    sectionSelector = ".snap-start",
  }: UseSectionScrollOptions = {}
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container) return;

    let accumulated = 0;
    let locked = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let controls: ReturnType<typeof animate> | undefined;

    const sectionTops = () => {
      const containerTop = container.getBoundingClientRect().top;
      return Array.from(
        container.querySelectorAll<HTMLElement>(sectionSelector)
      ).map(
        (el) =>
          el.getBoundingClientRect().top - containerTop + container.scrollTop
      );
    };

    const currentIndex = (tops: number[]) => {
      let closest = 0;
      tops.forEach((top, i) => {
        if (
          Math.abs(top - container.scrollTop) <
          Math.abs(tops[closest] - container.scrollTop)
        ) {
          closest = i;
        }
      });
      return closest;
    };

    const scrollToSection = (direction: 1 | -1) => {
      const tops = sectionTops();
      const target = tops[currentIndex(tops) + direction];
      if (target === undefined) return;

      locked = true;
      const previousSnap = container.style.scrollSnapType;
      const previousBehavior = container.style.scrollBehavior;
      container.style.scrollSnapType = "none";
      container.style.scrollBehavior = "auto";

      controls = animate(container.scrollTop, target, {
        duration: SCROLL_DURATION,
        ease: SCROLL_EASE,
        onUpdate: (value) => {
          container.scrollTop = value;
        },
        onComplete: () => {
          container.scrollTop = target;
          container.style.scrollSnapType = previousSnap;
          container.style.scrollBehavior = previousBehavior;
          settleTimer = setTimeout(() => {
            locked = false;
            accumulated = 0;
          }, SETTLE_DELAY);
        },
      });
    };

    const onWheel = (event: WheelEvent) => {
      // Horizontal gestures belong to the carousel, leave them alone.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (locked) return;

      accumulated += event.deltaY;
      if (Math.abs(accumulated) < WHEEL_THRESHOLD) return;

      const direction = accumulated > 0 ? 1 : -1;
      accumulated = 0;
      scrollToSection(direction);
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      controls?.stop();
      clearTimeout(settleTimer);
    };
  }, [containerRef, enabled, sectionSelector]);
}
