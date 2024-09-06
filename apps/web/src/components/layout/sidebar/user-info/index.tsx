"use client"

import { useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogImage,
  DialogTrigger,
} from "@/components/ui/motion/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { XIcon } from "lucide-react"

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
  const [openDeleteAccountAlertModal, setOpenDeleteAccountAlertModal] =
    useState(false)

  return (
    <>
      <Dialog>
        <div className="h-fit w-full">
          <TooltipProvider delayDuration={30}>
            <Tooltip>
              <DialogTrigger>
                <TooltipTrigger>
                  <Avatar className="hover:opacity-85">
                    {user?.image && (
                      <DialogImage
                        src={user?.image as string}
                        alt="User image profile"
                        className="size-full max-w-lg select-none rounded-full border object-cover"
                      />
                    )}

                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent side="right">User</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <DialogContainer>
          <DialogContent
            lockClickOutside={openDeleteAccountAlertModal}
            className="bg-gray-2 relative mx-2 flex w-full flex-col items-center rounded-xl border p-8 pt-14 shadow-lg lg:min-w-[450px] lg:max-w-[500px]"
          >
            <div className="bg-gray-1 absolute left-0 top-0 h-36 w-full" />

            <DialogClose>
              <XIcon className="text-gray-10 hover:text-gray-8 h-5 w-5 transition-colors" />
            </DialogClose>

            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-40">
                {user?.image && (
                  <DialogImage
                    src={user.image}
                    alt="User image profile"
                    className="z-0 size-40 max-w-lg select-none rounded-full border object-cover"
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

            <div className="bg-destructive-3 border-destructive-5 w-full space-y-2 rounded-lg border p-4">
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
          </DialogContent>
        </DialogContainer>
      </Dialog>

      <DeleteAccountConfirmationModal
        open={openDeleteAccountAlertModal}
        onOpenChange={setOpenDeleteAccountAlertModal}
      />
    </>
  )
}
