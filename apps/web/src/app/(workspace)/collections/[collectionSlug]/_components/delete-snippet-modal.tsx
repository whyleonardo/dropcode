"use client"

import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { QueryKeyFactory } from "@/lib/keys"

import { deleteSnippetById } from "@/actions/delete-snippet-by-id"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import { useQueryClient } from "@tanstack/react-query"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface DeleteSnippetButtonProps {
  collectionSlug: string
  snippetId: string
}

export const DeleteSnippetModal = ({
  collectionSlug,
  snippetId,
}: DeleteSnippetButtonProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync: executeSnippetDelete, isPending: isDeletingSnippet } =
    useServerActionMutation(deleteSnippetById, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.fetchLinesCreatedInPeriod(),
        })

        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.fetchMostUsedLanguages(),
        })

        toast.info("Snippet deleted")
      },
    })

  return (
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
          disabled={isDeletingSnippet}
          className="w-full"
          size="sm"
          variant="destructive"
          onClick={async () =>
            executeSnippetDelete({
              collectionSlug,
              snippetId,
            })
          }
        >
          {isDeletingSnippet && (
            <Loader2 className="mr-2 size-4 animate-spin" />
          )}
          Delete
        </Button>
      </div>
    </DialogContent>
  )
}
