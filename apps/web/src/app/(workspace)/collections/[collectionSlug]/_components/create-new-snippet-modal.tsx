"use client"

import { useState } from "react"

import { CreateNewSnippetForm } from "@/components/forms/create-new-snippet-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

import { QueryKeyFactory } from "@/lib/keys"

import { fetchCollectionBySlug } from "@/actions/fetch-collection-by-slug"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { cn } from "@dropcode/tailwind/utils"

import { Plus } from "lucide-react"

interface CreateNewSnippetModalProps {
  triggerClassName?: string
  willHidden?: boolean
  collectionSlug: string
}

export const CreateNewSnippetModal = ({
  triggerClassName,
  collectionSlug,
  willHidden,
}: CreateNewSnippetModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: collection, isLoading: isLoadingSnippets } =
    useServerActionQuery(fetchCollectionBySlug, {
      input: {
        collectionSlug: collectionSlug,
      },
      queryKey: QueryKeyFactory.fetchCollectionBySlug({
        collectionSlug: collectionSlug,
      }),
    })

  const noSnippets = collection?.snippets?.length === 0

  if (willHidden && noSnippets) return null

  if (isLoadingSnippets) return <Skeleton className="h-10 w-[156px] self-end" />

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={cn(triggerClassName)}>
        <Button size="sm" variant="neutral">
          Create now
          <Plus className="ml-2 size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new snippet</DialogTitle>
        </DialogHeader>

        <CreateNewSnippetForm onOpenChange={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
