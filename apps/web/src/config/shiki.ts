import type {
  BundledHighlighterOptions,
  BundledLanguage,
  BundledTheme,
} from "shiki/bundle/web"

export const highlighterConfig: BundledHighlighterOptions<
  BundledLanguage,
  BundledTheme
> = {
  themes: ["min-dark", "catppuccin-latte"],
  langs: [
    "angular-ts",
    "astro",
    "css",
    "cpp",
    "html",
    "java",
    "javascript",
    "jsonc",
    "jsx",
    "php",
    "python",
    "svelte",
    "tsx",
    "typescript",
    "vue",
    "yaml",
  ],
}
