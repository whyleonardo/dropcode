"use client"

import { useState } from "react"

import { CreateNewFileForm } from "@/components/forms/create-new-file-form"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { cn } from "@dropcode/tailwind/utils"

import { Plus } from "lucide-react"

interface CreateNewFileDrawerProps {
  triggerClassName?: string
  triggerLabel?: string
  snippetSlug: string
}

export const CreateNewFileDrawer = ({
  triggerClassName,
  triggerLabel,
  snippetSlug,
}: CreateNewFileDrawerProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className={cn(triggerClassName)}>
        <Button
          size={triggerLabel ? "sm" : "icon"}
          variant="neutral"
          className={cn(!triggerLabel && "rounded-xl")}
        >
          {triggerLabel}
          <Plus className={cn(triggerLabel && "ml-2", "size-5")} />
        </Button>
      </DrawerTrigger>
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
