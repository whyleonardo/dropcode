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
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface DeleteCollectionModalProps {
  collectionId: string
}

export const DeleteCollectionModal = ({
  collectionId,
}: DeleteCollectionModalProps) => {
  const {
    mutateAsync: executeCollectionDelete,
    isPending: isDeletingCollection,
  } = useServerActionMutation(deleteCollectionById, {
    onSuccess: () => {
      toast.info("Collection deleted")
    },
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          collection, including all its snippets and files.
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center gap-2">
        <DialogClose
          type="button"
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
            className: "ml-auto min-w-24 border",
          })}
        >
          Cancel
        </DialogClose>

        <Button
          disabled={isDeletingCollection}
          className="min-w-24"
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
