import { useTranslation } from "react-i18next";

import Tooltip from "~/components/Tooltip";
import { useMotionPreference } from "~/contexts/MotionContext";

export default function MotionToggle() {
  const { reduceMotion, toggleMotion } = useMotionPreference();
  const { t } = useTranslation();

  return (
    <Tooltip
      content={
        reduceMotion
          ? t("header.motion_toggle.disabled")
          : t("header.motion_toggle.enabled")
      }
      position="bottom"
    >
      <button
        onClick={toggleMotion}
        className="text-primary-text hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-text rounded p-1"
        aria-label={
          reduceMotion
            ? t("header.motion_toggle.disabled")
            : t("header.motion_toggle.enabled")
        }
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {reduceMotion ? (
            // Pause icon (animations disabled)
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : (
            // Play icon (animations enabled)
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          )}
        </svg>
      </button>
    </Tooltip>
  );
}
