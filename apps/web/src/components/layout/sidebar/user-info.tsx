import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { auth } from "@dropcode/auth"

export const UserInfo = async () => {
  const userSession = await auth()

  return (
    <div className="size-full">
      <Avatar className="border hover:opacity-85">
        <AvatarImage
          src={userSession?.user?.image as string}
          alt="User image profile"
          className="size-full max-w-lg select-none rounded-full border object-cover"
        />

        <AvatarFallback>{userSession?.user?.name?.[0]}</AvatarFallback>
      </Avatar>
    </div>
  )
}
