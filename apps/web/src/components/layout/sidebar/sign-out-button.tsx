import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { signOut } from "@soli/auth"

import { LogOut } from "lucide-react"

export const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <TooltipProvider>
        <Tooltip delayDuration={30}>
          <TooltipTrigger asChild>
            <Button variant="ghost" type="submit" size="icon">
              <LogOut className="size-[18px]" />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="right">Sign out</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  )
}
