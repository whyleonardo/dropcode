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
    "javascript",
    "typescript",
    "vue",
    "astro",
    "tsx",
    "angular-ts",
    "jsonc",
    "svelte",
  ],
}
