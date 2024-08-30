import { Drop, DropContent, DropSidebar } from "@/components/drop"

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
    <div className="h-full max-h-[calc(100dvh-5.5rem)]">
      <Drop>
        <DropSidebar>
          <SidebarContent
            snippetSlug={snippetSlug}
            collectionSlug={collectionSlug}
          />
        </DropSidebar>

        <DropContent className="bg-background p-4">{children}</DropContent>
      </Drop>
    </div>
  )
}

export default SnippetSlugLayout
