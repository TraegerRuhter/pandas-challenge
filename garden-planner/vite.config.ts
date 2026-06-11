/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // becomes "prompt" + toast with §22 polish
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        // §22 manifest requirements
        name: "PLOT — Garden Planner",
        short_name: "PLOT",
        description:
          "Planting, Layout & Operations Tracker — an offline-first garden planner.",
        start_url: "/",
        display: "standalone",
        orientation: "any",
        theme_color: "#2f6f3e",
        background_color: "#f7f3e8",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache the app shell, bundled catalog JSON, and sprites (§22).
        globPatterns: ["**/*.{js,css,html,svg,png,json,webmanifest}"],
        // Runtime caching for weather/geocode (network-first + TTL) is added
        // in Phase 1 with the adapters; adapters also cache in IndexedDB.
      },
    }),
  ],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
