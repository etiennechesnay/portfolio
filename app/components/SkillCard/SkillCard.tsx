import { useTranslation } from "react-i18next";

interface SkillCardProps {
  name: string;
  icon: string;
}

export default function SkillCard({ name, icon }: SkillCardProps) {
  const { t } = useTranslation();

  return (
    <li
      className="flex items-center gap-2 md:gap-3 bg-white-10 backdrop-blur-sm px-2 py-1.5 md:px-4 md:py-3 rounded-full border border-white-20 hover:bg-white-20 focus-within:bg-white-20 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-blue-600 transition-colors"
      tabIndex={0}
      role="button"
      aria-label={`${name} ${t("accessibility.technology")}`}
    >
      <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center p-1">
        <img
          src={icon}
          alt={`${name} logo`}
          className="w-3/4 h-3/4 object-contain"
        />
      </div>
      <span className="text-white font-medium text-sm md:text-base">
        {name}
      </span>
    </li>
  );
}
