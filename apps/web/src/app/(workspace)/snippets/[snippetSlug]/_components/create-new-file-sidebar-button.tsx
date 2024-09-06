import { DialogTrigger } from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Plus } from "lucide-react"

export const CreateNewFileSidebarButton = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={30}>
        <TooltipTrigger asChild>
          <DialogTrigger>
            <Plus className="text-muted-foreground hover:text-gray-12 size-5 transition-colors" />
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent side="right">
          <span className="normal-case">Create a new file</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
