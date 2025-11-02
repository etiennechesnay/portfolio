import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // Route par défaut
  route(":lang?", "routes/home.tsx"),

  // Catch-all pour les routes non prévues - redirige vers /
  route("*", "routes/catch-all.tsx"),
] satisfies RouteConfig;
