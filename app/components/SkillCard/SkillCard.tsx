interface SkillCardProps {
  name: string;
  icon: string;
}

export default function SkillCard({ name, icon }: SkillCardProps) {
  return (
    <div
      className="flex items-center gap-3 bg-white-10 backdrop-blur-sm px-4 py-3 rounded-full border border-white-20 hover:bg-white-20 focus-within:bg-white-20 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-blue-600 transition-colors"
      tabIndex={0}
      role="button"
      aria-label={`${name} technology`}
    >
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center p-1">
        <img
          src={icon}
          alt={`${name} logo`}
          className="w-3/4 h-3/4 object-contain"
        />
      </div>
      <span className="text-white font-medium">{name}</span>
    </div>
  );
}
