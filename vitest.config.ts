import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    test: {
        globals: true,
        setupFiles: ["./tests/setup.ts"],
        include: ["tests/**/*.spec.ts"],
        exclude: ["dist/**", "node_modules/**"],
    },
});