import LanguageSwitcher from "~/components/LanguageSwitcher";
import MotionToggle from "~/components/MotionToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-6 py-4 flex justify-center items-center">
        <div className="w-full flex justify-end items-center gap-4">
          <MotionToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
