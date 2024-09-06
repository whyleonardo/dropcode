"use client"

import { QueryKeyFactory } from "@/lib/keys"

import { fetchFilesBySnippetSlug } from "@/data/fetch-files-by-snippet-slug"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { cn } from "@dropcode/tailwind/utils"

import { CreateNewFileDrawer } from "./create-new-file-drawer"
import { CreateNewFileModal } from "./create-new-file-modal"

interface NoFilesActionProps {
  snippetSlug: string
}

export const NoFilesAction = ({ snippetSlug }: NoFilesActionProps) => {
  const { data: files } = useServerActionQuery(fetchFilesBySnippetSlug, {
    queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({ snippetSlug }),
    input: {
      snippetSlug,
    },
  })

  const noFiles = files?.length === 0

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <span
        className={cn(
          "text-muted-foreground select-none text-lg opacity-70 dark:opacity-50",
          noFiles && "hidden"
        )}
      >
        Select a file to view
      </span>

      {noFiles && (
        <div className="fixed inset-x-1/2 top-2/4 size-fit -translate-x-1/2 space-y-2 text-center md:translate-x-1/2">
          <span className="text-muted-foreground block min-w-max text-base">
            You don't have any files yet
          </span>

          <CreateNewFileModal
            triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex"
            snippetSlug={snippetSlug}
          />

          <CreateNewFileDrawer
            triggerClassName="md:hidden"
            triggerLabel="Create now"
            snippetSlug={snippetSlug}
          />
        </div>
      )}
    </div>
  )
}
