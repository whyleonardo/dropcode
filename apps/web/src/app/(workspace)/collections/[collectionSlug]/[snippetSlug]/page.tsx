import { notFound } from "next/navigation"

import { fetchFilesBySnippetSlug } from "@/actions/fetch-files-by-snippet-slug"
import { getSnippetBySlug } from "@/actions/get-snippet-by-slug"

import { cn } from "@dropcode/tailwind/utils"

import { CreateNewFileDrawer } from "./_components/create-new-file-drawer"
import { CreateNewFileModal } from "./_components/create-new-file-modal"

interface SnippetSlugLayoutProps {
  params: {
    snippetSlug: string
  }
  children: React.ReactNode
}

const SnippetSlugPage = async ({
  params: { snippetSlug },
}: SnippetSlugLayoutProps) => {
  const [[snippet], [files]] = await Promise.all([
    await getSnippetBySlug({ snippetSlug }),
    await fetchFilesBySnippetSlug({ snippetSlug }),
  ])

  if (!snippet) {
    notFound()
  }

  const noFiles = files?.length === 0

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <span
        className={cn("text-muted-foreground text-lg", noFiles && "hidden")}
      >
        Select a file to view
      </span>

      {noFiles && (
        <div
          className={cn(
            "fixed inset-x-1/2 top-2/4 size-fit -translate-x-1/2 space-y-2 text-center md:translate-x-1/2",
            !noFiles && "hidden"
          )}
        >
          <span className="text-muted-foreground block min-w-max text-base">
            You don't have any files yet
          </span>

          <CreateNewFileModal triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex" />

          <CreateNewFileDrawer
            triggerClassName="md:hidden"
            triggerLabel="Create now"
          />
        </div>
      )}
    </div>
  )
}

export default SnippetSlugPage
