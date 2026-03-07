import { defineConfig, type UserConfig } from "tsdown";

const defaultSettings: UserConfig = {
  clean: true,
  dts: true,
  publint: true,
};

export default defineConfig([
  {
    ...defaultSettings,
    platform: "neutral",
    entry: { index: "src/index.ts" },
    format: ["esm", "cjs"],
  },
  {
    ...defaultSettings,
    entry: { index: "src/index.umd.ts" },
    platform: "browser",
    format: ["umd"],
    globalName: "ViewportAnimate",
  },
]);