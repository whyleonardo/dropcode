"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@soli/tailwind/utils"

import { Check, Clipboard } from "lucide-react"
import { toast } from "sonner"

interface ClipboardCopyButtonProps {
  code: string
}

export const ClipboardCopyButton = ({ code }: ClipboardCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const onClick = async () => {
    setIsCopied(true)
    await navigator.clipboard.writeText(code)
    toast.info("Copied to clipboard!")
  }

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isCopied])
  return (
    <TooltipProvider delayDuration={30}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="outline"
            disabled={isCopied}
            className="absolute right-4 top-14 size-8 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={onClick}
          >
            <Check
              className={cn(
                "relative size-4 opacity-0 transition-opacity",
                isCopied && "opacity-100"
              )}
            />

            <Clipboard
              className={cn(
                "absolute size-4 opacity-100 transition-opacity",
                isCopied && "opacity-0"
              )}
            />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="left">Copy content to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
