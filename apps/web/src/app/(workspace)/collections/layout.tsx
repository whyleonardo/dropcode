import type { Metadata } from "next"

import { ContextMenuBanner } from "@/components/context-menu-banner-tip"

export const metadata: Metadata = {
  title: {
    default: "Collections",
    template: "Collections - %s",
  },
}

const CollectionsLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="relative flex h-full flex-col gap-4">
      {children}

      <ContextMenuBanner />
    </div>
  )
}

export default CollectionsLayout
