import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogImage,
} from "@/components/ui/motion/dialog"

import { auth } from "@soli/auth"

import { XIcon } from "lucide-react"

const InterceptedMePage = async () => {
  const userSession = await auth()

  return (
    <DialogContainer>
      <DialogContent className="bg-gray-2 relative mx-2 flex w-full flex-col items-center rounded-xl border p-8 pt-14 lg:min-w-[400px] lg:max-w-[450px]">
        <div className="bg-gray-1 absolute left-0 top-0 h-36 w-full" />

        <DialogClose>
          <XIcon className="text-gray-10 hover:text-gray-8 h-5 w-5 transition-colors" />
        </DialogClose>

        <div className="flex flex-col items-center gap-2">
          <Avatar className="size-40">
            {userSession?.user?.image && (
              <DialogImage
                src={userSession.user.image}
                alt="User image profile"
                className="z-0 size-40 max-w-lg select-none rounded-full border object-cover"
              />
            )}

            <AvatarFallback className="w-full text-7xl">
              {userSession?.user?.name?.[0]}
            </AvatarFallback>
          </Avatar>

          <span className="text-2xl font-medium">
            {userSession?.user?.name}
          </span>
        </div>

        <form className="mt-4 flex w-full flex-col items-center gap-4">
          <div className="w-full">
            <label className="text-gray-11 text-sm" htmlFor="name">
              Name
            </label>
            <Input id="name" placeholder="Enter your name" />
          </div>

          <div className="w-full">
            <label className="text-gray-11 text-sm" htmlFor="email">
              Email
            </label>
            <Input id="email" placeholder="Enter your email" />
          </div>

          <div className="relative mt-20 flex w-full items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="border-gray-5 relative w-full border"
              asChild
            >
              <DialogClose className="relative left-0 top-0">
                Cancel
              </DialogClose>
            </Button>

            <Button
              type="submit"
              size="sm"
              variant="neutral"
              className="w-full"
            >
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </DialogContainer>
  )
}

export default InterceptedMePage
