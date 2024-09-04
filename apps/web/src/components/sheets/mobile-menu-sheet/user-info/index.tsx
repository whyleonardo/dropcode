"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { DeleteAccountConfirmationModal } from "./delete-account-confirmation-modal"

interface UserInfoProps {
  user: {
    provider?: string | undefined
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const [openUserInfoDrawer, setOpenUserInfoDrawer] = useState(false)
  const [openDeleteAccountAlertModal, setOpenDeleteAccountAlertModal] =
    useState(false)
  return (
    <>
      <div
        className="mt-8 w-full"
        role="button"
        onClick={() => setOpenUserInfoDrawer((state) => !state)}
        onKeyUp={() => setOpenUserInfoDrawer((state) => !state)}
      >
        <Avatar className="size-14">
          <AvatarImage
            src={user?.image as string}
            alt="User image profile"
            className="size-14 object-cover"
          />

          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
        </Avatar>

        <span className="mt-5 block text-lg font-medium leading-3">
          {user?.name}
        </span>
        <span className="text-muted-foreground text-sm">{user?.email}</span>
      </div>

      <Drawer open={openUserInfoDrawer} onOpenChange={setOpenUserInfoDrawer}>
        <DrawerContent className="px-6 pt-4">
          <DrawerHeader>
            <DrawerTitle className="sr-only">Your Info</DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="h-[calc(100dvh-6rem)]">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-40">
                {user?.image && (
                  <AvatarImage
                    src={user.image}
                    alt="User image profile"
                    className="z-0 size-full max-w-lg select-none rounded-full border object-cover"
                  />
                )}

                <AvatarFallback className="w-full text-7xl">
                  {user?.name?.[0]}
                </AvatarFallback>
              </Avatar>

              <span className="text-2xl font-medium">{user?.name}</span>
            </div>

            <div className="mt-4 flex w-full flex-col items-center gap-4">
              <div className="w-full">
                <Label className="text-gray-11 text-sm" htmlFor="email">
                  Email
                </Label>
                <span className="block">{user?.email}</span>
              </div>

              <div className="w-full">
                <Label className="text-gray-11 text-sm" htmlFor="email">
                  Provider
                </Label>
                <span className="block capitalize">{user?.provider}</span>
              </div>
            </div>

            <Separator className="my-8 w-full" />

            <div className="bg-destructive-3 border-destructive-5 mb-4 w-full space-y-2 rounded-lg border p-4">
              <span className="text-destructive block self-start text-lg font-medium">
                Danger Zone
              </span>

              <span className="text-muted-foreground !mt-3 text-sm">
                This action cannot be undone. This will permanently delete your
                account, including all its collections, snippets and files.
              </span>

              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="!mt-4 ml-auto block"
                onClick={() =>
                  setOpenDeleteAccountAlertModal((state) => !state)
                }
              >
                Delete Account
              </Button>
            </div>
          </ScrollArea>
        </DrawerContent>

        <DeleteAccountConfirmationModal
          open={openDeleteAccountAlertModal}
          onOpenChange={setOpenDeleteAccountAlertModal}
          userId={user.id as string}
        />
      </Drawer>
    </>
  )
}
