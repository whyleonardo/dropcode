import { extract, soliTailwindPreset } from "@soli/tailwind"

import type { Config } from "tailwindcss"

const config = {
  content: {
    files: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "../../packages/ui/dist/**/*.js"],
    extract,
  },
  darkMode: ["class"],
  presets: [soliTailwindPreset],
} satisfies Config

export default config
