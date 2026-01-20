import { useTranslation } from "react-i18next";

interface SkillCardProps {
  name: string;
  icon: string;
}

export default function SkillCard({ name, icon }: SkillCardProps) {
  const { t } = useTranslation();

  return (
    <li
      className="group relative flex items-center gap-2 md:gap-3 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md px-3 py-2 md:px-5 md:py-3 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/20 focus-within:bg-white/20 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-blue-600 transition-all duration-300 hover:shadow-[0_0_25px_rgba(76,192,251,0.4)] hover:scale-105 cursor-default"
      tabIndex={0}
      role="button"
      aria-label={`${name} ${t("accessibility.technology")}`}
    >
      {/* Subtle inner highlight */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />

      <div className="relative w-7 h-7 md:w-9 md:h-9 bg-white/90 rounded-full flex items-center justify-center p-1.5 shadow-lg group-hover:shadow-white/30 transition-shadow duration-300">
        <img
          src={icon}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="relative text-white font-medium text-sm md:text-base drop-shadow-sm">
        {name}
      </span>
    </li>
  );
}
