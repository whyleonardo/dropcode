import type { Metadata } from "next/types"

import { ContextMenuBanner } from "@/components/context-menu-banner-tip"

export const metadata: Metadata = {
  title: "Snippets",
}

const SnippetsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-full flex-col gap-4">
      {children}

      <ContextMenuBanner />
    </div>
  )
}

export default SnippetsLayout
