"use client"

import { usePathname } from "next/navigation"

import { DropFilesList } from "@/components/drop"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import { fetchFilesBySnippetSlug } from "@/actions/fetch-files-by-snippet-slug"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { FilePlus } from "lucide-react"

import { CreateNewFileModal } from "./create-new-file-modal"
import { FileNavButton } from "./file-nav-button"

export const FilesList = () => {
  const pathname = usePathname()

  const snippetSlug = pathname.split("/")[2]

  const {
    data: files,
    isLoading: isLoadingFiles,
    isFetching: isFetchingFiles,
  } = useServerActionQuery(fetchFilesBySnippetSlug, {
    queryKey: ["files-by-snippet-slug", snippetSlug],
    input: {
      snippetSlug,
    },
  })

  if (isLoadingFiles || isFetchingFiles) {
    return (
      <DropFilesList>
        <FileNavButton.Skeleton />
        <FileNavButton.Skeleton />
        <FileNavButton.Skeleton />
      </DropFilesList>
    )
  }
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <DropFilesList>
            {files?.map((file) => (
              <FileNavButton
                snippetSlug={snippetSlug}
                file={file}
                key={file.id}
              />
            ))}
          </DropFilesList>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Menu</ContextMenuLabel>

          <DialogTrigger asChild>
            <ContextMenuItem className="cursor-pointer">
              <FilePlus className="mr-2 size-4" />
              New file
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>

      <CreateNewFileModal snippetSlug={snippetSlug} />
    </Dialog>
  )
}
