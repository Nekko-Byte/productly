import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["**/dist/**", "**/node_modules/**"],
    plugins: { js, prettier: eslintPluginPrettier },
    extends: ["js/recommended", eslintConfigPrettier],
    rules: {
      ...eslintPluginPrettier.configs.recommended.rules,
      "no-console": "warn",
      eqeqeq: "warn",
      "no-else-return": "warn",
    },
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["webpack.config.js", "webpack.*.js"],
    languageOptions: { globals: globals.node },
    rules: {
      "prettier/prettier": "off",
    },
  },
]);
