import type { Config } from "@react-router/dev/config";

export default {
  // Pre-rendering : génère le HTML de toutes les pages au build
  prerender: ["/", "/es", "/fr"],

  // SSR désactivé car on utilise le pre-rendering
  ssr: false,

  // Configuration pour le build
  // buildDirectory: "build",
} satisfies Config;
