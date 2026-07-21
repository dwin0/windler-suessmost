import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "app",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "app/index.html"),
        datenschutz: resolve(projectRoot, "app/datenschutz.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4000,
    open: true,
  },
});
