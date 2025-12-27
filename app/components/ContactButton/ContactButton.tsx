import { type ReactNode } from "react";

type ButtonType = "email" | "linkedin" | "github";

interface ContactButtonProps {
  type: ButtonType;
  href: string;
  children: ReactNode;
  ariaLabel?: string;
}

const buttonStyles: Record<ButtonType, string> = {
  email: "bg-blue-600 hover:bg-blue-700",
  linkedin: "bg-linkedin hover:bg-linkedin-hover",
  github: "bg-gray-800 hover:bg-gray-900",
};

export default function ContactButton({
  type,
  href,
  children,
  ariaLabel,
}: ContactButtonProps) {
  const isEmail = type === "email";

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 ${buttonStyles[type]} focus:ring-2 focus:ring-white focus:outline-none text-white text-sm sm:text-base font-semibold rounded-lg transition-colors`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
