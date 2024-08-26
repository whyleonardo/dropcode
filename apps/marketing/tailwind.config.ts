import { dropcodeTailwindPreset, extract } from "@dropcode/tailwind"

import type { Config } from "tailwindcss"

const config = {
  content: {
    files: [
      "./src/**/*.{js,ts,jsx,tsx,mdx,astro}",
      "../../packages/ui/dist/**/*.js",
    ],
    extract,
  },
  darkMode: ["class"],
  presets: [dropcodeTailwindPreset],
} satisfies Config

export default config
