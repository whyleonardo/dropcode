"use client"

import { useTheme } from "next-themes"

import { cn } from "@soli/tailwind/utils"

import { MoonIcon, SunIcon } from "lucide-react"

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <button
      className="relative flex"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <MoonIcon
        className={cn(
          "transition-[stroke-width] duration-150",
          "absolute size-5 opacity-0 hover:stroke-2 dark:opacity-100"
        )}
        strokeWidth={1.5}
      />

      <SunIcon
        className={cn(
          "transition-[stroke-width] duration-150",
          "size-5 hover:stroke-2 dark:opacity-0"
        )}
        strokeWidth={1.5}
      />

      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
