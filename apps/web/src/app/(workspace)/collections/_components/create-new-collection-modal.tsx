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

import { cn } from "@dropcode/tailwind/utils"

import { Plus } from "lucide-react"

interface CreateNewCollectionModalProps {
  triggerClassName?: string
}

export const CreateNewCollectionModal = ({
  triggerClassName,
}: CreateNewCollectionModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={cn(triggerClassName)}>
        <Button size="sm" variant="neutral">
          New collection
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
