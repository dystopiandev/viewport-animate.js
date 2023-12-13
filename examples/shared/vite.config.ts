import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from 'vite-plugin-static-copy'

const PACKAGE_NAME = "shared";

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, "src") + "/*.css",
          dest: './',
        }
      ]
    })
  ],
  build: {
    target: ["esnext"],
    lib: {
      entry: path.resolve(__dirname, "./src/examples.ts"),
      name: PACKAGE_NAME,
      formats: ["es", "umd"],
      fileName: (format) => `${format}.js`
    },
    
  },
});
