"use client"

import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { CommandItem } from "@/components/ui/command"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { deleteFileBySlug } from "@/actions/delete-file-by-slug"
import {
  QueryKeyFactory,
  useServerActionMutation,
} from "@/hooks/server-action-hooks"

import { useQueryClient } from "@tanstack/react-query"

import { Loader2, Trash } from "lucide-react"
import { toast } from "sonner"

interface DeleteFileModalProps {
  snippetSlug: string
  fileSlug: string
}

export const DeleteFileModal = ({
  snippetSlug,
  fileSlug,
}: DeleteFileModalProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: executeFileDelete, isPending: isDeletingFile } =
    useServerActionMutation(deleteFileBySlug, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.fetchLinesCreatedInPeriod(),
        })

        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.fetchMostUsedLanguages(),
        })

        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({ snippetSlug }),
        })
      },
    })

  const onExecute = async () => {
    await executeFileDelete({
      fileSlug,
      snippetSlug,
    })

    toast.info("File deleted")
  }

  return (
    <Dialog>
      <CommandItem
        asChild
        className="text-destructive hover:text-destructive-11"
      >
        <DialogTrigger className="w-full">
          <Trash className="mr-2 !size-3.5" />
          Delete File
        </DialogTrigger>
      </CommandItem>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            snippet and remove it from your collection.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex items-center justify-center gap-2 md:justify-end">
          <DialogClose
            type="button"
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
              className: "w-full border",
            })}
          >
            Cancel
          </DialogClose>

          <Button
            disabled={isDeletingFile}
            className="w-full"
            size="sm"
            variant="destructive"
            onClick={async () => onExecute()}
          >
            {isDeletingFile && <Loader2 className="mr-2 size-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}