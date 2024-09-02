"use client"

import { useState } from "react"

import { CreateNewFileForm } from "@/components/forms/create-new-file-form"
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

interface CreateNewFileModalProps {
  triggerClassName?: string
}

export const CreateNewFileModal = ({
  triggerClassName,
}: CreateNewFileModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={cn(triggerClassName)}>
        <Button size="sm" variant="neutral">
          Create now
          <Plus className="ml-2 size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new file</DialogTitle>
        </DialogHeader>

        <CreateNewFileForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
