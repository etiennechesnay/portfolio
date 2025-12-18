import { motion, useMotionValue, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";

import ProjectCard from "../ProjectCard";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  href: string;
}

interface CarouselFreeScrollProps {
  projects: Project[];
}

export default function CarouselFreeScroll({
  projects,
}: CarouselFreeScrollProps) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Duplicate projects to create infinite effect
  const duplicatedProjects = [...projects, ...projects, ...projects];

  // Card width + gap
  const cardWidth = 384; // w-96 = 384px
  const gap = 32; // gap-8 = 32px
  const itemWidth = cardWidth + gap;
  const totalWidth = projects.length * itemWidth;

  // Navigate to specific card index with animation
  const navigateToCard = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const centerOffset = (containerWidth - cardWidth) / 2;
    // Target position: center the selected card from the middle set
    const targetX =
      -(projects.length * itemWidth + index * itemWidth) + centerOffset;

    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Center the first project (from second set of duplicated projects)
    const containerWidth = container.offsetWidth;
    const centerOffset = (containerWidth - cardWidth) / 2;
    // Start at the second set (projects.length items in) and center the first one
    const initialX = -totalWidth + centerOffset;
    x.set(initialX);

    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scroll
      if (e.deltaX !== 0) {
        e.preventDefault();
        e.stopPropagation();
        const currentX = x.get();
        const newX = currentX - e.deltaX;

        // Normalize position to create infinite loop
        if (Math.abs(newX) >= totalWidth) {
          x.set(newX % totalWidth);
        } else if (newX > 0) {
          x.set(newX - totalWidth);
        } else {
          x.set(newX);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard navigation when a carousel item has focus
      if (focusedIndex === null) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const newIndex = Math.max(0, focusedIndex - 1);
        setFocusedIndex(newIndex);
        navigateToCard(newIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const newIndex = Math.min(projects.length - 1, focusedIndex + 1);
        setFocusedIndex(newIndex);
        navigateToCard(newIndex);
      } else if (e.key === "Home") {
        e.preventDefault();
        setFocusedIndex(0);
        navigateToCard(0);
      } else if (e.key === "End") {
        e.preventDefault();
        const lastIndex = projects.length - 1;
        setFocusedIndex(lastIndex);
        navigateToCard(lastIndex);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [x, totalWidth, focusedIndex, projects.length, navigateToCard]);

  const handleDragEnd = () => {
    const currentX = x.get();

    // Normalize position to create infinite loop
    if (Math.abs(currentX) >= totalWidth) {
      x.set(currentX % totalWidth);
    } else if (currentX > 0) {
      x.set(currentX - totalWidth);
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      role="region"
      aria-label="Project carousel - Use arrow keys to navigate. This carousel displays projects in an infinite loop."
      tabIndex={0}
      onFocus={() => {
        // When carousel container gets focus, set focus to first item
        if (focusedIndex === null) {
          setFocusedIndex(0);
          navigateToCard(0);
        }
      }}
      onBlur={(e) => {
        // Only clear focus if focus is leaving the carousel completely
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setFocusedIndex(null);
        }
      }}
    >
      <motion.div
        className="flex gap-8 absolute cursor-grab active:cursor-grabbing h-full items-center"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -totalWidth * 2, right: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      >
        {duplicatedProjects.map((project, index) => {
          // Determine if this is from the middle set (the navigable set)
          const isMiddleSet =
            index >= projects.length && index < projects.length * 2;

          return (
            <div
              key={index}
              className="w-100 h-80 flex-shrink-0"
              aria-hidden={!isMiddleSet}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                href={project.href}
              />
            </div>
          );
        })}
      </motion.div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {focusedIndex !== null &&
          `Viewing project ${focusedIndex + 1} of ${projects.length}: ${projects[focusedIndex]?.title}`}
      </div>
    </div>
  );
}
