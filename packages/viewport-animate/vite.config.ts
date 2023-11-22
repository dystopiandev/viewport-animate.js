import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const PACKAGE_NAME = "viewport-animate";

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    target: ["esnext"],
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: PACKAGE_NAME,
      formats: ["es", "umd"],
    },
  },
});
