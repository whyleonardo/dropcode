import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DialogImage, DialogTrigger } from "@/components/ui/motion/dialog"

import { auth } from "@soli/auth"
import { cn } from "@soli/tailwind/utils"

export const UserInfo = async () => {
  const userSession = await auth()

  return (
    <DialogTrigger className="flex h-fit w-10 items-center gap-3">
      <Avatar className="size-10 border hover:opacity-85">
        {userSession?.user?.image && (
          <DialogImage
            src={userSession?.user?.image}
            alt="User image profile"
            className="max-w-[40px] rounded-full"
          />
        )}
        <AvatarFallback>{userSession?.user?.name?.[0]}</AvatarFallback>
      </Avatar>

      <span className={cn("truncate text-base")}>
        {userSession?.user?.name}
      </span>
    </DialogTrigger>
  )
}
