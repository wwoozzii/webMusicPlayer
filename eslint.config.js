import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Глобальные игноры (просто объект — это стандарт)
  { ignores: ["dist", "node_modules", "build"] },

  // Базовые рекомендуемые правила для JavaScript
  js.configs.recommended,

  // Рекомендуемые правила для TypeScript
  ...tseslint.configs.recommended,

  // Специфичная конфигурация для React + TS
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      // Явно указываем TS парсер, чтобы ESLint понимал синтаксис TypeScript
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Подключаем правила хуков
      ...reactHooks.configs.recommended.rules,

      // Настройка React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
]);
// export default defineConfig([
//   globalIgnores(["dist"]),
//   {
//     files: ["**/*.{ts,tsx}"],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       globals: globals.browser,
//     },
//   },
// ]);

// module.exports = {
//   rules: {
//     'no-console': 'warn',
//     'no-unused-vars': 'error',
//     'complexity': ['error', 10],
//     'max-lines-per-function': ['warn', 50]
//   }
// };
