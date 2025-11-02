import { useEffect, useState } from "react";
import LanguageSwitcher from "~/components/LanguageSwitcher";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/20 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex-1"></div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
