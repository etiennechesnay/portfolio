interface SectionTitleProps {
  id: string;
  title: string;
}

export default function SectionTitle({ id, title }: SectionTitleProps) {
  return (
    <div className="relative">
      <h2
        id={id}
        className="relative text-2xl sm:text-3xl md:text-4xl font-bold pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-12 text-white text-center z-10"
      >
        {title}
      </h2>
      <span
        className="absolute text-[80px] sm:text-[100px] md:text-[120px] lg:text-[180px] font-black opacity-10 uppercase top-20 sm:top-24 md:top-28 left-1/2 -translate-x-1/2 z-0 pointer-events-none blur-sm"
        aria-hidden="true"
      >
        {title}
      </span>
    </div>
  );
}
