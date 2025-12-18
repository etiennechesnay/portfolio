import { createContext, useContext, useState, useEffect } from "react";

interface MotionContextType {
  reduceMotion: boolean;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check user's system preference on mount
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    // Listen for changes in system preference
    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleMotion = () => {
    setReduceMotion((prev) => !prev);
  };

  return (
    <MotionContext.Provider value={{ reduceMotion, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMotionPreference() {
  const context = useContext(MotionContext);
  if (context === undefined) {
    throw new Error("useMotionPreference must be used within a MotionProvider");
  }
  return context;
}
