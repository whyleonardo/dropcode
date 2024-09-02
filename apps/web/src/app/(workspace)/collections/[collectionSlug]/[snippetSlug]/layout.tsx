import { Drop, DropContent, DropSidebar } from "@/components/drop"

import { DropMenuCommand } from "./_components/drop-menu-command"
import { SidebarContent } from "./_components/sidebar-content"

interface SnippetSlugLayoutProps {
  params: {
    snippetSlug: string
    collectionSlug: string
  }
  children: React.ReactNode
}

const SnippetSlugLayout = ({
  children,
  params: { snippetSlug, collectionSlug },
}: SnippetSlugLayoutProps) => {
  return (
    <div className="relative h-full max-h-[calc(100dvh-5.5rem)]">
      <Drop>
        <DropSidebar>
          <SidebarContent
            snippetSlug={snippetSlug}
            collectionSlug={collectionSlug}
          />
        </DropSidebar>

        <DropContent className="bg-background p-4">{children}</DropContent>
      </Drop>

      <div className="absolute bottom-4 right-4 md:hidden">
        <DropMenuCommand
          snippetSlug={snippetSlug}
          collectionSlug={collectionSlug}
        />
      </div>
    </div>
  )
}

export default SnippetSlugLayout
