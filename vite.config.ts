/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";

import Markdown from "unplugin-vue-markdown/vite";
import { attrs } from "@mdit/plugin-attrs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    legacy(),
    tailwindcss(),
    Markdown({
      markdownItSetup(md) {
        md.use(attrs);
      },
      headEnabled: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
