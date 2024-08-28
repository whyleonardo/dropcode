"use client"

import { Button } from "@/components/ui/button"

import { deleteSnippetById } from "@/actions/delete-snippet-by-id"
import {
  QueryKeyFactory,
  useServerActionMutation,
} from "@/hooks/server-action-hooks"

import { useQueryClient } from "@tanstack/react-query"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface DeleteSnippetButtonProps {
  collectionSlug: string
  snippetId: string
}

export const DeleteSnippetButton = ({
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
    <Button
      disabled={isDeletingSnippet}
      className="min-w-24"
      size="sm"
      variant="destructive"
      onClick={async () =>
        executeSnippetDelete({
          collectionSlug,
          snippetId,
        })
      }
    >
      {isDeletingSnippet && <Loader2 className="mr-2 size-4 animate-spin" />}
      Delete
    </Button>
  )
}
