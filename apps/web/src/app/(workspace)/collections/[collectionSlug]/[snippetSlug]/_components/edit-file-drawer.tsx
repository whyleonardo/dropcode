import { useState } from "react"

import { UpdateFileForm } from "@/components/forms/update-file-form"
import { CommandItem } from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"

import type { File } from "@dropcode/db/types"

import { Pencil } from "lucide-react"

interface EditFileDrawerProps {
  file: File
  snippetSlug: string
}

export const EditFileDrawer = ({ file, snippetSlug }: EditFileDrawerProps) => {
  const [openEditFileDrawer, setOpenEditFileDrawer] = useState(false)

  return (
    <>
      <CommandItem
        onSelect={() => {
          setOpenEditFileDrawer((state) => !state)
        }}
      >
        <Pencil className="mr-2 !size-3.5" />
        Edit File
      </CommandItem>

      <Drawer open={openEditFileDrawer} onOpenChange={setOpenEditFileDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit your file</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[calc(100dvh-12rem)]">
            <DrawerFooter>
              <UpdateFileForm
                initialData={file}
                onOpenChange={setOpenEditFileDrawer}
                snippetSlug={snippetSlug}
              />
            </DrawerFooter>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  )
}
