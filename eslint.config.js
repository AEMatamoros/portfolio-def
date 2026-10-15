import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const NO_RELATIVE = {
  group: ["./*", "../*"],
  message: "Use the @/ alias instead of relative imports.",
};

// Flat-config rule options are replaced, not merged, so every override has to
// restate the relative-import ban. Tier and feature patterns are added here.
const restrict = (...patterns) => [
  "error",
  { patterns: [NO_RELATIVE, ...patterns] },
];

export default defineConfig([
  globalIgnores(["dist", "coverage", "openspec", ".claude", ".cursor"]),
  { settings: { react: { version: "detect" } } },
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  { files: ["src/**/*.{ts,tsx}"], ...jsxA11y.flatConfigs.recommended },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    languageOptions: { globals: globals.browser },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-restricted-imports": restrict(),
    },
  },
  {
    files: ["src/components/ui/**/*.tsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },
  { files: ["*.{js,ts}"], languageOptions: { globals: globals.node } },
  prettier,
]);
