import aspectRatio from "@tailwindcss/aspect-ratio"
import containerQueries from "@tailwindcss/container-queries"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"

import fluid, { fontSize, screens } from "fluid-tailwind"
import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"
import { createPlugin } from "windy-radix-palette"
import windyTypography from "windy-radix-typography"

export { extract } from "fluid-tailwind"

const colors = createPlugin()

export const soliTailwindPreset: Config = {
  content: { files: ["./src/**/*.{js,jsx,ts,tsx,mdx}"] },
  presets: [windyTypography],
  theme: {
    screens,
    fontSize,
    extend: {
      colors: {
        background: colors.alias("gray.1"),
        foreground: colors.alias("gray.12"),

        muted: {
          DEFAULT: colors.alias("gray.4"),
          foreground: colors.alias("gray.11"),
        },

        card: {
          DEFAULT: colors.alias("gray.1"),
          foreground: colors.alias("gray.12"),
        },

        popover: {
          DEFAULT: colors.alias("gray.1"),
          foreground: colors.alias("gray.12"),
        },

        input: colors.alias("gray.4"),

        primary: {
          DEFAULT: colors.alias("iris.10"),
          foreground: colors.alias({ dark: "iris.12", light: "iris.1" }),
          1: colors.alias("iris.1"),
          2: colors.alias("iris.2"),
          3: colors.alias("iris.3"),
          4: colors.alias("iris.4"),
          5: colors.alias("iris.5"),
          6: colors.alias("iris.6"),
          7: colors.alias("iris.7"),
          8: colors.alias("iris.8"),
          9: colors.alias("iris.9"),
          10: colors.alias("iris.10"),
          11: colors.alias("iris.11"),
          12: colors.alias("iris.12"),
        },

        secondary: {
          DEFAULT: colors.alias("lime.10"),
          foreground: colors.alias({ dark: "lime.1", light: "lime.12" }),
          1: colors.alias("lime.1"),
          2: colors.alias("lime.2"),
          3: colors.alias("lime.3"),
          4: colors.alias("lime.4"),
          5: colors.alias("lime.5"),
          6: colors.alias("lime.6"),
          7: colors.alias("lime.7"),
          8: colors.alias("lime.8"),
          9: colors.alias("lime.9"),
          10: colors.alias("lime.10"),
          11: colors.alias("lime.11"),
          12: colors.alias("lime.12"),
        },

        accent: {
          DEFAULT: colors.alias("gray.4"),
          foreground: colors.alias("gray.12"),
        },

        destructive: {
          DEFAULT: colors.alias("red.10"),
          foreground: colors.alias("red.1"),
          1: colors.alias("red.1"),
          2: colors.alias("red.2"),
          3: colors.alias("red.3"),
          4: colors.alias("red.4"),
          5: colors.alias("red.5"),
          6: colors.alias("red.6"),
          7: colors.alias("red.7"),
          8: colors.alias("red.8"),
          9: colors.alias("red.9"),
          10: colors.alias("red.10"),
          11: colors.alias("red.11"),
          12: colors.alias("red.12"),
        },

        border: colors.alias("gray.4"),
        ring: colors.alias("gray.4"),
      },
      borderRadius: {
        radius: "0.5rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [
    animate,
    typography,
    forms,
    fluid,
    aspectRatio,
    {
      config: colors.plugin.config ?? {},
      handler: colors.plugin.handler,
    },
    {
      config: containerQueries.config ?? {},
      handler: containerQueries.handler,
    },
  ],
}
