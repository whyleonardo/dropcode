"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { deleteCollectionById } from "@/actions/delete-collection-by-id"
import {
  QueryKeyFactory,
  useServerActionMutation,
} from "@/hooks/server-action-hooks"

import { useQueryClient } from "@tanstack/react-query"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface DeleteCollectionModalProps {
  collectionId: string
}

export const DeleteCollectionModal = ({
  collectionId,
}: DeleteCollectionModalProps) => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: executeCollectionDelete,
    isPending: isDeletingCollection,
  } = useServerActionMutation(deleteCollectionById, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeyFactory.fetchLinesCreatedInPeriod(),
      })

      queryClient.invalidateQueries({
        queryKey: QueryKeyFactory.fetchMostUsedLanguages(),
      })

      toast.info("Collection deleted")
    },
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This will permanently delete your collection, including all its
          snippets and files.
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
          disabled={isDeletingCollection}
          className="w-full"
          size="sm"
          variant="destructive"
          onClick={async () =>
            executeCollectionDelete({
              collectionId,
            })
          }
        >
          {isDeletingCollection && (
            <Loader2 className="mr-2 size-4 animate-spin" />
          )}
          Delete
        </Button>
      </div>
    </DialogContent>
  )
}
