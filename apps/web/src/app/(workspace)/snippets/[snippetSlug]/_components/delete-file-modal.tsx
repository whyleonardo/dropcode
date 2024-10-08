"use client"

import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { QueryKeyFactory } from "@/lib/keys"

import { deleteFileById } from "@/data/delete-file-by-id"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import { useQueryClient } from "@tanstack/react-query"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface DeleteFileModalProps {
  snippetSlug: string
  fileId: string
  open: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const DeleteFileModal = ({
  snippetSlug,
  fileId,
  open,
  onOpenChange,
}: DeleteFileModalProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: executeFileDelete, isPending: isDeletingFile } =
    useServerActionMutation(deleteFileById, {
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

        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.fetchSnippets(),
        })

        toast.info("File deleted")
      },
    })

  const onExecute = async () => {
    await executeFileDelete({
      fileId,
      snippetSlug,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
