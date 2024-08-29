import { Drop, DropContent } from "@/components/drop"

import { FilesList } from "./_components/files-list"

interface SnippetSlugLayoutProps {
  children: React.ReactNode
  params: {
    snippetSlug: string
  }
}

const SnippetSlugLayout = async ({ children }: SnippetSlugLayoutProps) => {
  return (
    <div className="size-full overflow-hidden rounded-lg">
      <Drop>
        <FilesList />
        <DropContent className="h-full">{children}</DropContent>
      </Drop>
    </div>
  )
}

export default SnippetSlugLayout
