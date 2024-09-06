"use client"

import { useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { deleteAccount } from "@/data/delete-account"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface DeleteAccountConfirmationModalProps {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
}

const SENTENCE_TO_DELETE_ACCOUNT = "delete my account"

export const DeleteAccountConfirmationModal = ({
  open,
  onOpenChange,
}: DeleteAccountConfirmationModalProps) => {
  const [sentenceInput, setSentenceInput] = useState("")

  const { mutateAsync: executeAccountDelete, isPending: isDeletingAccount } =
    useServerActionMutation(deleteAccount, {
      onSuccess: () => {
        toast.info("Collection deleted")
      },
    })

  const sentenceInputMatches = sentenceInput === SENTENCE_TO_DELETE_ACCOUNT

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This account will be deleted, along with all of its collections,
            stats, snippets, and files.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="text-destructive bg-destructive-3 w-full rounded-md px-4 py-2 text-sm">
          <strong>Warning:</strong> This action is not reversible. Please be
          certain.
        </div>

        <Separator className="my-4" />

        <Label className="text-muted-foreground select-none font-normal">
          To verify, type <strong>{SENTENCE_TO_DELETE_ACCOUNT}</strong> below:
        </Label>
        <Input
          onChange={({ target }) => setSentenceInput(target.value)}
          value={sentenceInput}
        />

        <AlertDialogFooter>
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isDeletingAccount || !sentenceInputMatches}
            onClick={async () => executeAccountDelete(undefined)}
            className={buttonVariants({ variant: "destructive" })}
          >
            {isDeletingAccount && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
