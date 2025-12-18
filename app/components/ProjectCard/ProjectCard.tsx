import { motion } from "motion/react";
import { useState } from "react";

import { useMotionPreference } from "~/contexts/MotionContext";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  href: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  image = "https://via.placeholder.com/600x400",
  href,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-lg"
      aria-label={`${title} - ${description} (opens in new window)`}
    >
      <motion.div
        className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        tabIndex={-1}
      >
        {/* Image Container */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: shouldReduceMotion ? "0%" : isHovered ? "-100%" : "0%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img
            src={image}
            alt={`${title} project screenshot`}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Details Container */}
        <motion.div
          className="absolute inset-0 bg-primary-text p-8 flex flex-col justify-center"
          initial={{ x: "100%" }}
          animate={{
            x: shouldReduceMotion ? "100%" : isHovered ? "0%" : "100%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-hidden={!isHovered}
        >
          <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/90 mb-6 text-base leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </a>
  );
}
