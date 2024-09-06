"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { langs } from "@/config/langs"

import { QueryKeyFactory } from "@/lib/keys"

import { fetchFilesBySnippetSlug } from "@/data/fetch-files-by-snippet-slug"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { cn } from "@dropcode/tailwind/utils"

import { Clipboard, CommandIcon, Trash } from "lucide-react"
import { toast } from "sonner"

import { CreateNewFileCommandItem } from "./create-new-file-command-item"
import { DeleteFileModal } from "./delete-file-modal"
import { EditFileDrawer } from "./edit-file-drawer"

interface DropMenuCommandProps {
  snippetSlug: string
}

export const DropMenuCommand = ({ snippetSlug }: DropMenuCommandProps) => {
  const [openCommandDialog, setOpenCommandDialog] = useState(false)
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const filePublicId = pathname.split("/").at(4)

  const { data: files } = useServerActionQuery(fetchFilesBySnippetSlug, {
    queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({
      snippetSlug,
    }),
    input: {
      snippetSlug,
    },
  })

  const onCopyToClipboard = async (filePublicId: string) => {
    const code = files?.find((file) => file.publicId === filePublicId)?.content

    if (!code) {
      toast.error("Error on copy the code to clipboard")

      return null
    }

    await navigator.clipboard.writeText(code)
    toast.info("Copied to clipboard!")
  }

  const noFiles = files?.length === 0

  const onClickCommandFileItem = (filePublicId: string) => {
    setOpenCommandDialog(false)
    router.push(`/snippets/${snippetSlug}/file/${filePublicId}`)
  }

  const currentFile = files?.find((file) => file.publicId === filePublicId)

  return (
    <>
      <Button
        size="icon"
        variant="neutral"
        className="rounded-full"
        onClick={() => setOpenCommandDialog((state) => !state)}
      >
        <CommandIcon className="size-4" />
      </Button>

      <CommandDialog
        open={openCommandDialog}
        onOpenChange={setOpenCommandDialog}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {filePublicId && currentFile && (
            <CommandGroup heading="File Commands">
              <CommandItem
                onSelect={() => {
                  onCopyToClipboard(filePublicId)
                }}
              >
                <Clipboard className="mr-2 !size-3.5" />
                Copy Content
              </CommandItem>

              <CommandItem
                onSelect={() => setOpenDeleteFileModal((state) => !state)}
                className="text-destructive hover:text-destructive-11"
              >
                <Trash className="mr-2 !size-3.5" />
                Delete File
              </CommandItem>

              <DeleteFileModal
                open={openDeleteFileModal}
                onOpenChange={setOpenDeleteFileModal}
                snippetSlug={snippetSlug}
                fileId={currentFile?.id}
              />

              <EditFileDrawer file={currentFile} snippetSlug={snippetSlug} />
            </CommandGroup>
          )}

          <CommandGroup heading="New File">
            <CreateNewFileCommandItem snippetSlug={snippetSlug} />
          </CommandGroup>

          <CommandGroup heading="Files">
            {files?.map((file) => {
              const Icon = langs[file.language].icon

              return (
                <CommandItem
                  onSelect={() => onClickCommandFileItem(file.publicId)}
                  key={file.id}
                  asChild
                >
                  <span className="flex items-center gap-2">
                    <Icon className="!size-3.5" />
                    {file.name}.{langs[file.language].extension}
                    <span className="sr-only">{file.id}</span>
                    <span
                      className={cn(
                        "text-muted-foreground bg-muted border-gray-5 absolute right-0 right-4 top-1/2 z-50 hidden -translate-y-1/2 rounded-full border px-2 py-0.5 text-xs",
                        filePublicId === file.publicId && "block"
                      )}
                    >
                      Current View
                    </span>
                  </span>
                </CommandItem>
              )
            })}

            <CommandItem
              className={cn(
                "pointer-events-none justify-center",
                !noFiles && "hidden"
              )}
            >
              No files
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
