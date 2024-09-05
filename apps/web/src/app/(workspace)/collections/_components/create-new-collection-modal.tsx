"use client"

import { useState } from "react"

import { CreateNewCollectionForm } from "@/components/forms/create-new-collection-form"
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

import { fetchCollections } from "@/actions/fetch-collections"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { cn } from "@dropcode/tailwind/utils"

import { Plus } from "lucide-react"

interface CreateNewCollectionModalProps {
  triggerClassName?: string
  willHidden?: boolean
}

export const CreateNewCollectionModal = ({
  triggerClassName,
  willHidden,
}: CreateNewCollectionModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: collections, isLoading: isLoadingCollections } =
    useServerActionQuery(fetchCollections, {
      input: {},
      queryKey: QueryKeyFactory.fetchCollections(),
    })

  const noCollections = collections?.length === 0

  if (willHidden && noCollections) return null

  if (isLoadingCollections)
    return <Skeleton className="h-10 w-[156px] self-end" />

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
          <DialogTitle>Create a new collection</DialogTitle>
        </DialogHeader>

        <CreateNewCollectionForm onOpenChange={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
