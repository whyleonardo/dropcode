"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@dropcode/tailwind/utils"

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
            className="fixed right-16 top-[6.5rem] z-[9999] hidden size-8 overflow-hidden disabled:opacity-100 md:inline-flex"
            onClick={onClick}
          >
            <Check
              className={cn(
                "absolute size-4 -translate-y-12 transition-transform",
                isCopied && "translate-y-0"
              )}
            />

            <Clipboard
              className={cn(
                "absolute size-4 transition-transform",
                isCopied && "translate-y-10"
              )}
            />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="left">Copy content to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
