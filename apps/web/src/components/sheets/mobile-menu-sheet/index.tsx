import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { getUserAccountProvider } from "@/data/get-user-account-provider"

import { auth } from "@dropcode/auth"
import { cn } from "@dropcode/tailwind/utils"

import { Menu } from "lucide-react"

import { MobileNavMenuLinks } from "./mobile-nav-menu-links"
import { SignOutButton } from "./sign-out-button"
import { UserInfo } from "./user-info"

interface MobileMenuSheetProps {
  triggerClassName?: string
}

export const MobileMenuSheet = async ({
  triggerClassName,
}: MobileMenuSheetProps) => {
  const session = await auth()

  if (!session?.user?.id) return null

  const [provider] = await getUserAccountProvider({ userId: session.user.id })

  const user = {
    ...session.user,
    ...provider,
  }

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "fixed left-4 top-6 z-[9999] md:hidden",
          triggerClassName
        )}
        asChild
      >
        <Button size="icon" variant="neutral" className="rounded-full">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-screen w-full overflow-hidden">
        <SheetHeader className="flex items-center justify-between">
          <SheetTitle className="sr-only">Dropcode Sheet Menu</SheetTitle>

          <ThemeToggle />
        </SheetHeader>

        <UserInfo user={user} />

        <Separator className="my-8 w-full" />

        <MobileNavMenuLinks />

        <SignOutButton />
      </SheetContent>
    </Sheet>
  )
}
