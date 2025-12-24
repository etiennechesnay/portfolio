import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";

import { useMotionPreference } from "~/contexts";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  children,
  content,
  position = "bottom",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { reduceMotion } = useMotionPreference();

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-3";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-3";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-3";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-3";
      default:
        return "top-full left-1/2 -translate-x-1/2 mt-3";
    }
  };

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      className="relative inline-block"
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap pointer-events-none ${getPositionClasses()}`}
            role="tooltip"
            aria-hidden="true"
          >
            {content}
            <div
              className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                position === "top"
                  ? "bottom-[-4px] left-1/2 -translate-x-1/2"
                  : position === "bottom"
                    ? "top-[-4px] left-1/2 -translate-x-1/2"
                    : position === "left"
                      ? "right-[-4px] top-1/2 -translate-y-1/2"
                      : "left-[-4px] top-1/2 -translate-y-1/2"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
