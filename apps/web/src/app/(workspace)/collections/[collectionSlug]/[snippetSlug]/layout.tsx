import { Drop, DropContent, DropSidebar } from "@/components/drop"
import { ResizableHandle } from "@/components/ui/resizable"

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
    <div className="h-full">
      <Drop>
        <DropSidebar>
          <SidebarContent
            snippetSlug={snippetSlug}
            collectionSlug={collectionSlug}
          />
        </DropSidebar>
        <ResizableHandle withHandle />
        <DropContent className="bg-background p-4">{children}</DropContent>
      </Drop>
    </div>
  )
}

export default SnippetSlugLayout
