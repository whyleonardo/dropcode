"use client"

import { useState } from "react"

import { CreateNewFileForm } from "@/components/forms/create-new-file-form"
import { CommandItem } from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Plus } from "lucide-react"

interface CreateNewFileCommandItemProps {
  snippetSlug: string
}

export const CreateNewFileCommandItem = ({
  snippetSlug,
}: CreateNewFileCommandItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <CommandItem asChild>
        <DrawerTrigger className="w-full">
          <Plus className="mr-2 !size-3.5" />
          New File
        </DrawerTrigger>
      </CommandItem>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new file</DrawerTitle>
        </DrawerHeader>

        <DrawerFooter>
          <CreateNewFileForm onOpenChange={setOpen} snippetSlug={snippetSlug} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
