"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@dropcode/tailwind/utils"

import { MoonIcon, SunIcon } from "lucide-react"

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={30}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <MoonIcon
                className={cn(
                  "transition",
                  "absolute size-5 rotate-90 opacity-0 dark:rotate-0 dark:opacity-100"
                )}
                strokeWidth={1.5}
              />

              <SunIcon
                className={cn(
                  "transition",
                  "size-5 rotate-0 dark:rotate-90 dark:opacity-0"
                )}
                strokeWidth={1.5}
              />

              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>

          <TooltipContent side="right">Toggle theme</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
