/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: [
        "app/i18n/config.ts",
        "app/i18n/utils.ts",
        "app/contexts/MotionContext.tsx",
        "app/components/**/*.tsx",
        "app/utils/**/*.ts",
      ],
      exclude: [
        "app/components/**/index.ts",
        "app/**/*.test.{ts,tsx}",
        "app/assets/**/*",
      ],
      thresholds: {
        lines: 100,
        functions: 95,
        branches: 85,
        statements: 95,
      },
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
});
