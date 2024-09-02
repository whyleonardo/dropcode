import type { Metadata } from "next/types"

import { ScreenSizeIndicator } from "@/components/screen-size-indicator"

import { fontMono, fontSans } from "@/styles/fonts"
import "@/styles/globals.css"

import { ThemeProvider } from "@/providers/theme-provider"

import { cn } from "@dropcode/tailwind/utils"

export const metadata: Metadata = {
  title: {
    default: "Dropcode",
    template: "Dropcode - %s",
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={cn(
          fontSans,
          fontMono,
          "max-max-h-dvh h-dvh overflow-hidden"
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <ScreenSizeIndicator />
      </body>
    </html>
  )
}

export default RootLayout
