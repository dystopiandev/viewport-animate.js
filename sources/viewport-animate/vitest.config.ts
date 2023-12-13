import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "v8",
    },
    setupFiles: ["./vitest.setup.ts"],
  },
});
