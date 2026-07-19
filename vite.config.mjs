import { defineConfig } from "vite";

export default defineConfig({
  root: "app",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 4000,
    open: true,
  },
});
