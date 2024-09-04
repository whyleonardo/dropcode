import Script from "next/script"
import type { Metadata } from "next/types"

import { ScreenSizeIndicator } from "@/components/screen-size-indicator"

import { fontMono, fontSans } from "@/styles/fonts"
import "@/styles/globals.css"

import { ThemeProvider } from "@/providers/theme-provider"

import { env } from "@dropcode/env/web"
import { cn } from "@dropcode/tailwind/utils"
import { Analytics } from "@vercel/analytics/react"

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
    url: "https://dropcode-web.vercel.app/og.png",
    siteName: "Dropcode",
    images: [
      {
        url: "https://dropcode-web.vercel.app/og.png",
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
      <Script id="clarity-script" strategy="afterInteractive">
        {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
      </Script>

      <body
        className={cn(
          fontSans,
          fontMono,
          "max-max-h-dvh h-dvh overflow-hidden"
        )}
      >
        <ThemeProvider>
          {children}

          <Analytics />
        </ThemeProvider>
        <ScreenSizeIndicator />
      </body>
    </html>
  )
}

export default RootLayout
