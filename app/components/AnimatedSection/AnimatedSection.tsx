import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useMotionPreference } from "~/contexts/MotionContext";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedSection({
  children,
  className = "w-full h-full flex flex-col",
}: AnimatedSectionProps) {
  const { reduceMotion } = useMotionPreference();

  return (
    <motion.div
      initial={
        reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
      }
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.8 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
