import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const FEATURES = ["hero", "experience", "techs", "projects", "contact"];

const NO_RELATIVE = {
  group: ["./*", "../*"],
  message: "Use the @/ alias instead of relative imports.",
};
const NO_APP = {
  regex: "^@/app(?:/|$)",
  message: "Only src/main.tsx may import src/app.",
};
const NO_FEATURES_OR_APP = {
  regex: "^@/(?:features|app)(?:/|$)",
  message: "Shared code must not depend on features or the app shell.",
};
const NO_UI_TIERS = {
  regex: "^@/(?:components|features|app)(?:/|$)",
  message:
    "config, i18n, theme and hooks must not import components, features or app.",
};
const LEAF_ONLY = {
  regex: "^@/(?!(?:lib|types)(?:/|$))",
  message: "src/lib and src/types may only import src/lib and src/types.",
};
const featureOnly = (name) => ({
  regex: `^@/(?:app(?:/|$)|features/(?!${name}(?:/|$)))`,
  message: `src/features/${name} must not import the app shell or sibling features; promote shared code instead.`,
});

// Flat-config rule options are replaced, not merged, so every override has to
// restate the relative-import ban. Order matters: the last matching block wins.
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
      "no-restricted-imports": restrict(NO_APP),
    },
  },
  {
    files: ["src/main.tsx", "src/app/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrict() },
  },
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrict(NO_FEATURES_OR_APP) },
  },
  {
    files: ["src/{config,i18n,theme,hooks}/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrict(NO_UI_TIERS) },
  },
  {
    files: ["src/{lib,types}/**/*.ts"],
    rules: { "no-restricted-imports": restrict(LEAF_ONLY) },
  },
  ...FEATURES.map((name) => ({
    files: [`src/features/${name}/**/*.{ts,tsx}`],
    rules: { "no-restricted-imports": restrict(featureOnly(name)) },
  })),
  {
    files: ["src/components/ui/**/*.tsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },
  { files: ["*.{js,ts}"], languageOptions: { globals: globals.node } },
  prettier,
]);
