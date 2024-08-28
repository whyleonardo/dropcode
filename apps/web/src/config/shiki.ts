import type { HighlighterCoreOptions } from "shiki/bundle/web"
import catppuccinLatte from "shiki/themes/catppuccin-latte.mjs"
import minDark from "shiki/themes/min-dark.mjs"
import getWasm from "shiki/wasm"

export const highlighterConfig: HighlighterCoreOptions = {
  themes: [minDark, catppuccinLatte],
  langs: [
    import("shiki/langs/angular-ts.mjs"),
    import("shiki/langs/astro.mjs"),
    import("shiki/langs/css.mjs"),
    import("shiki/langs/cpp.mjs"),
    import("shiki/langs/html.mjs"),
    import("shiki/langs/go.mjs"),
    import("shiki/langs/java.mjs"),
    import("shiki/langs/javascript.mjs"),
    import("shiki/langs/jsonc.mjs"),
    import("shiki/langs/jsx.mjs"),
    import("shiki/langs/php.mjs"),
    import("shiki/langs/python.mjs"),
    import("shiki/langs/svelte.mjs"),
    import("shiki/langs/tsx.mjs"),
    import("shiki/langs/typescript.mjs"),
    import("shiki/langs/vue.mjs"),
    import("shiki/langs/yaml.mjs"),
  ],
  loadWasm: getWasm,
}
