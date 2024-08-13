import type { Metadata } from "next/types"

import { ScreenSizeIndicator } from "@/components/screen-size-indicator"

import { fontMono, fontSans } from "@/styles/fonts"
import "@/styles/globals.css"

import { ThemeProvider } from "@/providers/theme-provider"

import { cn } from "@soli/tailwind/utils"

export const metadata: Metadata = {
  title: {
    default: "Next.js App",
    template: "%s - Next.js App",
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={cn(fontSans, fontMono)}>
        <ThemeProvider>{children}</ThemeProvider>
        <ScreenSizeIndicator />
      </body>
    </html>
  )
}

export default RootLayout
