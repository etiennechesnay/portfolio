import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router";
import { I18nextProvider } from "react-i18next";

import i18n from "~/i18n/config";
import { MotionProvider } from "~/contexts/MotionContext";
import LanguageHandler from "./LanguageHandler";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderWithRouter(initialEntry: string) {
  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <I18nextProvider i18n={i18n}>
        <MotionProvider>
          <Routes>
            <Route
              path="/"
              element={
                <LanguageHandler>
                  <div data-testid="content">Home Content</div>
                </LanguageHandler>
              }
            />
            <Route
              path="/:lang"
              element={
                <LanguageHandler>
                  <div data-testid="content">Localized Content</div>
                </LanguageHandler>
              }
            />
            <Route
              path="/:lang/*"
              element={
                <LanguageHandler>
                  <div data-testid="content">Localized Sub Content</div>
                </LanguageHandler>
              }
            />
          </Routes>
        </MotionProvider>
      </I18nextProvider>
    </MemoryRouter>
  );
}

describe("LanguageHandler", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render children for root path", () => {
    renderWithRouter("/");

    expect(screen.getByTestId("content")).toHaveTextContent("Home Content");
  });

  it("should render children for valid French locale", () => {
    renderWithRouter("/fr");

    expect(screen.getByTestId("content")).toHaveTextContent("Localized Content");
  });

  it("should render children for valid Spanish locale", () => {
    renderWithRouter("/es");

    expect(screen.getByTestId("content")).toHaveTextContent("Localized Content");
  });

  it("should redirect to root for invalid locale", async () => {
    renderWithRouter("/de");

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  it("should redirect to root when default locale (en) is in URL", async () => {
    renderWithRouter("/en");

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  it("should not redirect for valid non-default locale", async () => {
    renderWithRouter("/fr");

    // Wait a tick to ensure useEffect has run
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should not redirect for root path", async () => {
    renderWithRouter("/");

    // Wait a tick to ensure useEffect has run
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should redirect invalid locale even with subpaths", async () => {
    renderWithRouter("/xyz/about");

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });
});
