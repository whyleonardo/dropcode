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

import { cn } from "@dropcode/tailwind/utils"

import { Plus } from "lucide-react"

interface CreateNewSnippetModalProps {
  triggerClassName?: string
}

export const CreateNewSnippetModal = ({
  triggerClassName,
}: CreateNewSnippetModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

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
