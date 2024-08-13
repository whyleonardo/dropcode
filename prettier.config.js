/** @type {import('@trivago/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-packagejson",
  ],
  trailingComma: "es5",
  printWidth: 80,
  semi: false,
  singleQuote: false,
  importOrder: [
    "/^react/",
    "/^next/",
    "/^@next/",
    "^@/components/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/styles/(.*)$",
    "^@/(.*)$",
    "^@(.*)$",
    "^(?!next|react)[a-z]",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ["tv"],
}

export default config
