import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";

import { MotionProvider } from "~/contexts/MotionContext";
import i18n from "~/i18n/config";

interface WrapperProps {
  children: ReactNode;
}

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialEntries?: string[];
  reduceMotion?: boolean;
}

function createWrapper({ initialEntries = ["/"], reduceMotion = false }: CustomRenderOptions = {}) {
  // Mock matchMedia based on reduceMotion option
  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
    matches: reduceMotion,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  return function Wrapper({ children }: WrapperProps) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <I18nextProvider i18n={i18n}>
          <MotionProvider>{children}</MotionProvider>
        </I18nextProvider>
      </MemoryRouter>
    );
  };
}

function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { initialEntries, reduceMotion, ...renderOptions } = options;
  return render(ui, {
    wrapper: createWrapper({ initialEntries, reduceMotion }),
    ...renderOptions,
  });
}

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
