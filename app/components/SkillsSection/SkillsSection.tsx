import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import SkillCard from "../SkillCard";

import { useMotionPreference } from "~/contexts/MotionContext";

const skillsData = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Redux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitLab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
];

export default function SkillsSection() {
  const { t } = useTranslation();
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();

  return (
    <section
      className="relative w-full h-screen bg-gradient-to-b from-blue-600 to-blue-700"
      aria-labelledby="skills-heading"
    >
      {/* Skills Section */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.5 }
        }
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }
        }
        className="w-full h-full flex flex-col"
      >
        <div className="relative">
          <h2
            id="skills-heading"
            className="relative text-4xl font-bold pt-28 pb-12 text-white text-center z-10"
          >
            {t("skills.title")}
          </h2>
          <span
            className="absolute text-[120px] lg:text-[180px] font-black opacity-10 uppercase top-28 left-1/2 -translate-x-1/2 z-0 pointer-events-none blur-sm"
            aria-hidden="true"
          >
            {t("skills.title")}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl w-full flex flex-wrap gap-4 justify-center">
            {skillsData.map((skill, index) => (
              <SkillCard key={index} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
