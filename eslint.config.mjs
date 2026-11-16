import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Site exportado como estático: não há otimizador de imagens em tempo de
    // execução (as capturas já saem em WebP do script) e o <head> do layout
    // raiz é o do App Router, não o do Pages Router que a regra supõe.
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-head-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
