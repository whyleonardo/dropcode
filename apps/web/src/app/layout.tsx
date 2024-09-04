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
  description: "All-in-one-solution to store your thoughts.",
  authors: [{ name: "Christian Leonardo", url: "https://whyleonardo.tech" }],
  applicationName: "Dropcode",
  creator: "Christian Leonardo",
  publisher: "Christian Leonardo",
  keywords: [
    "snippets",
    "code",
    "snippet",
    "store code",
    "developer",
    "tools",
    "productivity",
    "dx",
  ],
  category: "technology",
  openGraph: {
    title: "Dropcode",
    description: "All-in-one-solution to store your thoughts.",
    url: "https://dropcode-web.vercel.app",
    siteName: "Dropcode",
    images: [
      {
        url: "https://dropcode-web.vercel.app/app-screen.png",
        width: 1200,
        height: 630,
        alt: "Dropcode",
      },
    ],
    locale: "en_US",
    type: "website",
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
