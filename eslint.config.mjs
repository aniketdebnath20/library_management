import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Disable "any" rule (TEMPORARY)
      "@typescript-eslint/no-explicit-any": "off",

      // Disable unused vars warnings (TEMPORARY)
      "@typescript-eslint/no-unused-vars": "off",

      // Allow raw apostrophes in JSX
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
