"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

import { fetchFilesBySnippetSlug } from "@/actions/fetch-files-by-snippet-slug"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { FilePlus } from "lucide-react"

import { CreateNewFileModal } from "./create-new-file-modal"
import { FileItem } from "./file-item"

// const ELEMENTS = [
//   {
//     id: "1",
//     isSelectable: true,
//     name: "src",
//     children: [
//       {
//         id: "2",
//         isSelectable: true,
//         name: "app",
//         children: [
//           {
//             id: "3",
//             isSelectable: true,
//             name: "layout.tsx",
//           },
//           {
//             id: "4",
//             isSelectable: true,
//             name: "page.tsx",
//           },
//         ],
//       },
//       {
//         id: "5",
//         isSelectable: true,
//         name: "components",
//         children: [
//           {
//             id: "6",
//             isSelectable: true,
//             name: "header.tsx",
//           },
//           {
//             id: "7",
//             isSelectable: true,
//             name: "footer.tsx",
//           },
//         ],
//       },
//       {
//         id: "8",
//         isSelectable: true,
//         name: "lib",
//         children: [
//           {
//             id: "9",
//             isSelectable: true,
//             name: "utils.ts",
//           },
//         ],
//       },
//     ],
//   },
// ]

interface SidebarContentProps {
  snippetSlug: string
  collectionSlug: string
}

export const SidebarContent = ({
  collectionSlug,
  snippetSlug,
}: SidebarContentProps) => {
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
      <div className="bg-gray-2 size-full space-y-2 p-4">
        <span className="text-muted-foreground w-full truncate font-medium tracking-tight">
          Files
        </span>
        <Separator />

        <FileItem.Skeleton />
        <FileItem.Skeleton />
        <FileItem.Skeleton />
        <FileItem.Skeleton />
      </div>
    )
  }

  return (
    <div className="h-full select-none">
      <Dialog>
        <ContextMenu>
          <ContextMenuTrigger className="size-full" asChild>
            <div className="bg-gray-2 flex size-full flex-col gap-2 p-4">
              <span className="text-muted-foreground w-full truncate font-medium tracking-tight">
                Files
              </span>

              <Separator />

              {files?.map((file) => (
                <FileItem
                  key={file.id}
                  file={file}
                  snippetSlug={snippetSlug}
                  collectionSlug={collectionSlug}
                />
              ))}
            </div>
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
    </div>
  )
}
