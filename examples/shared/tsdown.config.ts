import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "src/examples.ts" },
  format: ["esm", "umd"],
  globalName: "EXAMPLES",
  dts: true,
  clean: true,
});
