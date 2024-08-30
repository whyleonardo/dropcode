"use client"

import { useState } from "react"

import { CreateNewSnippetForm } from "@/components/forms/create-new-snippet-form"
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

interface CreateNewSnippetDrawerProps {
  triggerClassName?: string
  triggerLabel?: string
}

export const CreateNewSnippetDrawer = ({
  triggerClassName,
  triggerLabel,
}: CreateNewSnippetDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
          <DrawerTitle>Create a new snippet</DrawerTitle>
        </DrawerHeader>

        <DrawerFooter>
          <CreateNewSnippetForm onOpenChange={setIsOpen} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
